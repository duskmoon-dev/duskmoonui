import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Autocomplete Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/autocomplete.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .autocomplete container class', () => {
    expect(css).toContain('.autocomplete');
  });

  it('should define .autocomplete-input class', () => {
    expect(css).toContain('.autocomplete-input');
  });

  it('should define .autocomplete-dropdown class', () => {
    expect(css).toContain('.autocomplete-dropdown');
  });

  it('should use currentColor border pattern', () => {
    expect(css).toContain('currentColor');
  });

  it('should have focus ring using color-mix', () => {
    expect(css).toContain('color-mix(in oklch, currentColor');
  });

  it('should define disabled state', () => {
    expect(css).toMatch(/\.autocomplete-input:disabled/);
  });

  it('should use surface color tokens', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should have transition for smooth interaction', () => {
    expect(css).toContain('transition');
  });
});
