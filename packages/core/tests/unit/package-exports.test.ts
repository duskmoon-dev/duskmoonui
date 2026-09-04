import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const packageJsonPath = join(import.meta.dir, '../../package.json');
const cssOnlyExports = [
  './themes/sunshine',
  './themes/moonlight',
  './themes/ocean',
  './themes/forest',
  './components',
] as const;
const layoutComponentExports = [
  './components/sign-page',
  './components/home-page',
  './components/console-page',
] as const;

describe('CSS-only package exports', () => {
  let exportsMap: Record<string, { default?: string; style?: string }>;

  beforeAll(async () => {
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as {
      exports: typeof exportsMap;
    };
    exportsMap = packageJson.exports;
  });

  for (const exportName of cssOnlyExports) {
    it(`${exportName} resolves its CSS for default imports`, () => {
      expect(exportsMap[exportName].default).toBe(exportsMap[exportName].style);
    });
  }

  for (const exportName of layoutComponentExports) {
    it(`${exportName} exposes CSS and constructable stylesheet entries`, () => {
      const exportEntry = exportsMap[exportName] as {
        default?: string;
        import?: string;
        style?: string;
        types?: string;
      };

      expect(exportEntry.style).toBe(`./dist/components/${exportName.split('/').at(-1)}.css`);
      expect(exportEntry.import).toBe(`./dist/esm/components/${exportName.split('/').at(-1)}.js`);
      expect(exportEntry.default).toBe(exportEntry.import);
      expect(exportEntry.types).toBe(`./dist/esm/components/${exportName.split('/').at(-1)}.d.ts`);
    });
  }
});
