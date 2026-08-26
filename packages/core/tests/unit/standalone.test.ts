import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile } from 'tailwindcss';
import { buildStandaloneBundles } from '../../scripts/build-standalone';

const bundleNames = ['duskmoonui.js', 'duskmoonui.mjs', 'duskmoonui.css', 'duskmoonui-themes.css'];
const releaseWorkflowPath = join(import.meta.dir, '../../../../.github/workflows/release.yml');

describe('Standalone release bundles', () => {
  let outputDir: string;

  beforeAll(async () => {
    outputDir = await mkdtemp(join(tmpdir(), 'duskmoonui-standalone-'));
    await buildStandaloneBundles(outputDir);
  });

  afterAll(async () => {
    await rm(outputDir, { recursive: true, force: true });
  });

  it('builds every release asset', async () => {
    const assets = await Promise.all(
      bundleNames.map((name) => readFile(join(outputDir, name), 'utf8')),
    );

    for (const asset of assets) {
      expect(asset.length).toBeGreaterThan(0);
    }
  });

  it('builds CommonJS and ESM plugin bundles without runtime dependencies', async () => {
    const contents = await Promise.all(
      ['duskmoonui.js', 'duskmoonui.mjs'].map((name) => readFile(join(outputDir, name), 'utf8')),
    );

    for (const content of contents) {
      expect(content).toContain('@license MIT');
      expect(content).not.toMatch(/from\s+["'](?:tailwindcss|postcss|postcss-js)/);
      expect(content).not.toMatch(/require\(["'](?:tailwindcss|postcss|postcss-js)/);
    }
  });

  it('loads the standalone plugin and preserves its Tailwind configuration', async () => {
    const pluginBundle = await import(
      `${pathToFileURL(join(outputDir, 'duskmoonui.mjs')).href}?test=${Date.now()}`
    );
    const utilities: Record<string, (value: string) => Record<string, string>> = {};
    const baseRules: Record<string, unknown>[] = [];
    const componentRules: Record<string, unknown>[] = [];
    const staticUtilities: Record<string, unknown>[] = [];

    pluginBundle.default.handler({
      addBase(value: Record<string, unknown>) {
        baseRules.push(value);
      },
      addComponents(value: Record<string, unknown>) {
        componentRules.push(value);
      },
      addUtilities(value: Record<string, unknown>) {
        staticUtilities.push(value);
      },
      matchUtilities(value: typeof utilities) {
        Object.assign(utilities, value);
      },
      theme() {
        return {};
      },
    });

    expect(pluginBundle.default.config.theme.extend.colors.primary).toBe('var(--color-primary)');
    expect(utilities['grid-cols-auto-fill']('12rem')).toEqual({
      'grid-template-columns': 'repeat(auto-fill, minmax(min(12rem, 100%), 1fr))',
    });
    expect(utilities['grid-cols-auto-fit']('12rem')).toEqual({
      'grid-template-columns': 'repeat(auto-fit, minmax(min(12rem, 100%), 1fr))',
    });
    expect(JSON.stringify(baseRules)).toContain('[data-theme=\\"sunshine\\"]');
    expect(JSON.stringify(componentRules)).toContain('.btn');
    expect(JSON.stringify(componentRules)).toContain('.art-moon');
    expect(JSON.stringify(staticUtilities)).toContain('.sr-only');

    const require = createRequire(import.meta.url);
    const commonJsPlugin = require(join(outputDir, 'duskmoonui.js'));
    expect(commonJsPlugin.default.config.theme.extend.colors.primary).toBe('var(--color-primary)');
    expect(typeof commonJsPlugin.default.handler).toBe('function');
  });

  it('compiles Core, CSS Art, themes, and utilities from the plugin alone', async () => {
    const pluginPath = join(outputDir, 'duskmoonui.mjs');
    const pluginBundle = await import(`${pathToFileURL(pluginPath).href}?compile=${Date.now()}`);
    const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
      base: outputDir,
      async loadModule() {
        return {
          base: outputDir,
          module: pluginBundle.default,
          path: pluginPath,
        };
      },
    });
    const css = compiler.build([
      'btn',
      'btn-primary',
      'tree-select',
      'markdown-body',
      'circle-menu',
      'art-moon',
      'art-plasma-ball',
      'art-circular-gallery',
      'art-gemini-input',
      'bg-primary',
      'sr-only',
      'rounded-box',
      'shadow-elevation-1',
      'grid-cols-auto-fill-4',
    ]);

    for (const expected of [
      '.btn',
      '.btn-primary',
      '.tree-select',
      '.markdown-body',
      '.circle-menu',
      '.art-moon',
      '.art-plasma-ball',
      '.art-circular-gallery',
      '.art-gemini-input',
      '.bg-primary',
      '.sr-only',
      '.rounded-box',
      '.shadow-elevation-1',
      '.grid-cols-auto-fill-4',
      '[data-theme="sunshine"]',
      '@property --art-circular-gallery-rotation',
      '@property --art-gemini-input-rotation',
      '@keyframes btn-spin',
      '@keyframes art-moon-pulse',
      '@keyframes art-gemini-input-rotate',
      '@supports (anchor-name:',
      '@starting-style',
    ]) {
      expect(css).toContain(expected);
    }
    expect(css).not.toMatch(/^\s*\.card\s*\{/m);
    expect(css).not.toMatch(/^\s*\.art-atom\s*\{/m);
  });

  it('inlines every built-in theme into one CSS asset', async () => {
    const themesCss = await readFile(join(outputDir, 'duskmoonui-themes.css'), 'utf8');

    expect(themesCss).not.toMatch(/^\s*@import\s/m);
    expect(themesCss).toContain(':root {');
    expect(themesCss).toContain(':root:not([data-theme])');
    expect(themesCss).toContain('[data-theme="sunshine"]');
    expect(themesCss).toContain('[data-theme="moonlight"]');
    expect(themesCss).toContain('[data-theme="ocean"]');
    expect(themesCss).toContain('[data-theme="forest"]');
    expect(themesCss).toContain('--spacing-24: 96px');
  });

  it('combines Core and CSS Art in the complete stylesheet', async () => {
    const bundleCss = await readFile(join(outputDir, 'duskmoonui.css'), 'utf8');

    expect(bundleCss).not.toMatch(/^\s*@import\s/m);
    expect(bundleCss).toContain('@duskmoon-dev/core');
    expect(bundleCss).toContain('@duskmoon-dev/css-art');
    expect(bundleCss).toContain('.btn {');
    expect(bundleCss).toContain('.art-moon {');
    expect(bundleCss).toContain('.art-atom {');
  });

  it('documents plugin-only standalone usage', async () => {
    const releaseWorkflow = await readFile(releaseWorkflowPath, 'utf8');
    const tailwindImport = releaseWorkflow.indexOf('@import "tailwindcss";');
    const sourceExclusion = releaseWorkflow.indexOf('@source not "./duskmoonui{,*}.mjs";');
    const duskmoonPlugin = releaseWorkflow.indexOf('@plugin "./duskmoonui.mjs";');

    expect(tailwindImport).toBeGreaterThan(-1);
    expect(sourceExclusion).toBeGreaterThan(tailwindImport);
    expect(duskmoonPlugin).toBeGreaterThan(sourceExclusion);
    expect(releaseWorkflow).not.toContain(`echo '@import "./duskmoonui.css";'`);
  });
});
