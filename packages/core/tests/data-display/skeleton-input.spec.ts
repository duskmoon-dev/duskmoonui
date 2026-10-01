import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { compile } from 'tailwindcss';

const theme = readFileSync(new URL('../../dist/themes/generated/sunshine.css', import.meta.url), 'utf8');
const artifacts = new Map([
  ['individual CSS', readFileSync(new URL('../../dist/components/skeleton.css', import.meta.url), 'utf8')],
  ['aggregate CSS', readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8')],
  ['standalone plugin', ''],
]);

test.beforeAll(async () => {
  const { default: plugin } = await import('../../dist/standalone/duskmoonui.mjs');
  const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
    loadModule: async () => ({ module: plugin, base: new URL('../..', import.meta.url).pathname }),
  });
  artifacts.set('standalone plugin', compiler.build(['skeleton', 'skeleton-input', 'skeleton-static', 'skeleton-wave']));
});

for (const asset of artifacts.keys()) {
  for (const width of [375, 900]) {
    test(`${asset}: empty input skeleton fills its container at ${width}px and follows root rem sizing`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize({ width, height: 800 });
      await page.setContent(`<html lang="en" data-theme="sunshine"><head><title>Input skeleton</title><style>${theme}\n${artifacts.get(asset)}</style></head><body><main style="width:60vw">
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-input skeleton-static"></div>
        <div class="skeleton skeleton-input skeleton-wave"></div>
      </main></body></html>`);
      for (const rootSize of [16, 20]) {
        await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, rootSize);
        const container = (await page.locator('main').boundingBox())!;
        for (const skeleton of await page.locator('.skeleton-input').all()) {
          const bounds = (await skeleton.boundingBox())!;
          expect(bounds.height).toBe(2.75 * rootSize);
          expect(bounds.width).toBe(container.width);
          await expect(skeleton).toBeVisible();
          expect(await skeleton.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
        }
      }
      expect(errors).toEqual([]);
    });
  }
}
