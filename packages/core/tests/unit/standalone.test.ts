import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildStandaloneBundles } from '../../scripts/build-standalone';

const bundleNames = ['duskmoonui.js', 'duskmoonui.mjs', 'duskmoonui.css', 'duskmoonui-themes.css'];

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
      expect(content).not.toMatch(/from\s+["']tailwindcss\/plugin["']/);
      expect(content).not.toMatch(/require\(["']tailwindcss\/plugin["']\)/);
    }
  });

  it('loads the standalone plugin and preserves its Tailwind configuration', async () => {
    const pluginBundle = await import(
      `${pathToFileURL(join(outputDir, 'duskmoonui.mjs')).href}?test=${Date.now()}`
    );
    const utilities: Record<string, (value: string) => Record<string, string>> = {};

    pluginBundle.default.handler({
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

    const require = createRequire(import.meta.url);
    const commonJsPlugin = require(join(outputDir, 'duskmoonui.js'));
    expect(commonJsPlugin.default.config.theme.extend.colors.primary).toBe('var(--color-primary)');
    expect(typeof commonJsPlugin.default.handler).toBe('function');
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
});
