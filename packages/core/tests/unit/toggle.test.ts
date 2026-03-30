import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Toggle Button Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/toggle.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .toggle-btn base class', () => {
    expect(css).toContain('.toggle-btn');
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should define pressed/active state', () => {
    expect(css).toMatch(/\.toggle-btn-pressed|\.toggle-btn\.active|\.pressed/);
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.toggle-btn:disabled/);
  });

  it('should define color variants', () => {
    expect(css).toMatch(/\.toggle-btn-primary|\.toggle-btn-secondary/);
  });

  it('should have hover state', () => {
    expect(css).toMatch(/\.toggle-btn:hover/);
  });

  it('should have transition for state changes', () => {
    expect(css).toContain('transition');
  });

  it('should define size variants', () => {
    expect(css).toMatch(/\.toggle-btn-sm|\.toggle-btn-lg/);
  });
});
