/**
 * Unit tests for modal component class generation
 * Tests that modal CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { modalStyles } from '../../src/components/modal';

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

    it('should use native dialog margins for centering', () => {
      expect(modalCSS).toMatch(/dialog\.modal[^}]*margin:\s*auto/s);
    });

    it('should reset the native dialog border and padding', () => {
      expect(modalCSS).toMatch(/dialog\.modal[^}]*padding:\s*0/s);
      expect(modalCSS).toMatch(/dialog\.modal[^}]*border:\s*none/s);
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
      expect(modalCSS).toMatch(/dialog\.modal[^}]*max-width/s);
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

  describe('Native Modal Contract', () => {
    it('uses the browser backdrop instead of an overlay element', () => {
      expect(modalCSS).toContain('dialog.modal::backdrop');
      expect(modalCSS).toMatch(/dialog\.modal::backdrop[^}]*background-color/s);
      expect(modalCSS).not.toMatch(/\.modal-backdrop\s*\{/);
    });

    it('keeps closed dialogs hidden and derives state from open', () => {
      expect(modalCSS).toMatch(/dialog\.modal:not\(\[open\]\)[^}]*display:\s*none/s);
      expect(modalCSS).toMatch(/dialog\.modal\[open\][^}]*opacity:\s*1/s);
      expect(modalCSS).not.toContain('.modal-open');
      expect(modalCSS).not.toContain('.modal-toggle');
      expect(modalCSS).not.toContain(':target');
      expect(modalCSS).not.toContain('.modal-focus-trap');
    });

    it('keeps the Tailwind plugin on the same native contract', () => {
      expect(modalStyles['dialog.modal']).toBeDefined();
      expect(modalStyles['dialog.modal:not([open])']).toEqual({ display: 'none' });
      expect(modalStyles['dialog.modal::backdrop']).toBeDefined();
      expect(Object.keys(modalStyles).join(' ')).not.toMatch(/modal-open|modal-toggle|:target/);
      expect(modalStyles['.modal']).toBeUndefined();
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

    it('should retain medium, extra-large, animation, and content modifiers', () => {
      expect(modalCSS).toContain('.modal-md');
      expect(modalCSS).toContain('.modal-xl');
      expect(modalCSS).toContain('.modal-slide-up');
      expect(modalCSS).toContain('.modal-slide-down');
      expect(modalCSS).toContain('.modal-zoom');
      expect(modalCSS).toContain('.modal-scrollable');
      expect(modalCSS).toContain('.modal-no-padding');
      expect(modalCSS).toContain('.modal-centered');
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

    it('should use dynamic viewport sizing and allow actions to wrap', () => {
      expect(modalCSS).toContain('100dvh');
      expect(modalCSS).toMatch(/\.modal-action,[\s\S]*?flex-wrap:\s*wrap/);
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
