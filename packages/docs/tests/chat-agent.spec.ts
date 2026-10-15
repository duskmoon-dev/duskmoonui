import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function demo(page: Page) {
  return page.locator('[data-chat-agent-demo]');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/duskmoonui/docs/en/components/chat/');
  await page.waitForLoadState('networkidle');
  await expect(demo(page)).toBeVisible();
});

test('all documented agent rows use direct content while user rows retain their bubbles', async ({ page }) => {
  const agents = page.locator('article .chat-start');
  expect(await agents.count()).toBeGreaterThan(0);
  expect(await agents.evaluateAll(rows => rows.every(row => row.classList.contains('chat-agent')))).toBe(true);
  await expect(agents.locator('.chat-bubble')).toHaveCount(0);
  const content = demo(page).locator('[data-chat-agent-state="completed"] > .chat-content');
  await expect(content).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(content).toHaveCSS('padding', '0px');
  const users = page.locator('article .chat-end');
  expect(await users.count()).toBeGreaterThan(0);
  expect(await users.evaluateAll(rows => rows.every(row => row.querySelector('.chat-bubble') !== null))).toBe(true);
  const corners = await demo(page).locator('.chat-end .chat-bubble').evaluate(el => {
    const style = getComputedStyle(el);
    return [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomLeftRadius, style.borderBottomRightRadius];
  });
  expect(corners.every(radius => parseFloat(radius) > 0)).toBe(true);
});

test('work summaries report completed and progress statuses and open native details by keyboard', async ({ page }) => {
  const root = demo(page);
  const completed = root.locator('[data-chat-agent-state="completed"]');
  const progress = root.locator('[data-chat-agent-state="progress"]');
  await expect(completed.locator('.chat-work-summary')).toHaveText('Worked · 3 tool calls · 1 failed');
  await expect(progress.locator('.chat-work-summary')).toHaveText('2 commands · 1 other operation · 1 failed');
  expect(await completed.evaluate(row => !!(row.querySelector('.chat-work')!.compareDocumentPosition(row.querySelector('.chat-content')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await progress.evaluate(row => !!(row.querySelector('.chat-content')!.compareDocumentPosition(row.querySelector('.chat-work')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  const summary = completed.locator('.chat-work-summary');
  await expect(completed.locator('.chat-work')).not.toHaveAttribute('open', '');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(completed.locator('.chat-work')).toHaveAttribute('open', '');
  await expect(completed.locator('.chat-work-body')).toBeVisible();
  await expect(completed.locator('.chat-work-body')).toContainText(/failed/i);
  await page.keyboard.press('Space');
  await expect(completed.locator('.chat-work')).not.toHaveAttribute('open', '');
});

test('queued and steered requests keep the same unboxed active reply and user collapse controls', async ({ page }) => {
  const root = page.locator('[data-chat-queue-demo]');
  await root.getByRole('button', { name: 'Start fresh', exact: true }).click();
  const send = async (text: string) => {
    await root.getByRole('textbox', { name: 'Message', exact: true }).fill(text);
    await root.locator('[data-chat-queue-send]').click();
  };
  const long = Array.from({ length: 8 }, (_, index) => `Line ${index + 1}`).join('\n');
  await send(long);
  const active = root.locator('[data-chat-state="active"]');
  await active.evaluate(el => el.setAttribute('data-test-same-agent', 'true'));
  await expect(active.locator('.chat-content.chat-streaming')).toBeVisible();
  await expect(active.locator('.chat-bubble')).toHaveCount(0);
  await send('FIFO request');
  await send('Please focus on tests');
  await root.locator('.chat-queue-item').nth(1).getByRole('button', { name: /^Steer/ }).click();
  await expect(active).toHaveAttribute('data-test-same-agent', 'true');
  await expect(active.locator('.chat-content')).toContainText('Please focus on tests');
  await expect(root.locator('[data-chat-role="user"] .chat-bubble-content').first()).toHaveText(long);
  await expect(root.locator('[data-chat-role="user"] .chat-bubble-toggle').first()).toBeVisible();
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  await expect(root.locator('[data-chat-role="assistant"] .chat-bubble')).toHaveCount(0);
  await expect(root.locator('[data-chat-state="active"] .chat-content.chat-streaming')).toBeVisible();
  expect(await root.locator('[data-chat-role="user"] .chat-bubble-content').allTextContents()).toEqual([long, 'Please focus on tests', 'FIFO request']);
});

for (const dir of ['ltr', 'rtl']) {
  test(`direct agent markdown and work remain accessible on narrow dark-theme screens in ${dir}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.evaluate(dir => {
      document.documentElement.dir = dir;
      document.documentElement.dataset.theme = 'moonlight';
    }, dir);
    const root = demo(page);
    await root.locator('[data-chat-agent-state="completed"] .chat-work-summary').click();
    expect(await root.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    expect(await root.locator('.chat-content').evaluateAll(elements => elements.every(el => el.scrollWidth <= el.clientWidth))).toBe(true);
    const code = root.locator('.code-block pre').first();
    await code.focus();
    await expect(code).toBeFocused();
    expect((await new AxeBuilder({ page }).include('[data-chat-agent-demo]').analyze()).violations).toEqual([]);
  });
}
