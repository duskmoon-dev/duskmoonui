# Tasks: OKLCH Color System Migration

**Input**: Design documents from `/specs/004-oklch-color-system/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: Visual regression tests included per spec requirement (SC-005).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `packages/core/` for plugin, `packages/docs/` for documentation
- Themes: `packages/core/src/themes/`
- Components: `packages/core/src/components/`
- Tests: `packages/core/tests/visual/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare for OKLCH migration

- [ ] T001 Create HSL to OKLCH conversion reference document in specs/004-oklch-color-system/conversions.md
- [ ] T002 [P] Backup current sunshine.css theme before migration in packages/core/src/themes/sunshine.backup.css
- [ ] T003 [P] Backup current moonlight.css theme before migration in packages/core/src/themes/moonlight.backup.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core theme migration that MUST be complete before component updates

**⚠️ CRITICAL**: No component updates can begin until theme colors are migrated

### Sunshine Theme Migration

- [ ] T004 [US1] Convert primary color tokens to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T005 [US1] Convert secondary color tokens to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T006 [US1] Convert tertiary color tokens to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T007 [US1] Convert surface color tokens to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T008 [US1] Convert semantic color tokens (info, success, warning, error) to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T009 [US1] Convert base scale (base-100 to base-900) to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T010 [US1] Convert outline color tokens to OKLCH in packages/core/src/themes/sunshine.css
- [ ] T011 [US1] Remove -focus tokens (primary-focus, secondary-focus, tertiary-focus) from packages/core/src/themes/sunshine.css
- [ ] T012 [US1] Update :root default colors to OKLCH in packages/core/src/themes/sunshine.css

### Moonlight Theme Migration

- [ ] T013 [P] [US1] Convert primary color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T014 [P] [US1] Convert secondary color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T015 [P] [US1] Convert tertiary color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T016 [P] [US1] Convert surface color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T017 [P] [US1] Convert semantic color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T018 [P] [US1] Convert base scale to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T019 [P] [US1] Convert outline color tokens to OKLCH in packages/core/src/themes/moonlight.css
- [ ] T020 [P] [US1] Remove -focus tokens from packages/core/src/themes/moonlight.css
- [ ] T021 [P] [US1] Update @media (prefers-color-scheme: dark) colors to OKLCH in packages/core/src/themes/moonlight.css

**Checkpoint**: Theme files fully migrated to OKLCH - component updates can begin

---

## Phase 3: User Story 1 - Theme Developer Defines Custom Colors (Priority: P1) 🎯 MVP

**Goal**: Theme files use OKLCH format, all color tokens render correctly

**Independent Test**: Load sunshine/moonlight themes and verify all colors display correctly in browser

### Theme Validation

- [ ] T022 [US1] Verify WCAG AA contrast ratios for primary/primary-content combinations in both themes
- [ ] T023 [US1] Verify WCAG AA contrast ratios for secondary/secondary-content combinations in both themes
- [ ] T024 [US1] Verify WCAG AA contrast ratios for tertiary/tertiary-content combinations in both themes
- [ ] T025 [US1] Verify WCAG AA contrast ratios for surface/on-surface combinations in both themes
- [ ] T026 [US1] Verify WCAG AA contrast ratios for semantic colors in both themes
- [ ] T027 [US1] Test theme switching between sunshine and moonlight in browser
- [ ] T028 [US1] Build core package and verify no CSS errors in packages/core/

**Checkpoint**: User Story 1 complete - themes work with OKLCH colors

---

## Phase 4: User Story 2 - Component Developer Uses Color Manipulation (Priority: P2)

**Goal**: Components use color-mix() for hover/focus states instead of -focus tokens

**Independent Test**: Verify button hover darkens by 10% using color-mix()

### Core Interactive Components

- [ ] T029 [US2] Update button.css to use var(--color-*) and color-mix() for hover in packages/core/src/components/button.css
- [ ] T030 [P] [US2] Update input.css to use var(--color-*) and color-mix() for focus in packages/core/src/components/input.css
- [ ] T031 [P] [US2] Update form.css to use OKLCH colors in packages/core/src/components/form.css
- [ ] T032 [P] [US2] Update switch.css to use OKLCH colors and color-mix() in packages/core/src/components/switch.css
- [ ] T033 [P] [US2] Update slider.css to use OKLCH colors in packages/core/src/components/slider.css
- [ ] T034 [P] [US2] Update rating.css to use OKLCH colors in packages/core/src/components/rating.css
- [ ] T035 [P] [US2] Update chip.css to use OKLCH colors and color-mix() in packages/core/src/components/chip.css

### Navigation Components

- [ ] T036 [P] [US2] Update navigation.css to use OKLCH colors in packages/core/src/components/navigation.css
- [ ] T037 [P] [US2] Update bottom-navigation.css to use OKLCH colors in packages/core/src/components/bottom-navigation.css
- [ ] T038 [P] [US2] Update stepper.css to use OKLCH colors in packages/core/src/components/stepper.css
- [ ] T039 [P] [US2] Update drawer.css to use OKLCH colors in packages/core/src/components/drawer.css
- [ ] T040 [P] [US2] Update appbar.css to use OKLCH colors in packages/core/src/components/appbar.css

### Feedback Components

- [ ] T041 [P] [US2] Update alert.css to use OKLCH colors in packages/core/src/components/alert.css
- [ ] T042 [P] [US2] Update toast.css to use OKLCH colors in packages/core/src/components/toast.css
- [ ] T043 [P] [US2] Update snackbar.css to use OKLCH colors in packages/core/src/components/snackbar.css
- [ ] T044 [P] [US2] Update progress.css to use OKLCH colors in packages/core/src/components/progress.css
- [ ] T045 [P] [US2] Update skeleton.css to use OKLCH colors in packages/core/src/components/skeleton.css

### Container Components

- [ ] T046 [P] [US2] Update card.css to use OKLCH colors in packages/core/src/components/card.css
- [ ] T047 [P] [US2] Update modal.css to use OKLCH colors in packages/core/src/components/modal.css
- [ ] T048 [P] [US2] Update dialog.css to use OKLCH colors in packages/core/src/components/dialog.css
- [ ] T049 [P] [US2] Update accordion.css to use OKLCH colors in packages/core/src/components/accordion.css
- [ ] T050 [P] [US2] Update collapse.css to use OKLCH colors in packages/core/src/components/collapse.css
- [ ] T051 [P] [US2] Update bottomsheet.css to use OKLCH colors in packages/core/src/components/bottomsheet.css

### Data Display Components

- [ ] T052 [P] [US2] Update table.css to use OKLCH colors in packages/core/src/components/table.css
- [ ] T053 [P] [US2] Update list.css to use OKLCH colors in packages/core/src/components/list.css
- [ ] T054 [P] [US2] Update badge.css to use OKLCH colors in packages/core/src/components/badge.css
- [ ] T055 [P] [US2] Update avatar.css to use OKLCH colors in packages/core/src/components/avatar.css
- [ ] T056 [P] [US2] Update timeline.css to use OKLCH colors in packages/core/src/components/timeline.css

### Utility Components

- [ ] T057 [P] [US2] Update tooltip.css to use OKLCH colors in packages/core/src/components/tooltip.css
- [ ] T058 [P] [US2] Update popover.css to use OKLCH colors in packages/core/src/components/popover.css
- [ ] T059 [P] [US2] Update divider.css to use OKLCH colors in packages/core/src/components/divider.css
- [ ] T060 [P] [US2] Update autocomplete.css to use OKLCH colors in packages/core/src/components/autocomplete.css
- [ ] T061 [P] [US2] Update datepicker.css to use OKLCH colors in packages/core/src/components/datepicker.css
- [ ] T062 [P] [US2] Update file-upload.css to use OKLCH colors in packages/core/src/components/file-upload.css

**Checkpoint**: User Story 2 complete - all components use OKLCH and color-mix()

---

## Phase 5: User Story 3 - End User Experiences Consistent Colors (Priority: P3)

**Goal**: Visual regression tests pass, colors are consistent across all components

**Independent Test**: Run visual regression tests and verify no color artifacts

### Visual Regression Testing

- [ ] T063 [US3] Update visual test snapshots for button component in packages/core/tests/visual/
- [ ] T064 [P] [US3] Update visual test snapshots for card component in packages/core/tests/visual/
- [ ] T065 [P] [US3] Update visual test snapshots for input component in packages/core/tests/visual/
- [ ] T066 [P] [US3] Update visual test snapshots for navigation component in packages/core/tests/visual/
- [ ] T067 [P] [US3] Update visual test snapshots for form component in packages/core/tests/visual/
- [ ] T068 [P] [US3] Update visual test snapshots for modal component in packages/core/tests/visual/
- [ ] T069 [US3] Run full visual regression test suite in packages/core/
- [ ] T070 [US3] Verify hover state transitions are smooth (no saturation jumps) in all interactive components
- [ ] T071 [US3] Test colors on P3 wide-gamut display (if available)

**Checkpoint**: User Story 3 complete - visual tests pass, colors consistent

---

## Phase 6: User Story 4 - Documentation Shows Color Usage (Priority: P4)

**Goal**: Documentation updated with OKLCH examples and migration guide

**Independent Test**: Documentation site builds and examples are accurate

### Documentation Updates

- [ ] T072 [US4] Update colors.mdx with OKLCH format explanation in packages/docs/src/content/docs/
- [ ] T073 [P] [US4] Add color-mix() usage examples to colors documentation in packages/docs/src/content/docs/
- [ ] T074 [P] [US4] Add custom theme creation guide with OKLCH in packages/docs/src/content/docs/
- [ ] T075 [P] [US4] Update component examples to show OKLCH-based styling in packages/docs/
- [ ] T076 [US4] Add migration guide from v1.x HSL to v2.x OKLCH in packages/docs/src/content/docs/
- [ ] T077 [US4] Build documentation site and verify no broken examples in packages/docs/

**Checkpoint**: User Story 4 complete - documentation updated

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [ ] T078 Build core package and verify CSS output size in packages/core/
- [ ] T079 [P] Remove backup theme files in packages/core/src/themes/
- [ ] T080 [P] Update CHANGELOG.md with OKLCH migration notes
- [ ] T081 Run full test suite (bun test) to verify all tests pass
- [ ] T082 Validate build output size is within 10% of previous
- [ ] T083 [P] Update package.json version for major release in packages/core/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 theme migrations
- **User Story 2 (Phase 4)**: Depends on Phase 2 (theme OKLCH tokens must exist)
- **User Story 3 (Phase 5)**: Depends on Phase 4 (components must be updated)
- **User Story 4 (Phase 6)**: Can start after Phase 3, parallel with Phase 4/5
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Blocks US2 (components need OKLCH theme tokens)
- **User Story 2 (P2)**: Blocks US3 (visual tests need updated components)
- **User Story 3 (P3)**: Independent of US4
- **User Story 4 (P4)**: Can proceed in parallel with US2/US3

### Within Each User Story

- Theme tokens before component updates
- Component updates before visual tests
- Visual tests before documentation

### Parallel Opportunities

**Phase 2 (after T012)**:
- T013-T021 (moonlight theme) can run in parallel with T004-T012 (sunshine theme)

**Phase 4 (all components)**:
- T030-T062 can ALL run in parallel (different files)

**Phase 5 (visual tests)**:
- T064-T068 can run in parallel

**Phase 6 (documentation)**:
- T073-T075 can run in parallel

---

## Parallel Example: Phase 4 Components

```bash
# Launch all component updates together (different files, no dependencies):
Task: "Update input.css to use var(--color-*) in packages/core/src/components/input.css"
Task: "Update form.css to use OKLCH colors in packages/core/src/components/form.css"
Task: "Update switch.css to use OKLCH colors in packages/core/src/components/switch.css"
Task: "Update card.css to use OKLCH colors in packages/core/src/components/card.css"
# ... all 33 component files in parallel
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational theme migrations (T004-T021)
3. Complete Phase 3: Theme validation (T022-T028)
4. **STOP and VALIDATE**: Build passes, themes render correctly
5. Deploy as alpha release

### Incremental Delivery

1. Setup + Foundational + US1 → Theme migration complete (MVP)
2. Add US2 (components) → Full OKLCH system working
3. Add US3 (visual tests) → Quality assured
4. Add US4 (docs) → User-ready release
5. Polish → Production release v2.0.0

### Single Developer Strategy

Execute phases sequentially:
1. Phase 1 → Phase 2 → Phase 3 (MVP checkpoint)
2. Phase 4 (update one component category at a time)
3. Phase 5 → Phase 6 → Phase 7

---

## Notes

- [P] tasks = different files, can run in parallel
- [Story] label maps task to specific user story
- OKLCH values should be validated using https://oklch.com/
- Contrast ratios can be checked in browser DevTools
- Visual snapshots will need regeneration after OKLCH migration
- This is a MAJOR version bump (v1.x → v2.0.0) due to color format change
