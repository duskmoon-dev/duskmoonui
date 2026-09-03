/**
 * Unit tests for component exports and ESM modules
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

describe('Component Exports', () => {
  let packageJson: any;
  const coreRoot = resolve(__dirname, '../..');

  beforeAll(async () => {
    const raw = await readFile(join(coreRoot, 'package.json'), 'utf-8');
    packageJson = JSON.parse(raw);
  });

  it('exports every component with CSS, JS, and DTS entries', () => {
    const componentExports = Object.entries(packageJson.exports).filter(
      ([key]) => key.startsWith('./components/'),
    );

    expect(componentExports.length).toBeGreaterThanOrEqual(50);

    for (const [key, entry] of componentExports) {
      const e = entry as { types?: string; style?: string; import?: string; default?: string };
      expect(e.types).toBeDefined();
      expect(e.style).toBeDefined();
      expect(e.import).toBeDefined();
      expect(e.default).toBeDefined();

      const cssPath = join(coreRoot, e.style!);
      const jsPath = join(coreRoot, e.import!);
      const dtsPath = join(coreRoot, e.types!);

      expect(existsSync(cssPath)).toBe(true);
      expect(existsSync(jsPath)).toBe(true);
      expect(existsSync(dtsPath)).toBe(true);
    }
  });

  it('imports markdown-body ESM module without throwing ReferenceError in non-browser environment', async () => {
    const markdownBodyModule = await import('../../dist/esm/components/markdown-body.js');
    expect(typeof markdownBodyModule.css).toBe('string');
    expect(markdownBodyModule.css.length).toBeGreaterThan(0);
    expect(markdownBodyModule.styles).toBeNull();
    expect(markdownBodyModule.default).toBeNull();
  });
});
