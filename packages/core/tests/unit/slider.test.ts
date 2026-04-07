import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Slider Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/slider.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .slider base class', () => {
    expect(css).toContain('.slider');
  });

  it('should define .slider-track class', () => {
    expect(css).toContain('.slider-track');
  });

  it('should define .slider-track-filled class', () => {
    expect(css).toContain('.slider-track-filled');
  });

  it('should define .slider-thumb class', () => {
    expect(css).toContain('.slider-thumb');
  });

  it('should use primary color for filled track', () => {
    expect(css).toContain('var(--color-primary)');
  });

  it('should use surface container color for unfilled track', () => {
    expect(css).toContain('var(--color-surface-container-highest)');
  });

  it('should have touch-action none for drag handling', () => {
    expect(css).toMatch(/touch-action:\s*none/);
  });
});
