/**
 * DuskMoonUI - Tailwind CSS Plugin
 * Main entry point for the component library
 */

import plugin from 'tailwindcss/plugin';
import { themes } from './themes';
import { generateCssVariables } from './generators';
import { getComponentStyles } from './components';
import type { DuskMoonUIOptions, ThemeColors, CustomTheme } from './types';

/**
 * Default plugin options
 */
const defaultOptions: DuskMoonUIOptions = {
  themes: ['sunshine', 'moonlight'],
  darkTheme: 'moonlight',
  prefix: '',
  components: 'all',
  utilities: true,
  rtl: false,
  styled: true,
  base: true,
};

/**
 * DuskMoonUI Tailwind CSS Plugin
 */
const duskmoonuiPlugin = plugin.withOptions<Partial<DuskMoonUIOptions>>(
  (options: Partial<DuskMoonUIOptions> = {}) => {
    const config: DuskMoonUIOptions = { ...defaultOptions, ...options };

    return ({ addBase, addComponents }: {
      addBase: (styles: Record<string, Record<string, string>>) => void;
      addComponents: (components: Record<string, any>) => void;
    }) => {
      // Inject theme colors as CSS variables
      const selectedThemes = config.themes || ['sunshine', 'moonlight'];
      const baseStyles: Record<string, Record<string, string>> = {};

      selectedThemes.forEach((themeConfig) => {
        let themeName: string;
        let themeColors: ThemeColors | CustomTheme | undefined;

        if (typeof themeConfig === 'string') {
          themeName = themeConfig;
          themeColors = themes[themeConfig as keyof typeof themes];
        } else {
          // Custom theme object
          const entry = Object.entries(themeConfig)[0];
          if (entry) {
            const [name, colors] = entry;
            themeName = name;
            themeColors = colors;
          } else {
            return;
          }
        }

        if (themeColors) {
          const cssVars = generateCssVariables(themeColors as ThemeColors);
          baseStyles[`[data-theme="${themeName}"]`] = cssVars;
        }
      });

      if (config.base) {
        addBase(baseStyles);
      }

      // Add component styles
      if (config.styled && config.components) {
        const componentStyles = getComponentStyles(config.components);
        addComponents(componentStyles);
      }
    };
  },
  (_options: Partial<DuskMoonUIOptions> = {}) => {
    // Extend Tailwind config
    return {
      theme: {
        extend: {
          colors: {
            // Map color variables to Tailwind's color system
            primary: 'hsl(var(--color-primary) / <alpha-value>)',
            'primary-focus': 'hsl(var(--color-primary-focus) / <alpha-value>)',
            'primary-content': 'hsl(var(--color-primary-content) / <alpha-value>)',

            secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
            'secondary-focus': 'hsl(var(--color-secondary-focus) / <alpha-value>)',
            'secondary-content': 'hsl(var(--color-secondary-content) / <alpha-value>)',

            tertiary: 'hsl(var(--color-tertiary) / <alpha-value>)',
            'tertiary-focus': 'hsl(var(--color-tertiary-focus) / <alpha-value>)',
            'tertiary-content': 'hsl(var(--color-tertiary-content) / <alpha-value>)',

            // Add more colors as needed
          },
        },
      },
    };
  }
) as ReturnType<typeof plugin.withOptions<Partial<DuskMoonUIOptions>>>;

export default duskmoonuiPlugin;

// Export types
export type {
  ThemeColors,
  ThemeName,
  DuskMoonUIOptions,
  ColorRole,
  SemanticColor,
  SurfaceLevel,
  ComponentSize,
  ComponentVariant,
} from './types';

// Export themes
export { themes } from './themes';
