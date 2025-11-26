# Feature Specification: Refactor Core Plugin with DaisyUI Architecture

**Feature Branch**: `001-refactor-core-plugin`
**Created**: 2025-11-19
**Status**: Draft
**Input**: User description: "Update the plugin @duskmoon-dev/core, fix issues, that it current not working yet, research daisyui, use the daisyui's architecture to implement the @duskmoon-dev/core, ensure unit tests pass. Update the docs, add all pages of every component defined in the plugin."

## Clarifications

### Session 2025-11-19

- Q: When developers need to customize component styles (e.g., button padding, border radius), how should the plugin support this? → A: Utility class composition - Components provide minimal base styles, developers add Tailwind utilities for customization
- Q: What level of test coverage is required for the component system? → A: Comprehensive - Unit tests, visual regression, integration tests, and accessibility audits for every component

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Plugin Installation and Basic Usage (Priority: P1)

A developer wants to add DuskMoonUI to their Tailwind CSS v4 project to access the three-color Material Design system without writing custom CSS.

**Why this priority**: Core plugin functionality must work before any components can be used. This is the foundation that enables all other features.

**Independent Test**: Can be fully tested by installing the plugin in a new Tailwind v4 project, importing it via `@plugin` directive, and verifying that color tokens are available in compiled CSS.

**Acceptance Scenarios**:

1. **Given** a new Tailwind CSS v4 project, **When** a developer installs @duskmoon-dev/core and adds `@plugin "@duskmoon-dev/core"` to their CSS, **Then** all 65+ Material Design color tokens (primary, secondary, tertiary, surface variants, etc.) are available as utility classes
2. **Given** the plugin is loaded, **When** a developer uses `bg-primary text-primary-content` classes, **Then** the compiled CSS includes proper color values with accessible contrast ratios
3. **Given** the plugin is configured with built-in themes, **When** a developer switches between sunshine and moonlight themes via data-theme attribute, **Then** all color tokens update correctly without page reload

---

### User Story 2 - Component Styling System (Priority: P2)

A developer wants to use pre-built component styles (buttons, cards, forms) that automatically work with the three-color system and respect theme switching.

**Why this priority**: Components are the primary value proposition after the color system. They demonstrate DaisyUI-style architecture and provide immediate utility.

**Independent Test**: Can be tested by applying component classes (e.g., `btn`, `card`) to HTML elements and verifying they render correctly with all theme variants.

**Acceptance Scenarios**:

1. **Given** the plugin is installed, **When** a developer applies `class="btn btn-primary"` to a button element, **Then** the button displays with proper primary color styling, hover states, and accessible contrast
2. **Given** a component uses the three-color system, **When** a developer switches themes, **Then** the component automatically updates to use the new theme's color values
3. **Given** multiple components on the same page, **When** rendered together, **Then** they maintain visual consistency and proper spacing following Material Design principles
4. **Given** a component with base styles, **When** a developer adds Tailwind utility classes (e.g., `btn px-8 rounded-full`), **Then** utilities override base styles allowing complete customization

---

### User Story 3 - Documentation and Examples (Priority: P3)

A developer wants to browse interactive documentation showing all available components, color tokens, and usage examples with live theme switching.

**Why this priority**: Documentation enables discovery and adoption but depends on the plugin and components working first.

**Independent Test**: Can be tested by navigating the documentation site, interacting with examples, and verifying all code samples work when copied.

**Acceptance Scenarios**:

1. **Given** the documentation site is deployed, **When** a developer visits the site, **Then** they see a complete list of all components with live previews
2. **Given** a component documentation page, **When** a developer toggles the theme switcher, **Then** all examples update in real-time to show the selected theme
3. **Given** a code example in the documentation, **When** a developer copies the code to their project, **Then** the component renders identically to the documentation example

---

### Edge Cases

- What happens when a developer uses component classes without installing the plugin? (Should show clear error message about missing plugin)
- How does the system handle custom theme configurations with invalid color values? (Should validate and provide helpful error messages)
- What happens when a component is used with conflicting utility classes? (Should follow CSS specificity rules with predictable outcomes)
- How does the plugin behave when loaded in a Tailwind CSS v3 project? (Should fail fast with clear migration guidance)
- What happens when documentation site is accessed without JavaScript enabled? (Should still display static examples and maintain accessibility)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Plugin MUST export as a Tailwind CSS v4 compatible module loadable via `@plugin` directive
- **FR-002**: Plugin MUST generate all 65+ Material Design 3 color tokens as CSS custom properties
- **FR-003**: Plugin MUST provide primary, secondary, and tertiary color variants (base, focus, content, container, on-container)
- **FR-004**: Plugin MUST include sunshine (light) and moonlight (dark) built-in themes
- **FR-005**: Plugin MUST support theme switching via data-theme attribute without runtime JavaScript
- **FR-006**: Plugin MUST define component styles using `@layer components` declarations
- **FR-007**: Components MUST include buttons, cards, inputs, forms, navigation, and modals as minimum set
- **FR-008**: Each component MUST support primary, secondary, and tertiary color variants
- **FR-009**: Each component MUST work correctly in both light and dark themes
- **FR-010**: Plugin MUST provide TypeScript type definitions for all configuration options
- **FR-011**: Plugin MUST validate theme configurations and provide clear error messages
- **FR-012**: Documentation site MUST include a page for each component showing all variants
- **FR-013**: Documentation site MUST include interactive theme switcher affecting all examples
- **FR-014**: Documentation site MUST include installation and quickstart guides
- **FR-015**: Documentation site MUST demonstrate all 65+ color tokens with visual examples
- **FR-016**: Unit tests MUST cover color token generation, theme switching logic, component class output, and configuration validation
- **FR-017**: Visual regression tests MUST capture screenshots of all component variants across both themes and detect unintended visual changes
- **FR-018**: Integration tests MUST verify components render correctly in real browser environments with user interactions (hover, focus, click)
- **FR-019**: Accessibility audits MUST verify WCAG AA compliance for all components including keyboard navigation, screen reader support, and color contrast
- **FR-020**: Plugin MUST maintain bundle size under 10KB (minified)
- **FR-021**: Plugin MUST have ONLY tailwindcss >= 4.0.0 as peer dependency
- **FR-022**: Component base styles MUST provide minimal styling (colors, states) and allow Tailwind utility classes to override spacing, sizing, borders, and other visual properties

### Key Entities

- **Theme**: A collection of color values defining the appearance of all components. Contains primary, secondary, tertiary colors with their variants, surface colors, and semantic colors (info, success, warning, error). Built-in themes are sunshine and moonlight.

- **Component Style**: Minimal CSS declarations in `@layer components` that define color, hover/focus states, and theme-switching behavior. Components are designed for utility class composition, allowing developers to add Tailwind utilities (padding, margin, border-radius, shadows, etc.) to customize appearance without overriding plugin styles.

- **Color Token**: A semantic CSS custom property representing a specific color role (e.g., `--primary`, `--secondary-content`). Tokens guarantee WCAG AA contrast ratios and update automatically when themes change.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can install and configure the plugin in a new project in under 5 minutes
- **SC-002**: All 65+ color tokens are available and properly named following Material Design 3 conventions
- **SC-003**: Theme switching occurs instantly without page reload or visual flicker
- **SC-004**: All component examples in documentation render correctly in both light and dark themes
- **SC-005**: Plugin bundle size remains under 10KB when minified
- **SC-006**: 100% of unit tests pass covering color generation, theme switching, component rendering, and configuration validation
- **SC-007**: Documentation site loads in under 3 seconds on standard broadband connection
- **SC-008**: All color combinations meet WCAG AA contrast ratio requirements (4.5:1 minimum)
- **SC-009**: Zero runtime JavaScript required for core functionality (theme switching works with pure CSS)
- **SC-010**: Documentation site achieves WCAG AA accessibility score
- **SC-011**: Developers can customize any component using standard Tailwind utilities without writing custom CSS
- **SC-012**: Visual regression tests pass with zero unintended visual changes across all component variants and themes
- **SC-013**: All components pass automated accessibility audits with zero critical violations
- **SC-014**: Integration tests verify all interactive states (hover, focus, active, disabled) work correctly in real browsers

## Assumptions

1. **DaisyUI Architecture Pattern**: Assumes DaisyUI's CSS-first component architecture using `@layer components` with semantic class names and variant modifiers (e.g., `btn`, `btn-primary`, `btn-secondary`). Components provide minimal base styles designed for utility class composition.

2. **Component Set**: Assumes a standard set of UI components common to most projects: buttons, cards, inputs, forms, navigation, modals. Additional components can be added in future iterations.

3. **Theme Structure**: Assumes themes are defined as collections of HSL color values stored in CSS custom properties, enabling smooth transitions and runtime switching.

4. **Build Environment**: Assumes developers use modern build tools compatible with Tailwind CSS v4 (Vite, Next.js, Astro, etc.).

5. **Browser Support**: Assumes support for modern browsers with CSS custom properties (Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+).

6. **TypeScript Usage**: Assumes TypeScript is the primary language for type definitions, though JavaScript usage is supported.

7. **Documentation Hosting**: Assumes GitHub Pages as the deployment target with automated builds via GitHub Actions.

8. **Testing Framework**: Assumes comprehensive testing stack including unit testing (Vitest/Jest), visual regression testing (Playwright/Percy), integration testing (Playwright/Cypress), and accessibility auditing (axe-core/Lighthouse).
