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
});
