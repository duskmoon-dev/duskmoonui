import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';

const read = (name: string) => readFileSync(new URL('../../src/components/' + name + '.css', import.meta.url), 'utf8');

describe('Data Input CSS contracts', () => {
  it('has one validation authority imported by every supported native control', () => {
    for (const name of ['input', 'select', 'textarea', 'checkbox', 'radio', 'switch', 'toggle-switch', 'file-input', 'otp-input', 'datepicker'])
      expect(read(name)).toContain('@import "./validator.css";');
    const css = read('validator');
    expect(css).toContain('.validator:user-invalid');
    expect(css).toContain('.validator.validator-success:user-valid');
    expect(css).toContain('.validate :valid');
    expect(css).toContain('.validate :invalid');
    expect(css).toContain('[aria-invalid="true"]');
    expect(css).toContain(':not(:where(.form-group-error *, .form-control.error *))');
    expect(css).not.toContain('!important');
  });
  it('retains OTP aliases while avoiding hidden native input and simulated behavior', () => {
    const css = read('otp-input');
    for (const name of ['otp-input-underline', 'otp-input-underlined', 'otp-separator',
      'otp-input-separator', 'otp-helper', 'otp-input-helper', 'otp-error-message',
      'otp-input-helper-error', 'otp-input-helper-success', 'otp-code', 'otp-code-4'])
      expect(css).toContain('.' + name);
    expect(css).not.toContain('caret-transparent');
    expect(css).not.toContain('letter-spacing');
    expect(css).not.toContain('otp-input-field-focused');
  });
  it('composes native filters from Chip and preserves semantic Rating and Toggle ownership', () => {
    expect(read('filter-group')).toContain('@import "./chip.css";');
    expect(read('filter-group')).not.toMatch(/\.filter\s*\{/);
    expect(read('filter-group')).toContain('.filter-group-input:checked');
    expect(read('rating')).toContain('.rating-input:checked');
    expect(read('rating')).toContain(':not(.rating-native)');
    expect(read('toggle')).toContain('[aria-pressed="true"]');
    expect(read('toggle')).toContain('.active:not([aria-pressed])');
  });
});
