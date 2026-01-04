# Implementation Plan: Markdown Body Component

**Branch**: `001-markdown-body` | **Date**: 2026-01-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-markdown-body/spec.md`

## Summary

Add a new `.markdown-body` CSS component that provides GitHub-style typography and element styling for rendered markdown content. The component uses DuskMoonUI's OKLCH color system and CSS custom properties, automatically adapting to sunshine/moonlight themes. Implementation is pure CSS using Tailwind v4's `@layer components` with no JavaScript runtime.

## Technical Context

**Language/Version**: CSS3 with Tailwind CSS v4.0.0+
**Primary Dependencies**: Tailwind CSS v4, @duskmoon-dev/core (color tokens)
**Storage**: N/A (CSS-only component)
**Testing**: Visual inspection, Playwright visual regression tests
**Target Platform**: Modern browsers (Chrome 88+, Firefox 89+, Safari 14.1+)
**Project Type**: Single package (packages/core)
**Performance Goals**: CSS file size <15KB uncompressed
**Constraints**: No JavaScript runtime, WCAG AA contrast compliance, logical properties for RTL support
**Scale/Scope**: Single CSS component file (~300-500 lines)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Design System First | ✅ PASS | Uses DuskMoonUI color tokens exclusively (--color-on-surface, --color-primary, etc.) |
| I. OKLCH Color Format | ✅ PASS | References existing OKLCH tokens, no new color definitions |
| II. Tailwind-Native | ✅ PASS | Uses @layer components, CSS custom properties |
| II. Logical Properties | ✅ PASS | Will use margin-block, padding-inline, etc. for all spacing |
| III. Component Independence | ✅ PASS | Single CSS file, opt-in import, no dependencies on other components |
| IV. Type Safety & DX | ✅ PASS | CSS-only, no TypeScript types needed for this component |
| V. Zero Runtime | ✅ PASS | Pure CSS, no JavaScript |
| VI. Documentation as Code | ⏳ PENDING | Docs page to be created during implementation |
| VII. Accessibility | ✅ PASS | Uses existing accessible color tokens, proper contrast ratios |

**Gate Result**: PASS - All core principles satisfied. Documentation pending implementation.

## Project Structure

### Documentation (this feature)

```text
specs/001-markdown-body/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # N/A (CSS-only)
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (CSS-only)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/core/
├── src/
│   ├── components/
│   │   ├── index.css           # Add @import for markdown-body
│   │   └── markdown-body.css   # NEW: Main component file
│   └── index.css               # Main entry (already imports components)
├── scripts/
│   └── build-css.ts            # Update to include markdown-body in exports
└── package.json                # Add export for markdown-body

packages/docs/
└── src/
    └── content/
        └── docs/
            └── en/
                └── components/
                    └── markdown-body.mdx  # NEW: Documentation page
```

**Structure Decision**: Single package structure. The markdown-body component is a single CSS file added to the existing `packages/core/src/components/` directory, following the established pattern for all DuskMoonUI components.

## Complexity Tracking

> No violations - all constitution principles satisfied.

N/A - No complexity justifications needed.
