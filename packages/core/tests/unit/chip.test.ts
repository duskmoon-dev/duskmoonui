/**
 * Unit tests for chip component class generation
 * Tests that chip CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Chip Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/chip.css'),
      'utf-8',
    );
  });

  describe('Base Chip Class', () => {
    it('should define .chip base class', () => {
      expect(css).toContain('.chip');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should set display to inline-flex', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should center content with align-items', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*align-items:\s*center/s);
    });

    it('should set gap between elements', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*gap:\s*0\.375rem/s);
    });

    it('should set padding', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*padding:\s*0\.375rem 0\.75rem/s);
    });

    it('should set font-size to 0.875rem', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*font-size:\s*0\.875rem/s);
    });

    it('should set font-weight to 500', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*font-weight:\s*500/s);
    });

    it('should set border-radius to 0.5rem', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*border-radius:\s*0\.5rem/s);
    });

    it('should use surface-container background by default', () => {
      expect(css).toMatch(
        /\.chip\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color by default', () => {
      expect(css).toMatch(
        /\.chip\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should have transparent border by default', () => {
      expect(css).toMatch(
        /\.chip\s*\{[^}]*border:\s*1px solid transparent/s,
      );
    });

    it('should have transition for smooth interactions', () => {
      expect(css).toMatch(/\.chip\s*\{[^}]*transition:/s);
    });
  });

  describe('Interactive Chip', () => {
    it('should define .chip-clickable class', () => {
      expect(css).toContain('.chip-clickable');
    });

    it('should set cursor pointer for clickable chips', () => {
      expect(css).toMatch(
        /\.chip-clickable\s*\{[^}]*cursor:\s*pointer/s,
      );
    });

    it('should have hover state for clickable chips', () => {
      expect(css).toContain('.chip-clickable:hover');
    });

    it('should have active state with scale transform', () => {
      expect(css).toMatch(
        /\.chip-clickable:active\s*\{[^}]*transform:\s*scale\(0\.98\)/s,
      );
    });
  });

  describe('Focus Visible', () => {
    it('should define focus-visible styles', () => {
      expect(css).toContain('.chip:focus-visible');
    });

    it('should use color-mix for focus ring', () => {
      expect(css).toMatch(
        /\.chip:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 3px color-mix/s,
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
      it(`should define .chip-${color} class`, () => {
        expect(css).toContain(`.chip-${color}`);
      });

      it(`should use --color-${color} for chip-${color} background`, () => {
        const regex = new RegExp(
          `\\.chip-${color}\\s*\\{[^}]*background-color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });

      it(`should use --color-${color}-content for chip-${color} text`, () => {
        const regex = new RegExp(
          `\\.chip-${color}\\s*\\{[^}]*color:\\s*var\\(--color-${color}-content\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });

      it(`should have hover state for chip-${color}`, () => {
        expect(css).toContain(`.chip-${color}:hover`);
      });
    }
  });

  describe('Outlined Variant', () => {
    it('should define .chip-outlined class', () => {
      expect(css).toContain('.chip-outlined');
    });

    it('should have transparent background', () => {
      expect(css).toMatch(
        /\.chip-outlined\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should use outline border color', () => {
      expect(css).toMatch(
        /\.chip-outlined\s*\{[^}]*border-color:\s*var\(--color-outline\)/s,
      );
    });

    const colors = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const color of colors) {
      it(`should define outlined + ${color} combo`, () => {
        expect(css).toContain(`.chip-outlined.chip-${color}`);
      });

      it(`should set border-color for outlined ${color}`, () => {
        const regex = new RegExp(
          `\\.chip-outlined\\.chip-${color}\\s*\\{[^}]*border-color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });

      it(`should use container background on hover for outlined ${color}`, () => {
        expect(css).toContain(`.chip-outlined.chip-${color}:hover`);
      });
    }
  });

  describe('Tonal Variant', () => {
    it('should define .chip-tonal class', () => {
      expect(css).toContain('.chip-tonal');
    });

    it('should use surface-container-high for base tonal', () => {
      expect(css).toMatch(
        /\.chip-tonal\s*\{[^}]*background-color:\s*var\(--color-surface-container-high\)/s,
      );
    });

    const colors = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const color of colors) {
      it(`should define tonal + ${color} combo`, () => {
        expect(css).toContain(`.chip-tonal.chip-${color}`);
      });

      it(`should use ${color}-container tokens for tonal ${color}`, () => {
        expect(css).toContain(`var(--color-${color}-container)`);
        expect(css).toContain(`var(--color-on-${color}-container)`);
      });
    }
  });

  describe('Ghost Variant', () => {
    it('should define .chip-ghost class', () => {
      expect(css).toContain('.chip-ghost');
    });

    it('should have transparent background', () => {
      expect(css).toMatch(
        /\.chip-ghost\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should have transparent border-color', () => {
      expect(css).toMatch(
        /\.chip-ghost\s*\{[^}]*border-color:\s*transparent/s,
      );
    });

    const colors = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const color of colors) {
      it(`should define ghost + ${color} combo`, () => {
        expect(css).toContain(`.chip-ghost.chip-${color}`);
      });

      it(`should have hover state for ghost ${color}`, () => {
        expect(css).toContain(`.chip-ghost.chip-${color}:hover`);
      });
    }
  });

  describe('Size Variants', () => {
    it('should define .chip-sm class', () => {
      expect(css).toContain('.chip-sm');
    });

    it('should define .chip-lg class', () => {
      expect(css).toContain('.chip-lg');
    });

    it('should have smaller font-size for chip-sm', () => {
      expect(css).toMatch(
        /\.chip-sm\s*\{[^}]*font-size:\s*0\.75rem/s,
      );
    });

    it('should have smaller padding for chip-sm', () => {
      expect(css).toMatch(
        /\.chip-sm\s*\{[^}]*padding:\s*0\.25rem 0\.5rem/s,
      );
    });

    it('should have larger font-size for chip-lg', () => {
      expect(css).toMatch(
        /\.chip-lg\s*\{[^}]*font-size:\s*1rem/s,
      );
    });

    it('should have larger padding for chip-lg', () => {
      expect(css).toMatch(
        /\.chip-lg\s*\{[^}]*padding:\s*0\.5rem 1rem/s,
      );
    });
  });

  describe('Chip Parts', () => {
    it('should define .chip-icon class', () => {
      expect(css).toContain('.chip-icon');
    });

    it('should define .chip-label class', () => {
      expect(css).toContain('.chip-label');
    });

    it('should define .chip-close class', () => {
      expect(css).toContain('.chip-close');
    });

    it('should make chip-close a button with pointer cursor', () => {
      expect(css).toMatch(
        /\.chip-close\s*\{[^}]*cursor:\s*pointer/s,
      );
    });

    it('should make chip-close circular', () => {
      expect(css).toMatch(
        /\.chip-close\s*\{[^}]*border-radius:\s*50%/s,
      );
    });

    it('should have hover state for chip-close', () => {
      expect(css).toContain('.chip-close:hover');
    });
  });

  describe('Selected State', () => {
    it('should define .chip-selected class', () => {
      expect(css).toContain('.chip-selected');
    });

    it('should use primary background for selected chip', () => {
      expect(css).toMatch(
        /\.chip-selected\s*\{[^}]*background-color:\s*var\(--color-primary\)/s,
      );
    });

    it('should use primary-content text for selected chip', () => {
      expect(css).toMatch(
        /\.chip-selected\s*\{[^}]*color:\s*var\(--color-primary-content\)/s,
      );
    });

    it('should define selected + outlined combo', () => {
      expect(css).toContain('.chip-selected.chip-outlined');
    });
  });

  describe('Disabled State', () => {
    it('should define disabled state styles', () => {
      expect(css).toContain('.chip-disabled');
    });

    it('should reduce opacity when disabled', () => {
      expect(css).toMatch(/opacity:\s*0\.5/);
    });

    it('should prevent pointer events when disabled', () => {
      expect(css).toMatch(/pointer-events:\s*none/);
    });
  });

  describe('Chip Group', () => {
    it('should define .chip-group class', () => {
      expect(css).toContain('.chip-group');
    });

    it('should use flexbox for chip group', () => {
      expect(css).toMatch(
        /\.chip-group\s*\{[^}]*display:\s*flex/s,
      );
    });

    it('should wrap chips in group', () => {
      expect(css).toMatch(
        /\.chip-group\s*\{[^}]*flex-wrap:\s*wrap/s,
      );
    });

    it('should have gap between chips', () => {
      expect(css).toMatch(
        /\.chip-group\s*\{[^}]*gap:\s*0\.5rem/s,
      );
    });
  });

  describe('Reduced Motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });
  });
});
