import { describe, expect, test } from 'bun:test';
import { sunshine, moonlight } from '../src/themes';

describe('Theme Tests', () => {
  describe('Sunshine Theme', () => {
    test('should have all required color tokens', () => {
      // Primary colors
      expect(sunshine.primary).toBeDefined();
      expect(sunshine['primary-focus']).toBeDefined();
      expect(sunshine['primary-content']).toBeDefined();
      expect(sunshine['primary-container']).toBeDefined();
      expect(sunshine['on-primary-container']).toBeDefined();

      // Secondary colors
      expect(sunshine.secondary).toBeDefined();
      expect(sunshine['secondary-focus']).toBeDefined();
      expect(sunshine['secondary-content']).toBeDefined();

      // Tertiary colors
      expect(sunshine.tertiary).toBeDefined();
      expect(sunshine['tertiary-focus']).toBeDefined();
      expect(sunshine['tertiary-content']).toBeDefined();

      // Surface colors
      expect(sunshine.surface).toBeDefined();
      expect(sunshine['on-surface']).toBeDefined();
      expect(sunshine['surface-variant']).toBeDefined();

      // Semantic colors
      expect(sunshine.info).toBeDefined();
      expect(sunshine.success).toBeDefined();
      expect(sunshine.warning).toBeDefined();
      expect(sunshine.error).toBeDefined();
    });

    test('should use HSL format (h s% l%)', () => {
      // HSL format: "hue saturation% lightness%"
      const hslRegex = /^\d+\s+\d+%\s+\d+%$/;

      expect(sunshine.primary).toMatch(hslRegex);
      expect(sunshine.secondary).toMatch(hslRegex);
      expect(sunshine.tertiary).toMatch(hslRegex);
      expect(sunshine.surface).toMatch(hslRegex);
    });

    test('should have warm color tones for light theme', () => {
      // Sunshine theme should have warm amber primary
      // HSL: 38 92% 50% = Amber 500
      expect(sunshine.primary).toBe('38 92% 50%');
    });
  });

  describe('Moonlight Theme', () => {
    test('should have all required color tokens', () => {
      // Primary colors
      expect(moonlight.primary).toBeDefined();
      expect(moonlight['primary-focus']).toBeDefined();
      expect(moonlight['primary-content']).toBeDefined();

      // Secondary colors
      expect(moonlight.secondary).toBeDefined();
      expect(moonlight['secondary-focus']).toBeDefined();

      // Tertiary colors
      expect(moonlight.tertiary).toBeDefined();
      expect(moonlight['tertiary-focus']).toBeDefined();

      // Surface colors
      expect(moonlight.surface).toBeDefined();
      expect(moonlight['on-surface']).toBeDefined();
    });

    test('should use HSL format', () => {
      const hslRegex = /^\d+\s+\d+%\s+\d+%$/;

      expect(moonlight.primary).toMatch(hslRegex);
      expect(moonlight.secondary).toMatch(hslRegex);
      expect(moonlight.tertiary).toMatch(hslRegex);
    });

    test('should have cool color tones for dark theme', () => {
      // Moonlight theme should have blue primary
      // HSL: 217 91% 60% = Blue 500
      expect(moonlight.primary).toBe('217 91% 60%');
    });

    test('should have darker surface colors than sunshine', () => {
      // Parse HSL lightness values
      const getSurfaceLightness = (theme: typeof moonlight) => {
        const match = theme.surface.match(/\d+%$/);
        return match ? parseInt(match[0]) : 0;
      };

      const sunshineLight = getSurfaceLightness(sunshine as any);
      const moonlightLight = getSurfaceLightness(moonlight);

      expect(moonlightLight).toBeLessThan(sunshineLight);
    });
  });

  describe('Theme Consistency', () => {
    test('both themes should have the same color token keys', () => {
      const sunshineKeys = Object.keys(sunshine).sort();
      const moonlightKeys = Object.keys(moonlight).sort();

      expect(sunshineKeys).toEqual(moonlightKeys);
    });

    test('should have at least 65 color tokens', () => {
      const tokenCount = Object.keys(sunshine).length;
      expect(tokenCount).toBeGreaterThanOrEqual(65);
    });
  });
});
