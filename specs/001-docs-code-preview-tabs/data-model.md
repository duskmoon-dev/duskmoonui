# Data Model: Tabbed Code Block with Preview

**Feature**: 001-docs-code-preview-tabs
**Date**: 2025-11-26

## Overview

This feature is a UI component enhancement with no persistent data storage. The "data model" consists of component props and runtime state.

## Component Props

### ComponentShowcase Props

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Title displayed in the showcase header |
| `description` | `string` | No | `undefined` | Optional description below title |
| `code` | `string` | Yes | - | HTML code to preview and display |
| `showCode` | `boolean` | No | `true` | Whether to show the Code tab |
| `defaultTab` | `'preview' \| 'code'` | No | `'preview'` | Which tab is active by default |

### TypeScript Interface

```typescript
interface ComponentShowcaseProps {
  title: string;
  description?: string;
  code: string;
  showCode?: boolean;
  defaultTab?: 'preview' | 'code';
}
```

## Runtime State

### Tab State (per showcase instance)

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `activeTab` | `'preview' \| 'code'` | `'preview'` | Currently active tab |

### Global State (page-level)

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `preferredTab` | `'preview' \| 'code'` | `'preview'` | User's last selected tab preference |

## DOM Structure

```
ComponentShowcase
├── showcase-header
│   ├── showcase-title
│   └── showcase-description?
├── tabs (role="tablist")
│   ├── tab[preview] (role="tab")
│   └── tab[code] (role="tab")
├── tabpanel[preview] (role="tabpanel")
│   └── rendered HTML content
└── tabpanel[code] (role="tabpanel")
    └── CodeBlock component
```

## State Transitions

```
User Action          | Tab State Change
---------------------|------------------
Click Preview tab    | activeTab → 'preview'
Click Code tab       | activeTab → 'code'
Press ArrowLeft      | activeTab → previous tab (wraps)
Press ArrowRight     | activeTab → next tab (wraps)
Press Home           | activeTab → 'preview'
Press End            | activeTab → 'code'
```

## No Persistent Storage

- Tab preference persists only within page session
- No localStorage, sessionStorage, or cookies used
- Preference resets on page refresh (per spec)
