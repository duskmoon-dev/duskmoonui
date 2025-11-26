/**
 * Theme Configuration Types
 * TypeScript definitions for DuskMoonUI theme definitions
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
 * 65+ tokens following Material Design 3 conventions
 */
export interface ThemeColors {
  // ============================================
  // BRAND COLORS (15 tokens)
  // ============================================

  /**
   * Primary brand color
   * @example "30 90% 60%" (warm orange for sunshine theme)
   */
  primary: HSLColor;

  /**
   * Primary focus state (hover/active)
   */
  'primary-focus': HSLColor;

  /**
   * Content color on primary background
   * Must meet WCAG AA contrast (4.5:1)
   */
  'primary-content': HSLColor;

  /**
   * Tinted primary container background
   */
  'primary-container': HSLColor;

  /**
   * Content color on primary container
   */
  'on-primary-container': HSLColor;

  /**
   * Secondary brand color
   */
  secondary: HSLColor;
  'secondary-focus': HSLColor;
  'secondary-content': HSLColor;
  'secondary-container': HSLColor;
  'on-secondary-container': HSLColor;

  /**
   * Tertiary brand color
   */
  tertiary: HSLColor;
  'tertiary-focus': HSLColor;
  'tertiary-content': HSLColor;
  'tertiary-container': HSLColor;
  'on-tertiary-container': HSLColor;

  // ============================================
  // SURFACE COLORS (10 tokens)
  // ============================================

  /**
   * Base surface color
   */
  surface: HSLColor;

  /**
   * Dimmed surface for lower emphasis
   */
  'surface-dim': HSLColor;

  /**
   * Brightened surface for higher emphasis
   */
  'surface-bright': HSLColor;

  /**
   * Surface container variants (elevation levels)
   */
  'surface-container-lowest': HSLColor;
  'surface-container-low': HSLColor;
  'surface-container': HSLColor;
  'surface-container-high': HSLColor;
  'surface-container-highest': HSLColor;

  /**
   * Content on surface colors
   */
  'on-surface': HSLColor;
  'on-surface-variant': HSLColor;

  // ============================================
  // SEMANTIC COLORS (12 tokens)
  // ============================================

  /**
   * Info semantic color (blue tones)
   */
  info: HSLColor;
  'info-content': HSLColor;
  'info-container': HSLColor;
  'on-info-container': HSLColor;

  /**
   * Success semantic color (green tones)
   */
  success: HSLColor;
  'success-content': HSLColor;
  'success-container': HSLColor;
  'on-success-container': HSLColor;

  /**
   * Warning semantic color (yellow/orange tones)
   */
  warning: HSLColor;
  'warning-content': HSLColor;
  'warning-container': HSLColor;
  'on-warning-container': HSLColor;

  /**
   * Error semantic color (red tones)
   */
  error: HSLColor;
  'error-content': HSLColor;
  'error-container': HSLColor;
  'on-error-container': HSLColor;

  // ============================================
  // NEUTRAL COLORS (10 tokens)
  // ============================================

  /**
   * Base neutral colors (grayscale)
   * base-100 is lightest, base-900 is darkest
   */
  'base-100': HSLColor;
  'base-200': HSLColor;
  'base-300': HSLColor;
  'base-400': HSLColor;
  'base-500': HSLColor;
  'base-600': HSLColor;
  'base-700': HSLColor;
  'base-800': HSLColor;
  'base-900': HSLColor;

  /**
   * Default text color on base backgrounds
   */
  'base-content': HSLColor;

  // ============================================
  // OUTLINE COLORS (2 tokens)
  // ============================================

  /**
   * Primary outline color
   */
  outline: HSLColor;

  /**
   * Subtle outline variant
   */
  'outline-variant': HSLColor;
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
