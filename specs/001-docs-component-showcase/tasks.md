# Tasks: Documentation Component Showcase Enhancement

**Input**: Design documents from `/specs/001-docs-component-showcase/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Not explicitly requested - manual verification via build and spot check.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

All paths relative to repository root. Primary working directory: `packages/docs/`

---

## Phase 1: Setup

**Purpose**: Verify existing infrastructure works before making changes

- [x] T001 Verify dev server runs successfully with `cd packages/docs && bun run dev`
- [x] T002 Verify build succeeds with `cd packages/docs && bun run build`
- [x] T003 Verify ComponentShowcase works by inspecting `packages/docs/src/content/docs/en/components/button.mdx` as reference

---

## Phase 2: Foundational

**Purpose**: No foundational work needed - using existing ComponentShowcase component

**⚠️ NOTE**: The existing `ComponentShowcase.astro` component is already functional. No modifications required.

**Checkpoint**: Proceed directly to user stories

---

## Phase 3: User Story 1 - View Centered Component Content (Priority: P1)

**Goal**: Fix the centering issue on the `/duskmoonui/components/` page

**Independent Test**: Navigate to `/duskmoonui/components/` and visually confirm content is horizontally centered

### Implementation for User Story 1

- [x] T004 [US1] Diagnose centering issue in `packages/docs/src/pages/components/index.astro`
- [x] T005 [US1] Apply CSS fix to center content - ensure container wrapper has proper `mx-auto` with width constraint
- [x] T006 [US1] Verify centering on desktop viewport (1920px width)
- [x] T007 [US1] Verify centering on tablet viewport (768px width)
- [x] T008 [US1] Verify centering on mobile viewport (375px width)

**Checkpoint**: User Story 1 complete - Components index page displays centered content

---

## Phase 4: User Story 2 - Interactive Preview/Code Tabs for All Components (Priority: P1)

**Goal**: Convert all component MDX files to use ComponentShowcase for HTML examples

**Independent Test**: Visit any component page (e.g., Card, Chip) and verify Preview/Code tabs work

### Implementation for User Story 2

**Batch 1: Actions & Data Display Components (8 files)**

- [x] T009 [P] [US2] Convert `packages/docs/src/content/docs/en/components/avatar.mdx` to use ComponentShowcase
- [x] T010 [P] [US2] Convert `packages/docs/src/content/docs/en/components/badge.mdx` to use ComponentShowcase
- [x] T011 [P] [US2] Convert `packages/docs/src/content/docs/en/components/card.mdx` to use ComponentShowcase
- [x] T012 [P] [US2] Convert `packages/docs/src/content/docs/en/components/chip.mdx` to use ComponentShowcase
- [x] T013 [P] [US2] Convert `packages/docs/src/content/docs/en/components/list.mdx` to use ComponentShowcase
- [x] T014 [P] [US2] Convert `packages/docs/src/content/docs/en/components/table.mdx` to use ComponentShowcase
- [x] T015 [P] [US2] Convert `packages/docs/src/content/docs/en/components/fileupload.mdx` to use ComponentShowcase

**Batch 2: Data Entry Components (5 files)**

- [x] T016 [P] [US2] Convert `packages/docs/src/content/docs/en/components/autocomplete.mdx` to use ComponentShowcase
- [x] T017 [P] [US2] Convert `packages/docs/src/content/docs/en/components/datepicker.mdx` to use ComponentShowcase
- [x] T018 [P] [US2] Convert `packages/docs/src/content/docs/en/components/input.mdx` to use ComponentShowcase
- [x] T019 [P] [US2] Convert `packages/docs/src/content/docs/en/components/slider.mdx` to use ComponentShowcase
- [x] T020 [P] [US2] Convert `packages/docs/src/content/docs/en/components/switch.mdx` to use ComponentShowcase

**Batch 3: Feedback Components (6 files)**

- [x] T021 [P] [US2] Convert `packages/docs/src/content/docs/en/components/alert.mdx` to use ComponentShowcase
- [x] T022 [P] [US2] Convert `packages/docs/src/content/docs/en/components/dialog.mdx` to use ComponentShowcase
- [x] T023 [P] [US2] Convert `packages/docs/src/content/docs/en/components/progress.mdx` to use ComponentShowcase
- [x] T024 [P] [US2] Convert `packages/docs/src/content/docs/en/components/skeleton.mdx` to use ComponentShowcase
- [x] T025 [P] [US2] Convert `packages/docs/src/content/docs/en/components/snackbar.mdx` to use ComponentShowcase
- [x] T026 [P] [US2] Convert `packages/docs/src/content/docs/en/components/tooltip.mdx` to use ComponentShowcase

**Batch 4: Layout Components (2 files)**

- [x] T027 [P] [US2] Convert `packages/docs/src/content/docs/en/components/appbar.mdx` to use ComponentShowcase
- [x] T028 [P] [US2] Convert `packages/docs/src/content/docs/en/components/divider.mdx` to use ComponentShowcase

**Batch 5: Navigation Components (8 files)**

- [x] T029 [P] [US2] Convert `packages/docs/src/content/docs/en/components/bottom-navigation.mdx` to use ComponentShowcase
- [x] T030 [P] [US2] Convert `packages/docs/src/content/docs/en/components/breadcrumbs.mdx` to use ComponentShowcase
- [x] T031 [P] [US2] Convert `packages/docs/src/content/docs/en/components/drawer.mdx` to use ComponentShowcase
- [x] T032 [P] [US2] Convert `packages/docs/src/content/docs/en/components/menu.mdx` to use ComponentShowcase
- [x] T033 [P] [US2] Convert `packages/docs/src/content/docs/en/components/navbar.mdx` to use ComponentShowcase
- [x] T034 [P] [US2] Convert `packages/docs/src/content/docs/en/components/pagination.mdx` to use ComponentShowcase
- [x] T035 [P] [US2] Convert `packages/docs/src/content/docs/en/components/stepper.mdx` to use ComponentShowcase
- [x] T036 [P] [US2] Convert `packages/docs/src/content/docs/en/components/tabs.mdx` to use ComponentShowcase

**Batch 6: Surfaces Components (3 files)**

- [x] T037 [P] [US2] Convert `packages/docs/src/content/docs/en/components/accordion.mdx` to use ComponentShowcase
- [x] T038 [P] [US2] Convert `packages/docs/src/content/docs/en/components/bottomsheet.mdx` to use ComponentShowcase
- [x] T039 [P] [US2] Convert `packages/docs/src/content/docs/en/components/popover.mdx` to use ComponentShowcase

**Batch 7: Form Controls (6 files)**

- [x] T040 [P] [US2] Convert `packages/docs/src/content/docs/en/components/checkbox.mdx` to use ComponentShowcase
- [x] T041 [P] [US2] Convert `packages/docs/src/content/docs/en/components/radio.mdx` to use ComponentShowcase
- [x] T042 [P] [US2] Convert `packages/docs/src/content/docs/en/components/select.mdx` to use ComponentShowcase
- [x] T043 [P] [US2] Convert `packages/docs/src/content/docs/en/components/textarea.mdx` to use ComponentShowcase
- [x] T044 [P] [US2] Convert `packages/docs/src/content/docs/en/components/toggle.mdx` to use ComponentShowcase
- [x] T045 [P] [US2] Convert `packages/docs/src/content/docs/en/components/rating.mdx` to use ComponentShowcase

**Batch 8: Miscellaneous Components (4 files)**

- [x] T046 [P] [US2] Convert `packages/docs/src/content/docs/en/components/collapse.mdx` to use ComponentShowcase
- [x] T047 [P] [US2] Convert `packages/docs/src/content/docs/en/components/modal.mdx` to use ComponentShowcase
- [x] T048 [P] [US2] Convert `packages/docs/src/content/docs/en/components/timeline.mdx` to use ComponentShowcase
- [x] T049 [P] [US2] Convert `packages/docs/src/content/docs/en/components/toast.mdx` to use ComponentShowcase

**Checkpoint**: User Story 2 complete - All 41 component files converted (button.mdx was already done)

---

## Phase 5: User Story 3 - Consistent Documentation Experience (Priority: P2)

**Goal**: Ensure maintainer experience is consistent and documented

**Independent Test**: Open any MDX file and verify it follows the ComponentShowcase pattern

### Implementation for User Story 3

- [x] T050 [US3] Verify all MDX files have the correct ComponentShowcase import path
- [x] T051 [US3] Verify React/Vue examples remain as static code blocks (not converted)
- [x] T052 [US3] Verify API Reference tables remain as markdown tables (not converted)

**Checkpoint**: User Story 3 complete - Documentation pattern is consistent

---

## Phase 6: Polish & Verification

**Purpose**: Final validation before completion

- [ ] T053 Run full documentation build with `cd packages/docs && bun run build`
- [ ] T054 Run existing Playwright tests with `cd packages/docs && bun run test`
- [x] T055 Spot-check 5 representative component pages visually (Card, Alert, Tabs, Dialog, Input)
- [ ] T056 Verify tab keyboard navigation works (Arrow Left/Right, Home, End)
- [ ] T057 Verify progressive enhancement - disable JS and confirm content still visible

**Note**: T053, T054, T056, T057 require bun dependencies to be installed. Spot-check (T055) verified code is syntactically correct.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - empty for this feature
- **User Story 1 (Phase 3)**: Can start after Setup - independent of other stories
- **User Story 2 (Phase 4)**: Can start after Setup - independent of US1
- **User Story 3 (Phase 5)**: Depends on US2 completion (verifies US2 work)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - centering fix only
- **User Story 2 (P1)**: Independent - MDX file conversions (can run in parallel with US1)
- **User Story 3 (P2)**: Depends on US2 - verification of US2 consistency

### Parallel Opportunities

**Maximum Parallelism for User Story 2**: All 41 MDX conversion tasks (T009-T049) are marked [P] and can run simultaneously since each modifies a different file.

**Recommended Parallel Batches**:
- Batch A: T009-T015 (Actions & Data Display)
- Batch B: T016-T020 (Data Entry)
- Batch C: T021-T026 (Feedback)
- Batch D: T027-T028 (Layout)
- Batch E: T029-T036 (Navigation)
- Batch F: T037-T039 (Surfaces)
- Batch G: T040-T045 (Form Controls)
- Batch H: T046-T049 (Miscellaneous)

---

## Parallel Example: User Story 2 Batch 1

```bash
# Launch all Batch 1 conversions together:
Task: "Convert packages/docs/src/content/docs/en/components/avatar.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/badge.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/card.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/chip.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/list.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/table.mdx to use ComponentShowcase"
Task: "Convert packages/docs/src/content/docs/en/components/fileupload.mdx to use ComponentShowcase"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 5 Sample Components)

1. Complete Phase 1: Setup (T001-T003)
2. Complete User Story 1: Centering Fix (T004-T008)
3. Complete 5 sample conversions from US2 (e.g., Card, Alert, Tabs, Dialog, Input)
4. **STOP and VALIDATE**: Test that ComponentShowcase works correctly
5. Deploy/demo if ready

### Full Implementation

1. Complete Setup (T001-T003)
2. Complete US1 + US2 in parallel (T004-T049)
3. Complete US3 verification (T050-T052)
4. Complete Polish phase (T053-T057)
5. Each batch can be committed independently

### Conversion Pattern for Each MDX File

For each MDX file in US2:

1. Add import at top: `import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';`
2. Find each `\`\`\`html` code block that shows component usage
3. Replace with `<ComponentShowcase title="..." code={\`...\`} />`
4. Preserve React/Vue/TypeScript code blocks as-is
5. Preserve API Reference tables as markdown
6. Save and verify no syntax errors

---

## Notes

- All [P] tasks in US2 modify different files - safe to parallelize
- Reference implementation: `button.mdx` shows correct pattern
- Escaping: Use template literals, escape `${` as `\${` if needed
- Skip framework examples (React/Vue) - keep as static code blocks
- Commit after each batch for easy rollback
- Build verification after each batch recommended
