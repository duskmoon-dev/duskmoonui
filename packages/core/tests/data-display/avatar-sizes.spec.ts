import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { compile } from 'tailwindcss';

const sizes = [
  ['', 48, 16],
  ['xs', 24, 10],
  ['sm', 32, 12],
  ['md', 48, 16],
  ['lg', 64, 24],
  ['xl', 96, 32],
  ['2xl', 96, 32],
] as const;
const artifacts = new Map([
  ['individual CSS', readFileSync(new URL('../../dist/components/avatar.css', import.meta.url), 'utf8')],
  ['aggregate CSS', readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8')],
  ['standalone plugin', ''],
]);
const image = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="64"><rect width="32" height="64" fill="teal"/></svg>')}`;

test.beforeAll(async () => {
  const { default: plugin } = await import('../../dist/standalone/duskmoonui.mjs');
  const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
    loadModule: async () => ({ module: plugin, base: new URL('../..', import.meta.url).pathname }),
  });
  artifacts.set('standalone plugin', compiler.build([
    'avatar', 'avatar-placeholder', 'avatar-image', ...sizes.filter(([size]) => size).map(([size]) => `avatar-${size}`),
  ]));
});

for (const asset of artifacts.keys()) {
  for (const width of [375, 900]) {
    test(`${asset}: all avatar sizes retain dimensions with text, placeholders, and images at ${width}px`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize({ width, height: 900 });
      const markup = sizes.map(([size]) => ['text', 'placeholder', 'image'].map(content => {
        const inner = content === 'image' ? `<img class="avatar-image" src="${image}" alt="Avatar"/>`
          : content === 'placeholder' ? '<span class="avatar-placeholder">AB</span>' : 'AB';
        return `<div style="display:flex;width:48px"><div id="avatar-${size || 'default'}-${content}" class="avatar ${size ? `avatar-${size}` : ''}">${inner}</div><span style="min-width:0;overflow:hidden">User</span></div>`;
      }).join('')).join('');
      await page.setContent(`<html lang="en" data-theme="sunshine"><head><title>Avatar sizes</title><style>${artifacts.get(asset)}\nhtml{font-size:16px}</style></head><body><main>${markup}</main></body></html>`);
      await page.locator('img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())));

      for (const [size, dimension, fontSize] of sizes) {
        for (const content of ['text', 'placeholder', 'image']) {
          const avatar = page.locator(`#avatar-${size || 'default'}-${content}`);
          const bounds = (await avatar.boundingBox())!;
          expect(bounds.width).toBe(dimension);
          expect(bounds.height).toBe(dimension);
          await expect(avatar).toHaveCSS('font-size', `${fontSize}px`);
          await expect(avatar).toHaveCSS('flex-shrink', '0');
          if (content !== 'text') {
            const inner = avatar.locator(content === 'image' ? 'img' : '.avatar-placeholder');
            const innerBounds = (await inner.boundingBox())!;
            expect(innerBounds.width).toBe(dimension);
            expect(innerBounds.height).toBe(dimension);
            if (content === 'image') await expect(inner).toHaveCSS('object-fit', 'cover');
          }
        }
      }
      expect(errors).toEqual([]);
    });
  }
}
