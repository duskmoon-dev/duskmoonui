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
    expect(css).toContain('.toast.toast-show');
    expect(css).toContain('.toast-container[popover]:popover-open .toast');
  });

  it('should support native popover command targets', () => {
    expect(css).toMatch(/:where\(\.toast-container\[popover\]\)[^}]*inset:\s*auto/s);
    expect(css).toMatch(/:where\(\.toast-container\[popover\]\)[^}]*background:\s*transparent/s);
    expect(css).toMatch(/\.toast-container\[popover\]:not\(:popover-open\)[^}]*display:\s*none/s);
    expect(css).toMatch(/\.toast-container\[popover\]:popover-open \.toast[^}]*visibility:\s*visible/s);
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });

  it('should define semantic color variants', () => {
    expect(css).toMatch(/\.toast-success|\.toast-error|\.toast-warning/);
  });

  it('should define documented actions, sizes, accent, and stacking', () => {
    expect(css).toContain('.toast-action');
    expect(css).toContain('.toast-sm');
    expect(css).toContain('.toast-lg');
    expect(css).toContain('.toast-compact');
    expect(css).toContain('.toast-accent::before');
    expect(css).toContain('.toast-container-stacked .toast:not(:first-child)');
  });

  it('should use role colors for filled backgrounds and semantic accent edges', () => {
    expect(css).toMatch(/\.toast-filled\.toast-primary\s*\{[^}]*background-color:\s*var\(--color-primary\)[^}]*color:\s*var\(--color-primary-content\)/s);
    expect(css).toMatch(/\.toast-accent::before\s*\{[^}]*background-color:\s*var\(--_toast-accent-color\)/s);
    expect(css.indexOf('.toast-accent {')).toBeLessThan(css.indexOf('.toast-success {'));
  });

  it('should position toast internals and logical close spacing safely', () => {
    expect(css).toMatch(/\.toast\s*\{[^}]*position:\s*relative/s);
    expect(css).toMatch(/\.toast-close\s*\{[^}]*margin-inline-start:\s*auto/s);
  });
});
