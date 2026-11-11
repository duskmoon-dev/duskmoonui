import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

for (const distribution of ['bundle', 'modular']) {
  for (const theme of ['sunshine', 'moonlight']) {
    test(`${distribution} ${theme}: sidebar colors, error contrast and round radios`, async ({ page }) => {
      const css = distribution === 'bundle'
        ? read('../../dist/index.css')
        : [read(`../../dist/themes/generated/${theme}.css`), ...['nested-menu', 'button', 'radio'].map(name => read(`../../dist/components/${name}.css`))].join('\n');
      await page.setContent(`<html data-theme="${theme}"><head><style>${css}</style></head><body>
        <ul class="nested-menu nested-menu-secondary nested-menu-bordered">
          <li class="nested-menu-title">Workspace</li>
          <li><a href="#home" aria-current="page">Home</a></li>
          <li><a href="#other">Other</a></li>
          <li><button type="button">Preferences</button></li>
          <li><details open><summary>Settings</summary><ul><li><a href="#nested">Nested</a></li></ul></details></li>
        </ul>
        <button class="btn btn-error">Delete</button>
        <input type="radio" class="radio radio-primary" checked>
      </body></html>`);
      await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });
      const ratio = async (selector: string) => page.locator(selector).evaluate(element => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        const rgba = (color: string) => {
          ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data].map(v => v / 255);
        };
        const foreground = rgba(getComputedStyle(element).color);
        let ancestor: Element | null = element;
        let background = [1, 1, 1, 1];
        while (ancestor) {
          const color = rgba(getComputedStyle(ancestor).backgroundColor);
          if (color[3] === 1) { background = color; break; }
          if (color[3] !== 0) throw new Error('Expected an opaque or transparent background');
          ancestor = ancestor.parentElement;
        }
        const luminance = (rgb: number[]) => rgb.slice(0, 3).reduce((sum, c, i) => sum + [0.2126, 0.7152, 0.0722][i] * (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4), 0);
        const a = luminance(foreground), b = luminance(background);
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      });
      for (const selector of ['.nested-menu-title', '[aria-current]', 'a[href="#other"]', '.nested-menu button', 'summary', 'a[href="#nested"]', '.btn-error']) {
        expect(await ratio(selector), selector).toBeGreaterThanOrEqual(4.5);
        if (selector !== '.nested-menu-title') {
          await page.locator(selector).hover();
          expect(await ratio(selector), `${selector} hovered`).toBeGreaterThanOrEqual(4.5);
          await page.locator(selector).focus();
          expect(await ratio(selector), `${selector} focused`).toBeGreaterThanOrEqual(4.5);
        }
      }
      const radius = await page.locator('.radio').evaluate(element => ({
        outer: getComputedStyle(element).borderRadius,
        inner: getComputedStyle(element, '::before').borderRadius,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
      }));
      expect(parseFloat(radius.outer)).toBeGreaterThanOrEqual(radius.width / 2);
      expect(parseFloat(radius.inner)).toBeGreaterThan(0);
      expect(radius.width).toBe(radius.height);
    });
  }
}
