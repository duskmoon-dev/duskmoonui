# Data Model: Component Styles

**Feature**: 002-component-styles
**Date**: 2025-12-05

## Overview

This feature does not involve persistent data storage. The "data model" describes the structure of CSS component definitions and their relationships.

## Entities

### Component Style Definition

A CSS file defining all visual styles for a single UI component.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| componentName | string | Base class name (e.g., "btn", "card") |
| baseStyles | CSS | Core styles applied to base class |
| variants | CSS[] | Style variants (filled, outlined, etc.) |
| colorVariants | CSS[] | Color-based variants (primary, secondary, etc.) |
| sizeVariants | CSS[] | Size modifiers (sm, md, lg) |
| stateStyles | CSS[] | Interactive states (hover, focus, disabled) |

**Relationships**:
- Uses: Theme Color Variables
- Documented in: MDX Documentation Page

### Theme Color Variable

A CSS custom property defining a color value.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| name | string | Variable name (e.g., "--color-primary") |
| value | HSL | HSL color value |
| role | enum | primary, secondary, tertiary, semantic, surface |

**Relationships**:
- Defined in: Theme CSS file (sunshine.css, moonlight.css)
- Used by: Component Style Definition

### Component Variant

A modifier class that changes component appearance.

**Attributes**:
| Attribute | Type | Description |
|-----------|------|-------------|
| className | string | Modifier class (e.g., "btn-primary") |
| type | enum | style, color, size, state |
| baseComponent | string | Parent component name |
| cssProperties | object | CSS property overrides |

## Component Class Structure

```
┌─────────────────────────────────────────────────────┐
│                Component Definition                  │
├─────────────────────────────────────────────────────┤
│  Base Class: .{component}                           │
│  ├── Style Variants: .{component}-{style}           │
│  │   └── filled, outlined, text, tonal, ghost       │
│  ├── Color Variants: .{component}-{color}           │
│  │   └── primary, secondary, tertiary, etc.         │
│  ├── Size Variants: .{component}-{size}             │
│  │   └── xs, sm, md, lg                             │
│  └── State Modifiers: .{component}-{state}          │
│      └── loading, active, disabled                  │
└─────────────────────────────────────────────────────┘
```

## Variant Composition Rules

### Valid Combinations
- Base + Color: `.btn.btn-primary`
- Base + Style + Color: `.btn.btn-outline.btn-primary`
- Base + Size: `.btn.btn-lg`
- Base + Style + Color + Size: `.btn.btn-outline.btn-primary.btn-lg`

### Invalid Combinations (undefined behavior)
- Multiple colors: `.btn.btn-primary.btn-secondary`
- Multiple styles: `.btn.btn-outline.btn-text`
- Multiple sizes: `.btn.btn-sm.btn-lg`

## State Transitions

Interactive components support these state transitions:

```
┌──────────┐    hover     ┌──────────┐
│  normal  │─────────────▶│  hover   │
└──────────┘              └──────────┘
     │                         │
     │ focus                   │ click
     ▼                         ▼
┌──────────┐              ┌──────────┐
│  focus   │              │  active  │
└──────────┘              └──────────┘

Special states (override all):
┌──────────┐              ┌──────────┐
│ disabled │              │ loading  │
└──────────┘              └──────────┘
```

## Component Inventory

### Complete (CSS exists)
| Component | Base Class | File |
|-----------|-----------|------|
| Button | .btn | button.css |
| Card | .card | card.css |
| Input | .input | input.css |
| Modal | .modal | modal.css |
| Form | .form-* | form.css |

### To Implement (CSS needed)
| Component | Base Class | File (to create) |
|-----------|-----------|------------------|
| Accordion | .accordion | accordion.css |
| Alert | .alert | alert.css |
| Appbar | .appbar | appbar.css |
| Autocomplete | .autocomplete | autocomplete.css |
| Avatar | .avatar | avatar.css |
| Badge | .badge | badge.css |
| Bottom Navigation | .bottom-nav | bottom-navigation.css |
| Bottomsheet | .bottomsheet | bottomsheet.css |
| Breadcrumbs | .breadcrumbs | breadcrumbs.css |
| Checkbox | .checkbox | checkbox.css |
| Chip | .chip | chip.css |
| Collapse | .collapse | collapse.css |
| Datepicker | .datepicker | datepicker.css |
| Dialog | .dialog | dialog.css |
| Divider | .divider | divider.css |
| Drawer | .drawer | drawer.css |
| File Upload | .file-upload | file-upload.css |
| List | .list | list.css |
| Menu | .menu | menu.css |
| Navbar | .navbar | navbar.css |
| Pagination | .pagination | pagination.css |
| Popover | .popover | popover.css |
| Progress | .progress | progress.css |
| Radio | .radio | radio.css |
| Rating | .rating | rating.css |
| Select | .select | select.css |
| Skeleton | .skeleton | skeleton.css |
| Slider | .slider | slider.css |
| Snackbar | .snackbar | snackbar.css |
| Stepper | .stepper | stepper.css |
| Switch | .switch | switch.css |
| Table | .table | table.css |
| Tabs | .tabs | tabs.css |
| Textarea | .textarea | textarea.css |
| Timeline | .timeline | timeline.css |
| Toast | .toast | toast.css |
| Toggle | .toggle | toggle.css |
| Tooltip | .tooltip | tooltip.css |
