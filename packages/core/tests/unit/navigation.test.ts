/**
 * Unit tests for navigation component class generation
 * Tests that navigation CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Navigation Component', () => {
  let navCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/navigation.css');
    navCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Navbar Base', () => {
    it('should define .navbar class', () => {
      expect(navCSS).toContain('.navbar');
    });

    it('should include @layer components directive', () => {
      expect(navCSS).toContain('@layer components');
    });

    it('should use flexbox for layout', () => {
      expect(navCSS).toMatch(/\.navbar[^}]*display:\s*flex/s);
    });

    it('should have width 100%', () => {
      expect(navCSS).toMatch(/\.navbar[^}]*width:\s*100%/s);
    });

    it('should align items center', () => {
      expect(navCSS).toMatch(/\.navbar[^}]*align-items:\s*center/s);
    });

    it('should have padding', () => {
      expect(navCSS).toMatch(/\.navbar[^}]*padding/s);
    });

    it('should have min-height', () => {
      expect(navCSS).toMatch(/\.navbar[^}]*min-height/s);
    });
  });

  describe('Navbar Sections', () => {
    it('should define .navbar-start class', () => {
      expect(navCSS).toContain('.navbar-start');
    });

    it('should define .navbar-center class', () => {
      expect(navCSS).toContain('.navbar-center');
    });

    it('should define .navbar-end class', () => {
      expect(navCSS).toContain('.navbar-end');
    });

    it('should use flex for navbar-start', () => {
      expect(navCSS).toMatch(/\.navbar-start[^}]*display:\s*flex/s);
    });

    it('should use flex for navbar-center', () => {
      expect(navCSS).toMatch(/\.navbar-center[^}]*display:\s*flex/s);
    });

    it('should use flex for navbar-end', () => {
      expect(navCSS).toMatch(/\.navbar-end[^}]*display:\s*flex/s);
    });

    it('should have flex-1 or flex-grow for sections', () => {
      expect(navCSS).toMatch(/navbar-(start|end)[^}]*(flex:\s*1|flex-grow)/s);
    });

    it('should align navbar-end to the right', () => {
      expect(navCSS).toMatch(/\.navbar-end[^}]*justify-content:\s*(flex-end|end)/s);
    });
  });

  describe('Menu', () => {
    it('should define .menu class', () => {
      expect(navCSS).toContain('.menu');
    });

    it('should use flexbox for menu', () => {
      expect(navCSS).toMatch(/\.menu[^}]*display:\s*flex/s);
    });

    it('should have list-style none', () => {
      expect(navCSS).toMatch(/\.menu[^}]*list-style:\s*none/s);
    });

    it('should define menu item styling', () => {
      const hasMenuItem = navCSS.includes('.menu-item') || navCSS.includes('.menu li');
      expect(hasMenuItem).toBe(true);
    });
  });

  describe('Menu Variants', () => {
    it('should define .menu-horizontal class', () => {
      expect(navCSS).toContain('.menu-horizontal');
    });

    it('should define .menu-vertical class', () => {
      expect(navCSS).toContain('.menu-vertical');
    });

    it('should use row direction for horizontal', () => {
      expect(navCSS).toMatch(/\.menu-horizontal[^}]*flex-direction:\s*row/s);
    });

    it('should use column direction for vertical', () => {
      expect(navCSS).toMatch(/\.menu-vertical[^}]*flex-direction:\s*column/s);
    });
  });

  describe('Color Integration', () => {
    it('should use surface color for background', () => {
      expect(navCSS).toContain('var(--color-surface');
    });

    it('should use on-surface color for text', () => {
      expect(navCSS).toContain('var(--color-on-surface');
    });

    it('should use primary color for active items', () => {
      expect(navCSS).toContain('var(--color-primary');
    });
  });

  describe('Interactive States', () => {
    it('should define hover state for menu items', () => {
      expect(navCSS).toMatch(/(menu|nav)[^{]*:hover/);
    });

    it('should define active state for current item', () => {
      const hasActive = navCSS.includes('.active') || navCSS.includes(':active') || navCSS.includes('[aria-current]');
      expect(hasActive).toBe(true);
    });

    it('should define focus styles', () => {
      expect(navCSS).toMatch(/:focus/);
    });
  });

  describe('Breadcrumb', () => {
    it('should define .breadcrumbs class', () => {
      expect(navCSS).toContain('.breadcrumbs');
    });

    it('should use flexbox for breadcrumbs', () => {
      expect(navCSS).toMatch(/\.breadcrumbs[^}]*display:\s*flex/s);
    });

    it('should have gap between items', () => {
      expect(navCSS).toMatch(/\.breadcrumbs[^}]*gap/s);
    });
  });

  describe('Tabs', () => {
    it('should define .tabs class', () => {
      expect(navCSS).toContain('.tabs');
    });

    it('should define .tab class', () => {
      expect(navCSS).toContain('.tab');
    });

    it('should use flexbox for tabs', () => {
      expect(navCSS).toMatch(/\.tabs[^}]*display:\s*flex/s);
    });

    it('should define .tab-active class', () => {
      expect(navCSS).toContain('.tab-active');
    });
  });

  describe('Responsive', () => {
    it('should support dropdown for mobile', () => {
      expect(navCSS).toContain('.dropdown');
    });
  });

  describe('Accessibility', () => {
    it('should include focus-visible styles', () => {
      expect(navCSS).toMatch(/:focus-visible/);
    });
  });
});
