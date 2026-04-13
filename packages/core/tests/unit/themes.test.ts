/**
 * Unit tests for theme switching logic
 * Tests sunshine (light) and moonlight (dark) themes
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const THEMES_DIR = join(import.meta.dir, '../../src/themes');
const GENERATED_DIR = join(THEMES_DIR, 'generated');

describe('Theme Switching Logic', () => {
  describe('Sunshine Theme (Light)', () => {
    let sunshineCSS: string;

    beforeAll(async () => {
      try {
        sunshineCSS = await readFile(join(GENERATED_DIR, 'sunshine.css'), 'utf-8');
      } catch {
        sunshineCSS = '';
      }
    });

    it('should define theme with data-theme selector', () => {
      expect(sunshineCSS).toContain('[data-theme="sunshine"]');
    });

    it('should set color-scheme to light', () => {
      expect(sunshineCSS).toContain('color-scheme: light');
    });

    it('should define all brand colors', () => {
      expect(sunshineCSS).toContain('--color-primary:');
      expect(sunshineCSS).toContain('--color-secondary:');
      expect(sunshineCSS).toContain('--color-tertiary:');
    });

    it('should define light-appropriate base colors', () => {
      // Light themes should have bright base-100 (high lightness)
      const base100Match = sunshineCSS.match(/--color-base-100:\s*hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
      if (base100Match) {
        const lightness = parseInt(base100Match[3], 10);
        expect(lightness).toBeGreaterThanOrEqual(90);
      }
    });
  });

  describe('Moonlight Theme (Dark)', () => {
    let moonlightCSS: string;

    beforeAll(async () => {
      try {
        moonlightCSS = await readFile(join(GENERATED_DIR, 'moonlight.css'), 'utf-8');
      } catch {
        moonlightCSS = '';
      }
    });

    it('should define theme with data-theme selector', () => {
      expect(moonlightCSS).toContain('[data-theme="moonlight"]');
    });

    it('should set color-scheme to dark', () => {
      expect(moonlightCSS).toContain('color-scheme: dark');
    });

    it('should define all brand colors', () => {
      expect(moonlightCSS).toContain('--color-primary:');
      expect(moonlightCSS).toContain('--color-secondary:');
      expect(moonlightCSS).toContain('--color-tertiary:');
    });

    it('should define dark-appropriate base colors', () => {
      // Dark themes should have dark base-100 (low lightness)
      const base100Match = moonlightCSS.match(/--color-base-100:\s*hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
      if (base100Match) {
        const lightness = parseInt(base100Match[3], 10);
        expect(lightness).toBeLessThanOrEqual(20);
      }
    });
  });

  describe('Theme Index', () => {
    let indexCSS: string;

    beforeAll(async () => {
      try {
        indexCSS = await readFile(join(THEMES_DIR, 'index.css'), 'utf-8');
      } catch {
        indexCSS = '';
      }
    });

    it('should import sunshine theme', () => {
      expect(indexCSS).toContain('sunshine');
    });

    it('should import moonlight theme', () => {
      expect(indexCSS).toContain('moonlight');
    });
  });

  describe('Theme Consistency', () => {
    let sunshineCSS: string;
    let moonlightCSS: string;

    beforeAll(async () => {
      try {
        sunshineCSS = await readFile(join(GENERATED_DIR, 'sunshine.css'), 'utf-8');
        moonlightCSS = await readFile(join(GENERATED_DIR, 'moonlight.css'), 'utf-8');
      } catch {
        sunshineCSS = '';
        moonlightCSS = '';
      }
    });

    it('should have same tokens in both themes', () => {
      const sunshineTokens = [...new Set(sunshineCSS.match(/--color-[\w-]+:/g) || [])].sort();
      const moonlightTokens = [...new Set(moonlightCSS.match(/--color-[\w-]+:/g) || [])].sort();

      expect(sunshineTokens).toEqual(moonlightTokens);
    });
  });

  describe('Theme Metadata CSS Properties', () => {
    const themeFiles = ['sunshine', 'moonlight', 'ocean', 'forest'];
    const themeCSS: Record<string, string> = {};

    beforeAll(async () => {
      for (const name of themeFiles) {
        try {
          themeCSS[name] = await readFile(join(GENERATED_DIR, `${name}.css`), 'utf-8');
        } catch {
          themeCSS[name] = '';
        }
      }
    });

    for (const name of ['sunshine', 'moonlight', 'ocean', 'forest']) {
      it(`${name} should contain --theme-name`, () => {
        expect(themeCSS[name]).toContain(`--theme-name: "${name}"`);
      });

      it(`${name} should contain --theme-mode`, () => {
        expect(themeCSS[name]).toMatch(/--theme-mode: "(light|dark)"/);
      });

      it(`${name} should contain --theme-family`, () => {
        expect(themeCSS[name]).toMatch(/--theme-family: "\w+"/);
      });

      it(`${name} should contain --theme-pair`, () => {
        expect(themeCSS[name]).toMatch(/--theme-pair: "\w+"/);
      });
    }
  });

  describe('Theme Couples', () => {
    const couples: [string, string][] = [
      ['sunshine', 'moonlight'],
      ['ocean', 'forest'],
    ];

    for (const [a, b] of couples) {
      it(`${a} and ${b} should be paired (symmetric)`, async () => {
        const cssA = await readFile(join(GENERATED_DIR, `${a}.css`), 'utf-8');
        const cssB = await readFile(join(GENERATED_DIR, `${b}.css`), 'utf-8');

        expect(cssA).toContain(`--theme-pair: "${b}"`);
        expect(cssB).toContain(`--theme-pair: "${a}"`);
      });

      it(`${a} and ${b} should share the same family`, async () => {
        const cssA = await readFile(join(GENERATED_DIR, `${a}.css`), 'utf-8');
        const cssB = await readFile(join(GENERATED_DIR, `${b}.css`), 'utf-8');

        const familyA = cssA.match(/--theme-family: "(\w+)"/)?.[1];
        const familyB = cssB.match(/--theme-family: "(\w+)"/)?.[1];

        expect(familyA).toBeDefined();
        expect(familyA).toEqual(familyB);
      });

      it(`${a} and ${b} should have opposite modes`, async () => {
        const cssA = await readFile(join(GENERATED_DIR, `${a}.css`), 'utf-8');
        const cssB = await readFile(join(GENERATED_DIR, `${b}.css`), 'utf-8');

        const modeA = cssA.match(/--theme-mode: "(light|dark)"/)?.[1];
        const modeB = cssB.match(/--theme-mode: "(light|dark)"/)?.[1];

        expect(modeA).toBeDefined();
        expect(modeB).toBeDefined();
        expect(modeA).not.toEqual(modeB);
      });
    }
  });

  describe('Theme Defaults Metadata', () => {
    let defaultsCSS: string;

    beforeAll(async () => {
      try {
        defaultsCSS = await readFile(join(THEMES_DIR, 'defaults.css'), 'utf-8');
      } catch {
        defaultsCSS = '';
      }
    });

    it('should set sunshine metadata in :root', () => {
      expect(defaultsCSS).toContain('--theme-pair: "moonlight"');
      expect(defaultsCSS).toContain('--theme-name: "sunshine"');
    });

    it('should set moonlight metadata in dark media query', () => {
      expect(defaultsCSS).toContain('--theme-pair: "sunshine"');
      expect(defaultsCSS).toContain('--theme-name: "moonlight"');
    });
  });
});
