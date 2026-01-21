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
const themeColors = {
  // Primary colors
  'primary': 'var(--color-primary)',
  'on-primary': 'var(--color-on-primary)',
  'primary-container': 'var(--color-primary-container)',
  'on-primary-container': 'var(--color-on-primary-container)',

  // Secondary colors
  'secondary': 'var(--color-secondary)',
  'on-secondary': 'var(--color-on-secondary)',
  'secondary-container': 'var(--color-secondary-container)',
  'on-secondary-container': 'var(--color-on-secondary-container)',

  // Tertiary colors
  'tertiary': 'var(--color-tertiary)',
  'on-tertiary': 'var(--color-on-tertiary)',
  'tertiary-container': 'var(--color-tertiary-container)',
  'on-tertiary-container': 'var(--color-on-tertiary-container)',

  // Error colors
  'error': 'var(--color-error)',
  'on-error': 'var(--color-on-error)',
  'error-container': 'var(--color-error-container)',
  'on-error-container': 'var(--color-on-error-container)',

  // Surface colors
  'surface': 'var(--color-surface)',
  'on-surface': 'var(--color-on-surface)',
  'surface-variant': 'var(--color-surface-variant)',
  'on-surface-variant': 'var(--color-on-surface-variant)',
  'surface-container': 'var(--color-surface-container)',
  'surface-container-low': 'var(--color-surface-container-low)',
  'surface-container-lowest': 'var(--color-surface-container-lowest)',
  'surface-container-high': 'var(--color-surface-container-high)',
  'surface-container-highest': 'var(--color-surface-container-highest)',

  // Other colors
  'outline': 'var(--color-outline)',
  'outline-variant': 'var(--color-outline-variant)',
  'inverse-surface': 'var(--color-inverse-surface)',
  'inverse-on-surface': 'var(--color-inverse-on-surface)',
  'inverse-primary': 'var(--color-inverse-primary)',
  'scrim': 'var(--color-scrim)',
  'shadow': 'var(--color-shadow)',
};

/**
 * DuskMoonUI Tailwind CSS v4 Plugin
 *
 * This plugin extends Tailwind with Material Design 3 color tokens.
 * For component styles, use @import "@duskmoon-dev/core" in addition to this plugin.
 */
const duskmoonPlugin: ReturnType<typeof plugin> = plugin(
  ({ addBase, matchUtilities, theme }) => {
    // Add CSS custom property declarations for themes
    addBase({
      ':root, [data-theme="sunshine"]': {
        '--color-primary': 'oklch(0.55 0.2 260)',
        '--color-on-primary': 'oklch(1 0 0)',
        '--color-primary-container': 'oklch(0.9 0.05 260)',
        '--color-on-primary-container': 'oklch(0.25 0.1 260)',
        '--color-secondary': 'oklch(0.5 0.1 280)',
        '--color-on-secondary': 'oklch(1 0 0)',
        '--color-secondary-container': 'oklch(0.92 0.03 280)',
        '--color-on-secondary-container': 'oklch(0.25 0.05 280)',
        '--color-tertiary': 'oklch(0.55 0.15 30)',
        '--color-on-tertiary': 'oklch(1 0 0)',
        '--color-tertiary-container': 'oklch(0.92 0.04 30)',
        '--color-on-tertiary-container': 'oklch(0.3 0.08 30)',
        '--color-error': 'oklch(0.55 0.2 25)',
        '--color-on-error': 'oklch(1 0 0)',
        '--color-error-container': 'oklch(0.92 0.05 25)',
        '--color-on-error-container': 'oklch(0.3 0.1 25)',
        '--color-surface': 'oklch(0.99 0.005 260)',
        '--color-on-surface': 'oklch(0.2 0.02 260)',
        '--color-surface-variant': 'oklch(0.93 0.01 260)',
        '--color-on-surface-variant': 'oklch(0.45 0.03 260)',
        '--color-surface-container': 'oklch(0.96 0.008 260)',
        '--color-surface-container-low': 'oklch(0.97 0.006 260)',
        '--color-surface-container-lowest': 'oklch(1 0 0)',
        '--color-surface-container-high': 'oklch(0.94 0.01 260)',
        '--color-surface-container-highest': 'oklch(0.92 0.012 260)',
        '--color-outline': 'oklch(0.55 0.02 260)',
        '--color-outline-variant': 'oklch(0.8 0.015 260)',
        '--color-inverse-surface': 'oklch(0.25 0.02 260)',
        '--color-inverse-on-surface': 'oklch(0.95 0.005 260)',
        '--color-inverse-primary': 'oklch(0.8 0.12 260)',
        '--color-scrim': 'oklch(0 0 0)',
        '--color-shadow': 'oklch(0 0 0)',
      },
      '[data-theme="moonlight"]': {
        '--color-primary': 'oklch(0.8 0.12 260)',
        '--color-on-primary': 'oklch(0.3 0.15 260)',
        '--color-primary-container': 'oklch(0.35 0.15 260)',
        '--color-on-primary-container': 'oklch(0.9 0.05 260)',
        '--color-secondary': 'oklch(0.8 0.06 280)',
        '--color-on-secondary': 'oklch(0.3 0.08 280)',
        '--color-secondary-container': 'oklch(0.35 0.08 280)',
        '--color-on-secondary-container': 'oklch(0.92 0.03 280)',
        '--color-tertiary': 'oklch(0.8 0.1 30)',
        '--color-on-tertiary': 'oklch(0.35 0.12 30)',
        '--color-tertiary-container': 'oklch(0.4 0.1 30)',
        '--color-on-tertiary-container': 'oklch(0.92 0.04 30)',
        '--color-error': 'oklch(0.85 0.12 25)',
        '--color-on-error': 'oklch(0.35 0.15 25)',
        '--color-error-container': 'oklch(0.4 0.12 25)',
        '--color-on-error-container': 'oklch(0.92 0.05 25)',
        '--color-surface': 'oklch(0.2 0.015 260)',
        '--color-on-surface': 'oklch(0.93 0.01 260)',
        '--color-surface-variant': 'oklch(0.35 0.02 260)',
        '--color-on-surface-variant': 'oklch(0.8 0.02 260)',
        '--color-surface-container': 'oklch(0.22 0.018 260)',
        '--color-surface-container-low': 'oklch(0.18 0.012 260)',
        '--color-surface-container-lowest': 'oklch(0.15 0.01 260)',
        '--color-surface-container-high': 'oklch(0.25 0.02 260)',
        '--color-surface-container-highest': 'oklch(0.28 0.022 260)',
        '--color-outline': 'oklch(0.55 0.025 260)',
        '--color-outline-variant': 'oklch(0.35 0.02 260)',
        '--color-inverse-surface': 'oklch(0.93 0.01 260)',
        '--color-inverse-on-surface': 'oklch(0.25 0.02 260)',
        '--color-inverse-primary': 'oklch(0.55 0.2 260)',
        '--color-scrim': 'oklch(0 0 0)',
        '--color-shadow': 'oklch(0 0 0)',
      },
    });
  },
  {
    // Extend Tailwind's theme with our color tokens
    theme: {
      extend: {
        colors: themeColors,
      },
    },
  }
);

export default duskmoonPlugin;
export { duskmoonPlugin };
