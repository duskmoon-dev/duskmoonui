import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('List Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/list.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .list class', () => {
    expect(css).toContain('.list');
  });

  it('should define .list-item class', () => {
    expect(css).toContain('.list-item');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.list[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should remove list styling', () => {
    expect(css).toMatch(/list-style:\s*none/);
  });

  it('should use on-surface color token for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should define hover state for interactive items', () => {
    expect(css).toMatch(/\.list-item.*:hover|:hover.*\.list-item/s);
  });

  it('should have transition for hover interaction', () => {
    expect(css).toContain('transition');
  });
});
