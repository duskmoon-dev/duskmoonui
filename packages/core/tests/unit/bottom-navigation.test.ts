/**
 * Unit tests for bottom-navigation component
 * Tests base layout, active states, badges, variants, and accessibility
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Bottom Navigation Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/bottom-navigation.css'), 'utf-8');
  });

  describe('Base Layout', () => {
    it('should define .bottom-nav class', () => {
      expect(css).toContain('.bottom-nav');
    });

    it('should be fixed to bottom', () => {
      expect(css).toMatch(/\.bottom-nav\s*\{[^}]*position:\s*fixed/s);
      expect(css).toMatch(/\.bottom-nav\s*\{[^}]*bottom:\s*0/s);
    });

    it('should use flexbox with space-around', () => {
      expect(css).toMatch(/\.bottom-nav\s*\{[^}]*justify-content:\s*space-around/s);
    });

    it('should respect safe area insets', () => {
      expect(css).toContain('env(safe-area-inset-bottom');
    });

    it('should have z-index for stacking', () => {
      expect(css).toMatch(/\.bottom-nav\s*\{[^}]*z-index:\s*1000/s);
    });
  });

  describe('Navigation Items', () => {
    it('should define bottom-nav-item', () => {
      expect(css).toContain('.bottom-nav-item');
    });

    it('should use column layout for icon + label', () => {
      expect(css).toMatch(/\.bottom-nav-item\s*\{[^}]*flex-direction:\s*column/s);
    });

    it('should have hover state', () => {
      expect(css).toContain('.bottom-nav-item:hover');
    });

    it('should have focus-visible state', () => {
      expect(css).toContain('.bottom-nav-item:focus-visible');
    });
  });

  describe('Active State', () => {
    it('should define active item styling', () => {
      expect(css).toContain('.bottom-nav-item.active');
    });

    it('should highlight active indicator with secondary-container', () => {
      expect(css).toMatch(/\.bottom-nav-item\.active .bottom-nav-indicator[^}]*var\(--color-secondary-container\)/s);
    });

    it('should bold active label', () => {
      expect(css).toMatch(/\.bottom-nav-item\.active .bottom-nav-label[^}]*font-weight:\s*600/s);
    });
  });

  describe('Indicator', () => {
    it('should define bottom-nav-indicator', () => {
      expect(css).toContain('.bottom-nav-indicator');
    });

    it('should use radius token', () => {
      expect(css).toMatch(/\.bottom-nav-indicator[^}]*var\(--radius-lg\)/s);
    });
  });

  describe('Badge', () => {
    it('should define bottom-nav-badge', () => {
      expect(css).toContain('.bottom-nav-badge');
    });

    it('should use error color for badge', () => {
      expect(css).toMatch(/\.bottom-nav-badge[^}]*var\(--color-error\)/s);
    });

    it('should define dot badge variant', () => {
      expect(css).toContain('.bottom-nav-badge-dot');
    });
  });

  describe('Variants', () => {
    it('should define elevated variant', () => {
      expect(css).toContain('.bottom-nav-elevated');
    });

    it('should define bordered variant', () => {
      expect(css).toContain('.bottom-nav-bordered');
    });

    it('should define filled variant', () => {
      expect(css).toContain('.bottom-nav-filled');
    });

    it('should define icons-only mode', () => {
      expect(css).toContain('.bottom-nav-icons-only');
    });

    it('should define labels-active mode', () => {
      expect(css).toContain('.bottom-nav-labels-active');
    });

    it('should define shifting animation variant', () => {
      expect(css).toContain('.bottom-nav-shifting');
    });
  });

  describe('Primary Color Variant', () => {
    it('should define primary color variant', () => {
      expect(css).toContain('.bottom-nav-primary');
    });

    it('should use primary-container for active indicator', () => {
      expect(css).toMatch(/\.bottom-nav-primary .bottom-nav-item\.active .bottom-nav-indicator[^}]*var\(--color-primary-container\)/s);
    });
  });

  describe('Nav Rail', () => {
    it('should define nav-rail for side navigation', () => {
      expect(css).toContain('.nav-rail');
    });

    it('should be fixed to left side', () => {
      expect(css).toMatch(/\.nav-rail[^}]*position:\s*fixed/s);
      expect(css).toMatch(/\.nav-rail[^}]*left:\s*0/s);
    });

    it('should use column layout', () => {
      expect(css).toMatch(/\.nav-rail[^}]*flex-direction:\s*column/s);
    });
  });

  describe('Responsive', () => {
    it('should have responsive variant for larger screens', () => {
      expect(css).toContain('.bottom-nav-responsive');
    });

    it('should use media query for tablet breakpoint', () => {
      expect(css).toMatch(/@media.*min-width:\s*768px/s);
    });
  });

  describe('Accessibility', () => {
    it('should support prefers-reduced-motion', () => {
      expect(css).toContain('prefers-reduced-motion');
    });

    it('should disable transitions for reduced motion', () => {
      expect(css).toMatch(/prefers-reduced-motion[\s\S]*transition:\s*none/);
    });
  });

  describe('Color Tokens', () => {
    it('should use surface background', () => {
      expect(css).toContain('var(--color-surface)');
    });

    it('should use shadow color token', () => {
      expect(css).toContain('var(--color-shadow)');
    });
  });
});
