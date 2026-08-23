/**
 * Unit tests for button component class generation
 * Tests that button CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Button Component', () => {
  let buttonCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/button.css');
    buttonCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Base Button Classes', () => {
    it('should define .btn base class', () => {
      expect(buttonCSS).toContain('.btn');
    });

    it('should include @layer components directive', () => {
      expect(buttonCSS).toContain('@layer components');
    });

    it('should set display and alignment properties', () => {
      // Base button should be inline-flex with centered content
      expect(buttonCSS).toMatch(/display:\s*inline-flex/);
      expect(buttonCSS).toMatch(/align-items:\s*center/);
      expect(buttonCSS).toMatch(/justify-content:\s*center/);
    });

    it('should include cursor pointer', () => {
      expect(buttonCSS).toMatch(/cursor:\s*pointer/);
    });

    it('should include transition for smooth interactions', () => {
      expect(buttonCSS).toContain('transition');
    });
  });

  describe('Color Variants', () => {
    it('should define .btn-primary class', () => {
      expect(buttonCSS).toContain('.btn-primary');
    });

    it('should define .btn-secondary class', () => {
      expect(buttonCSS).toContain('.btn-secondary');
    });

    it('should define .btn-tertiary class', () => {
      expect(buttonCSS).toContain('.btn-tertiary');
    });

    it('should use CSS custom properties for primary colors', () => {
      // Should reference --color-primary and --color-primary-content
      expect(buttonCSS).toContain('var(--color-primary)');
      expect(buttonCSS).toContain('var(--color-primary-content)');
    });

    it('should use CSS custom properties for secondary colors', () => {
      expect(buttonCSS).toContain('var(--color-secondary)');
      expect(buttonCSS).toContain('var(--color-secondary-content)');
    });

    it('should use CSS custom properties for tertiary colors', () => {
      expect(buttonCSS).toContain('var(--color-tertiary)');
      expect(buttonCSS).toContain('var(--color-tertiary-content)');
    });

    const extendedColors = [
      { name: 'accent', background: 'accent', content: 'accent-content' },
      { name: 'neutral', background: 'neutral', content: 'neutral-content' },
      { name: 'base', background: 'base-100', content: 'base-content' },
    ];

    for (const { name, background, content } of extendedColors) {
      it(`should define .btn-${name} with the correct filled tokens`, () => {
        expect(buttonCSS).toMatch(
          new RegExp(
            `\\.btn-${name}\\s*\\{[^}]*--btn-text-color:\\s*var\\(--color-${content}\\)[^}]*background-color:\\s*var\\(--color-${background}\\)`,
            's',
          ),
        );
      });

      it(`should support outline, ghost, text, and tonal ${name} variants`, () => {
        expect(buttonCSS).toContain(`.btn-outline.btn-${name}`);
        expect(buttonCSS).toContain(`.btn-ghost.btn-${name}`);
        expect(buttonCSS).toContain(`.btn-text.btn-${name}`);
        expect(buttonCSS).toContain(`.btn-tonal.btn-${name}`);
      });
    }

    for (const color of ['accent', 'neutral']) {
      it(`should use theme-aware text for tonal ${color}`, () => {
        expect(buttonCSS).toMatch(
          new RegExp(
            `\\.btn-tonal\\.btn-${color}\\s*\\{[^}]*--btn-text-color:\\s*var\\(--color-on-surface\\)`,
            's',
          ),
        );
      });
    }
  });

  describe('Style Variants', () => {
    it('should define .btn-outline class', () => {
      expect(buttonCSS).toContain('.btn-outline');
    });

    it('should define .btn-ghost class', () => {
      expect(buttonCSS).toContain('.btn-ghost');
    });

    it('should have transparent background for ghost variant', () => {
      // Ghost buttons should have transparent or similar background
      expect(buttonCSS).toMatch(/\.btn-ghost[^}]*background[^}]*transparent/s);
    });

    it('should have border for outline variant', () => {
      expect(buttonCSS).toMatch(/\.btn-outline[^}]*border/s);
    });
  });

  describe('Size Variants', () => {
    it('should define .btn-xs class for extra small', () => {
      expect(buttonCSS).toContain('.btn-xs');
    });

    it('should define .btn-sm class for small', () => {
      expect(buttonCSS).toContain('.btn-sm');
    });

    it('should define .btn-lg class for large', () => {
      expect(buttonCSS).toContain('.btn-lg');
    });

    it('should have smaller padding/font for xs', () => {
      // btn-xs should have smaller sizing
      expect(buttonCSS).toMatch(/\.btn-xs[^}]*(padding|font-size)/s);
    });

    it('should have larger padding/font for lg', () => {
      // btn-lg should have larger sizing
      expect(buttonCSS).toMatch(/\.btn-lg[^}]*(padding|font-size)/s);
    });
  });

  describe('Interactive States', () => {
    it('should define hover state styles', () => {
      expect(buttonCSS).toMatch(/\.btn[^{]*:hover/);
    });

    it('should define focus state styles', () => {
      expect(buttonCSS).toMatch(/\.btn[^{]*:focus/);
    });

    it('should define active state styles', () => {
      expect(buttonCSS).toMatch(/\.btn[^{]*:active/);
    });

    it('should define disabled state styles', () => {
      expect(buttonCSS).toMatch(/\.btn[^{]*:disabled/);
    });

    it('should use color-mix for primary variant hover/focus', () => {
      // OKLCH uses color-mix() for hover/focus states instead of -focus tokens
      expect(buttonCSS).toContain('color-mix(in oklch, var(--color-primary)');
    });
  });

  describe('Semantic Color Variants', () => {
    it('should define .btn-info class', () => {
      expect(buttonCSS).toContain('.btn-info');
    });

    it('should define .btn-success class', () => {
      expect(buttonCSS).toContain('.btn-success');
    });

    it('should define .btn-warning class', () => {
      expect(buttonCSS).toContain('.btn-warning');
    });

    it('should define .btn-error class', () => {
      expect(buttonCSS).toContain('.btn-error');
    });

    it('should define filled semantic colors before outline/text so variants keep transparent backgrounds', () => {
      // Same-specificity cascade: later .btn-success would paint over .btn-outline/.btn-text
      // and leave --btn-text-color as the semantic hue → invisible text on filled bg.
      const filledSuccess = buttonCSS.indexOf('\n  .btn-success {');
      const outlineVariant = buttonCSS.indexOf('\n  .btn-outline,');
      const textVariant = buttonCSS.indexOf('\n  .btn-text {');

      expect(filledSuccess).toBeGreaterThan(-1);
      expect(outlineVariant).toBeGreaterThan(-1);
      expect(textVariant).toBeGreaterThan(-1);
      expect(filledSuccess).toBeLessThan(outlineVariant);
      expect(filledSuccess).toBeLessThan(textVariant);
    });
  });

  describe('Accessibility', () => {
    it('should include focus-visible styles for keyboard navigation', () => {
      expect(buttonCSS).toMatch(/:focus-visible/);
    });

    it('should have visible focus ring', () => {
      // Focus should have outline or ring
      expect(buttonCSS).toMatch(/focus[^}]*(outline|ring)/s);
    });
  });
});
