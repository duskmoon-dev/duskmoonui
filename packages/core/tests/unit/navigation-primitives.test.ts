import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const componentPath = (name: string) => join(import.meta.dir, `../../src/components/${name}.css`);

describe('Link primitive', () => {
  let css: string;
  beforeAll(async () => { css = await readFile(componentPath('link'), 'utf8'); });

  it('uses theme tokens and wraps long native link text', () => {
    expect(css).toContain('.link');
    expect(css).toContain('var(--color-primary)');
    expect(css).toContain('overflow-wrap: anywhere');
    expect(css).toContain('text-decoration-line: underline');
  });

  it('supports hover-underline keyboard focus and restrained variants', () => {
    expect(css).toMatch(/\.link-hover:hover,[\s\S]*\.link-hover:focus-visible/);
    for (const selector of ['.link-primary', '.link-secondary', '.link-tertiary', '.link-neutral', '.link-inherit']) {
      expect(css).toContain(selector);
    }
    expect(css).toContain('.link:active');
    expect(css).toContain('.link:focus-visible');
  });
});

describe('Megamenu composition', () => {
  let css: string;
  beforeAll(async () => { css = await readFile(componentPath('megamenu'), 'utf8'); });

  it('composes canonical Menu and Link instead of duplicating their rules', () => {
    expect(css).toContain('@import "./menu.css"');
    expect(css).toContain('@import "./link.css"');
    expect(css).toContain('.megamenu-panel .menu');
    expect(css).toContain('.megamenu-panel .menu > li > .link');
  });

  it('uses native popover state, per-instance anchors, and viewport constraints', () => {
    expect(css).toContain('anchor-name: var(--megamenu-anchor)');
    expect(css).toContain('position-anchor: var(--megamenu-anchor)');
    expect(css).toContain('.megamenu-panel[popover]:popover-open');
    expect(css).not.toContain('.megamenu-open');
    expect(css).toContain('100dvh');
    expect(css).toContain('overflow: auto');
  });

  it('provides responsive grid, full-width, mobile, fallback, and reduced-motion rules', () => {
    for (const selector of ['.megamenu-grid', '.megamenu-panel-full', '.megamenu-desktop', '.megamenu-mobile']) {
      expect(css).toContain(selector);
    }
    expect(css).toContain('@supports not (position-area: bottom)');
    expect(css).toContain('prefers-reduced-motion: reduce');
  });
});
