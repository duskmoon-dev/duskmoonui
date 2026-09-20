import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Dropdown component', () => {
  let css: string;
  let navigationCss: string;

  beforeAll(async () => {
    [css, navigationCss] = await Promise.all([
      readFile(resolve(import.meta.dir, '../../src/components/dropdown.css'), 'utf8'),
      readFile(resolve(import.meta.dir, '../../src/components/navigation.css'), 'utf8'),
    ]);
  });

  it('keeps Navigation compatibility through one canonical import', () => {
    expect(navigationCss).toContain('@import "./dropdown.css"');
    expect(navigationCss).not.toMatch(/^\s*\.dropdown-content\s*\{/m);
  });

  it('uses Popover state as the only visibility authority', () => {
    expect(css).toMatch(/\.dropdown\s*>\s*\.dropdown-content\[popover\]\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(/\.dropdown\s*>\s*\.dropdown-content\[popover\]:popover-open\s*\{[^}]*display:\s*block/s);
    expect(css).not.toMatch(/:(?:hover|focus-within)/);
    expect(css).not.toMatch(/dropdown-(?:popover|details|controlled|hover|open)/);
    expect(css).not.toContain('.dropdown-open');
  });

  it('provides logical placement and collision fallbacks', () => {
    for (const className of [
      'dropdown-block-start',
      'dropdown-block-end',
      'dropdown-inline-start',
      'dropdown-inline-end',
    ]) {
      expect(css).toContain(`.${className}`);
    }
    expect(css).toContain('@supports (position-area: block-end)');
    expect(css).toContain('position-area: block-end span-inline-end');
    expect(css).toContain('position-area: inline-start span-block-end');
    expect(css).toContain('position-area: inline-end span-block-end');
    expect(css).toContain('position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline');
    expect(css).toMatch(/inset-block-end:\s*max\(0\.5rem, env\(safe-area-inset-bottom/);
    expect(css).toMatch(/inset-inline-end:\s*max\([^;]*safe-area-inset-left[^;]*safe-area-inset-right/s);
  });

  it('keeps closed content inert and honors reduced motion', () => {
    expect(css).toMatch(/\.dropdown\s*>\s*\.dropdown-content\[popover\]\s*\{[^}]*visibility:\s*hidden/s);
    expect(css).toMatch(/\.dropdown\s*>\s*\.dropdown-content\[popover\]\s*\{[^}]*pointer-events:\s*none/s);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
