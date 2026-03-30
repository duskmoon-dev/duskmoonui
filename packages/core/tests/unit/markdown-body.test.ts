import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Markdown Body Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/markdown-body.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .markdown-body class', () => {
    expect(css).toContain('.markdown-body');
  });

  it('should style headings h1 through h6', () => {
    expect(css).toContain('.markdown-body h1');
    expect(css).toContain('.markdown-body h2');
    expect(css).toContain('.markdown-body h6');
  });

  it('should use on-surface color token for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should style code blocks', () => {
    expect(css).toMatch(/\.markdown-body (code|pre)/);
  });

  it('should style links', () => {
    expect(css).toContain('.markdown-body a');
  });

  it('should style tables', () => {
    expect(css).toContain('.markdown-body table');
  });

  it('should style blockquotes', () => {
    expect(css).toContain('.markdown-body blockquote');
  });
});
