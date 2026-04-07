import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Snackbar Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/snackbar.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .snackbar-container class', () => {
    expect(css).toContain('.snackbar-container');
  });

  it('should define .snackbar class', () => {
    expect(css).toContain('.snackbar');
  });

  it('should be fixed positioned container', () => {
    expect(css).toMatch(/\.snackbar-container[^}]*position:\s*fixed/s);
  });

  it('should define position variants', () => {
    expect(css).toContain('.snackbar-container-bottom');
  });

  it('should have z-index for layering', () => {
    expect(css).toContain('z-index');
  });

  it('should define show state', () => {
    expect(css).toContain('.show');
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });

  it('should use surface color token', () => {
    expect(css).toContain('var(--color-');
  });
});
