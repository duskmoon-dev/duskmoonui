import { test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { inSrgbGamut, tokenContrast } from './color';

for (const theme of ['sunshine', 'moonlight']) {
  test(`${theme} error foreground is in gamut and meets AA`, () => {
    const { colors } = parse(readFileSync(new URL(`../tokens/${theme}.yaml`, import.meta.url), 'utf8'));
    expect(inSrgbGamut(colors['error-content'])).toBe(true);
    expect(tokenContrast(colors['error-content'], colors.error)).toBeGreaterThanOrEqual(4.5);
  });
}
