/**
 * Unit tests for color token generation
 * Tests the 65+ Material Design 3 color tokens
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const COLORS_CSS_PATH = join(import.meta.dir, '../../src/base/colors.css');

describe('Color Token Generation', () => {
  let colorsCSS: string;

  beforeAll(async () => {
    try {
      colorsCSS = await readFile(COLORS_CSS_PATH, 'utf-8');
    } catch {
      colorsCSS = '';
    }
  });

  describe('Brand Colors', () => {
    it('should define primary color tokens', () => {
      expect(colorsCSS).toContain('--color-primary:');
      // Note: -focus tokens removed in OKLCH migration, use color-mix() instead
      expect(colorsCSS).toContain('--color-primary-content:');
      expect(colorsCSS).toContain('--color-primary-container:');
      expect(colorsCSS).toContain('--color-on-primary-container:');
    });

    it('should define secondary color tokens', () => {
      expect(colorsCSS).toContain('--color-secondary:');
      // Note: -focus tokens removed in OKLCH migration, use color-mix() instead
      expect(colorsCSS).toContain('--color-secondary-content:');
      expect(colorsCSS).toContain('--color-secondary-container:');
      expect(colorsCSS).toContain('--color-on-secondary-container:');
    });

    it('should define tertiary color tokens', () => {
      expect(colorsCSS).toContain('--color-tertiary:');
      // Note: -focus tokens removed in OKLCH migration, use color-mix() instead
      expect(colorsCSS).toContain('--color-tertiary-content:');
      expect(colorsCSS).toContain('--color-tertiary-container:');
      expect(colorsCSS).toContain('--color-on-tertiary-container:');
    });
  });

  describe('Surface Colors', () => {
    it('should define surface color tokens', () => {
      expect(colorsCSS).toContain('--color-surface:');
      expect(colorsCSS).toContain('--color-surface-dim:');
      expect(colorsCSS).toContain('--color-surface-bright:');
    });

    it('should define surface container variants', () => {
      expect(colorsCSS).toContain('--color-surface-container-lowest:');
      expect(colorsCSS).toContain('--color-surface-container-low:');
      expect(colorsCSS).toContain('--color-surface-container:');
      expect(colorsCSS).toContain('--color-surface-container-high:');
      expect(colorsCSS).toContain('--color-surface-container-highest:');
    });

    it('should define on-surface color tokens', () => {
      expect(colorsCSS).toContain('--color-on-surface:');
      expect(colorsCSS).toContain('--color-on-surface-variant:');
    });
  });

  describe('Semantic Colors', () => {
    it('should define info color tokens', () => {
      expect(colorsCSS).toContain('--color-info:');
      expect(colorsCSS).toContain('--color-info-content:');
      expect(colorsCSS).toContain('--color-info-container:');
      expect(colorsCSS).toContain('--color-on-info-container:');
    });

    it('should define success color tokens', () => {
      expect(colorsCSS).toContain('--color-success:');
      expect(colorsCSS).toContain('--color-success-content:');
      expect(colorsCSS).toContain('--color-success-container:');
      expect(colorsCSS).toContain('--color-on-success-container:');
    });

    it('should define warning color tokens', () => {
      expect(colorsCSS).toContain('--color-warning:');
      expect(colorsCSS).toContain('--color-warning-content:');
      expect(colorsCSS).toContain('--color-warning-container:');
      expect(colorsCSS).toContain('--color-on-warning-container:');
    });

    it('should define error color tokens', () => {
      expect(colorsCSS).toContain('--color-error:');
      expect(colorsCSS).toContain('--color-error-content:');
      expect(colorsCSS).toContain('--color-error-container:');
      expect(colorsCSS).toContain('--color-on-error-container:');
    });
  });

  describe('Neutral Colors', () => {
    it('should define base color tokens', () => {
      expect(colorsCSS).toContain('--color-base-100:');
      expect(colorsCSS).toContain('--color-base-200:');
      expect(colorsCSS).toContain('--color-base-300:');
      expect(colorsCSS).toContain('--color-base-content:');
    });
  });

  describe('Outline Colors', () => {
    it('should define outline color tokens', () => {
      expect(colorsCSS).toContain('--color-outline:');
      expect(colorsCSS).toContain('--color-outline-variant:');
    });
  });

  describe('Color Format', () => {
    it('should declare tokens with initial value (values come from themes)', () => {
      // Colors.css declares tokens, actual OKLCH values come from theme files
      expect(colorsCSS).toContain('--color-primary: initial');
    });

    it('should use direct var() in utility classes (OKLCH format)', () => {
      // OKLCH stores full color values including wrapper, so direct var() usage
      expect(colorsCSS).toContain('background-color: var(--color-primary)');
    });

    it('should use color-mix for focus states', () => {
      // Focus states use color-mix() instead of separate -focus tokens
      expect(colorsCSS).toContain('color-mix(in oklch, var(--color-primary), black 10%)');
    });

    it('should not use hsl() function wrapper', () => {
      // OKLCH migration: no hsl() wrappers anywhere
      expect(colorsCSS).not.toMatch(/hsl\(var\(--color-/);
    });
  });

  describe('Token Count', () => {
    it('should have at least 55 color tokens', () => {
      // Note: Count reduced from 65 in OKLCH migration (-focus tokens removed)
      // Core tokens remain: primary, secondary, tertiary families, surfaces, semantics, base scale
      const tokenMatches = colorsCSS.match(/--color-[\w-]+:/g) || [];
      expect(tokenMatches.length).toBeGreaterThanOrEqual(55);
    });
  });
});
