/**
 * Build script for compiling CSS art files
 * Inlines all CSS imports and outputs to dist/
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
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

  if (visited.has(absolutePath)) {
    return '';
  }
  visited.add(absolutePath);

  try {
    let content = await readFile(absolutePath, 'utf-8');
    const dir = dirname(absolutePath);

    const importRegex = /@import\s+["']([^"']+)["']\s*;?/g;
    const imports: { match: string; path: string }[] = [];

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push({ match: match[0], path: match[1] });
    }

    for (const { match, path } of imports) {
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

/**
 * Discover all art CSS files automatically from src/art/
 */
async function discoverArtFiles(): Promise<string[]> {
  const artDir = join(SRC_DIR, 'art');
  const files = await readdir(artDir);
  return files
    .filter(f => f.endsWith('.css') && f !== 'index.css')
    .map(f => f.replace('.css', ''))
    .sort();
}

async function buildMainCss(): Promise<void> {
  console.log('Building main CSS...');

  const mainCss = await readAndInlineCss(join(SRC_DIR, 'index.css'));

  const output = `/**
 * @duskmoon-dev/css-art v0.1.0
 * Pure CSS art components
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

async function copyArtFiles(): Promise<void> {
  console.log('Copying art files...');

  const artDir = join(SRC_DIR, 'art');
  const distArtDir = join(DIST_DIR, 'art');

  await ensureDir(distArtDir);

  // Build art index with inlined imports
  const indexPath = join(artDir, 'index.css');
  if (existsSync(indexPath)) {
    const content = await readAndInlineCss(indexPath);
    await writeFile(join(distArtDir, 'index.css'), content);
    console.log('✓ Built art/index.css');
  }

  // Copy individual art files
  const artFiles = await discoverArtFiles();
  console.log(`Building ${artFiles.length} individual art files...`);

  for (const art of artFiles) {
    const srcPath = join(artDir, `${art}.css`);
    if (existsSync(srcPath)) {
      const content = await readFile(srcPath, 'utf-8');
      await writeFile(join(distArtDir, `${art}.css`), content);
    }
  }
  console.log(`✓ Built ${artFiles.length} individual art files`);
}

async function main(): Promise<void> {
  console.log('Building @duskmoon-dev/css-art...\n');

  try {
    await buildMainCss();
    await copyArtFiles();

    // Minify with LightningCSS
    console.log('\nMinifying CSS...');
    const indexCss = await readFile(join(DIST_DIR, 'index.css'), 'utf-8');
    const { code: minified } = transform({
      filename: 'index.css',
      code: Buffer.from(indexCss),
      minify: true,
      errorRecovery: true,
    });
    await writeFile(join(DIST_DIR, 'index.min.css'), minified);
    console.log('✓ Built dist/index.min.css');

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
