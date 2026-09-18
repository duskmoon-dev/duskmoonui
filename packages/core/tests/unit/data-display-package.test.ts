import { beforeAll, afterAll, describe, expect, it } from 'bun:test';
import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const core = join(import.meta.dir, '../..');
const components = ['accordion','avatar','badge','card','carousel','chat','collapse','countdown','diff','kbd','list','stat','indicator','table','timeline'];
const effects = ['aura','hover-3d','hover-gallery','text-rotate'];
let staging: string;
let packed: string;

describe('Packed Data Display public API', () => {
  beforeAll(() => {
    staging = mkdtempSync(join(tmpdir(), 'duskmoon-data-display-'));
    const report = JSON.parse(execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', staging], { cwd:core, encoding:'utf8' }));
    execFileSync('tar', ['-xzf', join(staging,report[0].filename), '-C', staging]);
    packed = join(staging,'package');
  });
  afterAll(() => rmSync(staging, {recursive:true,force:true}));

  it('includes all 19 individual CSS/ESM/declaration exports and resolves SSR safely', () => {
    const pkg = JSON.parse(readFileSync(join(packed,'package.json'),'utf8'));
    expect(pkg.exports['./components/status']).toBeUndefined();
    expect(existsSync(join(packed,'dist/components/status.css'))).toBe(false);
    for (const [folder,names] of [['components',components],['effects',effects]] as const) {
      for (const name of names) {
        const entry = pkg.exports[`./${folder}/${name}`];
        for (const field of ['style','import','types']) expect(existsSync(join(packed,entry[field]))).toBe(true);
        expect(readFileSync(join(packed,entry.style),'utf8')).not.toMatch(/^\s*@import/m);
        execFileSync('node',['--input-type=module','-e',`import {createRequire} from 'node:module';import {realpathSync} from 'node:fs';const require=createRequire(${JSON.stringify(join(packed,'package.json'))});const m=await import(require.resolve('@duskmoon-dev/core/${folder}/${name}'));if(typeof m.css!=='string'||m.styles!==null||m.default!==null)process.exit(1);if(require.resolve('@duskmoon-dev/core/${folder}/${name}.css')!==realpathSync(${JSON.stringify(join(packed,entry.style))}))process.exit(1);`]);
      }
    }
    expect(existsSync(join(packed,pkg.exports['./effects'].style))).toBe(true);
    expect(pkg.exports['./components/*.css']).toBe('./dist/components/*.css');
    expect(pkg.exports['./effects/*.css']).toBe('./dist/effects/*.css');
  });
  it('includes default components once and excludes effects from every default', () => {
    for (const asset of ['dist/index.css','dist/components/index.css','dist/standalone/duskmoonui.css','dist/standalone/duskmoonui.mjs','dist/standalone/duskmoonui.js']) {
      const css = readFileSync(join(packed,asset),'utf8');
      for (const effect of effects) expect(css).not.toContain(`.${effect}`);
      for (const name of ['indicator','kbd','carousel','countdown','diff','stat']) expect(css).toContain(`.${name}`);
      if(asset.endsWith('.css')) {
        expect(css.match(/^\s*\.indicator\s*\{/gm)).toHaveLength(1);
        expect(css.match(/^\s*\.kbd\s*\{/gm)).toHaveLength(1);
      }
    }
  });
  it('preserves shipped compatibility aliases', () => {
    for(const [name,aliases] of [
      ['avatar',['avatar-online','avatar-offline','avatar-status-online','avatar-status-offline']],
      ['badge',['badge-outline','badge-outlined','badge-soft']],
      ['table',['table-striped','table-zebra','selected','table-row-selected']],
      ['accordion',['open','accordion-item-open']],['collapse',['show','collapse-open','collapse-closed']],
    ] as const) {
      const css=readFileSync(join(packed,`dist/components/${name}.css`),'utf8');
      for(const alias of aliases) expect(css).toContain(`.${alias}`);
    }
  });
  it('typechecks all packed stylesheet declarations and the new ComponentName values', () => {
    const imports=[...components.map(name=>({folder:'components',name})),...effects.map(name=>({folder:'effects',name}))]
      .map(({folder,name},index)=>`import {css as css${index},styles as styles${index}} from './package/dist/esm/${folder}/${name}.js'; const text${index}:string=css${index}; const sheet${index}:CSSStyleSheet|null=styles${index};`);
    imports.push(`import type {ComponentName} from './package/dist/types/types/index'; const names:ComponentName[]=['stat','indicator','kbd','carousel','countdown','diff'];`);
    const fixture=join(staging,'consumer.ts');
    writeFileSync(fixture,imports.join('\n'));
    execFileSync(join(core,'node_modules/.bin/tsc'),['--noEmit','--strict','--skipLibCheck','--lib','ES2022,DOM','--module','ESNext','--moduleResolution','bundler',fixture],{cwd:staging});
    expect(existsSync(fixture)).toBe(true);
  });
  it('executes the packed standalone Tailwind plugin in Node and compiles new candidates', () => {
    execFileSync('node', ['--input-type=module','-e', `
      import { createRequire } from 'node:module';
      const require = createRequire(${JSON.stringify(join(core,'package.json'))});
      const { compile } = require('tailwindcss');
      const module = await import(${JSON.stringify(join(packed,'dist/standalone/duskmoonui.mjs'))});
      if(module.default.config.theme.extend.colors.primary !== 'var(--color-primary)') throw Error('Missing primary token');
      const compiler = await compile('@plugin "duskmoonui";\\n@tailwind utilities;', {
        loadModule: async () => ({ module:module.default, base:${JSON.stringify(packed)} }),
      });
      const css = compiler.build(['stat','stats','indicator','kbd','carousel','countdown','diff','btn','badge-soft','table-zebra']);
      for(const name of ['stat','stats','indicator','kbd','carousel','countdown','diff','btn','badge-soft','table-zebra'])
        if(!css.includes('.'+name)) throw Error('Missing '+name);
      for(const name of ['aura','hover-3d','hover-gallery','text-rotate'])
        if(css.includes('.'+name)) throw Error('Default includes effect '+name);
    `], {cwd:core});
    expect(true).toBe(true);
  });
  it('provides semantic tokens in every currently shipped theme', () => {
    for(const theme of ['sunshine','moonlight','ocean','forest']) {
      const css=readFileSync(join(packed,`dist/themes/generated/${theme}.css`),'utf8');
      for(const role of ['primary','secondary','tertiary','info','success','warning','error','on-surface','surface-container','outline-variant']) expect(css).toContain(`--color-${role}:`);
    }
  });
});
