# Docs Package Constitution

## Core Principle: Consume, Never Create

The docs site (`@duskmoon-dev/docs`) is strictly a **consumer** of `@duskmoon-dev/core`. All visual styling, components, color tokens, and design primitives must come from the core package.

### Rules

1. **Use only core themes** — The docs site must use themes defined in `packages/core/src/themes/`. Never define new color tokens or override core token values in the docs package. The `src/styles/themes.css` file bridges docs-specific CSS variables to core `var(--color-*)` tokens; it must not introduce standalone color values.

2. **No custom component styles** — If a UI pattern is needed in the docs site but doesn't exist in core, **request a feature in `@duskmoon-dev/core`** rather than creating a one-off CSS class in the docs package. This keeps the design system as the single source of truth.

3. **Allowed docs-only styles** — Layout-specific CSS (grid arrangements, page structure, content spacing) and docs-specific UI (search, sidebar navigation, code block presentation) are acceptable in the docs package since they serve documentation purposes, not reusable component design.

4. **Shadow and elevation** — Use `var(--shadow-*)` tokens from core. Never hardcode `box-shadow` values.

5. **Shape and border-radius** — Use `var(--radius-*)` tokens from core themes. Each theme defines its own shape personality.

### When Something Is Missing

If the docs site needs a component or style that doesn't exist in core:

1. Check if an existing core component can be composed to achieve the goal
2. If not, create an issue or feature request for `@duskmoon-dev/core`
3. Implement the component in core first, then use it in docs
4. Temporary workarounds in docs should be marked with `/* TODO: move to core */`

### File Responsibilities

- `src/styles/themes.css` — Bridges docs CSS variables to core tokens (no standalone colors)
- `src/styles/global.css` — Typography, code blocks, layout utilities (docs-specific only)
- Component styles — Must use core classes (`.btn`, `.card`, `.input`, etc.) and core tokens
