import { describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Loading component', () => {
  it('provides standalone shapes, sizes, colors, and reduced-motion behavior', async () => {
    const css = await readFile(resolve(__dirname, '../../src/components/loading.css'), 'utf8');
    for (const shape of ['loading-spinner', 'loading-dots', 'loading-bars']) expect(css).toContain(`.${shape}`);
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) expect(css).toContain(`.loading-${size}`);
    for (const color of ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']) expect(css).toContain(`.loading-${color}`);
    expect(css).toContain('--loading-size');
    expect(css).toContain('currentColor');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
