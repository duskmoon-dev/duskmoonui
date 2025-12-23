# Implementation Plan: Component Padding with Logical Properties

**Branch**: `005-component-padding` | **Date**: 2025-12-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-component-padding/spec.md`

## Summary

Migrate button and card component padding to use CSS custom properties (`--btn-p`, `--card-p`) with logical CSS properties (`padding-inline`, `padding-block`) following the DaisyUI 5 pattern. This enables RTL support and theming flexibility while maintaining current visual appearance in LTR layouts.

## Technical Context

**Language/Version**: CSS3 with Tailwind CSS v4.0.0+
**Primary Dependencies**: Tailwind CSS v4, @duskmoon-dev/core
**Storage**: N/A (CSS-only changes)
**Testing**: Playwright visual regression tests, Bun unit tests
**Target Platform**: Modern browsers (Chrome 88+, Firefox 78+, Safari 14+, Edge 88+)
**Project Type**: CSS component library (monorepo)
**Performance Goals**: No runtime overhead (pure CSS)
**Constraints**: Must maintain visual parity with current LTR layouts
**Scale/Scope**: 2 components (button, card), ~10 CSS rule modifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Design System First | ✅ PASS | No color changes, preserves existing design |
| II. Tailwind-Native Architecture | ✅ PASS | Uses `@layer components`, CSS variables, logical properties |
| II. Logical Properties for Spacing | ✅ PASS | Primary goal of this feature |
| III. Component Independence | ✅ PASS | Button and card remain independently testable |
| IV. Type Safety & DX | ✅ PASS | No TypeScript changes required (CSS-only) |
| V. Zero Runtime Dependencies | ✅ PASS | Pure CSS, no JS runtime |
| VI. Documentation as Code | ⏳ DEFER | Doc updates after implementation |
| VII. Accessibility by Default | ✅ PASS | Improves RTL accessibility |

**Gate Status**: PASSED - proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/005-component-padding/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/core/
├── src/
│   ├── components/
│   │   ├── button.css    # Modify: add --btn-p, use padding-inline/block
│   │   └── card.css      # Modify: add --card-p, use padding shorthand
│   └── base/
│       └── colors.css    # No changes
└── tests/
    ├── unit/
    │   ├── button.test.ts  # Add: padding variable tests
    │   └── card.test.ts    # Add: padding variable tests
    └── visual/
        ├── button.spec.ts  # Existing: verify no visual regression
        └── card.spec.ts    # Existing: verify no visual regression
```

**Structure Decision**: Monorepo structure with changes isolated to `packages/core/src/components/` CSS files.

## Complexity Tracking

> No constitution violations - no complexity justification needed.
