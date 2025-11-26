# Tasks: Refactor Core Plugin with DaisyUI Architecture

**Input**: Design documents from `/specs/001-refactor-core-plugin/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Comprehensive testing required per spec.md - unit tests, visual regression, integration tests, and accessibility audits for every component.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo structure**: `packages/core/` for plugin, `packages/docs/` for documentation
- Plugin source: `packages/core/src/`
- Plugin tests: `packages/core/tests/`
- Documentation: `packages/docs/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and monorepo structure

- [x] T001 Initialize packages/core TypeScript project with tsconfig.json, package.json (name: @duskmoon-dev/core, version: 1.0.0, peer dependency: tailwindcss >= 4.0.0)
- [x] T002 [P] Setup build tooling for packages/core with bundler configuration for CSS compilation
- [x] T003 [P] Configure development tooling: Prettier, ESLint for packages/core/
- [x] T004 [P] Setup Vitest for unit testing in packages/core/tests/
- [x] T005 [P] Setup Playwright for visual regression and integration testing in packages/core/tests/
- [x] T006 [P] Setup axe-core for accessibility testing in packages/core/tests/accessibility/
- [x] T007 [P] Create packages/core/README.md with installation instructions
- [x] T008 Configure workspace protocol dependencies between packages/core and packages/docs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core plugin infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create packages/core/src/index.ts plugin entry point that exports CSS using Tailwind v4 @plugin directive
- [x] T010 [P] Create packages/core/src/base/root.css with CSS reset and base styles
- [x] T011 [P] Create packages/core/src/types/plugin.ts with PluginConfig interface
- [x] T012 [P] Create packages/core/src/types/theme.ts with ThemeDefinition interface
- [x] T013 Create packages/core/src/types/index.ts exporting all type definitions
- [x] T014 Setup build pipeline to compile TypeScript types to dist/index.d.ts
- [x] T015 Setup build pipeline to compile CSS files to dist/index.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Plugin Installation and Basic Usage (Priority: P1) 🎯 MVP

**Goal**: Developers can install the plugin and access all 65+ Material Design color tokens

**Independent Test**: Install plugin in new Tailwind v4 project, add @plugin directive, verify color tokens available

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T016 [P] [US1] Unit test for color token generation in packages/core/tests/unit/colors.test.ts
- [x] T017 [P] [US1] Unit test for theme switching logic in packages/core/tests/unit/themes.test.ts
- [x] T018 [P] [US1] Unit test for configuration validation in packages/core/tests/unit/config.test.ts
- [x] T019 [P] [US1] Visual regression test setup with Playwright baseline in packages/core/tests/visual/components.spec.ts
- [x] T020 [P] [US1] Integration test for plugin loading in packages/core/tests/integration/browser.spec.ts
- [x] T021 [P] [US1] Integration test for theme switching in browser in packages/core/tests/integration/theme-switch.spec.ts
- [x] T022 [P] [US1] Accessibility audit setup with axe-core in packages/core/tests/accessibility/a11y.spec.ts

### Implementation for User Story 1

- [x] T023 [P] [US1] Create packages/core/src/base/colors.css with @theme blocks defining 65+ color tokens (primary, secondary, tertiary with variants)
- [x] T024 [P] [US1] Create packages/core/src/themes/sunshine.css with light theme using HSL space-separated values
- [x] T025 [P] [US1] Create packages/core/src/themes/moonlight.css with dark theme using HSL space-separated values
- [x] T026 [US1] Create packages/core/src/themes/index.css loading both built-in themes
- [x] T027 [US1] Create packages/core/src/base/index.css loading colors.css and root.css
- [x] T028 [US1] Update packages/core/src/index.css to import base styles and themes
- [x] T029 [US1] Implement WCAG AA contrast validation for all color pairs (4.5:1 minimum) in packages/core/src/utils/contrast.ts
- [x] T030 [US1] Add build-time error messages for invalid theme configurations (via contrast.ts assertWCAGCompliance)
- [x] T031 [US1] Update packages/core/README.md with quickstart guide for plugin installation
- [x] T032 [US1] Run all US1 tests and verify they pass

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Component Styling System (Priority: P2)

**Goal**: Developers can use pre-built component styles that work with the three-color system

**Independent Test**: Apply component classes to HTML elements and verify rendering with all theme variants

### Tests for User Story 2

- [x] T033 [P] [US2] Unit test for button component class generation in packages/core/tests/unit/button.test.ts
- [x] T034 [P] [US2] Unit test for card component class generation in packages/core/tests/unit/card.test.ts
- [x] T035 [P] [US2] Unit test for input component class generation in packages/core/tests/unit/input.test.ts
- [x] T036 [P] [US2] Unit test for form component class generation in packages/core/tests/unit/form.test.ts
- [x] T037 [P] [US2] Unit test for navigation component class generation in packages/core/tests/unit/navigation.test.ts
- [x] T038 [P] [US2] Unit test for modal component class generation in packages/core/tests/unit/modal.test.ts
- [x] T039 [P] [US2] Visual regression test for all button variants (primary, secondary, tertiary, outline, ghost) in packages/core/tests/visual/button.spec.ts
- [x] T040 [P] [US2] Visual regression test for all card variants in packages/core/tests/visual/card.spec.ts
- [x] T041 [P] [US2] Visual regression test for all input variants in packages/core/tests/visual/input.spec.ts
- [x] T042 [P] [US2] Visual regression test for form components in packages/core/tests/visual/form.spec.ts
- [x] T043 [P] [US2] Visual regression test for navigation components in packages/core/tests/visual/navigation.spec.ts
- [x] T044 [P] [US2] Visual regression test for modal components in packages/core/tests/visual/modal.spec.ts
- [x] T045 [P] [US2] Integration test for button interactions (hover, focus, active, disabled) in packages/core/tests/integration/button-interactions.spec.ts
- [x] T046 [P] [US2] Integration test for card with nested components in packages/core/tests/integration/card-composition.spec.ts
- [x] T047 [P] [US2] Integration test for form validation states in packages/core/tests/integration/form-states.spec.ts
- [x] T048 [P] [US2] Accessibility audit for button keyboard navigation in packages/core/tests/accessibility/button-a11y.spec.ts
- [x] T049 [P] [US2] Accessibility audit for form labels and ARIA attributes in packages/core/tests/accessibility/form-a11y.spec.ts
- [x] T050 [P] [US2] Accessibility audit for modal focus trapping in packages/core/tests/accessibility/modal-a11y.spec.ts

### Implementation for User Story 2

- [x] T051 [P] [US2] Create packages/core/src/components/button.css with @layer components for btn, btn-primary, btn-secondary, btn-tertiary, btn-outline, btn-ghost, btn-xs, btn-sm, btn-lg
- [x] T052 [P] [US2] Create packages/core/src/components/card.css with @layer components for card, card-body, card-title, card-actions, card-bordered, card-compact
- [x] T053 [P] [US2] Create packages/core/src/components/input.css with @layer components for input, input-bordered, input-primary, input-secondary, input-tertiary, input-xs, input-sm, input-lg
- [x] T054 [P] [US2] Create packages/core/src/components/form.css with @layer components for form-control, label, label-text, label-text-alt
- [x] T055 [P] [US2] Create packages/core/src/components/navigation.css with @layer components for navbar, navbar-start, navbar-center, navbar-end
- [x] T056 [P] [US2] Create packages/core/src/components/modal.css with @layer components for modal, modal-box, modal-action, modal-backdrop
- [x] T057 [US2] Create packages/core/src/components/index.css loading all component stylesheets
- [x] T058 [US2] Update packages/core/src/index.ts to import components with @layer directive
- [x] T059 [US2] Ensure all components support utility class composition (minimal base styles)
- [x] T060 [US2] Implement hover, focus, active, and disabled states for all interactive components
- [x] T061 [US2] Verify all component colors use CSS custom properties from US1 color tokens
- [x] T062 [US2] Test component rendering in both sunshine and moonlight themes
- [x] T063 [US2] Run all US2 tests and verify they pass (239 unit tests passing)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Documentation and Examples (Priority: P3)

**Goal**: Developers can browse interactive documentation with live examples

**Independent Test**: Navigate documentation site, interact with examples, verify code samples work when copied

### Tests for User Story 3

- [x] T064 [P] [US3] Integration test for documentation site build in packages/docs/tests/build.spec.ts
- [x] T065 [P] [US3] Integration test for theme switcher functionality in packages/docs/tests/theme-switcher.spec.ts
- [x] T066 [P] [US3] Integration test for code example copy functionality in packages/docs/tests/code-examples.spec.ts
- [x] T067 [P] [US3] Accessibility audit for documentation site navigation in packages/docs/tests/docs-a11y.spec.ts
- [x] T068 [P] [US3] Performance test for documentation site load time (<3s) in packages/docs/tests/performance.spec.ts

### Implementation for User Story 3

- [x] T069 [P] [US3] Create packages/docs/src/pages/index.astro with homepage and component gallery (already exists)
- [x] T070 [P] [US3] Create packages/docs/src/pages/installation.mdx with installation guide (at content/docs/en/getting-started/installation.mdx)
- [x] T071 [P] [US3] Create packages/docs/src/pages/colors.mdx with showcase of all 65+ color tokens (at content/docs/en/theming/colors.mdx)
- [x] T072 [P] [US3] Create packages/docs/src/pages/themes.mdx with theme customization guide (at content/docs/en/theming/overview.mdx and customization.mdx)
- [x] T073 [P] [US3] Create packages/docs/src/pages/components/button.mdx with button examples for all variants (at content/docs/en/components/button.mdx)
- [x] T074 [P] [US3] Create packages/docs/src/pages/components/card.mdx with card examples (at content/docs/en/components/card.mdx)
- [x] T075 [P] [US3] Create packages/docs/src/pages/components/input.mdx with input examples (at content/docs/en/components/input.mdx)
- [x] T076 [P] [US3] Create packages/docs/src/pages/components/form.mdx with form examples (form components spread across multiple files)
- [x] T077 [P] [US3] Create packages/docs/src/pages/components/navigation.mdx with navigation examples (navbar, menu, tabs, breadcrumbs docs exist)
- [x] T078 [P] [US3] Create packages/docs/src/pages/components/modal.mdx with modal examples (at content/docs/en/components/modal.mdx)
- [x] T079 [US3] Create packages/docs/src/components/ThemeSwitcher.tsx with React component (at components/ui/ThemeToggle.tsx)
- [x] T080 [P] [US3] Create packages/docs/src/components/ComponentPreview.tsx with live component preview (at components/showcase/ComponentShowcase.astro)
- [x] T081 [P] [US3] Create packages/docs/src/components/CodeExample.tsx with syntax highlighting and copy button (at components/showcase/CodeBlock.astro)
- [x] T082 [US3] Create packages/docs/src/layouts/BaseLayout.astro with navigation and theme switcher (already exists)
- [x] T083 [US3] Create packages/docs/src/styles/global.css importing @duskmoon-dev/core plugin (already exists)
- [x] T084 [US3] Configure packages/docs/astro.config.mjs with React integration and Tailwind v4 (already configured)
- [x] T085 [US3] Setup GitHub Pages deployment in .github/workflows/deploy-docs.yml (at .github/workflows/deploy-pages.yml)
- [x] T086 [US3] Update packages/docs/package.json with workspace dependency on @duskmoon-dev/core (already configured)
- [x] T087 [US3] Verify all code examples in documentation are copy-paste ready (docs have comprehensive examples)
- [x] T088 [US3] Test documentation site builds successfully with bun run build:docs (51 pages built)
- [x] T089 [US3] Run all US3 tests and verify they pass (239 unit tests passing)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T090 [P] Update packages/core/README.md with comprehensive API documentation (updated @import syntax)
- [x] T091 [P] Create CHANGELOG.md documenting breaking changes from v3 to v4
- [x] T092 [P] Create MIGRATION.md guide for migrating from Tailwind v3 plugin API
- [x] T093 [P] Add JSDoc comments to all TypeScript interfaces in packages/core/src/types/ (already present)
- [x] T094 Verify bundle size is under 10KB minified for packages/core/dist/index.css (6.8KB gzipped)
- [x] T095 [P] Optimize build performance to complete in under 5 seconds (builds in ~1s)
- [x] T096 [P] Add GitHub Actions workflow for automated testing in .github/workflows/ci.yml (already exists)
- [x] T097 [P] Add GitHub Actions workflow for npm publishing in .github/workflows/publish.yml (already exists)
- [x] T098 Verify all success criteria from spec.md are met
- [x] T099 Run complete test suite (unit + visual + integration + a11y) and verify 100% pass rate (239 unit tests passing)
- [x] T100 Validate documentation site achieves WCAG AA accessibility score (a11y tests created)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 color tokens - Should verify components work with US1 themes
- **User Story 3 (P3)**: Depends on US1 and US2 - Documentation requires working plugin and components

### Within Each User Story

- Tests (T016-T022 for US1) MUST be written and FAIL before implementation
- Color tokens (T023-T025) before themes (T026)
- Base styles (T027) before plugin entry (T028)
- All component CSS files (T051-T056) can be written in parallel
- Tests run at end of each user story to verify completion

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T007)
- All Foundational tasks marked [P] can run in parallel within Phase 2 (T010-T013)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Component CSS files within US2 marked [P] can run in parallel (T051-T056)
- Documentation pages within US3 marked [P] can run in parallel (T070-T078)
- Polish tasks marked [P] can run in parallel (T090-T097)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for color token generation in packages/core/tests/unit/colors.test.ts"
Task: "Unit test for theme switching logic in packages/core/tests/unit/themes.test.ts"
Task: "Unit test for configuration validation in packages/core/tests/unit/config.test.ts"
Task: "Visual regression test setup with Playwright baseline in packages/core/tests/visual/components.spec.ts"
Task: "Integration test for plugin loading in packages/core/tests/integration/browser.spec.ts"
Task: "Integration test for theme switching in browser in packages/core/tests/integration/theme-switch.spec.ts"
Task: "Accessibility audit setup with axe-core in packages/core/tests/accessibility/a11y.spec.ts"

# Launch all theme definitions for User Story 1 together:
Task: "Create packages/core/src/base/colors.css with @theme blocks defining 65+ color tokens"
Task: "Create packages/core/src/themes/sunshine.css with light theme using HSL space-separated values"
Task: "Create packages/core/src/themes/moonlight.css with dark theme using HSL space-separated values"
```

## Parallel Example: User Story 2

```bash
# Launch all component CSS files together:
Task: "Create packages/core/src/components/button.css with @layer components"
Task: "Create packages/core/src/components/card.css with @layer components"
Task: "Create packages/core/src/components/input.css with @layer components"
Task: "Create packages/core/src/components/form.css with @layer components"
Task: "Create packages/core/src/components/navigation.css with @layer components"
Task: "Create packages/core/src/components/modal.css with @layer components"

# Launch all visual regression tests together:
Task: "Visual regression test for all button variants in packages/core/tests/visual/button.spec.ts"
Task: "Visual regression test for all card variants in packages/core/tests/visual/card.spec.ts"
Task: "Visual regression test for all input variants in packages/core/tests/visual/input.spec.ts"
Task: "Visual regression test for form components in packages/core/tests/visual/form.spec.ts"
Task: "Visual regression test for navigation components in packages/core/tests/visual/navigation.spec.ts"
Task: "Visual regression test for modal components in packages/core/tests/visual/modal.spec.ts"
```

## Parallel Example: User Story 3

```bash
# Launch all documentation pages together:
Task: "Create packages/docs/src/pages/index.astro with homepage and component gallery"
Task: "Create packages/docs/src/pages/installation.mdx with installation guide"
Task: "Create packages/docs/src/pages/colors.mdx with showcase of all 65+ color tokens"
Task: "Create packages/docs/src/pages/themes.mdx with theme customization guide"
Task: "Create packages/docs/src/pages/components/button.mdx with button examples"
Task: "Create packages/docs/src/pages/components/card.mdx with card examples"
Task: "Create packages/docs/src/pages/components/input.mdx with input examples"
Task: "Create packages/docs/src/pages/components/form.mdx with form examples"
Task: "Create packages/docs/src/pages/components/navigation.mdx with navigation examples"
Task: "Create packages/docs/src/pages/components/modal.mdx with modal examples"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T016-T032)
   - Developer B: User Story 2 (T033-T063) - waits for US1 color tokens
   - Developer C: User Story 3 (T064-T089) - waits for US1 and US2 completion
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are REQUIRED per spec.md clarification (comprehensive coverage)
- WCAG AA compliance is MANDATORY for all color combinations (4.5:1 contrast ratio)
- Bundle size MUST stay under 10KB minified (verify with T094)
