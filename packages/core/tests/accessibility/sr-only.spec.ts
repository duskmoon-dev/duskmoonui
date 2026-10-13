import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile } from 'tailwindcss';

const coreDir = resolve(import.meta.dirname, '../..');
const candidates = ['sr-only', 'not-sr-only', 'sm:not-sr-only', 'sm:sr-only', 'focus:not-sr-only'];
const stylesheets: Record<string, string> = {};
let outputDir: string;

test.beforeAll(async () => {
  const utilities = await readFile(join(coreDir, 'src/base/utilities.css'), 'utf8');
  const require = createRequire(import.meta.url);
  const theme = await readFile(join(dirname(require.resolve('tailwindcss/package.json')), 'theme.css'), 'utf8');
  const tailwind = `@layer theme, base, components, utilities;\n@layer theme { ${theme} }\n@layer utilities { @tailwind utilities; }`;
  stylesheets['CSS only'] = utilities;
  for (const [name, source] of [
    ['Core before Tailwind', `${utilities}\n${tailwind}`],
    ['Core after Tailwind', `${tailwind}\n${utilities}`],
  ]) {
    stylesheets[name] = (await compile(source)).build(candidates);
  }

  outputDir = await mkdtemp(join(tmpdir(), 'duskmoonui-sr-only-'));
  const buildScript = join(coreDir, 'scripts/build-standalone.ts');
  execFileSync('bun', ['-e',
    `import { buildStandaloneBundles } from ${JSON.stringify(buildScript)}; await buildStandaloneBundles(${JSON.stringify(outputDir)});`,
  ]);
  const pluginPath = join(outputDir, 'duskmoonui.mjs');
  const plugin = await import(pathToFileURL(pluginPath).href);
  const compiler = await compile(`${tailwind}\n@plugin "duskmoonui";`, {
    base: outputDir,
    async loadModule() {
      return { base: outputDir, module: plugin.default, path: pluginPath };
    },
  });
  stylesheets['Standalone plugin'] = compiler.build(candidates);
});

test.afterAll(async () => {
  if (outputDir) await rm(outputDir, { recursive: true, force: true });
});

async function expectHidden(label: Locator) {
  await expect(label).toHaveCSS('position', 'absolute');
  await expect(label).toHaveCSS('width', '1px');
  await expect(label).toHaveCSS('height', '1px');
  await expect(label).toHaveCSS('overflow', 'hidden');
  await expect(label).toHaveCSS('clip-path', 'inset(50%)');
}

async function expectRestored(label: Locator) {
  await expect(label).toHaveCSS('position', 'static');
  await expect(label).toHaveCSS('overflow', 'visible');
  await expect(label).toHaveCSS('clip', 'auto');
  await expect(label).toHaveCSS('clip-path', 'none');
  expect((await label.boundingBox())!.width).toBeGreaterThan(1);
}

test('CSS-only utilities hide accessible text and restore both clipping properties', async ({ page }) => {
  await page.setContent(`<style>${stylesheets['CSS only']}</style><span class="sr-only">Agents</span>`);
  const label = page.locator('span');
  await expectHidden(label);
  expect(await page.locator('body').ariaSnapshot()).toContain('Agents');
  await label.evaluate((element) => element.classList.add('not-sr-only'));
  await expectRestored(label);
});

for (const mode of ['Core before Tailwind', 'Core after Tailwind', 'Standalone plugin']) {
  test(`${mode}: responsive utilities hide and restore labels in both directions`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 600 });
    await page.setContent(`<style>${stylesheets[mode]}</style>
      <span id="desktop" class="sr-only sm:not-sr-only">Agents</span>
      <span id="mobile" class="not-sr-only sm:sr-only">Mobile agents</span>
      <a href="#content" class="sr-only focus:not-sr-only">Skip to content</a>
      <main id="content">Content</main>`);
    const desktop = page.locator('#desktop');
    const mobile = page.locator('#mobile');
    await expectHidden(desktop);
    await expectRestored(mobile);
    expect(await page.locator('body').ariaSnapshot()).toContain('Agents');
    await page.setViewportSize({ width: 1000, height: 600 });
    await expectRestored(desktop);
    await expectHidden(mobile);
    await page.locator('a').focus();
    await expectRestored(page.locator('a'));
    await page.setViewportSize({ width: 375, height: 600 });
    await expectHidden(desktop);
    await expectRestored(mobile);
  });
}
