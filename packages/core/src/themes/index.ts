/**
 * DuskMoonUI Themes
 * Generated from @duskmoon-dev/design YAML tokens (v2.0 — OKLCH)
 */

import { sunshineMeta, sunshineColors } from './generated/ts/sunshine.generated';
import { moonlightMeta, moonlightColors } from './generated/ts/moonlight.generated';
import { oceanMeta, oceanColors } from './generated/ts/ocean.generated';
import { forestMeta, forestColors } from './generated/ts/forest.generated';
import type { ThemeColors, ThemeMeta } from './generated/ts/types';

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

/**
 * Theme metadata map — light/dark mode, family, and couple pairing
 */
export const themeMeta = {
  sunshine: sunshineMeta,
  moonlight: moonlightMeta,
  ocean: oceanMeta,
  forest: forestMeta,
} as const;

/**
 * Get the paired (coupled) theme name for light/dark toggling
 */
export function getThemePair(name: keyof typeof themes): string {
  return themeMeta[name].pair;
}

/**
 * Get the family name for a theme
 */
export function getThemeFamily(name: keyof typeof themes): string {
  return themeMeta[name].family;
}

/**
 * Get full metadata for a theme
 */
export function getThemeMeta(name: keyof typeof themes): ThemeMeta {
  return themeMeta[name];
}
