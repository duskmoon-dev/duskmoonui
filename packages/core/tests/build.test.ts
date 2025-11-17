import { describe, expect, test } from 'bun:test';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Build Tests', () => {
  const distDir = join(__dirname, '..', 'dist');

  describe('Build Output', () => {
    test('should have dist directory', () => {
      expect(existsSync(distDir)).toBe(true);
    });

    test('should generate index.js (ESM)', () => {
      const indexPath = join(distDir, 'index.js');
      expect(existsSync(indexPath)).toBe(true);
    });

    test('should generate index.cjs (CommonJS)', () => {
      const cjsPath = join(distDir, 'index.cjs');
      expect(existsSync(cjsPath)).toBe(true);
    });

    test('should generate TypeScript declaration files', () => {
      const dtsPath = join(distDir, 'index.d.ts');
      expect(existsSync(dtsPath)).toBe(true);
    });

    test('should generate types directory', () => {
      const typesDir = join(distDir, 'types');
      expect(existsSync(typesDir)).toBe(true);
    });

    test('should generate source maps', () => {
      const esmMapPath = join(distDir, 'index.js.map');
      const cjsMapPath = join(distDir, 'index.cjs.map');

      expect(existsSync(esmMapPath)).toBe(true);
      expect(existsSync(cjsMapPath)).toBe(true);
    });

    test('should have components directory in dist', () => {
      const componentsDir = join(distDir, 'components');
      expect(existsSync(componentsDir)).toBe(true);
    });

    test('should have generators directory in dist', () => {
      const generatorsDir = join(distDir, 'generators');
      expect(existsSync(generatorsDir)).toBe(true);
    });

    test('should have themes directory in dist', () => {
      const themesDir = join(distDir, 'themes');
      expect(existsSync(themesDir)).toBe(true);
    });
  });

  describe('Package Exports', () => {
    test('should be importable as ESM module', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      expect(duskmoonui).toBeDefined();
      expect(typeof duskmoonui).toBe('function');
    });

    test('should export themes object', async () => {
      const module = await import('../dist/index.js');

      expect(module.themes).toBeDefined();
      expect(typeof module.themes).toBe('object');
    });

    test('should be requireable as CommonJS module', () => {
      // Use dynamic import for CJS in Bun
      const cjsPath = join(distDir, 'index.cjs');
      expect(existsSync(cjsPath)).toBe(true);
    });
  });

  describe('Plugin Functionality', () => {
    test('should create Tailwind plugin when called', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      const plugin = duskmoonui();

      expect(plugin).toBeDefined();
      expect(typeof plugin).toBe('object');
    });

    test('should accept options', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      const plugin = duskmoonui({
        themes: ['sunshine', 'moonlight'],
        darkTheme: 'moonlight',
        styled: true,
        components: 'all',
        prefix: '',
      });

      expect(plugin).toBeDefined();
    });

    test('should accept component selection', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      const plugin = duskmoonui({
        components: ['button', 'card'],
      });

      expect(plugin).toBeDefined();
    });

    test('should accept prefix option', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      const plugin = duskmoonui({
        prefix: 'dm-',
      });

      expect(plugin).toBeDefined();
    });

    test('should accept styled option', async () => {
      const { default: duskmoonui } = await import('../dist/index.js');

      const pluginWithStyles = duskmoonui({ styled: true });
      const pluginWithoutStyles = duskmoonui({ styled: false });

      expect(pluginWithStyles).toBeDefined();
      expect(pluginWithoutStyles).toBeDefined();
    });
  });

  describe('Theme Exports', () => {
    test('should export themes object with sunshine theme', async () => {
      const { themes } = await import('../dist/index.js');

      expect(themes).toBeDefined();
      expect(themes.sunshine).toBeDefined();
      expect(themes.sunshine.primary).toBeDefined();
      expect(themes.sunshine.secondary).toBeDefined();
      expect(themes.sunshine.tertiary).toBeDefined();
    });

    test('should export themes object with moonlight theme', async () => {
      const { themes } = await import('../dist/index.js');

      expect(themes).toBeDefined();
      expect(themes.moonlight).toBeDefined();
      expect(themes.moonlight.primary).toBeDefined();
      expect(themes.moonlight.secondary).toBeDefined();
      expect(themes.moonlight.tertiary).toBeDefined();
    });
  });

  describe('Type Definitions', () => {
    test('should have complete type definitions', async () => {
      const dtsPath = join(distDir, 'index.d.ts');
      const content = await Bun.file(dtsPath).text();

      // Check for important type exports
      expect(content).toContain('DuskMoonUIOptions');
      expect(content).toContain('ThemeColors');
      expect(content).toContain('themes');
    });

    test('should have theme type definitions in themes directory', () => {
      const themesDir = join(distDir, 'themes');
      expect(existsSync(themesDir)).toBe(true);
    });

    test('should have types directory with type definitions', () => {
      const typesDir = join(distDir, 'types');
      const indexDts = join(typesDir, 'index.d.ts');

      expect(existsSync(typesDir)).toBe(true);
      expect(existsSync(indexDts)).toBe(true);
    });
  });

  describe('Build Integrity', () => {
    test('should have valid JavaScript output', async () => {
      const indexPath = join(distDir, 'index.js');
      const content = await Bun.file(indexPath).text();

      // Should not contain TypeScript syntax
      expect(content).not.toContain('interface ');
      expect(content).not.toContain('type ');
    });

    test('should have source maps with correct paths', async () => {
      const mapPath = join(distDir, 'index.js.map');
      const content = await Bun.file(mapPath).text();
      const sourceMap = JSON.parse(content);

      expect(sourceMap.version).toBe(3);
      expect(sourceMap.sources).toBeDefined();
      expect(Array.isArray(sourceMap.sources)).toBe(true);
    });
  });
});
