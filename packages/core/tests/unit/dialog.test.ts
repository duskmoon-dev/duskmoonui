import { describe, it, expect, beforeAll } from 'bun:test';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { generatePluginCSS } from '../../src/index';

describe('Dialog Component', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(resolve(__dirname, '../../src/components/dialog.css'), 'utf-8');
  });

  it('should include @layer components directive', () => {
    expect(css).toContain('@layer components');
  });

  it('should define dialog.dialog class for native dialog element', () => {
    expect(css).toContain('dialog.dialog');
  });

  it('keeps generated plugin dialogs native and lets the browser own visibility', () => {
    const generated = generatePluginCSS({ components: ['dialog'], base: false });
    expect(generated).toContain('dialog.dialog {');
    expect(generated).toContain('dialog.dialog::backdrop {');
    expect(generated).not.toContain('.dialog-backdrop');
    const base = generated.match(/dialog\.dialog\s*\{([^}]+)\}/)?.[1];
    expect(base).toBeDefined();
    expect(base).not.toMatch(/(?:display|visibility|opacity|transform):/);
  });

  it('prefixes native dialog roots, backdrops, modifiers, and state descendants', () => {
    const generated = generatePluginCSS({ components: ['modal', 'dialog'], base: false, prefix: 'dm-' });
    expect(generated).toContain('dialog.dm-dialog {');
    expect(generated).toContain('dialog.dm-dialog::backdrop {');
    expect(generated).toContain('dialog.dm-dialog.dm-dialog-sm {');
    expect(generated).toContain('dialog.dm-modal {');
    expect(generated).toContain('dialog.dm-modal::backdrop {');
    expect(generated).toContain('dialog.dm-modal[open] .dm-modal-box {');
    expect(generated).toContain('dialog.dm-modal.dm-modal-sm {');
  });

  it('should define .dialog-box class', () => {
    expect(css).toContain('.dialog-box');
  });

  it('should define .dialog-header class', () => {
    expect(css).toContain('.dialog-header');
  });

  it('should use native ::backdrop pseudo-element', () => {
    expect(css).toContain('::backdrop');
  });

  it('should use surface color token for background', () => {
    expect(css).toContain('var(--color-surface)');
  });

  it('should use on-surface color token for text', () => {
    expect(css).toContain('var(--color-on-surface)');
  });

  it('should use shadow token for elevation', () => {
    expect(css).toContain('var(--shadow-');
  });

  it('should have border-radius for rounded corners', () => {
    expect(css).toMatch(/border-radius:\s*var\(--radius-2xl\)/);
  });

  it('should constrain content to the dynamic viewport and wrap actions', () => {
    expect(css).toContain('100dvh');
    expect(css).toMatch(/\.dialog-footer\s*\{[^}]*flex-wrap:\s*wrap/s);
  });

  it('should provide compact mobile spacing without changing native state', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*640px\)/);
    expect(css).not.toMatch(/dialog\.dialog(?:\[[^\]]+\])?\s*\{[^}]*(?:display|visibility):/s);
  });
});
