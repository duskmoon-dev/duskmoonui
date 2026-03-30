/**
 * @duskmoon-dev/core - Tailwind CSS v4 Plugin
 *
 * Usage with @plugin directive:
 * ```css
 * @import "tailwindcss";
 * @plugin "@duskmoon-dev/core/plugin";
 * ```
 *
 * Or use @import for CSS-only (recommended):
 * ```css
 * @import "tailwindcss";
 * @import "@duskmoon-dev/core";
 * ```
 */

import plugin from 'tailwindcss/plugin';

// Theme color tokens for Tailwind CSS v4
// All tokens reference CSS custom properties set by theme CSS files (from codegen)
const themeColors = {
  // Primary colors
  'primary': 'var(--color-primary)',
  'primary-focus': 'var(--color-primary-focus)',
  'primary-content': 'var(--color-primary-content)',
  'primary-container': 'var(--color-primary-container)',
  'on-primary-container': 'var(--color-on-primary-container)',

  // Secondary colors
  'secondary': 'var(--color-secondary)',
  'secondary-focus': 'var(--color-secondary-focus)',
  'secondary-content': 'var(--color-secondary-content)',
  'secondary-container': 'var(--color-secondary-container)',
  'on-secondary-container': 'var(--color-on-secondary-container)',

  // Tertiary colors
  'tertiary': 'var(--color-tertiary)',
  'tertiary-focus': 'var(--color-tertiary-focus)',
  'tertiary-content': 'var(--color-tertiary-content)',
  'tertiary-container': 'var(--color-tertiary-container)',
  'on-tertiary-container': 'var(--color-on-tertiary-container)',

  // Accent colors
  'accent': 'var(--color-accent)',
  'accent-focus': 'var(--color-accent-focus)',
  'accent-content': 'var(--color-accent-content)',

  // Neutral colors
  'neutral': 'var(--color-neutral)',
  'neutral-focus': 'var(--color-neutral-focus)',
  'neutral-content': 'var(--color-neutral-content)',
  'neutral-variant': 'var(--color-neutral-variant)',

  // Surface colors
  'surface': 'var(--color-surface)',
  'surface-dim': 'var(--color-surface-dim)',
  'surface-bright': 'var(--color-surface-bright)',
  'surface-variant': 'var(--color-surface-variant)',
  'on-surface': 'var(--color-on-surface)',
  'on-surface-variant': 'var(--color-on-surface-variant)',
  'surface-container': 'var(--color-surface-container)',
  'surface-container-low': 'var(--color-surface-container-low)',
  'surface-container-lowest': 'var(--color-surface-container-lowest)',
  'surface-container-high': 'var(--color-surface-container-high)',
  'surface-container-highest': 'var(--color-surface-container-highest)',

  // Semantic colors
  'info': 'var(--color-info)',
  'info-content': 'var(--color-info-content)',
  'info-container': 'var(--color-info-container)',
  'on-info-container': 'var(--color-on-info-container)',

  'success': 'var(--color-success)',
  'success-content': 'var(--color-success-content)',
  'success-container': 'var(--color-success-container)',
  'on-success-container': 'var(--color-on-success-container)',

  'warning': 'var(--color-warning)',
  'warning-content': 'var(--color-warning-content)',
  'warning-container': 'var(--color-warning-container)',
  'on-warning-container': 'var(--color-on-warning-container)',

  'error': 'var(--color-error)',
  'error-content': 'var(--color-error-content)',
  'error-container': 'var(--color-error-container)',
  'on-error-container': 'var(--color-on-error-container)',

  // Base scale
  'base-100': 'var(--color-base-100)',
  'base-200': 'var(--color-base-200)',
  'base-300': 'var(--color-base-300)',
  'base-400': 'var(--color-base-400)',
  'base-500': 'var(--color-base-500)',
  'base-600': 'var(--color-base-600)',
  'base-700': 'var(--color-base-700)',
  'base-800': 'var(--color-base-800)',
  'base-900': 'var(--color-base-900)',
  'base-content': 'var(--color-base-content)',

  // Outline colors
  'outline': 'var(--color-outline)',
  'outline-variant': 'var(--color-outline-variant)',

  // Inverse colors
  'inverse-surface': 'var(--color-inverse-surface)',
  'inverse-on-surface': 'var(--color-inverse-on-surface)',
  'inverse-primary': 'var(--color-inverse-primary)',

  // Shadow & Scrim
  'scrim': 'var(--color-scrim)',
  'shadow': 'var(--color-shadow)',
};

// Shadow tokens — reference CSS custom properties from @theme in colors.css
const themeShadows = {
  'xs': 'var(--shadow-xs)',
  'sm': 'var(--shadow-sm)',
  'md': 'var(--shadow-md)',
  'lg': 'var(--shadow-lg)',
  'xl': 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
};

// Shape tokens — reference CSS custom properties from @theme in colors.css
const themeRadius = {
  'none': 'var(--radius-none)',
  'xs': 'var(--radius-xs)',
  'sm': 'var(--radius-sm)',
  'md': 'var(--radius-md)',
  'lg': 'var(--radius-lg)',
  'xl': 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  'full': 'var(--radius-full)',
};

/**
 * DuskMoonUI Tailwind CSS v4 Plugin
 *
 * This plugin extends Tailwind with Material Design 3 color tokens.
 * Theme colors are defined by CSS theme files (from codegen) — no inline values here.
 * For component styles, use @import "@duskmoon-dev/core" in addition to this plugin.
 */
const duskmoonPlugin: ReturnType<typeof plugin> = plugin(
  ({ matchUtilities, theme }) => {
    // Register responsive grid utilities so they work via @plugin import.
    matchUtilities(
      {
        'grid-cols-auto-fill': (value) => ({
          'grid-template-columns': `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
        }),
        'grid-cols-auto-fit': (value) => ({
          'grid-template-columns': `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values: theme('spacing') }
    );
  },
  {
    // Extend Tailwind's theme with our color tokens and shadow tokens
    theme: {
      extend: {
        colors: themeColors,
        boxShadow: themeShadows,
        borderRadius: themeRadius,
      },
    },
  }
);

export default duskmoonPlugin;
export { duskmoonPlugin };
