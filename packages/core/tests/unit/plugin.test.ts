/**
 * Unit tests for the Tailwind CSS plugin registration
 * Verifies matchUtilities is called for grid utilities so they work
 * when using the @plugin import pattern.
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PLUGIN_SRC = join(import.meta.dir, '../../src/tailwind-plugin.ts');

describe('Tailwind Plugin Registration', () => {
  let pluginSrc: string;

  beforeAll(async () => {
    pluginSrc = await readFile(PLUGIN_SRC, 'utf-8');
  });

  describe('matchUtilities', () => {
    it('should call matchUtilities (not just destructure it)', () => {
      // Verify it's actually invoked, not just present in the destructure
      expect(pluginSrc).toMatch(/matchUtilities\s*\(/);
    });

    it('should register grid-cols-auto-fill utility', () => {
      expect(pluginSrc).toContain("'grid-cols-auto-fill'");
    });

    it('should register grid-cols-auto-fit utility', () => {
      expect(pluginSrc).toContain("'grid-cols-auto-fit'");
    });

    it('should use auto-fill repeat in grid-cols-auto-fill', () => {
      expect(pluginSrc).toContain('repeat(auto-fill,');
    });

    it('should use auto-fit repeat in grid-cols-auto-fit', () => {
      expect(pluginSrc).toContain('repeat(auto-fit,');
    });

    it('should use minmax with 100% cap for responsive columns', () => {
      expect(pluginSrc).toContain('minmax(min(');
      expect(pluginSrc).toContain('100%), 1fr)');
    });

    it('should use theme spacing as values', () => {
      expect(pluginSrc).toContain("theme('spacing')");
    });
  });

  describe('Shadow tokens', () => {
    it('should define themeShadows object', () => {
      expect(pluginSrc).toContain('themeShadows');
    });

    it('should include all standard shadow sizes', () => {
      expect(pluginSrc).toContain("'xs'");
      expect(pluginSrc).toContain("'sm'");
      expect(pluginSrc).toContain("'md'");
      expect(pluginSrc).toContain("'lg'");
      expect(pluginSrc).toContain("'xl'");
      expect(pluginSrc).toContain("'2xl'");
    });

    it('should reference CSS custom properties for shadows', () => {
      expect(pluginSrc).toContain('var(--shadow-xs)');
      expect(pluginSrc).toContain('var(--shadow-sm)');
      expect(pluginSrc).toContain('var(--shadow-md)');
      expect(pluginSrc).toContain('var(--shadow-lg)');
      expect(pluginSrc).toContain('var(--shadow-xl)');
      expect(pluginSrc).toContain('var(--shadow-2xl)');
    });

    it('should register shadows in boxShadow theme extension', () => {
      expect(pluginSrc).toContain('boxShadow: themeShadows');
    });
  });

  describe('MD3 Elevation shadows', () => {
    it('should include elevation shadow tokens in themeShadows', () => {
      expect(pluginSrc).toContain("'elevation-0'");
      expect(pluginSrc).toContain("'elevation-1'");
      expect(pluginSrc).toContain("'elevation-2'");
      expect(pluginSrc).toContain("'elevation-3'");
      expect(pluginSrc).toContain("'elevation-4'");
      expect(pluginSrc).toContain("'elevation-5'");
    });

    it('should reference elevation shadow CSS custom properties', () => {
      expect(pluginSrc).toContain('var(--shadow-elevation-0)');
      expect(pluginSrc).toContain('var(--shadow-elevation-1)');
      expect(pluginSrc).toContain('var(--shadow-elevation-2)');
      expect(pluginSrc).toContain('var(--shadow-elevation-3)');
      expect(pluginSrc).toContain('var(--shadow-elevation-4)');
      expect(pluginSrc).toContain('var(--shadow-elevation-5)');
    });
  });

  describe('Color tokens', () => {
    it('should include shadow and scrim color tokens', () => {
      expect(pluginSrc).toContain("'shadow'");
      expect(pluginSrc).toContain("'scrim'");
      expect(pluginSrc).toContain('var(--color-shadow)');
      expect(pluginSrc).toContain('var(--color-scrim)');
    });
  });

  describe('Shape tokens', () => {
    it('should define themeRadius object', () => {
      expect(pluginSrc).toContain('themeRadius');
    });

    it('should map radius tokens to CSS custom properties', () => {
      expect(pluginSrc).toContain('var(--radius-none)');
      expect(pluginSrc).toContain('var(--radius-xs)');
      expect(pluginSrc).toContain('var(--radius-sm)');
      expect(pluginSrc).toContain('var(--radius-md)');
      expect(pluginSrc).toContain('var(--radius-lg)');
      expect(pluginSrc).toContain('var(--radius-xl)');
      expect(pluginSrc).toContain('var(--radius-2xl)');
      expect(pluginSrc).toContain('var(--radius-full)');
    });

    it('should register radius in borderRadius theme extension', () => {
      expect(pluginSrc).toContain('borderRadius: themeRadius');
    });
  });
});
