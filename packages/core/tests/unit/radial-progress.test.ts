import { describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Radial progress component', () => {
  it('uses a clamped percentage interface and preserves circular progress', async () => {
    const radial = await readFile(resolve(__dirname, '../../src/components/radial-progress.css'), 'utf8');
    const progress = await readFile(resolve(__dirname, '../../src/components/progress.css'), 'utf8');
    expect(radial).toContain('--radial-progress-value: 0');
    expect(radial).toContain('clamp(0, var(--radial-progress-value), 100)');
    for (const token of ['--radial-progress-size', '--radial-progress-thickness']) expect(radial).toContain(token);
    expect(radial).toContain('.radial-progress-success');
    expect(radial).toContain('prefers-reduced-motion');
    expect(progress).toContain('.progress-circular');
  });
});
