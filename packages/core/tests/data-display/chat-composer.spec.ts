import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');

async function fixture(page: Page, variant = '', theme = 'sunshine', dir = 'ltr') {
  await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}" dir="${dir}">
    <head><title>Chat composer</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Chat composer</h1>
      <label for="composer-message">Message</label>
      <div class="chat-input-area"><form class="chat-composer ${variant ? `chat-composer-${variant}` : ''}">
        <textarea id="composer-message" name="message" rows="3" class="chat-composer-input"></textarea>
        <div class="chat-composer-actions">
          <button class="btn btn-outlined btn-sm" type="submit" aria-label="Queue message">Queue <kbd class="chat-composer-hint">Enter</kbd></button>
          <button class="btn btn-warning btn-sm" type="button" aria-label="Steer current message">Steer <kbd class="chat-composer-hint">Ctrl+Enter</kbd></button>
        </div>
      </form></div>
    </main></body></html>`);
}

for (const variant of ['', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error', 'ghost']) {
  test(`native integrated composer ${variant || 'default'} exposes focus, resize and readable text`, async ({ page }) => {
    await fixture(page, variant);
    const input = page.getByRole('textbox', { name: 'Message', exact: true });
    await input.fill('A native multiline draft\nSecond line');
    await expect(input).toHaveValue('A native multiline draft\nSecond line');
    await expect(input).toHaveCSS('resize', 'vertical');
    expect(await input.evaluate(el => getComputedStyle(el).color)).toBe(await page.locator('body').evaluate(el => getComputedStyle(el).color));
    await input.focus();
    await expect(input).toBeFocused();
    await expect(input).toHaveCSS('border-width', '0px');
    await expect(input).toHaveCSS('outline-style', 'none');
    await expect(input).toHaveCSS('box-shadow', 'none');
    const composer = page.locator('.chat-composer');
    expect(await composer.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    const border = await composer.evaluate(el => getComputedStyle(el).borderColor);
    if (variant === 'ghost') expect(border).toBe('rgba(0, 0, 0, 0)');
    else expect(border).toBe(await composer.evaluate(el => getComputedStyle(el).color));
    await page.keyboard.press('Tab');
    const queue = page.getByRole('button', { name: 'Queue message', exact: true });
    await expect(queue).toBeFocused();
    expect(await queue.evaluate(el => {
      const style = getComputedStyle(el);
      return style.boxShadow !== 'none' || (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0);
    })).toBe(true);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Steer current message', exact: true })).toBeFocused();
  });
}

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`composer actions and native textarea fit 320px in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await fixture(page, 'primary', theme, dir);
      const input = page.getByRole('textbox', { name: 'Message', exact: true });
      await input.fill('LongUnbrokenDraft'.repeat(30));
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      for (const button of await page.locator('.chat-composer-actions button').all()) {
        await expect(button).toBeVisible();
        const bounds = await button.boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
      }
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
  }
}
