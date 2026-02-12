/**
 * Unit tests for theme-controller component class generation
 * Tests both switch mode and dropdown mode
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Theme Controller Component', () => {
  let css: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/theme-controller.css');
    css = await readFile(cssPath, 'utf-8');
  });

  describe('Base Structure', () => {
    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });
  });

  describe('Shared: Hidden Radio Input', () => {
    it('should define .theme-controller-item class', () => {
      expect(css).toContain('.theme-controller-item');
    });

    it('should use absolute positioning', () => {
      expect(css).toMatch(/\.theme-controller-item\s*\{[^}]*position:\s*absolute/s);
    });

    it('should visually hide with clip', () => {
      expect(css).toMatch(/\.theme-controller-item\s*\{[^}]*clip:\s*rect\(0/s);
    });

    it('should have 1px width and height', () => {
      expect(css).toMatch(/\.theme-controller-item\s*\{[^}]*width:\s*1px/s);
      expect(css).toMatch(/\.theme-controller-item\s*\{[^}]*height:\s*1px/s);
    });

    it('should hide overflow', () => {
      expect(css).toMatch(/\.theme-controller-item\s*\{[^}]*overflow:\s*hidden/s);
    });
  });

  describe('Shared: Visible Label', () => {
    it('should define .theme-controller-label class', () => {
      expect(css).toContain('.theme-controller-label');
    });

    it('should use on-surface-variant color', () => {
      expect(css).toContain('var(--color-on-surface-variant)');
    });

    it('should have cursor pointer', () => {
      expect(css).toMatch(/\.theme-controller-label\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should have transition for smooth state changes', () => {
      expect(css).toMatch(/\.theme-controller-label\s*\{[^}]*transition:/s);
    });
  });

  describe('Shared: Checked State', () => {
    it('should style checked + label with primary-container bg', () => {
      expect(css).toMatch(
        /\.theme-controller-item:checked\s*\+\s*\.theme-controller-label[^}]*var\(--color-primary-container\)/s
      );
    });

    it('should use on-primary-container text color when checked', () => {
      expect(css).toMatch(
        /\.theme-controller-item:checked\s*\+\s*\.theme-controller-label[^}]*var\(--color-on-primary-container\)/s
      );
    });

    it('should use color-mix for checked hover darkening', () => {
      expect(css).toContain('color-mix(in oklch');
    });
  });

  describe('Shared: Hover State', () => {
    it('should define hover state on label', () => {
      expect(css).toMatch(/\.theme-controller-label:hover/);
    });

    it('should use surface-container-high on hover', () => {
      expect(css).toContain('var(--color-surface-container-high)');
    });
  });

  describe('Shared: Focus-Visible State', () => {
    it('should style focus-visible on the radio input forwarded to label', () => {
      expect(css).toMatch(/\.theme-controller-item:focus-visible\s*\+\s*\.theme-controller-label/);
    });

    it('should use primary color for focus outline', () => {
      expect(css).toMatch(
        /\.theme-controller-item:focus-visible\s*\+\s*\.theme-controller-label[^}]*var\(--color-primary\)/s
      );
    });
  });

  /* ============================================
   * SWITCH MODE
   * ============================================ */

  describe('Switch: Base Container', () => {
    it('should define .theme-controller base class', () => {
      expect(css).toContain('.theme-controller');
    });

    it('should use inline-flex display', () => {
      expect(css).toMatch(/\.theme-controller\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should use surface-container background', () => {
      expect(css).toMatch(/\.theme-controller\s*\{[^}]*var\(--color-surface-container\)/s);
    });

    it('should use border-radius for pill shape', () => {
      expect(css).toMatch(/\.theme-controller\s*\{[^}]*border-radius/s);
    });

    it('should use outline-variant border color', () => {
      expect(css).toMatch(/\.theme-controller\s*\{[^}]*var\(--color-outline-variant\)/s);
    });
  });

  describe('Switch: Size Variants', () => {
    it('should define small variant', () => {
      expect(css).toContain('.theme-controller-sm');
    });

    it('should define large variant', () => {
      expect(css).toContain('.theme-controller-lg');
    });

    it('should have smaller padding in sm variant label', () => {
      expect(css).toMatch(
        /\.theme-controller-sm\s+\.theme-controller-label[^}]*padding:\s*0\.375rem\s+0\.75rem/s
      );
    });

    it('should have larger padding in lg variant label', () => {
      expect(css).toMatch(
        /\.theme-controller-lg\s+\.theme-controller-label[^}]*padding:\s*0\.75rem\s+1\.5rem/s
      );
    });
  });

  describe('Switch: Icon-only Variant', () => {
    it('should define icon variant', () => {
      expect(css).toContain('.theme-controller-icon');
    });

    it('should have equal padding for icon-only labels', () => {
      expect(css).toMatch(
        /\.theme-controller-icon\s+\.theme-controller-label[^}]*padding:\s*0\.5rem/s
      );
    });

    it('should have icon-only sizing for sm', () => {
      expect(css).toMatch(/\.theme-controller-icon\.theme-controller-sm/);
    });

    it('should have icon-only sizing for lg', () => {
      expect(css).toMatch(/\.theme-controller-icon\.theme-controller-lg/);
    });
  });

  /* ============================================
   * DROPDOWN MODE
   * ============================================ */

  describe('Dropdown: Container', () => {
    it('should define .theme-controller-dropdown class', () => {
      expect(css).toContain('.theme-controller-dropdown');
    });

    it('should use relative positioning', () => {
      expect(css).toMatch(/\.theme-controller-dropdown\s*\{[^}]*position:\s*relative/s);
    });

    it('should use inline-block display', () => {
      expect(css).toMatch(/\.theme-controller-dropdown\s*\{[^}]*display:\s*inline-block/s);
    });
  });

  describe('Dropdown: Trigger (<summary>)', () => {
    it('should define .theme-controller-trigger class', () => {
      expect(css).toContain('.theme-controller-trigger');
    });

    it('should use inline-flex display', () => {
      expect(css).toMatch(/\.theme-controller-trigger\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should use surface-container background', () => {
      expect(css).toMatch(/\.theme-controller-trigger\s*\{[^}]*var\(--color-surface-container\)/s);
    });

    it('should use radius-field for border-radius', () => {
      expect(css).toMatch(/\.theme-controller-trigger\s*\{[^}]*var\(--radius-field/s);
    });

    it('should have cursor pointer', () => {
      expect(css).toMatch(/\.theme-controller-trigger\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should remove default details marker', () => {
      expect(css).toMatch(/\.theme-controller-trigger\s*\{[^}]*list-style:\s*none/s);
    });

    it('should hide webkit details marker', () => {
      expect(css).toContain('.theme-controller-trigger::-webkit-details-marker');
    });

    it('should have hover state', () => {
      expect(css).toMatch(/\.theme-controller-trigger:hover/);
    });

    it('should have focus-visible state', () => {
      expect(css).toMatch(/\.theme-controller-trigger:focus-visible/);
    });
  });

  describe('Dropdown: Chevron Indicator', () => {
    it('should create chevron via ::after pseudo-element', () => {
      expect(css).toMatch(/\.theme-controller-trigger::after/);
    });

    it('should rotate chevron when open', () => {
      expect(css).toMatch(/\.theme-controller-dropdown\[open\]\s+\.theme-controller-trigger::after[^}]*transform/s);
    });
  });

  describe('Dropdown: Menu', () => {
    it('should define .theme-controller-menu class', () => {
      expect(css).toContain('.theme-controller-menu');
    });

    it('should use absolute positioning', () => {
      expect(css).toMatch(/\.theme-controller-menu\s*\{[^}]*position:\s*absolute/s);
    });

    it('should use z-index for stacking', () => {
      expect(css).toMatch(/\.theme-controller-menu\s*\{[^}]*z-index:\s*50/s);
    });

    it('should use shadow-md elevation', () => {
      expect(css).toMatch(/\.theme-controller-menu\s*\{[^}]*var\(--shadow-md\)/s);
    });

    it('should use flex column layout', () => {
      expect(css).toMatch(/\.theme-controller-menu\s*\{[^}]*flex-direction:\s*column/s);
    });

    it('should make labels full-width and left-aligned', () => {
      expect(css).toMatch(
        /\.theme-controller-menu\s+\.theme-controller-label[^}]*width:\s*100%/s
      );
      expect(css).toMatch(
        /\.theme-controller-menu\s+\.theme-controller-label[^}]*justify-content:\s*flex-start/s
      );
    });
  });

  describe('Dropdown: Size Variants', () => {
    it('should define dropdown small variant', () => {
      expect(css).toContain('.theme-controller-dropdown-sm');
    });

    it('should define dropdown large variant', () => {
      expect(css).toContain('.theme-controller-dropdown-lg');
    });

    it('should have smaller trigger padding in sm variant', () => {
      expect(css).toMatch(
        /\.theme-controller-dropdown-sm\s+\.theme-controller-trigger[^}]*padding/s
      );
    });

    it('should have larger trigger padding in lg variant', () => {
      expect(css).toMatch(
        /\.theme-controller-dropdown-lg\s+\.theme-controller-trigger[^}]*padding/s
      );
    });
  });

  describe('Dropdown: Icon-only Trigger', () => {
    it('should define dropdown icon variant', () => {
      expect(css).toContain('.theme-controller-dropdown-icon');
    });

    it('should hide chevron for icon-only trigger', () => {
      expect(css).toMatch(
        /\.theme-controller-dropdown-icon\s+\.theme-controller-trigger::after[^}]*display:\s*none/s
      );
    });
  });

  describe('Dropdown: Alignment', () => {
    it('should define end-aligned variant', () => {
      expect(css).toContain('.theme-controller-dropdown-end');
    });

    it('should set right: 0 for end-aligned menu', () => {
      expect(css).toMatch(
        /\.theme-controller-dropdown-end\s+\.theme-controller-menu[^}]*right:\s*0/s
      );
    });
  });

  /* ============================================
   * ACCESSIBILITY
   * ============================================ */

  describe('Reduced Motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion');
    });

    it('should disable transitions for reduced motion', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*transition:\s*none/);
    });

    it('should disable trigger transitions for reduced motion', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*\.theme-controller-trigger/);
    });
  });
});
