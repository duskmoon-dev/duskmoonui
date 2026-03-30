import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Multi Select Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/multi-select.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .multi-select class', () => {
    expect(css).toContain('.multi-select');
  });

  it('should define .multi-select-trigger class', () => {
    expect(css).toContain('.multi-select-trigger');
  });

  it('should use currentColor border on trigger', () => {
    expect(css).toMatch(/\.multi-select-trigger[^}]*border[^}]*currentColor/s);
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define .multi-select-dropdown or options panel', () => {
    expect(css).toMatch(/\.multi-select-dropdown|\.multi-select-options|\.multi-select-menu/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for interactions', () => {
    expect(css).toContain('transition');
  });
});
