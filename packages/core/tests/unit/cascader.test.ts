import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Cascader Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/cascader.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .cascader class', () => {
    expect(css).toContain('.cascader');
  });

  it('should define .cascader-trigger class', () => {
    expect(css).toContain('.cascader-trigger');
  });

  it('should use currentColor border pattern on trigger', () => {
    expect(css).toMatch(/\.cascader-trigger[^}]*border[^}]*currentColor/s);
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.cascader-trigger:disabled/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for interactions', () => {
    expect(css).toContain('transition');
  });
});
