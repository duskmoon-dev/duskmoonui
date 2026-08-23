/**
 * Unit tests for tooltip component (Popover API + CSS Anchor Positioning)
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Tooltip Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/tooltip.css'),
      'utf-8'
    );
  });

  describe('Native Popover API', () => {
    it('should define .tooltip[popover] surface', () => {
      expect(css).toContain('.tooltip[popover]');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should open with :popover-open', () => {
      expect(css).toContain('.tooltip[popover]:popover-open');
    });

    it('should not use legacy wrapper hover paths', () => {
      expect(css).not.toContain('.tooltip:hover .tooltip-content');
      expect(css).not.toContain('.tooltip:focus-within .tooltip-content');
      expect(css).not.toContain('.tooltip-open .tooltip-content');
      expect(css).not.toContain('.tooltip-content');
    });
  });

  describe('CSS Anchor Positioning', () => {
    it('should use position-area', () => {
      expect(css).toContain('position-area:');
    });

    it('should use position-try-fallbacks', () => {
      expect(css).toContain('position-try-fallbacks:');
    });

    it('should map tooltip-top to position-area top', () => {
      expect(css).toMatch(
        /\.tooltip-top\[popover\]\s*\{[^}]*position-area:\s*top/s
      );
    });

    it('should map tooltip-bottom to position-area bottom', () => {
      expect(css).toMatch(
        /\.tooltip-bottom\[popover\]\s*\{[^}]*position-area:\s*bottom/s
      );
    });

    it('should map tooltip-left to position-area left', () => {
      expect(css).toMatch(
        /\.tooltip-left\[popover\]\s*\{[^}]*position-area:\s*left/s
      );
    });

    it('should map tooltip-right to position-area right', () => {
      expect(css).toMatch(
        /\.tooltip-right\[popover\]\s*\{[^}]*position-area:\s*right/s
      );
    });
  });

  describe('Base Styling', () => {
    it('should use on-surface as default background via token', () => {
      expect(css).toContain('var(--color-on-surface)');
    });

    it('should use surface as default text color via token', () => {
      expect(css).toContain('var(--color-surface)');
    });

    it('should set font-size to 0.75rem', () => {
      expect(css).toMatch(
        /\.tooltip\[popover\]\s*\{[^}]*font-size:\s*0\.75rem/s
      );
    });

    it('should set white-space nowrap by default', () => {
      expect(css).toMatch(
        /\.tooltip\[popover\]\s*\{[^}]*white-space:\s*nowrap/s
      );
    });

    it('should disable pointer-events by default', () => {
      expect(css).toMatch(
        /\.tooltip\[popover\]\s*\{[^}]*pointer-events:\s*none/s
      );
    });
  });

  describe('Arrow', () => {
    it('should define arrow via ::before', () => {
      expect(css).toContain('.tooltip[popover]::before');
    });
  });

  describe('Color Variants', () => {
    const colorVariants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
      'light',
    ] as const;

    for (const variant of colorVariants) {
      it(`should define .tooltip-${variant}[popover]`, () => {
        expect(css).toContain(`.tooltip-${variant}[popover]`);
      });
    }
  });

  describe('Content Variants', () => {
    it('should define multiline and rich variants', () => {
      expect(css).toContain('.tooltip-multiline[popover]');
      expect(css).toContain('.tooltip-rich[popover]');
      expect(css).toContain('.tooltip-rich-title');
      expect(css).toContain('.tooltip-rich-description');
    });
  });

  describe('Invoker Utilities', () => {
    it('should define interest-delay utilities on trigger classes', () => {
      expect(css).toMatch(/\.tooltip-delay\s*\{[^}]*interest-delay:\s*300ms/s);
      expect(css).toMatch(
        /\.tooltip-delay-long\s*\{[^}]*interest-delay:\s*500ms/s
      );
    });

    it('should enable pointer-events for interactive tooltips', () => {
      expect(css).toMatch(
        /\.tooltip-interactive\[popover\]\s*\{[^}]*pointer-events:\s*auto/s
      );
    });
  });

  describe('Accessibility', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    });
  });
});
