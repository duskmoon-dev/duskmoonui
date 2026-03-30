import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('File Upload Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/file-upload.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .file-upload class', () => {
    expect(css).toContain('.file-upload');
  });

  it('should define .file-upload-dropzone class', () => {
    expect(css).toContain('.file-upload-dropzone');
  });

  it('should have dashed border for drop zone', () => {
    expect(css).toMatch(/border[^}]*dashed/s);
  });

  it('should have focus-within ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should define hover state for drop zone', () => {
    expect(css).toMatch(/\.file-upload-dropzone:hover/);
  });

  it('should have transition for drag interactions', () => {
    expect(css).toContain('transition');
  });
});
