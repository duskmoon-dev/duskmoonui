/**
 * Unit tests for tabs component class generation
 * Tests that tabs CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Tabs Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/tabs.css'),
      'utf-8'
    );
  });

  describe('Base Classes', () => {
    it('should define .tabs base class', () => {
      expect(css).toContain('.tabs');
    });

    it('should define .tab class', () => {
      expect(css).toContain('.tab');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });
  });

  describe('Tabs Container Layout', () => {
    it('should use flex display', () => {
      expect(css).toMatch(/\.tabs\s*\{[^}]*display:\s*flex/s);
    });

    it('should allow flex wrapping', () => {
      expect(css).toMatch(/\.tabs\s*\{[^}]*flex-wrap:\s*wrap/s);
    });

    it('should set gap between tabs', () => {
      expect(css).toMatch(/\.tabs\s*\{[^}]*gap:\s*0\.25rem/s);
    });

    it('should have a bottom border using outline color token', () => {
      expect(css).toMatch(
        /\.tabs\s*\{[^}]*border-bottom:\s*1px solid var\(--color-outline\)/s
      );
    });
  });

  describe('Tab Item Base Styles', () => {
    it('should use inline-flex display', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should center content horizontally and vertically', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*align-items:\s*center/s);
      expect(css).toMatch(/\.tab\s*\{[^}]*justify-content:\s*center/s);
    });

    it('should set default padding', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*padding:\s*0\.75rem 1\.25rem/s);
    });

    it('should set font-size and font-weight', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*font-size:\s*0\.875rem/s);
      expect(css).toMatch(/\.tab\s*\{[^}]*font-weight:\s*500/s);
    });

    it('should use on-surface-variant color token for text', () => {
      expect(css).toMatch(
        /\.tab\s*\{[^}]*color:\s*var\(--color-on-surface-variant\)/s
      );
    });

    it('should have transparent background', () => {
      expect(css).toMatch(
        /\.tab\s*\{[^}]*background-color:\s*transparent/s
      );
    });

    it('should have no visible border by default except bottom indicator', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*border:\s*none/s);
      expect(css).toMatch(
        /\.tab\s*\{[^}]*border-bottom:\s*2px solid transparent/s
      );
    });

    it('should include cursor pointer', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should include transition for smooth interactions', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*transition/s);
    });

    it('should use relative positioning', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*position:\s*relative/s);
    });

    it('should have negative margin-bottom to overlap container border', () => {
      expect(css).toMatch(/\.tab\s*\{[^}]*margin-bottom:\s*-1px/s);
    });
  });

  describe('Active Tab State', () => {
    it('should define .tab-active class', () => {
      expect(css).toContain('.tab.tab-active');
    });

    it('should support aria-selected attribute', () => {
      expect(css).toContain('.tab[aria-selected="true"]');
    });

    it('should use primary color for active tab text', () => {
      expect(css).toMatch(
        /\.tab\.tab-active[^}]*color:\s*var\(--color-primary\)/s
      );
    });

    it('should use primary color for active tab bottom border', () => {
      expect(css).toMatch(
        /\.tab\.tab-active[^}]*border-bottom-color:\s*var\(--color-primary\)/s
      );
    });
  });

  describe('Interactive States', () => {
    it('should define hover state', () => {
      expect(css).toMatch(/\.tab:hover/);
    });

    it('should use on-surface color on hover', () => {
      expect(css).toMatch(
        /\.tab:hover\s*\{[^}]*color:\s*var\(--color-on-surface\)/s
      );
    });

    it('should use surface-container background on hover', () => {
      expect(css).toMatch(
        /\.tab:hover\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s
      );
    });

    it('should define focus-visible state for keyboard navigation', () => {
      expect(css).toMatch(/\.tab:focus-visible/);
    });

    it('should use box-shadow for focus ring', () => {
      expect(css).toMatch(
        /\.tab:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 3px color-mix\(in oklch, currentColor/s
      );
    });

    it('should define disabled state', () => {
      expect(css).toMatch(/\.tab:disabled/);
    });

    it('should reduce opacity when disabled', () => {
      expect(css).toMatch(/\.tab:disabled\s*\{[^}]*opacity:\s*0\.5/s);
    });

    it('should set cursor not-allowed when disabled', () => {
      expect(css).toMatch(
        /\.tab:disabled\s*\{[^}]*cursor:\s*not-allowed/s
      );
    });
  });

  describe('Boxed Variant', () => {
    it('should define .tabs-boxed class', () => {
      expect(css).toContain('.tabs-boxed');
    });

    it('should use surface-container background', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s
      );
    });

    it('should have border-radius on the container', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s
      );
    });

    it('should have padding inside the container', () => {
      expect(css).toMatch(/\.tabs-boxed\s*\{[^}]*padding:\s*0\.25rem/s);
    });

    it('should remove container border', () => {
      expect(css).toMatch(/\.tabs-boxed\s*\{[^}]*border:\s*none/s);
    });

    it('should remove tab bottom border inside boxed', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\s*\{[^}]*border-bottom:\s*none/s
      );
    });

    it('should give boxed tabs their own border-radius', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\s*\{[^}]*border-radius:\s*var\(--radius-xs\)/s
      );
    });

    it('should reset margin-bottom for tabs inside boxed', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\s*\{[^}]*margin-bottom:\s*0/s
      );
    });

    it('should use surface background for active boxed tab', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\.tab-active[^}]*background-color:\s*var\(--color-surface\)/s
      );
    });

    it('should use on-surface color for active boxed tab', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\.tab-active[^}]*color:\s*var\(--color-on-surface\)/s
      );
    });

    it('should add shadow to active boxed tab', () => {
      expect(css).toMatch(
        /\.tabs-boxed\s+\.tab\.tab-active[^}]*box-shadow:\s*var\(--shadow-xs\)/s
      );
    });
  });

  describe('Lifted Variant', () => {
    it('should define .tabs-lifted class', () => {
      expect(css).toContain('.tabs-lifted');
    });

    it('should remove container border for lifted variant', () => {
      expect(css).toMatch(/\.tabs-lifted\s*\{[^}]*border:\s*none/s);
    });

    it('should give lifted tabs a transparent border', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\s*\{[^}]*border:\s*1px solid transparent/s
      );
    });

    it('should remove bottom border on lifted tabs', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\s*\{[^}]*border-bottom:\s*none/s
      );
    });

    it('should apply top-only border-radius for lifted tabs', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\s*\{[^}]*border-radius:\s*var\(--radius-sm\) var\(--radius-sm\) 0 0/s
      );
    });

    it('should use surface background for active lifted tab', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\.tab-active[^}]*background-color:\s*var\(--color-surface\)/s
      );
    });

    it('should show outline border on active lifted tab', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\.tab-active[^}]*border-color:\s*var\(--color-outline\)/s
      );
    });

    it('should hide bottom border on active lifted tab using surface color', () => {
      expect(css).toMatch(
        /\.tabs-lifted\s+\.tab\.tab-active[^}]*border-bottom-color:\s*var\(--color-surface\)/s
      );
    });
  });

  describe('Size Variants', () => {
    it('should define .tab-xs class', () => {
      expect(css).toContain('.tab-xs');
    });

    it('should define .tab-sm class', () => {
      expect(css).toContain('.tab-sm');
    });

    it('should define .tab-lg class', () => {
      expect(css).toContain('.tab-lg');
    });

    it('should have smaller padding and font-size for tab-xs', () => {
      expect(css).toMatch(
        /\.tab-xs\s*\{[^}]*padding:\s*0\.375rem 0\.625rem/s
      );
      expect(css).toMatch(
        /\.tab-xs\s*\{[^}]*font-size:\s*0\.75rem/s
      );
    });

    it('should have smaller padding and font-size for tab-sm', () => {
      expect(css).toMatch(
        /\.tab-sm\s*\{[^}]*padding:\s*0\.5rem 0\.875rem/s
      );
      expect(css).toMatch(
        /\.tab-sm\s*\{[^}]*font-size:\s*0\.8125rem/s
      );
    });

    it('should have larger padding and font-size for tab-lg', () => {
      expect(css).toMatch(
        /\.tab-lg\s*\{[^}]*padding:\s*1rem 1\.5rem/s
      );
      expect(css).toMatch(/\.tab-lg\s*\{[^}]*font-size:\s*1rem/s);
    });
  });

  describe('Semantic Color Tokens', () => {
    it('should use --color-outline for container border', () => {
      expect(css).toContain('var(--color-outline)');
    });

    it('should use --color-on-surface-variant for default tab text', () => {
      expect(css).toContain('var(--color-on-surface-variant)');
    });

    it('should use --color-on-surface for hover and active boxed text', () => {
      expect(css).toContain('var(--color-on-surface)');
    });

    it('should use --color-primary for active indicator and focus ring', () => {
      expect(css).toContain('var(--color-primary)');
    });

    it('should use --color-surface-container for hover and boxed backgrounds', () => {
      expect(css).toContain('var(--color-surface-container)');
    });

    it('should use --color-surface for active lifted/boxed tab background', () => {
      expect(css).toContain('var(--color-surface)');
    });

    it('should use --shadow-xs for boxed active tab elevation', () => {
      expect(css).toContain('var(--shadow-xs)');
    });
  });
});
