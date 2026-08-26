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
});
