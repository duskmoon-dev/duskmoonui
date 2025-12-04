# Data Model: Documentation Component Showcase Enhancement

**Date**: 2025-12-01
**Feature**: 001-docs-component-showcase

## Overview

This feature does not introduce new data entities. It modifies existing documentation files (MDX) to use a different component pattern.

## Entities

### ComponentShowcase (Existing)

**Location**: `packages/docs/src/components/showcase/ComponentShowcase.astro`

**Props Interface**:
```typescript
interface Props {
  title: string;                    // Required - heading for the example
  description?: string;             // Optional - subtitle/explanation
  code: string;                     // Required - HTML code to render
  showCode?: boolean;               // Default: true
  defaultTab?: 'preview' | 'code';  // Default: 'preview'
}
```

**State**: Stateless component (tab state managed via vanilla JS in browser)

### MDX Documentation Files (Existing)

**Location**: `packages/docs/src/content/docs/en/components/*.mdx`

**Frontmatter Schema**:
```typescript
interface ComponentDocFrontmatter {
  title: string;           // Component name
  description: string;     // SEO description
  category: string;        // 'components'
  order: number;           // Sort order in navigation
  published: boolean;      // Whether to include in build
  tags: string[];         // Search tags
}
```

## Relationships

```
MDX File
    └── imports ComponentShowcase
    └── contains multiple <ComponentShowcase> instances
    └── contains static code blocks (for React/Vue examples)

ComponentShowcase
    └── uses CodeBlock (child component)
    └── renders HTML preview from `code` prop
```

## Data Transformations

### Before (Static Code Block)
```mdx
## Basic Usage

\`\`\`html
<div class="card">
  <div class="card-body">Content</div>
</div>
\`\`\`
```

### After (ComponentShowcase)
```mdx
import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';

## Basic Usage

<ComponentShowcase
  title="Basic Card"
  code={`<div class="card">
  <div class="card-body">Content</div>
</div>`}
/>
```

## No Database/API Changes

This feature modifies only:
- Static MDX files (content)
- Potentially CSS for centering fix

No runtime data storage, no API endpoints, no state persistence beyond tab preference (browser memory only).
