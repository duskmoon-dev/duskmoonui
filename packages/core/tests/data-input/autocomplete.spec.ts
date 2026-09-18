import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = process.env.DATA_INPUT_DOCS_URL || 'http://localhost:4321';
const url = origin + '/duskmoonui/docs/en/components/autocomplete/';
const coreDir = process.env.DATA_INPUT_CORE_DIR || join(import.meta.dirname, '../..');
const asset = (path: string) => readFileSync(join(coreDir, path), 'utf8');

test('Autocomplete filters and selects with real keyboard, pointer, FormData and reset behavior', async ({ page, browserName }) => {
  await page.goto(url);
  const form = page.locator('#demo-autocomplete-form');
  const input = form.getByRole('combobox', { name: 'Country', exact: true });
  const toggle = form.getByRole('button', { name: 'Show suggestions', exact: true });
  await toggle.click();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(form.getByRole('option', { name: 'Canada', exact: true })).toBeVisible();
  await input.fill('ca');
  await expect(form.getByRole('option')).toHaveCount(1);
  await input.press('ArrowDown');
  const option = form.getByRole('option', { name: 'Canada', exact: true });
  await expect(input).toHaveAttribute('aria-activedescendant', await option.getAttribute('id') as string);
  await input.press('Enter');
  await expect(input).toHaveValue('Canada');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  expect(await form.evaluate(el => [...new FormData(el as HTMLFormElement).entries()])).toEqual([['country', 'Canada']]);
  await toggle.click();
  await form.getByRole('option', { name: 'United Kingdom', exact: true }).click();
  await expect(input).toHaveValue('United Kingdom');
  await input.fill('zzz');
  await expect(form.getByRole('status')).toHaveText('No matching countries.');
  await input.press('Escape');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await input.press('ArrowUp');
  await input.press('Enter');
  await expect(input).toHaveValue('United Kingdom');
  await form.getByRole('button', { name: 'Reset country', exact: true }).click();
  await expect(input).toHaveValue('');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  // ARIA does not natively block pointer events; exercise the controller's guard.
  await form.getByRole('option', { name: 'Mexico', exact: true }).click({ force: true });
  await expect(input).toHaveValue('');
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await input.press('ArrowDown');
  await input.press('ArrowDown');
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(input).toHaveValue('United Kingdom');
  await toggle.click();
  const tab = browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
  await input.press(tab);
  await expect(toggle).toBeFocused();
  await toggle.press(tab);
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByLabel('Unavailable country', { exact: true })).toBeDisabled();
  await expect(page.locator('#demo-autocomplete-disabled').getByRole('button')).toBeDisabled();
});

test('Autocomplete toggle stays inside the field across themes, RTL and narrow layouts', async ({ page }, testInfo) => {
  for (const width of [1200, 360]) {
    for (const theme of ['sunshine', 'moonlight']) {
      for (const dir of ['ltr', 'rtl']) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(url);
        await page.locator('html').evaluate((el, value) => el.dir = value, dir);
        await page.locator('html').evaluate((el, value) => el.dataset.theme = value, theme);
        const form = page.locator('#demo-autocomplete-form');
        const input = form.getByRole('combobox');
        const toggle = form.getByRole('button', { name: 'Show suggestions', exact: true });
        await form.scrollIntoViewIfNeeded();
        const field = (await input.boundingBox())!;
        const button = (await toggle.boundingBox())!;
        expect(button.x).toBeGreaterThanOrEqual(field.x);
        expect(button.x + button.width).toBeLessThanOrEqual(field.x + field.width);
        expect(button.y).toBeGreaterThanOrEqual(field.y);
        expect(button.y + button.height).toBeLessThanOrEqual(field.y + field.height);
        await toggle.click();
        await expect(form.getByRole('listbox')).toBeVisible();
        await expect.poll(() => form.getByRole('option', { name: 'United Kingdom', exact: true }).evaluate(el => {
          const rect = el.getBoundingClientRect();
          const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
          return !!hit && el.contains(hit);
        })).toBe(true);
        // Measure the settled theme, not transient colors during the docs' theme transition.
        await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
        const results = await new AxeBuilder({ page }).include('#demo-autocomplete-form').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(results.violations).toEqual([]);
        await page.screenshot({ path: testInfo.outputPath(`autocomplete-${width}-${theme}-${dir}.png`), fullPage: false });
        for (const size of ['', 'autocomplete-sm', 'autocomplete-lg']) {
          await page.locator('#demo-autocomplete').evaluate((el, value) => {
            el.classList.remove('autocomplete-sm', 'autocomplete-lg');
            if (value) el.classList.add(value);
          }, size);
          const reserved = await input.evaluate(el => parseFloat(getComputedStyle(el).paddingInlineEnd));
          const control = (await input.boundingBox())!;
          const arrow = (await toggle.boundingBox())!;
          expect(reserved, size || 'default').toBeGreaterThanOrEqual(arrow.width + 2);
          expect(arrow.x).toBeGreaterThanOrEqual(control.x);
          expect(arrow.x + arrow.width).toBeLessThanOrEqual(control.x + control.width);
          expect(arrow.y).toBeGreaterThanOrEqual(control.y);
          expect(arrow.y + arrow.height).toBeLessThanOrEqual(control.y + control.height);
        }
      }
    }
  }
});

test('Autocomplete presentation matches aggregate, individual, standalone and adopted stylesheet imports', async ({ page }) => {
  const source = readFileSync(join(import.meta.dirname, '../../../docs/src/content/docs/en/components/autocomplete.mdx'), 'utf8');
  const markup = [...source.matchAll(/code=\{\x60([\s\S]*?)\x60\}/g)][0][1];
  const base = asset('dist/base.css') + asset('dist/themes/generated/sunshine.css');
  const render = async (css: string) => page.setContent(`<html lang="en" data-theme="sunshine"><head><style>${css}</style></head><body>${markup}</body></html>`);
  const styles = async () => {
    const input = page.locator('#demo-autocomplete-country');
    await input.fill('ca');
    await input.press('ArrowDown');
    await input.press('Enter');
    await expect(input).toHaveValue('Canada');
    expect(await input.evaluate(el => new FormData((el as HTMLInputElement).form!).get('country'))).toBe('Canada');
    await page.getByRole('button', { name: 'Reset country', exact: true }).click();
    await expect(input).toHaveValue('');
    await page.locator('#demo-autocomplete-form .autocomplete-toggle').click();
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
    return page.locator('#demo-autocomplete-form :is(.autocomplete-input,.autocomplete-toggle,.autocomplete-dropdown,.autocomplete-option)').evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node);
      return Object.fromEntries(['color', 'background-color', 'border', 'width', 'height', 'padding', 'visibility', 'display'].map(property => [property, style.getPropertyValue(property)]));
    }));
  };
  await render(asset('dist/index.css'));
  const aggregate = await styles();
  await render(base + ['autocomplete', 'form-group', 'button'].map(name => asset(`dist/components/${name}.css`)).join('\n'));
  expect(await styles()).toEqual(aggregate);
  await render(asset('dist/standalone/duskmoonui.css'));
  expect(await styles()).toEqual(aggregate);
  await render(base + ['form-group', 'button'].map(name => asset(`dist/components/${name}.css`)).join('\n'));
  await page.evaluate(async source => {
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    const module = await import(/* @vite-ignore */ url);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, module.styles];
    URL.revokeObjectURL(url);
  }, asset('dist/esm/components/autocomplete.js'));
  expect(await styles()).toEqual(aggregate);
});

test('Autocomplete retains visible keyboard focus in forced colors and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto(url);
  const input = page.locator('#demo-autocomplete-country');
  await input.focus();
  expect(await input.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  expect(await input.evaluate(el => parseFloat(getComputedStyle(el).outlineWidth))).toBeGreaterThanOrEqual(2);
  await input.press('ArrowDown');
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  // Core's shared reduced-motion rule uses 0.01ms to retain transition events.
  expect(await page.locator('#demo-autocomplete .autocomplete-dropdown').evaluate(el =>
    Math.max(...getComputedStyle(el).transitionDuration.split(',').map(value => parseFloat(value)))
  )).toBeLessThanOrEqual(0.00001);
  await input.press('Enter');
  await expect(input).toHaveValue('United States');
});
