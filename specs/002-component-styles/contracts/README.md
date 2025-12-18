# Component Contracts

**Feature**: 002-component-styles
**Date**: 2025-12-05

## Overview

This directory contains the CSS class API contracts for DuskMoonUI components. These contracts define the expected class names and their behavior.

## Contract Format

Each component follows this class naming convention:

```css
/* Base component */
.{component} { }

/* Style variants */
.{component}-filled { }
.{component}-outlined { }
.{component}-text { }
.{component}-tonal { }
.{component}-ghost { }

/* Color variants */
.{component}-primary { }
.{component}-secondary { }
.{component}-tertiary { }
.{component}-info { }
.{component}-success { }
.{component}-warning { }
.{component}-error { }

/* Size variants */
.{component}-xs { }
.{component}-sm { }
.{component}-lg { }

/* State modifiers */
.{component}-loading { }
.{component}-active { }
.{component}:disabled { }
.{component}:hover { }
.{component}:focus-visible { }
```

## Common Patterns

### Interactive Components
Components that respond to user interaction (buttons, inputs, etc.):
- MUST have `:hover` styles
- MUST have `:focus-visible` styles with outline
- MUST have `:disabled` styles (opacity + pointer-events)
- MAY have `:active` styles

### Container Components
Components that wrap content (cards, dialogs, etc.):
- MUST have base padding/spacing
- MAY have elevation variants (shadow)
- MUST use surface colors from theme

### Form Components
Input-related components:
- MUST have error state (`.{component}-error`)
- MUST have disabled state
- SHOULD have label association styles
- SHOULD have helper text styles

## Component-Specific Contracts

### Button (.btn)
```
Base: .btn
Styles: .btn-filled, .btn-outlined, .btn-text, .btn-tonal, .btn-ghost
Colors: .btn-primary, .btn-secondary, .btn-tertiary, .btn-info, .btn-success, .btn-warning, .btn-error
Sizes: .btn-xs, .btn-sm, .btn-lg
Modifiers: .btn-block, .btn-circle, .btn-square, .btn-loading
Groups: .btn-group
```

### Card (.card)
```
Base: .card
Elevation: .card-elevated, .card-filled, .card-outlined
Parts: .card-header, .card-body, .card-footer, .card-title, .card-subtitle
```

### Input (.input)
```
Base: .input
Variants: .input-outlined, .input-filled
Sizes: .input-sm, .input-lg
States: .input-error, .input-success
Groups: .input-group, .input-group-prepend, .input-group-append
```

### Alert (.alert)
```
Base: .alert
Types: .alert-info, .alert-success, .alert-warning, .alert-error
Variants: .alert-outlined, .alert-filled
Parts: .alert-icon, .alert-title, .alert-description, .alert-close
```

### Badge (.badge)
```
Base: .badge
Colors: .badge-primary, .badge-secondary, .badge-info, .badge-success, .badge-warning, .badge-error
Variants: .badge-outlined, .badge-soft
Sizes: .badge-sm, .badge-lg
```

### Chip (.chip)
```
Base: .chip
Colors: .chip-primary, .chip-secondary, .chip-tertiary
Variants: .chip-outlined, .chip-filled
Parts: .chip-icon, .chip-label, .chip-close
States: .chip-selected
```

### Dialog/Modal (.dialog, .modal)
```
Base: .dialog, .modal
Sizes: .dialog-sm, .dialog-lg, .dialog-fullscreen
Parts: .dialog-backdrop, .dialog-header, .dialog-body, .dialog-footer, .dialog-close
```

### Progress (.progress)
```
Base: .progress
Types: .progress-linear, .progress-circular
Variants: .progress-indeterminate
Colors: .progress-primary, .progress-secondary
Parts: .progress-bar, .progress-track
```

### Tabs (.tabs)
```
Base: .tabs
Variants: .tabs-bordered, .tabs-lifted, .tabs-boxed
Parts: .tab, .tab-active, .tab-content
```

### Table (.table)
```
Base: .table
Variants: .table-zebra, .table-compact, .table-hover
Parts: .table-header, .table-body, .table-footer, .table-row, .table-cell
```

## Testing Contracts

Each component contract should be testable via:

1. **Existence test**: Class renders without error
2. **Visual test**: Component matches expected appearance
3. **State test**: Hover/focus/disabled states work
4. **Theme test**: Colors adapt to theme changes
5. **Composition test**: Variants combine correctly

## Usage Example

```html
<!-- Button with multiple modifiers -->
<button class="btn btn-primary btn-lg">Large Primary Button</button>

<!-- Outlined secondary button -->
<button class="btn btn-outlined btn-secondary">Outlined Secondary</button>

<!-- Card with parts -->
<div class="card card-elevated">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>
```
