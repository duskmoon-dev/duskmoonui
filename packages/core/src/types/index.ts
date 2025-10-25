/**
 * DuskMoonUI Type Definitions
 * Core types for theme configuration and plugin options
 */

/**
 * Material Design 3 Color System with Tertiary support
 * Includes all color tokens needed for comprehensive theming
 */
export interface ThemeColors {
  // Primary Colors
  primary: string;
  'primary-focus': string;
  'primary-content': string;
  'primary-container': string;
  'on-primary-container': string;

  // Secondary Colors
  secondary: string;
  'secondary-focus': string;
  'secondary-content': string;
  'secondary-container': string;
  'on-secondary-container': string;

  // Tertiary Colors (NEW!)
  tertiary: string;
  'tertiary-focus': string;
  'tertiary-content': string;
  'tertiary-container': string;
  'on-tertiary-container': string;

  // Accent Colors
  accent: string;
  'accent-focus': string;
  'accent-content': string;

  // Neutral Colors
  neutral: string;
  'neutral-focus': string;
  'neutral-content': string;
  'neutral-variant': string;

  // Surface Colors (Material Design 3)
  surface: string;
  'surface-dim': string;
  'surface-bright': string;
  'surface-container-lowest': string;
  'surface-container-low': string;
  'surface-container': string;
  'surface-container-high': string;
  'surface-container-highest': string;
  'surface-variant': string;
  'on-surface': string;
  'on-surface-variant': string;

  // Base Colors (Legacy support)
  'base-100': string;
  'base-200': string;
  'base-300': string;
  'base-content': string;

  // Outline Colors
  outline: string;
  'outline-variant': string;

  // Inverse Colors
  'inverse-surface': string;
  'inverse-on-surface': string;
  'inverse-primary': string;

  // Shadow & Scrim
  shadow: string;
  scrim: string;

  // Semantic Colors
  info: string;
  'info-content': string;
  success: string;
  'success-content': string;
  warning: string;
  'warning-content': string;
  error: string;
  'error-content': string;
  'error-container': string;
  'on-error-container': string;
}

/**
 * Built-in theme names
 */
export type ThemeName = 'sunshine' | 'moonlight';

/**
 * Custom theme definition
 */
export type CustomTheme = Partial<ThemeColors>;

/**
 * Theme configuration - can be a theme name or custom theme object
 */
export type ThemeConfig = ThemeName | Record<string, CustomTheme>;

/**
 * DuskMoonUI Plugin Options
 */
export interface DuskMoonUIOptions {
  /**
   * Themes to include in the build
   * Can be theme names or custom theme objects
   * @default ['sunshine', 'moonlight']
   */
  themes?: ThemeConfig[];

  /**
   * Default dark theme name
   * @default 'moonlight'
   */
  darkTheme?: ThemeName | string;

  /**
   * Component prefix (optional)
   * @default ''
   */
  prefix?: string;

  /**
   * Components to include
   * @default 'all'
   */
  components?: string[] | 'all';

  /**
   * Enable utility classes
   * @default true
   */
  utilities?: boolean;

  /**
   * RTL support
   * @default false
   */
  rtl?: boolean;

  /**
   * Generate full component styles
   * @default true
   */
  styled?: boolean;

  /**
   * Include base styles
   * @default true
   */
  base?: boolean;
}

/**
 * Component style definition
 */
export interface ComponentStyles {
  [selector: string]: Record<string, string>;
}

/**
 * Utility class definition
 */
export interface UtilityStyles {
  [className: string]: Record<string, string>;
}

/**
 * Color roles for semantic naming
 */
export type ColorRole =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'neutral';

/**
 * Semantic color types
 */
export type SemanticColor =
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Surface elevation levels
 */
export type SurfaceLevel =
  | 'lowest'
  | 'low'
  | 'default'
  | 'high'
  | 'highest';

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component variant types
 */
export type ComponentVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'link';
