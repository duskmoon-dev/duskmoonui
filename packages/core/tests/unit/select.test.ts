/**
 * Unit tests for select component class generation
 * Tests that select CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Select Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/select.css'),
      'utf-8',
    );
  });

  describe('Base Select Classes', () => {
    it('should define .select base class', () => {
      expect(css).toContain('.select');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should set display block', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*display:\s*block/s);
    });

    it('should set full width', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*width:\s*100%/s);
    });

    it('should include padding', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*padding/s);
    });

    it('should include border-radius', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*border-radius/s);
    });

    it('should set appearance none for custom styling', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*appearance:\s*none/s);
    });

    it('should set cursor pointer', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should include a dropdown arrow background-image', () => {
      expect(css).toMatch(/\.select\s*\{[^}]*background-image:\s*url\(/s);
    });
  });

  describe('Border Pattern', () => {
    it('should use currentColor border on base class', () => {
      expect(css).toMatch(
        /\.select\s*\{[^}]*border:\s*1px\s+solid\s+currentColor/s,
      );
    });
  });

  describe('Color Variants', () => {
    it('should define .select-primary class', () => {
      expect(css).toContain('.select-primary');
    });

    it('should define .select-secondary class', () => {
      expect(css).toContain('.select-secondary');
    });

    it('should define .select-tertiary class', () => {
      expect(css).toContain('.select-tertiary');
    });

    it('should set color to primary token for primary variant', () => {
      expect(css).toMatch(
        /\.select-primary\s*\{[^}]*color:\s*var\(--color-primary\)/s,
      );
    });

    it('should set color to secondary token for secondary variant', () => {
      expect(css).toMatch(
        /\.select-secondary\s*\{[^}]*color:\s*var\(--color-secondary\)/s,
      );
    });

    it('should set color to tertiary token for tertiary variant', () => {
      expect(css).toMatch(
        /\.select-tertiary\s*\{[^}]*color:\s*var\(--color-tertiary\)/s,
      );
    });
  });

  describe('Semantic Color Variants', () => {
    it('should define .select-info class', () => {
      expect(css).toContain('.select-info');
    });

    it('should define .select-success class', () => {
      expect(css).toContain('.select-success');
    });

    it('should define .select-warning class', () => {
      expect(css).toContain('.select-warning');
    });

    it('should define .select-error class', () => {
      expect(css).toContain('.select-error');
    });

    it('should use info color token', () => {
      expect(css).toMatch(
        /\.select-info\s*\{[^}]*color:\s*var\(--color-info\)/s,
      );
    });

    it('should use success color token', () => {
      expect(css).toMatch(
        /\.select-success\s*\{[^}]*color:\s*var\(--color-success\)/s,
      );
    });

    it('should use warning color token', () => {
      expect(css).toMatch(
        /\.select-warning\s*\{[^}]*color:\s*var\(--color-warning\)/s,
      );
    });

    it('should use error color token', () => {
      expect(css).toMatch(
        /\.select-error\s*\{[^}]*color:\s*var\(--color-error\)/s,
      );
    });
  });

  describe('Ghost Variant', () => {
    it('should define .select-ghost class', () => {
      expect(css).toContain('.select-ghost');
    });

    it('should set transparent background on ghost', () => {
      expect(css).toMatch(
        /\.select-ghost\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should set transparent border on ghost', () => {
      expect(css).toMatch(
        /\.select-ghost\s*\{[^}]*border-color:\s*transparent/s,
      );
    });

    it('should keep border transparent on ghost hover', () => {
      expect(css).toMatch(
        /\.select-ghost:hover:not\(:disabled\)\s*\{[^}]*border-color:\s*transparent/s,
      );
    });

    it('should show surface-container background on ghost hover', () => {
      expect(css).toMatch(
        /\.select-ghost:hover:not\(:disabled\)\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should have focus-visible ring on ghost', () => {
      expect(css).toMatch(
        /\.select-ghost:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 3px/s,
      );
    });
  });

  describe('Size Variants', () => {
    it('should define .select-xs class for extra small', () => {
      expect(css).toContain('.select-xs');
    });

    it('should define .select-sm class for small', () => {
      expect(css).toContain('.select-sm');
    });

    it('should define .select-lg class for large', () => {
      expect(css).toContain('.select-lg');
    });

    it('should have smaller font-size for xs', () => {
      expect(css).toMatch(
        /\.select-xs\s*\{[^}]*font-size:\s*0\.75rem/s,
      );
    });

    it('should have smaller font-size for sm', () => {
      expect(css).toMatch(
        /\.select-sm\s*\{[^}]*font-size:\s*0\.875rem/s,
      );
    });

    it('should have larger font-size for lg', () => {
      expect(css).toMatch(
        /\.select-lg\s*\{[^}]*font-size:\s*1\.125rem/s,
      );
    });

    it('should have smaller border-radius for xs', () => {
      expect(css).toMatch(
        /\.select-xs\s*\{[^}]*border-radius:\s*var\(--radius-xs\)/s,
      );
    });

    it('should have larger border-radius for lg', () => {
      expect(css).toMatch(
        /\.select-lg\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s,
      );
    });
  });

  describe('Focus Ring', () => {
    it('should define focus-visible state', () => {
      expect(css).toMatch(/\.select:focus-visible/);
    });

    it('should use box-shadow for focus ring', () => {
      expect(css).toMatch(
        /\.select:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 3px/s,
      );
    });

    it('should use color-mix with currentColor for focus ring', () => {
      expect(css).toMatch(
        /\.select:focus-visible\s*\{[^}]*color-mix\(in oklch,\s*currentColor\s+20%,\s*transparent\)/s,
      );
    });
  });

  describe('Disabled State', () => {
    it('should define disabled state', () => {
      expect(css).toMatch(/\.select:disabled/);
    });

    it('should set cursor not-allowed when disabled', () => {
      expect(css).toMatch(
        /\.select:disabled\s*\{[^}]*cursor:\s*not-allowed/s,
      );
    });

    it('should reduce opacity when disabled', () => {
      expect(css).toMatch(
        /\.select:disabled\s*\{[^}]*opacity:\s*0\.5/s,
      );
    });

    it('should change background when disabled', () => {
      expect(css).toMatch(
        /\.select:disabled\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });
  });

  describe('Background and Colors', () => {
    it('should use surface color for background', () => {
      expect(css).toMatch(
        /\.select\s*\{[^}]*background-color:\s*var\(--color-surface\)/s,
      );
    });

    it('should use on-surface color for text', () => {
      expect(css).toMatch(
        /\.select\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });
  });

  describe('Hover State', () => {
    it('should define hover state for non-disabled', () => {
      expect(css).toMatch(/\.select:hover:not\(:disabled\)/);
    });

    it('should change background on hover', () => {
      expect(css).toMatch(
        /\.select:hover:not\(:disabled\)\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });
  });

  describe('Filled Variant', () => {
    it('should define .select-filled class', () => {
      expect(css).toContain('.select-filled');
    });

    it('should use surface-container background for filled', () => {
      expect(css).toMatch(
        /\.select-filled\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should have bottom border only for filled', () => {
      expect(css).toMatch(
        /\.select-filled\s*\{[^}]*border:\s*none[^}]*border-bottom:\s*2px\s+solid/s,
      );
    });

    it('should use outline color for filled border-bottom', () => {
      expect(css).toMatch(
        /\.select-filled\s*\{[^}]*border-bottom:\s*2px\s+solid\s+var\(--color-outline\)/s,
      );
    });

    it('should have focus-visible color variants for filled', () => {
      expect(css).toMatch(/\.select-filled\.select-primary:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-secondary:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-tertiary:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-info:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-success:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-warning:focus-visible/);
      expect(css).toMatch(/\.select-filled\.select-error:focus-visible/);
    });
  });

  describe('Outlined Variant', () => {
    it('should define .select-outlined class', () => {
      expect(css).toContain('.select-outlined');
    });

    it('should use transparent background for outlined', () => {
      expect(css).toMatch(
        /\.select-outlined\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should use outline color for outlined border', () => {
      expect(css).toMatch(
        /\.select-outlined\s*\{[^}]*border:\s*1px\s+solid\s+var\(--color-outline\)/s,
      );
    });
  });

  describe('Container and Helper Classes', () => {
    it('should define .select-container class', () => {
      expect(css).toContain('.select-container');
    });

    it('should define .select-label class', () => {
      expect(css).toContain('.select-label');
    });

    it('should define .select-helper class', () => {
      expect(css).toContain('.select-helper');
    });

    it('should use on-surface color for label', () => {
      expect(css).toMatch(
        /\.select-label\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should use on-surface-variant color for helper text', () => {
      expect(css).toMatch(
        /\.select-helper\s*\{[^}]*color:\s*var\(--color-on-surface-variant\)/s,
      );
    });

    it('should use error color for helper in error container', () => {
      expect(css).toMatch(
        /\.select-container-error\s+\.select-helper\s*\{[^}]*color:\s*var\(--color-error\)/s,
      );
    });
  });

  describe('Multiple Select', () => {
    it('should define .select-multiple class', () => {
      expect(css).toContain('.select-multiple');
    });

    it('should remove dropdown arrow background-image for multiple', () => {
      expect(css).toMatch(
        /\.select-multiple\s*\{[^}]*background-image:\s*none/s,
      );
    });

    it('should use primary-container for checked options', () => {
      expect(css).toMatch(
        /\.select-multiple\s+option:checked\s*\{[^}]*background-color:\s*var\(--color-primary-container\)/s,
      );
    });
  });

  describe('Transitions', () => {
    it('should include transition for smooth state changes', () => {
      expect(css).toMatch(
        /\.select\s*\{[^}]*transition/s,
      );
    });

    it('should transition border-color and box-shadow', () => {
      expect(css).toMatch(/transition:[^;]*border-color/);
      expect(css).toMatch(/transition:[^;]*box-shadow/);
    });
  });

  describe('Reduced Motion', () => {
    it('should respect prefers-reduced-motion', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable transition for reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[^}]*\{[^}]*\.select\s*\{[^}]*transition:\s*none/s,
      );
    });
  });
});
