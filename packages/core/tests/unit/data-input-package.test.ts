import { beforeAll, afterAll, describe, expect, it } from 'bun:test';
import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import postcss from 'postcss';

const core = join(import.meta.dir, '../..');
const components = ['form', 'form-group', 'validator', 'input', 'checkbox', 'radio',
  'switch', 'toggle', 'toggle-switch', 'select', 'textarea', 'file-input', 'file-upload',
  'range', 'slider', 'rating', 'filter-group', 'otp-input', 'datepicker', 'autocomplete'];
let staging: string;
let packed: string;

describe('Packed Data Input public API', () => {
  beforeAll(() => {
    staging = mkdtempSync(join(tmpdir(), 'duskmoon-data-input-'));
    const report = JSON.parse(execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', staging], { cwd: core, encoding: 'utf8' }));
    execFileSync('tar', ['-xzf', join(staging, report[0].filename), '-C', staging]);
    packed = join(staging, 'package');
  });
  afterAll(() => rmSync(staging, { recursive: true, force: true }));

  it('resolves packed CSS, SSR modules, declarations and the shared base export', () => {
    const pkg = JSON.parse(readFileSync(join(packed, 'package.json'), 'utf8'));
    expect(existsSync(join(packed, pkg.exports['./base.css']))).toBe(true);
    for (const name of components) {
      const entry = pkg.exports['./components/' + name];
      for (const field of ['style', 'import', 'types']) expect(existsSync(join(packed, entry[field]))).toBe(true);
      expect(readFileSync(join(packed, entry.style), 'utf8')).not.toMatch(/^\s*@import/m);
      execFileSync('node', ['--input-type=module', '-e', `
        import {createRequire} from 'node:module';
        import {realpathSync} from 'node:fs';
        const require=createRequire(${JSON.stringify(join(packed, 'package.json'))});
        const module=await import(require.resolve('@duskmoon-dev/core/components/${name}'));
        if(typeof module.css!=='string'||module.styles!==null||module.default!==null) throw Error('SSR export');
        if(require.resolve('@duskmoon-dev/core/components/${name}.css')!==realpathSync(${JSON.stringify(join(packed, entry.style))})) throw Error('CSS export');
      `]);
    }
  });

  it('ships consolidated defaults and all compatibility dependencies without unresolved imports', () => {
    for (const file of ['index.css', 'components/index.css', 'standalone/duskmoonui.css']) {
      const css = readFileSync(join(packed, 'dist', file), 'utf8');
      expect(css).not.toMatch(/^\s*@import/m);
      for (const name of ['checkbox', 'radio', 'select', 'textarea', 'range', 'file-input', 'otp-code', 'filter-group'])
        expect(css).toContain('.' + name);
      expect(css).not.toMatch(/\.(checkbox|radio):checked::after/);
      const ast = postcss.parse(css);
      for (const name of ['checkbox', 'radio', 'select', 'textarea']) {
        const property = name === 'checkbox' ? '--checkbox-size' : name === 'radio' ? '--radio-size' : name === 'select' ? 'appearance' : 'field-sizing';
        let definitions = 0;
        ast.walkRules('.' + name, rule => {
          if (rule.nodes.some(node => node.type === 'decl' && node.prop === property)) definitions++;
        });
        expect(definitions).toBe(1);
      }
    }
    const form = readFileSync(join(packed, 'dist/components/form.css'), 'utf8');
    for (const name of ['checkbox', 'radio', 'toggle', 'select', 'textarea', 'range', 'file-input', 'form-label'])
      expect(form).toContain('.' + name);
  });

  it('typechecks packed stylesheet modules and every Data Input ComponentName', () => {
    const imports = components.map((name, index) => `import {css as c${index},styles as s${index}} from './package/dist/esm/components/${name}.js'; const text${index}:string=c${index}; const sheet${index}:CSSStyleSheet|null=s${index};`);
    imports.push(`import type {ComponentName} from './package/dist/types/types/index'; const names:ComponentName[]=${JSON.stringify(components)};`);
    const fixture = join(staging, 'consumer.ts');
    writeFileSync(fixture, imports.join('\n'));
    execFileSync(join(core, 'node_modules/.bin/tsc'), ['--noEmit', '--strict', '--skipLibCheck', '--lib', 'ES2022,DOM', '--module', 'ESNext', '--moduleResolution', 'bundler', fixture], { cwd: staging });
  });

  it('compiles new and retained candidates from the packed standalone plugin in Node', () => {
    execFileSync('node', ['--input-type=module', '-e', `
      import {createRequire} from 'node:module';
      const require=createRequire(${JSON.stringify(join(core, 'package.json'))});
      const {compile}=require('tailwindcss');
      const module=await import(${JSON.stringify(join(packed, 'dist/standalone/duskmoonui.mjs'))});
      const compiler=await compile('@plugin "duskmoonui";\\n@tailwind utilities;', {
        loadModule:async()=>({module:module.default,base:${JSON.stringify(packed)}})
      });
      const names=['input','validator','validator-success','otp-code','otp-code-4','filter-group','filter-group-input','chip','rating','rating-native','rating-input','rating-item','range','file-input','toggle','toggle-btn'];
      const css=compiler.build(names);
      for(const name of names) if(!css.includes('.'+name)) throw Error('Missing '+name);
      if(/^\\s*@import/m.test(css)) throw Error('Unresolved import');
    `], { cwd: core });
  });

  if (process.env.DATA_INPUT_PACKED_BROWSER === '1') {
    it('runs interaction and rendering acceptance against the extracted package', () => {
      execFileSync('bun', ['run', 'test:data-input', 'tests/data-input/controls.spec.ts', 'tests/data-input/autocomplete.spec.ts'], {
        cwd: core,
        env: { ...process.env, DATA_INPUT_CORE_DIR: packed },
        stdio: 'inherit',
      });
    }, 120_000);
  }
});
