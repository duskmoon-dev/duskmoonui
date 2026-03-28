/**
 * Unit tests for circle-menu component
 * Tests that circle-menu CSS defines expected classes and properties
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Circle Menu Component', () => {
  let css: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/circle-menu.css');
    css = await readFile(cssPath, 'utf-8');
  });

  describe('Layer directive', () => {
    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });
  });

  describe('Container', () => {
    it('should define .circle-menu class', () => {
      expect(css).toContain('.circle-menu');
    });

    it('should use relative positioning', () => {
      expect(css).toMatch(/position:\s*relative/);
    });

    it('should use inline-flex display', () => {
      expect(css).toMatch(/display:\s*inline-flex/);
    });

    it('should define CSS custom properties', () => {
      expect(css).toContain('--circle-menu-size');
      expect(css).toContain('--circle-menu-item-size');
      expect(css).toContain('--circle-menu-radius');
      expect(css).toContain('--circle-menu-btn-bg');
      expect(css).toContain('--circle-menu-bar-color');
      expect(css).toContain('--circle-menu-item-bg');
      expect(css).toContain('--circle-menu-item-color');
    });
  });

  describe('Toggler', () => {
    it('should define .circle-menu-toggler class', () => {
      expect(css).toContain('.circle-menu-toggler');
    });

    it('should be absolutely positioned', () => {
      expect(css).toMatch(/\.circle-menu-toggler[\s\S]*?position:\s*absolute/);
    });

    it('should be transparent (opacity 0)', () => {
      expect(css).toMatch(/\.circle-menu-toggler[\s\S]*?opacity:\s*0/);
    });

    it('should have cursor pointer', () => {
      expect(css).toMatch(/\.circle-menu-toggler[\s\S]*?cursor:\s*pointer/);
    });

    it('should have z-index above other elements', () => {
      expect(css).toMatch(/\.circle-menu-toggler[\s\S]*?z-index:\s*10/);
    });
  });

  describe('Label (toggle button)', () => {
    it('should define .circle-menu-label class', () => {
      expect(css).toContain('.circle-menu-label');
    });

    it('should be a circle (border-radius 50%)', () => {
      expect(css).toMatch(/\.circle-menu-label[\s\S]*?border-radius:\s*50%/);
    });

    it('should use primary-container background by default', () => {
      expect(css).toContain('var(--circle-menu-btn-bg)');
      expect(css).toContain('var(--color-primary-container)');
    });

    it('should have transition for smooth animation', () => {
      expect(css).toMatch(/\.circle-menu-label[\s\S]*?transition/);
    });

    it('should define ::before pseudo-element for hamburger bars', () => {
      expect(css).toContain('.circle-menu-label::before');
    });

    it('should define ::after pseudo-element for X diagonal', () => {
      expect(css).toContain('.circle-menu-label::after');
    });

    it('should use box-shadow trick for 3 hamburger bars', () => {
      expect(css).toMatch(/\.circle-menu-label::before[\s\S]*?box-shadow/);
    });
  });

  describe('Checked state: hamburger to X', () => {
    it('should remove box-shadow bars on checked', () => {
      expect(css).toContain('.circle-menu-toggler:checked + .circle-menu-label::before');
      expect(css).toMatch(/\.circle-menu-toggler:checked \+ \.circle-menu-label::before[\s\S]*?box-shadow:\s*none/);
    });

    it('should rotate first bar 45deg on checked', () => {
      expect(css).toMatch(/\.circle-menu-toggler:checked \+ \.circle-menu-label::before[\s\S]*?rotate\(45deg\)/);
    });

    it('should show ::after bar on checked (opacity 1)', () => {
      expect(css).toContain('.circle-menu-toggler:checked + .circle-menu-label::after');
      expect(css).toMatch(/\.circle-menu-toggler:checked \+ \.circle-menu-label::after[\s\S]*?opacity:\s*1/);
    });
  });

  describe('Menu list', () => {
    it('should define .circle-menu-list class', () => {
      expect(css).toContain('.circle-menu-list');
    });

    it('should be absolutely positioned', () => {
      expect(css).toMatch(/\.circle-menu-list[\s\S]*?position:\s*absolute/);
    });

    it('should reset list styles', () => {
      expect(css).toMatch(/\.circle-menu-list[\s\S]*?list-style:\s*none/);
    });
  });

  describe('Menu items', () => {
    it('should define .circle-menu-item class', () => {
      expect(css).toContain('.circle-menu-item');
    });

    it('should be hidden by default (opacity 0)', () => {
      expect(css).toMatch(/\.circle-menu-item[\s\S]*?opacity:\s*0/);
    });

    it('should have transition for animations', () => {
      expect(css).toMatch(/\.circle-menu-item[\s\S]*?transition/);
    });

    it('should style anchor links inside items', () => {
      expect(css).toContain('.circle-menu-item a');
    });

    it('should style buttons inside items', () => {
      expect(css).toContain('.circle-menu-item button');
    });

    it('should make items circular (border-radius 50%)', () => {
      expect(css).toMatch(/\.circle-menu-item a[\s\S]*?border-radius:\s*50%/);
    });

    it('should use color tokens for item colors', () => {
      expect(css).toContain('var(--circle-menu-item-bg)');
      expect(css).toContain('var(--circle-menu-item-color)');
    });

    it('should define counter-rotation for items 1-6 to keep icons upright', () => {
      expect(css).toContain('.circle-menu-item:nth-child(1) a');
      expect(css).toContain('.circle-menu-item:nth-child(2) a');
      expect(css).toContain('.circle-menu-item:nth-child(3) a');
      expect(css).toContain('.circle-menu-item:nth-child(4) a');
      expect(css).toContain('.circle-menu-item:nth-child(5) a');
      expect(css).toContain('.circle-menu-item:nth-child(6) a');
    });
  });

  describe('Checked state: radial expansion', () => {
    it('should show items when checked (opacity 1)', () => {
      expect(css).toContain('.circle-menu-toggler:checked ~ .circle-menu-list .circle-menu-item');
      expect(css).toMatch(/\.circle-menu-toggler:checked ~ \.circle-menu-list \.circle-menu-item[\s\S]*?opacity:\s*1/);
    });

    it('should enable pointer events on list when checked', () => {
      expect(css).toContain('.circle-menu-toggler:checked ~ .circle-menu-list');
      expect(css).toMatch(/\.circle-menu-toggler:checked ~ \.circle-menu-list[\s\S]*?pointer-events:\s*auto/);
    });

    it('should define radial transforms for all 6 items', () => {
      for (let i = 1; i <= 6; i++) {
        expect(css).toContain(
          `.circle-menu-toggler:checked ~ .circle-menu-list .circle-menu-item:nth-child(${i})`
        );
      }
    });

    it('should use translateX with radius variable for radial positions', () => {
      expect(css).toMatch(/translateX\(calc\(-1 \* var\(--circle-menu-radius\)\)\)/);
    });

    it('should use evenly spaced 60-degree rotations for 6 items', () => {
      expect(css).toMatch(/rotate\(0deg\)\s*translateX/);
      expect(css).toMatch(/rotate\(60deg\)\s*translateX/);
      expect(css).toMatch(/rotate\(120deg\)\s*translateX/);
      expect(css).toMatch(/rotate\(180deg\)\s*translateX/);
      expect(css).toMatch(/rotate\(240deg\)\s*translateX/);
      expect(css).toMatch(/rotate\(300deg\)\s*translateX/);
    });
  });

  describe('Size variants', () => {
    it('should define .circle-menu-sm class', () => {
      expect(css).toContain('.circle-menu-sm');
    });

    it('should define .circle-menu-lg class', () => {
      expect(css).toContain('.circle-menu-lg');
    });

    it('should override size custom properties in sm variant', () => {
      expect(css).toMatch(/\.circle-menu-sm[\s\S]*?--circle-menu-size:\s*2\.5rem/);
      expect(css).toMatch(/\.circle-menu-sm[\s\S]*?--circle-menu-radius:\s*4\.5rem/);
    });

    it('should override size custom properties in lg variant', () => {
      expect(css).toMatch(/\.circle-menu-lg[\s\S]*?--circle-menu-size:\s*3\.5rem/);
      expect(css).toMatch(/\.circle-menu-lg[\s\S]*?--circle-menu-radius:\s*6\.5rem/);
    });
  });

  describe('Color variants', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];

    for (const variant of variants) {
      it(`should define .circle-menu-${variant} class`, () => {
        expect(css).toContain(`.circle-menu-${variant}`);
      });

      it(`should use ${variant} color token in .circle-menu-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(`\\.circle-menu-${variant}[\\s\\S]*?var\\(--color-${variant}`)
        );
      });
    }

    it('should use color-mix for item ring in variants', () => {
      expect(css).toMatch(/color-mix\(in oklch/);
    });
  });

  describe('Reduced motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable transitions for label', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?\.circle-menu-label[\s\S]*?transition:\s*none/);
    });

    it('should disable transitions for items', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*?\.circle-menu-item[\s\S]*?transition:\s*none/);
    });
  });
});
