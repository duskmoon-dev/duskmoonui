# Implementation Plan: Refactor Core Plugin with DaisyUI Architecture

**Branch**: `001-refactor-core-plugin` | **Date**: 2025-11-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-refactor-core-plugin/spec.md`

## Summary

Refactor `@duskmoon-dev/core` plugin to adopt DaisyUI's proven architecture patterns while maintaining the three-color Material Design 3 system. The refactor will migrate from Tailwind v3 JavaScript plugin API to Tailwind v4's native CSS-first approach using `@plugin` directives, `@theme` blocks, and `@layer components` declarations. The plugin will provide minimal component base styles designed for utility class composition, comprehensive unit/visual/integration testing, and complete documentation with interactive examples in an Astro.js site deployed to GitHub Pages.

**Technical Approach from Research**:
- Adopt DaisyUI's pure CSS architecture with zero runtime dependencies
- Use HSL-based color tokens stored as space-separated values in CSS custom properties
- Implement theme switching via `data-theme` attribute (CSS-only, no JavaScript)
- Structure components with base class + modifier pattern (e.g., `btn`, `btn-primary`)
- Place component styles in utilities layer for proper CSS specificity
- Support customization through Tailwind utility classes and CSS variable overrides
- Provide comprehensive testing with unit, visual regression, integration, and accessibility audits

## Technical Context

**Language/Version**: TypeScript 5.6+ / JavaScript ES2022
**Primary Dependencies**:
- Production: `tailwindcss` >= 4.0.0 (peer dependency only)
- Development: `bun` >= 1.0.0, `typescript` 5.6+
- Testing: Vitest (unit), Playwright (integration/visual), axe-core (a11y)
- Documentation: Astro.js 5.0+, React 18.3+ (for interactive examples)

**Storage**: N/A (pure CSS plugin, no data persistence)

**Testing**:
- Unit: Vitest for color generation, theme logic, component class output
- Visual Regression: Playwright for screenshot comparison across themes
- Integration: Playwright for real browser testing with user interactions
- Accessibility: axe-core + Lighthouse for WCAG AA compliance

**Target Platform**:
- Plugin: Node.js 18+ (build time), Browser (runtime CSS only)
- Documentation: Static site deployed to GitHub Pages

**Project Type**: Monorepo with two packages (core plugin + docs site)

**Performance Goals**:
- Plugin bundle: <10KB minified
- Documentation site: <3s initial load
- Theme switching: instant (0ms, pure CSS)
- Build time: <5s for plugin, <30s for docs

**Constraints**:
- MUST use Tailwind CSS v4 native syntax only (no v3 API)
- MUST have zero runtime JavaScript dependencies
- MUST maintain WCAG AA contrast ratios (4.5:1 minimum)
- MUST support 65+ Material Design 3 color tokens
- MUST work with standard HTML (no framework lock-in)

**Scale/Scope**:
- 6 core components (buttons, cards, inputs, forms, navigation, modals)
- 65+ color tokens (primary/secondary/tertiary with variants)
- 2 built-in themes (sunshine, moonlight)
- Comprehensive test coverage (unit + visual + integration + a11y)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Design System First ✅ PASS
- **Maintains three-color system** (primary, secondary, tertiary with 65+ tokens total)
- **Accessibility guarantees** via automatic `-content` colors with WCAG AA contrast
- **Theme switching** via `data-theme` attribute preserves semantic color contracts
- **TypeScript definitions** provided for all plugin configuration options

### Principle II: Tailwind-Native Architecture ✅ PASS
- **Tailwind CSS v4 >= 4.0.0** required (peer dependency)
- **Colors via CSS custom properties** using `@theme` blocks
- **Components via `@layer components`** declarations
- **Plugin via `@plugin` directive** (NO Tailwind v3 JavaScript API)
- **NO runtime JavaScript** for theming (CSS variables handle switching)
- **Configuration via CSS** `@theme` and `@plugin` blocks (NOT tailwind.config.js)

### Principle III: Component Independence ✅ PASS
- **Visual regression tests** via Playwright screenshots
- **Opt-in components** via plugin configuration (`include: button, card`)
- **Live documentation** in Astro.js site with working examples
- **Theme compatibility** tested across sunshine and moonlight themes
- **Utility class composition** allows customization without CSS overrides

### Principle IV: Type Safety & Developer Experience ✅ PASS
- **TypeScript interfaces** exported for plugin options and theme configuration
- **Strongly typed** theme configurations with autocomplete support
- **Clear error messages** for configuration validation failures
- **Semantic versioning** followed (this is MAJOR version bump due to v3 → v4)

### Principle V: Zero Runtime Dependencies ✅ PASS
- **Only peer dependency**: `tailwindcss` >= 4.0.0
- **Pure CSS at build time** (no client-side JavaScript)
- **Bun for development**, Node.js 18+ compatible
- **Bundle size**: <10KB minified target

### Principle VI: Documentation as Code ✅ PASS
- **JSDoc comments** on all public APIs
- **Astro.js site** in `packages/docs/` with live examples
- **Migration guide** in CHANGELOG.md for v3 → v4 breaking changes
- **Quickstart examples** using Tailwind v4 setup
- **Interactive theme switcher** in documentation
- **GitHub Pages deployment** automated via GitHub Actions
- **Component pages** for each component with all variants

### Principle VII: Accessibility by Default ✅ PASS
- **WCAG AA contrast ratios** guaranteed (4.5:1 minimum)
- **Automated accessibility audits** via axe-core for all components
- **Dark mode equally accessible** (contrast enforcement applies)
- **Three brand colors** (primary, secondary, tertiary) all meet requirements

### Quality Gates: Pre-Commit Requirements ✅ PASS
- `bun run typecheck` included in development workflow
- `bun run build:core` builds plugin successfully
- `bun run build:docs` builds documentation site

### Quality Gates: Pre-PR Requirements ✅ PASS
- `bun test` runs all test suites (unit + visual + integration + a11y)
- CHANGELOG.md update required for breaking changes
- Color token contrast validation automated
- Astro documentation page required for new components
- Tailwind v4 compatibility verified in test suite

### Quality Gates: Release Requirements ✅ PASS
- Semantic versioning enforced (MAJOR bump for v3 → v4)
- Git tags match package.json version
- Built artifacts in dist/ committed
- README.md examples tested
- Documentation site deployed and validated

**Constitution Check Result**: ✅ ALL PRINCIPLES SATISFIED

## Project Structure

### Documentation (this feature)

```text
specs/001-refactor-core-plugin/
├── plan.md              # This file
├── research.md          # Phase 0 research on DaisyUI architecture
├── data-model.md        # Phase 1 entities (Theme, Component Style, Color Token)
├── quickstart.md        # Phase 1 getting started guide
└── contracts/           # Phase 1 API contracts
    ├── plugin-api.md    # Plugin configuration API
    ├── theme-api.md     # Theme definition API
    └── css-api.md       # Component CSS class API
```

### Source Code (repository root)

```text
packages/
├── core/                            # @duskmoon-dev/core plugin
│   ├── src/
│   │   ├── index.ts                 # Plugin entry point (Tailwind v4 CSS export)
│   │   ├── themes/
│   │   │   ├── sunshine.css         # Built-in light theme
│   │   │   ├── moonlight.css        # Built-in dark theme
│   │   │   └── index.css            # Theme loader
│   │   ├── base/
│   │   │   ├── colors.css           # Color token definitions (@theme blocks)
│   │   │   ├── root.css             # Root styles (scrollbar, etc.)
│   │   │   └── index.css            # Base loader
│   │   ├── components/
│   │   │   ├── button.css           # Button component (@layer components)
│   │   │   ├── card.css             # Card component
│   │   │   ├── input.css            # Input component
│   │   │   ├── form.css             # Form component
│   │   │   ├── navigation.css       # Navigation component
│   │   │   ├── modal.css            # Modal component
│   │   │   └── index.css            # Component loader
│   │   ├── utilities/
│   │   │   └── index.css            # Utility classes (if needed)
│   │   └── types/
│   │       ├── plugin.ts            # Plugin configuration types
│   │       ├── theme.ts             # Theme definition types
│   │       └── index.ts             # Type exports
│   ├── dist/                        # Build output
│   │   ├── index.css                # Compiled CSS for @plugin import
│   │   ├── index.d.ts               # TypeScript definitions
│   │   └── package.json             # Package metadata
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── colors.test.ts       # Color token generation tests
│   │   │   ├── themes.test.ts       # Theme switching tests
│   │   │   └── config.test.ts       # Configuration validation tests
│   │   ├── visual/
│   │   │   ├── components.spec.ts   # Playwright visual regression
│   │   │   └── snapshots/           # Screenshot baselines
│   │   ├── integration/
│   │   │   ├── browser.spec.ts      # Real browser interaction tests
│   │   │   └── theme-switch.spec.ts # Theme switching in browser
│   │   └── accessibility/
│   │       └── a11y.spec.ts         # axe-core accessibility audits
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── docs/                            # @duskmoon-dev/docs site
    ├── src/
    │   ├── pages/
    │   │   ├── index.astro          # Homepage
    │   │   ├── installation.mdx     # Installation guide
    │   │   ├── colors.mdx           # Color tokens showcase
    │   │   ├── themes.mdx           # Theme guide
    │   │   └── components/
    │   │       ├── button.mdx       # Button documentation
    │   │       ├── card.mdx         # Card documentation
    │   │       ├── input.mdx        # Input documentation
    │   │       ├── form.mdx         # Form documentation
    │   │       ├── navigation.mdx   # Navigation documentation
    │   │       └── modal.mdx        # Modal documentation
    │   ├── components/
    │   │   ├── ThemeSwitcher.tsx    # Interactive theme switcher
    │   │   ├── ComponentPreview.tsx # Live component preview
    │   │   └── CodeExample.tsx      # Code snippet with copy button
    │   ├── layouts/
    │   │   └── BaseLayout.astro     # Base page layout
    │   └── styles/
    │       └── global.css           # Global styles + @plugin import
    ├── public/
    │   └── favicon.svg
    ├── astro.config.mjs
    ├── package.json
    └── tsconfig.json
```

**Structure Decision**: This is a **monorepo** with two packages:
1. **packages/core**: The Tailwind CSS v4 plugin (published to npm)
2. **packages/docs**: Astro.js documentation site (deployed to GitHub Pages)

The structure follows DaisyUI's proven pattern with separate directories for themes, base styles, components, and utilities. All styles are written in pure CSS files using Tailwind v4 directives (`@plugin`, `@theme`, `@layer`). The plugin exports a single CSS entry point that users import via `@plugin "@duskmoon-dev/core"` in their project.

## Complexity Tracking

> **No violations detected** - All constitution principles satisfied.

No complexity justification required.
