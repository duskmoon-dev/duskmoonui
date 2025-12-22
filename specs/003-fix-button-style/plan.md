# Implementation Plan: Fix Button Style

**Branch**: `003-fix-button-style` | **Date**: 2024-12-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-fix-button-style/spec.md`

## Summary

Fix button component styles to resolve three critical issues: (1) colors not displaying correctly due to incorrect CSS variable syntax, (2) class name mismatches between CSS implementation and documentation, and (3) missing accessibility support via `prefers-reduced-motion`. The technical approach involves updating color declarations to use `hsl(var(--color-*))` syntax, adding class aliases for documented names, and adding the missing tonal variant.

## Technical Context

**Language/Version**: CSS3 with Tailwind CSS v4, TypeScript 5.6+
**Primary Dependencies**: Tailwind CSS v4, @duskmoon-dev/core
**Storage**: N/A (CSS-only changes)
**Testing**: Visual inspection, browser dev tools for computed styles
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Monorepo (packages/core for CSS, packages/docs for documentation)
**Performance Goals**: N/A (CSS fixes only)
**Constraints**: Must maintain backward compatibility with existing class names
**Scale/Scope**: Single CSS file modification (~50-100 lines of changes)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Maintains three-color system integrity (Principle I) | ✅ PASS | Fixes color system - does not change token structure |
| Uses Tailwind v4 native syntax (Principle II) | ✅ PASS | Uses `@layer components` pattern |
| No runtime dependencies added (Principle V) | ✅ PASS | CSS-only changes |
| Type definitions exported (Principle IV) | N/A | No TypeScript changes required |
| Documentation included in packages/docs (Principle VI) | ✅ PASS | Docs already exist, CSS must match |
| Accessibility tested (Principle VII) | ✅ PASS | Adding `prefers-reduced-motion` support |
| Uses Bun exclusively (Runtime & Package Manager) | ✅ PASS | Build/test uses Bun |

## Project Structure

### Documentation (this feature)

```text
specs/003-fix-button-style/
├── plan.md              # This file
├── research.md          # Color system analysis
└── quickstart.md        # Implementation checklist
```

### Source Code (repository root)

```text
packages/
├── core/
│   └── src/
│       └── components/
│           └── button.css   # PRIMARY FILE TO MODIFY
└── docs/
    └── src/
        └── content/
            └── docs/
                └── en/
                    └── components/
                        └── button.mdx   # Documentation (reference only)
```

**Structure Decision**: This is a CSS bugfix affecting a single component file. Changes are isolated to `packages/core/src/components/button.css`. Documentation already uses the correct class names.

## Key Findings from Research

### Issue 1: Color Variable Syntax

**Problem**: Theme CSS variables store HSL values as space-separated strings (e.g., `30 90% 55%`), but button.css uses `var(--color-primary)` directly without wrapping in `hsl()`.

**Evidence**:
- `sunshine.css:15`: `--color-primary: 30 90% 55%;`
- `button.css:56`: `background-color: var(--color-primary);` ❌ BROKEN

**Solution**: Use `hsl(var(--color-*))` syntax for all color properties.

**Reference**: Other components like `switch.css:181` and `toast.css:164` correctly use:
```css
background-color: hsl(var(--color-success));
```

### Issue 2: Class Name Mismatches

| Documentation Uses | CSS Has | Action Required |
|-------------------|---------|-----------------|
| `.btn-outlined` | `.btn-outline` | Add alias |
| `.btn-text` | `.btn-ghost` | Add alias |
| `.btn-tonal` | (missing) | Add new variant |
| `.btn-md` | (missing) | Add explicit medium size |

### Issue 3: Missing Accessibility

**Problem**: Button.css lacks `prefers-reduced-motion` media query.

**Reference**: Other components include this:
```css
@media (prefers-reduced-motion: reduce) {
  .component { transition: none; }
}
```

## Complexity Tracking

> No constitution violations - this is a straightforward CSS bugfix.
