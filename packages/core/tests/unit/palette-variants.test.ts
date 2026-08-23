import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const roles = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'neutral',
  'base',
  'info',
  'success',
  'warning',
  'error',
] as const;

const colorableComponents = [
  ['alert', 'alert'],
  ['appbar', 'appbar'],
  ['autocomplete', 'autocomplete'],
  ['avatar', 'avatar'],
  ['badge', 'badge'],
  ['button', 'btn'],
  ['card', 'card'],
  ['cascader', 'cascader'],
  ['chat', 'chat-bubble'],
  ['checkbox', 'checkbox'],
  ['chip', 'chip'],
  ['circle-menu', 'circle-menu'],
  ['collapse', 'collapse'],
  ['datepicker', 'datepicker'],
  ['divider', 'divider'],
  ['file-upload', 'file-upload'],
  ['input', 'input'],
  ['multi-select', 'multi-select'],
  ['navigation', 'navbar'],
  ['otp-input', 'otp-input'],
  ['pin-input', 'pin-input'],
  ['progress', 'progress'],
  ['radio', 'radio'],
  ['rating', 'rating'],
  ['segment-control', 'segment-control'],
  ['select', 'select'],
  ['slider', 'slider'],
  ['snackbar', 'snackbar'],
  ['switch', 'switch'],
  ['textarea', 'textarea'],
  ['time-input', 'time-input'],
  ['toast', 'toast'],
  ['toggle', 'toggle-btn'],
  ['tooltip', 'tooltip'],
  ['tree-select', 'tree-select'],
] as const;

describe('Complete component palette', () => {
  for (const [file, prefix] of colorableComponents) {
    const css = readFileSync(
      resolve(import.meta.dir, `../../src/components/${file}.css`),
      'utf-8',
    );

    it(`${prefix} exposes all ten semantic color roles`, () => {
      for (const role of roles) {
        expect(css).toMatch(
          new RegExp(`\\.${prefix}-${role}(?=[\\s.:\\[,{])`),
        );
      }
    });

    it(`${prefix} maps the extended roles to existing theme tokens`, () => {
      for (const role of ['accent', 'neutral'] as const) {
        expect(css).toMatch(
          new RegExp(
            `\\.${prefix}-${role}[^{}]*\\{[^}]*var\\(--color-${role}(?:-content)?\\)`,
            's',
          ),
        );
      }

      expect(css).toMatch(
        new RegExp(
          `\\.${prefix}-base[^{}]*\\{[^}]*var\\(--color-base-(?:100|200|content)\\)`,
          's',
        ),
      );
    });
  }
});
