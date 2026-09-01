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

    const extendedColors = [
      { name: 'accent', background: 'accent', content: 'accent-content' },
      { name: 'neutral', background: 'neutral', content: 'neutral-content' },
      { name: 'base', background: 'base-100', content: 'base-content' },
    ];

    for (const { name, background, content } of extendedColors) {
      it(`should define badge-${name} with the correct filled tokens`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.badge-${name}\\s*\\{[^}]*background-color:\\s*var\\(--color-${background}\\)[^}]*color:\\s*var\\(--color-${content}\\)`,
            's',
          ),
        );
      });
    }
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

    for (const color of ['accent', 'neutral', 'base']) {
      it(`should define outline + ${color} combo`, () => {
        expect(css).toContain(`.badge-outline.badge-${color}`);
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

    it('should derive accent and neutral soft backgrounds from existing tokens', () => {
      for (const color of ['accent', 'neutral']) {
        expect(css).toMatch(
          new RegExp(
            `\\.badge-soft\\.badge-${color}\\s*\\{[^}]*background-color:\\s*color-mix\\(in oklch, var\\(--color-${color}\\) 15%, var\\(--color-surface\\)\\)[^}]*color:\\s*var\\(--color-on-surface\\)`,
            's',
          ),
        );
      }
    });

    it('should use base scale tokens for the base soft variant', () => {
      expect(css).toMatch(
        /\.badge-soft\.badge-base\s*\{[^}]*background-color:\s*var\(--color-base-200\)[^}]*color:\s*var\(--color-base-content\)/s,
      );
    });
  });

  describe('Legacy Tonal and Outlined Aliases', () => {
    it('should expose the documented tonal and outlined aliases', () => {
      expect(css).toContain('.badge-tonal');
      expect(css).toContain('.badge-outlined');
    });

    for (const color of ['secondary', 'tertiary']) {
      it(`should expose single-class tonal and outlined ${color} aliases`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.badge-tonal-${color},\\s*\\.badge-soft\\.badge-${color}\\s*\\{[^}]*background-color:\\s*var\\(--color-${color}-container\\)[^}]*color:\\s*var\\(--color-on-${color}-container\\)`,
            's',
          ),
        );
        expect(css).toMatch(
          new RegExp(
            `\\.badge-outlined\\.badge-${color},\\s*\\.badge-outlined-${color},\\s*\\.badge-outline\\.badge-${color}\\s*\\{[^}]*color:\\s*var\\(--color-${color}\\)[^}]*border-color:\\s*var\\(--color-${color}\\)`,
            's',
          ),
        );
        expect(css).toMatch(
          new RegExp(
            `\\.badge-outlined-${color},[\\s\\S]*?\\.badge-outline\\s*\\{[^}]*background-color:\\s*transparent[^}]*border:\\s*1px solid currentColor`,
            's',
          ),
        );
      });
    }

    for (const color of [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ]) {
      it(`should compose tonal and outlined aliases with badge-${color}`, () => {
        expect(css).toContain(`.badge-tonal.badge-${color}`);
        expect(css).toContain(`.badge-outlined.badge-${color}`);
      });
    }

    it('should share canonical declarations for composed semantic aliases', () => {
      expect(css).toMatch(
        /\.badge-tonal\.badge-success,\s*\.badge-soft\.badge-success\s*\{[^}]*background-color:\s*var\(--color-success-container\)[^}]*color:\s*var\(--color-on-success-container\)/s,
      );
      expect(css).toMatch(
        /\.badge-outlined\.badge-warning,\s*\.badge-outline\.badge-warning\s*\{[^}]*color:\s*var\(--color-warning\)[^}]*border-color:\s*var\(--color-warning\)/s,
      );
    });
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
