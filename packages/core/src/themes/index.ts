/**
 * DuskMoonUI Themes
 * Generated from @duskmoon-dev/design YAML tokens (v2.0 — OKLCH)
 */

import { sunshineColors } from './generated/ts/sunshine.generated';
import { moonlightColors } from './generated/ts/moonlight.generated';
import { oceanColors } from './generated/ts/ocean.generated';
import { forestColors } from './generated/ts/forest.generated';
import type { ThemeColors } from './generated/ts/types';

// Re-export types from generated types.ts
export type { ThemeColors, ThemeShape, ThemeMeta, OklchColor } from './generated/ts/types';

// Re-export individual theme colors + shapes + meta
export { sunshineColors, sunshineShape, sunshineMeta } from './generated/ts/sunshine.generated';
export { moonlightColors, moonlightShape, moonlightMeta } from './generated/ts/moonlight.generated';
export { oceanColors, oceanShape, oceanMeta } from './generated/ts/ocean.generated';
export { forestColors, forestShape, forestMeta } from './generated/ts/forest.generated';

// Re-export typography and spacing
export { typeScale } from './generated/ts/typography.generated';
export type { TypeScaleEntry } from './generated/ts/typography.generated';
export { spacing, radius, elevation } from './generated/ts/spacing.generated';

/**
 * All available themes
 */
export const themes = {
  sunshine: sunshineColors,
  moonlight: moonlightColors,
  ocean: oceanColors,
  forest: forestColors,
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
