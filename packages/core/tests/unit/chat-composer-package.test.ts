import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile } from 'tailwindcss';

const core = join(import.meta.dir, '../..');
const parts = ['chat-composer', 'chat-composer-input', 'chat-composer-editor', 'chat-composer-reference', 'chat-composer-label', 'chat-composer-quote', 'chat-composer-quote-text', 'chat-composer-attachments', 'chat-composer-attachment', 'chat-composer-attachment-info', 'chat-composer-filename', 'chat-composer-description', 'chat-composer-completions', 'chat-composer-option', 'chat-composer-group', 'chat-composer-breadcrumb', 'chat-composer-toolbar', 'chat-composer-actions', 'chat-composer-status', 'chat-composer-toolbar-compact', 'chat-composer-config', 'chat-composer-thumbnails', 'chat-composer-attachment-tile', 'chat-composer-attachment-remove', 'chat-composer-menu', 'chat-composer-menu-end', 'chat-composer-menu-option', 'chat-composer-menu-option-warning', 'chat-composer-menu-row', 'chat-composer-menu-field'];

describe('Packed composer visual contract', () => {
  let staging: string;
  let packed: string;

  beforeAll(() => {
    staging = mkdtempSync(join(tmpdir(), 'duskmoon-composer-'));
    const report = JSON.parse(execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', staging], { cwd: core, encoding: 'utf8' }));
    execFileSync('tar', ['-xzf', join(staging, report[0].filename), '-C', staging]);
    // A real Tailwind consumer supplies the package's declared peer dependency.
    const require = createRequire(import.meta.url);
    symlinkSync(dirname(dirname(require.resolve('tailwindcss/package.json'))), join(staging, 'node_modules'), 'dir');
    packed = join(staging, 'package');
  });

  afterAll(() => rmSync(staging, { recursive: true, force: true }));

  it('ships matching aggregate, component, standalone and server-safe stylesheet module contracts', () => {
    for (const path of ['dist/index.css', 'dist/components/index.css', 'dist/components/chat.css', 'dist/standalone/duskmoonui.css']) {
      const css = readFileSync(join(packed, path), 'utf8');
      for (const part of parts) expect(css).toContain(`.${part}`);
      for (const state of ['uploading', 'cancelled', 'unknown', 'conflict']) expect(css).toContain(`data-state="${state}"`);
    }
    execFileSync('node', ['--input-type=module', '-e', `
      import { createRequire } from 'node:module';
      import { readFileSync } from 'node:fs';
      const require = createRequire(${JSON.stringify(join(packed, 'package.json'))});
      const component = await import(require.resolve('@duskmoon-dev/core/components/chat'));
      const css = readFileSync(require.resolve('@duskmoon-dev/core/components/chat.css'), 'utf8');
      if (component.styles !== null || component.default !== null) throw Error('SSR stylesheet must be null');
      if (component.css !== css) throw Error('ESM and component CSS differ');
    `]);
  });

  it('compiles the new parts from the packed standalone plugin with their visual states', async () => {
    const entry = join(packed, 'dist/standalone/duskmoonui.mjs');
    const plugin = await import(pathToFileURL(entry).href);
    const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
      loadModule: async () => ({ module: plugin.default, base: packed, path: entry }),
    });
    const css = compiler.build([...parts, 'chat-queue-item', 'chip', 'btn', 'progress', 'select']);
    for (const part of parts) expect(css).toContain(`.${part}`);
    for (const state of ['uploading', 'cancelled', 'unknown', 'conflict']) expect(css).toContain(`data-state="${state}"`);
    expect(css).toContain('position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline');
  });

  it('retains the supported CSS plus token-plugin consumer path', async () => {
    const entry = join(packed, 'dist/esm/tailwind-plugin.js');
    const plugin = await import(pathToFileURL(entry).href);
    const compiler = await compile('@import "@duskmoon-dev/core";\n@plugin "@duskmoon-dev/core/plugin";\n@tailwind utilities;', {
      loadStylesheet: async () => ({ content: readFileSync(join(packed, 'dist/index.css'), 'utf8'), base: packed, path: join(packed, 'dist/index.css') }),
      loadModule: async () => ({ module: plugin.default, base: packed, path: entry }),
    });
    const css = compiler.build([...parts, 'text-primary']);
    for (const part of parts) expect(css).toContain(`.${part}`);
    expect(css).toContain('.text-primary');
  });
});
