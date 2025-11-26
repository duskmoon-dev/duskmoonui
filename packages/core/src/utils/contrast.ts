/**
 * WCAG Contrast Validation Utilities
 * Ensures color combinations meet WCAG AA contrast requirements (4.5:1 minimum)
 */

/**
 * Parse HSL space-separated string to array
 * @example parseHSL("240 80% 60%") => [240, 80, 60]
 */
export function parseHSL(hsl: string): [number, number, number] {
  const match = hsl.match(/^(\d+)\s+(\d+)%\s+(\d+)%$/);
  if (!match) {
    throw new Error(`Invalid HSL format: ${hsl}. Expected "H S% L%" format.`);
  }
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

/**
 * Calculate relative luminance for WCAG contrast calculation
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1:1 to 21:1
 */
export function getContrastRatio(color1: string, color2: string): number {
  const [h1, s1, l1] = parseHSL(color1);
  const [h2, s2, l2] = parseHSL(color2);

  const rgb1 = hslToRgb(h1, s1, l1);
  const rgb2 = hslToRgb(h2, s2, l2);

  const lum1 = getRelativeLuminance(...rgb1);
  const lum2 = getRelativeLuminance(...rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA for normal text (4.5:1)
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AA for large text (3:1)
 */
export function meetsWCAGAALarge(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 3.0;
}

/**
 * Check if contrast ratio meets WCAG AAA for normal text (7:1)
 */
export function meetsWCAGAAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 7.0;
}

/**
 * Validate a theme's color combinations for WCAG compliance
 */
export interface ContrastValidationResult {
  pair: string;
  foreground: string;
  background: string;
  ratio: number;
  passes: boolean;
  level: 'AA' | 'AA-large' | 'AAA' | 'fail';
}

export function validateThemeContrast(
  colors: Record<string, string>
): ContrastValidationResult[] {
  const results: ContrastValidationResult[] = [];

  // Define color pairs that should be validated
  const colorPairs: [string, string, string][] = [
    // [name, foreground key, background key]
    ['primary/primary-content', 'primary-content', 'primary'],
    ['secondary/secondary-content', 'secondary-content', 'secondary'],
    ['tertiary/tertiary-content', 'tertiary-content', 'tertiary'],
    ['on-primary-container/primary-container', 'on-primary-container', 'primary-container'],
    ['on-secondary-container/secondary-container', 'on-secondary-container', 'secondary-container'],
    ['on-tertiary-container/tertiary-container', 'on-tertiary-container', 'tertiary-container'],
    ['info/info-content', 'info-content', 'info'],
    ['success/success-content', 'success-content', 'success'],
    ['warning/warning-content', 'warning-content', 'warning'],
    ['error/error-content', 'error-content', 'error'],
    ['on-info-container/info-container', 'on-info-container', 'info-container'],
    ['on-success-container/success-container', 'on-success-container', 'success-container'],
    ['on-warning-container/warning-container', 'on-warning-container', 'warning-container'],
    ['on-error-container/error-container', 'on-error-container', 'error-container'],
    ['base-content/base-100', 'base-content', 'base-100'],
    ['on-surface/surface', 'on-surface', 'surface'],
    ['on-surface-variant/surface', 'on-surface-variant', 'surface'],
  ];

  for (const [pair, fgKey, bgKey] of colorPairs) {
    const fg = colors[fgKey];
    const bg = colors[bgKey];

    if (!fg || !bg) {
      continue;
    }

    const ratio = getContrastRatio(fg, bg);
    let level: ContrastValidationResult['level'];

    if (ratio >= 7.0) {
      level = 'AAA';
    } else if (ratio >= 4.5) {
      level = 'AA';
    } else if (ratio >= 3.0) {
      level = 'AA-large';
    } else {
      level = 'fail';
    }

    results.push({
      pair,
      foreground: fg,
      background: bg,
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= 4.5,
      level,
    });
  }

  return results;
}

/**
 * Assert all required color pairs meet WCAG AA
 * Throws error with details if any pair fails
 */
export function assertWCAGCompliance(colors: Record<string, string>): void {
  const results = validateThemeContrast(colors);
  const failures = results.filter((r) => !r.passes);

  if (failures.length > 0) {
    const details = failures
      .map(
        (f) =>
          `  - ${f.pair}: ${f.ratio}:1 (needs 4.5:1)\n    fg: ${f.foreground}, bg: ${f.background}`
      )
      .join('\n');

    throw new Error(
      `WCAG AA contrast validation failed for ${failures.length} color pair(s):\n${details}`
    );
  }
}
