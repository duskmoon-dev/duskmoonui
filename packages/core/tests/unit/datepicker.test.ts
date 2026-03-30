import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Datepicker Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/datepicker.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .datepicker class', () => {
    expect(css).toContain('.datepicker');
  });

  it('should define .datepicker-input class', () => {
    expect(css).toContain('.datepicker-input');
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for smooth interaction', () => {
    expect(css).toContain('transition');
  });

  it('should define .datepicker-calendar or calendar panel class', () => {
    expect(css).toMatch(/\.datepicker-calendar|\.datepicker-panel|\.datepicker-dropdown/);
  });
});
