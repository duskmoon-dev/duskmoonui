import { test, expect, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function demo(page: Page) {
  return page.locator('[data-chat-queue-demo]');
}

function transcript(root: Locator) {
  return root.locator('[data-chat-queue-transcript]');
}

async function startFresh(root: Locator) {
  await root.getByRole('button', { name: 'Start fresh', exact: true }).click();
}

async function send(root: Locator, text: string) {
  await root.getByRole('textbox', { name: 'Message', exact: true }).fill(text);
  await root.locator('[data-chat-queue-send]').click();
}

async function queuedTexts(root: Locator) {
  return root.locator('.chat-queue-content').allTextContents();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/duskmoonui/docs/en/components/chat/');
  await page.waitForLoadState('networkidle');
  await expect(demo(page)).toBeVisible();
});

test('initial queued samples can steer the active reply and Start fresh restores a usable idle conversation', async ({ page }) => {
  const root = demo(page);
  const active = transcript(root).locator('[data-chat-state="active"]');
  const assistants = transcript(root).locator('[data-chat-role="assistant"]');
  const input = root.getByRole('textbox', { name: 'Message', exact: true });
  const draftSteer = root.locator('[data-chat-queue-form]').getByRole('button', { name: 'Steer current message', exact: true });
  await expect(root.locator('.chat-queue')).toBeVisible();
  await expect(root.locator('.chat-queue-item')).toHaveCount(2);
  await expect(active).toHaveCount(1);
  await expect(root.getByRole('button', { name: 'Queue message', exact: true })).toBeEnabled();
  await expect(draftSteer).toBeEnabled();
  await expect(root.getByRole('button', { name: 'Complete response', exact: true })).toBeEnabled();
  const initialQueue = await queuedTexts(root);
  const assistantCount = await assistants.count();
  await active.evaluate(el => el.setAttribute('data-test-initial-turn', 'true'));
  const queuedSteer = root.locator('.chat-queue-item').first().getByRole('button', { name: /^Steer waiting/ });
  await expect(queuedSteer).toBeEnabled();
  await queuedSteer.click();
  await expect(active).toHaveAttribute('data-test-initial-turn', 'true');
  await expect(active.locator('.chat-content')).toContainText(initialQueue[0]);
  await expect(assistants).toHaveCount(assistantCount);
  await expect(transcript(root).locator('[data-chat-role="user"] .chat-bubble-content').last()).toHaveText(initialQueue[0]);
  expect(await queuedTexts(root)).toEqual(initialQueue.slice(1));

  await input.fill('Discard this draft');
  await startFresh(root);
  await expect(active).toHaveCount(0);
  await expect(transcript(root).locator('[data-chat-role="user"]')).toHaveCount(0);
  await expect(assistants).toHaveCount(1);
  await expect(root.locator('.chat-queue-item')).toHaveCount(0);
  await expect(root.locator('.chat-queue')).toBeHidden();
  await expect(input).toHaveValue('');
  await expect(draftSteer).toBeDisabled();
  await expect(root.getByRole('button', { name: 'Complete response', exact: true })).toBeDisabled();
  await expect(root.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled();
  await send(root, 'A fresh request');
  await expect(active).toHaveCount(1);
  await expect(transcript(root).locator('[data-chat-role="user"] .chat-bubble-content')).toHaveText('A fresh request');
  await expect(root.locator('.chat-queue-item')).toHaveCount(0);
});

test('busy submissions wait in FIFO order and completion starts exactly the oldest message', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  const users = transcript(root).locator('[data-chat-role="user"]');
  const active = transcript(root).locator('[data-chat-state="active"]');
  await expect(root.locator('.chat-queue')).toBeHidden();
  await expect(root.locator('.chat-input-area .chat-queue')).toHaveCount(1);
  await expect(root.locator('.chat-input-area [data-chat-queue-form]')).toHaveCount(1);
  await expect(root.locator('[data-chat-queue-send]')).toHaveAccessibleName('Send message');
  await send(root, 'First request');
  await expect(active).toHaveCount(1);
  await expect(root.locator('[data-chat-queue-send]')).toHaveAccessibleName('Queue message');
  await send(root, 'Second request');
  await send(root, 'Third request');
  expect(await queuedTexts(root)).toEqual(['Second request', 'Third request']);
  await expect(users).toHaveCount(1);

  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  expect(await users.locator('.chat-bubble-content').allTextContents()).toEqual(['First request', 'Second request']);
  expect(await queuedTexts(root)).toEqual(['Third request']);
  await expect(active).toHaveCount(1);
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  expect(await users.locator('.chat-bubble-content').allTextContents()).toEqual(['First request', 'Second request', 'Third request']);
  await expect(root.locator('.chat-queue')).toBeHidden();
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  await expect(active).toHaveCount(0);
  await expect(root.locator('[data-chat-queue-send]')).toHaveAccessibleName('Send message');
  await expect(root.getByRole('button', { name: 'Complete response', exact: true })).toBeDisabled();
});

test('steering a nonfirst message joins the current turn immediately and is never sent twice', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  await send(root, 'Original request');
  await send(root, 'Still waiting');
  await send(root, 'Focus on accessibility');
  const assistants = transcript(root).locator('[data-chat-role="assistant"]');
  const assistantCount = await assistants.count();
  await transcript(root).locator('[data-chat-state="active"]').evaluate(el => el.setAttribute('data-test-current-turn', 'true'));
  await root.locator('.chat-queue-item').nth(1).getByRole('button', { name: /^Steer/ }).click();
  expect(await queuedTexts(root)).toEqual(['Still waiting']);
  const users = transcript(root).locator('[data-chat-role="user"] .chat-bubble-content');
  expect(await users.allTextContents()).toEqual(['Original request', 'Focus on accessibility']);
  await expect(assistants).toHaveCount(assistantCount);
  await expect(transcript(root).locator('[data-chat-state="active"]')).toHaveCount(1);
  await expect(transcript(root).locator('[data-chat-state="active"]')).toHaveAttribute('data-test-current-turn', 'true');
  await expect(transcript(root).locator('[data-chat-state="active"] .chat-content')).toContainText('Focus on accessibility');
  await expect(root.getByRole('status')).toContainText(/steer|current|guid/i);

  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  expect(await users.allTextContents()).toEqual(['Original request', 'Focus on accessibility', 'Still waiting']);
  await expect(transcript(root)).toContainText('Focus on accessibility');
  await expect(root.locator('.chat-queue')).toBeHidden();
});

test('draft Steer immediately guides the same reply while preserving every waiting message', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  const input = root.getByRole('textbox', { name: 'Message', exact: true });
  const steer = root.locator('[data-chat-queue-form]').getByRole('button', { name: 'Steer current message', exact: true });
  await expect(steer).toBeDisabled();
  await send(root, 'Original request');
  await expect(steer).toBeEnabled();
  await send(root, 'Waiting first');
  await send(root, 'Waiting second');
  const active = transcript(root).locator('[data-chat-state="active"]');
  const assistantCount = await transcript(root).locator('[data-chat-role="assistant"]').count();
  await active.evaluate(el => el.setAttribute('data-test-draft-turn', 'true'));
  const correction = 'Use the exact text <strong>without HTML</strong>\nKeep the existing queue.';
  await input.fill(correction);
  await steer.click();
  await expect(active).toHaveAttribute('data-test-draft-turn', 'true');
  await expect(active.locator('.chat-content')).toContainText(correction);
  await expect(transcript(root).locator('[data-chat-role="assistant"]')).toHaveCount(assistantCount);
  expect(await queuedTexts(root)).toEqual(['Waiting first', 'Waiting second']);
  await expect(root.locator('[data-chat-queue-count]')).toContainText('2');
  expect(await transcript(root).locator('[data-chat-role="user"] .chat-bubble-content').allTextContents()).toEqual(['Original request', correction]);
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await expect(transcript(root).locator('strong')).toHaveCount(0);
  for (let index = 0; index < 3; index++) await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  expect(await transcript(root).locator('[data-chat-role="user"] .chat-bubble-content').allTextContents()).toEqual(['Original request', correction, 'Waiting first', 'Waiting second']);
  await expect(steer).toBeDisabled();
});

test('Enter sends or queues, Shift+Enter inserts a newline, and Ctrl/Meta+Enter steers', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  const input = root.getByRole('textbox', { name: 'Message', exact: true });
  const users = transcript(root).locator('[data-chat-role="user"] .chat-bubble-content');
  await input.fill('Idle draft');
  for (const key of ['Control+Enter', 'Meta+Enter']) {
    await input.press(key);
    await expect(users).toHaveCount(0);
    await expect(input).toHaveValue('Idle draft');
  }
  await input.press('Enter');
  expect(await users.allTextContents()).toEqual(['Idle draft']);
  await input.fill('First line');
  await input.press('Shift+Enter');
  await input.pressSequentially('Second line');
  await expect(input).toHaveValue('First line\nSecond line');
  await expect(root.locator('.chat-queue-item')).toHaveCount(0);
  await input.press('Enter');
  expect(await queuedTexts(root)).toEqual(['First line\nSecond line']);
  const active = transcript(root).locator('[data-chat-state="active"]');
  await active.evaluate(el => el.setAttribute('data-test-keyboard-turn', 'true'));
  for (const [key, text] of [['Control+Enter', 'First correction'], ['Meta+Enter', 'Second correction']]) {
    await input.fill(text);
    await input.press(key);
    await expect(active).toHaveAttribute('data-test-keyboard-turn', 'true');
    await expect(active.locator('.chat-content')).toContainText(text);
    await expect(input).toHaveValue('');
  }
  expect(await users.allTextContents()).toEqual(['Idle draft', 'First correction', 'Second correction']);
  expect(await queuedTexts(root)).toEqual(['First line\nSecond line']);
});

test('IME composition and keyCode 229 never dispatch messages or steering', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  await send(root, 'Original request');
  const input = root.getByRole('textbox', { name: 'Message', exact: true });
  await input.fill('中文输入草稿');
  await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', isComposing: true, bubbles: true, cancelable: true });
  await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 229, bubbles: true, cancelable: true });
  await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', ctrlKey: true, keyCode: 229, bubbles: true, cancelable: true });
  await input.dispatchEvent('compositionstart', { data: '中文' });
  await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true });
  await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', ctrlKey: true, bubbles: true, cancelable: true });
  await expect(transcript(root).locator('[data-chat-role="user"]')).toHaveCount(1);
  await expect(root.locator('.chat-queue-item')).toHaveCount(0);
  await expect(input).toHaveValue('中文输入草稿');
  await input.dispatchEvent('compositionend', { data: '中文' });
  await input.press('Enter');
  expect(await queuedTexts(root)).toEqual(['中文输入草稿']);
});

test('queue positions, count and next-message state follow removal, steering and FIFO promotion', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  await send(root, 'Original request');
  for (const text of ['First', 'Second', 'Third']) await send(root, text);
  const numbers = root.locator('.chat-queue-number');
  expect(await numbers.allTextContents()).toEqual(['#1', '#2', '#3']);
  await expect(root.locator('.chat-queue-item-active .chat-queue-content')).toHaveText('First');
  await root.locator('.chat-queue-item').first().getByRole('button', { name: /^Remove/ }).click();
  expect(await numbers.allTextContents()).toEqual(['#1', '#2']);
  await expect(root.locator('.chat-queue-item-active .chat-queue-content')).toHaveText('Second');
  await expect(root.locator('[data-chat-queue-count]')).toContainText('2');
  await root.locator('.chat-queue-item').first().getByRole('button', { name: /^Steer waiting/ }).click();
  expect(await numbers.allTextContents()).toEqual(['#1']);
  await expect(root.locator('.chat-queue-item-active .chat-queue-content')).toHaveText('Third');
  await root.getByRole('button', { name: 'Complete response', exact: true }).click();
  await expect(root.locator('.chat-queue')).toBeHidden();
  await expect(root.locator('[data-chat-queue-count]')).toContainText('0');
  expect(await transcript(root).locator('[data-chat-role="user"] .chat-bubble-content').allTextContents()).toEqual(['Original request', 'Second', 'Third']);
});

test('removing queued messages preserves order and keyboard focus stays on a useful control', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  await send(root, 'Original');
  for (const text of ['Keep first', 'Remove middle', 'Keep last']) await send(root, text);
  await root.locator('.chat-queue-item').nth(1).getByRole('button', { name: /^Remove/ }).focus();
  await page.keyboard.press('Enter');
  expect(await queuedTexts(root)).toEqual(['Keep first', 'Keep last']);
  await expect(root.locator('.chat-queue-item').last().getByRole('button', { name: /^Remove/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(root.locator('.chat-queue-item').first().getByRole('button', { name: /^Remove/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(root.getByRole('textbox', { name: 'Message', exact: true })).toBeFocused();
  await expect(root.locator('.chat-queue')).toBeHidden();
  await expect(transcript(root).locator('[data-chat-role="user"]')).toHaveCount(1);
});

test('steering the only queued message restores composer focus without completing the active reply', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  await send(root, 'Original');
  await send(root, 'A quick correction');
  await root.getByRole('button', { name: /^Steer waiting/ }).focus();
  await page.keyboard.press('Enter');
  await expect(root.getByRole('textbox', { name: 'Message', exact: true })).toBeFocused();
  await expect(root.locator('.chat-queue')).toBeHidden();
  await expect(transcript(root).locator('[data-chat-state="active"]')).toHaveCount(1);
});

test('blank messages are rejected and multiline markup remains literal through queue and steer', async ({ page }) => {
  const root = demo(page);
  await startFresh(root);
  const input = root.getByRole('textbox', { name: 'Message', exact: true });
  const initialMessages = await transcript(root).locator('.chat').count();
  for (const text of ['', '  \n\t  ']) {
    await input.fill(text);
    await root.locator('form').evaluate(el => (el as HTMLFormElement).requestSubmit());
    await expect(transcript(root).locator('.chat')).toHaveCount(initialMessages);
    await expect(root.locator('.chat-queue-item')).toHaveCount(0);
  }
  await send(root, 'Original');
  const literal = '<img src=x onerror="window.chatQueueInjected=true">\nSecond line';
  await send(root, literal);
  expect(await root.locator('.chat-queue-content').textContent()).toBe(literal);
  await expect(root.locator('.chat-queue-content img')).toHaveCount(0);
  await root.getByRole('button', { name: /^Steer waiting/ }).click();
  expect(await transcript(root).locator('[data-chat-role="user"] .chat-bubble-content').last().textContent()).toBe(literal);
  await expect(transcript(root).locator('img')).toHaveCount(0);
  expect(await page.evaluate(() => (window as Window & { chatQueueInjected?: boolean }).chatQueueInjected)).toBeUndefined();
  await input.fill('Line one');
  await input.press('Shift+Enter');
  await input.press('End');
  await input.pressSequentially('Line two');
  await expect(input).toHaveValue('Line one\nLine two');
  await expect(root.locator('.chat-queue-item')).toHaveCount(0);
});

for (const width of [320, 375]) {
  test(`waiting messages fit the ${width}px viewport with accessible actions`, async ({ page }) => {
    await page.setViewportSize({ width, height: 700 });
    const root = demo(page);
    await startFresh(root);
    await send(root, 'Original');
    await send(root, `Line one\n${'LongUnbrokenDraft'.repeat(25)}\nLine three`);
    const content = root.locator('.chat-queue-content');
    expect(await content.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    await expect(content).toHaveAttribute('title', `Line one\n${'LongUnbrokenDraft'.repeat(25)}\nLine three`);
    expect(await root.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.mouse.move(width - 1, 699);
    for (const action of ['Steer', 'Remove']) {
      const button = root.getByRole('button', { name: new RegExp(`^${action} waiting`) });
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible();
      expect(await button.evaluate(el => getComputedStyle(el.parentElement!).opacity)).toBe('1');
      const bounds = await button.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    const trayBounds = await root.locator('.chat-queue').boundingBox();
    const composerBounds = await root.locator('.chat-composer').boundingBox();
    const trayPadding = await root.locator('.chat-queue').evaluate(el => parseFloat(getComputedStyle(el).paddingBottom));
    const overlap = trayBounds!.y + trayBounds!.height - composerBounds!.y;
    expect(overlap).toBeGreaterThanOrEqual(-1);
    expect(overlap).toBeLessThanOrEqual(trayPadding + 1);
    expect(trayBounds!.x).toBeGreaterThan(composerBounds!.x);
    expect(trayBounds!.x + trayBounds!.width).toBeLessThan(composerBounds!.x + composerBounds!.width);
    for (const selector of ['.chat-queue-content', '.chat-queue-actions']) {
      const bounds = await root.locator(selector).boundingBox();
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(composerBounds!.y + 1);
    }
    await expect(root.locator('.chat-composer')).toHaveClass(/chat-composer-ghost/);
    await expect(root.locator('.chat-queue-icon')).toBeVisible();
    const headerBounds = await root.locator('.chat-queue-header').boundingBox();
    const numberBounds = await root.locator('.chat-queue-number').boundingBox();
    expect(headerBounds!.width).toBeLessThanOrEqual(1);
    expect(headerBounds!.height).toBeLessThanOrEqual(1);
    expect(numberBounds!.width).toBeLessThanOrEqual(1);
    await expect(root.getByRole('status')).toHaveCount(1);
    const input = root.getByRole('textbox', { name: 'Message', exact: true });
    await input.focus();
    await expect(input).toHaveCSS('border-width', '0px');
    await expect(input).toHaveCSS('outline-style', 'none');
    await expect(input).toHaveCSS('box-shadow', 'none');
    expect(await root.locator('.chat-composer').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    await page.keyboard.press('Tab');
    await expect(root.getByRole('button', { name: 'Queue message', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(root.locator('[data-chat-queue-form]').getByRole('button', { name: 'Steer current message', exact: true })).toBeFocused();
    expect((await new AxeBuilder({ page }).include('[data-chat-queue-demo]').analyze()).violations).toEqual([]);
  });
}
