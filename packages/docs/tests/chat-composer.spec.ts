import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/duskmoonui/docs/en/components/chat/');
  await expect(page.locator('[data-compact-composer="composer-plain"]')).toHaveAttribute('data-initialized', 'true');
});

test('compact composer sizes to content, rejects blank drafts and preserves edits when stopped', async ({ page }) => {
  const form = page.locator('[data-compact-composer="composer-plain"]');
  const input = form.getByRole('textbox', { name: 'Message', exact: true });
  const send = form.locator('[data-send]');
  await expect(send).toBeDisabled();
  await expect(input).not.toHaveAttribute('required');
  await expect(input).toHaveCSS('resize', 'none');
  const emptyHeight = (await input.boundingBox())!.height;
  await input.fill(' \n\t ');
  await input.press('Control+Enter');
  await form.evaluate(el => (el as HTMLFormElement).requestSubmit());
  await expect(send).toBeDisabled();
  await expect(form.getByRole('status')).toBeEmpty();
  expect(await input.evaluate(el => (el as HTMLTextAreaElement).validationMessage)).toBe('');

  await input.fill(Array.from({ length: 40 }, (_, i) => `Draft line ${i}`).join('\n'));
  expect((await input.boundingBox())!.height).toBe(256);
  expect(await input.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  await input.fill('Two lines\nSecond line');
  expect((await input.boundingBox())!.height).toBeGreaterThan(emptyHeight);
  expect((await input.boundingBox())!.height).toBeLessThan(256);

  await input.dispatchEvent('compositionstart');
  await expect(send).toBeDisabled();
  await input.press('Control+Enter');
  await expect(input).toHaveValue('Two lines\nSecond line');
  await input.dispatchEvent('compositionend');
  await expect(send).toBeEnabled();
  await input.press('Control+Enter');
  await expect(input).toHaveValue('');
  expect((await input.boundingBox())!.height).toBe(emptyHeight);
  await expect(send).toHaveAttribute('aria-label', 'Stop response');
  await expect(form.locator('[data-stop-icon]')).toBeVisible();
  await input.fill('Keep this next draft');
  await send.click();
  await expect(input).toHaveValue('Keep this next draft');
  await expect(send).toHaveAttribute('aria-label', 'Send message');
  await expect(form.locator('[data-send-icon]')).toBeVisible();
  await expect(form.getByRole('status')).toHaveText('Demo response stopped.');
  await expect(input).toBeFocused();
});

test('native configuration popovers update approval, model, effort and source choices', async ({ page }) => {
  const form = page.locator('[data-compact-composer="composer-plain"]');
  const approval = form.locator('[data-permission-trigger]');
  await approval.click();
  const permissions = form.locator('#demo-composer-plain-permissions');
  await expect(permissions).toBeVisible();
  expect(await permissions.evaluate(el => el.matches(':popover-open'))).toBe(true);
  await expect(permissions.locator('[aria-pressed="true"]')).toContainText('Ask for approval');
  await permissions.locator('[data-permission="Full access"]').click();
  await expect(approval).toHaveAttribute('aria-label', 'Approval mode: Full access');
  await expect(permissions).toBeHidden();
  await expect(approval).toBeFocused();
  await approval.click();
  await expect(permissions.locator('[data-permission="Full access"]')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(permissions).toBeHidden();

  const config = form.locator('[data-config-trigger]');
  await config.click();
  const settings = form.locator('#demo-composer-plain-settings');
  await expect(settings).toBeVisible();
  const effort = settings.getByRole('slider', { name: 'Reasoning effort' });
  await effort.fill('3');
  await expect(effort).toHaveAttribute('aria-valuetext', 'Maximum');
  await expect(config).toHaveText('Model A · Maximum');
  await settings.getByRole('button', { name: 'Reset reasoning effort' }).click();
  await expect(effort).toHaveValue('1');
  await expect(config).toHaveText('Model A · Medium');
  await settings.getByRole('button', { name: 'Model Model A' }).click();
  const models = form.locator('#demo-composer-plain-models');
  await expect(models).toBeVisible();
  await models.getByRole('button', { name: 'Model B', exact: true }).click();
  await expect(config).toHaveText('Model B · Medium');
  await expect(models).toBeHidden();
  await expect(config).toBeFocused();

  const add = form.getByRole('button', { name: 'Add files and more', exact: true });
  await add.click();
  await form.getByRole('button', { name: 'Composer help', exact: true }).click();
  await expect(form.locator('#demo-composer-plain-help')).toBeVisible();
  await expect(form.locator('#demo-composer-plain-help')).toContainText('Ctrl/⌘+Enter sends.');
  await page.keyboard.press('Escape');
  // A second Escape also dismisses the parent add menu when native popovers nest.
  await page.keyboard.press('Escape');
  await add.click();
  await form.getByRole('button', { name: 'Source reference' }).click();
  await form.getByRole('button', { name: 'chat.css', exact: true }).click();
  await expect(form.getByRole('textbox')).toHaveValue('@components/chat.css ');
  await expect(form.getByRole('textbox')).toBeFocused();
  await expect(form.locator('.chat-composer-menu:popover-open')).toHaveCount(0);
});

test('attachments render above the editor, enable sending and release local previews on removal', async ({ page }) => {
  const form = page.locator('[data-compact-composer="composer-plain"]');
  const strip = form.locator('[data-attachments]');
  const input = form.getByRole('textbox');
  await form.getByRole('button', { name: 'Add files and more', exact: true }).click();
  const chooser = page.waitForEvent('filechooser');
  await form.getByRole('button', { name: 'Files', exact: true }).click();
  await (await chooser).setFiles([
    { name: 'preview.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64') },
    { name: '<review>.txt', mimeType: 'text/plain', buffer: Buffer.from('Local demo file') },
  ]);
  await expect(strip.locator('li')).toHaveCount(2);
  await expect(form.locator('[data-send]')).toBeEnabled();
  await expect(strip.getByRole('img', { name: 'preview.png' })).toHaveAttribute('src', /^blob:/);
  await expect(strip.locator('.chat-composer-filename')).toHaveText('<review>.txt');
  expect((await strip.boundingBox())!.y + (await strip.boundingBox())!.height).toBeLessThanOrEqual((await input.boundingBox())!.y);
  const blob = await strip.locator('img').getAttribute('src');
  await form.getByRole('button', { name: 'Remove preview.png', exact: true }).click();
  expect(await page.evaluate(async url => {
    try { await fetch(url!); return true; } catch { return false; }
  }, blob)).toBe(false);
  await form.getByRole('button', { name: 'Remove <review>.txt', exact: true }).click();
  await expect(strip).toBeHidden();
  await expect(form.locator('[data-send]')).toBeDisabled();
  await expect(input).toBeFocused();

  const sample = page.locator('[data-compact-composer="composer-files"]');
  await expect(sample.locator('img[data-preview]')).toBeVisible();
  expect(await sample.locator('img[data-preview]').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(sample.locator('[data-send]')).toBeEnabled();
  await sample.locator('[data-send]').click();
  await expect(sample.locator('[data-attachments]')).toBeHidden();
  await expect(sample.locator('[data-send]')).toHaveAttribute('aria-label', 'Stop response');
});

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`compact toolbars, thumbnails and native menus fit a 320px viewport in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 760 });
      await page.evaluate(({ theme, dir }) => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.dir = dir;
      }, { theme, dir });
      for (const id of ['composer-plain', 'composer-files']) {
        const form = page.locator(`[data-compact-composer="${id}"]`);
        const toolbar = form.locator('.chat-composer-toolbar');
        await toolbar.scrollIntoViewIfNeeded();
        const buttons = await toolbar.locator('button').all();
        const bounds = await Promise.all(buttons.map(button => button.boundingBox()));
        const centers = bounds.map(rect => rect!.y + rect!.height / 2);
        expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(1);
        for (const rect of bounds) {
          expect(rect!.x).toBeGreaterThanOrEqual(0);
          expect(rect!.x + rect!.width).toBeLessThanOrEqual(320);
        }
        const sorted = bounds.toSorted((a, b) => a!.x - b!.x);
        for (let i = 1; i < sorted.length; i++) {
          expect(sorted[i - 1]!.x + sorted[i - 1]!.width).toBeLessThanOrEqual(sorted[i]!.x);
        }
        expect(await form.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
        const approval = form.locator('[data-permission-trigger]');
        await approval.click();
        const menu = form.locator(`#demo-${id}-permissions`);
        await expect(menu).toBeVisible();
        await expect(menu).toHaveCSS('position', 'fixed');
        await expect.poll(async () => {
          const rect = (await menu.boundingBox())!;
          return rect.x >= 0 && rect.x + rect.width <= 320 && rect.y >= 0 && rect.y + rect.height <= 760;
        }).toBe(true);
        expect(await menu.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor)).toBe('rgba(0, 0, 0, 0)');
        expect((await new AxeBuilder({ page }).include(`[data-compact-composer="${id}"]`).analyze()).violations).toEqual([]);
        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      await expect(page.getByRole('heading', { name: 'Plain Composer With Toolbar', exact: true })).toHaveCount(0);
      await expect(page.getByRole('heading', { name: 'Attachment Visual States', exact: true })).toHaveCount(0);
      await expect(page.getByRole('heading', { name: 'Queue Conflict And Uncertain Admission', exact: true })).toHaveCount(0);
    });
  }
}
