import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Divider Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/divider.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .divider base class', () => {
    expect(css).toContain('.divider');
  });

  it('should define .divider-vertical class', () => {
    expect(css).toContain('.divider-vertical');
  });

  it('should use flexbox layout', () => {
    expect(css).toMatch(/\.divider[^{]*\{[^}]*display:\s*flex/s);
  });

  it('should use ::before and ::after pseudo-elements for lines', () => {
    expect(css).toContain('.divider::before');
    expect(css).toContain('.divider::after');
  });

  it('should use outline-variant color token for line color', () => {
    expect(css).toContain('var(--color-outline-variant)');
  });

  it('should define alignment variants', () => {
    expect(css).toMatch(/\.divider-start|\.divider-end/);
  });
});
