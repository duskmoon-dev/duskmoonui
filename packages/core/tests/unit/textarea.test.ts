import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Textarea Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/textarea.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .textarea-container class', () => {
    expect(css).toContain('.textarea-container');
  });

  it('should define .textarea class', () => {
    expect(css).toContain('.textarea');
  });

  it('should define .textarea-label class', () => {
    expect(css).toContain('.textarea-label');
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.textarea:disabled|\.textarea\[disabled\]/);
  });

  it('should define color variants', () => {
    expect(css).toContain('.textarea-primary');
    expect(css).toContain('.textarea-error');
  });

  it('should use on-surface color for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should have transition for smooth interaction', () => {
    expect(css).toContain('transition');
  });
});
