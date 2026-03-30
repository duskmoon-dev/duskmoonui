import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('AppBar Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/appbar.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .appbar base class', () => {
    expect(css).toContain('.appbar');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should define .appbar-fixed class', () => {
    expect(css).toContain('.appbar-fixed');
  });

  it('should define .appbar-sticky class', () => {
    expect(css).toContain('.appbar-sticky');
  });

  it('should have fixed position for fixed variant', () => {
    expect(css).toMatch(/\.appbar-fixed[^}]*position:\s*fixed/s);
  });

  it('should have sticky position for sticky variant', () => {
    expect(css).toMatch(/\.appbar-sticky[^}]*position:\s*sticky/s);
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.appbar[^{]*\{[^}]*display:\s*flex/s);
  });
});
