import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const theme = readFileSync(new URL('../../src/themes/generated/sunshine.css', import.meta.url), 'utf8');
const css = ['button', 'fab', 'dropdown']
  .map(name => readFileSync(new URL(`../../src/components/${name}.css`, import.meta.url), 'utf8'))
  .join('\n');

async function setFixture(page: Page, body: string) {
  await page.setContent(`<html data-theme="sunshine"><style>${theme}\n${css}</style><body>${body}</body></html>`);
}

test('native FAB speed dials remain independently browser-controlled', async ({ page }) => {
  await setFixture(page, `
    <div class="fab fab-speed-dial" id="dial-one">
      <button class="btn fab-trigger" id="trigger-one" popovertarget="actions-one" aria-label="Create">+</button>
      <div class="fab-actions" id="actions-one" popover="auto">
        <a class="btn fab-action" href="#one"><span class="fab-label">Message</span></a>
        <button class="btn fab-action">Photo</button>
      </div>
    </div>
    <div class="fab fab-speed-dial fab-start" id="dial-two">
      <button class="btn fab-trigger" id="trigger-two" popovertarget="actions-two" aria-label="Share">+</button>
      <div class="fab-actions" id="actions-two" popover="auto"><button class="btn fab-action">Copy</button></div>
    </div>
    <button id="outside">Outside</button>`);

  const first = page.locator('#actions-one');
  const second = page.locator('#actions-two');
  await expect(first).toBeHidden();
  await page.locator('#trigger-one').focus();
  await page.keyboard.press('Tab');
  // Closed action descendants are skipped; the next speed-dial trigger is reachable.
  await expect(page.locator('#trigger-two')).toBeFocused();

  await page.locator('#trigger-one').click();
  await expect(first).toBeVisible();
  expect(await first.evaluate(el => el.matches(':popover-open'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(first).toBeHidden();
  await expect(page.locator('#trigger-one')).toBeFocused();

  await page.locator('#trigger-one').click();
  await page.locator('#outside').click();
  await expect(first).toBeHidden();
  await page.locator('#trigger-two').click();
  await expect(second).toBeVisible();
  await expect(first).toBeHidden();
});

test('native Dropdown opens only through the Popover API', async ({ page }) => {
  await setFixture(page, `
    <div class="dropdown dropdown-block-end">
      <button class="btn" id="menu-trigger" popovertarget="menu" aria-label="Open actions">Actions</button>
      <div class="dropdown-content" id="menu" popover="auto"><a href="#edit">Edit</a><button>Archive</button></div>
    </div>
    <button id="outside">Outside</button>`);

  const trigger = page.locator('#menu-trigger');
  const menu = page.locator('#menu');
  await trigger.focus();
  await trigger.hover();
  await expect(menu).toBeHidden();
  await trigger.click();
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator('#outside').click();
  await expect(menu).toBeHidden();
});

test('FAB and Dropdown disable motion under reduced-motion preference', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await setFixture(page, `
    <div class="fab fab-speed-dial fab-controlled fab-open">
      <button class="btn fab-trigger">Create</button>
      <div class="fab-actions"><button class="btn fab-action">Photo</button></div>
    </div>
    <div class="dropdown"><button popovertarget="reduced-dropdown">Options</button><div class="dropdown-content" id="reduced-dropdown" popover>Content</div></div>`);

  const fabDurations = await page.locator('.fab-actions').evaluate(el => getComputedStyle(el).transitionDuration);
  const actionDurations = await page.locator('.fab-action').evaluate(el => getComputedStyle(el).transitionDuration);
  expect(fabDurations === '0s' || fabDurations.split(', ').every(value => value === '0s')).toBe(true);
  expect(actionDurations === '0s' || actionDurations.split(', ').every(value => value === '0s')).toBe(true);
  const dropdownDurations = await page.locator('.dropdown-content').evaluate(el => getComputedStyle(el).transitionDuration);
  expect(dropdownDurations === '0s' || dropdownDurations.split(', ').every(value => value === '0s')).toBe(true);
});
