# DuskMoonUI Components Documentation

> Complete reference for all 32 Material Design 3-inspired components

## Table of Contents

### Original Components (5)
- [Button](#button)
- [Card](#card)
- [Input](#input)
- [Badge](#badge)
- [Alert](#alert)

### Phase 1 Components (13)

**Navigation**
- [Navbar](#navbar)
- [Tabs](#tabs)
- [Drawer](#drawer)

**Layout**
- [Divider](#divider)
- [App Bar](#app-bar)

**Feedback**
- [Tooltip](#tooltip)
- [Snackbar](#snackbar)
- [Dialog](#dialog)
- [Progress](#progress)

**Data Display**
- [Table](#table)
- [List](#list)

**Forms**
- [Switch](#switch)

**Overlay**
- [Menu](#menu)

### Phase 2 Components (14)

**Navigation**
- [Breadcrumbs](#breadcrumbs)
- [Bottom Navigation](#bottom-navigation)
- [Pagination](#pagination)
- [Stepper](#stepper)

**Feedback**
- [Skeleton](#skeleton)

**Data Display**
- [Chip](#chip)
- [Avatar](#avatar)

**Forms**
- [Slider](#slider)
- [Autocomplete](#autocomplete)
- [Date Picker](#date-picker)
- [File Upload](#file-upload)

**Interactive**
- [Accordion](#accordion)

**Overlay**
- [Popover](#popover)
- [Bottom Sheet](#bottom-sheet)

---

## Phase 1 Components

### Navbar

Primary application navigation bar with responsive mobile support.

**Variants:**
- `navbar-surface`, `navbar-surface-container`, `navbar-surface-container-high`
- `navbar-primary`, `navbar-secondary`, `navbar-tertiary`
- `navbar-transparent`, `navbar-blur`

**Positioning:**
- `navbar-fixed`, `navbar-sticky`, `navbar-static`

**Sizes:**
- `navbar-compact`, `navbar-comfortable`

**Example:**
```html
<nav class="navbar navbar-surface-container-high navbar-fixed">
  <div class="navbar-start">
    <a href="/" class="navbar-brand">DuskMoon</a>
  </div>
  <div class="navbar-center">
    <a href="#" class="navbar-item navbar-item-active">Home</a>
    <a href="#" class="navbar-item">About</a>
    <a href="#" class="navbar-item">Contact</a>
  </div>
  <div class="navbar-end">
    <button class="navbar-hamburger">☰</button>
  </div>
</nav>
```

---

### Tabs

Organize content into separate views with horizontal or vertical tabs.

**Variants:**
- Default (underline), `tabs-pill`, `tabs-tonal`, `tabs-boxed`
- `tabs-vertical`, `tabs-scrollable`
- `tabs-full` (full width)

**Sizes:**
- `tabs-sm`, `tabs-md`, `tabs-lg`

**Example:**
```html
<div class="tabs">
  <button class="tab tab-active">Dashboard</button>
  <button class="tab">Profile</button>
  <button class="tab">Settings</button>
</div>

<div class="tab-panel" data-active="true">
  Dashboard content...
</div>
```

---

### Drawer

Collapsible side panel for navigation or additional content.

**Variants:**
- `drawer-left` (default), `drawer-right`
- `drawer-permanent`, `drawer-rail`
- `drawer-surface`, `drawer-surface-container-low`

**Sizes:**
- `drawer-sm`, `drawer-md`, `drawer-lg`, `drawer-xl`

**Example:**
```html
<div class="drawer-backdrop drawer-backdrop-show"></div>

<div class="drawer drawer-left drawer-open">
  <div class="drawer-header">
    <h3 class="drawer-title">Navigation</h3>
    <button class="drawer-close">×</button>
  </div>
  <div class="drawer-body">
    <button class="drawer-item drawer-item-active">
      <span class="drawer-item-icon">🏠</span>
      Home
    </button>
    <button class="drawer-item">
      <span class="drawer-item-icon">⚙️</span>
      Settings
    </button>
  </div>
</div>
```

---

### Divider

Visual separation between content sections.

**Variants:**
- `divider-solid`, `divider-dashed`, `divider-dotted`
- `divider-vertical`
- `divider-primary`, `divider-secondary`, `divider-tertiary`
- `divider-gradient-primary`

**Thickness:**
- `divider-thin`, `divider-medium`, `divider-thick`

**Example:**
```html
<div class="divider"></div>
<div class="divider divider-dashed"></div>

<div class="divider-text">
  OR
</div>
```

---

### App Bar

Contextual action bars for screens (top or bottom).

**Variants:**
- `appbar-top` (default), `appbar-bottom`
- `appbar-fixed`, `appbar-sticky`, `appbar-static`
- `appbar-surface`, `appbar-primary`, `appbar-transparent`

**Sizes:**
- `appbar-compact`, `appbar-comfortable`

**Example:**
```html
<div class="appbar appbar-surface-container-high appbar-fixed">
  <div class="appbar-leading">
    <button class="appbar-back">←</button>
  </div>
  <div class="appbar-title">
    <h1 class="appbar-heading">Page Title</h1>
    <p class="appbar-subtitle">Subtitle</p>
  </div>
  <div class="appbar-trailing">
    <button class="appbar-action">🔍</button>
    <button class="appbar-action">⋮</button>
  </div>
</div>
```

---

### Tooltip

Contextual information on hover or focus.

**Positioning:**
- `tooltip-top`, `tooltip-bottom`, `tooltip-left`, `tooltip-right`
- `tooltip-no-arrow`

**Sizes:**
- `tooltip-sm`, `tooltip-lg`, `tooltip-rich`

**Example:**
```html
<button>
  Hover me
  <span class="tooltip tooltip-top tooltip-show">
    This is a tooltip
    <span class="tooltip-arrow"></span>
  </span>
</button>
```

---

### Snackbar

Brief messages about app processes (toasts).

**Positioning:**
- `snackbar-bottom`, `snackbar-top`
- `snackbar-bottom-left`, `snackbar-bottom-right`
- `snackbar-top-left`, `snackbar-top-right`

**Variants:**
- `snackbar-success`, `snackbar-error`, `snackbar-warning`, `snackbar-info`
- `snackbar-primary`, `snackbar-secondary`, `snackbar-tertiary`

**Example:**
```html
<div class="snackbar snackbar-bottom snackbar-show">
  <span class="snackbar-message">File saved successfully</span>
  <button class="snackbar-action">Undo</button>
  <button class="snackbar-close">×</button>
</div>
```

---

### Dialog

Modal dialogs requiring user interaction.

**Sizes:**
- `dialog-sm`, `dialog-md`, `dialog-lg`, `dialog-xl`, `dialog-full`, `dialog-fullscreen`

**Variants:**
- `dialog-alert`, `dialog-center`

**Example:**
```html
<div class="dialog-backdrop dialog-backdrop-show">
  <div class="dialog dialog-md">
    <div class="dialog-header">
      <h2 class="dialog-title">Confirm Action</h2>
      <button class="dialog-close">×</button>
    </div>
    <div class="dialog-body">
      Are you sure you want to proceed?
    </div>
    <div class="dialog-actions">
      <button class="btn btn-text">Cancel</button>
      <button class="btn btn-filled">Confirm</button>
    </div>
  </div>
</div>
```

---

### Progress

Linear and circular progress indicators.

**Linear:**
- Default (determinate), `progress-indeterminate`
- `progress-primary`, `progress-secondary`, `progress-tertiary`
- `progress-success`, `progress-error`, `progress-warning`

**Sizes:**
- `progress-sm`, `progress-md`, `progress-lg`, `progress-xl`

**Circular:**
- `progress-circular`, `progress-circular-indeterminate`
- `progress-circular-sm`, `progress-circular-md`, `progress-circular-lg`

**Example:**
```html
<!-- Linear -->
<div class="progress progress-primary">
  <div class="progress-bar" style="width: 60%"></div>
</div>

<!-- Circular -->
<div class="progress-circular">
  <svg class="progress-circular-svg" viewBox="0 0 48 48">
    <circle class="progress-circular-track" cx="24" cy="24" r="20"></circle>
    <circle class="progress-circular-bar" cx="24" cy="24" r="20" 
            stroke-dasharray="125.6" stroke-dashoffset="50"></circle>
  </svg>
  <span class="progress-circular-label">60%</span>
</div>
```

---

### Table

Data tables with sorting, selection, and pagination support.

**Variants:**
- `table-hover`, `table-striped`, `table-bordered`
- `table-compact`, `table-comfortable`
- `table-sticky` (sticky header)

**Example:**
```html
<table class="table table-hover table-striped">
  <thead>
    <tr>
      <th class="table-sort">Name</th>
      <th>Email</th>
      <th class="table-numeric">Age</th>
      <th class="table-actions">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td class="table-numeric">28</td>
      <td class="table-actions">
        <button class="btn btn-sm btn-text">Edit</button>
      </td>
    </tr>
  </tbody>
</table>
```

---

### List

Vertical collection of items with icons, avatars, and nested support.

**Variants:**
- `list-surface`, `list-surface-container`
- `list-bordered`, `list-nested`
- `list-compact`, `list-comfortable`

**Item types:**
- `list-item`, `list-item-two-line`, `list-item-three-line`
- `list-item-interactive`, `list-item-active`

**Example:**
```html
<ul class="list">
  <li class="list-item list-item-interactive list-item-active">
    <div class="list-item-leading">🏠</div>
    <div class="list-item-content">
      <span class="list-item-text">Home</span>
      <span class="list-item-secondary">Main dashboard</span>
    </div>
    <div class="list-item-trailing">›</div>
  </li>
  <hr class="list-divider">
  <li class="list-item list-item-interactive">
    <div class="list-item-leading">⚙️</div>
    <div class="list-item-content">
      <span class="list-item-text">Settings</span>
    </div>
  </li>
</ul>
```

---

### Switch

Toggle switches for binary on/off control.

**Variants:**
- `switch-primary`, `switch-secondary`, `switch-tertiary`

**Sizes:**
- `switch-sm`, `switch-lg`

**Example:**
```html
<label class="switch">
  <input type="checkbox" class="switch-input">
  <span class="switch-track switch-primary">
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-label">Enable notifications</span>
</label>
```

---

### Menu

Dropdown menus with icons, dividers, and keyboard navigation.

**Positioning:**
- `menu-top`, `menu-bottom`, `menu-left`, `menu-right`

**Variants:**
- `menu-compact`, `menu-wide`, `menu-dense`
- `menu-context` (right-click menu)

**Example:**
```html
<div class="menu menu-show">
  <button class="menu-item">
    <span class="menu-item-icon">📄</span>
    New File
    <span class="menu-item-trailing">⌘N</span>
  </button>
  <button class="menu-item menu-item-active">
    <span class="menu-item-icon">📁</span>
    Open
  </button>
  <hr class="menu-divider">
  <button class="menu-item menu-item-disabled">
    <span class="menu-item-icon">💾</span>
    Save
  </button>
</div>
```

---

## Phase 2 Components

### Breadcrumbs

Navigation hierarchy showing current location.

**Separators:**
- `breadcrumbs-slash`, `breadcrumbs-chevron`, `breadcrumbs-dot`, `breadcrumbs-arrow`

**Variants:**
- `breadcrumbs-primary`, `breadcrumbs-secondary`, `breadcrumbs-tertiary`
- `breadcrumbs-contained`

**Sizes:**
- `breadcrumbs-sm`, `breadcrumbs-lg`

**Example:**
```html
<nav class="breadcrumbs breadcrumbs-chevron">
  <a href="#" class="breadcrumb-link">Home</a>
  <span class="breadcrumb-separator"></span>
  <a href="#" class="breadcrumb-link">Products</a>
  <span class="breadcrumb-separator"></span>
  <span class="breadcrumb-item breadcrumb-item-active">Details</span>
</nav>
```

---

### Bottom Navigation

Mobile-first navigation bar at screen bottom.

**Variants:**
- `bottom-nav-shift` (label only on active)
- `bottom-nav-labels-only`
- `bottom-nav-surface`, `bottom-nav-transparent`

**Example:**
```html
<nav class="bottom-nav">
  <button class="bottom-nav-item bottom-nav-item-active">
    <span class="bottom-nav-icon">🏠</span>
    <span class="bottom-nav-label">Home</span>
  </button>
  <button class="bottom-nav-item">
    <span class="bottom-nav-icon">🔍</span>
    <span class="bottom-nav-label">Search</span>
    <span class="bottom-nav-badge">3</span>
  </button>
  <button class="bottom-nav-item">
    <span class="bottom-nav-icon">👤</span>
    <span class="bottom-nav-label">Profile</span>
  </button>
</nav>
```

---

### Pagination

Page navigation with numbered buttons.

**Variants:**
- `pagination-outlined`, `pagination-tonal`
- `pagination-primary`, `pagination-secondary`, `pagination-tertiary`
- `pagination-compact`

**Sizes:**
- `pagination-sm`, `pagination-lg`

**Example:**
```html
<nav class="pagination">
  <button class="pagination-prev">Previous</button>
  <button class="pagination-item">1</button>
  <button class="pagination-item pagination-item-active">2</button>
  <button class="pagination-item">3</button>
  <span class="pagination-ellipsis"></span>
  <button class="pagination-item">10</button>
  <button class="pagination-next">Next</button>
</nav>
```

---

### Stepper

Multi-step process guide (horizontal or vertical).

**Variants:**
- `stepper-vertical`, `stepper-alt-labels`
- `stepper-primary`, `stepper-secondary`, `stepper-tertiary`

**States:**
- `stepper-step-active`, `stepper-step-completed`, `stepper-step-error`

**Example:**
```html
<div class="stepper">
  <div class="stepper-step stepper-step-completed">
    <button class="stepper-step-button">
      <div class="stepper-step-icon">✓</div>
      <div class="stepper-step-label">Step 1</div>
    </button>
    <div class="stepper-step-connector"></div>
  </div>
  <div class="stepper-step stepper-step-active">
    <button class="stepper-step-button">
      <div class="stepper-step-icon">2</div>
      <div class="stepper-step-label">Step 2</div>
    </button>
    <div class="stepper-step-connector"></div>
  </div>
  <div class="stepper-step">
    <button class="stepper-step-button">
      <div class="stepper-step-icon">3</div>
      <div class="stepper-step-label">Step 3</div>
    </button>
  </div>
</div>
```

---

### Skeleton

Loading placeholders with animations.

**Variants:**
- `skeleton-wave` (wave animation)
- `skeleton-static` (no animation)

**Shapes:**
- `skeleton-text`, `skeleton-circle`, `skeleton-rect`, `skeleton-button`

**Sizes:**
- `skeleton-sm`, `skeleton-lg`
- `skeleton-circle-sm`, `skeleton-circle-lg`

**Example:**
```html
<div class="skeleton-group">
  <div class="skeleton skeleton-circle"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text skeleton-w-3/4"></div>
  <div class="skeleton skeleton-rect"></div>
</div>
```

---

### Chip

Compact elements for tags, filters, and selections.

**Types:**
- Input chips (removable)
- Filter chips (selectable)
- Suggestion/Assist chips

**Variants:**
- `chip-filled`, `chip-outlined`
- `chip-primary`, `chip-secondary`, `chip-tertiary`
- `chip-success`, `chip-error`

**Sizes:**
- `chip-sm`, `chip-lg`

**Example:**
```html
<div class="chip-group">
  <div class="chip chip-primary chip-selected">
    <span class="chip-icon">⭐</span>
    Featured
  </div>
  <div class="chip chip-removable">
    React
    <button class="chip-remove">×</button>
  </div>
  <div class="chip chip-outlined">
    TypeScript
  </div>
</div>
```

---

### Avatar

User representations with status indicators and groups.

**Shapes:**
- `avatar-circle` (default), `avatar-rounded`, `avatar-square`

**Sizes:**
- `avatar-xs`, `avatar-sm`, `avatar-md`, `avatar-lg`, `avatar-xl`, `avatar-2xl`

**Status:**
- `avatar-status-online`, `avatar-status-offline`, `avatar-status-busy`, `avatar-status-away`

**Variants:**
- `avatar-primary`, `avatar-secondary`, `avatar-tertiary`

**Example:**
```html
<!-- Single avatar -->
<div class="avatar avatar-lg avatar-status avatar-status-online">
  <img src="user.jpg" alt="User" class="avatar-image">
</div>

<!-- Avatar group -->
<div class="avatar-group">
  <div class="avatar"><img src="user1.jpg" class="avatar-image"></div>
  <div class="avatar"><img src="user2.jpg" class="avatar-image"></div>
  <div class="avatar"><img src="user3.jpg" class="avatar-image"></div>
  <div class="avatar avatar-overflow">+5</div>
</div>
```

---

### Slider

Range selection with discrete or continuous modes.

**Variants:**
- `slider-primary`, `slider-secondary`, `slider-tertiary`
- `slider-vertical`
- `slider-range` (two thumbs)

**Labels:**
- `slider-labels-always`

**Sizes:**
- `slider-sm`, `slider-lg`

**Example:**
```html
<div class="slider">
  <div class="slider-track">
    <div class="slider-track-filled" style="width: 60%"></div>
  </div>
  <div class="slider-thumb" style="left: 60%">
    <span class="slider-thumb-label">60</span>
  </div>
</div>

<div class="slider-labels">
  <span>0</span>
  <span>100</span>
</div>
```

---

### Autocomplete

Search input with dynamic suggestions and multi-select.

**Features:**
- Async loading support
- Multi-select with chips
- Grouped options
- Custom option rendering

**Variants:**
- `autocomplete-outlined`

**Example:**
```html
<div class="autocomplete">
  <div class="autocomplete-input-wrapper">
    <input type="text" class="autocomplete-input" placeholder="Search...">
    <button class="autocomplete-toggle">▼</button>
  </div>
  
  <div class="autocomplete-dropdown autocomplete-dropdown-open">
    <ul class="autocomplete-options">
      <li class="autocomplete-option autocomplete-option-selected">
        <span class="autocomplete-option-icon">🌟</span>
        Option 1
      </li>
      <li class="autocomplete-option">Option 2</li>
      <li class="autocomplete-option">Option 3</li>
    </ul>
  </div>
</div>
```

---

### Date Picker

Calendar date selection with range support.

**Variants:**
- `datepicker-inline` (always visible)
- `datepicker-secondary`, `datepicker-tertiary`

**Features:**
- Month/year selection
- Range selection
- Disabled dates
- Min/max constraints

**Example:**
```html
<div class="datepicker">
  <input type="text" class="datepicker-input" placeholder="Select date">
  <span class="datepicker-icon">📅</span>
  
  <div class="datepicker-dropdown datepicker-dropdown-open">
    <div class="datepicker-header">
      <button class="datepicker-nav">‹</button>
      <div class="datepicker-title">January 2025</div>
      <button class="datepicker-nav">›</button>
    </div>
    
    <div class="datepicker-calendar">
      <div class="datepicker-weekday">Sun</div>
      <div class="datepicker-weekday">Mon</div>
      <!-- ... -->
      <button class="datepicker-day datepicker-day-today">15</button>
      <button class="datepicker-day datepicker-day-selected">20</button>
      <!-- ... -->
    </div>
  </div>
</div>
```

---

### File Upload

Drag-and-drop file uploads with previews and validation.

**Variants:**
- `file-upload-compact`
- `file-upload-outlined`

**States:**
- `file-upload-dropzone-dragover`
- `file-upload-item-success`, `file-upload-item-error`

**Example:**
```html
<div class="file-upload">
  <div class="file-upload-dropzone">
    <span class="file-upload-icon">📁</span>
    <div class="file-upload-text">Drag files here or click to browse</div>
    <div class="file-upload-hint">Maximum file size: 10MB</div>
    <input type="file" class="file-upload-input" multiple>
  </div>
  
  <div class="file-upload-list">
    <div class="file-upload-item">
      <span class="file-upload-item-icon">📄</span>
      <div class="file-upload-item-info">
        <div class="file-upload-item-name">document.pdf</div>
        <div class="file-upload-item-size">2.4 MB</div>
      </div>
      <button class="file-upload-item-remove">×</button>
    </div>
  </div>
</div>
```

---

### Accordion

Expandable content panels.

**Variants:**
- `accordion-filled`, `accordion-outlined`, `accordion-separated`
- `accordion-primary`, `accordion-secondary`, `accordion-tertiary`
- `accordion-compact`, `accordion-comfortable`

**Example:**
```html
<div class="accordion">
  <div class="accordion-item accordion-item-open">
    <button class="accordion-header">
      <h3 class="accordion-title">Section 1</h3>
      <span class="accordion-icon">▼</span>
    </button>
    <div class="accordion-content">
      <div class="accordion-body">
        Content for section 1...
      </div>
    </div>
  </div>
  
  <div class="accordion-item">
    <button class="accordion-header">
      <h3 class="accordion-title">Section 2</h3>
      <span class="accordion-icon">▼</span>
    </button>
    <div class="accordion-content">
      <div class="accordion-body">
        Content for section 2...
      </div>
    </div>
  </div>
</div>
```

---

### Popover

Contextual overlay positioned relative to trigger element.

**Positioning:**
- `popover-top`, `popover-bottom`, `popover-left`, `popover-right`
- `popover-no-arrow`

**Sizes:**
- `popover-sm`, `popover-lg`

**Variants:**
- `popover-primary`, `popover-secondary`, `popover-tertiary`

**Example:**
```html
<button>
  Click me
  <div class="popover popover-bottom popover-show">
    <div class="popover-arrow"></div>
    <div class="popover-header">
      <h4 class="popover-title">Title</h4>
      <button class="popover-close">×</button>
    </div>
    <div class="popover-body">
      Popover content goes here...
    </div>
    <div class="popover-footer">
      <button class="btn btn-sm btn-text">Cancel</button>
      <button class="btn btn-sm btn-filled">OK</button>
    </div>
  </div>
</button>
```

---

### Bottom Sheet

Mobile-first bottom panel with drag handle.

**Heights:**
- `bottom-sheet-sm`, `bottom-sheet-md`, `bottom-sheet-lg`, `bottom-sheet-full`

**Variants:**
- `bottom-sheet-persistent`, `bottom-sheet-modal`
- `bottom-sheet-no-handle`

**Example:**
```html
<div class="bottom-sheet-backdrop bottom-sheet-backdrop-show"></div>

<div class="bottom-sheet bottom-sheet-show">
  <div class="bottom-sheet-handle"></div>
  
  <div class="bottom-sheet-header">
    <h2 class="bottom-sheet-title">Sheet Title</h2>
    <button class="bottom-sheet-close">×</button>
  </div>
  
  <div class="bottom-sheet-body">
    Content goes here...
  </div>
  
  <div class="bottom-sheet-footer">
    <button class="btn btn-text">Cancel</button>
    <button class="btn btn-filled">Confirm</button>
  </div>
</div>
```

---

## Color System Integration

All components support the DuskMoonUI color system:

- **Primary**: `primary`, `primary-focus`, `primary-content`, `primary-container`, `on-primary-container`
- **Secondary**: `secondary`, `secondary-focus`, `secondary-content`, `secondary-container`, `on-secondary-container`
- **Tertiary**: `tertiary`, `tertiary-focus`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`
- **Surface**: `surface`, `surface-dim`, `surface-bright`, `surface-container-{lowest|low|default|high|highest}`
- **Semantic**: `success`, `error`, `warning`, `info` (with `-content` variants)

## Responsive Design

Most components are mobile-first and include responsive utilities:
- Use `hidden lg:block` for desktop-only elements
- Use `block lg:hidden` for mobile-only elements
- Components like Bottom Navigation are optimized for mobile
- Tables include responsive wrappers with horizontal scroll

## Accessibility

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - See LICENSE file for details
