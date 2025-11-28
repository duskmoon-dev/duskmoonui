# Implementation Plan: Tabbed Code Block with Preview

**Branch**: `001-docs-code-preview-tabs` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-docs-code-preview-tabs/spec.md`

## Summary

Update the `ComponentShowcase` component in `packages/docs/` to replace the vertical preview+code layout with a tabbed interface. Users can toggle between "Preview" and "Code" tabs, with "Preview" as the default. The implementation uses Astro components with client-side JavaScript for tab switching and leverages DuskMoonUI's own CSS variables for styling.

## Technical Context

**Language/Version**: TypeScript 5.6+, Astro 5.0+
**Primary Dependencies**: Astro.js, @astrojs/react, Tailwind CSS v4, @duskmoon-dev/core
**Storage**: N/A (no data persistence required)
**Testing**: Playwright for integration tests, manual visual testing
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - modern versions)
**Project Type**: Web (documentation site within monorepo)
**Performance Goals**: Tab switching < 100ms, no increase in LCP > 200ms
**Constraints**: Must maintain backward compatibility with existing 50+ MDX files, must use Astro components (not React by default)
**Scale/Scope**: ~50 documentation pages with ComponentShowcase instances

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Design System First | PASS | Uses DuskMoonUI color tokens for tab styling |
| II. Tailwind-Native Architecture | PASS | Uses Tailwind CSS v4 with @import syntax |
| III. Component Independence | PASS | ComponentShowcase is self-contained |
| IV. Type Safety & Developer Experience | PASS | Will maintain TypeScript Props interface |
| V. Zero Runtime Dependencies | PASS | Only vanilla JS for tab switching |
| VI. Documentation as Code | PASS | This IS the documentation enhancement |
| VII. Accessibility by Default | PASS | Will implement ARIA attributes for tabs |

**Pre-Phase 0 Gate**: PASSED - No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-docs-code-preview-tabs/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - UI component)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature)
├── checklist.md         # Quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/docs/
├── src/
│   ├── components/
│   │   ├── showcase/
│   │   │   ├── ComponentShowcase.astro  # PRIMARY: Update this component
│   │   │   ├── CodeBlock.astro          # REUSE: Existing code display
│   │   │   └── TabPanel.astro           # NEW: Tab content container
│   │   └── ui/
│   │       └── Tabs.astro               # NEW: Reusable tabs component
│   ├── styles/
│   │   └── global.css                   # May need tab-specific styles
│   └── content/docs/en/components/      # Existing MDX files (no changes needed)
└── tests/
    └── integration/
        └── component-showcase.spec.ts   # NEW: Tab functionality tests
```

**Structure Decision**: Single package modification within monorepo. All changes confined to `packages/docs/src/components/showcase/` with the `ComponentShowcase.astro` component as the primary file to modify.

## Complexity Tracking

> No violations detected - no complexity justification needed.

---

## Phase 0: Research

### Research Tasks

1. **Astro client-side interactivity patterns** - How to implement tab switching in Astro without React
2. **ARIA tabs pattern** - Proper accessibility implementation for tabbed interfaces
3. **CSS :has() selector support** - For progressive enhancement without JavaScript

### Findings

See [research.md](./research.md) for detailed research.
