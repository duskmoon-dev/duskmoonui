# Tasks: Markdown Body Component

**Input**: Design documents from `/specs/001-markdown-body/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: Visual inspection and build validation. No automated tests explicitly requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Core package**: `packages/core/src/`
- **Docs package**: `packages/docs/src/content/docs/en/`

---

## Phase 1: Setup

**Purpose**: Create component file structure and register in build system

- [x] T001 Create empty markdown-body.css file at packages/core/src/components/markdown-body.css
- [x] T002 Add @import statement to packages/core/src/components/index.css
- [x] T003 Add 'markdown-body' to componentFiles array in packages/core/scripts/build-css.ts
- [x] T004 Add export entry for markdown-body in packages/core/package.json exports

**Checkpoint**: Component file exists and is included in build output ✅

---

## Phase 2: Foundational (Base Container)

**Purpose**: Establish the .markdown-body container with base typography

**⚠️ CRITICAL**: Must complete before user story styling can begin

- [x] T005 Create @layer components wrapper and .markdown-body base selector in packages/core/src/components/markdown-body.css
- [x] T006 Add base typography (font-family, font-size: 16px, line-height: 1.5, word-wrap) in packages/core/src/components/markdown-body.css
- [x] T007 Add base colors using DuskMoonUI tokens (color: var(--color-on-surface)) in packages/core/src/components/markdown-body.css
- [x] T008 Run build to verify CSS compiles: bun run build:core

**Checkpoint**: .markdown-body class exists with base typography, build succeeds ✅

---

## Phase 3: User Story 1 - Style Rendered Markdown Content (Priority: P1) 🎯 MVP

**Goal**: Style all basic typography elements (headings, paragraphs, lists, links, emphasis)

**Independent Test**: Apply .markdown-body to HTML with h1-h6, p, ul, ol, a, strong, em and verify styling

### Implementation for User Story 1

- [x] T009 [US1] Add heading styles (h1-h6) with font sizes per research.md in packages/core/src/components/markdown-body.css
- [x] T010 [US1] Add h1, h2 bottom border separator using var(--color-outline-variant) in packages/core/src/components/markdown-body.css
- [x] T011 [US1] Add paragraph styles (margin-block-end: 1rem) in packages/core/src/components/markdown-body.css
- [x] T012 [US1] Add link styles (color: var(--color-primary), hover underline, focus-visible) in packages/core/src/components/markdown-body.css
- [x] T013 [US1] Add emphasis styles (strong: font-weight 600, em: italic) in packages/core/src/components/markdown-body.css
- [x] T014 [US1] Add unordered list styles (ul, li with padding-inline-start: 2em) in packages/core/src/components/markdown-body.css
- [x] T015 [US1] Add ordered list styles (ol with proper list-style-type progression) in packages/core/src/components/markdown-body.css
- [x] T016 [US1] Add small, sub, sup, del styles in packages/core/src/components/markdown-body.css

**Checkpoint**: Basic typography renders correctly, theme colors work ✅

---

## Phase 4: User Story 2 - Display Code Blocks and Inline Code (Priority: P1)

**Goal**: Style code elements with monospace fonts and distinct backgrounds

**Independent Test**: Render `<code>inline</code>` and `<pre><code>block</code></pre>` and verify distinct styling

### Implementation for User Story 2

- [x] T017 [P] [US2] Add inline code styles (code: background, padding, border-radius, monospace font) in packages/core/src/components/markdown-body.css
- [x] T018 [P] [US2] Add code block styles (pre: background, padding, overflow-x: auto) in packages/core/src/components/markdown-body.css
- [x] T019 [US2] Add pre > code reset (remove background/padding from nested code) in packages/core/src/components/markdown-body.css
- [x] T020 [US2] Add kbd styles (keyboard appearance with border and shadow) in packages/core/src/components/markdown-body.css
- [x] T021 [US2] Add samp styles (sample output, monospace) in packages/core/src/components/markdown-body.css

**Checkpoint**: Code displays with monospace font and distinct backgrounds ✅

---

## Phase 5: User Story 5 - Theme-Aware Styling (Priority: P1)

**Goal**: Ensure all styles use CSS custom properties for automatic theme switching

**Independent Test**: Switch between data-theme="sunshine" and data-theme="moonlight" and verify colors update

### Implementation for User Story 5

- [x] T022 [US5] Audit all color values in markdown-body.css and replace any hardcoded colors with DuskMoonUI tokens
- [x] T023 [US5] Verify border colors use var(--color-outline-variant) in packages/core/src/components/markdown-body.css
- [x] T024 [US5] Verify background colors use surface tokens (--color-surface-container, --color-surface-container-high) in packages/core/src/components/markdown-body.css
- [x] T025 [US5] Add reduced-motion media query (@media (prefers-reduced-motion: reduce)) in packages/core/src/components/markdown-body.css

**Checkpoint**: Theme switching works for all elements ✅

---

## Phase 6: User Story 3 - Display Tables with Clear Structure (Priority: P2)

**Goal**: Style tables with borders, header styling, and zebra striping

**Independent Test**: Render a markdown table with headers and multiple rows, verify borders and striping

### Implementation for User Story 3

- [x] T026 [P] [US3] Add table base styles (border-collapse, width, overflow-x: auto wrapper) in packages/core/src/components/markdown-body.css
- [x] T027 [P] [US3] Add th styles (font-weight 600, background: var(--color-surface-container)) in packages/core/src/components/markdown-body.css
- [x] T028 [US3] Add td/th cell styles (padding, border: 1px solid var(--color-outline-variant)) in packages/core/src/components/markdown-body.css
- [x] T029 [US3] Add zebra striping (tr:nth-child(2n) background) in packages/core/src/components/markdown-body.css

**Checkpoint**: Tables display with clear structure and zebra striping ✅

---

## Phase 7: User Story 4 - Display Blockquotes and Callouts (Priority: P2)

**Goal**: Style blockquotes with left border accent and muted text

**Independent Test**: Render `<blockquote>` content and verify visual distinction

### Implementation for User Story 4

- [x] T030 [US4] Add blockquote styles (border-inline-start: 0.25em, padding-inline-start: 1em, muted color) in packages/core/src/components/markdown-body.css
- [x] T031 [US4] Add nested blockquote handling in packages/core/src/components/markdown-body.css

**Checkpoint**: Blockquotes display with left border accent ✅

---

## Phase 8: User Story 6 - Display Images and Media (Priority: P3)

**Goal**: Style images to be responsive and not overflow container

**Independent Test**: Render images of various sizes and verify max-width constraint

### Implementation for User Story 6

- [x] T032 [P] [US6] Add img styles (max-width: 100%, height: auto) in packages/core/src/components/markdown-body.css
- [x] T033 [P] [US6] Add figure/figcaption styles in packages/core/src/components/markdown-body.css
- [x] T034 [US6] Add image alignment helpers (align=left, align=right margins) in packages/core/src/components/markdown-body.css

**Checkpoint**: Images are responsive and don't overflow ✅

---

## Phase 9: User Story 7 - Display Task Lists (Priority: P3)

**Goal**: Style GitHub-style task list checkboxes

**Independent Test**: Render task list HTML and verify checkbox alignment

### Implementation for User Story 7

- [x] T035 [US7] Add .task-list-item styles (list-style-type: none) in packages/core/src/components/markdown-body.css
- [x] T036 [US7] Add task list checkbox alignment (negative margin) in packages/core/src/components/markdown-body.css

**Checkpoint**: Task list checkboxes align properly ✅

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Additional elements, documentation, and build verification

### Additional Element Styles

- [x] T037 [P] Add hr styles (margin-block, background-color, border: 0, height) in packages/core/src/components/markdown-body.css
- [x] T038 [P] Add definition list styles (dl, dt, dd) in packages/core/src/components/markdown-body.css
- [x] T039 [P] Add abbr styles (underline dotted) in packages/core/src/components/markdown-body.css
- [x] T040 [P] Add mark styles (highlight background) in packages/core/src/components/markdown-body.css
- [x] T041 [P] Add details/summary styles in packages/core/src/components/markdown-body.css

### Edge Cases

- [x] T042 Add first-child/last-child margin resets in packages/core/src/components/markdown-body.css
- [x] T043 Verify deeply nested list indentation (5+ levels) in packages/core/src/components/markdown-body.css

### Documentation

- [x] T044 Create markdown-body.mdx documentation page at packages/docs/src/content/docs/en/components/markdown-body.mdx
- [x] T045 Add markdown-body to component index at packages/docs/src/content/docs/en/components/index.mdx (N/A - no index file exists)

### Build Verification

- [x] T046 Run full build: bun run build
- [x] T047 Verify component file size is under 15KB: check packages/core/dist/components/markdown-body.css (9KB)
- [x] T048 Update CHANGELOG.md with new component entry (N/A - no CHANGELOG exists)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - establishes base container
- **User Stories (Phase 3-9)**: All depend on Foundational completion
- **Polish (Phase 10)**: Depends on core user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational - Core typography, no dependencies
- **User Story 2 (P1)**: After Foundational - Code styling, no dependencies (can parallel with US1)
- **User Story 5 (P1)**: After US1 + US2 - Theme audit requires elements to exist
- **User Story 3 (P2)**: After Foundational - Tables, independent
- **User Story 4 (P2)**: After Foundational - Blockquotes, independent
- **User Story 6 (P3)**: After Foundational - Images, independent
- **User Story 7 (P3)**: After Foundational - Task lists, independent

### Parallel Opportunities

**Phase 1 (Setup)**:
- T001, T002, T003, T004 are sequential (file must exist before adding imports)

**Phase 3-4 (P1 Stories)**:
- US1 and US2 can be implemented in parallel (different selectors)

**Phase 6-9 (P2-P3 Stories)**:
- All P2/P3 stories can run in parallel after P1 complete

**Phase 10 (Polish)**:
- T037, T038, T039, T040, T041 can all run in parallel (different selectors)

---

## Parallel Example: Setup Phase

```bash
# Sequential - file must exist first:
T001 → T002 → T003 → T004
```

## Parallel Example: P1 User Stories

```bash
# After Foundational, launch in parallel:
Task: US1 - Typography (T009-T016)
Task: US2 - Code blocks (T017-T021)
```

## Parallel Example: Polish Additional Elements

```bash
# All different selectors, can parallelize:
Task: "Add hr styles in packages/core/src/components/markdown-body.css"
Task: "Add dl/dt/dd styles in packages/core/src/components/markdown-body.css"
Task: "Add abbr styles in packages/core/src/components/markdown-body.css"
Task: "Add mark styles in packages/core/src/components/markdown-body.css"
```

---

## Implementation Strategy

### MVP First (User Stories 1+2+5 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Typography)
4. Complete Phase 4: User Story 2 (Code)
5. Complete Phase 5: User Story 5 (Theme audit)
6. **STOP and VALIDATE**: Basic markdown renders with theme support
7. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Base container ready
2. Add US1 (Typography) + US2 (Code) + US5 (Themes) → **MVP!**
3. Add US3 (Tables) → Enhanced data display
4. Add US4 (Blockquotes) → Better callouts
5. Add US6 (Images) + US7 (Task Lists) → Full feature parity
6. Polish → Documentation and cleanup

---

## Notes

- All spacing MUST use logical properties (margin-block, padding-inline, border-inline-start)
- All colors MUST use DuskMoonUI CSS custom properties
- Target file size: <10KB uncompressed (within 15KB spec limit)
- Single file implementation: packages/core/src/components/markdown-body.css
- Commit after each phase or logical group of tasks
