# @duskmoon-dev/core Components

> Material Design 3-inspired component library with 32 components organized by category

## Component Categories

### 🔘 Actions
Components for user interactions and triggering operations.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Button](#button) | Clickable buttons for actions | Filled, Outlined, Text, Tonal variants |
| [File Upload](#file-upload) | Drag-and-drop file uploader | Multiple files, previews, progress |

**Total: 2 components**

---

### 📊 Data Display
Components for displaying data and content.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Avatar](#avatar) | User profile pictures | Circle, rounded, square shapes |
| [Badge](#badge) | Small status indicators | Dot, numeric, text badges |
| [Card](#card) | Content container with elevation | Multiple elevation levels |
| [Chip](#chip) | Compact elements for tags | Input, filter, assist, suggestion |
| [List](#list) | Vertical list of items | Single/two/three line items |
| [Table](#table) | Data tables | Sortable, selectable, striped |

**Total: 6 components**

---

### 📝 Data Entry
Components for user input and forms.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Autocomplete](#autocomplete) | Search with suggestions | Multi-select, grouped options |
| [Date Picker](#date-picker) | Calendar date selection | Range support, month/year picker |
| [Input](#input) | Text input fields | Outlined, filled, underlined |
| [Slider](#slider) | Range value selector | Single/range, vertical, marks |
| [Switch](#switch) | Toggle on/off control | Material Design 3 styling |

**Total: 5 components**

---

### 💬 Feedback
Components for feedback, loading states, and user notifications.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Alert](#alert) | Important messages | Success, error, warning, info |
| [Dialog](#dialog) | Modal dialogs | Multiple sizes, actions |
| [Progress](#progress) | Loading indicators | Linear, circular, determinate |
| [Skeleton](#skeleton) | Loading placeholders | Pulse, wave animations |
| [Snackbar](#snackbar) | Toast notifications | Multiple positions, actions |
| [Tooltip](#tooltip) | Contextual information | Four directions, arrows |

**Total: 6 components**

---

### 🎨 Layout
Components for page structure and organization.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Divider](#divider) | Visual separators | Solid, dashed, dotted, gradient |
| [App Bar](#app-bar) | Top/bottom action bars | Leading, title, trailing sections |

**Total: 2 components**

---

### 🧭 Navigation
Components for moving through the application.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Bottom Navigation](#bottom-navigation) | Mobile bottom nav bar | Badge support, shift mode |
| [Breadcrumbs](#breadcrumbs) | Hierarchical navigation | Multiple separator styles |
| [Drawer](#drawer) | Side navigation panel | Left/right, permanent, rail |
| [Menu](#menu) | Dropdown menus | Icons, shortcuts, selections |
| [Navbar](#navbar) | Primary navigation bar | Transparent, blur, fixed |
| [Pagination](#pagination) | Page navigation | Outlined, tonal variants |
| [Stepper](#stepper) | Multi-step process guide | Horizontal/vertical layouts |
| [Tabs](#tabs) | Tab navigation | Pill, tonal, boxed styles |

**Total: 8 components**

---

### 📦 Surfaces
Components for overlays and interactive containers.

| Component | Description | Key Features |
|-----------|-------------|--------------|
| [Accordion](#accordion) | Expandable panels | Filled, outlined, separated |
| [Bottom Sheet](#bottom-sheet) | Mobile bottom panels | Drag handle, snap points |
| [Popover](#popover) | Contextual overlays | Arrow positioning |

**Total: 3 components**

---

## Quick Reference

### By Use Case

**Building a Form?**
- Input, Autocomplete, Date Picker, Slider, Switch, Button, File Upload

**Creating Navigation?**
- Navbar, Drawer, Tabs, Menu, Breadcrumbs, Bottom Navigation, Pagination

**Showing Data?**
- Table, List, Card, Chip, Avatar, Badge

**User Feedback?**
- Alert, Dialog, Snackbar, Tooltip, Progress, Skeleton

**Layout Structure?**
- App Bar, Divider, Card, Accordion

**Interactive Overlays?**
- Dialog, Menu, Popover, Bottom Sheet, Drawer

---

## Component Summary

| Category | Components | Count |
|----------|-----------|-------|
| 🔘 Actions | Button, File Upload | 2 |
| 📊 Data Display | Avatar, Badge, Card, Chip, List, Table | 6 |
| 📝 Data Entry | Autocomplete, Date Picker, Input, Slider, Switch | 5 |
| 💬 Feedback | Alert, Dialog, Progress, Skeleton, Snackbar, Tooltip | 6 |
| 🎨 Layout | App Bar, Divider | 2 |
| 🧭 Navigation | Bottom Nav, Breadcrumbs, Drawer, Menu, Navbar, Pagination, Stepper, Tabs | 8 |
| 📦 Surfaces | Accordion, Bottom Sheet, Popover | 3 |
| **Total** | | **32** |

---

## Installation

```bash
bun add @duskmoon-dev/core
```

## Usage

### Tailwind CSS 4.0+

```css
@import "tailwindcss";
@plugin "@duskmoon-dev/core";
```

### Tailwind CSS 3.x

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@duskmoon-dev/core')({
      themes: ['sunshine', 'moonlight'],
      darkTheme: 'moonlight',
    }),
  ],
}
```

---

## Design Principles

### Material Design 3
All components follow Material Design 3 guidelines with:
- **Surface Elevation**: Five levels of elevation
- **Color System**: Extended palette with tertiary colors
- **State Layers**: Interactive states (hover, focus, active)
- **Typography**: Material Design type scale

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

### Responsive
- Mobile-first approach
- Touch-friendly targets (44px minimum)
- Flexible layouts
- Breakpoint utilities

### Customizable
- CSS variables for theming
- Tailwind utility classes
- Component variants
- Size modifiers

---

## Theme Support

### Built-in Themes

**Sunshine Theme (Light)**
- Bright, energetic color palette
- High contrast for readability
- Warm tones

**Moonlight Theme (Dark)**
- Easy on the eyes
- Reduced blue light
- Cool tones

### Theme Switching

```html
<html data-theme="sunshine">
  <!-- Your app -->
</html>
```

```javascript
// Toggle theme
document.documentElement.setAttribute('data-theme', 'moonlight');
```

---

## Color System

### Extended Palette
Unlike standard Material Design, @duskmoon-dev/core includes tertiary colors:

- **Primary**: Main brand color
- **Secondary**: Complementary color
- **Tertiary**: Additional accent color (unique feature!)
- **Error**: Error states
- **Success**: Success feedback
- **Warning**: Warning messages
- **Info**: Informational content

### Color Variants
Each color includes:
- Base color
- Container color (lighter/darker variant)
- On-color (text color for contrast)
- On-container (text for container)

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

---

## Resources

- [GitHub Repository](https://github.com/duskmoon-dev/duskmoonui)
- [Full Documentation](https://duskmoon-dev.github.io/duskmoonui/)
- [Component Examples](#)
- [Theming Guide](#)

---

## License

MIT License - see LICENSE file for details
