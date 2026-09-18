import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '../../../docs/dist');
test('every Collapse docs preview toggles natively or with an explicit controller', async ({page}) => {
  await page.goto('http://docs.test/duskmoonui/docs/en/components/collapse/');
  const previews=page.locator('[data-panel="preview"]');
  const native=previews.locator('details.collapse');
  expect(await native.count()).toBeGreaterThan(20);
  for(const item of await native.all()) {
    const parent=item.locator('xpath=ancestor::details[1]');
    if(await parent.count()) await parent.evaluate(el=>(el as HTMLDetailsElement).open=true);
    const before=await item.evaluate(el=>(el as HTMLDetailsElement).open);
    await item.locator(':scope > summary').focus();
    await page.keyboard.press('Enter');
    await expect.poll(()=>item.evaluate(el=>(el as HTMLDetailsElement).open)).toBe(!before);
    if(!before) await expect(item.locator(':scope > .collapse-content')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect.poll(()=>item.evaluate(el=>(el as HTMLDetailsElement).open)).toBe(before);
    if(before) await expect(item.locator(':scope > .collapse-content')).toBeVisible();
  }
  await expect(previews.locator('.collapse-disabled > button')).toBeDisabled();
  const controlled=page.locator('[data-collapse-demo]');
  await controlled.locator('button').click();
  await expect(controlled.locator('button')).toHaveAttribute('aria-expanded','true');
  await expect(controlled.locator('.collapse-content')).toBeVisible();
  await controlled.locator('button').click();
  await expect(controlled.locator('.collapse-content')).toBeHidden();
  expect(await controlled.locator('.collapse-content').evaluate(el=>(el as HTMLElement).inert)).toBe(true);
  const group=previews.locator('details[name="demo-collapse-exclusive"]');
  await group.nth(1).locator('summary').click();
  await expect.poll(()=>group.evaluateAll(items=>items.filter(el=>(el as HTMLDetailsElement).open).length)).toBe(1);
});
test.beforeEach(async ({page}) => {
  await page.route('http://docs.test/**', async route => {
    const pathname = new URL(route.request().url()).pathname.replace(/^\/duskmoonui\//,'');
    const path = join(dist, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    if(!existsSync(path)) { await route.fulfill({status:404,body:'Not found'}); return; }
    const extension=path.split('.').at(-1)!;
    const contentType=({html:'text/html',css:'text/css',js:'application/javascript',jpg:'image/jpeg',svg:'image/svg+xml'} as Record<string,string>)[extension] ?? 'application/octet-stream';
    await route.fulfill({body:readFileSync(path),contentType});
  });
});

test('built Diff controller supports keyboard endpoints and local image assets', async ({page}) => {
  await page.goto('http://docs.test/duskmoonui/docs/en/components/diff/');
  const input=page.locator('#demo-diff-position');
  await input.focus(); await page.keyboard.press('Home');
  await expect(input).toHaveValue('0');
  await expect.poll(()=>page.locator('#demo-diff').evaluate(el=>(el as HTMLElement).style.getPropertyValue('--diff-position'))).toBe('0%');
  await page.keyboard.press('End');
  await expect.poll(()=>page.locator('#demo-diff').evaluate(el=>(el as HTMLElement).style.getPropertyValue('--diff-position'))).toBe('100%');
  for(const image of await page.locator('.diff img').all())
    await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});

test('built Countdown synchronizes readable units, clamps expiry and announces once', async ({page}) => {
  await page.clock.install();
  await page.goto('http://docs.test/duskmoonui/docs/en/components/countdown/');
  const root=page.locator('[data-countdown-demo]');
  await expect(root.locator('[data-unit="minutes"]')).toHaveText('02');
  await expect(root.locator('.countdown')).not.toHaveAttribute('aria-live', /.+/);
  await page.clock.fastForward(61000);
  await expect(root.locator('[data-unit="minutes"]')).toHaveText('00');
  await expect(root.locator('[data-unit="seconds"]')).toHaveText('59');
  await expect(root.locator('[data-unit="seconds"]')).toHaveClass(/countdown-tick/);
  expect(await root.locator('[data-unit="seconds"]').evaluate(el => getComputedStyle(el).animationName)).toBe('countdown-tick');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await root.locator('[data-unit="seconds"]').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.clock.fastForward(60000);
  await expect(root.locator('[data-unit="seconds"]')).toHaveText('00');
  await expect(root.locator('[data-expiry]')).toHaveText('Time expired');
  await page.clock.fastForward(60000);
  await expect(root.locator('[data-expiry]')).toHaveText('Time expired');
});

test('built Gallery buttons select by keyboard and preserve pressed/name state', async ({page}) => {
  await page.goto('http://docs.test/duskmoonui/docs/en/components/hover-gallery/');
  const button=page.getByRole('button',{name:'Mountain sky',exact:true});
  await button.focus(); await page.keyboard.press('Space');
  await expect(button).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.hover-gallery-stage img')).toHaveAttribute('alt','Mountain landscape under a different sky');
  await expect(page.getByRole('button',{name:'Mountain lake',exact:true})).toHaveAttribute('aria-pressed','false');
});

test('built Text Rotate explicit pause does not change accessible representation', async ({page}) => {
  await page.goto('http://docs.test/duskmoonui/docs/en/components/text-rotate/');
  const button=page.locator('[data-text-rotate-demo] button');
  await expect(button).toHaveAccessibleName('Pause animation');
  await button.click(); await expect(button).toHaveAttribute('aria-pressed','true');
  await expect(button).toHaveAccessibleName('Resume animation');
  expect(await page.locator('.text-rotate > span').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused');
  await expect(page.locator('[data-text-rotate-demo] p')).toHaveAttribute('aria-label','Build accessible, resilient, thoughtful interfaces');
  await button.click(); await expect(button).toHaveAttribute('aria-pressed','false');
});

test.describe('touch input', () => {
  test.use({hasTouch:true});
  test('built Gallery deliberately selects and Diff reveal responds to touch', async ({page}) => {
    await page.goto('http://docs.test/duskmoonui/docs/en/components/hover-gallery/');
    const button=page.getByRole('button',{name:'Mountain sky',exact:true});
    await button.tap(); await expect(button).toHaveAttribute('aria-pressed','true');
    await page.goto('http://docs.test/duskmoonui/docs/en/components/diff/');
    const input=page.locator('#demo-diff-position');
    await input.scrollIntoViewIfNeeded();
    const box=await input.boundingBox();
    await page.touchscreen.tap(box!.x+box!.width*0.75,box!.y+box!.height/2);
    await expect.poll(()=>input.inputValue()).not.toBe('50');
    await expect.poll(()=>page.locator('#demo-diff').evaluate(el=>(el as HTMLElement).style.getPropertyValue('--diff-position'))).not.toBe('50%');
  });
});

test('built Accordion controller hides/inerts panel and updates its trigger', async ({page}) => {
  await page.goto('http://docs.test/duskmoonui/docs/en/components/accordion/');
  const root=page.locator('[data-disclosure-demo]'); const button=root.locator('button');
  await expect(root.locator('.accordion-content')).toBeHidden();
  await button.click(); await expect(button).toHaveAttribute('aria-expanded','true');
  await expect(root.locator('a')).toBeVisible();
  await button.click(); await expect(button).toHaveAttribute('aria-expanded','false');
  await expect(root.locator('.accordion-content')).toHaveAttribute('inert','');
});
