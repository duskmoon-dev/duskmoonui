import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('OTP Input Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/otp-input.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .otp-input class', () => {
    expect(css).toContain('.otp-input');
  });

  it('should define .otp-input-field class', () => {
    expect(css).toContain('.otp-input-field');
  });

  it('should use text-align center for digit input', () => {
    expect(css).toMatch(/text-align:\s*center/);
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring on focused field', () => {
    expect(css).toMatch(/\.otp-input-field:focus/);
  });

  it('should use primary color token for caret', () => {
    expect(css).toContain('var(--color-primary)');
  });

  it('should use surface color for background', () => {
    expect(css).toContain('var(--color-surface)');
  });
});
