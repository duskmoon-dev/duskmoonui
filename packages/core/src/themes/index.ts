/**
 * DuskMoonUI Themes
 * Built-in theme definitions
 */

import { sunshine } from './sunshine';
import { moonlight } from './moonlight';
import { ocean } from './ocean';
import { forest } from './forest';
import { sunset } from './sunset';
import type { ThemeColors } from '../types';

// Re-export individual themes
export { sunshine } from './sunshine';
export { moonlight } from './moonlight';
export { ocean } from './ocean';
export { forest } from './forest';
export { sunset } from './sunset';

/**
 * All available themes
 */
export const themes = {
  sunshine,
  moonlight,
  ocean,
  forest,
  sunset,
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
