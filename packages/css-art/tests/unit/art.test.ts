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

  describe('atom', () => {
    it('should define .art-atom base class', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('.art-atom');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('@layer css-art');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('.art-atom-sm');
      expect(css).toContain('.art-atom-lg');
    });

    it('should use CSS custom properties', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('--art-atom-size');
      expect(css).toContain('--art-atom-color');
      expect(css).toContain('--art-atom-speed');
    });

    it('should define electron orbit keyframes', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('@keyframes art-atom-electron-orbit');
      expect(css).toContain('@keyframes art-atom-rotate');
      expect(css).toContain('@keyframes art-atom-nucleus');
      expect(css).toContain('@keyframes art-atom-electron');
    });

    it('should have electron orbit selectors', async () => {
      const css = await readArtCss('atom');
      expect(css).toContain('.electron-alpha');
      expect(css).toContain('.electron-omega');
    });
  });

  describe('eclipse', () => {
    it('should define .art-eclipse base class', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('.art-eclipse');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('@layer css-art');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('.art-eclipse-sm');
      expect(css).toContain('.art-eclipse-lg');
    });

    it('should use CSS custom properties', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('--art-eclipse-bg');
      expect(css).toContain('--art-eclipse-size');
    });

    it('should define rotation keyframe', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('@keyframes art-eclipse-rotate');
    });

    it('should have 6 corona layers', async () => {
      const css = await readArtCss('eclipse');
      expect(css).toContain('.layer-1');
      expect(css).toContain('.layer-6');
    });
  });

  describe('plasma-ball', () => {
    it('should define .art-plasma-ball base class', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('.art-plasma-ball');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('@layer css-art');
    });

    it('should have size variants', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('.art-plasma-ball-sm');
      expect(css).toContain('.art-plasma-ball-lg');
    });

    it('should use CSS custom properties', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('--art-plasma-ball-size');
      expect(css).toContain('--art-plasma-ball-base-color');
    });

    it('should have interactive toggle via input:checked', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('input.switcher:checked');
    });

    it('should define ray animation keyframes', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('@keyframes art-plasma-ball-ray1');
      expect(css).toContain('@keyframes art-plasma-ball-spark');
      expect(css).toContain('@keyframes art-plasma-ball-innerlight');
    });

    it('should have glassball and electrode elements', async () => {
      const css = await readArtCss('plasma-ball');
      expect(css).toContain('.glassball');
      expect(css).toContain('.electrode');
    });
  });

  describe('snow', () => {
    it('should define .art-snowflake base class', async () => {
      const css = await readArtCss('snow');
      expect(css).toContain('.art-snowflake');
    });

    it('should use @layer css-art', async () => {
      const css = await readArtCss('snow');
      expect(css).toContain('@layer css-art');
    });

    it('should have unicode variant', async () => {
      const css = await readArtCss('snow');
      expect(css).toContain('.art-snowflake-unicode');
    });

    it('should have falling animation', async () => {
      const css = await readArtCss('snow');
      expect(css).toContain('.art-snowflake-fall');
      expect(css).toContain('@keyframes art-snowflake-fall');
    });

    it('should use CSS custom properties', async () => {
      const css = await readArtCss('snow');
      expect(css).toContain('--art-snowflake-size');
      expect(css).toContain('--art-snowflake-color');
      expect(css).toContain('--art-snowflake-duration');
    });
  });

  describe('index', () => {
    it('should import all art files', async () => {
      const index = await readFile(join(ART_DIR, 'index.css'), 'utf-8');
      expect(index).toContain('./moon.css');
      expect(index).toContain('./sun.css');
      expect(index).toContain('./mountain.css');
      expect(index).toContain('./atom.css');
      expect(index).toContain('./eclipse.css');
      expect(index).toContain('./plasma-ball.css');
      expect(index).toContain('./snow.css');
    });
  });
});
