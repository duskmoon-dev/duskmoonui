import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('Bottom Sheet Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/bottomsheet.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define .bottomsheet class', () => {
    expect(css).toContain('.bottomsheet');
  });

  it('should define .bottomsheet-backdrop class', () => {
    expect(css).toContain('.bottomsheet-backdrop');
  });

  it('should be fixed positioned', () => {
    expect(css).toMatch(/\.bottomsheet[^{]*\{[^}]*position:\s*fixed/s);
  });

  it('should define show state', () => {
    expect(css).toContain('.show');
  });

  it('should have z-index for layering', () => {
    expect(css).toContain('z-index');
  });

  it('should have transition for animation', () => {
    expect(css).toContain('transition');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  describe('Native surfaces', () => {
    it('keeps closed native surfaces out of layout and keyboard navigation', () => {
      expect(css).toContain('.bottomsheet[popover]:not(:popover-open),');
      expect(css).toMatch(/dialog\.bottomsheet:not\(\[open\]\)\s*\{[^}]*display:\s*none/s);
    });

    it('opens from native state without a legacy visibility class', () => {
      expect(css).toContain('.bottomsheet[popover]:popover-open,');
      expect(css).toMatch(/dialog\.bottomsheet\[open\]\s*\{[^}]*display:\s*flex;[^}]*transform:\s*translate\(0, 0\)/s);
    });

    it('resets native surface geometry and preserves top-layer exit transitions', () => {
      expect(css).toContain(':where(.bottomsheet[popover], dialog.bottomsheet)');
      expect(css).toContain('width: auto;');
      expect(css).toContain('height: auto;');
      expect(css).toContain('display 300ms allow-discrete');
      expect(css).toContain('overlay 300ms allow-discrete');
      expect(css).toContain('@starting-style');
      expect(css).toContain('dialog.bottomsheet::backdrop');
    });
  });

});
