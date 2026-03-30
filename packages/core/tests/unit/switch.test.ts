/**
 * Unit tests for switch component
 * Tests base styling, states, sizes, colors, and accessibility
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Switch Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/switch.css'), 'utf-8');
  });

  describe('Base Switch', () => {
    it('should define .switch class', () => {
      expect(css).toContain('.switch');
    });

    it('should use appearance: none for custom styling', () => {
      expect(css).toMatch(/\.switch\s*\{[^}]*appearance:\s*none/s);
    });

    it('should use grid layout for thumb positioning', () => {
      expect(css).toMatch(/\.switch\s*\{[^}]*display:\s*inline-grid/s);
    });

    it('should define CSS custom properties for theming', () => {
      expect(css).toContain('--switch-width');
      expect(css).toContain('--switch-height');
      expect(css).toContain('--switch-thumb-size');
      expect(css).toContain('--switch-color');
    });
  });

  describe('Thumb', () => {
    it('should use ::before pseudo-element for thumb', () => {
      expect(css).toContain('.switch::before');
    });

    it('should use full radius for round thumb', () => {
      expect(css).toMatch(/\.switch::before[^}]*var\(--radius-full\)/s);
    });
  });

  describe('States', () => {
    it('should define checked state', () => {
      expect(css).toContain('.switch:checked');
    });

    it('should change grid-template-columns on checked', () => {
      expect(css).toMatch(/\.switch:checked\s*\{[^}]*grid-template-columns/s);
    });

    it('should define hover state for unchecked', () => {
      expect(css).toContain('.switch:hover:not(:disabled):not(:checked)');
    });

    it('should define hover state for checked', () => {
      expect(css).toContain('.switch:checked:hover:not(:disabled)');
    });

    it('should use color-mix for checked hover', () => {
      expect(css).toMatch(/\.switch:checked:hover[^}]*color-mix\(in oklch/s);
    });

    it('should define focus-visible state with ring', () => {
      expect(css).toContain('.switch:focus-visible');
      expect(css).toMatch(/\.switch:focus-visible[^}]*box-shadow/s);
    });

    it('should define active/pressed state expanding thumb', () => {
      expect(css).toContain('.switch:active:not(:disabled)::before');
    });
  });

  describe('Disabled State', () => {
    it('should define disabled state', () => {
      expect(css).toContain('.switch:disabled');
    });

    it('should use not-allowed cursor', () => {
      expect(css).toMatch(/\.switch:disabled[^}]*cursor:\s*not-allowed/s);
    });

    it('should reduce opacity', () => {
      expect(css).toMatch(/\.switch:disabled[^}]*opacity:\s*0\.38/s);
    });

    it('should style disabled unchecked differently', () => {
      expect(css).toContain('.switch:disabled:not(:checked)');
    });

    it('should style disabled checked differently', () => {
      expect(css).toContain('.switch:disabled:checked');
    });
  });

  describe('Size Variants', () => {
    it('should define xs size', () => {
      expect(css).toContain('.switch-xs');
    });

    it('should define sm size', () => {
      expect(css).toContain('.switch-sm');
    });

    it('should define md size', () => {
      expect(css).toContain('.switch-md');
    });

    it('should define lg size', () => {
      expect(css).toContain('.switch-lg');
    });

    it('should define xl size', () => {
      expect(css).toContain('.switch-xl');
    });
  });

  describe('Color Variants', () => {
    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];

    for (const color of colors) {
      it(`should define ${color} color variant`, () => {
        expect(css).toContain(`.switch-${color}`);
      });
    }

    it('should set --switch-color for color variants', () => {
      expect(css).toMatch(/\.switch-primary[^}]*--switch-color:\s*var\(--color-primary\)/s);
    });

    it('should set --switch-content-color for color variants', () => {
      expect(css).toMatch(/\.switch-primary[^}]*--switch-content-color:\s*var\(--color-primary-content\)/s);
    });

    it('should set --switch-container-color for color variants', () => {
      expect(css).toMatch(/\.switch-primary[^}]*--switch-container-color:\s*var\(--color-primary-container\)/s);
    });
  });

  describe('Ghost Variant', () => {
    it('should define ghost variant', () => {
      expect(css).toContain('.switch-ghost');
    });

    it('should set transparent border for ghost', () => {
      expect(css).toMatch(/\.switch-ghost[^}]*--switch-border-color:\s*transparent/s);
    });
  });

  describe('Switch Label', () => {
    it('should define switch-label wrapper', () => {
      expect(css).toContain('.switch-label');
    });

    it('should use inline-flex layout', () => {
      expect(css).toMatch(/\.switch-label\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should handle disabled label via :has', () => {
      expect(css).toContain('.switch-label:has(.switch:disabled)');
    });
  });

  describe('Switch Group', () => {
    it('should define switch-group', () => {
      expect(css).toContain('.switch-group');
    });

    it('should define horizontal group variant', () => {
      expect(css).toContain('.switch-group-horizontal');
    });
  });

  describe('Accessibility', () => {
    it('should support prefers-reduced-motion', () => {
      expect(css).toContain('prefers-reduced-motion');
    });
  });
});
