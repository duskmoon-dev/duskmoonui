import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Popover Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/popover.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .popover class', () => {
    expect(css).toContain('.popover');
  });

  it('should define .popover-content class', () => {
    expect(css).toContain('.popover-content');
  });

  it('should use absolute positioning for content', () => {
    expect(css).toMatch(/\.popover-content[^}]*position:\s*absolute/s);
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should use shadow token for elevation', () => {
    expect(css).toContain('var(--shadow-');
  });

  it('should define show state', () => {
    expect(css).toContain('.show');
  });

  it('should have transition for open/close animation', () => {
    expect(css).toContain('transition');
  });

  it('should use z-index for layering', () => {
    expect(css).toContain('z-index');
  });
});
