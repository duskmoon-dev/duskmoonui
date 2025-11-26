/**
 * Unit tests for theme switching logic
 * Tests sunshine (light) and moonlight (dark) themes
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const THEMES_DIR = join(import.meta.dir, '../../src/themes');

describe('Theme Switching Logic', () => {
  describe('Sunshine Theme (Light)', () => {
    let sunshineCSS: string;

    beforeAll(async () => {
      try {
        sunshineCSS = await readFile(join(THEMES_DIR, 'sunshine.css'), 'utf-8');
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
      const base100Match = sunshineCSS.match(/--color-base-100:\s*(\d+)\s+(\d+)%\s+(\d+)%/);
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
        moonlightCSS = await readFile(join(THEMES_DIR, 'moonlight.css'), 'utf-8');
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
      const base100Match = moonlightCSS.match(/--color-base-100:\s*(\d+)\s+(\d+)%\s+(\d+)%/);
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
        sunshineCSS = await readFile(join(THEMES_DIR, 'sunshine.css'), 'utf-8');
        moonlightCSS = await readFile(join(THEMES_DIR, 'moonlight.css'), 'utf-8');
      } catch {
        sunshineCSS = '';
        moonlightCSS = '';
      }
    });

    it('should have same tokens in both themes', () => {
      const sunshineTokens = (sunshineCSS.match(/--color-[\w-]+:/g) || []).sort();
      const moonlightTokens = (moonlightCSS.match(/--color-[\w-]+:/g) || []).sort();

      expect(sunshineTokens).toEqual(moonlightTokens);
    });
  });
});
