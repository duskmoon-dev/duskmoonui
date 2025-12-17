# Tasks: Component Styles Implementation

**Input**: Design documents from `/specs/002-component-styles/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Visual/functional testing via documentation site. No unit tests specified.

**Organization**: Tasks grouped by user story and component category for parallel implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Core package**: `packages/core/src/components/` - CSS component files
- **Documentation**: `packages/docs/src/content/docs/en/components/` - MDX pages
- **Root**: `README.md` - Project README

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing infrastructure and establish patterns

- [x] T001 Verify existing CSS files follow `@layer components` pattern in packages/core/src/components/button.css
- [x] T002 Verify theme variables exist in packages/core/src/themes/sunshine.css and moonlight.css
- [x] T003 Review packages/core/src/components/index.css imports structure

**Checkpoint**: Setup verified - component implementation can begin

---

## Phase 2: Foundational (Component Base Patterns)

**Purpose**: Establish CSS patterns that all components will follow

**⚠️ CRITICAL**: Patterns must be established before parallel component work

- [x] T004 Document CSS variable naming convention based on existing button.css patterns
- [x] T005 Create CSS snippet template for new components with required sections (base, variants, colors, sizes, states)
- [x] T006 Update packages/core/src/components/index.css to import all component CSS files (add placeholders for new files)

**Checkpoint**: Foundation ready - component CSS implementation can begin in parallel

---

## Phase 3: User Story 1 - Complete Component Style Library (Priority: P1) - MVP

**Goal**: All 42 documented components have working CSS styles (36 new CSS files + 6 existing to verify)

**Independent Test**: Import @duskmoon-dev/core, use any documented component class, verify it renders correctly

### Verify Existing Components (4 complete + 2 partial)

- [x] T007 [P] [US1] Verify button.css meets contract requirements in packages/core/src/components/button.css
- [x] T008 [P] [US1] Verify card.css meets contract requirements in packages/core/src/components/card.css
- [x] T009 [P] [US1] Verify input.css meets contract requirements in packages/core/src/components/input.css
- [x] T010 [P] [US1] Verify modal.css meets contract requirements in packages/core/src/components/modal.css
- [x] T011 [P] [US1] Review form.css utilities in packages/core/src/components/form.css
- [x] T012 [P] [US1] Review navigation.css base styles in packages/core/src/components/navigation.css

### Data Display Components (6 components, 1 exists: card)

- [ ] T013 [P] [US1] Create avatar component CSS in packages/core/src/components/avatar.css
- [ ] T014 [P] [US1] Create badge component CSS in packages/core/src/components/badge.css
- [ ] T015 [P] [US1] Create chip component CSS in packages/core/src/components/chip.css
- [ ] T016 [P] [US1] Create list component CSS in packages/core/src/components/list.css
- [ ] T017 [P] [US1] Create table component CSS in packages/core/src/components/table.css

### Data Entry Components (12 components, 2 exist: input, form)

- [ ] T018 [P] [US1] Create autocomplete component CSS in packages/core/src/components/autocomplete.css
- [ ] T019 [P] [US1] Create checkbox component CSS in packages/core/src/components/checkbox.css
- [ ] T020 [P] [US1] Create datepicker component CSS in packages/core/src/components/datepicker.css
- [ ] T021 [P] [US1] Create file-upload component CSS in packages/core/src/components/file-upload.css
- [ ] T022 [P] [US1] Create radio component CSS in packages/core/src/components/radio.css
- [ ] T023 [P] [US1] Create rating component CSS in packages/core/src/components/rating.css
- [ ] T024 [P] [US1] Create select component CSS in packages/core/src/components/select.css
- [ ] T025 [P] [US1] Create slider component CSS in packages/core/src/components/slider.css
- [ ] T026 [P] [US1] Create switch component CSS in packages/core/src/components/switch.css
- [ ] T027 [P] [US1] Create textarea component CSS in packages/core/src/components/textarea.css
- [ ] T028 [P] [US1] Create toggle component CSS in packages/core/src/components/toggle.css

### Feedback Components (7 components, 0 exist)

- [ ] T029 [P] [US1] Create alert component CSS in packages/core/src/components/alert.css
- [ ] T030 [P] [US1] Create dialog component CSS in packages/core/src/components/dialog.css
- [ ] T031 [P] [US1] Create progress component CSS in packages/core/src/components/progress.css
- [ ] T032 [P] [US1] Create skeleton component CSS in packages/core/src/components/skeleton.css
- [ ] T033 [P] [US1] Create snackbar component CSS in packages/core/src/components/snackbar.css
- [ ] T034 [P] [US1] Create toast component CSS in packages/core/src/components/toast.css
- [ ] T035 [P] [US1] Create tooltip component CSS in packages/core/src/components/tooltip.css

### Layout Components (2 components, 0 exist)

- [ ] T036 [P] [US1] Create appbar component CSS in packages/core/src/components/appbar.css
- [ ] T037 [P] [US1] Create divider component CSS in packages/core/src/components/divider.css

### Navigation Components (8 components, 1 partial: navigation.css)

- [ ] T038 [P] [US1] Create bottom-navigation component CSS in packages/core/src/components/bottom-navigation.css
- [ ] T039 [P] [US1] Create breadcrumbs component CSS in packages/core/src/components/breadcrumbs.css
- [ ] T040 [P] [US1] Create drawer component CSS in packages/core/src/components/drawer.css
- [ ] T041 [P] [US1] Create menu component CSS in packages/core/src/components/menu.css
- [ ] T042 [P] [US1] Create navbar component CSS in packages/core/src/components/navbar.css
- [ ] T043 [P] [US1] Create pagination component CSS in packages/core/src/components/pagination.css
- [ ] T044 [P] [US1] Create stepper component CSS in packages/core/src/components/stepper.css
- [ ] T045 [P] [US1] Create tabs component CSS in packages/core/src/components/tabs.css

### Surfaces Components (5 components, 1 exists: modal)

- [ ] T046 [P] [US1] Create accordion component CSS in packages/core/src/components/accordion.css
- [ ] T047 [P] [US1] Create bottomsheet component CSS in packages/core/src/components/bottomsheet.css
- [ ] T048 [P] [US1] Create collapse component CSS in packages/core/src/components/collapse.css
- [ ] T049 [P] [US1] Create popover component CSS in packages/core/src/components/popover.css

### Misc Components (1 component, 0 exist)

- [ ] T050 [P] [US1] Create timeline component CSS in packages/core/src/components/timeline.css

### Integration

- [ ] T051 [US1] Update packages/core/src/components/index.css to import all new CSS files
- [ ] T052 [US1] Build and verify all components load in packages/core/dist/

**Checkpoint**: All 42 component CSS files exist and build successfully

---

## Phase 4: User Story 2 - Updated README Documentation (Priority: P1)

**Goal**: README accurately reflects implemented components with working examples

**Independent Test**: Follow README Quick Start guide and verify components render correctly

- [ ] T053 [US2] Update README.md to remove "Component styles" from roadmap TODO
- [ ] T054 [US2] Update README.md features section with complete component list
- [ ] T055 [US2] Update README.md Quick Start section with component usage examples
- [ ] T056 [US2] Add README.md links to documentation site component pages

**Checkpoint**: README accurately describes all available components

---

## Phase 5: User Story 3 - Synchronized Documentation Site (Priority: P2)

**Goal**: Documentation site examples use valid CSS classes that produce correct visual output

**Independent Test**: Visit each component page, copy example code, verify it renders as shown

### Verify and Update Documentation Pages

- [ ] T057 [P] [US3] Verify avatar.mdx examples match avatar.css classes in packages/docs/src/content/docs/en/components/avatar.mdx
- [ ] T058 [P] [US3] Verify badge.mdx examples match badge.css classes in packages/docs/src/content/docs/en/components/badge.mdx
- [ ] T059 [P] [US3] Verify chip.mdx examples match chip.css classes in packages/docs/src/content/docs/en/components/chip.mdx
- [ ] T060 [P] [US3] Verify list.mdx examples match list.css classes in packages/docs/src/content/docs/en/components/list.mdx
- [ ] T061 [P] [US3] Verify table.mdx examples match table.css classes in packages/docs/src/content/docs/en/components/table.mdx
- [ ] T062 [P] [US3] Verify autocomplete.mdx examples match autocomplete.css classes in packages/docs/src/content/docs/en/components/autocomplete.mdx
- [ ] T063 [P] [US3] Verify checkbox.mdx examples match checkbox.css classes in packages/docs/src/content/docs/en/components/checkbox.mdx
- [ ] T064 [P] [US3] Verify datepicker.mdx examples match datepicker.css classes in packages/docs/src/content/docs/en/components/datepicker.mdx
- [ ] T065 [P] [US3] Verify file-upload.mdx examples match file-upload.css classes in packages/docs/src/content/docs/en/components/file-upload.mdx
- [ ] T066 [P] [US3] Verify radio.mdx examples match radio.css classes in packages/docs/src/content/docs/en/components/radio.mdx
- [ ] T067 [P] [US3] Verify rating.mdx examples match rating.css classes in packages/docs/src/content/docs/en/components/rating.mdx
- [ ] T068 [P] [US3] Verify select.mdx examples match select.css classes in packages/docs/src/content/docs/en/components/select.mdx
- [ ] T069 [P] [US3] Verify slider.mdx examples match slider.css classes in packages/docs/src/content/docs/en/components/slider.mdx
- [ ] T070 [P] [US3] Verify switch.mdx examples match switch.css classes in packages/docs/src/content/docs/en/components/switch.mdx
- [ ] T071 [P] [US3] Verify textarea.mdx examples match textarea.css classes in packages/docs/src/content/docs/en/components/textarea.mdx
- [ ] T072 [P] [US3] Verify toggle.mdx examples match toggle.css classes in packages/docs/src/content/docs/en/components/toggle.mdx
- [ ] T073 [P] [US3] Verify alert.mdx examples match alert.css classes in packages/docs/src/content/docs/en/components/alert.mdx
- [ ] T074 [P] [US3] Verify dialog.mdx examples match dialog.css classes in packages/docs/src/content/docs/en/components/dialog.mdx
- [ ] T075 [P] [US3] Verify progress.mdx examples match progress.css classes in packages/docs/src/content/docs/en/components/progress.mdx
- [ ] T076 [P] [US3] Verify skeleton.mdx examples match skeleton.css classes in packages/docs/src/content/docs/en/components/skeleton.mdx
- [ ] T077 [P] [US3] Verify snackbar.mdx examples match snackbar.css classes in packages/docs/src/content/docs/en/components/snackbar.mdx
- [ ] T078 [P] [US3] Verify toast.mdx examples match toast.css classes in packages/docs/src/content/docs/en/components/toast.mdx
- [ ] T079 [P] [US3] Verify tooltip.mdx examples match tooltip.css classes in packages/docs/src/content/docs/en/components/tooltip.mdx
- [ ] T080 [P] [US3] Verify appbar.mdx examples match appbar.css classes in packages/docs/src/content/docs/en/components/appbar.mdx
- [ ] T081 [P] [US3] Verify divider.mdx examples match divider.css classes in packages/docs/src/content/docs/en/components/divider.mdx
- [ ] T082 [P] [US3] Verify bottom-navigation.mdx examples match bottom-navigation.css classes in packages/docs/src/content/docs/en/components/bottom-navigation.mdx
- [ ] T083 [P] [US3] Verify breadcrumbs.mdx examples match breadcrumbs.css classes in packages/docs/src/content/docs/en/components/breadcrumbs.mdx
- [ ] T084 [P] [US3] Verify drawer.mdx examples match drawer.css classes in packages/docs/src/content/docs/en/components/drawer.mdx
- [ ] T085 [P] [US3] Verify menu.mdx examples match menu.css classes in packages/docs/src/content/docs/en/components/menu.mdx
- [ ] T086 [P] [US3] Verify navbar.mdx examples match navbar.css classes in packages/docs/src/content/docs/en/components/navbar.mdx
- [ ] T087 [P] [US3] Verify pagination.mdx examples match pagination.css classes in packages/docs/src/content/docs/en/components/pagination.mdx
- [ ] T088 [P] [US3] Verify stepper.mdx examples match stepper.css classes in packages/docs/src/content/docs/en/components/stepper.mdx
- [ ] T089 [P] [US3] Verify tabs.mdx examples match tabs.css classes in packages/docs/src/content/docs/en/components/tabs.mdx
- [ ] T090 [P] [US3] Verify accordion.mdx examples match accordion.css classes in packages/docs/src/content/docs/en/components/accordion.mdx
- [ ] T091 [P] [US3] Verify bottomsheet.mdx examples match bottomsheet.css classes in packages/docs/src/content/docs/en/components/bottomsheet.mdx
- [ ] T092 [P] [US3] Verify collapse.mdx examples match collapse.css classes in packages/docs/src/content/docs/en/components/collapse.mdx
- [ ] T093 [P] [US3] Verify popover.mdx examples match popover.css classes in packages/docs/src/content/docs/en/components/popover.mdx
- [ ] T094 [P] [US3] Verify timeline.mdx examples match timeline.css classes in packages/docs/src/content/docs/en/components/timeline.mdx

### Build and Test Documentation Site

- [ ] T095 [US3] Build documentation site and verify no CSS class errors in packages/docs/
- [ ] T096 [US3] Test theme switching (sunshine/moonlight) on component pages

**Checkpoint**: All documentation examples render correctly with implemented styles

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and quality improvements

- [ ] T097 [P] Verify hover, focus-visible, and active states on all interactive components for accessibility
- [ ] T098 [P] Verify prefers-reduced-motion support on animated components
- [ ] T099 [P] Verify color contrast meets WCAG AA standards
- [ ] T100 Run quickstart.md validation against implemented components
- [ ] T101 Final build test with bun run build in packages/core/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Story 1 (Phase 3)**: Depends on Foundational - CSS implementation
- **User Story 2 (Phase 4)**: Can run in parallel with US3, depends on US1 completion
- **User Story 3 (Phase 5)**: Can run in parallel with US2, depends on US1 completion
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundational complete - No dependencies on other stories
- **User Story 2 (P1)**: Requires US1 complete (need implemented components to document)
- **User Story 3 (P2)**: Requires US1 complete (need CSS classes to verify against docs)

### Within User Story 1

All CSS file tasks (T007-T050) can run in parallel - each creates or verifies a separate file.

### Within User Story 3

All MDX verification tasks (T057-T094) can run in parallel - each checks a separate file.

### Parallel Opportunities

- **Phase 3 (US1)**: All 44 CSS tasks (6 verify + 38 create) can run in parallel
- **Phase 4 (US2)**: 4 README tasks must run sequentially (same file)
- **Phase 5 (US3)**: All 38 MDX verification tasks can run in parallel
- **US2 + US3**: Can run in parallel after US1 completes

---

## Parallel Example: User Story 1 CSS Implementation

```bash
# Launch all Data Display component CSS tasks together:
Task: "Create avatar component CSS in packages/core/src/components/avatar.css"
Task: "Create badge component CSS in packages/core/src/components/badge.css"
Task: "Create chip component CSS in packages/core/src/components/chip.css"
Task: "Create list component CSS in packages/core/src/components/list.css"
Task: "Create table component CSS in packages/core/src/components/table.css"

# Launch all Feedback component CSS tasks together:
Task: "Create alert component CSS in packages/core/src/components/alert.css"
Task: "Create dialog component CSS in packages/core/src/components/dialog.css"
Task: "Create progress component CSS in packages/core/src/components/progress.css"
# ... etc
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (3 tasks)
2. Complete Phase 2: Foundational (3 tasks)
3. Complete Phase 3: User Story 1 - Component CSS (46 tasks: 6 verify + 38 create + 2 integration)
4. **STOP and VALIDATE**: Build core package, test components render
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (CSS) → Build and test → MVP complete
3. Add User Story 2 (README) → Deploy updated docs
4. Add User Story 3 (Doc sync) → Full documentation sync
5. Polish phase for accessibility and final validation

### Batch Implementation Strategy for US1

Due to the large number of CSS files (36), implement in category batches:

1. **Batch A**: Data Entry (11 files) - Most frequently used
2. **Batch B**: Feedback (7 files) - User-facing notifications
3. **Batch C**: Navigation (8 files) - Site structure
4. **Batch D**: Data Display (5 files) - Content presentation
5. **Batch E**: Surfaces (4 files) - Overlays and panels
6. **Batch F**: Layout + Misc (3 files) - Utilities

Each batch can be independently built and tested before proceeding.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- CSS files follow button.css pattern: @layer components, CSS variables, hover/focus/disabled states
- Reference contracts/README.md for exact class naming requirements
- Reference checklists/components.md for detailed variant requirements per component
- Commit after each component or batch of components
- Stop at any checkpoint to validate independently
