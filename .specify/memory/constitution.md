<!--
  Sync Impact Report:
  Version Change: Initial → 1.0.0
  Modified Principles: N/A (initial version)
  Added Sections: All core principles, quality gates, development workflow, governance
  Removed Sections: N/A
  Templates Status:
    ✅ plan-template.md - Validated, no updates needed (constitution check section compatible)
    ✅ spec-template.md - Validated, no updates needed (requirements alignment compatible)
    ✅ tasks-template.md - Validated, no updates needed (task structure compatible)
  Follow-up TODOs: None
-->

# DuskMoonUI Constitution

## Core Principles

### I. Design System First

DuskMoonUI is a design system foundation built on Material Design 3 color tokens. Every feature MUST:
- Maintain the extended color system (65+ tokens) as the single source of truth
- Preserve accessibility guarantees (on-color variants ensure WCAG contrast)
- Support both light and dark themes without breaking semantic color contracts
- Provide TypeScript type definitions for all public APIs

**Rationale**: The color system IS the product. Breaking color contracts or accessibility guarantees undermines the entire library's value proposition.

### II. Tailwind-Native Architecture

All features MUST be implemented as Tailwind CSS v4 native constructs:
- Colors via CSS custom properties (`@theme` blocks)
- Components as utility compositions or `@layer components` declarations
- NO runtime JavaScript for theming (CSS variables handle dynamic switching)
- Plugin API follows Tailwind conventions (`addBase`, `addComponents`, `addUtilities`)

**Rationale**: Users expect Tailwind plugins to be statically analyzable, tree-shakeable, and JIT-compatible. Runtime dependencies violate these expectations.

### III. Component Independence

Each UI component (when added) MUST be:
- Independently testable via visual regression or snapshot tests
- Opt-in via plugin configuration (not bundled by default unless `components: 'all'`)
- Documented with live examples showing color token usage
- Compatible with all built-in themes (sunshine, moonlight, custom)

**Rationale**: Monolithic component libraries slow builds. Users should pay only for what they use.

### IV. Type Safety & Developer Experience

TypeScript type definitions are NON-NEGOTIABLE:
- All plugin options MUST have exported TypeScript interfaces
- Theme configurations MUST be strongly typed with autocomplete support
- Build errors MUST fail fast with clear messages (no silent failures)
- Breaking changes MUST follow semantic versioning (MAJOR.MINOR.PATCH)

**Rationale**: TypeScript users are the primary audience. Poor DX increases support burden and adoption friction.

### V. Zero Runtime Dependencies

The core package (`@duskmoon-dev/core`) MUST:
- Have ONLY `tailwindcss` as a peer dependency
- Emit pure CSS at build time (no client-side JS required)
- Use Bun for development but remain Node.js 18+ compatible
- Keep bundle size <10KB (minified) for the plugin itself

**Rationale**: Dependency bloat is a primary complaint about UI libraries. Keep the attack surface minimal.

### VI. Documentation as Code

All features MUST include:
- Inline JSDoc comments for public APIs
- Live examples in the `/packages/docs` Astro site
- Migration guides for breaking changes in CHANGELOG.md
- Quickstart examples that work without build tooling (standalone.html pattern)

**Rationale**: Undocumented features don't exist. The standalone.html demos prove the library works without complex setup.

### VII. Accessibility by Default

Color tokens MUST guarantee WCAG AA contrast ratios:
- `primary-content` on `primary` background: minimum 4.5:1
- `on-surface` on `surface` variants: minimum 4.5:1
- Error messages MUST not rely on color alone (use icons or text)
- Dark mode MUST be equally accessible (contrast ratio enforcement applies)

**Rationale**: Accessibility is a legal requirement in many jurisdictions. Baking it into the color system prevents regression.

## Quality Gates

### Pre-Commit Requirements

Before any commit:
- `bun run typecheck` MUST pass (no TypeScript errors)
- `bun run build:core` MUST succeed (plugin compiles)
- Modified files MUST follow existing code style (Prettier/ESLint if configured)

### Pre-PR Requirements

Before opening pull requests:
- All tests MUST pass (`bun test`)
- CHANGELOG.md MUST be updated for user-facing changes
- New color tokens MUST include contrast ratio validation
- New components MUST include Astro documentation page

### Release Requirements

Before publishing to npm:
- Version bump MUST follow semver (use `npm version`)
- Git tag MUST match package.json version
- Built artifacts in `dist/` MUST be committed (for GitHub releases)
- README.md examples MUST be tested against built package

## Development Workflow

### Branching Strategy

- `main`: Production-ready releases (protected)
- `develop`: Integration branch for next release
- Feature branches: `###-feature-name` (e.g., `001-button-component`)

### Code Review Standards

All PRs MUST:
- Link to related issue or spec document
- Include before/after examples for visual changes
- Pass CI checks (type checking, build, tests)
- Have at least one approval from maintainer

### Monorepo Conventions

Workspace structure:
- `packages/core/`: The Tailwind plugin (published to npm)
- `packages/docs/`: Astro documentation site (deployed separately)
- `examples/*/`: Integration examples (Next.js, Astro, vanilla)

Commands:
- `bun run build:core` - Build plugin only
- `bun run dev` - Start docs dev server
- `bun run typecheck` - Type check all workspaces

## Governance

### Amendment Procedure

Constitution changes require:
1. Proposal via GitHub issue with `constitution` label
2. Discussion period (minimum 7 days)
3. PR updating this file with version bump and rationale
4. Approval from project maintainer
5. Update to dependent templates (plan, spec, tasks)

### Version Policy

- **MAJOR**: Principle removal, Tailwind v4 → v5 migration, Node.js requirement bump
- **MINOR**: New principle addition, expanded accessibility requirements
- **PATCH**: Clarifications, typo fixes, example updates

### Compliance Review

Every feature PR MUST include constitution compliance checklist:
- [ ] Maintains color system integrity (Principle I)
- [ ] No runtime dependencies added (Principle V)
- [ ] Type definitions exported (Principle IV)
- [ ] Documentation included (Principle VI)
- [ ] Accessibility tested (Principle VII)

### Complexity Justification

Any feature violating these principles MUST justify complexity:
- **What**: Specific principle violated
- **Why**: Problem that requires violation
- **Alternatives**: Simpler approaches considered and rejected with reasons

**Version**: 1.0.0 | **Ratified**: 2025-11-06 | **Last Amended**: 2025-11-06
