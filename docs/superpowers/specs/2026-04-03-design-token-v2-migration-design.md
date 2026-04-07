# Design Token v2.0 Migration Spec

> **Date**: 2026-04-03
> **Branch**: `design`
> **Scope**: `packages/core/` + `packages/design/`
> **Breaking**: Yes (color format change, 3 themes added, focus tokens removed, shape tokens added)

---

## Context

The remote `duskmoon-dev/design` repo has been upgraded to v2.0 with:
- **HSL to OKLCH migration** in the codegen pipeline
- **5 themes** (sunshine, moonlight, ocean, forest, sunset) — all from YAML
- **Focus tokens removed** from the color schema (`*-focus` tokens gone)
- **ThemeShape interface added** with per-theme shape tokens (radius-selector, radius-field, radius-box, size-selector, size-field, border, depth, noise)
- **Generated types.ts** — codegen now produces its own `ThemeColors` + `ThemeShape` interfaces
- **TS output path change**: `generated/ts/` subdirectory instead of flat `generated/`
- **Codegen v2.0.0** headers on all output files

The local `packages/design/` is stale (v1.0 HSL). Core must be updated to consume v2.0 output.

---

## Token Set Diff: v1.0 vs v2.0

### Removed (5 tokens)
- `primary-focus`
- `secondary-focus`
- `tertiary-focus`
- `accent-focus`
- `neutral-focus`

Components already use `color-mix(in oklch, var(--color-*), black 10%)` for focus states — no functional loss.

### Added (ThemeShape — 8 tokens per theme)
- `radius-selector` (e.g., `0.25rem`)
- `radius-field` (e.g., `0.625rem`)
- `radius-box` (e.g., `2rem`)
- `size-selector` (e.g., `0.1875rem`)
- `size-field` (e.g., `0.1875rem`)
- `border` (e.g., `0.5px`)
- `depth` (e.g., `1`)
- `noise` (e.g., `1`)

### Format Change
- CSS values: `hsl(38 92% 50%)` -> `oklch(72% 0.17 75)`
- TS values: `'38 92% 50%'` -> `'72% 0.17 75'`
- Type alias: `HSLColor` -> `OklchColor`

### Color Count (unchanged)
62 color tokens per theme (same set minus 5 focus tokens, which were already absent from codegen v1 output files — they were only in the manual `types/theme.ts`).

---

## Architecture After Migration

```
packages/design/          <-- Updated from remote duskmoon-dev/design v2.0
  tokens/*.yaml           <-- 5 theme YAMLs + schema + spacing + typography + semantic
  scripts/codegen.ts      <-- v2.0 codegen (OKLCH output)
  codegen.yaml            <-- Updated config (ts output to generated/ts/)
  generated/              <-- All codegen outputs (CSS, JSON, Dart, TS)

packages/core/
  src/themes/generated/   <-- Refreshed by codegen:
    sunshine.css              5 theme CSS files (OKLCH)
    moonlight.css
    ocean.css                 NEW
    forest.css                NEW
    sunset.css                NEW
    spacing.css               (unchanged structure)
    ts/                       NEW subdirectory
      types.ts                NEW (generated ThemeColors + ThemeShape)
      sunshine.generated.ts   (OKLCH values)
      moonlight.generated.ts
      ocean.generated.ts      NEW
      forest.generated.ts     NEW
      sunset.generated.ts     NEW
      spacing.generated.ts    (unchanged)
      typography.generated.ts (unchanged)

  src/themes/index.css    <-- Add ocean, forest, sunset imports
  src/themes/index.ts     <-- Add 3 new themes, import types from generated/ts/types
  src/types/theme.ts      <-- DELETE (replaced by generated types.ts)
  src/types/index.ts      <-- Re-export from generated types
  src/base/colors.css     <-- Remove focus tokens, add shape tokens from ThemeShape
  src/tailwind-plugin.ts  <-- Remove focus token mappings
  package.json            <-- Add ocean/forest/sunset theme exports
```

---

## Detailed Changes

### 1. Update `packages/design/` from Remote

Pull latest from `duskmoon-dev/design` main branch into `packages/design/`. This brings:
- Updated `tokens/*.yaml` (5 themes, OKLCH values)
- Updated `scripts/codegen.ts` (v2.0 pipeline)
- Updated `codegen.yaml` (new output paths)
- All pre-generated outputs in `generated/`

### 2. Update Codegen Config for Core Paths

The remote codegen.yaml writes TS to `generated/ts/`. We need to ensure the codegen copies outputs to `packages/core/src/themes/generated/` correctly. Either:
- (a) Update codegen.yaml to include core output paths, or
- (b) Copy files after generation

Decision: Check what the remote codegen.yaml does. If it already targets core, just run it. If not, add a copy step.

### 3. `src/themes/index.css`

```css
/* Before */
@import "./generated/sunshine.css";
@import "./generated/moonlight.css";
@import "./generated/spacing.css";

/* After */
@import "./generated/sunshine.css";
@import "./generated/moonlight.css";
@import "./generated/ocean.css";
@import "./generated/forest.css";
@import "./generated/sunset.css";
@import "./generated/spacing.css";
```

### 4. `src/themes/index.ts`

```typescript
/* Before */
import { sunshine } from './generated/sunshine.generated';
import { moonlight } from './generated/moonlight.generated';
import type { ThemeColors } from '../types';

/* After */
import { sunshineColors } from './generated/ts/sunshine.generated';
import { moonlightColors } from './generated/ts/moonlight.generated';
import { oceanColors } from './generated/ts/ocean.generated';
import { forestColors } from './generated/ts/forest.generated';
import { sunsetColors } from './generated/ts/sunset.generated';
import type { ThemeColors } from './generated/ts/types';

// Re-export types
export type { ThemeColors, ThemeShape, OklchColor } from './generated/ts/types';

// Re-export individual themes
export { sunshineColors, sunshineShape } from './generated/ts/sunshine.generated';
export { moonlightColors, moonlightShape } from './generated/ts/moonlight.generated';
export { oceanColors, oceanShape } from './generated/ts/ocean.generated';
export { forestColors, forestShape } from './generated/ts/forest.generated';
export { sunsetColors, sunsetShape } from './generated/ts/sunset.generated';

export { typeScale } from './generated/ts/typography.generated';
export type { TypeScaleEntry } from './generated/ts/typography.generated';
export { spacing, radius, elevation } from './generated/ts/spacing.generated';

export const themes = {
  sunshine: sunshineColors,
  moonlight: moonlightColors,
  ocean: oceanColors,
  forest: forestColors,
  sunset: sunsetColors,
} as const;

export function getTheme(name: keyof typeof themes): ThemeColors {
  return themes[name];
}

export function hasTheme(name: string): name is keyof typeof themes {
  return name in themes;
}
```

Note: The v2.0 codegen exports are named `sunshineColors`/`sunshineShape` (not just `sunshine`). This must match exactly.

### 5. `src/types/theme.ts` -> DELETE

Replace with re-exports from generated types. Update `src/types/index.ts` to:

```typescript
export type { ThemeColors, ThemeShape, OklchColor } from '../themes/generated/ts/types';

// Keep ThemeDefinition, PartialThemeColors, ThemeConfig, validation types
// but update HSLColor -> OklchColor references
```

### 6. `src/base/colors.css` @theme Block

Remove focus tokens (5 entries):
- `--color-primary-focus`
- `--color-secondary-focus`
- `--color-tertiary-focus`
- `--color-accent-focus`
- `--color-neutral-focus`

Add shape tokens from ThemeShape (set in theme CSS via codegen):
- `--radius-selector: initial;`
- `--radius-field: initial;`
- `--radius-box: initial;`
- `--size-selector: initial;`
- `--size-field: initial;`
- `--border: initial;`
- `--depth: initial;`
- `--noise: initial;`

Update header comment: HSL -> OKLCH.

Utility classes: Remove `.bg-*-focus` utilities (they use `color-mix()` already, which doesn't need a token). Keep all `color-mix()` based utilities as-is.

### 7. `src/tailwind-plugin.ts`

Remove focus token mappings (5 entries):
- `'primary-focus'`
- `'secondary-focus'`
- `'tertiary-focus'`
- `'accent-focus'`
- `'neutral-focus'`

No other changes needed — all other mappings are `var(--color-*)` references that work with any color format.

### 8. `package.json` Exports

Add theme exports:
```json
"./themes/ocean": { "style": "./dist/themes/generated/ocean.css" },
"./themes/forest": { "style": "./dist/themes/generated/forest.css" },
"./themes/sunset": { "style": "./dist/themes/generated/sunset.css" }
```

---

## What Stays Unchanged

- All 50+ component CSS files (use `var(--color-*)` + `color-mix()` — format-agnostic)
- All component TS files
- `src/generators/index.ts` (`generateCssVariables()` works with any string values)
- `src/index.css` (CSS entry point — unchanged import chain)
- `src/base/root.css`, `src/base/utilities.css` (except removing focus utility classes)
- Build pipeline (`scripts/build-css.ts`) — just picks up new files

---

## Component Impact

**Focus tokens**: No component CSS files reference `--color-*-focus` directly (verified via grep). All focus states use `color-mix(in oklch, var(--color-*), black 10%)`. Zero impact.

**Color format**: Components use `var(--color-*)` which is format-agnostic. `color-mix(in oklch, ...)` works whether the input is HSL or OKLCH — the browser handles conversion. Zero impact.

**Shape tokens**: The new ThemeShape tokens (`--radius-selector`, `--radius-field`, `--radius-box`, etc.) are additive. Components can optionally adopt them later but don't need to for this migration.

---

## Verification Checklist

- [ ] `bun run build:core` succeeds
- [ ] `cd packages/core && bun test tests/unit` — all tests pass
- [ ] No references to `*-focus` tokens remain in colors.css, tailwind-plugin.ts, or types
- [ ] `@theme` block token count matches codegen CSS output (62 color tokens + shape + shadows + radius)
- [ ] All 5 theme CSS files present in `dist/themes/generated/`
- [ ] TypeScript compiles cleanly (types from generated/ts/types.ts)
- [ ] `@import "@duskmoon-dev/core"` includes all 5 themes
- [ ] `@plugin "@duskmoon-dev/core/plugin"` still works
- [ ] Package exports resolve correctly for all 5 theme paths

---

## Breaking Changes Summary

| Change | Migration |
|---|---|
| Color values OKLCH (were HSL) | Transparent to CSS consumers (`var()` is format-agnostic). TS consumers: type changes from `HSLColor` to `OklchColor`. |
| Focus tokens removed | Use `color-mix(in oklch, var(--color-*), black 10%)` instead |
| 3 themes added | ocean, forest, sunset now available via `data-theme` attribute |
| ThemeShape tokens added | New per-theme shape tokens available (additive, non-breaking) |
| TS export names changed | `sunshine` -> `sunshineColors`, plus `sunshineShape` |

---

*End of spec*
