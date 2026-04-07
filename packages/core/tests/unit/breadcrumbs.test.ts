import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Breadcrumbs Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/breadcrumbs.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .breadcrumbs class', () => {
    expect(css).toContain('.breadcrumbs');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.breadcrumbs[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should style list items', () => {
    expect(css).toContain('.breadcrumbs li');
  });

  it('should use ::after for separator', () => {
    expect(css).toContain('.breadcrumbs li::after');
  });

  it('should use color token for separator', () => {
    expect(css).toContain('var(--color-on-surface-variant)');
  });

  it('should remove list styling', () => {
    expect(css).toMatch(/list-style:\s*none/);
  });
});
