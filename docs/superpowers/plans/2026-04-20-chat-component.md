# Chat Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a CSS-only `chat` component in `@duskmoon-dev/core` tailored for LLM chat UIs, including reasoning traces, tool calls, and live/streaming states. Register it in English docs per the project constitution.

**Architecture:** Single-file CSS component (`packages/core/src/components/chat.css`) following the existing `alert.css` pattern: `@layer components`, OKLCH tokens, `-container` tones for default color variants and `-filled` modifier for saturated tones. Native `<details>` for collapse on reasoning/tool blocks. All animations pure CSS with `prefers-reduced-motion` fallbacks. Unit tests mirror `alert.test.ts` (read source CSS, assert on class names and property patterns).

**Tech Stack:** CSS (custom properties + `@layer`), Bun test runner, TypeScript for ESM wrapper (auto-generated), Astro MDX for docs.

**Reference spec:** `docs/superpowers/specs/2026-04-20-chat-component-design.md`

---

## File Structure

**Create:**
- `packages/core/src/components/chat.css` — all component CSS
- `packages/core/tests/unit/chat.test.ts` — unit tests against source CSS
- `packages/core/tests/visual/chat.spec.ts` — Playwright visual regression
- `packages/docs/src/content/docs/en/components/chat.mdx` — docs page

**Modify:**
- `packages/core/src/components/index.css` — add `@import "./chat.css"` under **Data Display**
- `packages/docs/src/components/navigation/Sidebar.astro` — add Chat under Data Display
- `packages/docs/src/pages/components/index.astro` — add Chat under Data Display

**Auto-generated at build time (no manual edit):**
- `packages/core/src/components/chat.ts` — ESM wrapper around the CSS (produced by `scripts/build-css.ts`)
- `packages/core/dist/components/chat.css` and `chat.js`

---

## Task 1: Scaffold base row + bubble

**Files:**
- Create: `packages/core/src/components/chat.css`
- Create: `packages/core/tests/unit/chat.test.ts`
- Modify: `packages/core/src/components/index.css`

- [ ] **Step 1: Create empty chat.css**

Create `packages/core/src/components/chat.css` with a minimal shell so the test file can `readFile` without error:

```css
/**
 * Chat Component Styles
 * DuskMoonUI - LLM-oriented chat primitives
 */

@layer components {
  /* Rules added in subsequent tasks */
}
```

- [ ] **Step 2: Write initial unit test covering base structure**

Create `packages/core/tests/unit/chat.test.ts`:

```ts
import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Chat Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/chat.css'),
      'utf-8',
    );
  });

  describe('Base structure', () => {
    it('should include @layer components directive', () => {
      expect(css).toContain('@layer components');
    });

    it('should define .chat wrapper class', () => {
      expect(css).toContain('.chat');
    });

    it('should use grid layout on .chat', () => {
      expect(css).toMatch(/\.chat\s*\{[^}]*display:\s*grid/s);
    });

    it('should define .chat-start placement modifier', () => {
      expect(css).toContain('.chat-start');
    });

    it('should define .chat-end placement modifier', () => {
      expect(css).toContain('.chat-end');
    });

    it('should define .chat-bubble class', () => {
      expect(css).toContain('.chat-bubble');
    });

    it('should set relative positioning on .chat-bubble (for tail)', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*position:\s*relative/s);
    });

    it('should use surface-container background on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*background-color:\s*var\(--color-surface-container\)/s,
      );
    });

    it('should use on-surface text color on default bubble', () => {
      expect(css).toMatch(
        /\.chat-bubble\s*\{[^}]*color:\s*var\(--color-on-surface\)/s,
      );
    });

    it('should cap bubble max-width', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*max-width:\s*min\(80ch/s);
    });

    it('should set overflow-wrap anywhere on bubble', () => {
      expect(css).toMatch(/\.chat-bubble\s*\{[^}]*overflow-wrap:\s*anywhere/s);
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: most tests FAIL (class names not defined yet); the `@layer components` test passes.

- [ ] **Step 4: Implement base structure**

Replace the contents of `packages/core/src/components/chat.css` with:

```css
/**
 * Chat Component Styles
 * DuskMoonUI - LLM-oriented chat primitives
 */

@layer components {
  /* Row wrapper */
  .chat {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.75rem;
    padding: 0.25rem 0;
  }

  .chat-end {
    grid-template-columns: 1fr auto;
  }

  /* Assistant (left) and user (right) row handling.
   * The avatar spans all rows and sits at the bottom.
   * All other children stack in the remaining column. */
  .chat > :not(.chat-avatar) {
    grid-column: 2;
    justify-self: start;
    max-width: 100%;
    margin-bottom: 0.25rem;
  }

  .chat-end > :not(.chat-avatar) {
    grid-column: 1;
    justify-self: end;
  }

  /* Base bubble */
  .chat-bubble {
    position: relative;
    max-width: min(80ch, 100%);
    padding: 0.625rem 0.875rem;
    border-radius: 1rem;
    background-color: var(--color-surface-container);
    color: var(--color-on-surface);
    font-size: 0.875rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all tests PASS.

- [ ] **Step 6: Register chat.css in the components index**

Modify `packages/core/src/components/index.css`. Under the `/* DATA DISPLAY COMPONENTS */` section (currently contains `avatar.css`, `badge.css`, `chip.css`, `list.css`, `table.css`), add a new `@import "./chat.css";` line in alphabetical position (between `badge.css` and `chip.css`):

```css
@import "./avatar.css";
@import "./badge.css";
@import "./chat.css";
@import "./chip.css";
@import "./list.css";
@import "./table.css";
```

- [ ] **Step 7: Run the build to verify CSS bundles and ESM wrapper generate**

Run: `bun run build:core`
Expected: build completes; `packages/core/dist/components/chat.css` and `packages/core/dist/components/chat.js` exist. `dist/index.css` contains `.chat-bubble` somewhere.

Verify: `ls packages/core/dist/components/chat.* && grep -c '.chat-bubble' packages/core/dist/index.css`
Expected: both files listed; grep count ≥ 1.

- [ ] **Step 8: Commit**

```bash
git add packages/core/src/components/chat.css \
        packages/core/src/components/index.css \
        packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): scaffold chat component base structure"
```

---

## Task 2: Color variants (7 container + 7 filled)

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for color variants**

Append to `packages/core/tests/unit/chat.test.ts` inside the top-level `describe('Chat Component', ...)` block (before the closing `});`):

```ts
  describe('Color variants (default = container tones)', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .chat-bubble-${variant}`, () => {
        expect(css).toContain(`.chat-bubble-${variant}`);
      });

      it(`should use ${variant}-container background for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}[^}]*background-color:\\s*var\\(--color-${variant}-container\\)`,
            's',
          ),
        );
      });

      it(`should use on-${variant}-container text for .chat-bubble-${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${variant}[^}]*color:\\s*var\\(--color-on-${variant}-container\\)`,
            's',
          ),
        );
      });
    }
  });

  describe('Filled variants (saturated tones)', () => {
    it('should define .chat-bubble-filled modifier', () => {
      expect(css).toContain('.chat-bubble-filled');
    });

    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'info',
      'success',
      'warning',
      'error',
    ];

    for (const variant of variants) {
      it(`should define .chat-bubble-filled.chat-bubble-${variant} compound selector`, () => {
        expect(css).toContain(
          `.chat-bubble-filled.chat-bubble-${variant}`,
        );
      });

      it(`should use ${variant} background for filled ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-filled\\.chat-bubble-${variant}[^}]*background-color:\\s*var\\(--color-${variant}\\)`,
            's',
          ),
        );
      });

      it(`should use ${variant}-content text for filled ${variant}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-filled\\.chat-bubble-${variant}[^}]*color:\\s*var\\(--color-${variant}-content\\)`,
            's',
          ),
        );
      });
    }
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all new variant tests FAIL.

- [ ] **Step 3: Implement color variants**

Add the following inside the `@layer components { ... }` block in `packages/core/src/components/chat.css`, after the `.chat-bubble` rule:

```css
  /* Default (soft) color variants — container tones */
  .chat-bubble-primary {
    background-color: var(--color-primary-container);
    color: var(--color-on-primary-container);
  }
  .chat-bubble-secondary {
    background-color: var(--color-secondary-container);
    color: var(--color-on-secondary-container);
  }
  .chat-bubble-tertiary {
    background-color: var(--color-tertiary-container);
    color: var(--color-on-tertiary-container);
  }
  .chat-bubble-info {
    background-color: var(--color-info-container);
    color: var(--color-on-info-container);
  }
  .chat-bubble-success {
    background-color: var(--color-success-container);
    color: var(--color-on-success-container);
  }
  .chat-bubble-warning {
    background-color: var(--color-warning-container);
    color: var(--color-on-warning-container);
  }
  .chat-bubble-error {
    background-color: var(--color-error-container);
    color: var(--color-on-error-container);
  }

  /* Filled (saturated) variants */
  .chat-bubble-filled.chat-bubble-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-content);
  }
  .chat-bubble-filled.chat-bubble-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-content);
  }
  .chat-bubble-filled.chat-bubble-tertiary {
    background-color: var(--color-tertiary);
    color: var(--color-tertiary-content);
  }
  .chat-bubble-filled.chat-bubble-info {
    background-color: var(--color-info);
    color: var(--color-info-content);
  }
  .chat-bubble-filled.chat-bubble-success {
    background-color: var(--color-success);
    color: var(--color-success-content);
  }
  .chat-bubble-filled.chat-bubble-warning {
    background-color: var(--color-warning);
    color: var(--color-warning-content);
  }
  .chat-bubble-filled.chat-bubble-error {
    background-color: var(--color-error);
    color: var(--color-error-content);
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add 7 color variants + filled modifier to chat-bubble"
```

---

## Task 3: Size variants

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for sizes**

Append inside the main `describe` block of `chat.test.ts`:

```ts
  describe('Size variants', () => {
    const sizes = [
      { name: 'xs', padding: '0.375rem 0.625rem', fontSize: '0.75rem' },
      { name: 'sm', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' },
      { name: 'md', padding: '0.625rem 0.875rem', fontSize: '0.875rem' },
      { name: 'lg', padding: '0.875rem 1.125rem', fontSize: '1rem' },
    ];

    for (const { name, padding, fontSize } of sizes) {
      it(`should define .chat-bubble-${name}`, () => {
        expect(css).toContain(`.chat-bubble-${name}`);
      });

      it(`should set padding ${padding} on .chat-bubble-${name}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${name}\\s*\\{[^}]*padding:\\s*${padding.replace(/\./g, '\\.')}`,
            's',
          ),
        );
      });

      it(`should set font-size ${fontSize} on .chat-bubble-${name}`, () => {
        expect(css).toMatch(
          new RegExp(
            `\\.chat-bubble-${name}\\s*\\{[^}]*font-size:\\s*${fontSize.replace(/\./g, '\\.')}`,
            's',
          ),
        );
      });
    }
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: size tests FAIL.

- [ ] **Step 3: Implement size variants**

Append inside the `@layer components` block in `chat.css`, after the filled variants:

```css
  /* Size variants */
  .chat-bubble-xs {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
    line-height: 1.35;
  }
  .chat-bubble-sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    line-height: 1.4;
  }
  .chat-bubble-md {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    line-height: 1.45;
  }
  .chat-bubble-lg {
    padding: 0.875rem 1.125rem;
    font-size: 1rem;
    line-height: 1.5;
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add xs/sm/md/lg size variants to chat-bubble"
```

---

## Task 4: Avatar / header / footer slots

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for slots**

Append inside the main `describe` block:

```ts
  describe('Avatar/header/footer slots', () => {
    it('should define .chat-avatar slot', () => {
      expect(css).toContain('.chat-avatar');
    });

    it('should place chat-avatar in column 1 for .chat-start', () => {
      expect(css).toMatch(
        /\.chat\s*>\s*\.chat-avatar\s*\{[^}]*grid-column:\s*1/s,
      );
    });

    it('should span all rows (grid-row: 1 / -1) for chat-avatar', () => {
      expect(css).toMatch(
        /\.chat\s*>\s*\.chat-avatar\s*\{[^}]*grid-row:\s*1\s*\/\s*-1/s,
      );
    });

    it('should align chat-avatar to end (bottom of row)', () => {
      expect(css).toMatch(
        /\.chat\s*>\s*\.chat-avatar\s*\{[^}]*align-self:\s*end/s,
      );
    });

    it('should swap chat-avatar to column 2 for .chat-end', () => {
      expect(css).toMatch(
        /\.chat-end\s*>\s*\.chat-avatar\s*\{[^}]*grid-column:\s*2/s,
      );
    });

    it('should define .chat-header slot', () => {
      expect(css).toContain('.chat-header');
    });

    it('should define .chat-footer slot', () => {
      expect(css).toContain('.chat-footer');
    });

    it('should style chat-header as smaller muted text', () => {
      expect(css).toMatch(/\.chat-header\s*\{[^}]*font-size:\s*0\.75rem/s);
      expect(css).toMatch(
        /\.chat-header\s*\{[^}]*color:\s*var\(--color-on-surface-variant\)/s,
      );
    });

    it('should style chat-footer as smaller muted text', () => {
      expect(css).toMatch(/\.chat-footer\s*\{[^}]*font-size:\s*0\.75rem/s);
      expect(css).toMatch(
        /\.chat-footer\s*\{[^}]*color:\s*var\(--color-on-surface-variant\)/s,
      );
    });

    it('should not redefine the .avatar selector (composition constraint)', () => {
      // Must compose with existing avatar component — never duplicate it.
      expect(css).not.toMatch(/^\s*\.avatar\s*\{/m);
    });
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: slot tests FAIL.

- [ ] **Step 3: Implement avatar / header / footer slots**

Append inside the `@layer components` block, after size variants:

```css
  /* Avatar slot — composes with existing .avatar component.
   * Spans all rows of the chat grid so it sits at the bottom. */
  .chat > .chat-avatar {
    grid-column: 1;
    grid-row: 1 / -1;
    align-self: end;
    flex-shrink: 0;
  }
  .chat-end > .chat-avatar {
    grid-column: 2;
  }

  /* Header / footer — small muted labels above / below the stack */
  .chat-header,
  .chat-footer {
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: var(--color-on-surface-variant);
    opacity: 0.9;
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add chat-avatar, chat-header, chat-footer slots"
```

---

## Task 5: Bubble tail (directional pointer)

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for the tail**

Append inside the main `describe` block:

```ts
  describe('Bubble tail', () => {
    it('should define ::before pseudo-element on .chat-bubble for tail rendering', () => {
      expect(css).toMatch(/\.chat-bubble::before\s*\{/);
    });

    it('should use mask radial-gradient for the tail', () => {
      expect(css).toMatch(/mask:\s*radial-gradient\(/);
    });

    it('should include webkit-mask for broader browser support', () => {
      expect(css).toMatch(/-webkit-mask:\s*radial-gradient\(/);
    });

    it('should render tail on the start side for .chat-start bubbles', () => {
      expect(css).toMatch(/\.chat-start\s+\.chat-bubble::before/);
    });

    it('should render tail on the end side for .chat-end bubbles', () => {
      expect(css).toMatch(/\.chat-end\s+\.chat-bubble::before/);
    });

    it('should round off the bottom corner facing the avatar', () => {
      // chat-start removes bottom-left radius; chat-end removes bottom-right
      expect(css).toMatch(
        /\.chat-start\s+\.chat-bubble\s*\{[^}]*border-bottom-left-radius:\s*0/s,
      );
      expect(css).toMatch(
        /\.chat-end\s+\.chat-bubble\s*\{[^}]*border-bottom-right-radius:\s*0/s,
      );
    });

    it('should inherit the bubble background on the tail', () => {
      expect(css).toMatch(
        /\.chat-bubble::before\s*\{[^}]*background(?:-color)?:\s*inherit/s,
      );
    });
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: tail tests FAIL.

- [ ] **Step 3: Implement the tail**

Append inside the `@layer components` block, after the slots section:

```css
  /* Bubble tail — rendered on ::before, cut into a curve via mask.
   * Color inherits from the bubble background. */
  .chat-bubble::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0.75rem;
    height: 0.75rem;
    background: inherit;
  }

  .chat-start .chat-bubble {
    border-bottom-left-radius: 0;
  }
  .chat-start .chat-bubble::before {
    left: -0.45rem;
    mask: radial-gradient(0.75rem at 0.75rem 0, transparent 98%, black 100%);
    -webkit-mask: radial-gradient(0.75rem at 0.75rem 0, transparent 98%, black 100%);
  }

  .chat-end .chat-bubble {
    border-bottom-right-radius: 0;
  }
  .chat-end .chat-bubble::before {
    right: -0.45rem;
    mask: radial-gradient(0.75rem at 0 0, transparent 98%, black 100%);
    -webkit-mask: radial-gradient(0.75rem at 0 0, transparent 98%, black 100%);
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add directional tail to chat-bubble via CSS mask"
```

---

## Task 6: Reasoning block (collapsible LLM thinking trace)

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for the reasoning block**

Append inside the main `describe` block:

```ts
  describe('Reasoning block', () => {
    it('should define .chat-reasoning class', () => {
      expect(css).toContain('.chat-reasoning');
    });

    it('should use surface-container-low background', () => {
      expect(css).toMatch(
        /\.chat-reasoning\s*\{[^}]*background-color:\s*var\(--color-surface-container-low\)/s,
      );
    });

    it('should have outline border', () => {
      expect(css).toMatch(
        /\.chat-reasoning\s*\{[^}]*border:\s*1px solid var\(--color-outline\)/s,
      );
    });

    it('should use var(--radius-sm) border-radius', () => {
      expect(css).toMatch(
        /\.chat-reasoning\s*\{[^}]*border-radius:\s*var\(--radius-sm\)/s,
      );
    });

    it('should style the summary as clickable header', () => {
      expect(css).toMatch(/\.chat-reasoning\s*>\s*summary\s*\{[^}]*cursor:\s*pointer/s);
    });

    it('should italicize the body copy', () => {
      expect(css).toMatch(
        /\.chat-reasoning\s*>\s*:not\(summary\)\s*\{[^}]*font-style:\s*italic/s,
      );
    });

    it('should hide the default details marker on the summary', () => {
      expect(css).toMatch(
        /\.chat-reasoning\s*>\s*summary::-webkit-details-marker\s*\{[^}]*display:\s*none/s,
      );
    });
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: reasoning tests FAIL.

- [ ] **Step 3: Implement the reasoning block**

Append inside the `@layer components` block, after the tail section:

```css
  /* Reasoning block — collapsible thinking trace.
   * Expects markup: <details class="chat-reasoning"><summary>Thinking</summary>…</details> */
  .chat-reasoning {
    display: block;
    width: 100%;
    max-width: min(80ch, 100%);
    background-color: var(--color-surface-container-low);
    border: 1px solid var(--color-outline);
    border-radius: var(--radius-sm);
    overflow: hidden;
    font-size: 0.8125rem;
    line-height: 1.45;
  }

  .chat-reasoning > summary {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    color: var(--color-on-surface-variant);
    font-weight: 500;
    list-style: none;
    user-select: none;
  }

  .chat-reasoning > summary::-webkit-details-marker,
  .chat-reasoning > summary::marker {
    display: none;
  }

  .chat-reasoning[open] > summary {
    border-bottom: 1px solid var(--color-outline);
  }

  .chat-reasoning > :not(summary) {
    padding: 0.625rem 0.75rem;
    color: var(--color-on-surface-variant);
    font-style: italic;
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add chat-reasoning collapsible block for LLM thinking traces"
```

---

## Task 7: Tool block + status modifiers

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for tool block and statuses**

Append inside the main `describe` block:

```ts
  describe('Tool block', () => {
    it('should define .chat-tool class', () => {
      expect(css).toContain('.chat-tool');
    });

    it('should use surface-container-low background like reasoning', () => {
      expect(css).toMatch(
        /\.chat-tool\s*\{[^}]*background-color:\s*var\(--color-surface-container-low\)/s,
      );
    });

    it('should have outline border like reasoning', () => {
      expect(css).toMatch(
        /\.chat-tool\s*\{[^}]*border:\s*1px solid var\(--color-outline\)/s,
      );
    });

    it('should define .chat-tool-header for summary content', () => {
      expect(css).toContain('.chat-tool-header');
    });

    it('should define .chat-tool-call slot', () => {
      expect(css).toContain('.chat-tool-call');
    });

    it('should define .chat-tool-result slot', () => {
      expect(css).toContain('.chat-tool-result');
    });

    it('should not redefine .code-block (composition constraint)', () => {
      expect(css).not.toMatch(/^\s*\.code-block\s*\{/m);
    });
  });

  describe('Tool status modifiers', () => {
    const statuses = [
      { name: 'pending', token: 'outline' },
      { name: 'running', token: 'info' },
      { name: 'success', token: 'success' },
      { name: 'error', token: 'error' },
    ];

    for (const { name, token } of statuses) {
      it(`should define .chat-tool-${name}`, () => {
        expect(css).toContain(`.chat-tool-${name}`);
      });

      it(`should reference the --color-${token} token for .chat-tool-${name}`, () => {
        // Each status colors the status pill using its matching token family.
        expect(css).toMatch(
          new RegExp(
            `\\.chat-tool-${name}[^}]*var\\(--color-${token}`,
            's',
          ),
        );
      });
    }
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: tool tests FAIL.

- [ ] **Step 3: Implement tool block + statuses**

Append inside the `@layer components` block, after reasoning:

```css
  /* Tool block — collapsible tool call/result.
   * Expects markup:
   *   <details class="chat-tool chat-tool-success">
   *     <summary><span class="chat-tool-header">name · <span class="chat-tool-status">Done</span></span></summary>
   *     <div class="chat-tool-call">…</div>
   *     <div class="chat-tool-result">…</div>
   *   </details>
   */
  .chat-tool {
    display: block;
    width: 100%;
    max-width: min(80ch, 100%);
    background-color: var(--color-surface-container-low);
    border: 1px solid var(--color-outline);
    border-radius: var(--radius-sm);
    overflow: hidden;
    font-size: 0.8125rem;
  }

  .chat-tool > summary {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    list-style: none;
    user-select: none;
  }

  .chat-tool > summary::-webkit-details-marker,
  .chat-tool > summary::marker {
    display: none;
  }

  .chat-tool[open] > summary {
    border-bottom: 1px solid var(--color-outline);
  }

  .chat-tool-header {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-weight: 500;
    color: var(--color-on-surface);
  }

  .chat-tool-call,
  .chat-tool-result {
    padding: 0.5rem 0.75rem;
    color: var(--color-on-surface-variant);
  }

  .chat-tool-call::before {
    content: "Call";
  }
  .chat-tool-result::before {
    content: "Result";
  }
  .chat-tool-call::before,
  .chat-tool-result::before {
    display: block;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-on-surface-variant);
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }

  /* Status pill — place inside the summary content */
  .chat-tool-status {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  /* Status modifiers on .chat-tool — color the border + status pill */
  .chat-tool-pending {
    border-color: var(--color-outline);
  }
  .chat-tool-pending .chat-tool-status {
    background-color: color-mix(in oklch, var(--color-outline) 20%, transparent);
    color: var(--color-on-surface-variant);
  }

  .chat-tool-running {
    border-color: var(--color-info);
  }
  .chat-tool-running .chat-tool-status {
    background-color: var(--color-info-container);
    color: var(--color-on-info-container);
  }

  .chat-tool-success {
    border-color: var(--color-success);
  }
  .chat-tool-success .chat-tool-status {
    background-color: var(--color-success-container);
    color: var(--color-on-success-container);
  }

  .chat-tool-error {
    border-color: var(--color-error);
  }
  .chat-tool-error .chat-tool-status {
    background-color: var(--color-error-container);
    color: var(--color-on-error-container);
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add chat-tool block with 4 status modifiers"
```

---

## Task 8: Animated live states (typing, streaming, tool-running)

**Files:**
- Modify: `packages/core/src/components/chat.css`
- Modify: `packages/core/tests/unit/chat.test.ts`

- [ ] **Step 1: Add failing tests for animations and reduced-motion**

Append inside the main `describe` block:

```ts
  describe('Animated live states', () => {
    it('should define .chat-typing class', () => {
      expect(css).toContain('.chat-typing');
    });

    it('should define a keyframes rule for typing dots', () => {
      expect(css).toMatch(/@keyframes\s+chat-typing-dot/);
    });

    it('should define .chat-bubble-streaming class', () => {
      expect(css).toContain('.chat-bubble-streaming');
    });

    it('should attach a caret via ::after on .chat-bubble-streaming', () => {
      expect(css).toMatch(/\.chat-bubble-streaming::after\s*\{/);
    });

    it('should define a keyframes rule for the blinking caret', () => {
      expect(css).toMatch(/@keyframes\s+chat-caret-blink/);
    });

    it('should define a keyframes rule for the tool-running spinner', () => {
      expect(css).toMatch(/@keyframes\s+chat-tool-spinner/);
    });

    it('should attach a spinner via ::before on .chat-tool-running summary', () => {
      expect(css).toMatch(
        /\.chat-tool-running\s*>\s*summary[^{]*::before/,
      );
    });
  });

  describe('Reduced motion', () => {
    it('should include a prefers-reduced-motion: reduce media query', () => {
      expect(css).toContain('prefers-reduced-motion: reduce');
    });

    it('should disable typing dot animation under reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?\.chat-typing[\s\S]*?animation:\s*none/,
      );
    });

    it('should disable caret blink under reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?\.chat-bubble-streaming::after[\s\S]*?animation:\s*none/,
      );
    });

    it('should disable tool spinner under reduced motion', () => {
      expect(css).toMatch(
        /prefers-reduced-motion:\s*reduce[\s\S]*?\.chat-tool-running[\s\S]*?animation:\s*none/,
      );
    });
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: animation + reduced-motion tests FAIL.

- [ ] **Step 3: Implement animations**

Append inside the `@layer components` block, after tool statuses:

```css
  /* Typing indicator — three animated dots.
   * Place inside an otherwise-empty .chat-bubble. */
  .chat-typing {
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
    min-height: 1em;
  }
  .chat-typing::before,
  .chat-typing::after,
  .chat-typing > span {
    content: "";
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.4;
    animation: chat-typing-dot 1.4s infinite ease-in-out;
  }
  .chat-typing::before { animation-delay: 0s; }
  .chat-typing > span  { animation-delay: 0.2s; }
  .chat-typing::after  { animation-delay: 0.4s; }

  @keyframes chat-typing-dot {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40%           { transform: translateY(-0.25rem); opacity: 1; }
  }

  /* Streaming caret — blinking cursor after bubble content */
  .chat-bubble-streaming::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1em;
    margin-left: 0.125rem;
    vertical-align: text-bottom;
    background-color: currentColor;
    animation: chat-caret-blink 1s step-end infinite;
  }

  @keyframes chat-caret-blink {
    0%, 50%   { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  /* Tool-running spinner — small rotating circle on the summary */
  .chat-tool-running > summary::before {
    content: "";
    display: inline-block;
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.375rem;
    vertical-align: text-bottom;
    border: 2px solid color-mix(in oklch, var(--color-info) 30%, transparent);
    border-top-color: var(--color-info);
    border-radius: 50%;
    animation: chat-tool-spinner 0.8s linear infinite;
  }

  @keyframes chat-tool-spinner {
    to { transform: rotate(360deg); }
  }

  /* Reduced motion — disable all chat animations, preserve visibility */
  @media (prefers-reduced-motion: reduce) {
    .chat-typing::before,
    .chat-typing::after,
    .chat-typing > span {
      animation: none;
      opacity: 0.7;
    }

    .chat-bubble-streaming::after {
      animation: none;
      opacity: 1;
    }

    .chat-tool-running > summary::before {
      animation: none;
      border-top-color: var(--color-info);
    }
  }
```

**Note on markup**: `.chat-typing` expects one `<span></span>` child so the three dots render (two pseudo-elements + one span). Document this in the MDX page.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/core && bun test tests/unit/chat.test.ts`
Expected: all PASS.

- [ ] **Step 5: Run the full core unit suite + typecheck**

Run: `cd packages/core && bun test tests/unit && cd ../.. && bun run typecheck`
Expected: all tests pass; typecheck clean.

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/components/chat.css packages/core/tests/unit/chat.test.ts
git commit -m "feat(core): add animated typing, streaming, and tool-running states"
```

---

## Task 9: Docs MDX page

**Files:**
- Create: `packages/docs/src/content/docs/en/components/chat.mdx`

- [ ] **Step 1: Create the MDX page**

Create `packages/docs/src/content/docs/en/components/chat.mdx`:

```mdx
---
title: Chat
description: LLM-oriented chat primitives — bubbles, reasoning traces, tool calls, and live streaming states
category: components
order: 24
published: true
tags: ['chat', 'components', 'llm', 'bubble', 'conversation']
---

import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';

# Chat

CSS-only chat primitives tailored for LLM interfaces. Includes message bubbles with directional tails, collapsible reasoning traces, tool-call blocks with status indicators, and live states for typing and streaming.

## Basic Usage

A chat row consists of a `.chat` wrapper with a placement modifier (`.chat-start` for the assistant, `.chat-end` for the user), an optional `.chat-avatar`, and a `.chat-bubble`.

<ComponentShowcase title="Basic Chat" code={`<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
  <div class="chat-bubble">Hello! How can I help you today?</div>
</div>
<div class="chat chat-end">
  <div class="chat-avatar"><div class="avatar avatar-sm avatar-primary">Y</div></div>
  <div class="chat-bubble chat-bubble-filled chat-bubble-primary">I'd like to plan a trip.</div>
</div>`} />

## Header and Footer

<ComponentShowcase title="With Header and Footer" code={`<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
  <div class="chat-header">Claude · 2:15 PM</div>
  <div class="chat-bubble">On it!</div>
  <div class="chat-footer">Delivered</div>
</div>`} />

## Color Variants

All 7 standard DuskMoon color variants are available. The default uses soft container tones; add `.chat-bubble-filled` for saturated backgrounds.

<ComponentShowcase title="Soft (container) variants" code={`<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-primary">Primary</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-success">Success</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-warning">Warning</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-error">Error</div>
</div>`} />

<ComponentShowcase title="Filled (saturated) variants" code={`<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-filled chat-bubble-primary">Primary</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-filled chat-bubble-success">Success</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-filled chat-bubble-error">Error</div>
</div>`} />

## Sizes

Sizes: `xs`, `sm`, `md` (default), `lg`.

<ComponentShowcase title="Size variants" code={`<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-xs">Extra small bubble</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-sm">Small bubble</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble">Default (medium) bubble</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-lg">Large bubble</div>
</div>`} />

## LLM Chat — Reasoning and Tool Use

`.chat-reasoning` renders a collapsible thinking trace using native `<details>`. `.chat-tool` shows a tool invocation with `.chat-tool-call` and `.chat-tool-result` slots; add a status modifier (`.chat-tool-pending`, `.chat-tool-running`, `.chat-tool-success`, `.chat-tool-error`) to color the border and pill.

<ComponentShowcase title="Full assistant turn" code={`<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
  <div class="chat-header">Claude · 2:15 PM</div>

  <details class="chat-reasoning" open>
    <summary>Thinking (3s)</summary>
    <div>The user wants current weather data. I'll call the weather tool with Tokyo as the location parameter.</div>
  </details>

  <details class="chat-tool chat-tool-success" open>
    <summary>
      <span class="chat-tool-header">get_weather</span>
      <span class="chat-tool-status">Done</span>
    </summary>
    <div class="chat-tool-call"><pre class="code-block">{
  "location": "Tokyo, JP",
  "units": "metric"
}</pre></div>
    <div class="chat-tool-result"><pre class="code-block">{ "temp": 18, "condition": "cloudy" }</pre></div>
  </details>

  <div class="chat-bubble">It's <strong>18°C</strong> and cloudy in Tokyo right now.</div>
</div>`} />

## Live States

### Typing indicator

Place `.chat-typing` with one `<span></span>` child inside an otherwise-empty `.chat-bubble`.

<ComponentShowcase title="Typing" code={`<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
  <div class="chat-bubble" aria-label="Assistant is typing">
    <span class="chat-typing"><span></span></span>
  </div>
</div>`} />

### Streaming caret

Add `.chat-bubble-streaming` to a bubble to append a blinking caret — useful while tokens are streaming in.

<ComponentShowcase title="Streaming" code={`<div class="chat chat-start">
  <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
  <div class="chat-bubble chat-bubble-streaming">Sure, let me look that up</div>
</div>`} />

### Tool running

The `.chat-tool-running` status modifier renders a spinner on the tool header.

<ComponentShowcase title="Tool running" code={`<details class="chat-tool chat-tool-running" open>
  <summary>
    <span class="chat-tool-header">search_docs</span>
    <span class="chat-tool-status">Running…</span>
  </summary>
  <div class="chat-tool-call"><pre class="code-block">{ "query": "refund policy" }</pre></div>
</details>`} />

## Class Reference

### Structural

| Class | Role |
|---|---|
| `.chat` | Row wrapper. |
| `.chat-start` | Left-aligned row (assistant). |
| `.chat-end` | Right-aligned row (user). |
| `.chat-avatar` | Slot for an `.avatar`. |
| `.chat-header` | Small muted label above the stack. |
| `.chat-footer` | Small muted label below the stack. |
| `.chat-bubble` | Message bubble with directional tail. |

### Bubble modifiers

| Class | Role |
|---|---|
| `.chat-bubble-{primary,secondary,tertiary,info,success,warning,error}` | Soft container-tone variants. |
| `.chat-bubble-filled` | Use with a variant to get saturated base tones. |
| `.chat-bubble-{xs,sm,md,lg}` | Size variants; `md` is the default. |
| `.chat-bubble-streaming` | Adds a blinking caret (live state). |

### LLM blocks

| Class | Role |
|---|---|
| `.chat-reasoning` | Collapsible `<details>` for thinking traces. |
| `.chat-tool` | Collapsible `<details>` for tool invocations. |
| `.chat-tool-header` | Inline wrapper for the tool name in `<summary>`. |
| `.chat-tool-call` | Slot for the call payload. |
| `.chat-tool-result` | Slot for the result payload. |
| `.chat-tool-status` | Status pill — place inside `<summary>`. |
| `.chat-tool-{pending,running,success,error}` | Status modifier on `.chat-tool`. |

### Live states

| Class | Role |
|---|---|
| `.chat-typing` | Three animated dots; requires one `<span>` child inside an empty bubble. |
| `.chat-bubble-streaming` | Blinking caret after bubble content. |
| `.chat-tool-running` | Spinner on the tool summary. |

## Accessibility

- The reasoning and tool blocks use native `<details>`/`<summary>` — keyboard and screen-reader behavior come for free.
- Tool status pills include visible text alongside color (`Pending`, `Running…`, `Done`, `Failed`). Color is never the sole signal.
- Add `aria-label="Assistant is typing"` or a visually-hidden label to the typing bubble so screen readers announce it.
- All animations respect `prefers-reduced-motion: reduce`.
```

- [ ] **Step 2: Run the docs build to verify the MDX compiles**

Run: `bun run build:docs`
Expected: Astro build completes without errors; the chat page HTML appears under `packages/docs/dist/`.

- [ ] **Step 3: Commit**

```bash
git add packages/docs/src/content/docs/en/components/chat.mdx
git commit -m "docs: add chat component MDX page with LLM chat examples"
```

---

## Task 10: Register Chat in sidebar and components index

**Files:**
- Modify: `packages/docs/src/components/navigation/Sidebar.astro`
- Modify: `packages/docs/src/pages/components/index.astro`

- [ ] **Step 1: Add Chat to the sidebar Data Display section**

Edit `packages/docs/src/components/navigation/Sidebar.astro`. Find the `Data Display` section (currently contains `Card`, `Badge`, `Avatar`, `Chip`, `Code Block`, `Table` — around line 67). Insert `Chat` between `Card` and `Badge`, keeping the existing order for the other items:

```astro
    {
      title: 'Data Display',
      items: [
        { title: 'Card', href: `${base}docs/en/components/card/` },
        { title: 'Chat', href: `${base}docs/en/components/chat/`, badge: 'new' },
        { title: 'Badge', href: `${base}docs/en/components/badge/` },
        { title: 'Avatar', href: `${base}docs/en/components/avatar/` },
        { title: 'Chip', href: `${base}docs/en/components/chip/` },
        { title: 'Code Block', href: `${base}docs/en/components/code-block/`, badge: 'new' },
        { title: 'Table', href: `${base}docs/en/components/table/` },
      ],
    },
```

(Exact existing order is preserved — only the `Chat` line is added.)

- [ ] **Step 2: Add Chat to the components index page**

Edit `packages/docs/src/pages/components/index.astro`. Find the `Data Display` group (alphabetical: `Avatar`, `Badge`, `Card`, `Chip`, …). Insert `Chat` between `Card` and `Chip`:

```astro
      { name: 'Avatar', slug: 'avatar', description: 'User profile pictures' },
      { name: 'Badge', slug: 'badge', description: 'Status indicators' },
      { name: 'Card', slug: 'card', description: 'Content containers' },
      { name: 'Chat', slug: 'chat', description: 'LLM chat bubbles with reasoning and tool use' },
      { name: 'Chip', slug: 'chip', description: 'Compact tags' },
      { name: 'Code Block', slug: 'code-block', description: 'Styled code containers' },
```

- [ ] **Step 3: Rebuild the docs to confirm navigation compiles**

Run: `bun run build:docs`
Expected: build completes; the Chat page is reachable from the sidebar and index.

- [ ] **Step 4: Spot-check the dev server visually (optional but recommended)**

Run: `bun run dev` in a spare terminal, open `http://localhost:4321/duskmoonui/docs/en/components/chat/`, and confirm:
- bubble shapes render with tails on the expected sides (left for `.chat-start`, right for `.chat-end`)
- color variants look correct across themes (toggle via theme controller)
- `<details>` blocks collapse/expand on click
- reduced-motion (DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce") pauses animations

Kill the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add packages/docs/src/components/navigation/Sidebar.astro \
        packages/docs/src/pages/components/index.astro
git commit -m "docs: register chat component in sidebar and components index"
```

---

## Task 11: Visual regression test + final verification

**Files:**
- Create: `packages/core/tests/visual/chat.spec.ts`

- [ ] **Step 1: Create the visual regression spec**

Create `packages/core/tests/visual/chat.spec.ts`:

```ts
/**
 * Visual regression tests for Chat component
 * Tests bubble shapes, color variants, LLM blocks, and live states across themes.
 */

import { test, expect } from '@playwright/test';

const THEMES = ['sunshine', 'moonlight', 'ocean', 'forest', 'sunset'] as const;

const CHAT_MARKUP = `
  <div class="p-8" style="background: var(--color-surface)">
    <div class="chat chat-start">
      <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
      <div class="chat-header">Claude · 2:15 PM</div>
      <div class="chat-bubble">Hello! How can I help you today?</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-avatar"><div class="avatar avatar-sm avatar-primary">Y</div></div>
      <div class="chat-bubble chat-bubble-filled chat-bubble-primary">I'd like to plan a trip.</div>
    </div>
    <div class="chat chat-start">
      <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
      <details class="chat-reasoning" open>
        <summary>Thinking (3s)</summary>
        <div>Planning a trip usually needs destination, dates, and budget — let me ask.</div>
      </details>
      <details class="chat-tool chat-tool-success" open>
        <summary>
          <span class="chat-tool-header">search_flights</span>
          <span class="chat-tool-status">Done</span>
        </summary>
        <div class="chat-tool-call"><pre class="code-block">{ "from": "NRT", "to": "CDG" }</pre></div>
        <div class="chat-tool-result"><pre class="code-block">{ "cheapest": 680 }</pre></div>
      </details>
      <div class="chat-bubble">Found flights from <strong>$680</strong>. Want me to book?</div>
    </div>
    <div class="chat chat-start">
      <div class="chat-avatar"><div class="avatar avatar-sm">🤖</div></div>
      <div class="chat-bubble chat-bubble-streaming">Let me think about that</div>
    </div>
  </div>
`;

test.describe('Visual Regression - Chat Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  for (const theme of THEMES) {
    test(`chat conversation renders correctly - ${theme}`, async ({ page }) => {
      await page.evaluate(
        ({ t, html }) => {
          document.documentElement.setAttribute('data-theme', t);
          const container = document.createElement('div');
          container.id = 'chat-test';
          container.innerHTML = html;
          document.body.appendChild(container);
        },
        { t: theme, html: CHAT_MARKUP },
      );

      // Freeze animations for deterministic snapshots
      await page.addStyleTag({
        content: `
          .chat-typing::before, .chat-typing::after, .chat-typing > span,
          .chat-bubble-streaming::after,
          .chat-tool-running > summary::before {
            animation: none !important;
          }
        `,
      });

      const chat = page.locator('#chat-test');
      await expect(chat).toHaveScreenshot(`${theme}-chat-conversation.png`);
    });
  }
});
```

- [ ] **Step 2: Run the visual regression test to generate baselines**

Run: `cd packages/core && bun run test:visual --update-snapshots`
Expected: 5 snapshots produced under `tests/visual/snapshots/` (one per theme).

- [ ] **Step 3: Re-run the visual suite without `--update-snapshots` to confirm stability**

Run: `cd packages/core && bun run test:visual`
Expected: all snapshots match; suite passes.

- [ ] **Step 4: Run the complete verification gauntlet**

Run each in sequence, do not proceed on failure:

```bash
cd packages/core && bun test tests/unit          # all unit tests
cd packages/core && bun run test:a11y             # axe-core accessibility
cd ../.. && bun run typecheck                     # TypeScript across workspace
bun run build:core                                # core build
bun run build:docs                                # docs build
```
Expected: all pass.

- [ ] **Step 5: Commit visual test + any snapshots**

```bash
git add packages/core/tests/visual/chat.spec.ts \
        packages/core/tests/visual/snapshots/*chat*
git commit -m "test(core): add visual regression for chat across 5 themes"
```

---

## Notes for the implementer

- **DRY:** The `.chat-reasoning` and `.chat-tool` blocks share appearance primitives (bg, border, radius, summary styling). Do not factor out a shared `.chat-collapsible` class — they are expected to diverge (tool adds status modifiers, reasoning italicizes the body). Keeping them as parallel siblings is intentional.
- **YAGNI:** Do not add RTL-specific rules, emoji reactions, message grouping, or timestamp-format utilities. Out of scope per the spec.
- **Don't modify the build script.** `scripts/build-css.ts` discovers new component CSS files automatically via the existing loop; no change needed there.
- **Don't add French/Spanish translations of the MDX page** — they are explicitly deferred to a follow-up PR.
- **Don't bump `packages/core/package.json` here.** Version bumps happen at release time per the project memory; this PR is feature-only.
