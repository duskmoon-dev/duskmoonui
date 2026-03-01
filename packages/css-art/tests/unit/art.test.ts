import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ART_DIR = join(import.meta.dir, '../../src/art');

async function readArtCss(name: string): Promise<string> {
  return readFile(join(ART_DIR, `${name}.css`), 'utf-8');
}

describe('CSS Art', () => {
  describe('moon', () => {
    it('should define .art-moon base class', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('.art-moon');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('@layer css-art');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('.art-moon-sm');
      expect(css).toContain('.art-moon-lg');
      expect(css).toContain('.art-moon-xl');
    });

    it('should have crescent variant', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('.art-moon-crescent');
    });

    it('should have glow animation', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('.art-moon-glow');
      expect(css).toContain('@keyframes art-moon-pulse');
    });

    it('should use CSS custom properties for customization', async () => {
      const css = await readArtCss('moon');
      expect(css).toContain('--art-moon-size');
      expect(css).toContain('--art-moon-color');
    });
  });

  describe('sun', () => {
    it('should define .art-sun base class', async () => {
      const css = await readArtCss('sun');
      expect(css).toContain('.art-sun');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('sun');
      expect(css).toContain('@layer css-art');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('sun');
      expect(css).toContain('.art-sun-sm');
      expect(css).toContain('.art-sun-lg');
      expect(css).toContain('.art-sun-xl');
    });

    it('should have rays variant', async () => {
      const css = await readArtCss('sun');
      expect(css).toContain('.art-sun-rays');
    });

    it('should have sunset variant', async () => {
      const css = await readArtCss('sun');
      expect(css).toContain('.art-sun-sunset');
    });
  });

  describe('mountain', () => {
    it('should define .art-mountain base class', async () => {
      const css = await readArtCss('mountain');
      expect(css).toContain('.art-mountain');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('mountain');
      expect(css).toContain('@layer css-art');
    });

    it('should have mountain range variant', async () => {
      const css = await readArtCss('mountain');
      expect(css).toContain('.art-mountain-range');
    });

    it('should have color variants', async () => {
      const css = await readArtCss('mountain');
      expect(css).toContain('.art-mountain-sunset');
      expect(css).toContain('.art-mountain-forest');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('mountain');
      expect(css).toContain('.art-mountain-sm');
      expect(css).toContain('.art-mountain-lg');
    });
  });

  describe('index', () => {
    it('should import all art files', async () => {
      const index = await readFile(join(ART_DIR, 'index.css'), 'utf-8');
      expect(index).toContain('./moon.css');
      expect(index).toContain('./sun.css');
      expect(index).toContain('./mountain.css');
    });
  });
});
