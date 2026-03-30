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
    it('should use on-surface color for labels', () => {
      expect(formCSS).toContain('var(--color-on-surface)');
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

  describe('Checkbox Color Variants', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const variant of variants) {
      it(`should define .checkbox-${variant} variant`, () => {
        expect(formCSS).toContain(`.checkbox-${variant}`);
      });

      it(`should set ${variant} background on .checkbox-${variant}:checked`, () => {
        expect(formCSS).toMatch(
          new RegExp(`.checkbox-${variant}:checked[^}]*background-color:\\s*var\\(--color-${variant}\\)`, 's')
        );
      });
    }
  });

  describe('Radio Color Variants', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const variant of variants) {
      it(`should define .radio-${variant} variant`, () => {
        expect(formCSS).toContain(`.radio-${variant}`);
      });

      it(`should set ${variant} border on .radio-${variant}:checked`, () => {
        expect(formCSS).toMatch(
          new RegExp(`.radio-${variant}:checked[^}]*border-color:\\s*var\\(--color-${variant}\\)`, 's')
        );
      });

      it(`should set ${variant} fill on .radio-${variant}:checked::after`, () => {
        expect(formCSS).toMatch(
          new RegExp(`.radio-${variant}:checked::after[^}]*background-color:\\s*var\\(--color-${variant}\\)`, 's')
        );
      });
    }
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

    it('should apply focus ring on error state focus', () => {
      expect(formCSS).toMatch(/\.form-control\.error .input:focus-visible[^}]*box-shadow/s);
    });

    it('should support success state styling', () => {
      expect(formCSS).toContain('.form-control.success');
    });

    it('should apply focus ring on success state focus', () => {
      expect(formCSS).toMatch(/\.form-control\.success .input:focus-visible[^}]*box-shadow/s);
    });

    it('should support warning state styling', () => {
      expect(formCSS).toContain('.form-control.warning');
    });

    it('should apply warning color to border in warning state', () => {
      expect(formCSS).toMatch(/\.form-control\.warning[\s\S]*?border-color:\s*var\(--color-warning\)/);
    });

    it('should apply focus ring on warning state focus', () => {
      expect(formCSS).toMatch(/\.form-control\.warning .input:focus-visible[^}]*box-shadow/s);
    });

    it('should apply warning color to label in warning state', () => {
      expect(formCSS).toMatch(/\.form-control\.warning .label-text[^}]*var\(--color-warning\)/s);
    });

    it('should support info state styling', () => {
      expect(formCSS).toContain('.form-control.info');
    });

    it('should apply info color to border in info state', () => {
      expect(formCSS).toMatch(/\.form-control\.info[\s\S]*?border-color:\s*var\(--color-info\)/);
    });

    it('should apply focus ring on info state focus', () => {
      expect(formCSS).toMatch(/\.form-control\.info .input:focus-visible[^}]*box-shadow/s);
    });

    it('should apply info color to label in info state', () => {
      expect(formCSS).toMatch(/\.form-control\.info .label-text[^}]*var\(--color-info\)/s);
    });

    it('should use color-mix for focus ring opacity', () => {
      expect(formCSS).toMatch(/color-mix\(in oklch, var\(--color-error\)/);
    });

    it('should define standalone select-error and textarea-error classes', () => {
      expect(formCSS).toContain('.select-error');
      expect(formCSS).toContain('.textarea-error');
    });

    it('should define standalone success validation classes for all form elements', () => {
      expect(formCSS).toContain('.input-success');
      expect(formCSS).toContain('.select-success');
      expect(formCSS).toContain('.textarea-success');
    });

    it('should define standalone warning validation classes for all form elements', () => {
      expect(formCSS).toContain('.input-warning');
      expect(formCSS).toContain('.select-warning');
      expect(formCSS).toContain('.textarea-warning');
    });

    it('should define standalone info validation classes for all form elements', () => {
      expect(formCSS).toContain('.input-info');
      expect(formCSS).toContain('.select-info');
      expect(formCSS).toContain('.textarea-info');
    });

    it('should define helper-text warning and info variants', () => {
      expect(formCSS).toMatch(/\.helper-text\.warning[^}]*var\(--color-warning\)/s);
      expect(formCSS).toMatch(/\.helper-text\.info[^}]*var\(--color-info\)/s);
    });

    it('should support native :user-invalid pseudo-class', () => {
      expect(formCSS).toContain(':user-invalid');
      expect(formCSS).toMatch(/\.input:user-invalid[^}]*border-color:\s*var\(--color-error\)/s);
    });

    it('should support native :user-valid pseudo-class', () => {
      expect(formCSS).toContain(':user-valid');
      expect(formCSS).toMatch(/\.input:user-valid[^}]*border-color:\s*var\(--color-success\)/s);
    });

    it('should apply focus ring on :user-invalid focus', () => {
      expect(formCSS).toMatch(/\.input:user-invalid:focus-visible[^}]*box-shadow/s);
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
