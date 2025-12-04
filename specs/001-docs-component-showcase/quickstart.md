# Migration Guide: Converting to ComponentShowcase

**Date**: 2025-12-01
**Feature**: 001-docs-component-showcase

## Overview

This guide explains how to convert static markdown code blocks to interactive `ComponentShowcase` components in component documentation files.

## Prerequisites

- Working development environment with `bun` installed
- Repository cloned with dependencies installed (`bun install`)
- Familiarity with MDX syntax

## Step-by-Step Migration

### Step 1: Add Import Statement

At the top of the MDX file (after frontmatter), add the import:

```mdx
---
title: Card
description: Material Design 3 card component
# ... rest of frontmatter
---

import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';

# Card
```

**Note**: Import path is relative from `packages/docs/src/content/docs/en/components/`.

### Step 2: Identify Convertible Code Blocks

Convert code blocks that:
- ✅ Are `html` language
- ✅ Show UI component usage
- ✅ Can render without JavaScript

Do NOT convert:
- ❌ React/Vue/JSX code blocks
- ❌ Configuration files
- ❌ CLI commands
- ❌ TypeScript interface definitions

### Step 3: Convert Code Block to ComponentShowcase

**Before**:
```mdx
## Basic Usage

\`\`\`html
<div class="card">
  <div class="card-body">
    <p>Basic card content</p>
  </div>
</div>
\`\`\`
```

**After**:
```mdx
## Basic Usage

<ComponentShowcase
  title="Basic Card"
  code={`<div class="card">
  <div class="card-body">
    <p>Basic card content</p>
  </div>
</div>`}
/>
```

### Step 4: Handle Special Cases

#### Multiple Examples in Sequence

Keep each as separate ComponentShowcase:

```mdx
<ComponentShowcase
  title="Filled Card"
  code={`<div class="card card-filled">Content</div>`}
/>

<ComponentShowcase
  title="Outlined Card"
  code={`<div class="card card-outlined">Content</div>`}
/>
```

#### Code with Quotes

Quotes work fine inside template literals:

```mdx
<ComponentShowcase
  title="Button with Aria"
  code={`<button class="btn" aria-label="Close dialog">X</button>`}
/>
```

#### Code with Template Literals

If your code contains `${}`, escape the dollar sign:

```mdx
<ComponentShowcase
  title="Dynamic Example"
  code={`<span>\${variableName}</span>`}
/>
```

#### Multi-line Code

Preserve indentation inside template literal:

```mdx
<ComponentShowcase
  title="Complex Card"
  code={`<div class="card card-default">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">
    <p>Content goes here</p>
  </div>
  <div class="card-actions">
    <button class="btn btn-primary">Action</button>
  </div>
</div>`}
/>
```

### Step 5: Preserve Framework Examples

Keep React/Vue examples as static code blocks with markdown:

```mdx
## React Example

\`\`\`tsx
import { Card } from '@duskmoon-dev/react';

export function MyCard() {
  return (
    <Card elevation="high">
      <CardBody>Content</CardBody>
    </Card>
  );
}
\`\`\`
```

### Step 6: Verify Changes

1. Run the docs dev server:
   ```bash
   cd packages/docs
   bun run dev
   ```

2. Navigate to the component page and verify:
   - Preview tab shows rendered component
   - Code tab shows syntax-highlighted HTML
   - Tab switching works
   - No console errors

3. Build to catch any errors:
   ```bash
   bun run build
   ```

## Common Issues

### Import Path Wrong
**Error**: Cannot resolve import
**Fix**: Verify relative path from MDX file to ComponentShowcase

### Template Literal Not Closed
**Error**: Unexpected token
**Fix**: Ensure backticks are balanced and properly escaped

### Content Not Rendering
**Symptom**: Preview shows raw HTML
**Fix**: Check that `code` prop uses template literal, not string quotes

## Reference

See `packages/docs/src/content/docs/en/components/button.mdx` for a complete example of proper ComponentShowcase usage.
