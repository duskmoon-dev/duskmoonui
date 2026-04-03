# Design Token v2.0 Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `packages/core` to consume design codegen v2.0 output — OKLCH colors, 5 themes, ThemeShape tokens, generated types.

**Architecture:** Pull updated design repo into `packages/design/`, run codegen to regenerate all files into `packages/core/src/themes/generated/`, then update the handful of hand-maintained files in core (index.ts/css, types, colors.css, tailwind-plugin, package.json) to match the new token set.

**Tech Stack:** Bun, TypeScript, Tailwind CSS v4, CSS custom properties, OKLCH color format.

**Spec:** `docs/superpowers/specs/2026-04-03-design-token-v2-migration-design.md`

---

## File Map

### Modified Files
- `packages/design/` — entire directory replaced from remote
- `packages/core/src/themes/index.css` — add 3 new theme imports
- `packages/core/src/themes/index.ts` — add 3 themes, update import paths/names, export ThemeShape
- `packages/core/src/types/theme.ts` — rewrite to re-export from generated types + keep helper types
- `packages/core/src/types/index.ts` — update re-exports (HSLColor → OklchColor)
- `packages/core/src/types/plugin.ts` — update BuiltInTheme union
- `packages/core/src/index.ts` — update default options to include all 5 themes
- `packages/core/src/base/colors.css` — remove focus tokens, add shape tokens, update header
- `packages/core/src/tailwind-plugin.ts` — remove focus token mappings
- `packages/core/package.json` — add 3 theme export entries

### Generated Files (by codegen, not hand-written)
- `packages/core/src/themes/generated/ocean.css` — NEW
- `packages/core/src/themes/generated/forest.css` — NEW
- `packages/core/src/themes/generated/sunset.css` — NEW
- `packages/core/src/themes/generated/sunshine.css` — UPDATED (OKLCH values)
- `packages/core/src/themes/generated/moonlight.css` — UPDATED (OKLCH values)
- `packages/core/src/themes/generated/spacing.css` — UPDATED (v2.0 header)
- `packages/core/src/themes/generated/ts/` — NEW subdirectory with all TS files

### Deleted Files
- `packages/core/src/themes/generated/sunshine.generated.ts` — moved to `ts/` subdir
- `packages/core/src/themes/generated/moonlight.generated.ts` — moved to `ts/` subdir
- `packages/core/src/themes/generated/spacing.generated.ts` — moved to `ts/` subdir
- `packages/core/src/themes/generated/typography.generated.ts` — moved to `ts/` subdir

---

## Task 1: Pull Design Repo v2.0

**Files:**
- Replace: `packages/design/` (entire directory)

- [ ] **Step 1: Clone remote design repo into temp location**

```bash
gh repo clone duskmoon-dev/design /tmp/duskmoon-design -- --depth=1
```

- [ ] **Step 2: Replace local design package contents**

```bash
# Remove old contents (keep .git-untracked items safe)
rm -rf packages/design/tokens packages/design/scripts packages/design/generated packages/design/codegen.yaml packages/design/docs
# Copy new contents
cp -r /tmp/duskmoon-design/tokens packages/design/tokens
cp -r /tmp/duskmoon-design/scripts packages/design/scripts
cp -r /tmp/duskmoon-design/generated packages/design/generated
cp /tmp/duskmoon-design/codegen.yaml packages/design/codegen.yaml
cp /tmp/duskmoon-design/package.json packages/design/package.json
# Copy docs and config files if present
cp /tmp/duskmoon-design/CLAUDE.md packages/design/CLAUDE.md 2>/dev/null || true
cp /tmp/duskmoon-design/README.md packages/design/README.md 2>/dev/null || true
cp /tmp/duskmoon-design/PRD.md packages/design/PRD.md 2>/dev/null || true
# Cleanup
rm -rf /tmp/duskmoon-design
```

- [ ] **Step 3: Verify design package**

```bash
cd packages/design && bun install && bun run validate
```

Expected: validation passes, no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/design/
git commit -m "chore(design): update to v2.0 — OKLCH, 5 themes, ThemeShape"
```

---

## Task 2: Run Codegen and Copy Outputs to Core

**Files:**
- Create: `packages/core/src/themes/generated/ocean.css`
- Create: `packages/core/src/themes/generated/forest.css`
- Create: `packages/core/src/themes/generated/sunset.css`
- Create: `packages/core/src/themes/generated/ts/` (entire directory)
- Update: `packages/core/src/themes/generated/sunshine.css`
- Update: `packages/core/src/themes/generated/moonlight.css`
- Update: `packages/core/src/themes/generated/spacing.css`
- Delete: `packages/core/src/themes/generated/sunshine.generated.ts`
- Delete: `packages/core/src/themes/generated/moonlight.generated.ts`
- Delete: `packages/core/src/themes/generated/spacing.generated.ts`
- Delete: `packages/core/src/themes/generated/typography.generated.ts`

- [ ] **Step 1: Run codegen**

```bash
cd packages/design && bun run generate
```

Expected: generates files in `packages/design/generated/` including `ts/` subdirectory.

- [ ] **Step 2: Remove old v1 TS files from core**

```bash
rm -f packages/core/src/themes/generated/sunshine.generated.ts
rm -f packages/core/src/themes/generated/moonlight.generated.ts
rm -f packages/core/src/themes/generated/spacing.generated.ts
rm -f packages/core/src/themes/generated/typography.generated.ts
```

- [ ] **Step 3: Copy CSS outputs to core**

```bash
cp packages/design/generated/sunshine.css packages/core/src/themes/generated/sunshine.css
cp packages/design/generated/moonlight.css packages/core/src/themes/generated/moonlight.css
cp packages/design/generated/ocean.css packages/core/src/themes/generated/ocean.css
cp packages/design/generated/forest.css packages/core/src/themes/generated/forest.css
cp packages/design/generated/sunset.css packages/core/src/themes/generated/sunset.css
cp packages/design/generated/spacing.css packages/core/src/themes/generated/spacing.css
```

- [ ] **Step 4: Copy TS outputs to core**

```bash
mkdir -p packages/core/src/themes/generated/ts
cp packages/design/generated/ts/types.ts packages/core/src/themes/generated/ts/types.ts
cp packages/design/generated/ts/sunshine.generated.ts packages/core/src/themes/generated/ts/sunshine.generated.ts
cp packages/design/generated/ts/moonlight.generated.ts packages/core/src/themes/generated/ts/moonlight.generated.ts
cp packages/design/generated/ts/ocean.generated.ts packages/core/src/themes/generated/ts/ocean.generated.ts
cp packages/design/generated/ts/forest.generated.ts packages/core/src/themes/generated/ts/forest.generated.ts
cp packages/design/generated/ts/sunset.generated.ts packages/core/src/themes/generated/ts/sunset.generated.ts
cp packages/design/generated/ts/spacing.generated.ts packages/core/src/themes/generated/ts/spacing.generated.ts
cp packages/design/generated/ts/typography.generated.ts packages/core/src/themes/generated/ts/typography.generated.ts
```

- [ ] **Step 5: Verify generated files**

```bash
# Check that all expected files exist
ls -la packages/core/src/themes/generated/*.css
ls -la packages/core/src/themes/generated/ts/*.ts
# Verify v2.0 headers
head -3 packages/core/src/themes/generated/sunshine.css
head -3 packages/core/src/themes/generated/ts/sunshine.generated.ts
```

Expected: 6 CSS files, 8 TS files, all with `duskmoon-codegen v2.0.0` header.

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/themes/generated/
git commit -m "chore(core): regenerate theme tokens from design v2.0

OKLCH format, 5 themes, ThemeShape tokens, types.ts generated."
```

---

## Task 3: Update Theme Index Files

**Files:**
- Modify: `packages/core/src/themes/index.css`
- Modify: `packages/core/src/themes/index.ts`

- [ ] **Step 1: Update `src/themes/index.css`**

Replace the full content of `packages/core/src/themes/index.css` with:

```css
/**
 * Built-in themes
 * Generated from @duskmoon-dev/design YAML tokens
 */

@import "./generated/sunshine.css";
@import "./generated/moonlight.css";
@import "./generated/ocean.css";
@import "./generated/forest.css";
@import "./generated/sunset.css";
@import "./generated/spacing.css";
```

- [ ] **Step 2: Update `src/themes/index.ts`**

Replace the full content of `packages/core/src/themes/index.ts` with:

```typescript
/**
 * DuskMoonUI Themes
 * Generated from @duskmoon-dev/design YAML tokens (v2.0 — OKLCH)
 */

import { sunshineColors } from './generated/ts/sunshine.generated';
import { moonlightColors } from './generated/ts/moonlight.generated';
import { oceanColors } from './generated/ts/ocean.generated';
import { forestColors } from './generated/ts/forest.generated';
import { sunsetColors } from './generated/ts/sunset.generated';
import type { ThemeColors } from './generated/ts/types';

// Re-export types from generated types.ts
export type { ThemeColors, ThemeShape, OklchColor } from './generated/ts/types';

// Re-export individual theme colors + shapes
export { sunshineColors, sunshineShape } from './generated/ts/sunshine.generated';
export { moonlightColors, moonlightShape } from './generated/ts/moonlight.generated';
export { oceanColors, oceanShape } from './generated/ts/ocean.generated';
export { forestColors, forestShape } from './generated/ts/forest.generated';
export { sunsetColors, sunsetShape } from './generated/ts/sunset.generated';

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
  sunset: sunsetColors,
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
```

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/themes/index.css packages/core/src/themes/index.ts
git commit -m "feat(themes): add ocean, forest, sunset themes and update imports to v2.0"
```

---

## Task 4: Update Type Definitions

**Files:**
- Modify: `packages/core/src/types/theme.ts`
- Modify: `packages/core/src/types/index.ts`
- Modify: `packages/core/src/types/plugin.ts`

- [ ] **Step 1: Rewrite `src/types/theme.ts`**

Replace the full content of `packages/core/src/types/theme.ts` with:

```typescript
/**
 * Theme Configuration Types
 * Re-exports generated types + defines helper types for plugin API
 */

// Re-export codegen-generated types as the source of truth
export type { ThemeColors, ThemeShape, OklchColor } from '../themes/generated/ts/types';

/**
 * @deprecated Use OklchColor instead — kept for backwards compatibility
 */
export type HSLColor = string;

/**
 * Color scheme preference
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Theme definition structure
 * Defines all color tokens for a theme
 */
export interface ThemeDefinition {
  name: string;
  colorScheme: ColorScheme;
  default?: boolean;
  prefersDark?: boolean;
  colors: import('../themes/generated/ts/types').ThemeColors;
}

/**
 * Partial theme colors for custom theme definitions
 * Allows overriding only specific tokens
 */
export type PartialThemeColors = Partial<import('../themes/generated/ts/types').ThemeColors>;

/**
 * Theme configuration for plugin
 */
export type ThemeConfig = string | {
  [themeName: string]: PartialThemeColors;
};

/**
 * Validation result for theme colors
 */
export interface ThemeValidationResult {
  valid: boolean;
  errors: ThemeValidationError[];
  warnings: ThemeValidationWarning[];
}

export interface ThemeValidationError {
  token: string;
  message: string;
  value?: string;
}

export interface ThemeValidationWarning {
  token: string;
  message: string;
  value?: string;
  suggestion?: string;
}
```

- [ ] **Step 2: Update `src/types/index.ts`**

Replace the full content of `packages/core/src/types/index.ts` with:

```typescript
/**
 * DuskMoonUI Type Definitions
 * Main export file for all TypeScript types
 */

// Plugin configuration types
export type {
  PluginConfig,
  BuiltInTheme,
  ComponentName,
  ComponentSize,
  ComponentColorVariant,
  ComponentStyleVariant,
  InteractiveState,
} from './plugin';

// Theme configuration types
export type {
  OklchColor,
  HSLColor,
  ColorScheme,
  ThemeDefinition,
  ThemeColors,
  ThemeShape,
  PartialThemeColors,
  ThemeConfig,
  ThemeValidationResult,
  ThemeValidationError,
  ThemeValidationWarning,
} from './theme';

/**
 * Re-export types for backwards compatibility
 * @deprecated Use specific imports from './plugin' or './theme'
 */
export type DuskMoonUIOptions = import('./plugin').PluginConfig;
export type ThemeName = import('./plugin').BuiltInTheme;
export type CustomTheme = import('./theme').PartialThemeColors;
```

- [ ] **Step 3: Update `src/types/plugin.ts` BuiltInTheme**

In `packages/core/src/types/plugin.ts`, change the `BuiltInTheme` type on line 9:

```typescript
// Before:
export type BuiltInTheme = 'sunshine' | 'moonlight';

// After:
export type BuiltInTheme = 'sunshine' | 'moonlight' | 'ocean' | 'forest' | 'sunset';
```

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/types/
git commit -m "feat(types): migrate to generated types — OklchColor, ThemeShape, 5 themes"
```

---

## Task 5: Update colors.css @theme Block

**Files:**
- Modify: `packages/core/src/base/colors.css`

- [ ] **Step 1: Update header comment**

In `packages/core/src/base/colors.css`, change line 3:

```css
/* Before: */
 * Format: HSL from codegen (e.g., "hsl(38 92% 50%)")

/* After: */
 * Format: OKLCH from codegen (e.g., "oklch(72% 0.17 75)")
```

- [ ] **Step 2: Remove focus tokens from @theme block**

Remove these 5 lines from the `@theme` block (and their comments):

```css
  --color-primary-focus: initial;
  --color-secondary-focus: initial;
  --color-tertiary-focus: initial;
  --color-accent-focus: initial;
  --color-neutral-focus: initial;
```

Also update the brand colors section comment from `(15 tokens — includes focus from codegen)` to `(12 tokens)`.

Update the accent section comment from `(3 tokens)` to `(2 tokens)`.

Update the neutral section comment from `(4 tokens)` to `(3 tokens)`.

- [ ] **Step 3: Add ThemeShape tokens to @theme block**

Add this new section before the closing `}` of the `@theme` block (after the radius section, before closing brace):

```css
  /* ============================================
   * THEME SHAPE TOKENS (8 tokens)
   * Per-theme shape values from codegen
   * ============================================ */

  --radius-selector: initial;
  --radius-field: initial;
  --radius-box: initial;
  --size-selector: initial;
  --size-field: initial;
  --border: initial;
  --depth: initial;
  --noise: initial;
```

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/base/colors.css
git commit -m "feat(colors): remove focus tokens, add ThemeShape tokens, update to OKLCH"
```

---

## Task 6: Update Tailwind Plugin

**Files:**
- Modify: `packages/core/src/tailwind-plugin.ts`

- [ ] **Step 1: Remove focus token mappings**

In `packages/core/src/tailwind-plugin.ts`, remove these 5 lines from the `themeColors` object:

```typescript
  'primary-focus': 'var(--color-primary-focus)',
  'secondary-focus': 'var(--color-secondary-focus)',
  'tertiary-focus': 'var(--color-tertiary-focus)',
  'accent-focus': 'var(--color-accent-focus)',
  'neutral-focus': 'var(--color-neutral-focus)',
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/tailwind-plugin.ts
git commit -m "fix(plugin): remove stale focus token mappings"
```

---

## Task 7: Update package.json and index.ts Exports

**Files:**
- Modify: `packages/core/package.json`
- Modify: `packages/core/src/index.ts`

- [ ] **Step 1: Add theme exports to package.json**

In `packages/core/package.json`, after the `"./themes/moonlight"` entry (line 23-24), add:

```json
    "./themes/ocean": {
      "style": "./dist/themes/generated/ocean.css"
    },
    "./themes/forest": {
      "style": "./dist/themes/generated/forest.css"
    },
    "./themes/sunset": {
      "style": "./dist/themes/generated/sunset.css"
    },
```

- [ ] **Step 2: Update default themes in `src/index.ts`**

In `packages/core/src/index.ts`, update the `defaultOptions` object (around line 14-22):

```typescript
// Before:
const defaultOptions: DuskMoonUIOptions = {
  themes: ['sunshine', 'moonlight'],
  darkTheme: 'moonlight',
  // ...
};

// After:
const defaultOptions: DuskMoonUIOptions = {
  themes: ['sunshine', 'moonlight', 'ocean', 'forest', 'sunset'],
  darkTheme: 'moonlight',
  // ...
};
```

Note: The `darkTheme` property name may differ — check the actual `PluginConfig` interface. Only change the `themes` array.

- [ ] **Step 3: Commit**

```bash
git add packages/core/package.json packages/core/src/index.ts
git commit -m "feat: add ocean, forest, sunset to package exports and default config"
```

---

## Task 8: Build and Fix TypeScript Errors

**Files:**
- Potentially modify: any file with type errors

- [ ] **Step 1: Run TypeScript type check**

```bash
cd packages/core && bun run tsc --noEmit 2>&1 | head -50
```

Expected: may have errors from import path changes or type name changes. Fix any that appear.

Common issues to watch for:
- `ThemeColors` import path changes (should come from `./themes/generated/ts/types` now via re-export chain)
- `HSLColor` references that need updating to `OklchColor` (though `HSLColor` is kept as deprecated alias)
- Missing exports in the re-export chain

- [ ] **Step 2: Run the full build**

```bash
bun run build:core
```

Expected: build succeeds with zero errors.

- [ ] **Step 3: Fix any build errors and commit**

```bash
git add -u packages/core/
git commit -m "fix: resolve type and build errors from v2.0 migration"
```

---

## Task 9: Run Tests and Fix Failures

**Files:**
- Test: `packages/core/tests/unit/`

- [ ] **Step 1: Run unit tests**

```bash
cd packages/core && bun test tests/unit 2>&1 | tail -30
```

Expected: most tests pass. Potential failures:
- `colors.test.ts` — may check for focus tokens or HSL format
- `config.test.ts` — may check default theme list
- Tests checking `ThemeColors` type shape

- [ ] **Step 2: Fix any test failures**

For each failing test, check if it tests:
1. Focus tokens (remove those assertions)
2. HSL format strings (update to OKLCH format)
3. Theme list (add ocean/forest/sunset)
4. Token count (update to 62 from 67)

- [ ] **Step 3: Re-run tests to confirm all pass**

```bash
cd packages/core && bun test tests/unit
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add packages/core/tests/
git commit -m "test: update unit tests for v2.0 token set"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Clean build from scratch**

```bash
rm -rf packages/core/dist && bun run build:core
```

Expected: build succeeds.

- [ ] **Step 2: Verify dist output**

```bash
# All 5 theme CSS files present
ls packages/core/dist/themes/generated/*.css

# Check sunshine has OKLCH values
head -10 packages/core/dist/themes/generated/sunshine.css

# Check new themes exist
head -5 packages/core/dist/themes/generated/ocean.css
```

Expected: 6 CSS files (5 themes + spacing), OKLCH format in values.

- [ ] **Step 3: Verify no focus tokens remain**

```bash
grep -r "focus" packages/core/src/base/colors.css packages/core/src/tailwind-plugin.ts | grep -v "color-mix" | grep -v "//"
```

Expected: no output (all focus references removed except color-mix utilities).

- [ ] **Step 4: Run full test suite one more time**

```bash
cd packages/core && bun test tests/unit
```

Expected: all pass.

- [ ] **Step 5: Final commit if any remaining changes**

```bash
git status
# If any unstaged changes:
git add -u packages/core/
git commit -m "chore: final cleanup for design token v2.0 migration"
```

---

*End of plan*
