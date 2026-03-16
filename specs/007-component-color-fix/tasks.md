# Tasks: Form Component Color Token Variants & Bug Fixes

**Input**: Design documents from `specs/007-component-color-fix/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Verify build environment and start dev server for visual verification.

- [ ] T001 Start docs dev server with `bun run dev` and confirm it responds at localhost
- [ ] T002 Confirm `bun run build:core` passes clean before any changes

---

## Phase 2: Foundational — CSS Bug Fixes (Blocking)

**Purpose**: Fix CSS correctness issues that will make MDX demos inaccurate if left unresolved.
These changes are prerequisites for all MDX documentation work.

**⚠️ CRITICAL**: MDX demo additions must not begin until these CSS fixes are complete.

- [ ] T003 [P] Add `color: var(--color-on-surface)` to base `.checkbox` class in `packages/core/src/components/checkbox.css`
- [ ] T004 [P] Add `color: var(--color-on-surface)` to base `.radio` class in `packages/core/src/components/radio.css`
- [ ] T005 [P] Add `color: var(--color-on-surface)` to base `.rating` class in `packages/core/src/components/rating.css`
- [ ] T006 [P] Add `color: var(--color-on-surface)` to base `.segment-control` class in `packages/core/src/components/segment-control.css`
- [ ] T007 [P] Add `color: var(--color-on-surface)` to base `.switch` class in `packages/core/src/components/switch.css`
- [ ] T008 [P] Add `color: var(--color-on-surface)` to base `.toggle` class in `packages/core/src/components/toggle.css`
- [ ] T009 [P] Add `color: var(--color-on-surface)` to base `.form` class in `packages/core/src/components/form.css`; add missing `.form-tertiary`, `.form-info`, `.form-warning` variants
- [ ] T010 [P] Add `color: var(--color-on-surface)` to base `.form-group` class in `packages/core/src/components/form.css` (or form-group.css if separate)
- [ ] T011 [P] Add missing `.slider-secondary` variant to `packages/core/src/components/slider.css`
- [ ] T012 [P] Replace `outline` focus style with `box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)` on `.checkbox:focus` in `packages/core/src/components/checkbox.css`
- [ ] T013 [P] Replace `outline` focus style with `color-mix` box-shadow on `.radio:focus` in `packages/core/src/components/radio.css`
- [ ] T014 [P] Replace `outline` focus style with `color-mix` box-shadow on `.segment-control:focus` / `.segment-control input:focus` in `packages/core/src/components/segment-control.css`
- [ ] T015 [P] Replace `outline` focus style with `color-mix` box-shadow on `.switch:focus` / `.switch input:focus` in `packages/core/src/components/switch.css`
- [ ] T016 [P] Replace `outline` focus style with `color-mix` box-shadow on `.toggle:focus` / `.toggle input:focus` in `packages/core/src/components/toggle.css`
- [ ] T017 Run `bun run build:core` and confirm zero errors after all foundational CSS changes

**Checkpoint**: All CSS is correct — MDX documentation work can now begin in parallel.

---

## Phase 3: User Story 1 — Color Variant Coverage on All Form Component Pages (Priority: P1) 🎯 MVP

**Goal**: Every in-scope component docs page shows live demos for all 7 semantic color variants
plus ghost (where applicable).

**Independent Test**: Navigate to each of the 20 component pages at `localhost:4321/en/components/{name}`
and confirm all 7 variant demo blocks are visible and correctly colored.

### Components with zero color variant demos (add full variant set)

- [ ] T018 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/autocomplete.mdx`
- [ ] T019 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/cascader.mdx`
- [ ] T020 [P] [US1] Add 7 semantic color variants demo section to `packages/docs/src/content/docs/en/components/form.mdx` (no ghost — layout component)
- [ ] T021 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/otp-input.mdx`
- [ ] T022 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/pin-input.mdx`
- [ ] T023 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/time-input.mdx`
- [ ] T024 [P] [US1] Add 7 semantic color variants + ghost demo section to `packages/docs/src/content/docs/en/components/tree-select.mdx`

### Components with partial demos (add missing info/success/warning/error + ghost)

- [ ] T025 [P] [US1] Add `info`, `success`, `warning`, `error` variants + ghost demo to `packages/docs/src/content/docs/en/components/datepicker.mdx`
- [ ] T026 [P] [US1] Add `info`, `success`, `warning`, `error` variants + ghost demo to `packages/docs/src/content/docs/en/components/multi-select.mdx`
- [ ] T027 [P] [US1] Add `info`, `success`, `warning`, `error` variants to `packages/docs/src/content/docs/en/components/rating.mdx` (no ghost — icon-only)
- [ ] T028 [P] [US1] Add `info`, `success`, `warning`, `error` variants to `packages/docs/src/content/docs/en/components/segment-control.mdx`
- [ ] T029 [P] [US1] Add `info`, `success`, `warning`, `error` variants + ghost demo to `packages/docs/src/content/docs/en/components/select.mdx`
- [ ] T030 [P] [US1] Add `secondary`, `info`, `success`, `warning`, `error` variants to `packages/docs/src/content/docs/en/components/slider.mdx` (no ghost — no border)
- [ ] T031 [P] [US1] Add `info`, `success`, `warning`, `error` variants + ghost demo to `packages/docs/src/content/docs/en/components/textarea.mdx`
- [ ] T032 [P] [US1] Add `info`, `success`, `warning`, `error` variants to `packages/docs/src/content/docs/en/components/toggle.mdx`

### Components missing ghost demo only

- [ ] T033 [P] [US1] Add ghost demo to `packages/docs/src/content/docs/en/components/checkbox.mdx` (already has 7 color variants)
- [ ] T034 [P] [US1] Add ghost demo to `packages/docs/src/content/docs/en/components/radio.mdx` (already has 7 color variants)
- [ ] T035 [P] [US1] Add ghost demo to `packages/docs/src/content/docs/en/components/switch.mdx` (already has 7 color variants)

**Checkpoint**: All 20 component pages now have complete variant demos. Verify in browser before continuing.

---

## Phase 4: User Story 2 — Bug-Free Rendering via Chrome DevTools (Priority: P2)

**Goal**: Open each of the 20 component pages in Chrome via chrome-devtools, confirm zero
console errors and correct visual rendering. Fix any bugs found immediately.

**Independent Test**: Load each page — zero console errors, all variants render with visible
correct colors, ghost has no border, focus ring appears on interaction.

- [ ] T036 [US2] Open `localhost:4321/en/components/autocomplete` in chrome-devtools, take screenshot, check console errors, fix any bugs in `packages/core/src/components/autocomplete.css` and/or `packages/docs/src/content/docs/en/components/autocomplete.mdx`
- [ ] T037 [US2] Open `localhost:4321/en/components/cascader` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/cascader.css` and/or `cascader.mdx`
- [ ] T038 [US2] Open `localhost:4321/en/components/checkbox` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/checkbox.css` and/or `checkbox.mdx`
- [ ] T039 [US2] Open `localhost:4321/en/components/datepicker` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/datepicker.css` and/or `datepicker.mdx`
- [ ] T040 [US2] Open `localhost:4321/en/components/form` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/form.css` and/or `form.mdx`
- [ ] T041 [US2] Open `localhost:4321/en/components/input` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/input.css` and/or `input.mdx`
- [ ] T042 [US2] Open `localhost:4321/en/components/multi-select` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/multi-select.css` and/or `multi-select.mdx`
- [ ] T043 [US2] Open `localhost:4321/en/components/otp-input` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/otp-input.css` and/or `otp-input.mdx`
- [ ] T044 [US2] Open `localhost:4321/en/components/pin-input` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/pin-input.css` and/or `pin-input.mdx`
- [ ] T045 [US2] Open `localhost:4321/en/components/radio` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/radio.css` and/or `radio.mdx`
- [ ] T046 [US2] Open `localhost:4321/en/components/rating` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/rating.css` and/or `rating.mdx`
- [ ] T047 [US2] Open `localhost:4321/en/components/segment-control` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/segment-control.css` and/or `segment-control.mdx`
- [ ] T048 [US2] Open `localhost:4321/en/components/select` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/select.css` and/or `select.mdx`
- [ ] T049 [US2] Open `localhost:4321/en/components/slider` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/slider.css` and/or `slider.mdx`
- [ ] T050 [US2] Open `localhost:4321/en/components/switch` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/switch.css` and/or `switch.mdx`
- [ ] T051 [US2] Open `localhost:4321/en/components/textarea` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/textarea.css` and/or `textarea.mdx`
- [ ] T052 [US2] Open `localhost:4321/en/components/time-input` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/time-input.css` and/or `time-input.mdx`
- [ ] T053 [US2] Open `localhost:4321/en/components/toggle` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/toggle.css` and/or `toggle.mdx`
- [ ] T054 [US2] Open `localhost:4321/en/components/tree-select` in chrome-devtools, verify and fix any bugs in `packages/core/src/components/tree-select.css` and/or `tree-select.mdx`
- [ ] T055 [US2] Switch through all 5 themes (sunshine/moonlight/ocean/forest/sunset) on at least 3 component pages and confirm all variants update correctly — fix any theme-specific CSS issues found

**Checkpoint**: All 20 pages load cleanly with correct color rendering in all themes.

---

## Phase 5: User Story 3 — Default `on-surface` Foreground Verified (Priority: P3)

**Goal**: Confirm that every component without a color modifier class renders its text/border
in the `on-surface` color on all surface backgrounds across all 5 themes.

**Independent Test**: In chrome-devtools, inspect computed `color` property of unmodified
component — must resolve to the active theme's `--color-on-surface` value.

- [ ] T056 [US3] In chrome-devtools, inspect computed `color` of unmodified `.input` on a `surface-container` background across sunshine and moonlight themes — confirm it resolves to `on-surface`
- [ ] T057 [US3] Inspect computed `color` of unmodified `.checkbox` and `.radio` — confirm `on-surface` on both themes; fix `checkbox.css` or `radio.css` if not
- [ ] T058 [US3] Inspect computed `color` of unmodified `.select`, `.textarea`, `.autocomplete` — confirm `on-surface`; fix CSS if not
- [ ] T059 [US3] Inspect computed `color` of unmodified `.switch`, `.toggle`, `.slider`, `.rating`, `.segment-control` — confirm `on-surface` default; fix CSS if not
- [ ] T060 [US3] Verify on ocean, forest, sunset themes: pick 3 representative components (input, checkbox, select) and confirm `on-surface` default still holds — fix any theme-specific breakage

**Checkpoint**: All components default to `on-surface` — baseline accessibility contract is met.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T061 [P] Run `bun run build:core` one final time and confirm zero errors
- [ ] T062 [P] Run `cd packages/core && bun test tests/unit` and confirm all unit tests pass; fix any test failures caused by CSS changes
- [ ] T063 Run `bun run build:docs` and confirm docs site builds without errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS all user story work**
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 (needs complete demos to verify)
- **User Story 3 (Phase 5)**: Can start after Foundational; independent of US1/US2
- **Polish (Phase 6)**: Depends on all user stories complete

### Within Foundational Phase

- T003–T016: All independent, run in parallel
- T017: Runs after T003–T016 to validate

### Within User Story 1

- T018–T035: All independent (different files), run in parallel

### Within User Story 2

- T036–T054: Sequential (chrome-devtools one page at a time); T055 after all page checks

### Within User Story 3

- T056–T059: Can run in parallel (different components)
- T060: After T056–T059

---

## Parallel Execution Examples

### Foundational Phase — CSS fixes (all parallel)

```bash
# Launch all base on-surface fixes together:
Task: "Add on-surface to base .checkbox in checkbox.css"            # T003
Task: "Add on-surface to base .radio in radio.css"                  # T004
Task: "Add on-surface to base .rating in rating.css"                # T005
Task: "Add on-surface to base .segment-control in segment-control.css" # T006
Task: "Add on-surface to base .switch in switch.css"                # T007
Task: "Add on-surface to base .toggle in toggle.css"                # T008
Task: "Fix form.css: on-surface + missing variants"                 # T009
Task: "Fix slider.css: add secondary variant"                       # T011

# Launch all focus-ring migrations together:
Task: "Migrate checkbox focus ring to color-mix"                    # T012
Task: "Migrate radio focus ring to color-mix"                       # T013
Task: "Migrate segment-control focus ring to color-mix"             # T014
Task: "Migrate switch focus ring to color-mix"                      # T015
Task: "Migrate toggle focus ring to color-mix"                      # T016
```

### User Story 1 — MDX docs additions (all parallel)

```bash
# All MDX file additions are independent:
Task: "Add full variants to autocomplete.mdx"    # T018
Task: "Add full variants to cascader.mdx"        # T019
Task: "Add full variants to otp-input.mdx"       # T021
Task: "Add full variants to pin-input.mdx"       # T022
Task: "Add full variants to time-input.mdx"      # T023
Task: "Add full variants to tree-select.mdx"     # T024
# ... (T025–T035 also parallel)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational CSS fixes (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 — add all MDX demos
4. **STOP and VALIDATE**: Open all 20 pages and confirm variant demos are visible
5. Demo/PR ready for US1 — docs now show all color variants

### Incremental Delivery

1. Foundation + US1 → All docs pages have complete variant demos (MVP)
2. US2 → All pages verified bug-free via chrome-devtools (quality gate)
3. US3 → Default on-surface verified across all themes (accessibility gate)
4. Polish → Clean build, passing tests

### Parallel Team Strategy

- Developer A: T003–T011 (CSS on-surface + missing variants)
- Developer B: T012–T016 (CSS focus ring migrations)
- After T017 passes: Developer A+B split T018–T035 (MDX additions)

---

## Notes

- [P] tasks = different files, no dependencies — safe to run simultaneously
- chrome-devtools verification (Phase 4) is intentionally sequential
- `rating` has no ghost variant — icon-only exception documented in plan.md
- `form` and `form-group` have no ghost variant — layout-only components
- `slider` has no ghost variant — no visible border in default state
- All unit tests in `tests/unit/` run with `cd packages/core && bun test tests/unit`
