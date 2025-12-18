# Implementation Plan: Component Styles Implementation

**Branch**: `002-component-styles` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-component-styles/spec.md`

## Summary

Implement complete CSS styles for all 42 documented UI components in @duskmoon-dev/core, update the README to mark component styles as completed, and ensure documentation site examples render correctly with the implemented styles.

## Technical Context

**Language/Version**: TypeScript 5.6+, CSS (PostCSS/LightningCSS)
**Primary Dependencies**: Tailwind CSS v4.0.0+, LightningCSS
**Storage**: N/A (CSS-only, no data persistence)
**Testing**: Bun test (unit), Playwright (visual regression, integration, a11y)
**Target Platform**: Browser (all modern browsers), Node.js 18+ (for build)
**Project Type**: Monorepo - packages/core (plugin) + packages/docs (Astro.js docs)
**Performance Goals**: Interactive state feedback within 100ms, theme switching without page reload
**Constraints**: Zero runtime JS, <10KB minified plugin, WCAG AA contrast
**Scale/Scope**: 42 components, 2 themes (sunshine/moonlight), 3 color variants per component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Design System First | PASS | All components use MD3 color tokens (primary, secondary, tertiary) |
| II. Tailwind-Native Architecture | PASS | Components use `@layer components` in CSS files |
| III. Component Independence | PASS | Each component in separate file, opt-in via config |
| IV. Type Safety & DX | PASS | TypeScript types exist for component config |
| V. Zero Runtime Dependencies | PASS | Pure CSS output, no client JS |
| VI. Documentation as Code | REQUIRED | Must update docs site examples |
| VII. Accessibility by Default | REQUIRED | Must verify contrast ratios |

**Gate Result**: PASS - May proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/002-component-styles/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component API specs)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/core/
├── src/
│   ├── components/       # Component style definitions
│   │   ├── index.ts      # Exports all component styles
│   │   ├── index.css     # CSS aggregator
│   │   ├── button.ts     # JS style objects (Tailwind v3 API - OUT OF SCOPE for this feature)
│   │   ├── button.css    # CSS styles (Tailwind v4 native)
│   │   ├── card.ts
│   │   ├── card.css
│   │   └── [41 more components...]
│   ├── themes/           # Theme definitions
│   ├── base/             # Base styles (root, colors)
│   └── index.ts          # Main plugin entry
├── dist/                 # Built CSS output
└── package.json

packages/docs/
├── src/
│   ├── content/docs/en/components/  # 42 MDX component pages
│   └── components/showcase/         # ComponentShowcase for live demos
└── astro.config.mjs

README.md                 # Project README (needs roadmap update)
```

**Structure Decision**: Existing monorepo structure with packages/core for CSS library and packages/docs for Astro documentation site. Component styles exist in dual format (TypeScript objects for v3 API, CSS files for v4 native).

## Complexity Tracking

> No Constitution violations requiring justification.

## Implementation Approach

### Current State Analysis

The project has:
1. **TypeScript component style objects** (e.g., `button.ts`) - These use JS-in-CSS format with nested selectors
2. **CSS component files** (e.g., `button.css`) - These use `@layer components` with native CSS
3. **Incomplete coverage** - Only 5 CSS files exist vs 41 TypeScript component files

### Key Decisions

1. **CSS-first approach**: Use CSS files (`@layer components`) as the source of truth per Constitution Principle II
2. **Complete all 42 components**: Each component needs a `.css` file with full variant/state coverage
3. **Theme integration**: Use CSS custom properties (--color-*) for theme adaptation
4. **Documentation sync**: Ensure MDX examples match actual CSS class names

### Component Categories

| Category | Components | Count |
|----------|-----------|-------|
| Actions | button | 1 |
| Data Display | avatar, badge, card, chip, list, table | 6 |
| Data Entry | autocomplete, checkbox, datepicker, file-upload, input, radio, rating, select, slider, switch, textarea, toggle | 12 |
| Feedback | alert, dialog, progress, skeleton, snackbar, toast, tooltip | 7 |
| Layout | appbar, divider | 2 |
| Navigation | bottom-navigation, breadcrumbs, drawer, menu, navbar, pagination, stepper, tabs | 8 |
| Surfaces | accordion, bottomsheet, collapse, modal, popover | 5 |
| Misc | timeline | 1 |

**Total**: 42 components

## Next Steps

1. **Phase 0**: Research Material Design 3 component specifications for consistent styling
2. **Phase 1**: Define component API contracts (class names, variants, sizes)
3. **Phase 2**: Generate task breakdown for implementation
