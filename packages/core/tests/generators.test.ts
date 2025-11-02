import { describe, expect, test } from 'bun:test';
import { generateCssVariables } from '../src/generators';
import { sunshine, moonlight } from '../src/themes';

describe('CSS Variable Generator Tests', () => {
  describe('generateCssVariables', () => {
    test('should generate CSS variables with --color- prefix', () => {
      const cssVars = generateCssVariables(sunshine);

      expect(cssVars['--color-primary']).toBeDefined();
      expect(cssVars['--color-secondary']).toBeDefined();
      expect(cssVars['--color-tertiary']).toBeDefined();
      expect(cssVars['--color-surface']).toBeDefined();
    });

    test('should preserve HSL values', () => {
      const cssVars = generateCssVariables(sunshine);

      expect(cssVars['--color-primary']).toBe(sunshine.primary);
      expect(cssVars['--color-secondary']).toBe(sunshine.secondary);
      expect(cssVars['--color-tertiary']).toBe(sunshine.tertiary);
    });

    test('should handle all theme colors', () => {
      const cssVars = generateCssVariables(moonlight);

      // Count generated variables
      const varCount = Object.keys(cssVars).length;
      const themeColorCount = Object.keys(moonlight).length;

      expect(varCount).toBe(themeColorCount);
    });

    test('should handle hyphenated color names correctly', () => {
      const cssVars = generateCssVariables(sunshine);

      expect(cssVars['--color-primary-focus']).toBe(sunshine['primary-focus']);
      expect(cssVars['--color-on-surface']).toBe(sunshine['on-surface']);
      expect(cssVars['--color-surface-variant']).toBe(sunshine['surface-variant']);
    });

    test('should generate variables for all color categories', () => {
      const cssVars = generateCssVariables(sunshine);

      // Primary
      expect(cssVars['--color-primary']).toBeDefined();
      expect(cssVars['--color-primary-content']).toBeDefined();
      expect(cssVars['--color-primary-container']).toBeDefined();

      // Secondary
      expect(cssVars['--color-secondary']).toBeDefined();
      expect(cssVars['--color-secondary-content']).toBeDefined();

      // Tertiary
      expect(cssVars['--color-tertiary']).toBeDefined();
      expect(cssVars['--color-tertiary-content']).toBeDefined();

      // Surface
      expect(cssVars['--color-surface']).toBeDefined();
      expect(cssVars['--color-on-surface']).toBeDefined();

      // Semantic
      expect(cssVars['--color-info']).toBeDefined();
      expect(cssVars['--color-success']).toBeDefined();
      expect(cssVars['--color-warning']).toBeDefined();
      expect(cssVars['--color-error']).toBeDefined();
    });

    test('should not modify original theme object', () => {
      const originalPrimary = sunshine.primary;
      generateCssVariables(sunshine);

      expect(sunshine.primary).toBe(originalPrimary);
    });

    test('should handle empty theme object', () => {
      const cssVars = generateCssVariables({} as any);

      expect(Object.keys(cssVars).length).toBe(0);
    });
  });
});
