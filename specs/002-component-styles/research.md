# Research: Component Styles Implementation

**Feature**: 002-component-styles
**Date**: 2025-12-05

## Research Questions

### RQ-001: What CSS architecture pattern should be used for component styles?

**Decision**: CSS-first with `@layer components` (Tailwind CSS v4 native syntax)

**Rationale**:
- Constitution Principle II mandates Tailwind v4 native syntax
- Existing `button.css` demonstrates the pattern with `@layer components`
- CSS custom properties (`--color-*`) enable theme switching without JS
- LightningCSS handles nesting and bundling

**Alternatives Considered**:
1. **TypeScript style objects (current partial state)**: Rejected - violates Principle II, requires JS-to-CSS conversion
2. **Tailwind v3 plugin API**: Rejected - explicitly prohibited by Constitution
3. **CSS-in-JS (Emotion, styled-components)**: Rejected - adds runtime JS dependency

### RQ-002: How should component class naming be structured?

**Decision**: BEM-like flat naming with component prefix

**Pattern**:
```
.{component}                    # Base class (e.g., .btn, .card)
.{component}-{variant}          # Variant (e.g., .btn-primary, .card-elevated)
.{component}-{size}             # Size (e.g., .btn-sm, .btn-lg)
.{component}-{state}            # State modifier (e.g., .btn-loading)
.{component} + .{variant}       # Composable (e.g., .btn.btn-outline.btn-primary)
```

**Rationale**:
- Matches existing `button.css` conventions
- Allows composable variants (e.g., `.btn-outline.btn-primary`)
- Consistent with DaisyUI patterns for familiarity
- Works well with Tailwind utility classes

**Alternatives Considered**:
1. **Strict BEM (.btn__icon--active)**: Rejected - verbose, less composable
2. **CSS Modules**: Rejected - requires build tooling per-consumer
3. **Tailwind @apply only**: Rejected - doesn't provide reusable classes

### RQ-003: What variants should each component support?

**Decision**: Standardized variant system based on Material Design 3

**Standard Variants**:

| Variant Type | Options | Applies To |
|--------------|---------|------------|
| Color | primary, secondary, tertiary, info, success, warning, error | buttons, alerts, badges, chips |
| Style | filled, outlined, text/ghost, tonal | buttons, chips, cards |
| Size | xs, sm, md (default), lg | most components |
| State | disabled, loading, active, error | interactive components |
| Elevation | lowest, low, default, high, highest | cards, surfaces |

**Rationale**:
- Material Design 3 provides well-tested, accessible patterns
- Existing theme system supports these color variants
- Size variants match common CSS framework expectations

### RQ-004: How should CSS files be organized?

**Decision**: One CSS file per component, aggregated via index.css

**Structure**:
```
packages/core/src/components/
├── index.css          # @import all component CSS files
├── button.css         # .btn, .btn-*, button variants
├── card.css           # .card, .card-*, card variants
├── input.css          # .input, .input-group, form inputs
└── ... (one file per component)
```

**Rationale**:
- Component independence (Constitution Principle III)
- Easy to find/modify specific component styles
- Tree-shakeable when using CSS import directly
- Matches existing pattern

### RQ-005: How should theme integration work?

**Decision**: CSS custom properties with `[data-theme="..."]` selectors

**Pattern**:
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-content);
}

.btn-primary:hover {
  background-color: var(--color-primary-focus);
}
```

**Rationale**:
- Theme switching via `data-theme` attribute on `<html>`
- No JavaScript required for theme changes
- CSS variables cascade automatically
- Existing theme files define all color variables

### RQ-006: What accessibility requirements must be met?

**Decision**: WCAG AA compliance with built-in focus states

**Requirements**:
1. **Color contrast**: All `-content` colors meet 4.5:1 against backgrounds
2. **Focus visible**: All interactive components have `:focus-visible` styles
3. **Disabled state**: 0.5 opacity + pointer-events: none
4. **Motion**: Respect `prefers-reduced-motion` for animations

**Implementation**:
```css
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
```

**Rationale**:
- Constitution Principle VII mandates accessibility
- Focus states already exist in button.css pattern
- Existing theme contrast ratios are verified

## Technical Findings

### Existing CSS Files

| File | Status | Notes |
|------|--------|-------|
| button.css | Complete | Full variant coverage, good reference |
| card.css | Complete | Basic variants |
| input.css | Complete | Form input styles |
| form.css | Partial | Basic form layout |
| modal.css | Complete | Dialog/modal styles |
| navigation.css | Partial | Nav base styles |

### Missing CSS Files (37)

Components with TypeScript definitions but no CSS files:
- Data Display: avatar, badge, chip, list, table
- Data Entry: autocomplete, checkbox, datepicker, file-upload, radio, rating, select, slider, switch, textarea, toggle
- Feedback: alert, dialog, progress, skeleton, snackbar, toast, tooltip
- Layout: appbar, divider
- Navigation: bottom-navigation, breadcrumbs, drawer, menu, navbar, pagination, stepper, tabs
- Surfaces: accordion, bottomsheet, collapse, popover
- Misc: timeline

### CSS Variable Reference

All components should use these color variables:

**Brand Colors**:
- `--color-primary`, `--color-primary-content`, `--color-primary-focus`, `--color-primary-container`, `--color-on-primary-container`
- `--color-secondary`, `--color-secondary-content`, `--color-secondary-focus`, `--color-secondary-container`, `--color-on-secondary-container`
- `--color-tertiary`, `--color-tertiary-content`, `--color-tertiary-focus`, `--color-tertiary-container`, `--color-on-tertiary-container`

**Semantic Colors**:
- `--color-info`, `--color-info-content`
- `--color-success`, `--color-success-content`
- `--color-warning`, `--color-warning-content`
- `--color-error`, `--color-error-content`

**Surface Colors**:
- `--color-surface`, `--color-on-surface`
- `--color-surface-container`, `--color-surface-container-low`, `--color-surface-container-high`
- `--color-outline`, `--color-outline-variant`

## Conclusions

1. **CSS-first approach confirmed**: Use `@layer components` with CSS custom properties
2. **Pattern established**: Follow button.css as the reference implementation
3. **37 CSS files needed**: Create CSS files for all components lacking them
4. **Documentation sync**: MDX examples already use correct class names - verify they match CSS
5. **Accessibility built-in**: Focus states, contrast, reduced motion support
