import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Tree Select Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/tree-select.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .tree-select class', () => {
    expect(css).toContain('.tree-select');
  });

  it('should define .tree-select-trigger class', () => {
    expect(css).toContain('.tree-select-trigger');
  });

  it('should use currentColor border on trigger', () => {
    expect(css).toMatch(/\.tree-select-trigger[^}]*border[^}]*currentColor/s);
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define tree node/item classes', () => {
    expect(css).toMatch(/\.tree-select-node|\.tree-node|\.tree-item/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for interactions', () => {
    expect(css).toContain('transition');
  });
});
