import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const read = (name: string) => readFileSync(join(root, 'src/components', name + '.css'), 'utf8');

describe('Legacy Form consolidation', () => {
  it('is an import-only wrapper over authoritative native controls and composition', () => {
    const source = read('form');
    for (const name of ['input', 'checkbox', 'radio', 'toggle-switch', 'select', 'textarea', 'range', 'form-group'])
      expect(source).toContain('@import "./' + name + '.css";');
    expect(source).not.toContain('@layer');
    expect(source).not.toMatch(/::before|::after|:checked|border-color:/);
  });

  it('preserves control and color APIs in their canonical homes', () => {
    for (const name of ['input', 'checkbox', 'radio', 'select', 'textarea', 'range']) {
      const css = read(name);
      expect(css).toContain('.' + name);
      for (const color of ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'])
        expect(css).toContain('.' + name + '-' + color);
      expect(css).toContain(':focus-visible');
      expect(css).toContain(':disabled');
    }
    expect(read('toggle-switch')).toContain('.toggle-xs');
    expect(read('toggle-switch')).toContain('.toggle-lg');
  });

  it('owns labels, helpers and legacy form-control spacing in composition only', () => {
    const css = read('form-group');
    for (const name of ['label', 'label-text', 'label-text-alt', 'form-control', 'helper-text', 'fieldset'])
      expect(css).toContain('.' + name);
    expect(css).toContain('margin-bottom: 1rem');
    expect(css).toContain('.helper-text.error');
    expect(css).toContain('.label-text.required::after');
  });

  it('has one checkbox/radio mark and no second after-mark even in built aggregate', () => {
    for (const css of [read('checkbox'), read('radio'), readFileSync(join(root, 'dist/index.css'), 'utf8')]) {
      expect(css).not.toMatch(/\.(checkbox|radio):checked::after/);
    }
    expect(read('checkbox')).toContain('.checkbox:checked::before');
    expect(read('radio')).toContain('.radio:checked::before');
  });
});
