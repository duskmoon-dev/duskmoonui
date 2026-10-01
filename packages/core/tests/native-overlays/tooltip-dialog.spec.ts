import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { generatePluginCSS } from '../../src/index';

const theme = readFileSync(new URL('../../src/themes/generated/sunshine.css', import.meta.url), 'utf8');
const built = ['tooltip', 'modal', 'dialog']
  .map(name => readFileSync(new URL(`../../dist/components/${name}.css`, import.meta.url), 'utf8'))
  .join('\n');
const generated = generatePluginCSS({ components: ['tooltip', 'modal', 'dialog'], base: false });
const prefixed = generatePluginCSS({ components: ['modal', 'dialog'], base: false, prefix: 'dm-' });

async function fixture(page: Page, styles: string, body: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setContent(`<!doctype html><html lang="en" data-theme="sunshine"><head><title>Native overlays</title>
    <style>${theme}\n${styles}</style></head><body><main>${body}</main></body></html>`);
}

for (const kind of ['modal', 'dialog']) {
  test(`prefixed plugin CSS: native ${kind} retains size and open state`, async ({ page }) => {
    await fixture(page, prefixed, `<dialog id="surface" class="dm-${kind} dm-${kind}-sm" aria-label="Example">
      <div class="dm-${kind}-box"><button>Close</button></div></dialog>`);
    const surface = page.locator('#surface');
    await expect(surface).toBeHidden();
    await surface.evaluate((el: HTMLDialogElement) => el.showModal());
    await expect(surface).toBeVisible();
    await expect(surface).toHaveCSS('width', '320px');
    await expect(surface).toHaveCSS('opacity', '1');
    const backdrop = await surface.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor);
    expect(backdrop).not.toBe('rgba(0, 0, 0, 0)');
    await surface.evaluate((el: HTMLDialogElement) => el.close());
    await expect(surface).toBeHidden();
  });
}

for (const [path, styles] of [['built CSS', built], ['generated plugin CSS', generated]]) {
  for (const kind of ['modal', 'dialog']) {
    test(`${path}: ${kind} uses native commands, inertness, focus, Escape and form close`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await fixture(page, styles, `
        <button id="trigger" command="show-modal" commandfor="surface">Open</button>
        <button id="outside">Outside</button>
        <dialog id="surface" class="${kind}" aria-labelledby="heading">
          <div class="${kind}-box">
            <h2 id="heading" class="${kind}-title">Confirm action</h2>
            <button id="cancel" command="close" commandfor="surface" autofocus>Cancel</button>
            <form method="dialog"><button id="confirm" value="confirmed">Confirm</button></form>
          </div>
        </dialog>`);
      const surface = page.locator('#surface');
      await expect(surface).toBeHidden();
      await surface.evaluate(el => el.classList.add('modal-open'));
      await expect(surface).toBeHidden();
      await page.locator('#trigger').click();
      await expect(surface).toBeVisible();
      expect(await surface.evaluate(el => el.matches(':modal'))).toBe(true);
      await expect(page.locator('#cancel')).toBeFocused();
      await page.locator('#outside').evaluate((el: HTMLElement) => el.focus());
      await expect(page.locator('#cancel')).toBeFocused();
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
        // Native dialogs allow browser chrome in the cycle (reported as BODY),
        // but never focus an inert background control.
        expect(await surface.evaluate(el =>
          el.contains(document.activeElement) || document.activeElement === document.body,
        )).toBe(true);
      }
      await expect(page.locator('#cancel')).toBeFocused();
      const backdrop = await surface.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor);
      expect(backdrop).not.toBe('rgba(0, 0, 0, 0)');
      const audit = await new AxeBuilder({ page }).include('#surface').analyze();
      expect(audit.violations).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(surface).toBeHidden();
      await expect(page.locator('#trigger')).toBeFocused();
      await page.locator('#trigger').click();
      await page.locator('#cancel').click();
      await expect(surface).toBeHidden();
      await page.locator('#trigger').click();
      await page.locator('#confirm').click();
      await expect(surface).toBeHidden();
      await expect(surface).toHaveJSProperty('returnValue', 'confirmed');
      await expect(page.locator('#trigger')).toBeFocused();
      expect(errors).toEqual([]);
    });

    for (const width of [360, 1280]) {
      test(`${path}: ${kind} fits the ${width}px viewport through showModal/close`, async ({ page }) => {
        await page.setViewportSize({ width, height: 720 });
        await fixture(page, styles, `<dialog id="surface" class="${kind}" aria-label="Example">
          <div class="${kind}-box"><h2>Example</h2><button>Close</button></div></dialog>`);
        const surface = page.locator('#surface');
        await surface.evaluate((el: HTMLDialogElement) => el.showModal());
        await expect(surface).toBeVisible();
        const box = (await surface.boundingBox())!;
        expect(box.width).toBeGreaterThan(100);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        expect(box.y + box.height).toBeLessThanOrEqual(720);
        await surface.evaluate((el: HTMLDialogElement) => el.close());
        await expect(surface).toBeHidden();
      });
    }
  }

  test(`${path}: tooltip visibility follows only native Popover state`, async ({ page }) => {
    await fixture(page, styles, `<button id="trigger" aria-describedby="tip">Help</button>
      <div id="tip" class="tooltip" role="tooltip" popover="hint">Helpful text</div>`);
    const tip = page.locator('#tip');
    await expect(tip).toBeHidden();
    await page.locator('#trigger').focus();
    await page.locator('#trigger').hover();
    await tip.evaluate(el => el.classList.add('tooltip-open'));
    await expect(tip).toBeHidden();
    await tip.evaluate((el: HTMLElement) => el.showPopover());
    await expect(tip).toBeVisible();
    expect(await tip.evaluate(el => el.matches(':popover-open'))).toBe(true);
    await expect(page.locator('#trigger')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(tip).toBeHidden();
    await tip.evaluate((el: HTMLElement) => el.showPopover());
    await tip.evaluate((el: HTMLElement) => el.hidePopover());
    await expect(tip).toBeHidden();
  });

  test(`${path}: interest invokers open hint tooltips on hover and keyboard focus`, async ({ page }) => {
    await fixture(page, styles, `<button id="trigger" interestfor="tip" aria-describedby="tip"
      style="anchor-name: --tip; interest-delay: 0s">Help</button>
      <div id="tip" class="tooltip" role="tooltip" popover="hint" style="position-anchor: --tip">Helpful text</div>`);
    const supported = await page.evaluate(() => 'interestForElement' in HTMLButtonElement.prototype);
    test.skip(!supported, 'Interest Invokers are unavailable in this browser');
    const tip = page.locator('#tip');
    await page.locator('#trigger').hover();
    await expect(tip).toBeVisible();
    expect(await tip.evaluate(el => el.matches(':popover-open'))).toBe(true);
    await page.mouse.move(700, 500);
    await expect(tip).toBeHidden();
    await page.locator('#trigger').focus();
    await expect(tip).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tip).toBeHidden();
  });
}
