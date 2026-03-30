import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Rating Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/rating.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .rating base class', () => {
    expect(css).toContain('.rating');
  });

  it('should define .rating-item class', () => {
    expect(css).toContain('.rating-item');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.rating[^{]*\{[^}]*display:\s*inline-flex/s);
  });

  it('should use color token for filled state', () => {
    expect(css).toContain('var(--color-warning');
  });

  it('should define hover state with scale transform', () => {
    expect(css).toMatch(/\.rating-item:hover[^}]*transform/s);
  });

  it('should have transition for interactive animation', () => {
    expect(css).toContain('transition');
  });

  it('should define .active state', () => {
    expect(css).toContain('.active');
  });

  it('should define size variants', () => {
    expect(css).toMatch(/\.rating-sm|\.rating-lg/);
  });
});
