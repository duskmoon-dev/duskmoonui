/**
 * Build script for compiling CSS files
 * Inlines all CSS imports and outputs to dist/
 */

import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { transform } from 'lightningcss';

const SRC_DIR = join(import.meta.dir, '../src');
const DIST_DIR = join(import.meta.dir, '../dist');

/**
 * Read a CSS file and inline all @import statements
 */
async function readAndInlineCss(filePath: string, visited = new Set<string>()): Promise<string> {
  const absolutePath = resolve(filePath);

  // Prevent circular imports
  if (visited.has(absolutePath)) {
    return '';
  }
  visited.add(absolutePath);

  try {
    let content = await readFile(absolutePath, 'utf-8');
    const dir = dirname(absolutePath);

    // Find all @import statements
    const importRegex = /@import\s+["']([^"']+)["']\s*;?/g;
    const imports: { match: string; path: string }[] = [];

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push({ match: match[0], path: match[1] });
    }

    // Replace imports with inlined content
    for (const { match, path } of imports) {
      // Skip commented imports
      if (match.includes('/*') || match.includes('//')) {
        continue;
      }

      const importPath = join(dir, path);
      const inlinedContent = await readAndInlineCss(importPath, visited);
      content = content.replace(match, inlinedContent);
    }

    return content;
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}`);
    return '';
  }
}

async function ensureDir(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function buildMainCss(): Promise<void> {
  console.log('Building main CSS...');

  // Read and inline all CSS from index.css
  const mainCss = await readAndInlineCss(join(SRC_DIR, 'index.css'));

  const output = `/**
 * @duskmoon-dev/core v1.0.0
 * Material Design 3 color system with Tailwind CSS v4
 * https://github.com/duskmoon-dev/duskmoonui
 *
 * @license MIT
 */

${mainCss}
`;

  await ensureDir(DIST_DIR);
  await writeFile(join(DIST_DIR, 'index.css'), output);
  console.log('✓ Built dist/index.css');
}

async function copyThemes(): Promise<void> {
  console.log('Copying theme files...');

  const themesDir = join(SRC_DIR, 'themes');
  const distThemesDir = join(DIST_DIR, 'themes');

  await ensureDir(distThemesDir);

  // Copy individual theme files
  const themeFiles = ['sunshine.css', 'moonlight.css', 'ocean.css', 'forest.css', 'sunset.css'];

  for (const file of themeFiles) {
    const srcPath = join(themesDir, file);
    if (existsSync(srcPath)) {
      const content = await readAndInlineCss(srcPath);
      await writeFile(join(distThemesDir, file), content);
      console.log(`✓ Copied themes/${file}`);
    }
  }
}

// List of all component files
const componentFiles = [
  'accordion',
  'alert',
  'appbar',
  'autocomplete',
  'avatar',
  'badge',
  'bottom-navigation',
  'bottomsheet',
  'button',
  'card',
  'cascader',
  'checkbox',
  'chip',
  'collapse',
  'datepicker',
  'dialog',
  'divider',
  'drawer',
  'file-upload',
  'form',
  'form-group',
  'input',
  'list',
  'markdown-body',
  'modal',
  'multi-select',
  'navigation',
  'nested-menu',
  'otp-input',
  'pin-input',
  'popover',
  'progress',
  'radio',
  'rating',
  'segment-control',
  'select',
  'skeleton',
  'slider',
  'snackbar',
  'stepper',
  'switch',
  'table',
  'textarea',
  'theme-controller',
  'time-input',
  'timeline',
  'toast',
  'toggle',
  'tooltip',
  'tree-select',
];

/**
 * Generate ESM JavaScript module from CSS content
 */
function generateEsmModule(componentName: string, cssContent: string): string {
  // Escape backticks and backslashes for template literal
  const escapedCss = cssContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  return `// Auto-generated from ${componentName}.css
export const css = \`${escapedCss}\`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);
export const styles = sheet;
export default sheet;
`;
}

async function copyComponents(): Promise<void> {
  console.log('Copying component files...');

  const componentsDir = join(SRC_DIR, 'components');
  const distComponentsDir = join(DIST_DIR, 'components');
  const distEsmComponentsDir = join(DIST_DIR, 'esm', 'components');

  await ensureDir(distComponentsDir);
  await ensureDir(distEsmComponentsDir);

  // Build components index with inlined imports
  const indexPath = join(componentsDir, 'index.css');
  if (existsSync(indexPath)) {
    const content = await readAndInlineCss(indexPath);
    await writeFile(join(distComponentsDir, 'index.css'), content);
    console.log('✓ Built components/index.css');
  }

  console.log('Building individual component files...');
  for (const component of componentFiles) {
    const srcPath = join(componentsDir, `${component}.css`);
    if (existsSync(srcPath)) {
      const content = await readFile(srcPath, 'utf-8');
      // Write CSS file
      await writeFile(join(distComponentsDir, `${component}.css`), content);
      // Generate and write ESM module
      const esmContent = generateEsmModule(component, content);
      await writeFile(join(distEsmComponentsDir, `${component}.js`), esmContent);
    }
  }
  console.log(`✓ Built ${componentFiles.length} individual component files`);
  console.log(`✓ Built ${componentFiles.length} ESM component modules`);
}

async function buildPlugin(): Promise<void> {
  console.log('Building Tailwind plugin...');

  const distEsmDir = join(DIST_DIR, 'esm');
  const distCjsDir = join(DIST_DIR, 'cjs');

  await ensureDir(distEsmDir);
  await ensureDir(distCjsDir);

  // Build ESM version using Bun
  const esmResult = await Bun.build({
    entrypoints: [join(SRC_DIR, 'tailwind-plugin.ts')],
    outdir: distEsmDir,
    format: 'esm',
    target: 'node',
    external: ['tailwindcss', 'tailwindcss/plugin'],
  });

  if (!esmResult.success) {
    console.error('ESM build failed:', esmResult.logs);
    throw new Error('ESM plugin build failed');
  }
  console.log('✓ Built esm/tailwind-plugin.js');

  // Build CJS version
  const cjsResult = await Bun.build({
    entrypoints: [join(SRC_DIR, 'tailwind-plugin.ts')],
    outdir: distCjsDir,
    format: 'cjs',
    target: 'node',
    external: ['tailwindcss', 'tailwindcss/plugin'],
    naming: '[name].cjs',
  });

  if (!cjsResult.success) {
    console.error('CJS build failed:', cjsResult.logs);
    throw new Error('CJS plugin build failed');
  }
  console.log('✓ Built cjs/tailwind-plugin.cjs');
}

async function main(): Promise<void> {
  console.log('Building @duskmoon-dev/core CSS...\n');

  try {
    await buildMainCss();
    await copyThemes();
    await copyComponents();
    await buildPlugin();

    // Minify with LightningCSS
    console.log('\nMinifying CSS...');
    const indexCss = await readFile(join(DIST_DIR, 'index.css'), 'utf-8');
    const { code: minified } = transform({
      filename: 'index.css',
      code: Buffer.from(indexCss),
      minify: true,
      errorRecovery: true,
      customAtRules: {
        theme: { body: 'declaration-list' },
      },
    });
    await writeFile(join(DIST_DIR, 'index.min.css'), minified);
    console.log('✓ Built dist/index.min.css');

    // Calculate bundle sizes
    const sizeKB = (indexCss.length / 1024).toFixed(2);
    const minSizeKB = (minified.length / 1024).toFixed(2);
    console.log(`\n📦 Bundle size: ${sizeKB} KB`);
    console.log(`📦 Minified:    ${minSizeKB} KB`);

    console.log('\n✓ Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();
