import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');

function item(number: number, text = `Waiting message ${number}`, hidden = false, attachment = false) {
  return `<li class="chat-queue-item" ${hidden ? 'hidden' : ''}>
    <svg class="chat-queue-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
    <span class="chat-queue-number sr-only">#${number}</span>
    ${attachment ? '<img class="chat-queue-attachment" alt="Queued screenshot" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' fill=\'%239aa\'/%3E%3C/svg%3E">' : ''}
    <div class="chat-queue-content">${text}</div>
    <div class="chat-actions chat-queue-actions">
      <button class="btn btn-ghost btn-sm chat-queue-steer" type="button" aria-label="Steer message ${number}"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m7 10 5-5 5 5M12 5v14" /></svg>Steer</button>
      <button class="btn btn-ghost btn-sm btn-square chat-queue-remove" type="button" aria-label="Remove message ${number}"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7" /></svg></button>
    </div>
  </li>`;
}

async function fixture(page: Page, items: string, options = { theme: 'sunshine', dir: 'ltr', hidden: false }) {
  await page.setContent(`<!doctype html><html lang="en" dir="${options.dir}" data-theme="${options.theme}">
    <head><title>Waiting chat messages</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Chat</h1>
      <button id="before" type="button">Before queue</button>
      <div class="chat-input-area"><section class="chat-queue" aria-labelledby="queue-title" ${options.hidden ? 'hidden' : ''}>
        <div class="chat-queue-header sr-only"><h2 class="chat-queue-title" id="queue-title">Waiting messages</h2></div>
        <ol class="chat-queue-list">${items}</ol>
      </section><form class="chat-composer chat-composer-ghost">
        <textarea class="chat-composer-input" rows="2" aria-label="Message"></textarea>
        <div class="chat-composer-actions"><button class="btn btn-outlined btn-sm" type="button">Queue</button></div>
      </form></div><button id="after" type="button">After queue</button>
    </main></body></html>`);
  await page.locator('.chat-queue-content').evaluateAll(elements => elements.forEach(el => el.setAttribute('title', el.textContent ?? '')));
  await page.locator('.chat-queue-item:not([hidden])').first().evaluate(el => el.classList.add('chat-queue-item-active'));
}

test('hidden queues and rows are absent from layout and keyboard navigation', async ({ page }) => {
  await fixture(page, item(1), { theme: 'sunshine', dir: 'ltr', hidden: true });
  await expect(page.locator('.chat-queue')).toBeHidden();
  await expect(page.locator('.chat-queue')).toHaveCSS('display', 'none');
  await page.locator('#before').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeFocused();

  await page.locator('.chat-queue').evaluate(el => el.removeAttribute('hidden'));
  await page.locator('.chat-queue-item').evaluate(el => el.setAttribute('hidden', ''));
  await expect(page.locator('.chat-queue-item')).toHaveCSS('display', 'none');
  await page.locator('#before').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeFocused();
});

for (const width of [320, 375]) {
  for (const theme of ['sunshine', 'moonlight']) {
    for (const dir of ['ltr', 'rtl']) {
      test(`compact drafts preserve full text with visible actions at ${width}px in ${theme}/${dir}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 700 });
        const text = `First line\n${'LongUnbrokenDraft'.repeat(30)}\nLast line`;
        await fixture(page, item(1, text), { theme, dir, hidden: false });
        await page.mouse.move(width - 1, 699);
        const content = page.locator('.chat-queue-content');
        expect(await content.textContent()).toBe(text);
        await expect(content).toHaveAttribute('title', text);
        const metrics = await content.evaluate(el => ({
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          height: el.getBoundingClientRect().height,
          lineHeight: parseFloat(getComputedStyle(el).lineHeight),
        }));
        expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
        expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight + 1);
        await expect(content).toHaveCSS('text-overflow', 'ellipsis');
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        await expect(page.locator('.chat-queue-actions')).toHaveCSS('opacity', '1');
        const contentBounds = await content.boundingBox();
        const iconBounds = await page.locator('.chat-queue-icon').boundingBox();
        if (dir === 'ltr') expect(iconBounds!.x + iconBounds!.width).toBeLessThanOrEqual(contentBounds!.x);
        else expect(iconBounds!.x).toBeGreaterThanOrEqual(contentBounds!.x + contentBounds!.width);
        for (const action of ['Steer', 'Remove']) {
          const button = page.getByRole('button', { name: `${action} message 1` });
          await expect(button).toBeVisible();
          await button.click();
          const bounds = await button.boundingBox();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
          expect(Math.abs(bounds!.y + bounds!.height / 2 - contentBounds!.y - contentBounds!.height / 2)).toBeLessThanOrEqual(1);
        }
      });
    }
  }
}

test('a long queue stays bounded while keyboard focus scrolls to its last action', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await fixture(page, Array.from({ length: 12 }, (_, index) => item(index + 1)).join(''));
  const list = page.locator('.chat-queue-list');
  const metrics = await list.evaluate(el => ({
    height: el.getBoundingClientRect().height,
    clientHeight: el.clientHeight,
    scrollHeight: el.scrollHeight,
    rem: parseFloat(getComputedStyle(document.documentElement).fontSize),
  }));
  expect(metrics.height).toBeLessThanOrEqual(16 * metrics.rem + 1);
  expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight);
  await page.locator('#before').focus();
  for (let index = 0; index < 24; index++) await page.keyboard.press('Tab');
  const lastAction = page.getByRole('button', { name: 'Remove message 12' });
  await expect(lastAction).toBeFocused();
  expect(await list.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  const listBounds = await list.boundingBox();
  const buttonBounds = await lastAction.boundingBox();
  expect(buttonBounds!.y).toBeGreaterThanOrEqual(listBounds!.y);
  expect(buttonBounds!.y + buttonBounds!.height).toBeLessThanOrEqual(listBounds!.y + listBounds!.height + 1);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeFocused();
});

test('queued messages occupy full-width vertical rows in a tray attached above the composer', async ({ page }) => {
  for (const width of [320, 375, 900]) {
    await page.setViewportSize({ width, height: 700 });
    await fixture(page, Array.from({ length: 6 }, (_, index) => item(index + 1, undefined, false, index === 1)).join(''));
    const rows = page.locator('.chat-queue-item');
    const listBounds = await page.locator('.chat-queue-list').boundingBox();
    const positions = await rows.evaluateAll(elements => elements.map(el => {
      const bounds = el.getBoundingClientRect();
      return { x: bounds.x, y: bounds.y, width: bounds.width, bottom: bounds.bottom };
    }));
    for (let index = 0; index < positions.length; index++) {
      expect(Math.abs(positions[index].x - listBounds!.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(positions[index].width - listBounds!.width)).toBeLessThanOrEqual(1);
      if (index > 0) expect(positions[index].y).toBeGreaterThanOrEqual(positions[index - 1].bottom);
    }
    await expect(page.locator('.chat-queue-number')).toHaveText(['#1', '#2', '#3', '#4', '#5', '#6']);
    await expect(page.locator('.chat-queue-item-active')).toHaveCount(1);
    await expect(rows.first()).toHaveClass(/chat-queue-item-active/);
    await expect(page.locator('.chat-queue-item-active .chat-queue-content')).toHaveText('Waiting message 1');
    const headerBounds = await page.locator('.chat-queue-header').boundingBox();
    const numberBounds = await page.locator('.chat-queue-number').first().boundingBox();
    expect(headerBounds!.width).toBeLessThanOrEqual(1);
    expect(headerBounds!.height).toBeLessThanOrEqual(1);
    expect(numberBounds!.width).toBeLessThanOrEqual(1);
    await expect(page.locator('.chat-queue-icon')).toHaveCount(6);
    await expect(page.locator('.chat-queue-icon').first()).toBeVisible();
    const attachment = page.getByRole('img', { name: 'Queued screenshot', exact: true });
    await expect(attachment).toBeVisible();
    const attachmentBounds = await attachment.boundingBox();
    const attachmentRowBounds = await rows.nth(1).boundingBox();
    const attachmentContentBounds = await rows.nth(1).locator('.chat-queue-content').boundingBox();
    expect(attachmentBounds!.x).toBeGreaterThanOrEqual(attachmentRowBounds!.x);
    expect(attachmentBounds!.x + attachmentBounds!.width).toBeLessThanOrEqual(attachmentRowBounds!.x + attachmentRowBounds!.width);
    expect(attachmentBounds!.y).toBeGreaterThanOrEqual(attachmentRowBounds!.y);
    expect(attachmentBounds!.y + attachmentBounds!.height).toBeLessThanOrEqual(attachmentRowBounds!.y + attachmentRowBounds!.height);
    expect(Math.abs(attachmentBounds!.y + attachmentBounds!.height / 2 - attachmentContentBounds!.y - attachmentContentBounds!.height / 2)).toBeLessThanOrEqual(1);
    const trayBounds = await page.locator('.chat-queue').boundingBox();
    const composerBounds = await page.locator('.chat-composer').boundingBox();
    const trayPadding = await page.locator('.chat-queue').evaluate(el => parseFloat(getComputedStyle(el).paddingBottom));
    const overlap = trayBounds!.y + trayBounds!.height - composerBounds!.y;
    expect(overlap).toBeGreaterThanOrEqual(-1);
    expect(overlap).toBeLessThanOrEqual(trayPadding + 1);
    expect(listBounds!.y + listBounds!.height).toBeLessThanOrEqual(composerBounds!.y + 1);
    expect(trayBounds!.x).toBeGreaterThan(composerBounds!.x);
    expect(trayBounds!.x + trayBounds!.width).toBeLessThan(composerBounds!.x + composerBounds!.width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test.describe('touch waiting queue', () => {
  test.use({ hasTouch: true, viewport: { width: 375, height: 700 } });

  test('actions are available without hover and the queue passes axe', async ({ page }) => {
    await fixture(page, item(1));
    expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
    await expect(page.locator('.chat-queue-actions')).toHaveCSS('opacity', '1');
    const steer = page.getByRole('button', { name: 'Steer message 1' });
    await steer.evaluate(el => el.addEventListener('click', () => el.setAttribute('data-activated', 'true')));
    await steer.tap();
    await expect(steer).toHaveAttribute('data-activated', 'true');
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
});
