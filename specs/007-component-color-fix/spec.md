# Feature Specification: Form Component Color Token Variants & Bug Fixes

**Feature Branch**: `feat/component-color-variant-convention` (existing — no new branch)
**Created**: 2026-03-14
**Status**: Draft
**Spec Dir**: `specs/007-component-color-fix/`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Color Variant Coverage on All Form Components (Priority: P1)

A developer browsing the DuskMoonUI docs wants to apply semantic color variants
(`-primary`, `-secondary`, `-tertiary`, `-info`, `-success`, `-warning`, `-error`)
to any form component. Each component's docs page MUST show live, working examples
of every variant so the developer can copy a class name and see the result immediately.

**Why this priority**: Without visible color variants, Principle VIII is unverifiable.
This is the core deliverable of the current feature branch.

**Independent Test**: Navigate to each component docs page in the browser.
Verify that color variant examples are visible, correctly styled, and match the
active theme's color tokens.

**Acceptance Scenarios**:

1. **Given** the docs site is running and a theme is active, **When** a developer
   opens any of the 20 form component pages listed below, **Then** they see live
   demo blocks for all 7 semantic color variants plus the ghost variant.

2. **Given** the `sunshine` (light) theme, **When** a `-error` variant is displayed,
   **Then** the component renders with the error color and a legible content color
   (not invisible against the background).

3. **Given** the `moonlight` (dark) theme, **When** switching themes,
   **Then** all color variants update correctly without broken or missing colors.

---

### User Story 2 - Bug-Free Rendering of All 20 Component Pages (Priority: P2)

A developer visiting any of the 20 form component pages expects the page to load
without visual regressions, broken layouts, missing demo content, or console errors.

**Why this priority**: Bugs in the demo pages undermine trust in the library.
Color tokens that render incorrectly are worse than missing tokens.

**Independent Test**: Open each component page in Chrome via chrome-devtools.
No console errors, no layout breakage, no invisible or clipping elements.

**Acceptance Scenarios**:

1. **Given** any of the 20 component pages, **When** the page loads,
   **Then** there are zero JavaScript console errors.

2. **Given** a component with interactive state (focus, hover, disabled),
   **When** the state is triggered, **Then** the component's visual state
   (focus ring, hover color) renders correctly for both default and variant classes.

3. **Given** the ghost variant on a form component, **When** rendered,
   **Then** no border is visible in the default state and text remains legible.

---

### User Story 3 - Default Color Is `on-surface` (Priority: P3)

When a form component is rendered without any color modifier class, its foreground
text and interactive border MUST read as `on-surface` — legible against any surface
background across all themes.

**Why this priority**: This is the baseline accessibility contract. Components that
default to hard-coded colors break on non-default themes.

**Independent Test**: Render each component on the `surface`, `surface-container`,
and `surface-container-high` backgrounds without a color modifier. Text and border
must remain visible on all three.

**Acceptance Scenarios**:

1. **Given** no color modifier class, **When** a form component is placed on any
   surface-level background, **Then** the text and border color match `on-surface`.

2. **Given** the `forest` or `ocean` theme (non-default), **When** a form component
   has no color modifier, **Then** it is visually legible without any extra CSS.

---

### Edge Cases

- A component page that has no ghost variant (e.g., `.badge`) must NOT show a
  broken ghost example — skip or omit the ghost block for display-only components.
- `info`/`success`/`warning`/`error` tokens not yet defined in a theme file must
  show a fallback rather than a transparent/invisible render.
- Components with complex sub-elements (e.g., Cascader, Tree Select, Date Picker)
  must propagate the color variant to all visible sub-parts (dropdown panel,
  selected chip, calendar header).

## Requirements *(mandatory)*

### Functional Requirements

**Components in scope** (20 total):
Autocomplete, Cascader, Checkbox, Date Picker, Form, Form Group, Input,
Multi-Select, OTP Input, PIN Input, Radio, Rating, Segment Control, Select,
Slider, Switch, Textarea, Time Input, Toggle, Tree Select.

- **FR-001**: Every in-scope component's docs page MUST include live demo blocks
  for all 7 semantic color variants: `primary`, `secondary`, `tertiary`, `info`,
  `success`, `warning`, `error`.

- **FR-002**: Every in-scope component that has a visible border in its default
  state MUST include a ghost variant demo block on its docs page.

- **FR-003**: The base (unmodified) component class MUST render with `on-surface`
  as its foreground color, verifiable by visual inspection in chrome-devtools.

- **FR-004**: Form/interactive components (Input, Textarea, Select, OTP Input,
  PIN Input, Time Input, Autocomplete, Cascader, Multi-Select, Tree Select,
  Date Picker) MUST use the `currentColor` border pattern: base border is
  `1px solid currentColor`; color variants set `color` only.

- **FR-005**: Display/container components (Checkbox, Radio, Rating, Segment
  Control, Slider, Switch, Toggle, Form, Form Group) MUST use background + content
  token pairs for their color variants.

- **FR-006**: Focus ring on interactive components MUST render as
  `box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`.

- **FR-007**: All 20 component pages MUST load without JavaScript console errors
  in Chrome.

- **FR-008**: Color variants MUST update correctly when the active theme is changed
  (no stale colors, no invisible text).

- **FR-009**: The docs pages for all 20 components MUST be verified by opening
  them in the browser via chrome-devtools and visually confirming correct rendering.

- **FR-010**: Any visual bug identified during the chrome-devtools review MUST be
  fixed in the corresponding CSS file in `packages/core/src/components/` and
  reflected in the docs page.

- **FR-011**: The four semantic status tokens (`info`, `success`, `warning`,
  `error` and their `-content` pairs) MUST be present in all 5 theme files.

### Key Entities

- **Component CSS file**: `packages/core/src/components/{name}.css` — defines
  base class and all variant modifiers for a single component.
- **Component docs page**: `packages/docs/src/content/docs/en/components/{name}.mdx`
  — the MDX file that renders live examples including color variant demos.
- **Theme file**: `packages/core/src/themes/{theme}.css` — declares all color
  tokens; must include the 4 status token pairs.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 20 component docs pages display live examples for all 7 semantic
  color variants without any invisible, clipped, or broken renders.

- **SC-002**: Zero JavaScript console errors are reported when loading any of the
  20 component pages in Chrome.

- **SC-003**: The ghost variant renders without a visible border on all components
  that have one (visually confirmed in chrome-devtools).

- **SC-004**: Switching between all 5 themes while viewing a component page shows
  correct, theme-appropriate colors for every variant — no color remains static
  or transparent after a theme switch.

- **SC-005**: All 5 theme files define `info`, `info-content`, `success`,
  `success-content`, `warning`, `warning-content`, `error`, and `error-content`
  tokens.

- **SC-006**: The default (unmodified) component on any surface background passes
  a manual legibility check in chrome-devtools for all 5 themes.

## Assumptions

- The docs dev server (`bun run dev`) is running and accessible locally on
  `localhost` during review.
- The chrome-devtools MCP tool is available and connected to the running browser.
- Existing component CSS files already contain partial variant implementations
  from the current PR; this spec covers completing and bug-fixing them.
- Components that are purely layout utilities (Form, Form Group) may have a
  reduced set of variants (e.g., no ghost) — this is acceptable if documented.
