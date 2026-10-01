import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { compile } from 'tailwindcss';

const theme = readFileSync(new URL('../../dist/themes/generated/sunshine.css', import.meta.url), 'utf8');
const artifacts = new Map([
  ['individual', readFileSync(new URL('../../dist/components/dropdown.css', import.meta.url), 'utf8')],
  ['navigation', readFileSync(new URL('../../dist/components/navigation.css', import.meta.url), 'utf8')],
  ['aggregate', readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8')],
  ['standalone plugin', ''],
]);

test.beforeAll(async () => {
  const { default: plugin } = await import('../../dist/standalone/duskmoonui.mjs');
  const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
    loadModule: async () => ({ module: plugin, base: new URL('../..', import.meta.url).pathname }),
  });
  artifacts.set('standalone plugin', compiler.build([
    'dropdown', 'dropdown-content', 'dropdown-block-start', 'dropdown-block-end',
    'dropdown-inline-start', 'dropdown-inline-end',
  ]));
});

let errors: string[];
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

async function fixture(page: Page, styles: string, body: string, dir = 'ltr') {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setContent(`<html lang="en" data-theme="sunshine" dir="${dir}">
    <head><title>Dropdown placement</title><style>${theme}\n${styles}</style></head>
    <body>${body}</body></html>`);
}

function dropdown(id: string, placement = 'block-end', position = 'left:300px;top:250px') {
  return `<div class="dropdown dropdown-${placement}" style="position:absolute;${position}">
    <button type="button" id="trigger-${id}" popovertarget="${id}" style="width:120px;height:36px">Actions ${id}</button>
    <div id="${id}" class="dropdown-content" popover="auto"><a href="#edit">Edit</a><button>Archive</button></div>
  </div>`;
}

async function expectPlacement(page: Page, id: string, placement: string, dir = 'ltr') {
  await expect(page.locator(`#${id}`)).toBeVisible();
  const trigger = (await page.locator(`#trigger-${id}`).boundingBox())!;
  const panel = (await page.locator(`#${id}`).boundingBox())!;
  if (placement.startsWith('block')) {
    if (placement === 'block-end') expect(panel.y).toBeGreaterThanOrEqual(trigger.y + trigger.height);
    else expect(panel.y + panel.height).toBeLessThanOrEqual(trigger.y);
    expect(panel.x).toBeLessThan(trigger.x + trigger.width);
    expect(panel.x + panel.width).toBeGreaterThan(trigger.x);
  } else {
    const right = (placement === 'inline-end') === (dir === 'ltr');
    if (right) expect(panel.x).toBeGreaterThanOrEqual(trigger.x + trigger.width);
    else expect(panel.x + panel.width).toBeLessThanOrEqual(trigger.x);
    expect(panel.y).toBeLessThan(trigger.y + trigger.height);
    expect(panel.y + panel.height).toBeGreaterThan(trigger.y);
  }
}

for (const asset of artifacts.keys()) {
  for (const dir of ['ltr', 'rtl']) {
    test(`${asset}: programmatic placements use each instance's trigger in ${dir}`, async ({ page }) => {
      for (const placement of ['block-start', 'block-end', 'inline-start', 'inline-end']) {
        await fixture(page, artifacts.get(asset)!, dropdown('first', placement) + dropdown('second', placement, 'left:420px;top:380px'), dir);
        for (const id of ['first', 'second']) {
          await page.locator(`#${id}`).evaluate(el => (el as HTMLElement).showPopover());
          await expectPlacement(page, id, placement, dir);
          await page.locator(`#${id}`).evaluate(el => (el as HTMLElement).hidePopover());
        }
      }
    });
  }

  test(`${asset}: native keyboard activation, Escape, focus restoration, and light dismissal`, async ({ page }) => {
    await fixture(page, artifacts.get(asset)!, dropdown('first') + dropdown('second', 'block-end', 'left:540px;top:400px') + '<button id="outside">Outside</button>');
    const trigger = page.locator('#trigger-first');
    await trigger.focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#trigger-second')).toBeFocused();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expectPlacement(page, 'first', 'block-end');
    await page.keyboard.press('Tab');
    await expect(page.locator('#first a')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#first')).toBeHidden();
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Space');
    await expectPlacement(page, 'first', 'block-end');
    await page.locator('#outside').click();
    await expect(page.locator('#first')).toBeHidden();
    await page.locator('#trigger-second').click();
    await expectPlacement(page, 'second', 'block-end');
    await expect(page.locator('#first')).toBeHidden();
  });

  test(`${asset}: nested dropdowns do not capture an outer or sibling anchor`, async ({ page }) => {
    const nested = dropdown('nested', 'inline-end', 'position:relative');
    const outer = dropdown('outer').replace('<a href="#edit">Edit</a><button>Archive</button>', nested);
    await fixture(page, artifacts.get(asset)!, outer + dropdown('sibling', 'block-end', 'left:540px;top:400px'));
    await page.locator('#outer').evaluate(el => (el as HTMLElement).showPopover());
    await expectPlacement(page, 'outer', 'block-end');
    await page.locator('#nested').evaluate(el => (el as HTMLElement).showPopover());
    await expectPlacement(page, 'nested', 'inline-end');
    await expect(page.locator('#outer')).toBeVisible();
  });

  test(`${asset}: constrained placement flips inside the viewport`, async ({ page }) => {
    await fixture(page, artifacts.get(asset)!, dropdown('edge', 'block-end', 'left:300px;top:550px'));
    await page.locator('#edge').evaluate(el => (el as HTMLElement).showPopover());
    await expectPlacement(page, 'edge', 'block-start');
    const panel = (await page.locator('#edge').boundingBox())!;
    expect(panel.y).toBeGreaterThanOrEqual(0);
    expect(panel.y + panel.height).toBeLessThanOrEqual(600);
  });
}
