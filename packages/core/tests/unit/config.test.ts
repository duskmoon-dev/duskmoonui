/**
 * Unit tests for configuration validation
 * Tests plugin config validation and error messages
 */

import { describe, it, expect } from 'bun:test';

describe('Configuration Validation', () => {
  describe('Theme Configuration', () => {
    it('should accept valid theme names', () => {
      const validThemes = ['sunshine', 'moonlight', 'custom-theme'];

      for (const theme of validThemes) {
        expect(isValidThemeName(theme)).toBe(true);
      }
    });

    it('should reject invalid theme names', () => {
      const invalidThemes = ['Theme Name', 'theme_name', 'theme.name', ''];

      for (const theme of invalidThemes) {
        expect(isValidThemeName(theme)).toBe(false);
      }
    });
  });

  describe('Color Format Validation', () => {
    it('should accept valid HSL space-separated format', () => {
      const validColors = [
        '240 80% 60%',
        '0 0% 100%',
        '360 100% 50%',
        '180 50% 25%',
      ];

      for (const color of validColors) {
        expect(isValidHSLColor(color)).toBe(true);
      }
    });

    it('should reject invalid color formats', () => {
      const invalidColors = [
        'hsl(240, 80%, 60%)',
        '#ff0000',
        'rgb(255, 0, 0)',
        '240, 80%, 60%',
        'invalid',
      ];

      for (const color of invalidColors) {
        expect(isValidHSLColor(color)).toBe(false);
      }
    });

    it('should reject out-of-range HSL values', () => {
      const outOfRangeColors = [
        '400 80% 60%',     // Hue > 360
        '-10 80% 60%',    // Negative hue
        '240 150% 60%',   // Saturation > 100
        '240 80% 110%',   // Lightness > 100
      ];

      for (const color of outOfRangeColors) {
        expect(isValidHSLColor(color)).toBe(false);
      }
    });
  });

  describe('Contrast Ratio Validation', () => {
    it('should calculate correct contrast ratio', () => {
      // White on black should have high contrast (21:1)
      const ratio = calculateContrastRatio('0 0% 100%', '0 0% 0%');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should pass WCAG AA for valid color pairs', () => {
      // High contrast pair
      const ratio = calculateContrastRatio('0 0% 100%', '0 0% 20%');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should fail WCAG AA for low contrast pairs', () => {
      // Low contrast pair (both light)
      const ratio = calculateContrastRatio('0 0% 90%', '0 0% 95%');
      expect(ratio).toBeLessThan(4.5);
    });
  });

  describe('Plugin Options Validation', () => {
    it('should accept valid component names', () => {
      const validComponents = ['button', 'card', 'input', 'form', 'navigation', 'modal'];

      for (const component of validComponents) {
        expect(isValidComponentName(component)).toBe(true);
      }
    });

    it('should reject invalid component names', () => {
      const invalidComponents = ['unknown', 'custom', 'BUTTON'];

      for (const component of invalidComponents) {
        expect(isValidComponentName(component)).toBe(false);
      }
    });
  });
});

// Helper functions for validation
function isValidThemeName(name: string): boolean {
  return /^[a-z0-9-]+$/.test(name) && name.length > 0;
}

function isValidHSLColor(color: string): boolean {
  const match = color.match(/^(\d+)\s+(\d+)%\s+(\d+)%$/);
  if (!match) return false;

  const [, h, s, l] = match.map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

function hslToRgb(hsl: string): [number, number, number] {
  const match = hsl.match(/^(\d+)\s+(\d+)%\s+(\d+)%$/);
  if (!match) return [0, 0, 0];

  const h = parseInt(match[1], 10) / 360;
  const s = parseInt(match[2], 10) / 100;
  const l = parseInt(match[3], 10) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((v) => {
    v = v / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(hslToRgb(color1));
  const lum2 = getLuminance(hslToRgb(color2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function isValidComponentName(name: string): boolean {
  const validComponents = ['button', 'card', 'input', 'form', 'navigation', 'modal'];
  return validComponents.includes(name);
}
