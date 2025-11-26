/**
 * Plugin Configuration Types
 * TypeScript definitions for @duskmoon-dev/core plugin options
 */

/**
 * Theme names available in the plugin
 */
export type BuiltInTheme = 'sunshine' | 'moonlight';

/**
 * Plugin configuration options
 * Used with @plugin "@duskmoon-dev/core" { ... } syntax
 */
export interface PluginConfig {
  /**
   * Themes to include in the build
   * @example ["sunshine", "moonlight", "custom"]
   * @default ["sunshine", "moonlight"]
   */
  themes?: string[];

  /**
   * Default theme name (applied when no data-theme is set)
   * @default "sunshine"
   */
  defaultTheme?: string;

  /**
   * Theme to use when user prefers dark color scheme
   * @default "moonlight"
   */
  prefersDarkTheme?: string;

  /**
   * Components to include in the build
   * Use 'all' to include all components, or specify an array of component names
   * @example ["button", "card", "input"]
   * @default "all"
   */
  components?: 'all' | ComponentName[];

  /**
   * Prefix to add to all component class names
   * @example "dm-" results in "dm-btn" instead of "btn"
   * @default ""
   */
  prefix?: string;

  /**
   * Enable logging for debugging
   * @default false
   */
  logs?: boolean;
}

/**
 * Available component names
 */
export type ComponentName =
  | 'button'
  | 'card'
  | 'input'
  | 'form'
  | 'navigation'
  | 'modal';

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Component color variants
 */
export type ComponentColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Component style variants
 */
export type ComponentStyleVariant =
  | 'solid'
  | 'outline'
  | 'ghost';

/**
 * Interactive states for components
 */
export type InteractiveState =
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled';
