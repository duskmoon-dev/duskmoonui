/**
 * Theme Configuration Types
 * Re-exports generated types + defines helper types for plugin API
 */

// Re-export codegen-generated types as the source of truth
export type { ThemeColors, ThemeShape, ThemeMeta, OklchColor } from '../themes/generated/ts/types';

/**
 * @deprecated Use OklchColor instead — kept for backwards compatibility
 */
export type HSLColor = string;

/**
 * Color scheme preference
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Theme definition structure
 * Defines all color tokens for a theme
 */
export interface ThemeDefinition {
  name: string;
  colorScheme: ColorScheme;
  default?: boolean;
  prefersDark?: boolean;
  colors: import('../themes/generated/ts/types').ThemeColors;
}

/**
 * Partial theme colors for custom theme definitions
 * Allows overriding only specific tokens
 */
export type PartialThemeColors = Partial<import('../themes/generated/ts/types').ThemeColors>;

/**
 * Theme configuration for plugin
 */
export type ThemeConfig = string | {
  [themeName: string]: PartialThemeColors;
};

/**
 * Validation result for theme colors
 */
export interface ThemeValidationResult {
  valid: boolean;
  errors: ThemeValidationError[];
  warnings: ThemeValidationWarning[];
}

export interface ThemeValidationError {
  token: string;
  message: string;
  value?: string;
}

export interface ThemeValidationWarning {
  token: string;
  message: string;
  value?: string;
  suggestion?: string;
}
