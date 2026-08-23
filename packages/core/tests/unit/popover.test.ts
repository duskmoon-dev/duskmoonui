/**
 * Unit tests for popover component (Popover API + CSS Anchor Positioning)
 */

import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Popover Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(__dirname, '../../src/components/popover.css'),
      'utf-8'
    );
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .popover[popover] surface', () => {
    expect(css).toContain('.popover[popover]');
  });

  it('should open with :popover-open', () => {
    expect(css).toContain('.popover[popover]:popover-open');
  });

  it('should use position-area', () => {
    expect(css).toContain('position-area:');
  });

  it('should use position-try-fallbacks', () => {
    expect(css).toContain('position-try-fallbacks:');
  });

  it('should map position variants to position-area', () => {
    expect(css).toMatch(
      /\.popover-top\[popover\]\s*\{[^}]*position-area:\s*top/s
    );
    expect(css).toMatch(
      /\.popover-bottom\[popover\]\s*\{[^}]*position-area:\s*bottom/s
    );
    expect(css).toMatch(
      /\.popover-left\[popover\]\s*\{[^}]*position-area:\s*left/s
    );
    expect(css).toMatch(
      /\.popover-right\[popover\]\s*\{[^}]*position-area:\s*right/s
    );
  });

  it('should not use legacy class-based show positioning', () => {
    expect(css).not.toContain('.popover:not([popover])');
    expect(css).not.toContain('.popover-show');
    expect(css).not.toContain('anchor(bottom)');
    expect(css).not.toContain('[style*="position-anchor"]');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should use shadow token for elevation', () => {
    expect(css).toContain('var(--shadow-');
  });

  it('should define structural classes', () => {
    expect(css).toContain('.popover-header');
    expect(css).toContain('.popover-body');
    expect(css).toContain('.popover-footer');
    expect(css).toContain('.popover-title');
  });

  it('should have transition for open/close animation', () => {
    expect(css).toContain('transition');
  });

  it('should use z-index for layering', () => {
    expect(css).toContain('z-index');
  });
});
