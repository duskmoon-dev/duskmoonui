# Component Showcase System

This directory contains reusable components for creating interactive component showcases.

## Components

### CodeBlock.astro

Displays formatted code with syntax highlighting and copy functionality.

**Props:**
- `code` (string, required): The code to display
- `language` (string, optional): Syntax highlighting language (default: 'html')
- `title` (string, optional): Optional title for the code block

**Features:**
- Copy to clipboard button
- Language indicator
- Syntax-aware formatting
- Responsive design

**Usage:**
```astro
import CodeBlock from './CodeBlock.astro';

<CodeBlock code={`<button class="btn">Click me</button>`} language="html" />
```

### ComponentShowcase.astro

Displays a component with live preview and code example.

**Props:**
- `title` (string, required): Showcase title
- `description` (string, optional): Description of the showcase
- `code` (string, required): HTML code to render and display
- `showCode` (boolean, optional): Whether to show the code (default: true)

**Features:**
- Live component preview
- Automatic code display
- Collapsible code sections
- Responsive layout

**Usage:**
```astro
import ComponentShowcase from './ComponentShowcase.astro';

<ComponentShowcase
  title="Primary Button"
  description="Main action button for important actions"
  code={`<button class="btn btn-primary">Click Me</button>`}
/>
```

## Creating New Showcase Pages

To create a showcase page for a new component:

1. Create a new file in `/src/pages/components/{component-name}.astro`
2. Import the layout and showcase components:
   ```astro
   ---
   import DocsLayout from '../../layouts/DocsLayout.astro';
   import ComponentShowcase from '../../components/showcase/ComponentShowcase.astro';
   ---
   ```

3. Use the `DocsLayout` wrapper with appropriate title and description
4. Organize showcases by sections using `<section class="showcase-section">`
5. Each showcase should demonstrate a specific variant or feature

## Example Structure

```astro
---
import DocsLayout from '../../layouts/DocsLayout.astro';
import ComponentShowcase from '../../components/showcase/ComponentShowcase.astro';
---

<DocsLayout title="Component Name" description="Component description">
  <div class="showcase-page">
    <header class="page-header">
      <h1>Component Name</h1>
      <p class="page-description">Overview and description</p>
    </header>

    <section class="showcase-section">
      <h2>Section Title</h2>
      <ComponentShowcase
        title="Variant Name"
        description="Variant description"
        code={`<div class="component">Example</div>`}
      />
    </section>

    <div class="docs-link">
      <a href="/docs/en/components/{name}/" class="btn btn-outlined">
        View Full Documentation →
      </a>
    </div>
  </div>
</DocsLayout>
```

## Existing Showcase Pages

- ✅ `button.astro` - Complete showcase with all button variants
- ✅ `card.astro` - Card elevation levels, variants, and structure
- ⏳ `input.astro` - To be created (follow button.astro pattern)
- ⏳ `badge.astro` - To be created (follow button.astro pattern)
- ⏳ `alert.astro` - To be created (follow button.astro pattern)

## Best Practices

1. **Group Related Variants**: Organize showcases by category (e.g., "Basic Variants", "Sizes", "States")
2. **Provide Context**: Include descriptions that explain when to use each variant
3. **Show Real Examples**: Use realistic content and icon combinations
4. **Link to Docs**: Always include a link to the full documentation page
5. **Keep Code Simple**: Show the minimum code needed for each example
6. **Responsive Design**: Ensure examples work well on mobile devices

## Styling

All showcase pages use consistent styling defined in the `<style>` section:

- `.showcase-page`: Main container with max-width and padding
- `.page-header`: Centered header with title and description
- `.showcase-section`: Section container with heading
- `.docs-link`: Footer with documentation link

These classes ensure visual consistency across all showcase pages.
