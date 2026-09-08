import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';

const theme = readFileSync(new URL('../../src/themes/generated/sunshine.css', import.meta.url), 'utf8');
const css = ['navigation', 'drawer', 'bottomsheet']
  .map(name => readFileSync(new URL(`../../src/components/${name}.css`, import.meta.url), 'utf8'))
  .join('\n');

async function fixture(page: Page, kind: string, modal = false, closedby = 'any') {
  const tag = modal ? 'dialog' : 'div';
  await page.setContent(`<html data-theme="sunshine"><style>${theme}\n${css}</style>
    <button id="trigger" commandfor="surface" command="${modal ? 'show-modal' : 'toggle-popover'}"
      style="position:fixed;left:400px;top:100px">Open</button>
    <button id="outside" style="position:fixed;right:20px;top:20px">Outside</button>
    <${tag} id="surface" class="${kind}" ${modal ? `closedby="${closedby}"` : 'popover="auto"'}>
      <button id="first" autofocus>First</button>
      <button id="close" commandfor="surface" command="${modal ? 'close' : 'hide-popover'}">Close</button>
    </${tag}>`);
}

for (const kind of ['menu menu-vertical', 'drawer drawer-left', 'bottomsheet']) {
  test(`${kind}: native popover focus, commands, Escape and light dismissal`, async ({ page }) => {
    await fixture(page, kind);
    const surface = page.locator('#surface');
    await expect(surface).toBeHidden();
    await page.locator('#trigger').click();
    await expect(surface).toBeVisible();
    const backdrop = await surface.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor);
    expect(backdrop).toBe('rgba(0, 0, 0, 0)');
    await expect(page.locator('#first')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(surface).toBeHidden();
    await expect(page.locator('#trigger')).toBeFocused();
    await page.locator('#trigger').evaluate(el => el.setAttribute('command', 'show-popover'));
    await page.locator('#trigger').click();
    await page.locator('#close').click();
    await expect(surface).toBeHidden();
    await page.locator('#trigger').click();
    await page.locator('#outside').click();
    await expect(surface).toBeHidden();
    await page.locator('#trigger').evaluate(el => el.setAttribute('command', 'toggle-popover'));
    await page.locator('#trigger').click();
    // Programmatic activation exercises the same native command without moving focus.
    await page.locator('#trigger').evaluate((el: HTMLButtonElement) => el.click());
    await expect(surface).toBeHidden();
  });
}

for (const kind of ['drawer drawer-left', 'bottomsheet']) {
  test(`${kind}: modal focus containment, restoration and native dismissal policy`, async ({ page }) => {
    await fixture(page, kind, true);
    const surface = page.locator('#surface');
    await expect(surface).toBeHidden();
    await page.locator('#trigger').click();
    await expect(surface).toBeVisible();
    const backdrop = await surface.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor);
    expect(backdrop).not.toBe('rgba(0, 0, 0, 0)');
    expect(backdrop).toBe('color(srgb 0 0 0 / 0.25)');
    await expect(page.locator('#first')).toBeFocused();
    await page.locator('#outside').evaluate((el: HTMLElement) => el.focus());
    await expect(page.locator('#first')).toBeFocused();
    await page.locator('#close').focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.querySelector('#surface')!.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(surface).toBeHidden();
    await expect(page.locator('#trigger')).toBeFocused();
    await page.locator('#trigger').click();
    await page.mouse.click(780, 20);
    await expect(surface).toBeHidden();
    await surface.evaluate(el => el.setAttribute('closedby', 'closerequest'));
    await page.locator('#trigger').click();
    await page.mouse.click(780, 20);
    await expect(surface).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(surface).toBeHidden();
    await surface.evaluate(el => el.setAttribute('closedby', 'none'));
    await page.locator('#trigger').click();
    await page.keyboard.press('Escape');
    await expect(surface).toBeVisible();
    await page.locator('#close').click();
    await expect(surface).toBeHidden();
    await expect(page.locator('#trigger')).toBeFocused();
  });

  for (const modal of [false, true]) {
    test(`${kind}: ${modal ? 'dialog' : 'popover'} viewport geometry and reduced motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await fixture(page, kind, modal);
      await page.locator('#trigger').click();
      const surface = page.locator('#surface');
      await expect(surface).toBeVisible();
      const box = (await surface.boundingBox())!;
      expect(box.x).toBeCloseTo(0, 0);
      if (kind.startsWith('drawer')) {
        expect(box.y).toBeCloseTo(0, 0);
        expect(box.height).toBeCloseTo(600, 0);
        expect(box.width).toBeCloseTo(320, 0);
      } else {
        expect(box.y + box.height).toBeCloseTo(600, 0);
        expect(box.width).toBeCloseTo(800, 0);
      }
      await expect(surface).toHaveCSS('transition-duration', '0s');
      await page.locator('#close').click();
      await expect(surface).toBeHidden();
    });
  }
}

test('menu follows its implicit anchor and flips above near the viewport bottom', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await fixture(page, 'menu menu-vertical');
  const trigger = page.locator('#trigger');
  const surface = page.locator('#surface');
  await trigger.click();
  const anchor = (await trigger.boundingBox())!;
  let menu = (await surface.boundingBox())!;
  expect(menu.y).toBeGreaterThanOrEqual(anchor.y + anchor.height);
  expect(menu.x).toBeGreaterThanOrEqual(anchor.x - menu.width);
  expect(menu.x).toBeLessThanOrEqual(anchor.x + anchor.width);
  await page.keyboard.press('Escape');
  await trigger.evaluate((el: HTMLElement) => { el.style.top = '560px'; });
  await trigger.click();
  menu = (await surface.boundingBox())!;
  expect(menu.y + menu.height).toBeLessThanOrEqual(560);
  expect(menu.x).toBeGreaterThanOrEqual(0);
  expect(menu.x + menu.width).toBeLessThanOrEqual(800);
});

for (const [kind, modal] of [['menu menu-vertical', false], ['drawer drawer-left', false], ['bottomsheet', false], ['drawer drawer-left', true], ['bottomsheet', true]] as const) {
  test(`${kind} ${modal ? 'dialog' : 'popover'}: native exit remains rendered during motion then leaves the top layer`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await fixture(page, kind, modal);
    await page.locator('#trigger').click();
    const surface = page.locator('#surface');
    await expect(surface).toHaveCSS('opacity', '1');
    // Wait for entry motion before measuring the separate exit transition.
    await surface.evaluate(async el => { await Promise.all(el.getAnimations().map(a => a.finished)); });
    const state = await surface.evaluate((el, modal) => {
      if (modal) (el as HTMLDialogElement).close();
      else (el as HTMLElement).hidePopover();
      const style = getComputedStyle(el);
      return { open: modal ? el.hasAttribute('open') : el.matches(':popover-open'), display: style.display, duration: style.transitionDuration };
    }, modal);
    expect(state.open).toBe(false);
    expect(state.display).not.toBe('none');
    expect(state.duration).not.toBe('0s');
    await expect(surface).toBeHidden();
  });
}

test('menu accepts an explicit named anchor', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await fixture(page, 'menu menu-vertical');
  await page.locator('#trigger').evaluate((el: HTMLElement) => el.style.setProperty('anchor-name', '--test-menu'));
  await page.locator('#surface').evaluate((el: HTMLElement) => el.style.setProperty('position-anchor', '--test-menu'));
  await page.locator('#trigger').click();
  const trigger = (await page.locator('#trigger').boundingBox())!;
  await expect(page.locator('#surface')).toHaveCSS('transition-duration', '0s');
  const menu = (await page.locator('#surface').boundingBox())!;
  expect(menu.y).toBeGreaterThanOrEqual(trigger.y + trigger.height);
  expect(menu.y).toBeLessThan(trigger.y + trigger.height + 20);
});

for (const modal of [false, true]) {
  for (const width of [600, 1000]) {
    test(`responsive sheet ${modal ? 'dialog' : 'popover'} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 600 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await fixture(page, 'bottomsheet bottomsheet-responsive', modal);
      await page.locator('#trigger').click();
      const box = (await page.locator('#surface').boundingBox())!;
      expect(box.x + box.width).toBeCloseTo(width, 0);
      expect(box.y + box.height).toBeCloseTo(600, 0);
      expect(box.width).toBeCloseTo(width < 768 ? width : 384, 0);
      if (width >= 768) expect(box.y).toBeCloseTo(0, 0);
    });
  }
}
