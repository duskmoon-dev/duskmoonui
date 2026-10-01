import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { skeletonStyles } from '../../src/components/skeleton';

describe('Skeleton Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/skeleton.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .skeleton base class', () => {
    expect(css).toContain('.skeleton');
  });

  it('should define shape variants', () => {
    expect(css).toContain('.skeleton-text');
    expect(css).toContain('.skeleton-circle');
    expect(css).toContain('.skeleton-rect');
  });

  it('should have circular shape for skeleton-circle', () => {
    expect(css).toMatch(/\.skeleton-circle[^}]*border-radius:\s*var\(--radius-full\)/s);
  });

  it('should use surface container color token', () => {
    expect(css).toContain('var(--color-surface-container-high');
  });

  it('should have pulse animation', () => {
    expect(css).toContain('animation');
    expect(css).toContain('@keyframes skeleton-pulse');
  });

  it('should define size variants', () => {
    expect(css).toMatch(/\.skeleton-sm|\.skeleton-lg/);
  });

  it('defines the documented input skeleton dimensions', () => {
    expect(css).toMatch(/\.skeleton-input\s*\{[^}]*height:\s*2\.75rem/s);
    expect(css).toMatch(/\.skeleton-input\s*\{[^}]*width:\s*100%/s);
    expect(css).toMatch(/\.skeleton-input\s*\{[^}]*border-radius:\s*var\(--radius-xs\)/s);
    expect(skeletonStyles['.skeleton-input']).toMatchObject({
      height: '2.75rem',
      width: '100%',
    });
  });
});
