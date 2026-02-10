# Update Project Documentation



Scan the current codebase and update all files in `./docs/` to reflect the actual state of the project. Do NOT add or remove doc files — only update existing ones in-place.

## Execution Flow

### 1. Discover Current State

Scan these source directories to build a picture of the current codebase:

```
packages/core/src/components/    → list all *.css files (component inventory)
packages/core/src/themes/        → list all *.css and *.ts files (available themes)
packages/core/src/base/          → read colors.css and utilities.css (color tokens, utilities)
packages/core/src/types/         → read type definitions (ThemeColors, etc.)
packages/core/package.json       → read version, exports, dependencies
```

Collect:
- **Component list**: all `.css` files in `components/`, grouped by category
- **Component count**: total number of components
- **Theme list**: all themes with their color token summaries
- **Color token list**: all `--color-*` tokens from `base/colors.css`
- **Utility classes**: grid utilities, accessibility utilities from `base/utilities.css`
- **Package exports**: what paths are exported in `package.json`
- **Available commands**: build, test, dev commands from root and package `package.json`

### 2. Update `docs/development.md`

Read the existing `docs/development.md`, then update these sections in-place while preserving the overall document structure and prose style:

| Section | What to update |
|---------|---------------|
| **Component Overview** | Update component count, category table, and component files tree to match actual `src/components/` contents |
| **Layout Utilities** | Update available grid sizes and utility classes from `base/utilities.css` |
| **Accessibility Utilities** | Update from `base/utilities.css` |
| **Project Structure** | Update directory tree to reflect any new/removed directories |
| **Development Commands** | Cross-check against `package.json` scripts and update |
| **Installation** | Update if package name or peer dependencies changed |
| **Potential Future Components** | Remove any that have since been implemented |

Do NOT rewrite sections that are already accurate. Only change what is out of date.

### 3. Update `docs/duskmoon-dev-core/SKILL.md`

Use the `skill-creator` skill to update `docs/duskmoon-dev-core/SKILL.md`. This skill file is designed for AI agents to learn how to install, configure, and use the `@duskmoon-dev/core` package. Invoke the skill-creator with the current codebase state so it can update the following sections:

| Section | What to update |
|---------|---------------|
| **Available Components** | Update the full component listing grouped by category — ensure every component in `src/components/` is listed with its key CSS classes |
| **Import Paths Table** | Update the "Available Component Exports" table to match actual `package.json` exports |
| **Usage Examples** | Keep existing examples but add examples for any new components not yet covered |
| **Color System** | Update if new color tokens or utilities were added |
| **Theme Configuration** | Update if new themes were added |

For each component, list its primary class and key variant classes by reading the actual CSS file to find class selectors.

### 4. Validation

After updating, verify:
- Every `.css` file in `src/components/` is mentioned in both `docs/development.md` and `docs/duskmoon-dev-core/SKILL.md`
- No component is listed that doesn't exist in the source
- Component count number matches the actual file count
- All import paths listed actually exist in `package.json` exports
- All commands listed actually exist in `package.json` scripts

Report any discrepancies found.

### 5. Summary

Output a summary of changes made:
```
Updated docs/development.md:
  - Component count: 45 → 47
  - Added: tree-select, multi-select
  - Removed: (none)

Updated docs/duskmoon-dev-core/SKILL.md (via skill-creator):
  - Added component entries: tree-select, multi-select
  - Updated import paths table
  - No example changes needed

Validation: All checks passed
```
