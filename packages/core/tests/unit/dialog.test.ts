import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Dialog Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/dialog.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define dialog.dialog class for native dialog element', () => {
    expect(css).toContain('dialog.dialog');
  });

  it('should define .dialog-box class', () => {
    expect(css).toContain('.dialog-box');
  });

  it('should define .dialog-header class', () => {
    expect(css).toContain('.dialog-header');
  });

  it('should use native ::backdrop pseudo-element', () => {
    expect(css).toContain('::backdrop');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should use on-surface color token for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should use shadow token for elevation', () => {
    expect(css).toContain('var(--shadow-');
  });

  it('should have border-radius for rounded corners', () => {
    expect(css).toMatch(/border-radius:\s*1\.5rem/);
  });
});
