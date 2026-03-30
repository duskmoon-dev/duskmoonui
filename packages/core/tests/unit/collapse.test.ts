import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Collapse Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/collapse.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .collapse class', () => {
    expect(css).toContain('.collapse');
  });

  it('should define .collapse-trigger class', () => {
    expect(css).toContain('.collapse-trigger');
  });

  it('should define .collapse-content class', () => {
    expect(css).toContain('.collapse-content');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should define hover state for trigger', () => {
    expect(css).toMatch(/\.collapse-trigger:hover/);
  });

  it('should define focus-visible state for accessibility', () => {
    expect(css).toMatch(/\.collapse-trigger:focus-visible/);
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });
});
