import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('FAB / Speed Dial component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(import.meta.dir, '../../src/components/fab.css'), 'utf8');
  });

  it('defines placement variables, safe-area offsets, and contained placement', () => {
    expect(css).toContain('.fab {');
    expect(css).toContain('--fab-offset-block');
    expect(css).toContain('--fab-offset-inline');
    expect(css).toContain('env(safe-area-inset-bottom');
    expect(css).toMatch(/\.fab-contained\s*\{[^}]*position:\s*absolute/s);
    expect(css).toMatch(/\.fab-start\s*\{[^}]*inset-inline-start:/s);
  });

  it('provides trigger, extended, action, and label composition classes', () => {
    for (const className of [
      'fab-speed-dial',
      'fab-trigger',
      'fab-extended',
      'fab-actions',
      'fab-action',
      'fab-label',
    ]) {
      expect(css).toContain(`.${className}`);
    }
    expect(css).not.toMatch(/background-color:[^;]*(?:primary|secondary|tertiary)/);
  });

  it('keeps controlled and native state authorities independent', () => {
    expect(css).toMatch(/\.fab-controlled\s*>\s*\.fab-actions:not\(\[popover\]\)\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(/\.fab-controlled\.fab-open\s*>\s*\.fab-actions:not\(\[popover\]\)\s*\{[^}]*display:\s*flex/s);
    expect(css).toMatch(/\.fab-actions\[popover\]:popover-open\s*\{[^}]*display:\s*flex/s);
    expect(css).not.toMatch(/\.fab-open[^,{]*\.fab-actions\[popover\]/);
  });

  it('removes closed native actions from layout and interaction', () => {
    expect(css).toMatch(/\.fab-actions\[popover\]\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(/\.fab-actions\[popover\]\s*\{[^}]*visibility:\s*hidden/s);
    expect(css).toMatch(/\.fab-actions\[popover\]\s*\{[^}]*pointer-events:\s*none/s);
    expect(css).toMatch(/\.fab-actions\[popover\]:popover-open\s*\{[^}]*pointer-events:\s*auto/s);
  });

  it('supports anchor positioning fallback and reduced motion', () => {
    expect(css).toContain('@supports (position-area: top)');
    expect(css).toContain('position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
