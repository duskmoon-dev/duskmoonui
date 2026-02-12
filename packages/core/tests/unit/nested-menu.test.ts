/**
 * Unit tests for nested-menu component class generation
 * Tests that nested-menu CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Nested Menu Component', () => {
  let css: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/nested-menu.css');
    css = await readFile(cssPath, 'utf-8');
  });

  describe('Base Structure', () => {
    it('should define .nested-menu base class', () => {
      expect(css).toContain('.nested-menu');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should use flex column layout', () => {
      expect(css).toMatch(/display:\s*flex/);
      expect(css).toMatch(/flex-direction:\s*column/);
    });

    it('should reset list-style', () => {
      expect(css).toMatch(/list-style:\s*none/);
    });
  });

  describe('Section Titles', () => {
    it('should define .nested-menu-title class', () => {
      expect(css).toContain('.nested-menu-title');
    });

    it('should use uppercase styling for titles', () => {
      expect(css).toMatch(/text-transform:\s*uppercase/);
    });

    it('should use muted color for titles', () => {
      expect(css).toContain('var(--color-on-surface-variant)');
    });
  });

  describe('Menu Item Styling', () => {
    it('should style li > a descendants', () => {
      expect(css).toContain('.nested-menu li > a');
    });

    it('should style li > button descendants', () => {
      expect(css).toContain('.nested-menu li > button');
    });

    it('should set items to full width', () => {
      expect(css).toMatch(/width:\s*100%/);
    });

    it('should use border-radius token', () => {
      expect(css).toContain('var(--radius-field');
    });

    it('should include hover background', () => {
      expect(css).toContain('.nested-menu li > a:hover');
      expect(css).toContain('var(--color-surface-container)');
    });

    it('should include focus-visible outline', () => {
      expect(css).toContain('.nested-menu li > a:focus-visible');
      expect(css).toContain('var(--color-primary)');
    });

    it('should include transitions', () => {
      expect(css).toContain('transition');
    });
  });

  describe('Active State', () => {
    it('should style .active class on links', () => {
      expect(css).toContain('.nested-menu li > a.active');
    });

    it('should support aria-current="page"', () => {
      expect(css).toContain('[aria-current="page"]');
    });

    it('should use primary-container for active background', () => {
      expect(css).toContain('var(--color-primary-container)');
      expect(css).toContain('var(--color-on-primary-container)');
    });

    it('should darken active items on hover with color-mix', () => {
      expect(css).toMatch(/color-mix\(in oklch/);
    });
  });

  describe('Disabled State', () => {
    it('should style .disabled class on li', () => {
      expect(css).toContain('.nested-menu li.disabled');
    });

    it('should reduce opacity', () => {
      expect(css).toMatch(/opacity:\s*0\.5/);
    });

    it('should disable pointer events', () => {
      expect(css).toMatch(/pointer-events:\s*none/);
    });
  });

  describe('Collapsible Submenus (details/summary)', () => {
    it('should style details elements', () => {
      expect(css).toContain('.nested-menu details');
    });

    it('should style summary elements', () => {
      expect(css).toContain('.nested-menu summary');
    });

    it('should remove webkit details marker', () => {
      expect(css).toContain('::-webkit-details-marker');
    });

    it('should remove standard marker', () => {
      expect(css).toContain('summary::marker');
    });

    it('should define chevron via summary::after', () => {
      expect(css).toContain('.nested-menu summary::after');
      expect(css).toMatch(/border-right:\s*1\.5px solid currentColor/);
      expect(css).toMatch(/border-bottom:\s*1\.5px solid currentColor/);
    });

    it('should rotate chevron when open', () => {
      expect(css).toContain('.nested-menu details[open] > summary::after');
      expect(css).toMatch(/transform:\s*rotate\(45deg\)/);
    });

    it('should style nested ul with indentation', () => {
      expect(css).toContain('.nested-menu details > ul');
      expect(css).toMatch(/padding.*1rem/);
    });

    it('should reset nested ul list-style', () => {
      // The nested ul should also be list-style: none
      expect(css).toContain('.nested-menu details > ul');
      // list-style: none appears for both root and nested
      const matches = css.match(/list-style:\s*none/g);
      expect(matches).not.toBeNull();
      expect(matches!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Size Variants', () => {
    it('should define .nested-menu-xs class', () => {
      expect(css).toContain('.nested-menu-xs');
    });

    it('should define .nested-menu-sm class', () => {
      expect(css).toContain('.nested-menu-sm');
    });

    it('should define .nested-menu-lg class', () => {
      expect(css).toContain('.nested-menu-lg');
    });

    it('should use smaller font for xs variant', () => {
      // xs should have font-size 0.75rem
      expect(css).toMatch(/\.nested-menu-xs[\s\S]*?font-size:\s*0\.75rem/);
    });

    it('should use larger font for lg variant', () => {
      expect(css).toMatch(/\.nested-menu-lg[\s\S]*?font-size:\s*1rem/);
    });

    it('should adjust padding for size variants', () => {
      // Size variants should adjust item padding
      expect(css).toContain('.nested-menu-xs li > a');
      expect(css).toContain('.nested-menu-sm li > a');
      expect(css).toContain('.nested-menu-lg li > a');
    });

    it('should adjust summary padding for size variants', () => {
      expect(css).toContain('.nested-menu-xs summary');
      expect(css).toContain('.nested-menu-sm summary');
      expect(css).toContain('.nested-menu-lg summary');
    });
  });

  describe('Bordered Variant', () => {
    it('should define .nested-menu-bordered class', () => {
      expect(css).toContain('.nested-menu-bordered');
    });

    it('should add border', () => {
      expect(css).toContain('var(--color-outline-variant)');
    });

    it('should add surface background', () => {
      expect(css).toContain('var(--color-surface)');
    });

    it('should add box-shadow', () => {
      expect(css).toContain('var(--shadow-sm');
    });

    it('should use border-radius token', () => {
      expect(css).toContain('var(--radius-card');
    });
  });

  describe('Compact Variant', () => {
    it('should define .nested-menu-compact class', () => {
      expect(css).toContain('.nested-menu-compact');
    });

    it('should reduce padding on items', () => {
      expect(css).toContain('.nested-menu-compact li > a');
    });

    it('should reduce nesting indentation', () => {
      expect(css).toContain('.nested-menu-compact details > ul');
    });
  });

  describe('Reduced Motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable transitions for items', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?transition:\s*none/);
    });

    it('should disable transitions for summary', () => {
      // The reduced motion block should cover summary
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?\.nested-menu summary/);
    });

    it('should disable transitions for chevron', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?summary::after/);
    });
  });
});
