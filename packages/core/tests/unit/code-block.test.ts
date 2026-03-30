import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Code Block Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/code-block.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .code-block class', () => {
    expect(css).toContain('.code-block');
  });

  it('should define .code-header class', () => {
    expect(css).toContain('.code-header');
  });

  it('should define .code-title class', () => {
    expect(css).toContain('.code-title');
  });

  it('should define .code-language class', () => {
    expect(css).toContain('.code-language');
  });

  it('should use outline color token for border', () => {
    expect(css).toContain('var(--color-outline)');
  });

  it('should use surface container color for header background', () => {
    expect(css).toContain('var(--color-surface-container');
  });

  it('should use on-surface color tokens for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });
});
