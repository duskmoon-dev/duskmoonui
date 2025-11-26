/**
 * Unit tests for input component class generation
 * Tests that input CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Input Component', () => {
  let inputCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/input.css');
    inputCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Base Input Classes', () => {
    it('should define .input base class', () => {
      expect(inputCSS).toContain('.input');
    });

    it('should include @layer components directive', () => {
      expect(inputCSS).toContain('@layer components');
    });

    it('should set display block or inline-block', () => {
      expect(inputCSS).toMatch(/display:\s*(block|inline-block|flex)/);
    });

    it('should have width styling', () => {
      expect(inputCSS).toMatch(/width/);
    });

    it('should include padding', () => {
      expect(inputCSS).toMatch(/padding/);
    });

    it('should include border-radius', () => {
      expect(inputCSS).toMatch(/border-radius/);
    });
  });

  describe('Border Variant', () => {
    it('should define .input-bordered class', () => {
      expect(inputCSS).toContain('.input-bordered');
    });

    it('should have border in bordered variant', () => {
      expect(inputCSS).toMatch(/\.input-bordered[^}]*border/s);
    });

    it('should use outline color for border', () => {
      expect(inputCSS).toContain('var(--color-outline');
    });
  });

  describe('Color Variants', () => {
    it('should define .input-primary class', () => {
      expect(inputCSS).toContain('.input-primary');
    });

    it('should define .input-secondary class', () => {
      expect(inputCSS).toContain('.input-secondary');
    });

    it('should define .input-tertiary class', () => {
      expect(inputCSS).toContain('.input-tertiary');
    });

    it('should use primary color for primary variant border', () => {
      expect(inputCSS).toContain('var(--color-primary)');
    });

    it('should use secondary color for secondary variant', () => {
      expect(inputCSS).toContain('var(--color-secondary)');
    });

    it('should use tertiary color for tertiary variant', () => {
      expect(inputCSS).toContain('var(--color-tertiary)');
    });
  });

  describe('Semantic Color Variants', () => {
    it('should define .input-info class', () => {
      expect(inputCSS).toContain('.input-info');
    });

    it('should define .input-success class', () => {
      expect(inputCSS).toContain('.input-success');
    });

    it('should define .input-warning class', () => {
      expect(inputCSS).toContain('.input-warning');
    });

    it('should define .input-error class', () => {
      expect(inputCSS).toContain('.input-error');
    });
  });

  describe('Size Variants', () => {
    it('should define .input-xs class for extra small', () => {
      expect(inputCSS).toContain('.input-xs');
    });

    it('should define .input-sm class for small', () => {
      expect(inputCSS).toContain('.input-sm');
    });

    it('should define .input-lg class for large', () => {
      expect(inputCSS).toContain('.input-lg');
    });

    it('should have smaller height for xs', () => {
      expect(inputCSS).toMatch(/\.input-xs[^}]*(height|padding|font-size)/s);
    });

    it('should have larger height for lg', () => {
      expect(inputCSS).toMatch(/\.input-lg[^}]*(height|padding|font-size)/s);
    });
  });

  describe('Interactive States', () => {
    it('should define focus state styles', () => {
      expect(inputCSS).toMatch(/\.input[^{]*:focus/);
    });

    it('should define disabled state styles', () => {
      expect(inputCSS).toMatch(/\.input[^{]*:disabled/);
    });

    it('should have focus ring or outline', () => {
      expect(inputCSS).toMatch(/focus[^}]*(outline|ring|border)/s);
    });

    it('should include focus-visible for keyboard navigation', () => {
      expect(inputCSS).toMatch(/:focus-visible/);
    });
  });

  describe('Placeholder Styling', () => {
    it('should style placeholder text', () => {
      expect(inputCSS).toMatch(/::placeholder/);
    });

    it('should use appropriate placeholder color', () => {
      expect(inputCSS).toMatch(/placeholder[^}]*color/s);
    });
  });

  describe('Background and Colors', () => {
    it('should use surface color for background', () => {
      expect(inputCSS).toContain('var(--color-surface');
    });

    it('should use on-surface color for text', () => {
      expect(inputCSS).toContain('var(--color-on-surface');
    });
  });

  describe('Transitions', () => {
    it('should include transition for smooth state changes', () => {
      expect(inputCSS).toContain('transition');
    });
  });
});
