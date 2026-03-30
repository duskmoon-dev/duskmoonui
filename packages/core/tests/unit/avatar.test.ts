/**
 * Unit tests for avatar component class generation
 * Tests that avatar CSS generates expected classes with correct styles
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Avatar Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/avatar.css'),
      'utf-8',
    );
  });

  describe('Base Avatar Class', () => {
    it('should define .avatar base class', () => {
      expect(css).toContain('.avatar');
    });

    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should set display to inline-flex', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*display:\s*inline-flex/s);
    });

    it('should center content', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*align-items:\s*center/s);
      expect(css).toMatch(/\.avatar\s*\{[^}]*justify-content:\s*center/s);
    });

    it('should be 3rem by default', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*width:\s*3rem/s);
      expect(css).toMatch(/\.avatar\s*\{[^}]*height:\s*3rem/s);
    });

    it('should be circular by default', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*border-radius:\s*var\(--radius-full\)/s);
    });

    it('should hide overflow', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*overflow:\s*hidden/s);
    });

    it('should use surface-container background', () => {
      expect(css).toMatch(
        /\.avatar\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color', () => {
      expect(css).toMatch(
        /\.avatar\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should not shrink in flex containers', () => {
      expect(css).toMatch(/\.avatar\s*\{[^}]*flex-shrink:\s*0/s);
    });
  });

  describe('Avatar Image', () => {
    it('should define .avatar img styles', () => {
      expect(css).toContain('.avatar img');
    });

    it('should make image fill container', () => {
      expect(css).toMatch(/\.avatar img\s*\{[^}]*width:\s*100%/s);
      expect(css).toMatch(/\.avatar img\s*\{[^}]*height:\s*100%/s);
    });

    it('should use object-fit cover', () => {
      expect(css).toMatch(/\.avatar img\s*\{[^}]*object-fit:\s*cover/s);
    });
  });

  describe('Avatar Placeholder', () => {
    it('should define .avatar-placeholder class', () => {
      expect(css).toContain('.avatar-placeholder');
    });

    it('should center placeholder content', () => {
      expect(css).toMatch(
        /\.avatar-placeholder\s*\{[^}]*align-items:\s*center/s,
      );
      expect(css).toMatch(
        /\.avatar-placeholder\s*\{[^}]*justify-content:\s*center/s,
      );
    });

    it('should uppercase placeholder text', () => {
      expect(css).toMatch(
        /\.avatar-placeholder\s*\{[^}]*text-transform:\s*uppercase/s,
      );
    });
  });

  describe('Size Variants', () => {
    const sizes = [
      { name: 'xs', dim: '1.5rem' },
      { name: 'sm', dim: '2rem' },
      { name: 'md', dim: '3rem' },
      { name: 'lg', dim: '4rem' },
      { name: 'xl', dim: '6rem' },
    ];

    for (const { name, dim } of sizes) {
      it(`should define .avatar-${name} class`, () => {
        expect(css).toContain(`.avatar-${name}`);
      });

      it(`should set avatar-${name} width to ${dim}`, () => {
        const regex = new RegExp(
          `\\.avatar-${name}\\s*\\{[^}]*width:\\s*${dim.replace('.', '\\.')}`,
          's',
        );
        expect(css).toMatch(regex);
      });

      it(`should set avatar-${name} height to ${dim}`, () => {
        const regex = new RegExp(
          `\\.avatar-${name}\\s*\\{[^}]*height:\\s*${dim.replace('.', '\\.')}`,
          's',
        );
        expect(css).toMatch(regex);
      });
    }
  });

  describe('Shape Variants', () => {
    it('should define .avatar-rounded class', () => {
      expect(css).toContain('.avatar-rounded');
    });

    it('should set rounded border-radius to radius token', () => {
      expect(css).toMatch(
        /\.avatar-rounded\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s,
      );
    });

    it('should define .avatar-square class', () => {
      expect(css).toContain('.avatar-square');
    });

    it('should set square border-radius to 0', () => {
      expect(css).toMatch(
        /\.avatar-square\s*\{[^}]*border-radius:\s*0/s,
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
      it(`should define .avatar-${color} class`, () => {
        expect(css).toContain(`.avatar-${color}`);
      });

      it(`should use --color-${color} for avatar-${color} background`, () => {
        const regex = new RegExp(
          `\\.avatar-${color}\\s*\\{[^}]*background-color:\\s*var\\(--color-${color}\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });

      it(`should use --color-${color}-content for avatar-${color} text`, () => {
        const regex = new RegExp(
          `\\.avatar-${color}\\s*\\{[^}]*color:\\s*var\\(--color-${color}-content\\)`,
          's',
        );
        expect(css).toMatch(regex);
      });
    }
  });

  describe('Ring Variants', () => {
    it('should define .avatar-ring class', () => {
      expect(css).toContain('.avatar-ring');
    });

    it('should use outline for ring', () => {
      expect(css).toMatch(
        /\.avatar-ring\s*\{[^}]*outline:\s*2px solid var\(--color-primary\)/s,
      );
    });

    it('should have offset for ring', () => {
      expect(css).toMatch(
        /\.avatar-ring\s*\{[^}]*outline-offset:\s*2px/s,
      );
    });

    it('should define .avatar-ring-primary class', () => {
      expect(css).toContain('.avatar-ring-primary');
    });

    it('should define .avatar-ring-secondary class', () => {
      expect(css).toContain('.avatar-ring-secondary');
    });

    it('should define .avatar-ring-tertiary class', () => {
      expect(css).toContain('.avatar-ring-tertiary');
    });
  });

  describe('Status Indicators', () => {
    it('should define .avatar-online class', () => {
      expect(css).toContain('.avatar-online');
    });

    it('should define .avatar-offline class', () => {
      expect(css).toContain('.avatar-offline');
    });

    it('should use ::after pseudo-element for indicators', () => {
      expect(css).toContain('.avatar-online::after');
      expect(css).toContain('.avatar-offline::after');
    });

    it('should use success color for online indicator', () => {
      expect(css).toMatch(
        /\.avatar-online::after\s*\{[^}]*background-color:\s*var\(--color-success\)/s,
      );
    });

    it('should use outline color for offline indicator', () => {
      expect(css).toMatch(
        /\.avatar-offline::after\s*\{[^}]*background-color:\s*var\(--color-outline\)/s,
      );
    });

    it('should make indicators circular', () => {
      expect(css).toMatch(/border-radius:\s*var\(--radius-full\)/);
    });
  });

  describe('Avatar Group', () => {
    it('should define .avatar-group class', () => {
      expect(css).toContain('.avatar-group');
    });

    it('should use reverse row direction for overlap', () => {
      expect(css).toMatch(
        /\.avatar-group\s*\{[^}]*flex-direction:\s*row-reverse/s,
      );
    });

    it('should apply negative margin for overlap', () => {
      expect(css).toMatch(
        /\.avatar-group\s+\.avatar\s*\{[^}]*margin-left:\s*-0\.75rem/s,
      );
    });

    it('should remove margin from last child', () => {
      expect(css).toContain('.avatar-group .avatar:last-child');
    });

    it('should define group size variants', () => {
      expect(css).toContain('.avatar-group-sm');
      expect(css).toContain('.avatar-group-lg');
    });
  });

  describe('Focus State', () => {
    it('should define focus-visible styles', () => {
      expect(css).toContain('.avatar:focus-visible');
    });

    it('should use color-mix for focus ring', () => {
      expect(css).toMatch(
        /\.avatar:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 3px color-mix/s,
      );
    });
  });
});
