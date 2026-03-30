import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Time Input Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/time-input.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .time-input class', () => {
    expect(css).toContain('.time-input');
  });

  it('should define .time-input-field class', () => {
    expect(css).toContain('.time-input-field');
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring', () => {
    expect(css).toMatch(/\.time-input-field:focus/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.time-input-field:disabled/);
  });

  it('should have transition for smooth interaction', () => {
    expect(css).toContain('transition');
  });
});
