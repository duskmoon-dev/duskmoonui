/**
 * Unit tests for navbar component
 * Tests layout structure and section alignment
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Navbar Component', () => {
  let css: string;
  let bundledCSS: string;

  beforeAll(async () => {
    [css, bundledCSS] = await Promise.all([
      readFile(resolve(__dirname, '../../src/components/navbar.css'), 'utf-8'),
      readFile(resolve(__dirname, '../../src/components/navigation.css'), 'utf-8'),
    ]);
  });

  describe('Base Layout', () => {
    it('should define .navbar class', () => {
      expect(css).toContain('.navbar');
    });

    it('should use flexbox layout', () => {
      expect(css).toMatch(/\.navbar\s*\{[^}]*display:\s*flex/s);
    });

    it('should center items vertically', () => {
      expect(css).toMatch(/\.navbar\s*\{[^}]*align-items:\s*center/s);
    });

    it('should span full width', () => {
      expect(css).toMatch(/\.navbar\s*\{[^}]*width:\s*100%/s);
    });

    it('should have minimum height', () => {
      expect(css).toMatch(/\.navbar\s*\{[^}]*min-height:\s*4rem/s);
    });
  });

  describe('Sections', () => {
    it('should define navbar-start section', () => {
      expect(css).toContain('.navbar-start');
    });

    it('should define navbar-center section', () => {
      expect(css).toContain('.navbar-center');
    });

    it('should define navbar-end section', () => {
      expect(css).toContain('.navbar-end');
    });

    it('should align navbar-start to flex-start', () => {
      expect(css).toMatch(/\.navbar-start[^}]*justify-content:\s*flex-start/s);
    });

    it('should align navbar-center to center', () => {
      expect(css).toMatch(/\.navbar-center[^}]*justify-content:\s*center/s);
    });

    it('should align navbar-end to flex-end', () => {
      expect(css).toMatch(/\.navbar-end[^}]*justify-content:\s*flex-end/s);
    });
  });

  describe('Color Tokens', () => {
    it('should use surface background', () => {
      expect(css).toContain('var(--color-surface)');
    });

    it('should use on-surface text color', () => {
      expect(css).toContain('var(--color-on-surface)');
    });

    const colors = [
      { name: 'primary', background: 'primary', content: 'primary-content' },
      { name: 'secondary', background: 'secondary', content: 'secondary-content' },
      { name: 'tertiary', background: 'tertiary', content: 'tertiary-content' },
      { name: 'accent', background: 'accent', content: 'accent-content' },
      { name: 'neutral', background: 'neutral', content: 'neutral-content' },
      { name: 'base', background: 'base-100', content: 'base-content' },
      { name: 'info', background: 'info', content: 'info-content' },
      { name: 'success', background: 'success', content: 'success-content' },
      { name: 'warning', background: 'warning', content: 'warning-content' },
      { name: 'error', background: 'error', content: 'error-content' },
    ];

    for (const { name, background, content } of colors) {
      it(`should define and bundle navbar-${name}`, () => {
        const variant = new RegExp(
          `\\.navbar-${name}\\s*\\{[^}]*background-color:\\s*var\\(--color-${background}\\)[^}]*color:\\s*var\\(--color-${content}\\)`,
          's',
        );

        expect(css).toMatch(variant);
        expect(bundledCSS).toMatch(variant);
      });
    }
  });

  describe('Layer', () => {
    it('should be wrapped in @layer components', () => {
      expect(css).toContain('@layer components');
    });
  });
});
