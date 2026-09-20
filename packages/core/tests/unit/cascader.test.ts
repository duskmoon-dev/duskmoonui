import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Cascader Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/cascader.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .cascader class', () => {
    expect(css).toContain('.cascader');
  });

  it('should define .cascader-trigger class', () => {
    expect(css).toContain('.cascader-trigger');
  });

  it('should use currentColor border pattern on trigger', () => {
    expect(css).toMatch(/\.cascader-trigger[^}]*border[^}]*currentColor/s);
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.cascader-trigger:disabled/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for interactions', () => {
    expect(css).toContain('transition');
  });

  it('should position each popover from its own invoking trigger', () => {
    expect(css).toContain('@supports (position-area: block-end)');
    expect(css).toContain('position-area: block-end span-inline-end');
    expect(css).not.toContain('anchor-name: --cascader-anchor');
    expect(css).not.toContain('position-anchor: --cascader-anchor');
  });

  it('should position a sibling clear button inside the trigger area', () => {
    expect(css).toMatch(/\.cascader:has\(> \.cascader-clear\) \.cascader-value[^}]*padding-inline-end/s);
    expect(css).toMatch(/\.cascader > \.cascader-clear[^}]*position:\s*absolute/s);
    expect(css).toMatch(/\.cascader > \.cascader-clear[^}]*inset-inline-end/s);
  });
});
