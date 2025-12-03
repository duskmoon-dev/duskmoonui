# Feature Specification: Documentation Component Showcase Enhancement

**Feature Branch**: `001-docs-component-showcase`
**Created**: 2025-12-01
**Status**: Draft
**Input**: User description: "Page path /duskmoonui/components/ content does not centered. Only the Button component have preview/source code tabs, we need all other components to have this feature."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Centered Component Content (Priority: P1)

As a documentation reader, I want the component pages content to be properly centered so that I can easily read and understand the documentation without content appearing off-center or misaligned.

**Why this priority**: This is a visual/layout bug that affects the immediate usability and professional appearance of the documentation site. Users visiting the `/duskmoonui/components/` path should see properly centered content.

**Independent Test**: Can be fully tested by navigating to `/duskmoonui/components/` and visually confirming content is horizontally centered within the viewport.

**Acceptance Scenarios**:

1. **Given** a user visits `/duskmoonui/components/`, **When** the page loads, **Then** the main content area should be horizontally centered within the viewport
2. **Given** a user views the components page on various screen sizes (mobile, tablet, desktop), **When** they resize the browser, **Then** the content should remain centered with appropriate responsive behavior

---

### User Story 2 - Interactive Preview/Code Tabs for All Components (Priority: P1)

As a developer exploring the UI component library, I want every component documentation page to have interactive preview/source code tabs so that I can see live examples alongside the code needed to implement them.

**Why this priority**: This is the core feature request. Currently only the Button component has this functionality via `ComponentShowcase`. All other components (Card, Chip, Alert, etc.) use static markdown code blocks without live preview, creating an inconsistent user experience.

**Independent Test**: Can be fully tested by visiting any component documentation page (e.g., Card, Chip, Alert) and verifying the presence of Preview/Code tabs that toggle between live preview and source code views.

**Acceptance Scenarios**:

1. **Given** a developer visits any component documentation page (e.g., `/docs/en/components/card/`), **When** the page loads, **Then** each code example should display in a tabbed interface with "Preview" and "Code" tabs
2. **Given** a developer is viewing a component example, **When** they click the "Preview" tab, **Then** they should see a live rendered preview of the component
3. **Given** a developer is viewing a component example, **When** they click the "Code" tab, **Then** they should see the HTML/code required to implement that example
4. **Given** a developer switches tabs on one example, **When** they scroll to another example on the same page, **Then** the tab preference should persist (if the current behavior is maintained)

---

### User Story 3 - Consistent Documentation Experience (Priority: P2)

As a documentation maintainer, I want a consistent pattern for documenting component examples so that adding new components or updating existing ones follows a clear, repeatable approach.

**Why this priority**: While not user-facing, having a consistent pattern makes maintenance easier and ensures all future component documentation automatically benefits from the preview/code tab feature.

**Independent Test**: Can be tested by verifying that all component MDX files use the same `ComponentShowcase` component pattern for examples.

**Acceptance Scenarios**:

1. **Given** a documentation maintainer opens any component MDX file, **When** they review the code examples, **Then** all interactive examples should use the `ComponentShowcase` component
2. **Given** a documentation maintainer adds a new code example to a component page, **When** they use the `ComponentShowcase` component, **Then** the preview/code tabs should automatically appear without additional configuration

---

### Edge Cases

- What happens when the code example contains syntax errors or invalid HTML? The preview should gracefully display whatever HTML is provided, even if malformed
- What happens when a user has JavaScript disabled? The documentation should degrade gracefully, showing both preview and code without tabs, as per current progressive enhancement
- What happens for very long code examples? The code panel should be scrollable, maintaining a reasonable height
- What happens when component examples require external assets (images, icons)? Examples should use inline SVGs or placeholder content that doesn't require external resources

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `/duskmoonui/components/` page content MUST be horizontally centered within the viewport with appropriate maximum width constraints
- **FR-002**: All component documentation pages MUST use the `ComponentShowcase` component for displaying code examples with live previews
- **FR-003**: Each `ComponentShowcase` instance MUST display "Preview" and "Code" tabs that toggle visibility of the respective content
- **FR-004**: The "Preview" tab MUST render the HTML code as live, styled components
- **FR-005**: The "Code" tab MUST display the source code with proper formatting
- **FR-006**: Tab selection preference MUST persist across multiple `ComponentShowcase` instances on the same page during a browsing session
- **FR-007**: The component documentation MUST degrade gracefully when JavaScript is disabled, showing both preview and code content
- **FR-008**: All component MDX files MUST be updated to replace static markdown code blocks with `ComponentShowcase` usage for interactive examples

### Key Entities

- **ComponentShowcase**: An Astro component that wraps code examples with preview/code tabbed interface
- **Component MDX Files**: Documentation files for each UI component (located in `packages/docs/src/content/docs/en/components/`)
- **Components Index Page**: The page at `/duskmoonui/components/` that lists all available components

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of component documentation pages display centered content on the `/components/` listing page
- **SC-002**: 100% of code examples across all component documentation pages use the interactive preview/code tab interface
- **SC-003**: Users can switch between preview and code views in under 1 second (instant tab switching)
- **SC-004**: The documentation remains fully readable and functional when JavaScript is disabled
- **SC-005**: All 32+ component documentation pages provide consistent user experience with preview/code tabs

## Assumptions

- The existing `ComponentShowcase` component in `packages/docs/src/components/showcase/ComponentShowcase.astro` is fully functional and can be reused without modification
- The centering issue on `/duskmoonui/components/` is a CSS styling problem that can be resolved by adjusting the layout container styles
- Static markdown code blocks in component MDX files should be converted to `ComponentShowcase` components only for examples that benefit from live preview (not for framework-specific examples like React/Vue snippets which cannot be rendered as live HTML)
- The existing tab persistence behavior (preferring the last selected tab across showcases) is desired and should be maintained
