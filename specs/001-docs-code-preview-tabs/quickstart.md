# Quickstart: Tabbed ComponentShowcase

## Usage in MDX Files

The `ComponentShowcase` component now supports a tabbed interface. The API remains backward compatible - existing MDX files will continue to work without changes.

### Basic Usage

```mdx
import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';

<ComponentShowcase
  title="Basic Button"
  code={`<button class="btn btn-primary">Click me</button>`}
/>
```

This renders a showcase with:
- "Preview" tab (default, active)
- "Code" tab with syntax highlighting
- Copy button in code view

### With Description

```mdx
<ComponentShowcase
  title="Outlined Button"
  description="Use outlined buttons for secondary actions"
  code={`<button class="btn btn-outlined">Outlined</button>`}
/>
```

### Code-Only (No Preview Tab)

```mdx
<ComponentShowcase
  title="Configuration Example"
  code={`@import "tailwindcss";
@import "@duskmoon-dev/core";`}
  showCode={true}
  defaultTab="code"
/>
```

### Multi-line Code Examples

```mdx
<ComponentShowcase
  title="Button Group"
  code={`<div class="flex gap-2">
  <button class="btn btn-text">Cancel</button>
  <button class="btn btn-outlined">Save Draft</button>
  <button class="btn btn-primary">Publish</button>
</div>`}
/>
```

## Tab Behavior

1. **Default View**: "Preview" tab is active when the page loads
2. **Switching**: Click tabs to switch between Preview and Code views
3. **Preference**: When you switch to "Code" on one showcase, subsequent showcases on the same page will also show "Code" by default
4. **Reset**: Refreshing the page resets all showcases to "Preview"

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus between tabs and content |
| `Arrow Left/Right` | Switch between tabs when focused on tab list |
| `Enter` / `Space` | Activate focused tab |
| `Home` | Go to first tab (Preview) |
| `End` | Go to last tab (Code) |

## Accessibility

The tabbed interface follows WAI-ARIA tabs pattern:
- Screen readers announce "Preview tab, 1 of 2" or "Code tab, 2 of 2"
- Tab panels are associated with their controlling tabs
- Focus management follows accessibility best practices

## Progressive Enhancement

If JavaScript is disabled:
- Both Preview and Code are displayed stacked vertically
- All content remains accessible
- Copy functionality is unavailable (requires JS)
