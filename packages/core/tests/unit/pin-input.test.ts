import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('PIN Input Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/pin-input.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .pin-input class', () => {
    expect(css).toContain('.pin-input');
  });

  it('should define .pin-input-field class', () => {
    expect(css).toContain('.pin-input-field');
  });

  it('should use text-align center for digit input', () => {
    expect(css).toMatch(/text-align:\s*center/);
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring on focused field', () => {
    expect(css).toMatch(/\.pin-input-field:focus/);
  });

  it('should use primary color token', () => {
    expect(css).toContain('var(--color-primary)');
  });

  it('should have transition for smooth interaction', () => {
    expect(css).toContain('transition');
  });
});
