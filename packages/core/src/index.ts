/**
 * DuskMoonUI - Tailwind CSS 4 Plugin
 * Main entry point for the component library
 */

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
 * Generate CSS for Tailwind CSS 4 @plugin syntax
 */
export function generatePluginCSS(options: Partial<DuskMoonUIOptions> = {}): string {
  const config: DuskMoonUIOptions = { ...defaultOptions, ...options };
  let css = '';

  // Generate theme CSS variables
  const selectedThemes = config.themes || ['sunshine', 'moonlight'];

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

    if (themeColors && config.base) {
      const cssVars = generateCssVariables(themeColors as ThemeColors);
      css += `\n[data-theme="${themeName}"] {\n`;
      for (const [key, value] of Object.entries(cssVars)) {
        css += `  ${key}: ${value};\n`;
      }
      css += `}\n`;
    }
  });

  // Generate component styles
  if (config.styled && config.components) {
    const componentStyles = getComponentStyles(config.components);
    css += '\n' + convertComponentStylesToCSS(componentStyles, config.prefix);
  }

  return css;
}

/**
 * Convert component styles object to CSS string
 */
function convertComponentStylesToCSS(styles: Record<string, any>, prefix: string = ''): string {
  let css = '';

  for (const [selector, rules] of Object.entries(styles)) {
    const prefixedSelector = prefix ? selector.replace(/^\./, `.${prefix}`) : selector;

    if (selector.startsWith('@keyframes')) {
      // Handle keyframes
      css += `${selector} {\n`;
      for (const [keyframe, props] of Object.entries(rules as Record<string, any>)) {
        css += `  ${keyframe} {\n`;
        for (const [prop, value] of Object.entries(props as Record<string, any>)) {
          css += `    ${kebabCase(prop)}: ${value};\n`;
        }
        css += `  }\n`;
      }
      css += `}\n\n`;
    } else if (typeof rules === 'object' && !Array.isArray(rules)) {
      css += `${prefixedSelector} {\n`;
      for (const [prop, value] of Object.entries(rules)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Nested selector
          css += convertComponentStylesToCSS({ [prop]: value }, prefix);
        } else {
          css += `  ${kebabCase(prop)}: ${value};\n`;
        }
      }
      css += `}\n\n`;
    }
  }

  return css;
}

/**
 * Convert camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Default export for Tailwind CSS 4
 */
export default generatePluginCSS;

// Export named function
export { generatePluginCSS as duskmoonui };

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
