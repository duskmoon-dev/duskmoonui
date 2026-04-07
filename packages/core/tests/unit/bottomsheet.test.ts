import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Bottom Sheet Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/bottomsheet.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .bottomsheet class', () => {
    expect(css).toContain('.bottomsheet');
  });

  it('should define .bottomsheet-backdrop class', () => {
    expect(css).toContain('.bottomsheet-backdrop');
  });

  it('should be fixed positioned', () => {
    expect(css).toMatch(/\.bottomsheet[^{]*\{[^}]*position:\s*fixed/s);
  });

  it('should define show state', () => {
    expect(css).toContain('.show');
  });

  it('should have z-index for layering', () => {
    expect(css).toContain('z-index');
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });
});
