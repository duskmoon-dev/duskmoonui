import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Pagination Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/pagination.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .pagination class', () => {
    expect(css).toContain('.pagination');
  });

  it('should define .pagination-item class', () => {
    expect(css).toContain('.pagination-item');
  });

  it('should define .pagination-prev and .pagination-next classes', () => {
    expect(css).toContain('.pagination-prev');
    expect(css).toContain('.pagination-next');
  });

  it('should use flexbox for layout', () => {
    expect(css).toMatch(/\.pagination[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should remove list styling', () => {
    expect(css).toMatch(/list-style:\s*none/);
  });

  it('should use on-surface color token', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should define active page state', () => {
    expect(css).toMatch(/\.pagination-item-active|\.active|:active/);
  });

  it('should have transition', () => {
    expect(css).toContain('transition');
  });
});
