import { test, expect, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const lines = (count: number) => Array.from({ length: count }, (_, index) => `Line ${index + 1}`).join('\n');

function example(page: Page, name: string) {
  return page.locator(`[data-chat-message-collapse-demo] [data-chat-collapse-case="${name}"]`);
}

async function metrics(row: Locator) {
  return row.locator('.chat-bubble-content').evaluate(el => ({
    height: el.getBoundingClientRect().height,
    scrollHeight: el.scrollHeight,
    lineHeight: parseFloat(getComputedStyle(el).lineHeight),
  }));
}

async function expectCollapsed(row: Locator, text?: string) {
  const toggle = row.locator('.chat-bubble-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  const geometry = await metrics(row);
  expect(Math.abs(geometry.height - 6 * geometry.lineHeight)).toBeLessThan(1);
  expect(geometry.scrollHeight).toBeGreaterThan(geometry.height);
  if (text !== undefined) expect(await row.locator('.chat-bubble-content').textContent()).toBe(text);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/duskmoonui/docs/en/components/chat/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('[data-chat-message-collapse-demo]')).toBeVisible();
});

test('only content beyond six rendered lines gets a native show-more control', async ({ page }) => {
  for (const [name, count] of [['short', 1], ['six-lines', 6]] as const) {
    const row = example(page, name);
    await expect(row.locator('.chat-bubble-toggle')).toBeHidden();
    const geometry = await metrics(row);
    expect(Math.abs(geometry.height - count * geometry.lineHeight)).toBeLessThan(1);
    expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.height + 1);
  }
  const long = example(page, 'long');
  await expectCollapsed(long);
  const toggle = long.getByRole('button', { name: 'Show more', exact: true });
  const id = await long.locator('.chat-bubble-content').getAttribute('id');
  expect(id).toBeTruthy();
  await expect(toggle).toHaveAttribute('aria-controls', id!);
  const originalText = await long.locator('.chat-bubble-content').textContent();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(long.locator('.chat-bubble-toggle')).toHaveText('Show less');
  await expect(long.locator('.chat-bubble-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(long.locator('.chat-bubble-content')).toHaveCSS('max-block-size', 'none');
  const expanded = await metrics(long);
  expect(expanded.height).toBeGreaterThan(6 * expanded.lineHeight);
  expect(await long.locator('.chat-bubble-content').textContent()).toBe(originalText);
  await page.keyboard.press('Space');
  await expectCollapsed(long);
  await expect(long.locator('.chat-bubble-toggle')).toBeFocused();
});

test('wrapping during resize controls collapse and resets expansion when overflow disappears', async ({ page }) => {
  const row = example(page, 'short');
  await page.setViewportSize({ width: 1200, height: 800 });
  const text = 'W'.repeat(160);
  await row.locator('.chat-bubble-content').evaluate((el, text) => { el.textContent = text; }, text);
  await expect(row.locator('.chat-bubble-toggle')).toBeHidden();
  await page.setViewportSize({ width: 320, height: 700 });
  await expectCollapsed(row, text);
  await row.getByRole('button', { name: 'Show more', exact: true }).click();
  await expect(row.locator('.chat-bubble-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(row.locator('.chat-bubble-toggle')).toBeHidden();
  await expect(row.locator('.chat-bubble-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 320, height: 700 });
  await expectCollapsed(row, text);
});

test('dynamic text changes update the six-line threshold and move focus away from a hidden control', async ({ page }) => {
  const row = example(page, 'long');
  const content = row.locator('.chat-bubble-content');
  const toggle = row.locator('.chat-bubble-toggle');
  await expectCollapsed(row);
  await toggle.click();
  await expect(toggle).toBeFocused();
  await content.evaluate(el => { el.textContent = 'Short replacement'; });
  await expect(toggle).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(await toggle.evaluate(el => document.activeElement === el)).toBe(false);
  await content.evaluate((el, text) => { el.textContent = text; }, lines(6));
  await expect(toggle).toBeHidden();
  await content.evaluate((el, text) => { el.textContent = text; }, lines(7));
  await expectCollapsed(row, lines(7));
});

test('direct, queued and steered long user messages collapse while assistant replies stay ordinary', async ({ page }) => {
  const root = page.locator('[data-chat-queue-demo]');
  await root.getByRole('button', { name: 'Start fresh', exact: true }).click();
  const send = async (text: string) => {
    await root.getByRole('textbox', { name: 'Message', exact: true }).fill(text);
    await root.locator('[data-chat-queue-send]').click();
  };
  const users = root.locator('[data-chat-role="user"]');
  const direct = `Direct message\n${lines(8)}`;
  const queued = `Queued message\n${lines(8)}`;
  const steered = `Steered message\n${lines(8)}`;
  await send(direct);
  await expectCollapsed(users.nth(0), direct);
  await send(queued);
  await send(steered);
  await root.locator('.chat-queue-item').nth(1).getByRole('button', { name: /^Steer/ }).click();
  await expectCollapsed(users.nth(1), steered);
  await expect(root.locator('[data-chat-state="active"]')).toHaveCount(1);
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  await expectCollapsed(users.nth(2), queued);
  await expect(root.locator('[data-chat-role="assistant"] .chat-bubble-collapsible')).toHaveCount(0);
  await expect(root.locator('[data-chat-role="assistant"] .chat-bubble-toggle')).toHaveCount(0);
  await expect(root.locator('[data-chat-role="assistant"] .chat-bubble')).toHaveCount(0);
  expect(await root.locator('[data-chat-role="assistant"] .chat-content').count()).toBeGreaterThan(0);
  for (const user of await users.all()) {
    await user.getByRole('button', { name: 'Show more', exact: true }).click();
    await expect(user.locator('.chat-bubble-content')).toHaveCSS('max-block-size', 'none');
  }
});

test('collapse controls and expanded messages fit mobile RTL with dark-theme accessibility', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.evaluate(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.dataset.theme = 'moonlight';
  });
  const root = page.locator('[data-chat-message-collapse-demo]');
  const row = example(page, 'long');
  await expectCollapsed(row);
  await row.getByRole('button', { name: 'Show more', exact: true }).click();
  expect(await root.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  const toggle = row.getByRole('button', { name: 'Show less', exact: true });
  const bounds = await toggle.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(375);
  expect((await new AxeBuilder({ page }).include('[data-chat-message-collapse-demo]').analyze()).violations).toEqual([]);
});
