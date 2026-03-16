# Implementation Plan: Form Component Color Token Variants & Bug Fixes

**Branch**: `feat/component-color-variant-convention` | **Date**: 2026-03-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/007-component-color-fix/spec.md`

## Summary

Complete the color variant API (Principle VIII) across all 20 form components: fix CSS gaps,
add missing MDX variant demos, and verify/repair rendering via chrome-devtools. All 5 theme
files already contain the required status tokens — no theme changes needed.

## Technical Context

**Language/Version**: CSS (OKLCH color space), MDX (Astro 5), TypeScript
**Primary Dependencies**: Tailwind CSS v4, Astro.js, `@duskmoon-dev/core`
**Storage**: N/A
**Testing**: `bun run build:core` + chrome-devtools MCP visual verification
**Target Platform**: Browser (Chrome for verification; all modern browsers for output)
**Project Type**: CSS component library + Astro docs site (monorepo)
**Performance Goals**: Build must complete without errors; page load unaffected
**Constraints**: Pure CSS only — no JavaScript at runtime; OKLCH format required
**Scale/Scope**: 20 component CSS files + 19 MDX docs pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I** — All color tokens use OKLCH; no legacy formats introduced
- [x] **Principle II** — Pure `@layer components` CSS; Tailwind v4 only; logical properties used
- [x] **Principle III** — Each component remains independently opt-in
- [x] **Principle IV** — No new TS APIs introduced; existing types unchanged
- [x] **Principle V** — No new dependencies; pure CSS output
- [x] **Principle VI** — Every CSS change is accompanied by a docs MDX update
- [x] **Principle VII** — Variants pair content tokens with background tokens (WCAG contrast preserved)
- [x] **Principle VIII** — This feature IS the implementation of Principle VIII

**Gate: PASS** — No violations.

## Project Structure

### Documentation (this feature)

```text
specs/007-component-color-fix/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code

```text
packages/core/src/components/       ← CSS fixes (form.css, slider.css, on-surface defaults)
packages/docs/src/content/docs/en/components/   ← MDX updates (up to 19 files)
```

No new files. All work is modification of existing files.

---

## Phase 0: Research Findings

→ Full details in [research.md](research.md)

### Theme status tokens
All 5 themes (sunshine, moonlight, ocean, forest, sunset) already define all 8 required
status tokens (`info`, `info-content`, `success`, `success-content`, `warning`,
`warning-content`, `error`, `error-content`). **No theme changes needed.**

### CSS gaps identified

| Component | Issue |
|---|---|
| form.css | Missing 3 variants: `tertiary`, `info`, `warning` |
| slider.css | Missing `secondary` variant |
| checkbox, radio, rating, segment-control, switch, toggle, form, form-group | No `color: var(--color-on-surface)` on base class |
| checkbox, radio, switch, toggle, segment-control | Focus ring uses `outline` — must migrate to `color-mix` box-shadow |

### Docs MDX gaps identified

| Category | Count | Components |
|---|---|---|
| Zero color variant demos | 7 | autocomplete, cascader, form, otp-input, pin-input, time-input, tree-select |
| Partial demos (missing info/success/warning/error) | 9 | datepicker, multi-select, rating, segment-control, select, slider, textarea, toggle, checkbox |
| Missing ghost demo | ~11 | All form/interactive components except input |

### Pattern decisions

- **currentColor** (form/interactive): autocomplete, cascader, datepicker, input,
  multi-select, otp-input, pin-input, select, textarea, time-input, tree-select
- **bg+content** (display/selection): checkbox, radio, segment-control, slider, switch,
  toggle, form, form-group
- **color-only exception**: rating (icon-only, no text or border — justified)

---

## Phase 1: Design

→ Full token contract in [data-model.md](data-model.md)
→ Verification steps in [quickstart.md](quickstart.md)

### Implementation approach

**Group A — CSS bug fixes** (must complete first):
1. Add `color: var(--color-on-surface)` to base class of all display components
2. Fix `form.css`: add `form-tertiary`, `form-info`, `form-warning`
3. Fix `slider.css`: add `slider-secondary`
4. Migrate focus ring on checkbox, radio, switch, toggle, segment-control from
   `outline` to `box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`

**Group B — MDX docs updates** (parallel after Group A):
- For each component with missing demos: add `ComponentShowcase` blocks for all
  7 semantic variants in order: primary → secondary → tertiary → info → success →
  warning → error
- For each form/interactive component missing ghost demo: add ghost block after
  error variant
- Input docs (already complete) — no changes needed

**Group C — chrome-devtools verification** (sequential, after build):
- `bun run dev` → open each page → visually verify → fix any rendering bugs found

### Parallel opportunities

- All Group B MDX files are independent — can be updated in parallel by multiple
  agents or in batches
- All Group A CSS files are independent — can be fixed in parallel
- Group C is sequential (one page at a time in the browser)

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| rating uses color-only pattern | Icon-only component; background clips the icon | Adding a background behind icons breaks the star/heart visual design intent |
