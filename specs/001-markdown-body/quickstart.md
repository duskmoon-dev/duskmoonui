# Quickstart: Markdown Body Component

## Installation

The markdown-body component is included in `@duskmoon-dev/core`. No additional installation required.

## Basic Usage

Wrap any rendered markdown content with the `.markdown-body` class:

```html
<article class="markdown-body">
  <h1>Hello World</h1>
  <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
  <pre><code>console.log('Hello!');</code></pre>
</article>
```

## Import Options

### Full Library (Recommended)

```css
@import "@duskmoon-dev/core";
```

### Individual Component

```css
@import "@duskmoon-dev/core/components/markdown-body";
```

## With a Markdown Parser

### Using marked.js

```javascript
import { marked } from 'marked';

const markdown = `
# Title
Some **bold** text and \`inline code\`.
`;

document.querySelector('.markdown-body').innerHTML = marked(markdown);
```

### Using remark (React)

```jsx
import ReactMarkdown from 'react-markdown';

function MarkdownPage({ content }) {
  return (
    <article className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
```

### Using Astro

```astro
---
import { Content } from './my-post.md';
---

<article class="markdown-body">
  <Content />
</article>
```

## Container Sizing

For optimal readability, constrain the container width:

```css
.markdown-body {
  max-width: 980px;
  margin-inline: auto;
  padding-inline: 1rem;
}

@media (max-width: 767px) {
  .markdown-body {
    padding-inline: 1rem;
  }
}
```

## Theme Support

The component automatically adapts to DuskMoonUI themes:

```html
<!-- Light theme -->
<html data-theme="sunshine">
  <article class="markdown-body">...</article>
</html>

<!-- Dark theme -->
<html data-theme="moonlight">
  <article class="markdown-body">...</article>
</html>
```

## Styled Elements

The component styles these markdown elements:

| Element | CSS Selector |
|---------|-------------|
| Headings | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| Paragraphs | `p` |
| Links | `a` |
| Bold/Italic | `strong`, `em`, `b`, `i` |
| Strikethrough | `del`, `s` |
| Inline Code | `code` |
| Code Blocks | `pre`, `pre > code` |
| Keyboard Input | `kbd` |
| Lists | `ul`, `ol`, `li` |
| Definition Lists | `dl`, `dt`, `dd` |
| Task Lists | `.task-list-item` |
| Tables | `table`, `th`, `td` |
| Blockquotes | `blockquote` |
| Horizontal Rules | `hr` |
| Images | `img` |
| Figures | `figure`, `figcaption` |
| Abbreviations | `abbr` |
| Highlights | `mark` |
| Details/Summary | `details`, `summary` |

## Example: Full Document

```html
<article class="markdown-body">
  <h1>Project README</h1>

  <p>Welcome to the project. Here's what you need to know:</p>

  <h2>Installation</h2>

  <pre><code>npm install my-package</code></pre>

  <h2>Features</h2>

  <ul>
    <li>Feature one</li>
    <li>Feature two</li>
    <li>Feature three</li>
  </ul>

  <h2>API Reference</h2>

  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>init()</code></td>
        <td>Initialize the library</td>
      </tr>
      <tr>
        <td><code>destroy()</code></td>
        <td>Clean up resources</td>
      </tr>
    </tbody>
  </table>

  <blockquote>
    <p><strong>Note:</strong> This is important information.</p>
  </blockquote>
</article>
```

## Next Steps

- See the full [Component Documentation](/duskmoonui/docs/en/components/markdown-body/)
- Learn about [Theme Customization](/duskmoonui/docs/en/theming/customization/)
- Explore [Individual Component Imports](/duskmoonui/docs/en/getting-started/individual-imports/)
