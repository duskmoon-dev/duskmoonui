import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

for (const distribution of ['bundle', 'modular']) {
  test(`${distribution}: button shapes respect every size with and without preflight`, async ({ page }) => {
    const css = distribution === 'bundle'
      ? read('../../dist/index.css')
      : read('../../dist/components/button.css');
    for (const preflight of [false, true]) {
      await page.setContent(`<style>${preflight ? '*,::before,::after { box-sizing: border-box; }' : ''}${css}</style>`);
      for (const shape of ['circle', 'square']) {
        for (const [size, pixels] of [['xs', 24], ['sm', 32], ['md', 40], ['', 40], ['lg', 48]] as const) {
          for (const tag of ['button', 'a']) {
            for (const reversed of [false, true]) {
              const classes = ['btn', 'btn-primary', ...(size ? [`btn-${size}`] : []), `btn-${shape}`];
              if (reversed) classes.reverse();
              await page.locator('body').evaluate((body, { tag, classes }) => {
                body.innerHTML = `<${tag} href="#action" class="${classes.join(' ')}" aria-label="Edit"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2h12v12H2z"/></svg></${tag}>`;
              }, { tag, classes });
              const dimensions = await page.locator('.btn').evaluate(element => {
                const rect = element.getBoundingClientRect();
                const style = getComputedStyle(element);
                return { width: rect.width, height: rect.height, radius: style.borderRadius };
              });
              expect(dimensions.width, `${shape}/${size || 'default'}/${tag}/preflight=${preflight}`).toBe(pixels);
              expect(dimensions.height).toBe(pixels);
              if (shape === 'circle') expect(parseFloat(dimensions.radius)).toBeGreaterThanOrEqual(pixels / 2);
            }
          }
        }
      }
    }
  });
}
