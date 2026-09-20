import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Swap component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(import.meta.dir, '../../src/components/swap.css'), 'utf8');
  });

  it('places both state slots in one stable grid cell', () => {
    expect(css).toMatch(/\.swap\s*\{[^}]*display:\s*inline-grid/s);
    expect(css).toMatch(/\.swap-on,\s*\.swap-off\s*\{[^}]*grid-area:\s*1 \/ 1/s);
  });

  it('uses checkbox checked state as the native authority', () => {
    expect(css).toContain('.swap-input:checked ~ .swap-on');
    expect(css).toContain('.swap-input:checked ~ .swap-off');
  });

  it('uses aria-pressed as the controlled button authority', () => {
    expect(css).toContain('.swap[aria-pressed="true"] > .swap-on');
    expect(css).toContain('.swap[aria-pressed="true"] > .swap-off');
  });

  it('hides inactive content from interaction and accessibility exposure', () => {
    expect(css).toMatch(/\.swap-on\s*\{[^}]*visibility:\s*hidden/s);
    expect(css).toMatch(/\.swap-on\s*\{[^}]*pointer-events:\s*none/s);
    expect(css).toMatch(/\.swap-input:checked ~ \.swap-off,[\s\S]*?visibility:\s*hidden/);
  });

  it('provides focus, disabled, rotation, and active presentation states', () => {
    expect(css).toContain('.swap:has(.swap-input:focus-visible)');
    expect(css).toContain('.swap:has(.swap-input:disabled)');
    expect(css).toContain('.swap-rotate');
    expect(css).toContain('.swap.swap-active > .swap-on');
  });

  it('disables transition under reduced motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition:\s*none/);
  });
});
