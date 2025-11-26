/**
 * DuskMoonUI Type Definitions
 * Main export file for all TypeScript types
 */

// Plugin configuration types
export type {
  PluginConfig,
  BuiltInTheme,
  ComponentName,
  ComponentSize,
  ComponentColorVariant,
  ComponentStyleVariant,
  InteractiveState,
} from './plugin';

// Theme configuration types
export type {
  HSLColor,
  ColorScheme,
  ThemeDefinition,
  ThemeColors,
  PartialThemeColors,
  ThemeConfig,
  ThemeValidationResult,
  ThemeValidationError,
  ThemeValidationWarning,
} from './theme';

/**
 * Re-export types for backwards compatibility
 * @deprecated Use specific imports from './plugin' or './theme'
 */
export type DuskMoonUIOptions = import('./plugin').PluginConfig;
export type ThemeName = import('./plugin').BuiltInTheme;
export type CustomTheme = import('./theme').PartialThemeColors;
