/**
 * CSS Generation Utilities
 * Functions to generate CSS variables and styles from theme definitions
 */

import type { ThemeColors } from '../types';

/**
 * Generate CSS variables from theme colors
 * Converts theme object to CSS custom properties
 */
export function generateCssVariables(theme: ThemeColors): Record<string, string> {
  const cssVars: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme)) {
    cssVars[`--color-${key}`] = value;
  }

  return cssVars;
}

/**
 * Convert CSS variables object to string
 */
export function cssVarsToString(cssVars: Record<string, string>): string {
  return Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Generate theme CSS block
 */
export function generateThemeBlock(themeName: string, theme: ThemeColors): string {
  const cssVars = generateCssVariables(theme);
  const varsString = cssVarsToString(cssVars);

  return `[data-theme="${themeName}"] {\n${varsString}\n}`;
}
