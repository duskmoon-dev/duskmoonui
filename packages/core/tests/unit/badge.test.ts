/**
 * Unit tests for badge component class generation
 * Tests that badge CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Badge Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/badge.css'),
      'utf-8',
    );
  });

  describe('Base Badge Class', () => {
    it('should define .badge base class', () => {
      expect(css).toContain('.badge');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should set display to inline-flex', () => {
      expect(css).toMatch(/display:\s*inline-flex/);
    });

    it('should center content with align-items and justify-content', () => {
      expect(css).toMatch(/align-items:\s*center/);
      expect(css).toMatch(/justify-content:\s*center/);
    });

    it('should set pill-shaped border-radius', () => {
      expect(css).toMatch(/border-radius:\s*var\(--radius-full\)/);
    });

    it('should set font-size to 0.75rem', () => {
      expect(css).toMatch(/\.badge\s*\{[^}]*font-size:\s*0\.75rem/s);
    });

    it('should set font-weight to 500', () => {
      expect(css).toMatch(/font-weight:\s*500/);
    });

    it('should prevent text wrapping', () => {
      expect(css).toMatch(/white-space:\s*nowrap/);
    });

    it('should use surface-container background by default', () => {
      expect(css).toMatch(
        /\.badge\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color by default', () => {
      expect(css).toMatch(
        /\.badge\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });
  });

  describe('Color Variants', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const color of colors) {
      it(`should define .badge-${color} class`, () => {
        expect(css).toContain(`.badge-${color}`);
      });

      it(`should use --color-${color} for badge-${color} background`, () => {
        expect(css).toContain(`var(--color-${color})`);
      });

      it(`should use --color-${color}-content for badge-${color} text`, () => {
        expect(css).toContain(`var(--color-${color}-content)`);
      });
    }

    it('should set background-color and color for primary variant', () => {
      expect(css).toMatch(
        /\.badge-primary\s*\{[^}]*background-color:\s*var\(--color-primary\)/s,
      );
      expect(css).toMatch(
        /\.badge-primary\s*\{[^}]*color:\s*var\(--color-primary-content\)/s,
      );
    });
  });

  describe('Outline Variant', () => {
    it('should define .badge-outline class', () => {
      expect(css).toContain('.badge-outline');
    });

    it('should have transparent background for base outline', () => {
      expect(css).toMatch(
        /\.badge-outline\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should have border using currentColor for base outline', () => {
      expect(css).toMatch(
        /\.badge-outline\s*\{[^}]*border:\s*1px solid currentColor/s,
      );
    });

    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const color of colors) {
      it(`should define outline + ${color} combo`, () => {
        expect(css).toContain(`.badge-outline.badge-${color}`);
      });

      it(`should set color and border-color for outline ${color}`, () => {
        const regex = new RegExp(
          `\\.badge-outline\\.badge-${color}\\s*\\{[^}]*color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(regex);

        const borderRegex = new RegExp(
          `\\.badge-outline\\.badge-${color}\\s*\\{[^}]*border-color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(borderRegex);
      });
    }
  });

  describe('Soft/Tonal Variant', () => {
    it('should define .badge-soft class', () => {
      expect(css).toContain('.badge-soft');
    });

    it('should use primary-container background for base soft variant', () => {
      expect(css).toMatch(
        /\.badge-soft\s*\{[^}]*background-color:\s*var\(--color-primary-container\)/s,
      );
    });

    it('should use on-primary-container text for base soft variant', () => {
      expect(css).toMatch(
        /\.badge-soft\s*\{[^}]*color:\s*var\(--color-on-primary-container\)/s,
      );
    });

    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const color of colors) {
      it(`should define soft + ${color} combo`, () => {
        expect(css).toContain(`.badge-soft.badge-${color}`);
      });

      it(`should use ${color}-container tokens for soft ${color}`, () => {
        expect(css).toContain(`var(--color-${color}-container)`);
        expect(css).toContain(`var(--color-on-${color}-container)`);
      });
    }
  });

  describe('Size Variants', () => {
    it('should define .badge-sm class', () => {
      expect(css).toContain('.badge-sm');
    });

    it('should define .badge-lg class', () => {
      expect(css).toContain('.badge-lg');
    });

    it('should have smaller font-size for badge-sm', () => {
      expect(css).toMatch(
        /\.badge-sm\s*\{[^}]*font-size:\s*0\.625rem/s,
      );
    });

    it('should have smaller padding for badge-sm', () => {
      expect(css).toMatch(
        /\.badge-sm\s*\{[^}]*padding:\s*0 0\.375rem/s,
      );
    });

    it('should have larger font-size for badge-lg', () => {
      expect(css).toMatch(
        /\.badge-lg\s*\{[^}]*font-size:\s*0\.875rem/s,
      );
    });

    it('should have larger padding for badge-lg', () => {
      expect(css).toMatch(
        /\.badge-lg\s*\{[^}]*padding:\s*0\.25rem 0\.75rem/s,
      );
    });
  });

  describe('Indicator Variant', () => {
    it('should define .badge-indicator class', () => {
      expect(css).toContain('.badge-indicator');
    });

    it('should use relative positioning for indicator', () => {
      expect(css).toMatch(
        /\.badge-indicator\s*\{[^}]*position:\s*relative/s,
      );
    });

    it('should add left padding for indicator dot space', () => {
      expect(css).toMatch(
        /\.badge-indicator\s*\{[^}]*padding-left:\s*1rem/s,
      );
    });

    it('should use ::before pseudo-element for the indicator dot', () => {
      expect(css).toContain('.badge-indicator::before');
    });

    it('should make the indicator dot a circle', () => {
      expect(css).toMatch(
        /\.badge-indicator::before\s*\{[^}]*border-radius:\s*var\(--radius-full\)/s,
      );
    });

    it('should color the indicator dot with currentColor', () => {
      expect(css).toMatch(
        /\.badge-indicator::before\s*\{[^}]*background-color:\s*currentColor/s,
      );
    });
  });

  describe('Dot Variant', () => {
    it('should define .badge-dot class', () => {
      expect(css).toContain('.badge-dot');
    });

    it('should be a small circle with no padding', () => {
      expect(css).toMatch(/\.badge-dot\s*\{[^}]*padding:\s*0/s);
      expect(css).toMatch(/\.badge-dot\s*\{[^}]*border-radius:\s*var\(--radius-full\)/s);
    });

    it('should have fixed width and height', () => {
      expect(css).toMatch(/\.badge-dot\s*\{[^}]*width:\s*0\.5rem/s);
      expect(css).toMatch(/\.badge-dot\s*\{[^}]*height:\s*0\.5rem/s);
    });
  });
});
