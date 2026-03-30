/**
 * Theme Configuration Types
 * TypeScript definitions for DuskMoonUI theme definitions
 * Synced with @duskmoon-dev/design codegen schema
 */

/**
 * HSL color value in space-separated format
 * @example "240 80% 60%" (hue saturation lightness)
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
  /**
   * Unique theme identifier
   * @example "sunshine", "moonlight", "custom"
   */
  name: string;

  /**
   * Light or dark color scheme
   * Used for browser color-scheme CSS property
   */
  colorScheme: ColorScheme;

  /**
   * Whether this is the default theme
   * Only one theme can be default
   */
  default?: boolean;

  /**
   * Whether to use when user prefers dark mode
   * Only one theme can have prefersDark
   */
  prefersDark?: boolean;

  /**
   * Theme colors
   */
  colors: ThemeColors;
}

/**
 * Complete theme color token set
 * Matches codegen output from @duskmoon-dev/design exactly
 */
export interface ThemeColors {
  // ============================================
  // BRAND COLORS (15 tokens)
  // ============================================

  primary: HSLColor;
  'primary-focus': HSLColor;
  'primary-content': HSLColor;
  'primary-container': HSLColor;
  'on-primary-container': HSLColor;

  secondary: HSLColor;
  'secondary-focus': HSLColor;
  'secondary-content': HSLColor;
  'secondary-container': HSLColor;
  'on-secondary-container': HSLColor;

  tertiary: HSLColor;
  'tertiary-focus': HSLColor;
  'tertiary-content': HSLColor;
  'tertiary-container': HSLColor;
  'on-tertiary-container': HSLColor;

  // ============================================
  // ACCENT COLORS (3 tokens)
  // ============================================

  accent: HSLColor;
  'accent-focus': HSLColor;
  'accent-content': HSLColor;

  // ============================================
  // NEUTRAL COLORS (4 tokens)
  // ============================================

  neutral: HSLColor;
  'neutral-focus': HSLColor;
  'neutral-content': HSLColor;
  'neutral-variant': HSLColor;

  // ============================================
  // SURFACE COLORS (11 tokens)
  // ============================================

  surface: HSLColor;
  'surface-dim': HSLColor;
  'surface-bright': HSLColor;
  'surface-container-lowest': HSLColor;
  'surface-container-low': HSLColor;
  'surface-container': HSLColor;
  'surface-container-high': HSLColor;
  'surface-container-highest': HSLColor;
  'surface-variant': HSLColor;
  'on-surface': HSLColor;
  'on-surface-variant': HSLColor;

  // ============================================
  // SEMANTIC COLORS (16 tokens)
  // ============================================

  info: HSLColor;
  'info-content': HSLColor;
  'info-container': HSLColor;
  'on-info-container': HSLColor;

  success: HSLColor;
  'success-content': HSLColor;
  'success-container': HSLColor;
  'on-success-container': HSLColor;

  warning: HSLColor;
  'warning-content': HSLColor;
  'warning-container': HSLColor;
  'on-warning-container': HSLColor;

  error: HSLColor;
  'error-content': HSLColor;
  'error-container': HSLColor;
  'on-error-container': HSLColor;

  // ============================================
  // BASE SCALE (10 tokens)
  // ============================================

  'base-100': HSLColor;
  'base-200': HSLColor;
  'base-300': HSLColor;
  'base-400': HSLColor;
  'base-500': HSLColor;
  'base-600': HSLColor;
  'base-700': HSLColor;
  'base-800': HSLColor;
  'base-900': HSLColor;
  'base-content': HSLColor;

  // ============================================
  // OUTLINE COLORS (2 tokens)
  // ============================================

  outline: HSLColor;
  'outline-variant': HSLColor;

  // ============================================
  // INVERSE COLORS (3 tokens)
  // ============================================

  'inverse-surface': HSLColor;
  'inverse-on-surface': HSLColor;
  'inverse-primary': HSLColor;

  // ============================================
  // SHADOW & SCRIM (2 tokens)
  // ============================================

  shadow: HSLColor;
  scrim: HSLColor;
}

/**
 * Partial theme colors for custom theme definitions
 * Allows overriding only specific tokens
 */
export type PartialThemeColors = Partial<ThemeColors>;

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

/**
 * Theme validation error
 */
export interface ThemeValidationError {
  token: string;
  message: string;
  value?: string;
}

/**
 * Theme validation warning (non-blocking)
 */
export interface ThemeValidationWarning {
  token: string;
  message: string;
  value?: string;
  suggestion?: string;
}
