# Feature Specification: Tabbed Code Block with Preview

**Feature Branch**: `001-docs-code-preview-tabs`
**Created**: 2025-11-26
**Status**: Draft
**Input**: User description: "Update the code block in the @packages/docs/, It should have tabs with code and preview."

## Overview

Currently, the documentation site's `ComponentShowcase` component displays previews and code vertically stacked. This feature will add a tabbed interface allowing users to toggle between "Preview" and "Code" views, providing a cleaner, more interactive documentation experience similar to popular UI libraries like daisyUI, Material UI, and Chakra UI.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Live Preview (Priority: P1)

As a developer exploring DuskMoonUI components, I want to see a live preview of each component so I can quickly understand what it looks like without reading code.

**Why this priority**: The preview tab should be the default view since most developers first want to see what a component looks like before diving into the code.

**Independent Test**: Can be fully tested by navigating to any component documentation page (e.g., `/docs/en/components/button/`) and verifying the preview renders correctly in the default "Preview" tab.

**Acceptance Scenarios**:

1. **Given** a documentation page with a ComponentShowcase, **When** the page loads, **Then** the "Preview" tab is active by default and shows the rendered component
2. **Given** a ComponentShowcase with a button component, **When** viewing the preview tab, **Then** the button is interactive (hover, click states work)
3. **Given** multiple ComponentShowcase instances on a page, **When** the page loads, **Then** each showcase independently shows its own preview

---

### User Story 2 - View and Copy Code (Priority: P1)

As a developer implementing DuskMoonUI components, I want to view the source code for each example and copy it easily so I can use it in my project.

**Why this priority**: Code viewing is equally critical as preview viewing - developers need both to use the library effectively.

**Independent Test**: Can be fully tested by clicking the "Code" tab on any ComponentShowcase and verifying the code displays with syntax highlighting and copy functionality.

**Acceptance Scenarios**:

1. **Given** a ComponentShowcase in preview mode, **When** I click the "Code" tab, **Then** the view switches to show the HTML/code with syntax highlighting
2. **Given** a ComponentShowcase showing code, **When** I click the "Copy" button, **Then** the code is copied to clipboard and visual feedback confirms the copy
3. **Given** code is displayed, **When** I view it, **Then** the code preserves proper indentation and formatting

---

### User Story 3 - Switch Between Views (Priority: P1)

As a developer learning DuskMoonUI, I want to quickly switch between preview and code views so I can compare the visual output with its implementation.

**Why this priority**: Seamless switching is core UX that makes the tabbed interface valuable.

**Independent Test**: Can be fully tested by clicking between "Preview" and "Code" tabs multiple times and verifying smooth transitions.

**Acceptance Scenarios**:

1. **Given** a ComponentShowcase with both tabs, **When** I click between "Preview" and "Code" repeatedly, **Then** the content switches smoothly without page reload
2. **Given** I'm on the "Code" tab, **When** I click "Preview", **Then** the preview tab becomes active and code is hidden
3. **Given** I'm on the "Preview" tab, **When** I click "Code", **Then** the code tab becomes active with syntax highlighting visible

---

### User Story 4 - Persist Tab Selection (Priority: P2)

As a developer browsing multiple examples, I want my tab preference to persist within a page session so I don't have to repeatedly switch to code view if that's what I prefer.

**Why this priority**: Nice-to-have UX improvement, but not critical for MVP functionality.

**Independent Test**: Can be tested by selecting "Code" tab on one showcase and checking if subsequent showcases remember the preference (either via session storage or React state).

**Acceptance Scenarios**:

1. **Given** I select "Code" tab on one ComponentShowcase, **When** I scroll to another ComponentShowcase, **Then** my last preference is remembered (Code tab active)
2. **Given** I refresh the page, **When** the page loads, **Then** tab selection resets to default "Preview"

---

### User Story 5 - Responsive Tab Interface (Priority: P2)

As a developer using various devices, I want the tabbed interface to work well on both desktop and mobile so I can reference documentation anywhere.

**Why this priority**: Mobile responsiveness is important but secondary to core functionality.

**Independent Test**: Can be tested by viewing component pages at various viewport sizes and verifying tabs are usable.

**Acceptance Scenarios**:

1. **Given** a mobile viewport (< 640px), **When** I view a ComponentShowcase, **Then** tabs are still visible and tappable
2. **Given** a tablet viewport, **When** I view a ComponentShowcase, **Then** the layout adapts appropriately

---

### Edge Cases

- What happens when code content is empty? Display "No code available" message
- How does the component handle very long code examples? Add scrolling within the code container
- What if JavaScript is disabled? Default to showing both preview and code stacked (progressive enhancement)
- How does copy work on older browsers? Provide fallback or graceful degradation with error message

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a tabbed interface with "Preview" and "Code" tabs on each ComponentShowcase
- **FR-002**: System MUST default to showing the "Preview" tab when the page loads
- **FR-003**: System MUST switch content when user clicks on a tab without page reload
- **FR-004**: System MUST provide syntax highlighting for code in the "Code" tab
- **FR-005**: System MUST include a "Copy" button in the code view that copies code to clipboard
- **FR-006**: System MUST provide visual feedback when code is copied (e.g., "Copied!" text)
- **FR-007**: System MUST render HTML code as interactive elements in the "Preview" tab
- **FR-008**: System MUST style the active tab differently from inactive tabs
- **FR-009**: System MUST maintain backward compatibility with existing ComponentShowcase usage in MDX files

### Non-Functional Requirements

- **NFR-001**: Tab switching MUST feel instant (< 100ms perceived latency)
- **NFR-002**: Component MUST work without JavaScript for basic functionality (progressive enhancement)
- **NFR-003**: Component MUST be keyboard accessible (tab navigation, Enter/Space activation)
- **NFR-004**: Component MUST meet WCAG 2.1 AA color contrast requirements

### Key Entities

- **ComponentShowcase**: The main container component that holds the tabbed interface
- **Tab**: Individual tab elements ("Preview", "Code") with active/inactive states
- **TabPanel**: Content area that displays either preview or code based on active tab
- **CodeBlock**: Existing component for displaying syntax-highlighted code with copy functionality

## Technical Constraints

- Must work within Astro framework (use Astro components, not React by default)
- Should leverage existing `CodeBlock.astro` component for code display
- Must use DuskMoonUI's own CSS classes/variables for styling
- Should support both static site generation (SSG) and client-side interactivity

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 50+ existing documentation pages render without errors after migration
- **SC-002**: Tab switching occurs in under 100ms (no perceivable delay)
- **SC-003**: Copy functionality works on all modern browsers (Chrome, Firefox, Safari, Edge)
- **SC-004**: Component passes axe-core accessibility audit with no critical issues
- **SC-005**: No increase in Largest Contentful Paint (LCP) by more than 200ms
- **SC-006**: Existing MDX files require zero changes (backward compatible API)

## UI/UX Reference

The tabbed interface should follow patterns similar to:
- [daisyUI Component Pages](https://daisyui.com/components/) - Clean tabs with Preview/HTML/JSX options
- [Tailwind UI](https://tailwindui.com/) - Preview and code toggle
- [Chakra UI](https://chakra-ui.com/docs/components) - Tabbed code examples

### Visual Design Guidelines

- Tabs should be positioned at the top-right of the showcase container
- Active tab should have a distinct visual indicator (bottom border or background)
- Preview area should have a subtle background to distinguish it from the page
- Code area should use a monospace font with appropriate syntax highlighting
- Copy button should be positioned in the top-right corner of the code area
