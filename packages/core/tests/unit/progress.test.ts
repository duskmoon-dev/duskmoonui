/**
 * Unit tests for progress component class generation
 * Tests that progress CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Progress Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/progress.css'),
      'utf-8',
    );
  });

  describe('Base Progress (Linear)', () => {
    it('should define .progress base class', () => {
      expect(css).toContain('.progress');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should be full width', () => {
      expect(css).toMatch(/\.progress\s*\{[^}]*width:\s*100%/s);
    });

    it('should set height to 0.5rem', () => {
      expect(css).toMatch(/\.progress\s*\{[^}]*height:\s*0\.5rem/s);
    });

    it('should use surface-container-highest background', () => {
      expect(css).toMatch(
        /\.progress\s*\{[^}]*background-color:\s*var\(--color-surface-container-highest\)/s,
      );
    });

    it('should have pill-shaped border-radius', () => {
      expect(css).toMatch(/\.progress\s*\{[^}]*border-radius:\s*9999px/s);
    });

    it('should hide overflow', () => {
      expect(css).toMatch(/\.progress\s*\{[^}]*overflow:\s*hidden/s);
    });
  });

  describe('Progress Bar', () => {
    it('should define .progress-bar class', () => {
      expect(css).toContain('.progress-bar');
    });

    it('should be absolutely positioned', () => {
      expect(css).toMatch(
        /\.progress-bar\s*\{[^}]*position:\s*absolute/s,
      );
    });

    it('should fill full height', () => {
      expect(css).toMatch(
        /\.progress-bar\s*\{[^}]*height:\s*100%/s,
      );
    });

    it('should use primary color by default', () => {
      expect(css).toMatch(
        /\.progress-bar\s*\{[^}]*background-color:\s*var\(--color-primary\)/s,
      );
    });

    it('should have transition for width changes', () => {
      expect(css).toMatch(
        /\.progress-bar\s*\{[^}]*transition:\s*width/s,
      );
    });
  });

  describe('Color Variants', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const color of colors) {
      it(`should define .progress-${color} variant`, () => {
        expect(css).toContain(`.progress-${color}`);
      });

      it(`should use --color-${color} for progress-${color} bar`, () => {
        const regex = new RegExp(
          `\\.progress-${color}\\s+\\.progress-bar\\s*\\{[^}]*background-color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });
    }
  });

  describe('Size Variants', () => {
    it('should define .progress-xs class', () => {
      expect(css).toContain('.progress-xs');
    });

    it('should define .progress-sm class', () => {
      expect(css).toContain('.progress-sm');
    });

    it('should define .progress-lg class', () => {
      expect(css).toContain('.progress-lg');
    });

    it('should define .progress-xl class', () => {
      expect(css).toContain('.progress-xl');
    });

    it('should set xs height to 0.25rem', () => {
      expect(css).toMatch(
        /\.progress-xs\s*\{[^}]*height:\s*0\.25rem/s,
      );
    });

    it('should set sm height to 0.375rem', () => {
      expect(css).toMatch(
        /\.progress-sm\s*\{[^}]*height:\s*0\.375rem/s,
      );
    });

    it('should set lg height to 0.75rem', () => {
      expect(css).toMatch(
        /\.progress-lg\s*\{[^}]*height:\s*0\.75rem/s,
      );
    });

    it('should set xl height to 1rem', () => {
      expect(css).toMatch(
        /\.progress-xl\s*\{[^}]*height:\s*1rem/s,
      );
    });
  });

  describe('Indeterminate Animation', () => {
    it('should define .progress-indeterminate class', () => {
      expect(css).toContain('.progress-indeterminate');
    });

    it('should set bar width to 30% for indeterminate', () => {
      expect(css).toMatch(
        /\.progress-indeterminate\s+\.progress-bar\s*\{[^}]*width:\s*30%/s,
      );
    });

    it('should define @keyframes progress-indeterminate', () => {
      expect(css).toContain('@keyframes progress-indeterminate');
    });

    it('should have animation on indeterminate bar', () => {
      expect(css).toMatch(
        /\.progress-indeterminate\s+\.progress-bar\s*\{[^}]*animation:\s*progress-indeterminate/s,
      );
    });
  });

  describe('Progress with Label', () => {
    it('should define .progress-labeled class', () => {
      expect(css).toContain('.progress-labeled');
    });

    it('should define .progress-label class', () => {
      expect(css).toContain('.progress-label');
    });

    it('should center the label', () => {
      expect(css).toMatch(
        /\.progress-label\s*\{[^}]*transform:\s*translate\(-50%,\s*-50%\)/s,
      );
    });
  });

  describe('Striped Progress', () => {
    it('should define .progress-striped class', () => {
      expect(css).toContain('.progress-striped');
    });

    it('should use linear-gradient for stripes', () => {
      expect(css).toMatch(
        /\.progress-striped\s+\.progress-bar\s*\{[^}]*background-image:\s*linear-gradient/s,
      );
    });

    it('should define animated striped variant', () => {
      expect(css).toContain('.progress-striped.progress-animated');
    });

    it('should define @keyframes progress-striped', () => {
      expect(css).toContain('@keyframes progress-striped');
    });
  });

  describe('Circular Progress', () => {
    it('should define .progress-circular class', () => {
      expect(css).toContain('.progress-circular');
    });

    it('should be 3rem by default', () => {
      expect(css).toMatch(
        /\.progress-circular\s*\{[^}]*width:\s*3rem/s,
      );
      expect(css).toMatch(
        /\.progress-circular\s*\{[^}]*height:\s*3rem/s,
      );
    });

    it('should center content', () => {
      expect(css).toMatch(
        /\.progress-circular\s*\{[^}]*display:\s*inline-flex/s,
      );
      expect(css).toMatch(
        /\.progress-circular\s*\{[^}]*align-items:\s*center/s,
      );
    });

    it('should define circular track', () => {
      expect(css).toContain('.progress-circular-track');
    });

    it('should define circular bar', () => {
      expect(css).toContain('.progress-circular-bar');
    });

    it('should define circular label', () => {
      expect(css).toContain('.progress-circular-label');
    });
  });

  describe('Circular Size Variants', () => {
    it('should define .progress-circular-sm', () => {
      expect(css).toContain('.progress-circular-sm');
    });

    it('should define .progress-circular-lg', () => {
      expect(css).toContain('.progress-circular-lg');
    });

    it('should define .progress-circular-xl', () => {
      expect(css).toContain('.progress-circular-xl');
    });

    it('should set sm to 2rem', () => {
      expect(css).toMatch(
        /\.progress-circular-sm\s*\{[^}]*width:\s*2rem/s,
      );
    });

    it('should set lg to 4rem', () => {
      expect(css).toMatch(
        /\.progress-circular-lg\s*\{[^}]*width:\s*4rem/s,
      );
    });

    it('should set xl to 6rem', () => {
      expect(css).toMatch(
        /\.progress-circular-xl\s*\{[^}]*width:\s*6rem/s,
      );
    });
  });

  describe('Circular Indeterminate', () => {
    it('should define circular indeterminate class', () => {
      expect(css).toContain('.progress-circular-indeterminate');
    });

    it('should define circular rotation keyframes', () => {
      expect(css).toContain('@keyframes progress-circular-rotate');
    });

    it('should define circular dash keyframes', () => {
      expect(css).toContain('@keyframes progress-circular-dash');
    });
  });

  describe('Reduced Motion', () => {
    it('should include prefers-reduced-motion media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable all animations for reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?animation:\s*none/,
      );
    });
  });
});
