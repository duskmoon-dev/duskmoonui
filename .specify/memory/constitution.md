<!--
  Sync Impact Report:
  Version Change: 1.3.0 → 1.4.0
  Modified Principles:
    - Principle II "Tailwind-Native Architecture" → Added logical properties requirement
  Added Sections:
    - New "Logical Properties for Spacing" subsection under Principle II
  Removed Sections: None
  Templates Status:
    ✅ plan-template.md - Validated, no changes needed (layout agnostic)
    ✅ spec-template.md - Validated, no changes needed (implementation agnostic)
    ✅ tasks-template.md - Validated, no changes needed (implementation agnostic)
  Follow-up TODOs:
    ⚠️ Audit existing component CSS files for physical properties (margin-left, padding-right, etc.)
    ⚠️ Update any components using physical properties to logical properties
    ⚠️ This change supports future RTL implementation without breaking changes
-->

# DuskMoonUI Constitution

## Project Overview

DuskMoonUI is a Tailwind CSS plugin library (similar to DaisyUI) providing a three-color system based on Material Design 3 tokens with pre-built component styles.

**Package Structure**:
- `packages/core`: Tailwind CSS plugin (`@duskmoon-dev/core`) - published to npm registry
- `packages/docs`: Documentation site built with Astro.js - deployed to GitHub Pages

**Runtime & Package Manager**:
- This project uses **Bun** exclusively as the JavaScript runtime and package manager
- Do NOT use Node.js, npm, pnpm, or yarn for development or CI/CD
- All scripts, dependencies, and workflows MUST be Bun-compatible
- The published package remains compatible with Node.js 18+ for end users

## Core Principles

### I. Design System First

DuskMoonUI is a design system foundation built on Material Design 3 color tokens. Every feature MUST:
- Maintain the extended three-color system (primary, secondary, tertiary with 65+ tokens total) as the single source of truth
- Preserve accessibility guarantees (on-color variants ensure WCAG contrast)
- Support both light and dark themes without breaking semantic color contracts
- Provide TypeScript type definitions for all public APIs

**Color Format & Manipulation**:

All color definitions MUST use the OKLCH color space (like DaisyUI 5):
- CSS variables MUST store colors in `oklch()` format (e.g., `--color-primary: oklch(0.7 0.15 30);`)
- Color manipulation MUST use CSS native functions:
  - Relative color syntax: `oklch(from var(--primary-color) l c calc(h + 30))`
  - Color mixing: `color-mix(in oklch, var(--primary-color) 70%, white)`
- NO JavaScript-based color manipulation at runtime
- NO legacy color formats (HSL, RGB, HEX) for CSS variable definitions
- OKLCH enables perceptually uniform color operations and better gamut support

**Rationale**: The three-color system IS the product. Breaking color contracts or accessibility guarantees undermines the entire library's value proposition. The tertiary color provides design flexibility beyond typical two-color systems. OKLCH provides perceptually uniform lightness, better color gamut support (P3, Rec2020), and native CSS manipulation without JavaScript.

### II. Tailwind-Native Architecture

**MANDATORY**: This project MUST support only Tailwind CSS >= 4.0.0.

All features MUST be implemented as Tailwind CSS v4 native constructs:
- Colors via CSS custom properties using `@theme` blocks in CSS files
- Components as utility compositions or `@layer components` declarations
- Plugin implementation using Tailwind v4 `@plugin` directive syntax
- NO Tailwind v3 JavaScript plugin API (`addBase`, `addComponents`, `addUtilities`)
- NO runtime JavaScript for theming (CSS variables handle dynamic switching)
- Configuration via CSS `@theme` and `@plugin` blocks, NOT tailwind.config.js

**Logical Properties for Spacing**:

All spacing (margin, padding) MUST use logical properties to support text flow direction:
- Use `margin-inline`, `margin-inline-start`, `margin-inline-end` instead of `margin-left`, `margin-right`
- Use `margin-block`, `margin-block-start`, `margin-block-end` instead of `margin-top`, `margin-bottom`
- Use `padding-inline`, `padding-inline-start`, `padding-inline-end` instead of `padding-left`, `padding-right`
- Use `padding-block`, `padding-block-start`, `padding-block-end` instead of `padding-top`, `padding-bottom`
- Use `inset-inline`, `inset-block` for positioning instead of `left`, `right`, `top`, `bottom`
- Shorthand `margin: 1rem 2rem` is acceptable (maps to block/inline automatically)

**Rationale**: Tailwind v4's CSS-first architecture provides better performance, simpler mental models, and native browser dev tools support. Supporting v3 would require maintaining two incompatible architectures. Logical properties adapt automatically to RTL languages and vertical writing modes, ensuring components work correctly regardless of text direction without additional CSS overrides.

### III. Component Independence

Each UI component (when added) MUST be:
- Independently testable via visual regression or snapshot tests
- Opt-in via plugin configuration (not bundled by default unless `components: 'all'`)
- Documented with live examples showing color token usage
- Compatible with all built-in themes (sunshine, moonlight, custom)
- Implemented as composable utility classes or minimal `@layer components` styles

**Rationale**: Monolithic component libraries slow builds. Users should pay only for what they use. DaisyUI-style component architecture provides familiarity while maintaining flexibility.

### IV. Type Safety & Developer Experience

TypeScript type definitions are NON-NEGOTIABLE:
- All plugin options MUST have exported TypeScript interfaces
- Theme configurations MUST be strongly typed with autocomplete support
- Build errors MUST fail fast with clear messages (no silent failures)
- Breaking changes MUST follow semantic versioning (MAJOR.MINOR.PATCH)
- Plugin API MUST provide clear error messages for configuration mistakes

**Rationale**: TypeScript users are the primary audience. Poor DX increases support burden and adoption friction. Clear types reduce configuration errors.

### V. Zero Runtime Dependencies

The core package (`@duskmoon-dev/core`) MUST:
- Have ONLY `tailwindcss` (>= 4.0.0) as a peer dependency
- Emit pure CSS at build time (no client-side JS required)
- Use Bun exclusively for development, testing, and CI/CD
- Remain compatible with Node.js 18+ for end-user consumption
- Keep bundle size <10KB (minified) for the plugin itself

**Rationale**: Dependency bloat is a primary complaint about UI libraries. Keep the attack surface minimal. Users should not need to ship JavaScript for styling. Bun provides faster development experience without affecting end-user compatibility.

### VI. Documentation as Code

All features MUST include:
- Inline JSDoc comments for public APIs
- Live examples in the `packages/docs` Astro.js documentation site
- Migration guides for breaking changes in CHANGELOG.md
- Quickstart examples that work with Tailwind v4 setup

**Documentation Site Requirements** (`packages/docs`):
- MUST be built with Astro.js framework
- MUST be deployed to GitHub Pages automatically via GitHub Actions
- MUST include interactive examples with working theme switcher
- MUST demonstrate all color tokens across light/dark themes
- MUST include component examples showing three-color system usage
- MUST provide clear installation and configuration instructions
- MUST be accessible (WCAG AA minimum) and responsive
- MUST load plugin CSS correctly using Tailwind v4 `@plugin` directive

**Deployment Requirements**:
- GitHub Actions workflow MUST build docs site on every push to main branch
- GitHub Actions MUST use Bun for all build steps
- Build dependencies (`@tailwindcss/vite`, `@tailwindcss/postcss`) MUST be properly installed
- Build process MUST validate all examples compile successfully
- Failed builds MUST block deployment

**Rationale**: Undocumented features don't exist. Examples prove the library works with standard Tailwind v4 configuration. Astro.js provides excellent documentation site capabilities with MDX support. GitHub Pages enables free hosting and automatic deployment.

### VII. Accessibility by Default

Color tokens MUST guarantee WCAG AA contrast ratios:
- `primary-content` on `primary` background: minimum 4.5:1
- `on-surface` on `surface` variants: minimum 4.5:1
- Error messages MUST not rely on color alone (use icons or text)
- Dark mode MUST be equally accessible (contrast ratio enforcement applies)
- All three brand colors (primary, secondary, tertiary) MUST meet contrast requirements

**Rationale**: Accessibility is a legal requirement in many jurisdictions. Baking it into the color system prevents regression. Three-color system must not compromise accessibility.

## Quality Gates

### Pre-Commit Requirements

Before any commit:
- `bun run typecheck` MUST pass (no TypeScript errors)
- `bun run build:core` MUST succeed (plugin compiles)
- `bun run build:docs` MUST succeed (documentation site builds)
- Modified files MUST follow existing code style (Prettier/ESLint if configured)

### Pre-PR Requirements

Before opening pull requests:
- All tests MUST pass (`bun test`)
- CHANGELOG.md MUST be updated for user-facing changes
- New color tokens MUST include contrast ratio validation
- New color tokens MUST use OKLCH format
- New components MUST use logical properties for spacing (no physical margin-left/right, padding-top/bottom)
- New components MUST include Astro documentation page in `packages/docs`
- Tailwind v4 compatibility MUST be verified
- Documentation site MUST build without errors
- Examples in docs MUST be tested with actual plugin import

### Release Requirements

Before publishing to npm registry:
- Version bump MUST follow semver (use `bun version` or manual edit)
- Git tag MUST match package.json version
- Built artifacts in `dist/` MUST be committed (for GitHub releases)
- README.md examples MUST be tested against Tailwind v4
- Documentation site MUST be deployed and accessible
- All links in documentation MUST be validated

## Development Workflow

### Branching Strategy

- `main`: Production-ready releases (protected, triggers docs deployment)
- `develop`: Integration branch for next release
- Feature branches: `###-feature-name` (e.g., `001-button-component`)

### Code Review Standards

All PRs MUST:
- Link to related issue or spec document
- Include before/after examples for visual changes
- Pass CI checks (type checking, build, tests, docs build)
- Have at least one approval from maintainer
- Verify Tailwind v4 compatibility
- Include documentation updates if adding new features

### Monorepo Conventions

Workspace structure:
- `packages/core/`: The Tailwind v4 plugin (published to npm registry)
- `packages/docs/`: Astro.js documentation site (deployed to GitHub Pages)
- `examples/*/`: Integration examples (Next.js, Astro, vanilla)

Commands (all via Bun):
- `bun install` - Install all workspace dependencies
- `bun run build:core` - Build plugin only
- `bun run build:docs` - Build documentation site
- `bun run dev` - Start docs dev server (defaults to docs package)
- `bun run dev:core` - Watch mode for core plugin development
- `bun run typecheck` - Type check all workspaces
- `bun run preview` - Preview built documentation site
- `bun test` - Run all tests

## Governance

### Amendment Procedure

Constitution changes require:
1. Proposal via GitHub issue with `constitution` label
2. Discussion period (minimum 7 days)
3. PR updating this file with version bump and rationale
4. Approval from project maintainer
5. Update to dependent templates (plan, spec, tasks)

### Version Policy

- **MAJOR**: Principle removal, Tailwind v4 → v5 migration, Bun version requirement bump, breaking documentation site changes, color format migration (e.g., HSL → OKLCH)
- **MINOR**: New principle addition, expanded accessibility requirements, new documentation requirements, new color manipulation techniques, new CSS property conventions (e.g., logical properties)
- **PATCH**: Clarifications, typo fixes, example updates, non-breaking documentation improvements

### Compliance Review

Every feature PR MUST include constitution compliance checklist:
- [ ] Maintains three-color system integrity (Principle I)
- [ ] Uses OKLCH color format for new color tokens (Principle I)
- [ ] Uses Tailwind v4 native syntax (Principle II)
- [ ] Uses logical properties for spacing (Principle II)
- [ ] No runtime dependencies added (Principle V)
- [ ] Type definitions exported (Principle IV)
- [ ] Documentation included in packages/docs (Principle VI)
- [ ] Accessibility tested (Principle VII)
- [ ] Documentation site builds successfully
- [ ] Examples tested with actual plugin

### Complexity Justification

Any feature violating these principles MUST justify complexity:
- **What**: Specific principle violated
- **Why**: Problem that requires violation
- **Alternatives**: Simpler approaches considered and rejected with reasons

**Version**: 1.4.0 | **Ratified**: 2025-11-06 | **Last Amended**: 2025-12-23
