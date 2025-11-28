# Tasks: Tabbed Code Block with Preview

**Feature**: 001-docs-code-preview-tabs
**Generated**: 2025-11-26
**Branch**: `001-docs-code-preview-tabs`

## User Stories Summary

| Story | Priority | Description | Task Count |
|-------|----------|-------------|------------|
| US1 | P1 | View Live Preview | 3 |
| US2 | P1 | View and Copy Code | 3 |
| US3 | P1 | Switch Between Views | 4 |
| US4 | P2 | Persist Tab Selection | 2 |
| US5 | P2 | Responsive Tab Interface | 2 |

**Total Tasks**: 20

---

## Phase 1: Setup

> Goal: Prepare development environment and create foundational component structure

- [x] T001 Verify docs package builds successfully with `bun run build` in packages/docs/
- [x] T002 Create backup of current ComponentShowcase.astro in packages/docs/src/components/showcase/ComponentShowcase.astro.bak

---

## Phase 2: Foundational (Blocking)

> Goal: Create base tabbed component structure that all user stories depend on

- [x] T003 Add tab CSS styles to packages/docs/src/styles/global.css for tab list, active/inactive states
- [x] T004 Update ComponentShowcase Props interface in packages/docs/src/components/showcase/ComponentShowcase.astro to add `defaultTab?: 'preview' | 'code'`
- [x] T005 [P] Create DOM structure with tabs container (role="tablist") in packages/docs/src/components/showcase/ComponentShowcase.astro
- [x] T006 Add unique IDs for ARIA linking (preview-tab-{id}, code-tab-{id}, preview-panel-{id}, code-panel-{id}) in packages/docs/src/components/showcase/ComponentShowcase.astro

---

## Phase 3: User Story 1 - View Live Preview (P1)

> **Story Goal**: As a developer, I can see a live preview of components as the default view
> **Independent Test**: Navigate to `/docs/en/components/button/` and verify Preview tab is active with rendered component

- [x] T007 [US1] Implement Preview tab panel with `<Fragment set:html={code} />` in packages/docs/src/components/showcase/ComponentShowcase.astro
- [x] T008 [US1] Set Preview tab as default active (aria-selected="true") in packages/docs/src/components/showcase/ComponentShowcase.astro
- [x] T009 [US1] Add showcase-preview class styling for preview panel background and padding in packages/docs/src/styles/global.css

---

## Phase 4: User Story 2 - View and Copy Code (P1)

> **Story Goal**: As a developer, I can view syntax-highlighted code and copy it to clipboard
> **Independent Test**: Click "Code" tab and verify syntax highlighting displays, click "Copy" and verify clipboard contains code

- [x] T010 [US2] Implement Code tab panel integrating existing CodeBlock.astro in packages/docs/src/components/showcase/ComponentShowcase.astro
- [x] T011 [US2] Verify CodeBlock copy button works within tabbed context in packages/docs/src/components/showcase/CodeBlock.astro
- [x] T012 [US2] Add "Copied!" feedback animation/styling in packages/docs/src/styles/global.css

---

## Phase 5: User Story 3 - Switch Between Views (P1)

> **Story Goal**: As a developer, I can seamlessly toggle between Preview and Code views
> **Independent Test**: Click between tabs multiple times, verify instant switching without page reload

- [x] T013 [US3] Add client-side JavaScript for tab click handling in packages/docs/src/components/showcase/ComponentShowcase.astro `<script>` tag
- [x] T014 [US3] Implement aria-selected toggle and hidden attribute switching in tab click handler
- [x] T015 [US3] Add keyboard navigation (ArrowLeft/ArrowRight, Home/End) in tab script
- [x] T016 [US3] Add tabindex management (active=0, inactive=-1) for keyboard navigation

---

## Phase 6: User Story 4 - Persist Tab Selection (P2)

> **Story Goal**: As a developer, my tab preference persists across showcases on the same page
> **Independent Test**: Select "Code" on first showcase, scroll to another showcase, verify it also shows "Code"

- [x] T017 [US4] Add module-level `preferredTab` variable in ComponentShowcase script
- [x] T018 [US4] Apply `preferredTab` to newly initialized showcases and update on tab click

---

## Phase 7: User Story 5 - Responsive Tab Interface (P2)

> **Story Goal**: As a developer, I can use the tabbed interface on mobile devices
> **Independent Test**: View component pages at 375px width, verify tabs are visible and tappable

- [x] T019 [US5] Add responsive styles for tabs at mobile breakpoint (< 640px) in packages/docs/src/styles/global.css
- [x] T020 [US5] Ensure minimum tap target size (44x44px) for tab buttons

---

## Phase 8: Polish & Cross-Cutting Concerns

> Goal: Final verification, cleanup, and backward compatibility check

- [x] T021 Verify all 50+ MDX files render without errors by running `bun run build` in packages/docs/
- [x] T022 Test progressive enhancement: disable JavaScript and verify both panels show stacked
- [x] T023 Run accessibility audit with axe-core on a component page
- [x] T024 Delete backup file packages/docs/src/components/showcase/ComponentShowcase.astro.bak

---

## Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────────►
                                                                   │
Phase 2 (Foundational) ──────────────────────────────────────────►│
                                                                   │
        ┌──── Phase 3 (US1: Preview) ────┐                         │
        │                                │                         │
        ├──── Phase 4 (US2: Code) ───────┤ (P1 stories can run     │
        │                                │  in parallel)           │
        └──── Phase 5 (US3: Switch) ─────┘                         │
                                         │                         │
                                         ▼                         │
        ┌──── Phase 6 (US4: Persist) ────┐                         │
        │                                │ (P2 stories can run     │
        └──── Phase 7 (US5: Responsive) ─┘  in parallel)           │
                                         │                         │
                                         ▼                         │
                              Phase 8 (Polish) ───────────────────►│
```

## Parallel Execution Opportunities

### Within Phase 2 (Foundational)
- T005 [P] Create DOM structure - can run parallel with T003 CSS styles

### Within Phases 3-5 (P1 User Stories)
Once Phase 2 is complete, US1, US2, and US3 can be worked on in parallel by different developers or in any order, though they build on each other functionally.

### Within Phases 6-7 (P2 User Stories)
US4 and US5 are independent and can be implemented in parallel.

## Implementation Strategy

### MVP Scope (Recommended)
**User Story 1 + User Story 2 + User Story 3** = Complete tabbed interface with:
- Preview as default view
- Code view with syntax highlighting and copy
- Tab switching functionality

This delivers a fully functional tabbed code block that improves the current documentation UX.

### Phase 2 Additions (P2 Stories)
- US4: Tab preference persistence
- US5: Mobile responsiveness

These enhance the MVP but are not required for core functionality.

## File Summary

| File | Action | Tasks |
|------|--------|-------|
| `packages/docs/src/components/showcase/ComponentShowcase.astro` | UPDATE | T004, T005, T006, T007, T008, T010, T013, T014, T015, T016, T017, T018 |
| `packages/docs/src/styles/global.css` | UPDATE | T003, T009, T012, T019, T020 |
| `packages/docs/src/components/showcase/CodeBlock.astro` | VERIFY | T011 |

## Validation Checklist

Before marking feature complete:

- [x] All tasks T001-T024 completed
- [x] `bun run build` succeeds in packages/docs/
- [x] Button page (`/docs/en/components/button/`) shows tabbed interface
- [x] Tab switching works without page reload
- [x] Copy button copies code to clipboard
- [x] Keyboard navigation works (Arrow keys, Home/End)
- [x] Screen reader announces tab changes correctly
- [x] Mobile layout shows usable tabs at 375px width
- [x] No console errors in browser dev tools
