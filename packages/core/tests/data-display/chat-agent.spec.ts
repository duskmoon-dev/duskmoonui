import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');

async function fixture(page: Page, markup: string, theme = 'sunshine', dir = 'ltr') {
  await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}" dir="${dir}">
    <head><title>Agent chat</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Agent chat</h1>${markup}</main></body></html>`);
}

const work = `<details class="chat-work">
  <summary class="chat-work-summary">Worked · 3 tool calls · 1 failed</summary>
  <div class="chat-work-body">
    <details class="chat-reasoning" open><summary>Reasoning</summary>
      <div class="chat-reasoning-body"><p>Checked the result.</p>
        <details class="chat-tool chat-tool-error" open><summary class="chat-tool-header">Check · Failed</summary><div class="chat-tool-result">Validation failed.</div></details>
      </div>
    </details>
    <details class="chat-tool chat-tool-success" open><summary class="chat-tool-header">Search · Done</summary><div class="chat-tool-result">Found the relevant document.</div></details>
  </div>
</details>`;

test('agent output uses the full available body without a bubble or blank avatar column', async ({ page }) => {
  for (const avatar of [false, true]) {
    await fixture(page, `<div id="agent" class="chat chat-start chat-agent">
      ${avatar ? '<div class="chat-avatar"><div class="avatar avatar-sm">AI</div></div>' : ''}
      <div class="chat-content">The response is ready.</div>
    </div><div class="chat chat-end"><div class="chat-bubble chat-bubble-primary">Thanks.</div></div>`);
    const metrics = await page.locator('#agent').evaluate(el => {
      const row = el.getBoundingClientRect();
      const content = el.querySelector('.chat-content')!;
      const body = content.getBoundingClientRect();
      const style = getComputedStyle(content);
      const avatar = el.querySelector('.chat-avatar')?.getBoundingClientRect();
      const rowStyle = getComputedStyle(el);
      return { width: row.width, height: row.height, x: row.x, bodyWidth: body.width, bodyHeight: body.height, bodyX: body.x, bodyY: body.y,
        avatarWidth: avatar?.width ?? 0, avatarHeight: avatar?.height ?? 0, avatarY: avatar?.y, gap: parseFloat(rowStyle.columnGap),
        padding: style.padding, contentMargin: parseFloat(style.marginTop) + parseFloat(style.marginBottom),
        rowPadding: parseFloat(rowStyle.paddingTop) + parseFloat(rowStyle.paddingBottom),
        background: style.backgroundColor, shadow: style.boxShadow, tail: getComputedStyle(content, '::before').content };
    });
    expect(metrics.background).toBe('rgba(0, 0, 0, 0)');
    expect(metrics.padding).toBe('0px');
    expect(metrics.shadow).toBe('none');
    expect(metrics.tail).toBe('none');
    expect(Math.abs(metrics.bodyWidth - (metrics.width - metrics.avatarWidth - (avatar ? metrics.gap : 0)))).toBeLessThan(1);
    expect(metrics.height).toBeLessThanOrEqual(Math.max(metrics.bodyHeight + metrics.contentMargin, metrics.avatarHeight) + metrics.rowPadding + 1);
    if (avatar) expect(metrics.bodyY).toBe(metrics.avatarY);
    else expect(metrics.bodyX).toBe(metrics.x);
    const user = await page.locator('.chat-bubble').evaluate(el => {
      const style = getComputedStyle(el);
      return { background: style.backgroundColor, tail: getComputedStyle(el, '::before').content,
        corners: [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomLeftRadius, style.borderBottomRightRadius] };
    });
    expect(user.background).not.toBe(metrics.background);
    expect(user.tail).toBe('none');
    expect(user.corners.every(radius => parseFloat(radius) > 0)).toBe(true);
  }
});

test('native work disclosure opens with keyboard and nested tools fit the agent body', async ({ page }) => {
  await fixture(page, `<div class="chat chat-start chat-agent">${work}<div class="chat-content">Completed response.</div></div>`);
  const details = page.locator('.chat-work');
  const summary = page.locator('.chat-work-summary');
  await expect(details).not.toHaveAttribute('open', '');
  await expect(summary).toHaveText('Worked · 3 tool calls · 1 failed');
  await expect(page.locator('.chat-work-body')).toBeHidden();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await expect(page.locator('.chat-work-body')).toBeVisible();
  const body = await page.locator('.chat-work-body').boundingBox();
  for (const selector of ['.chat-reasoning', '.chat-work-body > .chat-tool']) {
    const bounds = await page.locator(selector).boundingBox();
    expect(bounds!.width).toBeGreaterThan(body!.width * 0.9);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(body!.x + body!.width + 1);
  }
  await expect(details).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await page.keyboard.press('Space');
  await expect(details).not.toHaveAttribute('open', '');
});

test('generic streaming works on direct agent text and honors reduced motion', async ({ page }) => {
  await fixture(page, '<div class="chat chat-start chat-agent"><div class="chat-content chat-streaming">Generating a reply</div></div>');
  const content = page.locator('.chat-content');
  expect(await content.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('chat-stream-caret');
  expect(await content.evaluate(el => getComputedStyle(el, '::after').content)).not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await content.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('none');
  await content.evaluate(el => el.classList.replace('chat-streaming', 'chat-bubble-streaming'));
  expect(await content.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(await content.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('chat-stream-caret');
});

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`agent prose, work and keyboard-scrollable code fit 320px in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await fixture(page, `<div class="chat chat-start chat-agent">${work}<div class="chat-content">
        <p><a href="#report">${'LongUnbrokenLink'.repeat(30)}</a></p>
        <pre tabindex="0" aria-label="Example code">${'constValue'.repeat(100)}</pre>
      </div></div>`, theme, dir);
      await page.locator('.chat-work-summary').click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      const code = page.locator('pre[aria-label="Example code"]');
      expect(await code.evaluate(el => el.scrollWidth)).toBeGreaterThan(await code.evaluate(el => el.clientWidth));
      await code.focus();
      await expect(code).toBeFocused();
      await page.keyboard.press(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
      await expect.poll(() => code.evaluate(el => Math.abs(el.scrollLeft))).toBeGreaterThan(0);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
  }
}
