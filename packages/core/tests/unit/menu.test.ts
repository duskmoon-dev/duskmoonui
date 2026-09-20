import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe.each(['menu', 'navigation'])('Menu Component (%s)', (component) => {
  let css: string;

  beforeAll(async () => {
    const directory = component === 'navigation' ? 'dist' : 'src';
    css = await readFile(resolve(__dirname, `../../${directory}/components/${component}.css`), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .menu class', () => {
    expect(css).toContain('.menu');
  });

  it('should define .menu-item class', () => {
    expect(css).toContain('.menu-item');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.menu[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should remove list styling', () => {
    expect(css).toMatch(/list-style:\s*none/);
  });

  it('should use on-surface color token for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should define hover state', () => {
    expect(css).toContain(':hover');
  });

  it('should define active/selected state', () => {
    expect(css).toMatch(/\.menu-item-active|\.active|:active/);
  });

  it('should have transition for hover interaction', () => {
    expect(css).toContain('transition');
  });

  it('keeps native menu visibility browser-controlled', () => {
    expect(css).toMatch(/\.menu\[popover\]\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(/\.menu\[popover\]:popover-open\s*\{[^}]*display:\s*flex/s);
  });

  it('positions native menus at their anchor with viewport fallbacks', () => {
    expect(css).toMatch(/\.menu\[popover\]\s*\{[^}]*inset:\s*auto/s);
    expect(css).toContain('position-area: bottom');
    expect(css).toContain('position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline');
    for (const side of ['top', 'bottom', 'left', 'right']) {
      expect(css).toContain(`.menu-${side}[popover] {\n    position-area: ${side};`);
    }
  });

  it('animates native entry and exit with reduced-motion support', () => {
    expect(css).toContain('@starting-style');
    expect(css).toContain('overlay 150ms ease-out allow-discrete');
    expect(css).toContain('display 150ms ease-out allow-discrete');
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.menu\[popover\][^{]*\{\s*transition: none/s);
  });

});
