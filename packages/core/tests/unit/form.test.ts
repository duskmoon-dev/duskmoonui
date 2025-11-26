/**
 * Unit tests for form component class generation
 * Tests that form CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Form Component', () => {
  let formCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/form.css');
    formCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Form Control', () => {
    it('should define .form-control class', () => {
      expect(formCSS).toContain('.form-control');
    });

    it('should include @layer components directive', () => {
      expect(formCSS).toContain('@layer components');
    });

    it('should use flexbox for layout', () => {
      expect(formCSS).toMatch(/\.form-control[^}]*display:\s*flex/s);
    });

    it('should use column direction', () => {
      expect(formCSS).toMatch(/\.form-control[^}]*flex-direction:\s*column/s);
    });

    it('should have gap between elements', () => {
      expect(formCSS).toMatch(/\.form-control[^}]*gap/s);
    });
  });

  describe('Label Styling', () => {
    it('should define .label class', () => {
      expect(formCSS).toContain('.label');
    });

    it('should have display flex for label', () => {
      expect(formCSS).toMatch(/\.label[^}]*display:\s*flex/s);
    });

    it('should have justify-content for label alignment', () => {
      expect(formCSS).toMatch(/\.label[^}]*justify-content/s);
    });

    it('should define .label-text class', () => {
      expect(formCSS).toContain('.label-text');
    });

    it('should have appropriate font size for label-text', () => {
      expect(formCSS).toMatch(/\.label-text[^}]*font-size/s);
    });

    it('should define .label-text-alt class for helper text', () => {
      expect(formCSS).toContain('.label-text-alt');
    });

    it('should have smaller font size for alt text', () => {
      expect(formCSS).toMatch(/\.label-text-alt[^}]*font-size/s);
    });
  });

  describe('Color Integration', () => {
    it('should use base-content color for labels', () => {
      expect(formCSS).toContain('var(--color-base-content)');
    });

    it('should use on-surface-variant for alt text', () => {
      expect(formCSS).toContain('var(--color-on-surface-variant)');
    });
  });

  describe('Checkbox and Radio', () => {
    it('should define .checkbox class', () => {
      expect(formCSS).toContain('.checkbox');
    });

    it('should define .radio class', () => {
      expect(formCSS).toContain('.radio');
    });

    it('should have appearance none for custom styling', () => {
      expect(formCSS).toMatch(/appearance:\s*none/);
    });

    it('should have cursor pointer', () => {
      expect(formCSS).toMatch(/cursor:\s*pointer/);
    });

    it('should define checked state', () => {
      expect(formCSS).toMatch(/:checked/);
    });
  });

  describe('Toggle/Switch', () => {
    it('should define .toggle class', () => {
      expect(formCSS).toContain('.toggle');
    });

    it('should have width and height for toggle', () => {
      expect(formCSS).toMatch(/\.toggle[^}]*(width|height)/s);
    });
  });

  describe('Select', () => {
    it('should define .select class', () => {
      expect(formCSS).toContain('.select');
    });

    it('should have appearance none for custom styling', () => {
      expect(formCSS).toMatch(/\.select[^}]*appearance:\s*none/s);
    });

    it('should have background image for dropdown arrow', () => {
      expect(formCSS).toMatch(/\.select[^}]*background-image/s);
    });
  });

  describe('Textarea', () => {
    it('should define .textarea class', () => {
      expect(formCSS).toContain('.textarea');
    });

    it('should have min-height', () => {
      expect(formCSS).toMatch(/\.textarea[^}]*min-height/s);
    });

    it('should handle resize property', () => {
      expect(formCSS).toMatch(/\.textarea[^}]*resize/s);
    });
  });

  describe('Validation States', () => {
    it('should support error state styling', () => {
      expect(formCSS).toMatch(/\.form-control[^}]*\.error|\.input-error/);
    });

    it('should use error color for error states', () => {
      expect(formCSS).toContain('var(--color-error)');
    });

    it('should support success state styling', () => {
      const hasSuccess = formCSS.includes('success') || formCSS.includes('valid');
      expect(hasSuccess).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should include focus styles', () => {
      expect(formCSS).toMatch(/:focus/);
    });

    it('should include focus-visible for keyboard navigation', () => {
      expect(formCSS).toMatch(/:focus-visible/);
    });
  });

  describe('Spacing', () => {
    it('should have consistent padding', () => {
      expect(formCSS).toMatch(/padding/);
    });

    it('should have margin for form groups', () => {
      expect(formCSS).toMatch(/margin/);
    });
  });
});
