/**
 * DuskMoonUI Themes
 * Generated from @duskmoon-dev/design YAML tokens
 */

import { sunshine } from './generated/sunshine.generated';
import { moonlight } from './generated/moonlight.generated';
import type { ThemeColors } from '../types';

export { sunshine } from './generated/sunshine.generated';
export { moonlight } from './generated/moonlight.generated';

export { typeScale } from './generated/typography.generated';
export type { TypeScaleEntry } from './generated/typography.generated';
export { spacing, radius, elevation } from './generated/spacing.generated';

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
