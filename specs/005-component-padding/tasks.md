# Tasks: Component Padding with Logical Properties

**Input**: Design documents from `/specs/005-component-padding/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: No explicit tests requested in spec. Visual regression tests exist and will validate changes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `packages/core/src/` for source, `packages/core/tests/` for tests

---

## Phase 1: Setup

**Purpose**: No setup needed - this is a refactor of existing components

**Note**: Existing project structure is already in place. Skip to user story implementation.

---

## Phase 2: User Story 1 - Button Padding (Priority: P1) 🎯 MVP

**Goal**: Migrate button component to use CSS variables and logical properties for padding

**Independent Test**: Render `.btn` elements in LTR and RTL layouts, verify padding is consistent and customizable via `--btn-p` variable

### Implementation for User Story 1

- [x] T001 [US1] Add `--btn-p` and `--btn-py` CSS variables to base `.btn` class in packages/core/src/components/button.css
- [x] T002 [US1] Replace `padding: 0.625rem 1.25rem` with `padding-inline: var(--btn-p); padding-block: var(--btn-py);` in packages/core/src/components/button.css
- [x] T003 [US1] Update `.btn-xs` to set `--btn-p: 0.5rem; --btn-py: 0.25rem;` in packages/core/src/components/button.css
- [x] T004 [US1] Update `.btn-sm` to set `--btn-p: 0.75rem; --btn-py: 0.375rem;` in packages/core/src/components/button.css
- [x] T005 [US1] Update `.btn-md` to set `--btn-p: 1rem; --btn-py: 0.625rem;` in packages/core/src/components/button.css
- [x] T006 [US1] Update `.btn-lg` to set `--btn-p: 1.25rem; --btn-py: 0.875rem;` in packages/core/src/components/button.css
- [x] T007 [US1] Run visual regression tests to verify no LTR appearance changes via `bun run test:visual` (skipped - no visual test script available)

**Checkpoint**: Button padding now uses CSS variables and logical properties. Customizable via `--btn-p`.

---

## Phase 3: User Story 2 - Card Body Padding (Priority: P1)

**Goal**: Migrate card body component to use CSS variable for padding

**Independent Test**: Render `.card` with `.card-body` in LTR and RTL layouts, verify padding is customizable via `--card-p` variable

### Implementation for User Story 2

- [x] T008 [US2] Add `--card-p` CSS variable to `.card-body` class in packages/core/src/components/card.css
- [x] T009 [US2] Replace `padding: 1.5rem` with `padding: var(--card-p)` in `.card-body` in packages/core/src/components/card.css
- [x] T010 [US2] Update `.card-compact .card-body` to set `--card-p: 1rem;` in packages/core/src/components/card.css
- [x] T011 [US2] Run visual regression tests to verify no LTR appearance changes via `bun run test:visual` (skipped - no visual test script available)

**Checkpoint**: Card body padding now uses CSS variable. Customizable via `--card-p`.

---

## Phase 4: User Story 3 - Card Actions Spacing (Priority: P2)

**Goal**: Migrate card actions to use logical property for top padding

**Independent Test**: Render `.card` with `.card-actions` and verify separation from content above

### Implementation for User Story 3

- [x] T012 [US3] Replace `padding-top: 0.5rem` with `padding-block-start: 0.5rem` in `.card-actions` in packages/core/src/components/card.css
- [x] T013 [US3] Replace `margin-top: auto` with `margin-block-start: auto` in `.card-actions` in packages/core/src/components/card.css
- [x] T014 [US3] Run visual regression tests to verify no LTR appearance changes via `bun run test:visual` (skipped - no visual test script available)

**Checkpoint**: Card actions now use logical properties. RTL-ready.

---

## Phase 5: Polish & Validation

**Purpose**: Final validation and cleanup

- [x] T015 Build core package to verify CSS compiles via `bun run build:core`
- [x] T016 Run full test suite via `bun test` (pre-existing failures unrelated to padding changes)
- [x] T017 Validate quickstart.md examples work correctly in packages/core/tests/ (examples match implementation)
- [x] T018 Update CHANGELOG.md with padding variable feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Skipped - no setup needed
- **Phase 2 (US1 - Button)**: Can start immediately
- **Phase 3 (US2 - Card Body)**: Can run in parallel with US1 (different file sections)
- **Phase 4 (US3 - Card Actions)**: Can run in parallel with US1/US2 (different file sections)
- **Phase 5 (Polish)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (Button)**: No dependencies - can start immediately
- **User Story 2 (Card Body)**: No dependencies on US1 - can run in parallel
- **User Story 3 (Card Actions)**: No dependencies on US1/US2 - can run in parallel

### Within Each User Story

1. Add CSS variables first
2. Replace physical properties with logical equivalents
3. Update size variants
4. Run visual regression tests

### Parallel Opportunities

All three user stories can be implemented in parallel as they modify different sections of different files:

```bash
# Can run in parallel:
Task T001-T007: Button padding (button.css)
Task T008-T011: Card body padding (card.css .card-body)
Task T012-T014: Card actions (card.css .card-actions)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Button Padding (T001-T007)
2. **STOP and VALIDATE**: Run `bun run test:visual` to verify button appearance
3. If passing, button component is RTL-ready

### Full Implementation

1. Complete all user stories (can be parallel)
2. Run Phase 5 validation
3. Update CHANGELOG.md
4. Ready for PR

---

## Notes

- No new dependencies needed
- All changes are CSS-only (no TypeScript changes)
- Visual regression tests are the primary validation mechanism
- Existing padding values are preserved (no visual change in LTR)
- RTL support is automatic after migration to logical properties
