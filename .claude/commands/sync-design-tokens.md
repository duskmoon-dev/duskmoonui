# Sync Design Tokens

Pull the latest design tokens from the `duskmoon-dev/design` GitHub repo and propagate changes through `packages/core`. This is the single command to run whenever the remote design repo has been updated.

## What This Does

1. Pulls the latest `packages/design/` from `duskmoon-dev/design` (main branch)
2. Runs codegen to regenerate CSS + TypeScript theme files
3. Copies generated outputs into `packages/core/src/themes/generated/`
4. Updates all hand-maintained files in core to match the new token set
5. Builds, tests, and commits

## Execution Flow

### 1. Pull Remote Design Repo

```bash
gh repo clone duskmoon-dev/design /tmp/duskmoon-design -- --depth=1
```

Replace the contents of `packages/design/` with the remote version. Copy these directories and files:

- `tokens/`, `scripts/`, `generated/`, `codegen.yaml`, `package.json`
- Optional: `CLAUDE.md`, `README.md`, `PRD.md`, `.gitignore`

Clean up: `rm -rf /tmp/duskmoon-design`

Install deps: `cd packages/design && bun install`

Commit: `git add packages/design/ && git commit -m "chore(design): sync from remote duskmoon-dev/design"`

### 2. Diff the Token Set

Before copying files, compare the new generated types against the current core types to detect:

- **Added tokens** (new CSS custom properties the @theme block needs)
- **Removed tokens** (properties to remove from @theme, tailwind-plugin, utility classes)
- **Renamed tokens** (properties that changed names)
- **New themes** (theme YAML files that don't have corresponding CSS in core yet)
- **Removed themes** (themes that no longer exist in design)
- **Type changes** (e.g., HSLColor -> OklchColor, new interfaces like ThemeShape)

Compare `packages/design/generated/ts/types.ts` against `packages/core/src/themes/generated/ts/types.ts` (or `packages/core/src/types/theme.ts` if the generated types file doesn't exist yet).

List all changes before proceeding.

### 3. Copy Generated Outputs to Core

Remove any old generated TS files that are no longer in the design output (e.g., if files moved to a `ts/` subdirectory).

Copy CSS files:
```
packages/design/generated/*.css -> packages/core/src/themes/generated/
```

Copy TS files:
```
packages/design/generated/ts/*.ts -> packages/core/src/themes/generated/ts/
```

Verify all files have the correct codegen version header.

Commit: `git add packages/core/src/themes/generated/ && git commit -m "chore(core): regenerate theme tokens from design"`

### 4. Update Hand-Maintained Files

Based on the diff from step 2, update these files:

#### `packages/core/src/themes/index.css`
- Add `@import` for any new theme CSS files
- Remove `@import` for any deleted theme CSS files

#### `packages/core/src/themes/index.ts`
- Add/remove theme imports and exports to match the generated files
- Update import paths if the generated file structure changed
- Update the `themes` object, `getTheme()`, and `hasTheme()` to include all themes
- Re-export any new types from the generated `types.ts`

#### `packages/core/src/types/theme.ts`
- Re-export types from `../themes/generated/ts/types` (the generated types are the source of truth)
- Add deprecated aliases for any removed type names (backwards compatibility)
- Update `ThemeDefinition`, `PartialThemeColors`, etc. to reference generated types

#### `packages/core/src/types/index.ts`
- Add re-exports for any new types added to `theme.ts`

#### `packages/core/src/types/plugin.ts`
- Update the `BuiltInTheme` union type to match the set of available themes

#### `packages/core/src/base/colors.css`
- **@theme block**: Add/remove CSS custom property declarations to match the generated token set
- **Header comment**: Update format description if color format changed
- **Section comments**: Update token counts
- **Utility classes**: Add/remove utility classes for new/removed tokens

#### `packages/core/src/tailwind-plugin.ts`
- Add/remove token mappings in the `themeColors` object to match the generated token set
- Each entry should be `'token-name': 'var(--color-token-name)'`

#### `packages/core/src/index.ts`
- Update `defaultOptions.themes` array to include all available themes

#### `packages/core/package.json`
- Add/remove `"./themes/{name}"` export entries for each theme
- Each entry: `{ "style": "./dist/themes/generated/{name}.css" }`

#### `packages/core/scripts/build-css.ts`
- Update the `generatedThemeFiles` array to include all theme CSS filenames

Commit each logical group of changes separately with conventional commit messages.

### 5. Build and Test

```bash
bun run build:core
```

Verify:
- Build succeeds with zero errors
- All theme CSS files are present in `dist/themes/generated/`
- Theme CSS files contain the correct color format values

```bash
cd packages/core && bun test tests/unit
```

Fix any test failures caused by:
- Changed token names or counts in test assertions
- Changed color format strings in test expectations
- Changed theme list in config tests
- Stale test patterns from previous component migrations

Commit test fixes: `git commit -m "test: update unit tests for design token sync"`

### 6. Final Verification

```bash
# Clean rebuild
rm -rf packages/core/dist && bun run build:core

# Verify no stale tokens
grep -r "tokens-that-were-removed" packages/core/src/base/colors.css packages/core/src/tailwind-plugin.ts

# All tests pass
cd packages/core && bun test tests/unit
```

## Important Notes

- The generated files in `packages/core/src/themes/generated/` are **never hand-edited** — they come from codegen
- The `types.ts` in `generated/ts/` is the **source of truth** for TypeScript types — `src/types/theme.ts` re-exports from it
- Components use `var(--color-*)` which is format-agnostic — color format changes (e.g., HSL -> OKLCH) don't affect component CSS
- Focus states use `color-mix()` not dedicated tokens — if focus tokens appear/disappear, components are unaffected
- The build script `scripts/build-css.ts` has a hardcoded theme file list that must match the generated CSS files
