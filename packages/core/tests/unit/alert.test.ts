/**
 * Unit tests for alert component class generation
 * Tests that alert CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Alert Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/alert.css'),
      'utf-8',
    );
  });

  describe('Base Alert', () => {
    it('should define .alert base class', () => {
      expect(css).toContain('.alert');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should use flex layout', () => {
      expect(css).toMatch(/\.alert\s*\{[^}]*display:\s*flex/s);
    });

    it('should align items to flex-start', () => {
      expect(css).toMatch(/\.alert\s*\{[^}]*align-items:\s*flex-start/s);
    });

    it('should set gap between children', () => {
      expect(css).toMatch(/\.alert\s*\{[^}]*gap:\s*0\.75rem/s);
    });

    it('should set padding', () => {
      expect(css).toMatch(/\.alert\s*\{[^}]*padding:\s*1rem/s);
    });

    it('should set border-radius', () => {
      expect(css).toMatch(/\.alert\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s);
    });

    it('should use surface-container background by default', () => {
      expect(css).toMatch(
        /\.alert\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color by default', () => {
      expect(css).toMatch(
        /\.alert\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should have outline border by default', () => {
      expect(css).toMatch(
        /\.alert\s*\{[^}]*border:\s*1px solid var\(--color-outline\)/s,
      );
    });
  });

  describe('Color Variants', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .alert-${variant} class`, () => {
        expect(css).toContain(`.alert-${variant}`);
      });

      it(`should use ${variant}-container background for .alert-${variant}`, () => {
        expect(css).toContain(`var(--color-${variant}-container)`);
      });

      it(`should use on-${variant}-container color for .alert-${variant}`, () => {
        expect(css).toContain(`var(--color-on-${variant}-container)`);
      });
    }

    it('should set border-color to transparent for color variants', () => {
      // Each color variant sets border-color: transparent
      const transparentBorderCount = (
        css.match(/border-color:\s*transparent/g) || []
      ).length;
      // At least 7 from base color variants
      expect(transparentBorderCount).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Filled Variants', () => {
    it('should define .alert-filled modifier class', () => {
      expect(css).toContain('.alert-filled');
    });

    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .alert-filled.alert-${variant} compound class`, () => {
        expect(css).toContain(`.alert-filled.alert-${variant}`);
      });

      it(`should use ${variant} background for filled ${variant}`, () => {
        // Filled variants use the base color, not the container
        expect(css).toMatch(
          new RegExp(
            `\\.alert-filled\\.alert-${variant}[^}]*background-color:\\s*var\\(--color-${variant}\\)`,
            's',
          ),
        );
      });

      it(`should use ${variant}-content text for filled ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.alert-filled\\.alert-${variant}[^}]*color:\\s*var\\(--color-${variant}-content\\)`,
            's',
          ),
        );
      });
    }
  });

  describe('Outlined Variants', () => {
    it('should define .alert-outlined modifier class', () => {
      expect(css).toContain('.alert-outlined');
    });

    it('should set transparent background for outlined base', () => {
      expect(css).toMatch(
        /\.alert-outlined\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .alert-outlined.alert-${variant} compound class`, () => {
        expect(css).toContain(`.alert-outlined.alert-${variant}`);
      });

      it(`should use ${variant} border-color for outlined ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.alert-outlined\\.alert-${variant}[^}]*border-color:\\s*var\\(--color-${variant}\\)`,
            's',
          ),
        );
      });

      it(`should use ${variant} text color for outlined ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.alert-outlined\\.alert-${variant}[^}]*color:\\s*var\\(--color-${variant}\\)`,
            's',
          ),
        );
      });
    }
  });

  describe('Ghost Variant', () => {
    it('should define .alert-ghost modifier class', () => {
      expect(css).toContain('.alert-ghost');
    });

    it('should set transparent background for ghost base', () => {
      expect(css).toMatch(
        /\.alert-ghost\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should set transparent border for ghost base', () => {
      expect(css).toMatch(
        /\.alert-ghost\s*\{[^}]*border-color:\s*transparent/s,
      );
    });

    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .alert-ghost.alert-${variant} compound class`, () => {
        expect(css).toContain(`.alert-ghost.alert-${variant}`);
      });

      it(`should use ${variant} text color for ghost ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.alert-ghost\\.alert-${variant}[^}]*color:\\s*var\\(--color-${variant}\\)`,
          ),
        );
      });
    }
  });

  describe('Sub-element Classes', () => {
    it('should define .alert-icon class', () => {
      expect(css).toContain('.alert-icon');
    });

    it('should set alert-icon as flex with centering', () => {
      expect(css).toMatch(/\.alert-icon\s*\{[^}]*display:\s*flex/s);
      expect(css).toMatch(/\.alert-icon\s*\{[^}]*align-items:\s*center/s);
      expect(css).toMatch(
        /\.alert-icon\s*\{[^}]*justify-content:\s*center/s,
      );
    });

    it('should set alert-icon dimensions to 1.5rem', () => {
      expect(css).toMatch(/\.alert-icon\s*\{[^}]*width:\s*1\.5rem/s);
      expect(css).toMatch(/\.alert-icon\s*\{[^}]*height:\s*1\.5rem/s);
    });

    it('should prevent alert-icon from shrinking', () => {
      expect(css).toMatch(/\.alert-icon\s*\{[^}]*flex-shrink:\s*0/s);
    });

    it('should define .alert-content class', () => {
      expect(css).toContain('.alert-content');
    });

    it('should set alert-content as flex column', () => {
      expect(css).toMatch(/\.alert-content\s*\{[^}]*display:\s*flex/s);
      expect(css).toMatch(
        /\.alert-content\s*\{[^}]*flex-direction:\s*column/s,
      );
    });

    it('should set alert-content to fill available space', () => {
      expect(css).toMatch(/\.alert-content\s*\{[^}]*flex:\s*1/s);
    });

    it('should define .alert-title class', () => {
      expect(css).toContain('.alert-title');
    });

    it('should set alert-title font-weight to 600', () => {
      expect(css).toMatch(/\.alert-title\s*\{[^}]*font-weight:\s*600/s);
    });

    it('should define .alert-description class', () => {
      expect(css).toContain('.alert-description');
    });

    it('should set alert-description opacity to 0.9', () => {
      expect(css).toMatch(/\.alert-description\s*\{[^}]*opacity:\s*0\.9/s);
    });

    it('should define .alert-actions class', () => {
      expect(css).toContain('.alert-actions');
    });

    it('should set alert-actions as flex with gap', () => {
      expect(css).toMatch(/\.alert-actions\s*\{[^}]*display:\s*flex/s);
      expect(css).toMatch(/\.alert-actions\s*\{[^}]*gap:\s*0\.5rem/s);
    });

    it('should set alert-actions margin-top', () => {
      expect(css).toMatch(/\.alert-actions\s*\{[^}]*margin-top:\s*0\.5rem/s);
    });
  });

  describe('Close Button', () => {
    it('should define .alert-close class', () => {
      expect(css).toContain('.alert-close');
    });

    it('should set cursor pointer on close button', () => {
      expect(css).toMatch(/\.alert-close\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should set transparent background on close button', () => {
      expect(css).toMatch(
        /\.alert-close\s*\{[^}]*background-color:\s*transparent/s,
      );
    });

    it('should set no border on close button', () => {
      expect(css).toMatch(/\.alert-close\s*\{[^}]*border:\s*none/s);
    });

    it('should include transition on close button', () => {
      expect(css).toMatch(/\.alert-close\s*\{[^}]*transition:/s);
    });

    it('should define hover state for close button', () => {
      expect(css).toMatch(/\.alert-close:hover/);
    });

    it('should define focus-visible state for close button', () => {
      expect(css).toMatch(/\.alert-close:focus-visible/);
    });

    it('should use color-mix for focus ring on close button', () => {
      expect(css).toMatch(
        /\.alert-close:focus-visible[^}]*color-mix\(in oklch, currentColor 20%, transparent\)/s,
      );
    });
  });

  describe('Dismissible Modifier', () => {
    it('should define .alert-dismissible class', () => {
      expect(css).toContain('.alert-dismissible');
    });

    it('should set position relative on dismissible alert', () => {
      expect(css).toMatch(
        /\.alert-dismissible\s*\{[^}]*position:\s*relative/s,
      );
    });

    it('should add extra right padding for dismissible alert', () => {
      expect(css).toMatch(
        /\.alert-dismissible\s*\{[^}]*padding-right:\s*2\.5rem/s,
      );
    });

    it('should position close button absolutely in dismissible alert', () => {
      expect(css).toMatch(
        /\.alert-dismissible\s+\.alert-close\s*\{[^}]*position:\s*absolute/s,
      );
    });
  });

  describe('Compact Size Variant', () => {
    it('should define .alert-compact class', () => {
      expect(css).toContain('.alert-compact');
    });

    it('should reduce padding for compact variant', () => {
      expect(css).toMatch(
        /\.alert-compact\s*\{[^}]*padding:\s*0\.625rem 0\.875rem/s,
      );
    });

    it('should reduce gap for compact variant', () => {
      expect(css).toMatch(/\.alert-compact\s*\{[^}]*gap:\s*0\.5rem/s);
    });

    it('should reduce icon size in compact variant', () => {
      expect(css).toMatch(
        /\.alert-compact\s+\.alert-icon\s*\{[^}]*width:\s*1\.25rem/s,
      );
      expect(css).toMatch(
        /\.alert-compact\s+\.alert-icon\s*\{[^}]*height:\s*1\.25rem/s,
      );
    });

    it('should reduce font size for title and description in compact variant', () => {
      expect(css).toMatch(
        /\.alert-compact\s+\.alert-title[\s\S]*?font-size:\s*0\.8125rem/,
      );
    });
  });

  describe('Banner Variant', () => {
    it('should define .alert-banner class', () => {
      expect(css).toContain('.alert-banner');
    });

    it('should remove border-radius for banner', () => {
      expect(css).toMatch(/\.alert-banner\s*\{[^}]*border-radius:\s*0/s);
    });

    it('should remove left and right borders for banner', () => {
      expect(css).toMatch(/\.alert-banner\s*\{[^}]*border-left:\s*none/s);
      expect(css).toMatch(/\.alert-banner\s*\{[^}]*border-right:\s*none/s);
    });
  });

  describe('Accessibility', () => {
    it('should include focus-visible styles', () => {
      expect(css).toMatch(/:focus-visible/);
    });

    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable transitions when reduced motion is preferred', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?transition:\s*none/,
      );
    });
  });
});
