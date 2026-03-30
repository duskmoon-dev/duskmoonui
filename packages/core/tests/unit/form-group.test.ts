/**
 * Unit tests for form-group component
 * Tests form layout, validation states, and ARIA-based accessibility
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Form Group Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/form-group.css'), 'utf-8');
  });

  describe('Layout', () => {
    it('should define .form-group class', () => {
      expect(css).toContain('.form-group');
    });

    it('should use flex column layout', () => {
      expect(css).toMatch(/\.form-group[^}]*flex-direction:\s*column/s);
    });

    it('should support horizontal layout', () => {
      expect(css).toContain('.form-group-horizontal');
    });

    it('should define form-row and form-grid utilities', () => {
      expect(css).toContain('.form-row');
      expect(css).toContain('.form-grid');
    });
  });

  describe('Label', () => {
    it('should define .form-label class', () => {
      expect(css).toContain('.form-label');
    });

    it('should show required indicator with asterisk', () => {
      expect(css).toContain('.form-label-required::after');
      expect(css).toContain("content: ' *'");
    });

    it('should show optional label variant', () => {
      expect(css).toContain('.form-label-optional::after');
    });

    it('should use error color for required asterisk', () => {
      expect(css).toMatch(/\.form-label-required::after[^}]*var\(--color-error\)/s);
    });
  });

  describe('Helper Text', () => {
    it('should define .helper-text class', () => {
      expect(css).toContain('.helper-text');
    });

    it('should have error state helper text', () => {
      expect(css).toContain('.helper-text-error');
    });

    it('should have success state helper text', () => {
      expect(css).toContain('.helper-text-success');
    });

    it('should have warning state helper text', () => {
      expect(css).toContain('.helper-text-warning');
    });

    it('should have info state helper text', () => {
      expect(css).toContain('.helper-text-info');
    });
  });

  describe('Class-based Validation States', () => {
    it('should define error state on form-group', () => {
      expect(css).toContain('.form-group-error');
    });

    it('should apply error color to label in error state', () => {
      expect(css).toMatch(/\.form-group-error .form-label[^}]*var\(--color-error\)/s);
    });

    it('should apply error border to inputs in error state', () => {
      expect(css).toContain('.form-group-error .input');
      expect(css).toMatch(/\.form-group-error[\s\S]*?border-color:\s*var\(--color-error\)/);
    });

    it('should define success state on form-group', () => {
      expect(css).toContain('.form-group-success');
    });

    it('should apply success border to inputs in success state', () => {
      expect(css).toContain('.form-group-success .input');
      expect(css).toMatch(/\.form-group-success[\s\S]*?border-color:\s*var\(--color-success\)/);
    });

    it('should define warning state on form-group', () => {
      expect(css).toContain('.form-group-warning');
    });

    it('should use focus ring on error state focus', () => {
      expect(css).toMatch(/\.form-group-error .input:focus-visible[^}]*box-shadow/s);
    });
  });

  describe('ARIA-based Validation', () => {
    it('should style aria-invalid="true" inputs', () => {
      expect(css).toContain('[aria-invalid="true"]');
    });

    it('should apply error border to aria-invalid inputs', () => {
      expect(css).toMatch(/\.input\[aria-invalid="true"\][^}]*border-color:\s*var\(--color-error\)/s);
    });

    it('should apply focus ring to aria-invalid inputs on focus', () => {
      expect(css).toMatch(/\.input\[aria-invalid="true"\]:focus-visible[^}]*box-shadow/s);
    });

    it('should support aria-invalid on select', () => {
      expect(css).toContain('.select[aria-invalid="true"]');
    });

    it('should support aria-invalid on textarea', () => {
      expect(css).toContain('.textarea[aria-invalid="true"]');
    });

    it('should support aria-required on labels', () => {
      expect(css).toContain('[aria-required="true"]::after');
    });
  });

  describe('Native Validation', () => {
    it('should support native :invalid with .validate opt-in', () => {
      expect(css).toContain('.validate .input:invalid');
    });

    it('should support native :valid with .validate opt-in', () => {
      expect(css).toContain('.validate .input:valid');
    });

    it('should apply error border on :invalid', () => {
      expect(css).toMatch(/\.validate .input:invalid[^}]*border-color:\s*var\(--color-error\)/s);
    });

    it('should apply success border on :valid', () => {
      expect(css).toMatch(/\.validate .input:valid[^}]*border-color:\s*var\(--color-success\)/s);
    });
  });

  describe('Fieldset', () => {
    it('should define .fieldset class', () => {
      expect(css).toContain('.fieldset');
    });

    it('should have fieldset legend', () => {
      expect(css).toContain('.fieldset-legend');
    });

    it('should have fieldset card variant', () => {
      expect(css).toContain('.fieldset-card');
    });

    it('should use shadow token in fieldset-card', () => {
      expect(css).toMatch(/\.fieldset-card[^}]*var\(--shadow-xs\)/s);
    });
  });

  describe('Color Tokens', () => {
    it('should use semantic error color', () => {
      expect(css).toContain('var(--color-error)');
    });

    it('should use semantic success color', () => {
      expect(css).toContain('var(--color-success)');
    });

    it('should use semantic warning color', () => {
      expect(css).toContain('var(--color-warning)');
    });

    it('should use on-surface for text', () => {
      expect(css).toContain('var(--color-on-surface)');
    });
  });
});
