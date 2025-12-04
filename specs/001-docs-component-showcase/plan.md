# Implementation Plan: Documentation Component Showcase Enhancement

**Branch**: `001-docs-component-showcase` | **Date**: 2025-12-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-docs-component-showcase/spec.md`

## Summary

This feature addresses two issues in the documentation site:
1. **Centering fix**: The `/duskmoonui/components/` page content is not properly centered
2. **ComponentShowcase adoption**: Update all 42 component MDX files to use the existing `ComponentShowcase` component for interactive preview/code tabs (currently only Button uses it)

**Technical approach**: This is primarily a content migration task. The `ComponentShowcase` Astro component already exists and is functional. The work involves:
- Diagnosing and fixing the CSS centering issue on the components index page
- Converting static markdown code blocks (```html) to `<ComponentShowcase>` components in all MDX files
- Preserving framework-specific examples (React/Vue) as static code blocks

## Technical Context

**Language/Version**: TypeScript 5.6+, Astro 5.0, MDX
**Primary Dependencies**: Astro.js, Tailwind CSS v4, @duskmoon-dev/core
**Storage**: N/A (static site generation)
**Testing**: Playwright for e2e tests, visual inspection for layout
**Target Platform**: Static web (GitHub Pages)
**Project Type**: Monorepo documentation site (`packages/docs`)
**Performance Goals**: Tab switching < 1 second (already met by existing component)
**Constraints**: Must work without JavaScript (progressive enhancement), WCAG AA accessibility
**Scale/Scope**: 42 component MDX files, ~300+ code examples to convert

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Design System First | ✅ PASS | No changes to color system; documentation only |
| II. Tailwind-Native Architecture | ✅ PASS | Using existing Astro/Tailwind v4 components |
| III. Component Independence | ✅ PASS | No new components; reusing ComponentShowcase |
| IV. Type Safety & DX | ✅ PASS | MDX with typed Astro components |
| V. Zero Runtime Dependencies | ✅ PASS | ComponentShowcase uses vanilla JS for tabs |
| VI. Documentation as Code | ✅ PASS | **This IS the documentation improvement** |
| VII. Accessibility by Default | ✅ PASS | ComponentShowcase has ARIA tabs, keyboard nav |

**Gate Result**: ✅ PASSED - No violations. This feature directly supports Principle VI.

## Project Structure

### Documentation (this feature)

```text
specs/001-docs-component-showcase/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - no data entities)
├── quickstart.md        # Phase 1 output (migration guide)
├── contracts/           # Phase 1 output (N/A - no APIs)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/docs/
├── src/
│   ├── components/
│   │   └── showcase/
│   │       ├── ComponentShowcase.astro  # Existing - reuse as-is
│   │       └── CodeBlock.astro          # Existing - reuse as-is
│   ├── content/
│   │   └── docs/
│   │       └── en/
│   │           └── components/          # 42 MDX files to update
│   │               ├── accordion.mdx
│   │               ├── alert.mdx
│   │               ├── button.mdx       # Reference implementation
│   │               ├── card.mdx         # Needs conversion
│   │               ├── chip.mdx         # Needs conversion
│   │               └── ... (39 more)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── DocsLayout.astro
│   ├── pages/
│   │   ├── components/
│   │   │   └── index.astro              # Centering fix needed
│   │   └── docs/
│   │       └── [...slug].astro
│   └── styles/
│       ├── global.css
│       ├── pages.css                    # May need centering fix
│       └── themes.css
└── tests/
    ├── code-examples.spec.ts
    └── docs-a11y.spec.ts
```

**Structure Decision**: Using existing `packages/docs` structure. No new directories needed.

## Complexity Tracking

> No Constitution violations - this section is empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
