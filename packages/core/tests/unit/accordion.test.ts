import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Accordion Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/accordion.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .accordion container class', () => {
    expect(css).toContain('.accordion');
  });

  it('should define .accordion-item class', () => {
    expect(css).toContain('.accordion-item');
  });

  it('should define .accordion-header class', () => {
    expect(css).toContain('.accordion-header');
  });

  it('should define .accordion-content class', () => {
    expect(css).toContain('.accordion-content');
  });

  it('should use surface color token for item background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should use outline-variant color token for borders', () => {
    expect(css).toContain('var(--color-outline-variant)');
  });

  it('should use flexbox for layout', () => {
    expect(css).toMatch(/\.accordion[^{]*\{[^}]*display:\s*flex/s);
  });
});
