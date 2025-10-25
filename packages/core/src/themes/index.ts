/**
 * DuskMoonUI Themes
 * Built-in theme definitions
 */

import { sunshine } from './sunshine';
import { moonlight } from './moonlight';
import type { ThemeColors } from '../types';

/**
 * All available themes
 */
export const themes = {
  sunshine,
  moonlight,
} as const;

/**
 * Get theme by name
 */
export function getTheme(name: keyof typeof themes): ThemeColors {
  return themes[name];
}

/**
 * Check if theme exists
 */
export function hasTheme(name: string): name is keyof typeof themes {
  return name in themes;
}
