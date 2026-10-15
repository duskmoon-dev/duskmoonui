import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');
const lines = (count: number) => Array.from({ length: count }, (_, index) => `Line ${index + 1}`).join('\n');

async function fixture(page: Page, text: string, options = { theme: 'sunshine', dir: 'ltr', hidden: false }) {
  await page.setContent(`<!doctype html><html lang="en" dir="${options.dir}" data-theme="${options.theme}">
    <head><title>Collapsible chat message</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Chat</h1>
      <button id="before" type="button">Before message</button>
      <div class="chat chat-end"><div class="chat-bubble chat-bubble-collapsible">
        <div id="message-content" class="chat-bubble-content"></div>
        <button class="btn btn-ghost btn-xs chat-bubble-toggle" type="button" aria-controls="message-content" aria-expanded="false" ${options.hidden ? 'hidden' : ''}>Show more</button>
      </div></div><button id="after" type="button">After message</button>
    </main></body></html>`);
  await page.locator('#message-content').evaluate((el, text) => { el.textContent = text; }, text);
  await page.locator('.chat-bubble-toggle').evaluate(el => el.addEventListener('click', () => {
    const expanded = el.getAttribute('aria-expanded') !== 'true';
    el.setAttribute('aria-expanded', String(expanded));
    el.textContent = expanded ? 'Show less' : 'Show more';
  }));
}

async function geometry(page: Page) {
  return page.locator('#message-content').evaluate(el => ({
    height: el.getBoundingClientRect().height,
    scrollHeight: el.scrollHeight,
    lineHeight: parseFloat(getComputedStyle(el).lineHeight),
  }));
}

test('one and exactly six lines remain fully visible while seven lines clip to six', async ({ page }) => {
  for (const count of [1, 6, 7]) {
    await fixture(page, lines(count), { theme: 'sunshine', dir: 'ltr', hidden: count <= 6 });
    const metrics = await geometry(page);
    expect(Math.abs(metrics.height - Math.min(count, 6) * metrics.lineHeight)).toBeLessThan(1);
    expect(Math.abs(metrics.scrollHeight - count * metrics.lineHeight)).toBeLessThan(1);
    expect(await page.locator('#message-content').textContent()).toBe(lines(count));
    if (count <= 6) {
      await expect(page.locator('.chat-bubble-toggle')).toHaveCSS('display', 'none');
      await page.locator('#before').focus();
      await page.keyboard.press('Tab');
      await expect(page.locator('#after')).toBeFocused();
    } else {
      await expect(page.locator('.chat-bubble-toggle')).toBeVisible();
      expect(metrics.scrollHeight).toBeGreaterThan(metrics.height);
    }
  }
});

test('the six-line limit follows custom typography and native Enter/Space expansion', async ({ page }) => {
  await fixture(page, lines(9));
  const content = page.locator('#message-content');
  const toggle = page.getByRole('button', { name: 'Show more', exact: true });
  for (const typography of [{ fontSize: '16px', lineHeight: '24px' }, { fontSize: '24px', lineHeight: '40px' }]) {
    await content.evaluate((el, style) => Object.assign((el as HTMLElement).style, style), typography);
    expect((await geometry(page)).height).toBe(parseFloat(typography.lineHeight) * 6);
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.chat-bubble-toggle')).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toHaveCSS('max-block-size', 'none');
    await expect(content).toHaveCSS('overflow', 'visible');
    expect((await geometry(page)).height).toBe(parseFloat(typography.lineHeight) * 9);
    await expect(page.locator('.chat-bubble-toggle')).toHaveText('Show less');
    await page.keyboard.press('Space');
    await expect(page.locator('.chat-bubble-toggle')).toHaveAttribute('aria-expanded', 'false');
    expect((await geometry(page)).height).toBe(parseFloat(typography.lineHeight) * 6);
  }
});

test('the opt-in modifier leaves ordinary user and assistant messages fully visible', async ({ page }) => {
  await fixture(page, lines(9));
  await page.locator('.chat-bubble').evaluate(el => el.classList.remove('chat-bubble-collapsible'));
  await page.locator('#message-content').evaluate(el => (el as HTMLElement).style.whiteSpace = 'pre-wrap');
  const metrics = await geometry(page);
  expect(Math.abs(metrics.height - metrics.lineHeight * 9)).toBeLessThan(1);
  await expect(page.locator('#message-content')).toHaveCSS('max-block-size', 'none');
  await page.locator('.chat').evaluate(el => el.className = 'chat chat-start');
  expect((await geometry(page)).height).toBe(metrics.height);
});

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`wrapped text collapses accessibly at 320px in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      const text = 'UnbrokenLongMessage'.repeat(30);
      await fixture(page, text, { theme, dir, hidden: false });
      const collapsed = await geometry(page);
      expect(Math.abs(collapsed.height - 6 * collapsed.lineHeight)).toBeLessThan(1);
      expect(collapsed.scrollHeight).toBeGreaterThan(collapsed.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      const toggle = page.getByRole('button', { name: 'Show more', exact: true });
      await expect(toggle).toHaveAttribute('aria-controls', 'message-content');
      await toggle.click();
      expect((await geometry(page)).height).toBeGreaterThan(collapsed.height);
      expect(await page.locator('#message-content').textContent()).toBe(text);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
  }
}
