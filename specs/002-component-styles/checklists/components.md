# Component Implementation Checklist: Component Styles

**Purpose**: Track implementation progress for all 42 component CSS files
**Created**: 2025-12-17
**Feature**: [spec.md](../spec.md)

## Implementation Criteria

Each component CSS file MUST:
- [ ] Use `@layer components` for all component styles
- [ ] Use CSS custom properties (--color-*) for theme integration
- [ ] Include `:hover` and `:focus-visible` states for interactive components
- [ ] Include `:disabled` state with opacity and pointer-events
- [ ] Support `prefers-reduced-motion` for animations
- [ ] Follow naming convention: `.{component}`, `.{component}-{variant}`

## Components By Category

### Actions (1 component)

#### Button (.btn) - EXISTS
- [x] CSS file exists: `button.css`
- [x] Base class: `.btn`
- [x] Style variants: filled, outlined, text, tonal, ghost
- [x] Color variants: primary, secondary, tertiary, info, success, warning, error
- [x] Size variants: xs, sm, lg
- [x] Modifiers: block, circle, square, loading
- [x] Group: `.btn-group`
- [x] Interactive states: hover, focus, active, disabled

### Data Display (6 components)

#### Avatar (.avatar) - TODO
- [ ] CSS file exists: `avatar.css`
- [ ] Base class: `.avatar`
- [ ] Size variants: xs, sm, md, lg, xl
- [ ] Variants: rounded, square, circle
- [ ] Parts: `.avatar-group`, `.avatar-ring`, `.avatar-placeholder`
- [ ] Online indicator: `.avatar-online`, `.avatar-offline`

#### Badge (.badge) - TODO
- [ ] CSS file exists: `badge.css`
- [ ] Base class: `.badge`
- [ ] Color variants: primary, secondary, info, success, warning, error
- [ ] Style variants: filled, outlined, soft
- [ ] Size variants: sm, lg
- [ ] Parts: `.badge-indicator`

#### Card (.card) - EXISTS
- [x] CSS file exists: `card.css`
- [x] Base class: `.card`
- [x] Elevation variants: elevated, filled, outlined
- [x] Parts: header, body, footer, title, subtitle
- [ ] Actions: `.card-actions`
- [ ] Media: `.card-image`, `.card-media`

#### Chip (.chip) - TODO
- [ ] CSS file exists: `chip.css`
- [ ] Base class: `.chip`
- [ ] Color variants: primary, secondary, tertiary
- [ ] Style variants: filled, outlined
- [ ] Parts: icon, label, close
- [ ] States: selected, disabled

#### List (.list) - TODO
- [ ] CSS file exists: `list.css`
- [ ] Base class: `.list`
- [ ] Variants: bordered, hoverable
- [ ] Parts: `.list-item`, `.list-item-icon`, `.list-item-content`, `.list-item-action`
- [ ] Dividers: `.list-divider`

#### Table (.table) - TODO
- [ ] CSS file exists: `table.css`
- [ ] Base class: `.table`
- [ ] Variants: zebra, compact, hover
- [ ] Parts: header, body, footer, row, cell
- [ ] Responsive: `.table-responsive`

### Data Entry (12 components)

#### Autocomplete (.autocomplete) - TODO
- [ ] CSS file exists: `autocomplete.css`
- [ ] Base class: `.autocomplete`
- [ ] Parts: input, dropdown, option, highlight
- [ ] States: open, loading, empty

#### Checkbox (.checkbox) - TODO
- [ ] CSS file exists: `checkbox.css`
- [ ] Base class: `.checkbox`
- [ ] Color variants: primary, secondary, tertiary
- [ ] Size variants: sm, lg
- [ ] States: checked, indeterminate, disabled
- [ ] Label: `.checkbox-label`

#### Datepicker (.datepicker) - TODO
- [ ] CSS file exists: `datepicker.css`
- [ ] Base class: `.datepicker`
- [ ] Parts: header, calendar, day, month, year
- [ ] States: selected, today, disabled, range

#### File Upload (.file-upload) - TODO
- [ ] CSS file exists: `file-upload.css`
- [ ] Base class: `.file-upload`
- [ ] Variants: dropzone, button
- [ ] Parts: preview, progress, filename
- [ ] States: dragover, uploading, success, error

#### Input (.input) - EXISTS
- [x] CSS file exists: `input.css`
- [x] Base class: `.input`
- [x] Style variants: outlined, filled
- [x] Size variants: sm, lg
- [x] States: error, success, disabled
- [x] Group: `.input-group`, prepend, append
- [ ] Floating label: `.input-floating`

#### Radio (.radio) - TODO
- [ ] CSS file exists: `radio.css`
- [ ] Base class: `.radio`
- [ ] Color variants: primary, secondary, tertiary
- [ ] Size variants: sm, lg
- [ ] States: checked, disabled
- [ ] Group: `.radio-group`

#### Rating (.rating) - TODO
- [ ] CSS file exists: `rating.css`
- [ ] Base class: `.rating`
- [ ] Size variants: sm, lg
- [ ] Variants: half-star enabled
- [ ] States: readonly, disabled
- [ ] Parts: `.rating-star`

#### Select (.select) - TODO
- [ ] CSS file exists: `select.css`
- [ ] Base class: `.select`
- [ ] Style variants: outlined, filled
- [ ] Size variants: sm, lg
- [ ] States: open, disabled, error
- [ ] Parts: option, optgroup

#### Slider (.slider) - TODO
- [ ] CSS file exists: `slider.css`
- [ ] Base class: `.slider`
- [ ] Color variants: primary, secondary
- [ ] Variants: range (dual thumb)
- [ ] Parts: track, thumb, marks, tooltip
- [ ] States: disabled

#### Switch (.switch) - TODO
- [ ] CSS file exists: `switch.css`
- [ ] Base class: `.switch`
- [ ] Color variants: primary, secondary, tertiary
- [ ] Size variants: sm, lg
- [ ] States: checked, disabled
- [ ] With label: `.switch-label`

#### Textarea (.textarea) - TODO
- [ ] CSS file exists: `textarea.css`
- [ ] Base class: `.textarea`
- [ ] Style variants: outlined, filled
- [ ] Size variants: sm, lg
- [ ] States: error, disabled
- [ ] Auto-resize support

#### Toggle (.toggle) - TODO
- [ ] CSS file exists: `toggle.css`
- [ ] Base class: `.toggle`
- [ ] Color variants: primary, secondary
- [ ] Size variants: sm, lg
- [ ] States: checked, disabled

### Feedback (7 components)

#### Alert (.alert) - TODO
- [ ] CSS file exists: `alert.css`
- [ ] Base class: `.alert`
- [ ] Type variants: info, success, warning, error
- [ ] Style variants: filled, outlined
- [ ] Parts: icon, title, description, close
- [ ] Dismissible: `.alert-dismissible`

#### Dialog (.dialog) - TODO
- [ ] CSS file exists: `dialog.css`
- [ ] Base class: `.dialog`
- [ ] Size variants: sm, lg, fullscreen
- [ ] Parts: backdrop, header, body, footer, close
- [ ] Animation: slide-up, fade

#### Progress (.progress) - TODO
- [ ] CSS file exists: `progress.css`
- [ ] Base class: `.progress`
- [ ] Types: linear, circular
- [ ] Variants: determinate, indeterminate
- [ ] Color variants: primary, secondary
- [ ] Parts: bar, track, label

#### Skeleton (.skeleton) - TODO
- [ ] CSS file exists: `skeleton.css`
- [ ] Base class: `.skeleton`
- [ ] Variants: text, circle, rect
- [ ] Animation: pulse, wave
- [ ] Parts: `.skeleton-line`, `.skeleton-avatar`

#### Snackbar (.snackbar) - TODO
- [ ] CSS file exists: `snackbar.css`
- [ ] Base class: `.snackbar`
- [ ] Position: top, bottom, left, right
- [ ] Parts: message, action
- [ ] Animation: slide-in

#### Toast (.toast) - TODO
- [ ] CSS file exists: `toast.css`
- [ ] Base class: `.toast`
- [ ] Type variants: info, success, warning, error
- [ ] Position: top-right, top-left, bottom-right, bottom-left
- [ ] Parts: icon, message, close
- [ ] Container: `.toast-container`

#### Tooltip (.tooltip) - TODO
- [ ] CSS file exists: `tooltip.css`
- [ ] Base class: `.tooltip`
- [ ] Position: top, right, bottom, left
- [ ] Variants: dark, light
- [ ] Parts: content, arrow

### Layout (2 components)

#### Appbar (.appbar) - TODO
- [ ] CSS file exists: `appbar.css`
- [ ] Base class: `.appbar`
- [ ] Variants: fixed, sticky
- [ ] Parts: start, center, end, title
- [ ] Elevation: with shadow

#### Divider (.divider) - TODO
- [ ] CSS file exists: `divider.css`
- [ ] Base class: `.divider`
- [ ] Variants: horizontal, vertical
- [ ] Style: solid, dashed, dotted
- [ ] With text: `.divider-text`

### Navigation (8 components)

#### Bottom Navigation (.bottom-nav) - TODO
- [ ] CSS file exists: `bottom-navigation.css`
- [ ] Base class: `.bottom-nav`
- [ ] Parts: item, icon, label
- [ ] States: active, disabled
- [ ] Variants: shifting, fixed

#### Breadcrumbs (.breadcrumbs) - TODO
- [ ] CSS file exists: `breadcrumbs.css`
- [ ] Base class: `.breadcrumbs`
- [ ] Parts: item, separator
- [ ] States: current (aria-current)
- [ ] Icon support

#### Drawer (.drawer) - TODO
- [ ] CSS file exists: `drawer.css`
- [ ] Base class: `.drawer`
- [ ] Position: left, right
- [ ] Variants: permanent, temporary, mini
- [ ] Parts: header, content, footer
- [ ] Overlay: `.drawer-overlay`

#### Menu (.menu) - TODO
- [ ] CSS file exists: `menu.css`
- [ ] Base class: `.menu`
- [ ] Variants: vertical, horizontal
- [ ] Parts: item, icon, label, divider, submenu
- [ ] States: active, disabled, open
- [ ] Dropdown: `.menu-dropdown`

#### Navbar (.navbar) - TODO
- [ ] CSS file exists: `navbar.css`
- [ ] Base class: `.navbar`
- [ ] Parts: brand, nav, start, center, end
- [ ] Variants: transparent, solid
- [ ] Mobile: `.navbar-toggle`, `.navbar-collapse`

#### Pagination (.pagination) - TODO
- [ ] CSS file exists: `pagination.css`
- [ ] Base class: `.pagination`
- [ ] Parts: item, prev, next, ellipsis
- [ ] States: active, disabled
- [ ] Variants: bordered, rounded
- [ ] Size variants: sm, lg

#### Stepper (.stepper) - TODO
- [ ] CSS file exists: `stepper.css`
- [ ] Base class: `.stepper`
- [ ] Variants: horizontal, vertical
- [ ] Parts: step, connector, icon, label, content
- [ ] States: active, completed, error

#### Tabs (.tabs) - TODO
- [ ] CSS file exists: `tabs.css`
- [ ] Base class: `.tabs`
- [ ] Variants: bordered, lifted, boxed
- [ ] Parts: tab, tab-content
- [ ] States: active, disabled
- [ ] Indicator: animated underline

### Surfaces (5 components)

#### Accordion (.accordion) - TODO
- [ ] CSS file exists: `accordion.css`
- [ ] Base class: `.accordion`
- [ ] Variants: bordered, flush
- [ ] Parts: item, header, content, icon
- [ ] States: open, disabled
- [ ] Animation: expand/collapse

#### Bottomsheet (.bottomsheet) - TODO
- [ ] CSS file exists: `bottomsheet.css`
- [ ] Base class: `.bottomsheet`
- [ ] Variants: modal, persistent
- [ ] Parts: handle, header, content
- [ ] States: open, dragging
- [ ] Snap points support

#### Collapse (.collapse) - TODO
- [ ] CSS file exists: `collapse.css`
- [ ] Base class: `.collapse`
- [ ] Parts: trigger, content
- [ ] States: open
- [ ] Animation: height transition
- [ ] Group: `.collapse-group` (exclusive)

#### Modal (.modal) - EXISTS
- [x] CSS file exists: `modal.css`
- [x] Base class: `.modal`
- [x] Parts: backdrop, box, header, body, footer
- [x] Size variants: sm, lg, fullscreen
- [x] States: open
- [ ] Animation: fade, scale

#### Popover (.popover) - TODO
- [ ] CSS file exists: `popover.css`
- [ ] Base class: `.popover`
- [ ] Position: top, right, bottom, left
- [ ] Parts: content, arrow, header, body
- [ ] Trigger: hover, click
- [ ] States: open

### Misc (1 component)

#### Timeline (.timeline) - TODO
- [ ] CSS file exists: `timeline.css`
- [ ] Base class: `.timeline`
- [ ] Variants: vertical, horizontal
- [ ] Parts: item, marker, connector, content
- [ ] Position: left, right, alternate

## Summary

| Category | Total | Exists | TODO |
|----------|-------|--------|------|
| Actions | 1 | 1 | 0 |
| Data Display | 6 | 1 | 5 |
| Data Entry | 12 | 2 | 10 |
| Feedback | 7 | 0 | 7 |
| Layout | 2 | 0 | 2 |
| Navigation | 8 | 1 | 7 |
| Surfaces | 5 | 1 | 4 |
| Misc | 1 | 0 | 1 |
| **Total** | **42** | **6** | **36** |

**Existing CSS files**:
- `button.css` - Complete
- `card.css` - Complete
- `input.css` - Complete
- `modal.css` - Complete
- `form.css` - Form utilities (not a component)
- `navigation.css` - Base navigation styles (partial)

## Additional Requirements

### README Updates
- [ ] Remove "Component styles" from roadmap TODO
- [ ] Add component list to features section
- [ ] Update Quick Start with component examples
- [ ] Add links to documentation

### Documentation Sync
- [ ] Verify all 42 MDX component pages use correct class names
- [ ] Update ComponentShowcase examples if needed
- [ ] Test all examples render correctly
