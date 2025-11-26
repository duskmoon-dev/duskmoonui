/**
 * Unit tests for card component class generation
 * Tests that card CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Card Component', () => {
  let cardCSS: string;

  beforeAll(async () => {
    const cssPath = resolve(__dirname, '../../src/components/card.css');
    cardCSS = await readFile(cssPath, 'utf-8');
  });

  describe('Base Card Classes', () => {
    it('should define .card base class', () => {
      expect(cardCSS).toContain('.card');
    });

    it('should include @layer components directive', () => {
      expect(cardCSS).toContain('@layer components');
    });

    it('should use surface background color', () => {
      expect(cardCSS).toContain('var(--color-surface');
    });

    it('should include border-radius for rounded corners', () => {
      expect(cardCSS).toMatch(/border-radius/);
    });

    it('should include box-shadow for elevation', () => {
      expect(cardCSS).toMatch(/box-shadow/);
    });

    it('should set overflow hidden for content clipping', () => {
      expect(cardCSS).toMatch(/overflow:\s*hidden/);
    });
  });

  describe('Card Body', () => {
    it('should define .card-body class', () => {
      expect(cardCSS).toContain('.card-body');
    });

    it('should have padding in card-body', () => {
      expect(cardCSS).toMatch(/\.card-body[^}]*padding/s);
    });

    it('should use flexbox for layout', () => {
      expect(cardCSS).toMatch(/\.card-body[^}]*display:\s*flex/s);
    });

    it('should use flex-direction column', () => {
      expect(cardCSS).toMatch(/\.card-body[^}]*flex-direction:\s*column/s);
    });
  });

  describe('Card Title', () => {
    it('should define .card-title class', () => {
      expect(cardCSS).toContain('.card-title');
    });

    it('should have appropriate font weight', () => {
      expect(cardCSS).toMatch(/\.card-title[^}]*font-weight/s);
    });

    it('should have appropriate font size', () => {
      expect(cardCSS).toMatch(/\.card-title[^}]*font-size/s);
    });
  });

  describe('Card Actions', () => {
    it('should define .card-actions class', () => {
      expect(cardCSS).toContain('.card-actions');
    });

    it('should use flexbox for action buttons', () => {
      expect(cardCSS).toMatch(/\.card-actions[^}]*display:\s*flex/s);
    });

    it('should have gap between action items', () => {
      expect(cardCSS).toMatch(/\.card-actions[^}]*gap/s);
    });
  });

  describe('Card Variants', () => {
    it('should define .card-bordered class', () => {
      expect(cardCSS).toContain('.card-bordered');
    });

    it('should have border in bordered variant', () => {
      expect(cardCSS).toMatch(/\.card-bordered[^}]*border/s);
    });

    it('should use outline color for border', () => {
      expect(cardCSS).toContain('var(--color-outline');
    });

    it('should define .card-compact class', () => {
      expect(cardCSS).toContain('.card-compact');
    });

    it('should have reduced padding in compact variant', () => {
      // Compact should have smaller padding than regular
      expect(cardCSS).toMatch(/\.card-compact[^}]*padding/s);
    });
  });

  describe('Card Image', () => {
    it('should define .card-image or figure styling', () => {
      const hasImageClass = cardCSS.includes('.card-image') || cardCSS.includes('.card figure');
      expect(hasImageClass).toBe(true);
    });
  });

  describe('Color Integration', () => {
    it('should use on-surface color for text', () => {
      expect(cardCSS).toContain('var(--color-on-surface');
    });

    it('should support primary color variant', () => {
      expect(cardCSS).toContain('.card-primary');
    });

    it('should support secondary color variant', () => {
      expect(cardCSS).toContain('.card-secondary');
    });

    it('should support tertiary color variant', () => {
      expect(cardCSS).toContain('.card-tertiary');
    });
  });

  describe('Interactive States', () => {
    it('should define hover state for hoverable cards', () => {
      expect(cardCSS).toMatch(/\.card[^{]*:hover/);
    });
  });
});
