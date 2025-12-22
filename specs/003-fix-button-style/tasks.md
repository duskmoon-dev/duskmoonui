# Tasks: Fix Button Style

**Input**: Design documents from `/specs/003-fix-button-style/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: No automated tests requested. Verification via visual inspection and browser dev tools.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**:
  - Core CSS: `packages/core/src/components/`
  - Docs: `packages/docs/src/content/docs/en/components/`

---

## Phase 1: Setup

**Purpose**: Verify current state and prepare for changes

- [x] T001 Verify broken color display by running `bun run dev` and viewing button page
- [x] T002 Review current button.css structure in packages/core/src/components/button.css

---

## Phase 2: User Story 1 - Button Colors Display Correctly (Priority: P1) 🎯 MVP

**Goal**: Fix color system by wrapping all color variables in `hsl()` function

**Independent Test**: Render a button with `.btn-primary` class and verify it displays warm orange background (sunshine theme) with white text

### Implementation for User Story 1

- [x] T003 [US1] Fix `.btn-primary` colors: wrap background-color, color, border-color in `hsl()` in packages/core/src/components/button.css
- [x] T004 [US1] Fix `.btn-primary:hover` colors in packages/core/src/components/button.css
- [x] T005 [US1] Fix `.btn-primary:focus-visible` outline color in packages/core/src/components/button.css
- [x] T006 [P] [US1] Fix `.btn-secondary` colors (background, color, border, hover, focus) in packages/core/src/components/button.css
- [x] T007 [P] [US1] Fix `.btn-tertiary` colors (background, color, border, hover, focus) in packages/core/src/components/button.css
- [x] T008 [P] [US1] Fix `.btn-info` colors (background, color, border, hover) in packages/core/src/components/button.css
- [x] T009 [P] [US1] Fix `.btn-success` colors (background, color, border, hover) in packages/core/src/components/button.css
- [x] T010 [P] [US1] Fix `.btn-warning` colors (background, color, border, hover) in packages/core/src/components/button.css
- [x] T011 [P] [US1] Fix `.btn-error` colors (background, color, border, hover) in packages/core/src/components/button.css

**Checkpoint**: All color variants should now display correctly. Run `bun run dev` and verify in browser.

---

## Phase 3: User Story 2 - Button Class Names Match Documentation (Priority: P1)

**Goal**: Add documented class names (.btn-outlined, .btn-text, .btn-tonal, .btn-md) as working styles

**Independent Test**: Copy code examples from button.mdx documentation and verify they render correctly

### Implementation for User Story 2

- [x] T012 [US2] Add `.btn-outlined` variant with color combinations in packages/core/src/components/button.css
- [x] T013 [US2] Fix existing `.btn-outline` color combinations to use `hsl()` syntax in packages/core/src/components/button.css
- [x] T014 [US2] Add `.btn-text` variant with color combinations in packages/core/src/components/button.css
- [x] T015 [US2] Fix existing `.btn-ghost` color combinations to use `hsl()` syntax in packages/core/src/components/button.css
- [x] T016 [US2] Add `.btn-tonal` variant with primary container colors in packages/core/src/components/button.css
- [x] T017 [US2] Add `.btn-tonal` color variants (secondary, tertiary) in packages/core/src/components/button.css
- [x] T018 [US2] Add `.btn-md` explicit medium size class in packages/core/src/components/button.css

**Checkpoint**: All documented class names (.btn-outlined, .btn-text, .btn-tonal, .btn-md) should render correctly.

---

## Phase 4: User Story 3 - Button Padding and Sizing Works Correctly (Priority: P2)

**Goal**: Verify and ensure consistent padding across all button sizes (already correct per research.md)

**Independent Test**: Render buttons of each size and verify padding via browser computed styles

### Implementation for User Story 3

- [x] T019 [US3] Verify base `.btn` padding (0.625rem 1.25rem / 10px 20px) in packages/core/src/components/button.css
- [x] T020 [US3] Verify `.btn-sm` padding (0.375rem 0.75rem / 6px 12px) in packages/core/src/components/button.css
- [x] T021 [US3] Verify `.btn-lg` padding (0.875rem 1.75rem / 14px 28px) in packages/core/src/components/button.css

**Checkpoint**: All button sizes should have consistent, visible padding.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility and build verification

- [x] T022 Add `@media (prefers-reduced-motion: reduce)` for `.btn` transition in packages/core/src/components/button.css
- [x] T023 Add `@media (prefers-reduced-motion: reduce)` for `.btn-loading` animation in packages/core/src/components/button.css
- [x] T024 Run `bun run build:core` to verify CSS compiles without errors
- [x] T025 Run `bun run build:docs` to verify documentation site builds successfully
- [x] T026 Visual verification of all button variants in both sunshine and moonlight themes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup - CORE FIX for colors
- **User Story 2 (Phase 3)**: Can run after Setup; no dependency on US1 (class additions are independent)
- **User Story 3 (Phase 4)**: Verification only - no dependencies, can run after Setup
- **Polish (Phase 5)**: Depends on US1 and US2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately after Setup - Fixes core color issue
- **User Story 2 (P1)**: Can start in parallel with US1 - Adds new classes (different CSS selectors)
- **User Story 3 (P2)**: Verification only - can run anytime after Setup

### Within Each User Story

- All color variant fixes (T006-T011) can run in parallel (different selectors)
- Tasks within same selector group should be sequential (primary → hover → focus)

### Parallel Opportunities

Within User Story 1:
```
# All secondary/tertiary/semantic color fixes can run in parallel:
T006 [P] [US1] Fix .btn-secondary colors
T007 [P] [US1] Fix .btn-tertiary colors
T008 [P] [US1] Fix .btn-info colors
T009 [P] [US1] Fix .btn-success colors
T010 [P] [US1] Fix .btn-warning colors
T011 [P] [US1] Fix .btn-error colors
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify broken state)
2. Complete Phase 2: User Story 1 (fix color syntax)
3. **STOP and VALIDATE**: Colors should now display correctly
4. Minimal viable fix is complete - buttons work visually

### Incremental Delivery

1. Setup → Verify broken state
2. User Story 1 → Colors work → Visual validation (MVP!)
3. User Story 2 → Documented classes work → Visual validation
4. User Story 3 → Padding verified → Visual validation
5. Polish → Accessibility + Build verification → Ready for PR

### Single Developer Strategy

Since this is a single-file CSS fix:

1. Complete all Setup tasks
2. Fix all color syntax issues (US1 T003-T011)
3. Add all new class variants (US2 T012-T018)
4. Verify sizing (US3 T019-T021)
5. Add accessibility and verify build (Polish)

---

## Notes

- All changes are in a single file: `packages/core/src/components/button.css`
- No automated tests - verification via browser dev tools and visual inspection
- Backward compatibility maintained: `.btn-outline` and `.btn-ghost` remain as aliases
- New classes: `.btn-outlined`, `.btn-text`, `.btn-tonal`, `.btn-md`
- The `hsl()` wrapper is the critical fix - without it, colors won't display
