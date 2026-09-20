import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

describe('Tabs component contract', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(join(import.meta.dir, '../../src/components/tabs.css'), 'utf8');
  });

  it('ships every documented appearance and layout selector', () => {
    for (const selector of [
      '.tabs-pill', '.tabs-tonal', '.tabs-boxed', '.tabs-lifted', '.tabs-vertical',
      '.tabs-scrollable', '.tabs-full', '.tabs-center', '.tabs-end',
    ]) expect(css).toContain(selector);
  });

  it('keeps container sizes and legacy item sizes compatible', () => {
    for (const selector of ['.tabs-sm .tab', '.tabs-md .tab', '.tabs-lg .tab', '.tab-sm', '.tab-lg']) {
      expect(css).toContain(selector);
    }
  });

  it('supports semantic, legacy, and color-specific active states', () => {
    for (const selector of [
      '.tab-active', '.tab-active-primary', '.tab-active-secondary', '.tab-active-tertiary',
      '[aria-selected="true"]', '[aria-current="page"]',
    ]) expect(css).toContain(selector);
    expect(css).toContain('var(--color-primary)');
    expect(css).toContain('var(--color-secondary)');
    expect(css).toContain('var(--color-tertiary)');
  });

  it('provides disabled, keyboard-focus, and reduced-motion presentation', () => {
    expect(css).toContain('.tab:disabled');
    expect(css).toContain('[aria-disabled="true"]');
    expect(css).toContain('.tab:focus-visible');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toMatch(/prefers-reduced-motion:[\s\S]*transition:\s*none/);
  });

  it('provides icon, badge, and icon-only composition hooks', () => {
    for (const selector of ['.tab-icon', '.tab-badge', '.tab-icon-only']) expect(css).toContain(selector);
  });

  it('keeps hidden authoritative over stale panel state', () => {
    expect(css).toContain('.tab-panel');
    expect(css).toContain('.tab-panel-show');
    expect(css).toMatch(/\.tab-panel:is\([^}]+\):not\(\[hidden\]\)\s*\{[^}]*display:\s*block/s);
    expect(css).toMatch(/\.tab-panel\[hidden\]\s*\{[^}]*display:\s*none\s*!important/s);
  });
});
