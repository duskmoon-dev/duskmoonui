# Chat Component Design

**Date:** 2026-04-20
**Status:** Design approved, awaiting implementation plan
**Target package:** `@duskmoon-dev/core`

## Summary

Add a `chat` component to DuskMoonUI: a CSS-only primitive for conversational UIs, tailored for LLM chat with first-class support for reasoning traces, tool calls, and live/streaming states. Inspired by daisyUI's chat component but adapted to DuskMoon's naming, color system, and composition model.

## Motivation

LLM chat UIs are a common use case for component libraries. daisyUI's chat covers the basics (avatar + bubble + header/footer) but lacks primitives for LLM-specific content: reasoning/thinking traces, tool calls with call/result payloads, and live states (typing, streaming, tool running). Consumers currently reinvent these repeatedly. A CSS-only implementation in core makes them available to every DuskMoon consumer (React, Phoenix, vanilla HTML, web components) without a framework tax.

## Non-Goals

- Emoji reactions, message editing, auto-formatted timestamps — consumer-space concerns.
- Virtualization / performance for very long transcripts — a CSS library cannot address this.
- JS behavior beyond what native `<details>` provides for collapse/expand.
- A web-component wrapper in `duskmoon-elements` — separate repository, can be added later.
- French/Spanish translations of the docs page — follow-up PR.

## Class API

Naming follows DuskMoon's `{component}` + `{component}-{modifier}` convention. The `chat-image` name from daisyUI is renamed to `chat-avatar` to compose cleanly with DuskMoon's existing `.avatar` component.

### Structural classes

| Class | Role |
|---|---|
| `.chat` | Row wrapper. Flex layout: avatar column + stack column. |
| `.chat-start` | Aligns row to the left (typical: assistant). Required placement modifier. |
| `.chat-end` | Aligns row to the right (typical: user). Reverses the grid. Required placement modifier. |
| `.chat-avatar` | Slot container for an avatar. Composes with existing `.avatar` (no duplication). |
| `.chat-header` | Muted small text above the stack — name, timestamp. |
| `.chat-footer` | Muted small text below the stack — delivery status, edited marker. |
| `.chat-bubble` | The message bubble. Renders a directional tail via CSS mask. |

### Bubble color variants (minimum 7, per project constitution)

`.chat-bubble-primary`, `.chat-bubble-secondary`, `.chat-bubble-tertiary`, `.chat-bubble-info`, `.chat-bubble-success`, `.chat-bubble-warning`, `.chat-bubble-error`.

Default (no variant): `background: var(--color-surface-container)`, `color: var(--color-on-surface)`.

Color variants use **container tones** by default (e.g., `--color-primary-container` / `--color-on-primary-container`) — soft look matching the `.alert` pattern. The `.chat-bubble-filled` modifier swaps to the saturated base token (`--color-primary` / `--color-primary-content`), also matching `.alert-filled`.

**No ghost variant** — `.chat-bubble` has no default border, so the ghost rule (which only applies to components with a visible default border) does not apply.

### Bubble sizes

| Size class | Padding | Font-size | Intended use |
|---|---|---|---|
| `.chat-bubble-xs` | `0.375rem 0.625rem` | `0.75rem` | Compact transcripts, history views |
| `.chat-bubble-sm` | `0.5rem 0.75rem` | `0.8125rem` | Dense chat UI |
| `.chat-bubble-md` (explicit alias of the base defaults, matches the `.avatar-md` pattern) | `0.625rem 0.875rem` | `0.875rem` | Standard |
| `.chat-bubble-lg` | `0.875rem 1.125rem` | `1rem` | Conversational, accessibility-friendly |

### LLM-specific classes

| Class | Role |
|---|---|
| `.chat-reasoning` | Collapsible thinking/reasoning trace. Uses native `<details>`/`<summary>`. Muted background, italic body copy. |
| `.chat-tool` | Collapsible tool-call block. `<details>` wrapper. |
| `.chat-tool-header` | Inner `<summary>` content — tool name + status pill. |
| `.chat-tool-call` | Slot for the call payload. Plain container, composes with `.code-block`. |
| `.chat-tool-result` | Slot for the result payload. Plain container, composes with `.code-block`. |
| `.chat-tool-pending` | Status modifier on `.chat-tool` — outline/neutral pill. |
| `.chat-tool-running` | Status modifier — info-colored pill + spinner (see Animations). |
| `.chat-tool-success` | Status modifier — success-colored pill. |
| `.chat-tool-error` | Status modifier — error-colored pill. |

Appearance of `.chat-reasoning` and `.chat-tool`: `background: var(--color-surface-container-low)`, `border: 1px solid var(--color-outline)`, `border-radius: var(--radius-sm)`. These are layout/container components per the constitution — `--color-outline` border is appropriate, not the `currentColor` form-element pattern.

### Live/streaming states

| Class | Role | Placement |
|---|---|---|
| `.chat-typing` | Three animated dots ("assistant is thinking, nothing yet"). | Inside an otherwise empty `.chat-bubble`. |
| `.chat-bubble-streaming` | Adds a blinking caret after bubble content. | Modifier on `.chat-bubble` during token streaming. |
| `.chat-tool-running` | Adds a rotating spinner on the tool header. | Already defined above as a status modifier. |

## Structural layout

One assistant turn groups reasoning, tool calls, and the final message(s) under **one avatar / one `.chat` row**. The stack column contains all blocks vertically:

```html
<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar">…</div></div>
  <div class="chat-header">Claude · 2:15 PM</div>

  <details class="chat-reasoning" open>
    <summary>Thinking (3s)</summary>
    <div>…reasoning trace…</div>
  </details>

  <details class="chat-tool chat-tool-success" open>
    <summary class="chat-tool-header">get_weather</summary>
    <div class="chat-tool-call"><pre class="code-block">…</pre></div>
    <div class="chat-tool-result"><pre class="code-block">…</pre></div>
  </details>

  <div class="chat-bubble">It's 18°C and cloudy in Tokyo right now.</div>

  <div class="chat-footer">Sent</div>
</div>
```

This is the approved structural decision: one row per turn, not one row per block. Simpler visual hierarchy, single attribution.

## Visual design

- **Bubble tail:** daisyUI-style tail rendered via CSS mask (`mask: radial-gradient(…)`) on a pseudo-element. Tail sits at the bottom-start corner of `chat-start` bubbles and bottom-end corner of `chat-end` bubbles. Colors inherit from the bubble background.
- **Border radius:** `1rem` on bubbles, `var(--radius-sm)` on reasoning/tool containers.
- **Max width:** bubbles capped at `min(80ch, 100%)`; `overflow-wrap: anywhere` prevents long URLs/tokens from breaking layout.
- **Focus ring** on interactive children (e.g., open/close summary): project's standard `0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`.

## Animations

All three pure CSS, all respect `@media (prefers-reduced-motion: reduce)`.

- **Typing dots (`.chat-typing`)**: three dots with staggered `translateY` + `opacity` keyframes, ~1.4s loop. Reduced motion: static dots.
- **Streaming caret (`.chat-bubble-streaming::after`)**: 1px × 1em bar, `currentColor`, blink at 1s `step-end`. Reduced motion: caret pinned visible.
- **Tool-running spinner**: 0.875rem circle with rotating `border-top-color`. Reduced motion: pulsing dot instead.

## Composition with existing components

- **Avatar**: `.chat-avatar` is a slot; drop any `.avatar` (all existing sizes, rings, placeholders) inside. No duplicated styles.
- **Code**: `.chat-tool-call` and `.chat-tool-result` are plain containers. Users wrap payloads with `<pre class="code-block">` for syntax styling. If `.code-block` isn't used, content falls back to a monospace font with no styling dependency.
- **Markdown**: `.chat-bubble` wraps a `.markdown-body` block cleanly. Bubble handles outer padding; markdown-body handles internal typography. No rule collisions.

## Accessibility

- Native `<details>`/`<summary>` provides keyboard and screen-reader handling for reasoning/tool blocks with no JS.
- Tool status pills include visible text (`Pending`, `Running…`, `Done`, `Failed`) alongside color — color is never the sole signal.
- `.chat-typing` should be announced; the MDX page documents the ARIA pattern (`aria-label="Assistant is typing"` on the parent bubble or `aria-live` on the row stack). Cannot be added via CSS.
- All interactive children get a visible focus ring matching project convention.

## File layout

```
packages/core/src/components/
  chat.css            # new — all component CSS in one file
  chat.ts             # generated by build; ESM wrapper around chat.css
  index.css           # modified — add @import "./chat.css"
  index.ts            # modified — re-export from chat.ts
```

The build script (`scripts/build-css.ts`) needs no changes: its existing loop discovers new `.css` files automatically and generates the ESM wrapper.

## Testing

### Unit (Vitest, `packages/core/tests/unit/chat.test.ts`)

Following the pattern of existing unit tests (read source CSS, assert structure):

- Every class in the API table is defined.
- All rules wrapped in `@layer components { }`.
- Each of the 7 color variants has both a default (`-container`) declaration and a `-filled` override.
- `.chat-tool-{pending,running,success,error}` each reference a matching color token.
- Tail rendering: `.chat-start .chat-bubble::before` and `.chat-end .chat-bubble::before` both use `mask: radial-gradient(…)`.
- 4 size classes each declare `padding` and `font-size`.
- One `@media (prefers-reduced-motion: reduce)` block overrides all three animations.
- No redefinition of `.avatar`, `.code-block`, or `.markdown-body` selectors (composition constraint).

### Visual regression (Playwright)

Single story page exercising: user+assistant bubble pair, all 7 color variants, filled vs. container default, 4 size variants, typing indicator, streaming caret, reasoning block (open + closed), tool block in each of 4 statuses. One snapshot per theme (5 themes).

### Accessibility (axe-core, existing infra)

Run axe on the story page to confirm no new violations.

## Docs updates (constitution-required)

Per `CLAUDE.md`, a new component requires three docs registrations:

1. **MDX page**: `packages/docs/src/content/docs/en/components/chat.mdx` — overview, class reference table, live previews via `ComponentShowcase.astro`. Include a dedicated "LLM chat" section demonstrating reasoning + tool + streaming.
2. **Sidebar nav**: `packages/docs/src/components/navigation/Sidebar.astro` — add `chat` entry alphabetically (between `card` and `checkbox`).
3. **Components index**: `packages/docs/src/pages/components/index.astro` — add `chat` card.

Demo element IDs in the MDX file use the `demo-` prefix to avoid collision with auto-generated heading IDs (per project constitution).

## Versioning

Minor bump (new component, no breaking changes). `packages/core/package.json` version must be bumped before the GitHub release, per project memory.

## Open questions

None. All structural, visual, and scope decisions resolved in brainstorming.
