import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Toast Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/toast.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .toast-container class', () => {
    expect(css).toContain('.toast-container');
  });

  it('should define .toast class', () => {
    expect(css).toContain('.toast');
  });

  it('should be fixed positioned container', () => {
    expect(css).toMatch(/\.toast-container[^}]*position:\s*fixed/s);
  });

  it('should define position variants', () => {
    expect(css).toContain('.toast-container-top-right');
    expect(css).toContain('.toast-container-top-left');
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

  it('should define semantic color variants', () => {
    expect(css).toMatch(/\.toast-success|\.toast-error|\.toast-warning/);
  });
});
