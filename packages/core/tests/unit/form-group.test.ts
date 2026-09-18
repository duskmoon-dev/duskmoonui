import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../../src/components/form-group.css', import.meta.url), 'utf8');

describe('Form Group composition', () => {
  it('retains native grouping, labels and helper APIs', () => {
    for (const name of ['form-group', 'form-group-horizontal', 'form-control', 'form-label',
      'form-label-required', 'form-label-optional', 'form-label-sm', 'form-label-lg', 'label',
      'label-text', 'label-text-alt', 'helper-text', 'helper-text-error', 'helper-text-success',
      'helper-text-warning', 'helper-text-info', 'helper-text-icon', 'form-hint',
      'fieldset', 'fieldset-legend', 'fieldset-filled', 'fieldset-borderless', 'fieldset-card'])
      expect(css).toContain('.' + name);
    expect(css).toContain("content: ' *'");
    expect(css).toMatch(/\.fieldset-card[^}]*var\(--shadow-xs\)/s);
  });

  it('retains responsive layouts, actions and application-updated counter presentation', () => {
    for (const name of ['form-row', 'form-grid', 'form-grid-2', 'form-grid-3', 'form-grid-4',
      'form-inline', 'form-section', 'form-section-title', 'form-section-description',
      'form-actions', 'form-actions-right', 'form-actions-center', 'form-actions-between',
      'form-divider', 'form-divider-text', 'form-counter', 'form-counter-error'])
      expect(css).toContain('.' + name);
    expect(css).toContain('max-width: 640px');
    expect(css).toContain('min-inline-size: 0');
    expect(css).toContain('.form-group-disabled');
  });

  it('reuses shared validation without maintaining competing rules', () => {
    expect(css).toContain('@import "./validator.css";');
    expect(css).not.toMatch(/:user-invalid|:user-valid|:invalid|:valid|aria-invalid/);
    expect(css).not.toMatch(/\.input\s*\{|\.select\s*\{|\.textarea\s*\{/);
  });
});
