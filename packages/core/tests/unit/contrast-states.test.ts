import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const componentCss = (name: string) =>
  readFileSync(resolve(__dirname, `../../src/components/${name}.css`), 'utf-8');

describe('Component contrast states', () => {
  it('keeps colored navbar links on the navbar content color', () => {
    for (const name of ['navigation', 'navbar']) {
      expect(componentCss(name)).toMatch(
        /\.navbar a\s*\{[^}]*color:\s*inherit/s,
      );
    }
  });

  it('does not fade visible disabled text below the audited AA threshold', () => {
    const states = [
      ['chip', '.chip-disabled', '0.7'],
      ['collapse', '.collapse-disabled', '0.7'],
      ['list', '.list-item-disabled', '0.7'],
      ['breadcrumbs', '.breadcrumb-item-disabled', '1'],
      ['navigation', '.breadcrumb-item-disabled', '1'],
      ['nested-menu', '.nested-menu li.disabled', '1'],
      ['stepper', '.stepper-step-disabled .stepper-step-button', '0.7'],
    ];

    for (const [name, selector, opacity] of states) {
      const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(componentCss(name)).toMatch(
        new RegExp(`${escapedSelector}\\s*\\{[^}]*opacity:\\s*${opacity}`, 's'),
      );
    }
  });

  it('renders placeholders and calendar secondary text without low opacity', () => {
    expect(componentCss('multi-select')).toMatch(
      /\.multi-select-placeholder\s*\{[^}]*color:\s*var\(--color-on-surface-variant\);[^}]*\}/s,
    );
    expect(componentCss('datepicker')).not.toMatch(
      /\.datepicker-day-(?:other-month|disabled)\s*\{[^}]*opacity:\s*0\.[0-8]/s,
    );
  });
});
