/**
 * Unit tests for modal component class generation
 * Tests that modal CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Modal Component', () => {
  let modalCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/modal.css');
    modalCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Modal Base', () => {
    it('should define .modal class', () => {
      expect(modalCSS).toContain('.modal');
    });

    it('should include @layer components directive', () => {
      expect(modalCSS).toContain('@layer components');
    });

    it('should use fixed positioning', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*position:\s*fixed/s);
    });

    it('should cover full viewport', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*(inset:\s*0|top:\s*0)/s);
    });

    it('should use flexbox for centering', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*display:\s*(flex|grid)/s);
    });

    it('should center content', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*(align-items:\s*center|place-items:\s*center|justify-content:\s*center)/s);
    });

    it('should have high z-index', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*z-index/s);
    });
  });

  describe('Modal Box', () => {
    it('should define .modal-box class', () => {
      expect(modalCSS).toContain('.modal-box');
    });

    it('should use surface color for background', () => {
      expect(modalCSS).toContain('var(--color-surface');
    });

    it('should have border-radius', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*border-radius/s);
    });

    it('should have box-shadow for elevation', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*box-shadow/s);
    });

    it('should have max-width for content', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*max-width/s);
    });

    it('should have max-height for scrollability', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*max-height/s);
    });

    it('should handle overflow', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*overflow/s);
    });

    it('should have padding', () => {
      expect(modalCSS).toMatch(/\.modal-box[^}]*padding/s);
    });
  });

  describe('Modal Action', () => {
    it('should define .modal-action class', () => {
      expect(modalCSS).toContain('.modal-action');
    });

    it('should use flexbox for action buttons', () => {
      expect(modalCSS).toMatch(/\.modal-action[^}]*display:\s*flex/s);
    });

    it('should have gap between buttons', () => {
      expect(modalCSS).toMatch(/\.modal-action[^}]*gap/s);
    });

    it('should align to end', () => {
      expect(modalCSS).toMatch(/\.modal-action[^}]*justify-content:\s*(flex-end|end)/s);
    });

    it('should have margin-top for spacing', () => {
      expect(modalCSS).toMatch(/\.modal-action[^}]*margin-top/s);
    });
  });

  describe('Modal Backdrop', () => {
    it('should define .modal-backdrop class', () => {
      expect(modalCSS).toContain('.modal-backdrop');
    });

    it('should use fixed positioning', () => {
      expect(modalCSS).toMatch(/\.modal-backdrop[^}]*position:\s*(fixed|absolute)/s);
    });

    it('should cover full area', () => {
      expect(modalCSS).toMatch(/\.modal-backdrop[^}]*(inset:\s*0|width:\s*100%)/s);
    });

    it('should have semi-transparent background', () => {
      expect(modalCSS).toMatch(/\.modal-backdrop[^}]*background/s);
    });

    it('should be behind modal content', () => {
      expect(modalCSS).toMatch(/\.modal-backdrop[^}]*z-index/s);
    });
  });

  describe('Modal States', () => {
    it('should be hidden by default', () => {
      expect(modalCSS).toMatch(/\.modal[^}]*(visibility:\s*hidden|opacity:\s*0|display:\s*none)/s);
    });

    it('should define .modal-open class for visibility', () => {
      expect(modalCSS).toContain('.modal-open');
    });

    it('should show modal when open', () => {
      expect(modalCSS).toMatch(/\.modal-open[^}]*(visibility:\s*visible|opacity:\s*1|display:\s*flex)/s);
    });

    it('should support :target for pure CSS modal', () => {
      expect(modalCSS).toMatch(/\.modal:target/);
    });
  });

  describe('Modal Toggle', () => {
    it('should define modal toggle mechanism', () => {
      const hasToggle = modalCSS.includes('.modal-toggle') ||
                        modalCSS.includes('input[type="checkbox"]') ||
                        modalCSS.includes(':target');
      expect(hasToggle).toBe(true);
    });
  });

  describe('Animation', () => {
    it('should include transition for smooth appearance', () => {
      expect(modalCSS).toContain('transition');
    });

    it('should animate opacity or transform', () => {
      expect(modalCSS).toMatch(/transition[^;]*(opacity|transform)/);
    });
  });

  describe('Color Integration', () => {
    it('should use on-surface color for text', () => {
      expect(modalCSS).toContain('var(--color-on-surface');
    });
  });

  describe('Size Variants', () => {
    it('should define .modal-sm for small modals', () => {
      expect(modalCSS).toContain('.modal-sm');
    });

    it('should define .modal-lg for large modals', () => {
      expect(modalCSS).toContain('.modal-lg');
    });

    it('should have different max-width for sizes', () => {
      expect(modalCSS).toMatch(/\.modal-sm[^}]*max-width/s);
      expect(modalCSS).toMatch(/\.modal-lg[^}]*max-width/s);
    });
  });

  describe('Responsive', () => {
    it('should handle mobile viewport', () => {
      expect(modalCSS).toMatch(/@media/);
    });
  });

  describe('Accessibility', () => {
    it('should support reduced motion preference', () => {
      expect(modalCSS).toMatch(/prefers-reduced-motion/);
    });

    it('should have focus styles', () => {
      expect(modalCSS).toMatch(/:focus/);
    });
  });
});
