import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Segment Control Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/segment-control.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .segment-control class', () => {
    expect(css).toContain('.segment-control');
  });

  it('should define .segment-item class', () => {
    expect(css).toContain('.segment-item');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.segment-control[^{]*\{[^}]*display:\s*inline-flex/s);
  });

  it('should use surface-container color for background', () => {
    expect(css).toContain('var(--color-surface-container)');
  });

  it('should use outline color for border', () => {
    expect(css).toContain('var(--color-outline)');
  });

  it('should define active/selected segment state', () => {
    expect(css).toMatch(/\.segment-item-active|\.active/);
  });

  it('should have transition for state changes', () => {
    expect(css).toContain('transition');
  });
});
