/**
 * Unit tests for drawer component class generation
 * Tests that drawer CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Drawer Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/drawer.css'),
      'utf-8',
    );
  });

  describe('Drawer Backdrop', () => {
    it('should define .drawer-backdrop class', () => {
      expect(css).toContain('.drawer-backdrop');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should be fixed position', () => {
      expect(css).toMatch(
        /\.drawer-backdrop\s*\{[^}]*position:\s*fixed/s,
      );
    });

    it('should cover entire viewport', () => {
      expect(css).toMatch(
        /\.drawer-backdrop\s*\{[^}]*inset:\s*0/s,
      );
    });

    it('should have high z-index', () => {
      expect(css).toMatch(
        /\.drawer-backdrop\s*\{[^}]*z-index:\s*1100/s,
      );
    });

    it('should start hidden', () => {
      expect(css).toMatch(
        /\.drawer-backdrop\s*\{[^}]*opacity:\s*0/s,
      );
      expect(css).toMatch(
        /\.drawer-backdrop\s*\{[^}]*visibility:\s*hidden/s,
      );
    });

    it('should define show state', () => {
      expect(css).toContain('.drawer-backdrop-show');
    });

    it('should be visible when shown', () => {
      expect(css).toMatch(
        /\.drawer-backdrop-show\s*\{[^}]*opacity:\s*1/s,
      );
      expect(css).toMatch(
        /\.drawer-backdrop-show\s*\{[^}]*visibility:\s*visible/s,
      );
    });
  });

  describe('Base Drawer', () => {
    it('should define .drawer base class', () => {
      expect(css).toContain('.drawer {');
    });

    it('should be fixed position', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*position:\s*fixed/s,
      );
    });

    it('should have higher z-index than backdrop', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*z-index:\s*1200/s,
      );
    });

    it('should use flexbox column layout', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*display:\s*flex/s,
      );
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*flex-direction:\s*column/s,
      );
    });

    it('should use surface-container-low background', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*background-color:\s*var\(--color-surface-container-low\)/s,
      );
    });

    it('should have box-shadow', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*box-shadow:\s*var\(--shadow-2xl\)/s,
      );
    });

    it('should have transition for transform', () => {
      expect(css).toMatch(
        /\.drawer\s*\{[^}]*transition:\s*transform/s,
      );
    });
  });

  describe('Surface Variants', () => {
    it('should define .drawer-surface class', () => {
      expect(css).toContain('.drawer-surface');
    });

    it('should define .drawer-surface-container class', () => {
      expect(css).toContain('.drawer-surface-container');
    });

    it('should define .drawer-surface-container-low class', () => {
      expect(css).toContain('.drawer-surface-container-low');
    });

    it('should define .drawer-surface-container-high class', () => {
      expect(css).toContain('.drawer-surface-container-high');
    });
  });

  describe('Position Variants', () => {
    it('should define .drawer-left class', () => {
      expect(css).toContain('.drawer-left');
    });

    it('should translate left drawer off-screen', () => {
      expect(css).toMatch(
        /\.drawer-left\s*\{[^}]*transform:\s*translateX\(-100%\)/s,
      );
    });

    it('should show left drawer when open', () => {
      expect(css).toContain('.drawer-left.drawer-open');
      expect(css).toMatch(
        /\.drawer-left\.drawer-open\s*\{[^}]*transform:\s*translateX\(0\)/s,
      );
    });

    it('should define .drawer-right class', () => {
      expect(css).toContain('.drawer-right');
    });

    it('should translate right drawer off-screen', () => {
      expect(css).toMatch(
        /\.drawer-right\s*\{[^}]*transform:\s*translateX\(100%\)/s,
      );
    });

    it('should show right drawer when open', () => {
      expect(css).toContain('.drawer-right.drawer-open');
    });

    it('should define .drawer-top class', () => {
      expect(css).toContain('.drawer-top');
    });

    it('should translate top drawer off-screen', () => {
      expect(css).toMatch(
        /\.drawer-top\s*\{[^}]*transform:\s*translateY\(-100%\)/s,
      );
    });

    it('should define .drawer-bottom class', () => {
      expect(css).toContain('.drawer-bottom');
    });

    it('should translate bottom drawer off-screen', () => {
      expect(css).toMatch(
        /\.drawer-bottom\s*\{[^}]*transform:\s*translateY\(100%\)/s,
      );
    });

    it('should set max-width for horizontal drawers', () => {
      expect(css).toMatch(/\.drawer-left\s*\{[^}]*max-width:/s);
      expect(css).toMatch(/\.drawer-right\s*\{[^}]*max-width:/s);
    });

    it('should set max-height for vertical drawers', () => {
      expect(css).toMatch(/\.drawer-top\s*\{[^}]*max-height:\s*80vh/s);
      expect(css).toMatch(/\.drawer-bottom\s*\{[^}]*max-height:\s*80vh/s);
    });
  });

  describe('Drawer Header', () => {
    it('should define .drawer-header class', () => {
      expect(css).toContain('.drawer-header');
    });

    it('should use flexbox with gap', () => {
      expect(css).toMatch(
        /\.drawer-header\s*\{[^}]*display:\s*flex/s,
      );
      expect(css).toMatch(
        /\.drawer-header\s*\{[^}]*gap:\s*0\.75rem/s,
      );
    });

    it('should have bottom border', () => {
      expect(css).toMatch(
        /\.drawer-header\s*\{[^}]*border-bottom:\s*1px solid var\(--color-outline-variant\)/s,
      );
    });

    it('should define .drawer-title class', () => {
      expect(css).toContain('.drawer-title');
    });

    it('should define .drawer-close class', () => {
      expect(css).toContain('.drawer-close');
    });

    it('should make close button circular', () => {
      expect(css).toMatch(
        /\.drawer-close\s*\{[^}]*border-radius:\s*var\(--radius-full\)/s,
      );
    });
  });

  describe('Drawer Body', () => {
    it('should define .drawer-body class', () => {
      expect(css).toContain('.drawer-body');
    });

    it('should flex grow to fill space', () => {
      expect(css).toMatch(
        /\.drawer-body\s*\{[^}]*flex:\s*1/s,
      );
    });

    it('should allow vertical scrolling', () => {
      expect(css).toMatch(
        /\.drawer-body\s*\{[^}]*overflow-y:\s*auto/s,
      );
    });
  });

  describe('Drawer Footer', () => {
    it('should define .drawer-footer class', () => {
      expect(css).toContain('.drawer-footer');
    });

    it('should have top border', () => {
      expect(css).toMatch(
        /\.drawer-footer\s*\{[^}]*border-top:\s*1px solid var\(--color-outline-variant\)/s,
      );
    });
  });

  describe('Drawer Item', () => {
    it('should define .drawer-item class', () => {
      expect(css).toContain('.drawer-item');
    });

    it('should use flexbox layout', () => {
      expect(css).toMatch(
        /\.drawer-item\s*\{[^}]*display:\s*flex/s,
      );
    });

    it('should be full width', () => {
      expect(css).toMatch(
        /\.drawer-item\s*\{[^}]*width:\s*100%/s,
      );
    });

    it('should have pill-shaped border-radius', () => {
      expect(css).toMatch(
        /\.drawer-item\s*\{[^}]*border-radius:\s*var\(--radius-2xl\)/s,
      );
    });

    it('should have hover state', () => {
      expect(css).toContain('.drawer-item:hover');
    });

    it('should have focus-visible state', () => {
      expect(css).toContain('.drawer-item:focus-visible');
    });
  });

  describe('Active Item States', () => {
    it('should define .drawer-item-active class', () => {
      expect(css).toContain('.drawer-item-active');
    });

    it('should use secondary-container for active item', () => {
      expect(css).toMatch(
        /drawer-item-active[\s\S]*?background-color:\s*var\(--color-secondary-container\)/,
      );
    });

    it('should define active-primary variant', () => {
      expect(css).toContain('.drawer-item-active-primary');
    });

    it('should define active-secondary variant', () => {
      expect(css).toContain('.drawer-item-active-secondary');
    });

    it('should define active-tertiary variant', () => {
      expect(css).toContain('.drawer-item-active-tertiary');
    });
  });

  describe('Drawer Item Parts', () => {
    it('should define .drawer-item-icon class', () => {
      expect(css).toContain('.drawer-item-icon');
    });

    it('should define .drawer-item-badge class', () => {
      expect(css).toContain('.drawer-item-badge');
    });

    it('should use error-container for badge', () => {
      expect(css).toMatch(
        /drawer-item-badge[\s\S]*?background-color:\s*var\(--color-error-container\)/,
      );
    });
  });

  describe('Nested Items', () => {
    it('should define .drawer-item-nested class', () => {
      expect(css).toContain('.drawer-item-nested');
    });

    it('should define .drawer-item-nested-2 class', () => {
      expect(css).toContain('.drawer-item-nested-2');
    });

    it('should increase padding for nested items', () => {
      expect(css).toMatch(
        /\.drawer-item-nested\s*\{[^}]*padding-left:\s*3rem/s,
      );
    });
  });

  describe('Drawer Label & Divider', () => {
    it('should define .drawer-label class', () => {
      expect(css).toContain('.drawer-label');
    });

    it('should uppercase label text', () => {
      expect(css).toMatch(
        /\.drawer-label\s*\{[^}]*text-transform:\s*uppercase/s,
      );
    });

    it('should define .drawer-divider class', () => {
      expect(css).toContain('.drawer-divider');
    });
  });

  describe('User Profile', () => {
    it('should define .drawer-profile class', () => {
      expect(css).toContain('.drawer-profile');
    });

    it('should define .drawer-profile-avatar class', () => {
      expect(css).toContain('.drawer-profile-avatar');
    });

    it('should define .drawer-profile-name class', () => {
      expect(css).toContain('.drawer-profile-name');
    });

    it('should define .drawer-profile-email class', () => {
      expect(css).toContain('.drawer-profile-email');
    });

    it('should truncate overflowing text', () => {
      expect(css).toMatch(
        /drawer-profile-name[\s\S]*?text-overflow:\s*ellipsis/,
      );
      expect(css).toMatch(
        /drawer-profile-email[\s\S]*?text-overflow:\s*ellipsis/,
      );
    });
  });

  describe('Permanent Drawer', () => {
    it('should define .drawer-permanent class', () => {
      expect(css).toContain('.drawer-permanent');
    });

    it('should use relative positioning', () => {
      expect(css).toMatch(
        /\.drawer-permanent\s*\{[^}]*position:\s*relative/s,
      );
    });

    it('should have no transform', () => {
      expect(css).toMatch(
        /\.drawer-permanent\s*\{[^}]*transform:\s*none/s,
      );
    });

    it('should have no box-shadow', () => {
      expect(css).toMatch(
        /\.drawer-permanent\s*\{[^}]*box-shadow:\s*none/s,
      );
    });
  });

  describe('Rail Drawer', () => {
    it('should define .drawer-rail class', () => {
      expect(css).toContain('.drawer-rail');
    });

    it('should start at 5rem width', () => {
      expect(css).toMatch(
        /\.drawer-rail\s*\{[^}]*width:\s*5rem/s,
      );
    });

    it('should expand on hover', () => {
      expect(css).toContain('.drawer-rail:hover');
    });

    it('should expand to 20rem', () => {
      expect(css).toMatch(/drawer-rail:hover[\s\S]*?width:\s*20rem/);
    });
  });

  describe('Size Variants', () => {
    const sizes = [
      { name: 'sm', width: '12rem' },
      { name: 'md', width: '16rem' },
      { name: 'lg', width: '20rem' },
      { name: 'xl', width: '24rem' },
    ];

    for (const { name, width } of sizes) {
      it(`should define .drawer-${name} class`, () => {
        expect(css).toContain(`.drawer-${name}`);
      });

      it(`should set drawer-${name} width to ${width}`, () => {
        const regex = new RegExp(
          `\\.drawer-${name}\\s*\\{[^}]*width:\\s*${width.replace('.', '\\.')}`,
          's',
        );
        expect(css).toMatch(regex);
      });
    }

    it('should define .drawer-full class', () => {
      expect(css).toContain('.drawer-full');
    });

    it('should set full drawer to 100% width', () => {
      expect(css).toMatch(
        /\.drawer-full\s*\{[^}]*width:\s*100%/s,
      );
    });
  });

  describe('Reduced Motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable transitions for reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?transition:\s*none/,
      );
    });
  });
});
