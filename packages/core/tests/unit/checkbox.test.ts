import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Checkbox Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/checkbox.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .checkbox base class', () => {
    expect(css).toContain('.checkbox');
  });

  it('should use appearance: none to reset native checkbox', () => {
    expect(css).toMatch(/appearance:\s*none/);
  });

  it('should use primary color token', () => {
    expect(css).toContain('var(--color-primary)');
  });

  it('should define checked state', () => {
    expect(css).toMatch(/\.checkbox:checked/);
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.checkbox:disabled/);
  });

  it('should define color variants', () => {
    expect(css).toContain('.checkbox-primary');
    expect(css).toContain('.checkbox-secondary');
    expect(css).toContain('.checkbox-error');
  });

  it('should have transition for smooth interactions', () => {
    expect(css).toContain('transition');
  });

  it('should use ::before pseudo-element for checkmark', () => {
    expect(css).toContain('.checkbox::before');
  });

  it('should have cursor pointer', () => {
    expect(css).toMatch(/cursor:\s*pointer/);
  });
});
