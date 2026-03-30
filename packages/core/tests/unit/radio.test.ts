import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Radio Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/radio.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .radio base class', () => {
    expect(css).toContain('.radio');
  });

  it('should use appearance: none to reset native radio', () => {
    expect(css).toMatch(/appearance:\s*none/);
  });

  it('should have border-radius 50% for circular shape', () => {
    expect(css).toMatch(/border-radius:\s*var\(--radius-full\)/);
  });

  it('should use primary color token', () => {
    expect(css).toContain('var(--color-primary)');
  });

  it('should define checked state', () => {
    expect(css).toMatch(/\.radio:checked/);
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.radio:disabled/);
  });

  it('should define color variants', () => {
    expect(css).toContain('.radio-primary');
    expect(css).toContain('.radio-secondary');
  });

  it('should use ::before for inner dot', () => {
    expect(css).toContain('.radio::before');
  });

  it('should have cursor pointer', () => {
    expect(css).toMatch(/cursor:\s*pointer/);
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });
});
