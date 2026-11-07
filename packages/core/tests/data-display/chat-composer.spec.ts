import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`compact controls, thumbnail strip and native settings remain bounded in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 720 });
      const icon = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" /></svg>';
      await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}" dir="${dir}">
        <head><title>Compact composer</title><style>${css}</style></head>
        <body style="margin:0;padding:16px"><main><h1>Compact composer</h1>
        <form class="chat-composer chat-composer-ghost">
          <ul class="chat-composer-attachments chat-composer-thumbnails" role="list" aria-label="Attachments">
            ${Array.from({ length: 8 }, (_, i) => `<li class="chat-composer-attachment chat-composer-attachment-tile"><img class="chat-composer-preview" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3C/svg%3E" alt="Attachment ${i + 1}" /><button class="btn btn-ghost btn-xs btn-circle chat-composer-attachment-remove" type="button" aria-label="Remove attachment ${i + 1}">${icon}</button></li>`).join('')}
          </ul>
          <label for="compact-message">Message</label>
          <textarea class="chat-composer-input" id="compact-message" rows="1"></textarea>
          <div class="chat-composer-toolbar chat-composer-toolbar-compact">
            <button class="btn btn-ghost btn-sm btn-circle" type="button" aria-label="Add files">${icon}</button>
            <button class="btn btn-ghost btn-sm btn-circle" type="button" aria-label="Approval mode">${icon}</button>
            <div class="chat-composer-actions">
              <button class="btn btn-ghost btn-sm chat-composer-config" type="button" aria-label="Model settings" popovertarget="compact-settings" style="anchor-name:--compact-settings"><span class="chat-composer-label">A model with a long descriptive name · Maximum</span>${icon}</button>
              <button class="btn btn-primary btn-sm btn-circle" type="button" aria-label="Send message">${icon}</button>
            </div>
          </div>
          <div class="popover popover-menu chat-composer-menu chat-composer-menu-end" id="compact-settings" popover style="position-anchor:--compact-settings"><button class="popover-menu-item" type="button">Model A</button></div>
        </form></main></body></html>`);
      const strip = page.getByRole('list', { name: 'Attachments' });
      expect(await strip.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      expect((await strip.boundingBox())!.height).toBeLessThanOrEqual(112);
      const toolbar = page.locator('.chat-composer-toolbar');
      const controls = await toolbar.locator('button').all();
      const bounds = (await Promise.all(controls.map(button => button.boundingBox()))).map(rect => rect!);
      const centers = bounds.map(rect => rect.y + rect.height / 2);
      expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(1);
      const sorted = bounds.toSorted((a, b) => a.x - b.x);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i - 1].x + sorted[i - 1].width).toBeLessThanOrEqual(sorted[i].x);
      const label = page.locator('.chat-composer-config .chat-composer-label');
      expect(await label.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      await page.getByRole('button', { name: 'Model settings' }).click();
      const menu = page.locator('#compact-settings');
      await expect(menu).toBeVisible();
      await expect(menu).toHaveCSS('position', 'fixed');
      await expect.poll(async () => {
        const rect = (await menu.boundingBox())!;
        return rect.x >= 0 && rect.x + rect.width <= 320 && rect.y >= 0 && rect.y + rect.height <= 720;
      }).toBe(true);
      expect(await menu.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor)).toBe('rgba(0, 0, 0, 0)');
      await page.keyboard.press('Escape');
      await expect(menu).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    });
  }
}

async function fixture(page: Page, variant = '', theme = 'sunshine', dir = 'ltr', editorClass = 'chat-composer-input') {
  await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}" dir="${dir}">
    <head><title>Chat composer</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Chat composer</h1>
      <label for="composer-message">Message</label>
      <div class="chat-input-area"><form class="chat-composer ${variant ? `chat-composer-${variant}` : ''}">
        <textarea id="composer-message" name="message" rows="3" class="${editorClass}" placeholder="Write a message"></textarea>
        <div class="chat-composer-actions">
          <button class="btn btn-outlined btn-sm" type="submit" aria-label="Queue message">Queue <kbd class="chat-composer-hint">Enter</kbd></button>
          <button class="btn btn-warning btn-sm" type="button" aria-label="Steer current message">Steer <kbd class="chat-composer-hint">Ctrl+Enter</kbd></button>
        </div>
      </form></div>
    </main></body></html>`);
}

for (const theme of ['sunshine', 'moonlight']) {
  for (const variant of ['', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error', 'ghost']) {
    test(`native integrated composer ${variant || 'default'} exposes focus, automatic sizing and readable text in ${theme}`, async ({ page }) => {
      await fixture(page, variant, theme);
      const input = page.getByRole('textbox', { name: 'Message', exact: true });
      await input.fill('A native multiline draft\nSecond line');
      await expect(input).toHaveValue('A native multiline draft\nSecond line');
      await expect(input).toHaveCSS('resize', 'none');
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

for (const theme of ['sunshine', 'moonlight']) {
  test(`both native editor classes preserve placeholder, caret and multiline editing in ${theme}`, async ({ page }) => {
    const placeholderColors: string[] = [];
    for (const editorClass of ['chat-composer-input', 'chat-composer-editor']) {
      await fixture(page, '', theme, 'ltr', editorClass);
      const input = page.getByRole('textbox', { name: 'Message', exact: true });
      await expect(input).toHaveAttribute('placeholder', 'Write a message');
      const placeholder = await input.evaluate(el => {
        const style = getComputedStyle(el, '::placeholder');
        return { color: style.color, opacity: style.opacity };
      });
      expect(placeholder.opacity).toBe('1');
      expect(placeholder.color).not.toBe('rgba(0, 0, 0, 0)');
      placeholderColors.push(placeholder.color);
      await input.fill('Native text 你好\nSecond line');
      await expect(input).toHaveValue('Native text 你好\nSecond line');
      await input.evaluate(el => { el.setAttribute('tabindex', '0'); });
      await input.focus();
      await expect(input).toHaveCSS('border-width', '0px');
      await expect(input).toHaveCSS('outline-style', 'none');
      await expect(input).toHaveCSS('box-shadow', 'none');
      await expect(input).toHaveCSS('resize', 'none');
      expect(await input.evaluate(el => getComputedStyle(el).caretColor)).toBe(await input.evaluate(el => getComputedStyle(el).color));
      expect(await page.locator('.chat-composer').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    }
    expect(placeholderColors[0]).toBe(placeholderColors[1]);
  });
}

for (const theme of ['sunshine', 'moonlight']) {
  for (const editorClass of ['chat-composer-input', 'chat-composer-editor']) {
    test(`${editorClass} grows, caps and shrinks with its content in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await fixture(page, '', theme, 'ltr', editorClass);
      const input = page.getByRole('textbox', { name: 'Message', exact: true });
      await expect(input).toHaveCSS('field-sizing', 'content');
      await expect(input).toHaveCSS('resize', 'none');
      const initial = (await input.boundingBox())!.height;
      const lineHeight = await input.evaluate(el => parseFloat(getComputedStyle(el).lineHeight));
      expect(initial).toBeLessThanOrEqual(lineHeight + 1);
      await input.fill('Line one\nLine two\n第三行');
      expect((await input.boundingBox())!.height).toBeGreaterThan(initial);
      await input.fill('LongUnbrokenDraft'.repeat(100));
      const metrics = await input.evaluate(el => ({ height: el.clientHeight, scroll: el.scrollHeight, max: parseFloat(getComputedStyle(el).maxBlockSize) }));
      expect(metrics.height).toBeLessThanOrEqual(metrics.max + 1);
      expect(metrics.scroll).toBeGreaterThan(metrics.height);
      expect(await page.locator('.chat-composer').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await input.fill('Short');
      expect((await input.boundingBox())!.height).toBeCloseTo(initial, 0);
      await input.fill('');
      expect((await input.boundingBox())!.height).toBeCloseTo(initial, 0);
    });
  }
}

const longLabel = 'src/项目/'.repeat(20) + 'composer.ts';

async function richFixture(page: Page, theme = 'sunshine', dir = 'ltr') {
  const states = ['validating', 'uploading', 'ready', 'error', 'cancelled'];
  await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}" dir="${dir}">
    <head><title>Structured composer</title><style>${css}</style></head>
    <body style="background:var(--color-surface);color:var(--color-on-surface)"><main><h1>Structured composer</h1>
      <button id="before-composer" type="button">Before composer</button>
      <div class="chat-input-area"><div class="chat-composer">
        <div class="chat-composer-editor" contenteditable="true" role="textbox" aria-label="Rich message" aria-multiline="true" data-placeholder="Write a message">
          请检查 ${'LongUnbrokenDraft'.repeat(25)}
          <span class="chip chat-composer-reference" contenteditable="false" data-selected="true"><span class="chat-composer-label" title="${longLabel}">${longLabel}</span><button class="btn btn-ghost btn-sm" type="button" aria-label="Remove selected reference">Remove</button></span>
          <span class="chip chat-composer-reference" contenteditable="false" aria-invalid="true"><span class="chat-composer-label">Missing reference</span><button class="btn btn-ghost btn-sm" type="button" aria-label="Remove invalid reference">Remove</button></span>
          <span class="chip chat-composer-reference" contenteditable="false" aria-busy="true"><span class="chat-composer-label">Resolving reference</span></span>
        </div>
        <blockquote class="chat-composer-quote" data-selected="true"><div><p class="chat-composer-quote-text" role="region" tabindex="0" aria-label="Quoted message">${'Quoted line\n'.repeat(20)}${longLabel}</p><cite class="chat-composer-description">Earlier response</cite></div><button class="btn btn-ghost btn-sm" type="button" aria-label="Remove quote">Remove</button></blockquote>
        <ul class="chat-composer-attachments" role="list" aria-label="Attachments">${Array.from({ length: 10 }, (_, index) => `
          <li class="chat-composer-attachment" data-state="${states[index % states.length]}">
            <span class="chat-composer-preview" aria-hidden="true">PDF</span>
            <div class="chat-composer-attachment-info"><span class="chat-composer-filename" title="${longLabel}">${longLabel}</span><span class="chat-composer-description">${states[index % states.length]}</span>${index % states.length === 1 ? '<progress class="progress" max="100" value="35" aria-label="Attachment upload"></progress>' : ''}</div>
            <button class="btn btn-ghost btn-sm" type="button" aria-label="Retry attachment ${index + 1}">Retry</button><button class="btn btn-ghost btn-sm" type="button" aria-label="Remove attachment ${index + 1}">Remove</button>
          </li>`).join('')}</ul>
        <div class="chat-composer-status" role="status" data-state="unknown">Admission outcome is unknown. Keep this draft.</div>
        <div class="chat-composer-toolbar"><button class="btn btn-ghost btn-sm" type="button">Attach files</button><select class="select select-sm" aria-label="Model"><option>Application model</option></select><div class="chat-composer-actions"><button class="btn btn-primary btn-sm" type="button">Send message</button></div></div>
      </div></div>
    </main></body></html>`);
}

for (const theme of ['sunshine', 'moonlight']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`rich parts preserve labels, actions and bounded overflow at 320px in ${theme}/${dir}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await richFixture(page, theme, dir);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      const label = page.locator('.chat-composer-reference .chat-composer-label').first();
      await expect(label).toHaveText(longLabel);
      await expect(label).toHaveAttribute('title', longLabel);
      await expect(label).toHaveCSS('text-overflow', 'ellipsis');
      expect(await label.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      for (const selector of ['.chat-composer-editor', '.chat-composer-attachments']) {
        const metrics = await page.locator(selector).evaluate(el => ({
          height: el.clientHeight, scrollHeight: el.scrollHeight, max: parseFloat(getComputedStyle(el).maxBlockSize),
        }));
        expect(metrics.height).toBeLessThanOrEqual(metrics.max + 1);
        if (selector.endsWith('attachments')) expect(metrics.scrollHeight).toBeGreaterThan(metrics.height);
      }
      for (const name of ['Remove selected reference', 'Remove quote', 'Send message']) {
        const bounds = await page.getByRole('button', { name, exact: true }).boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
      }
      const referenceBounds = await label.boundingBox();
      const removeBounds = await page.getByRole('button', { name: 'Remove selected reference', exact: true }).boundingBox();
      if (dir === 'ltr') expect(removeBounds!.x).toBeGreaterThanOrEqual(referenceBounds!.x + referenceBounds!.width);
      else expect(removeBounds!.x + removeBounds!.width).toBeLessThanOrEqual(referenceBounds!.x);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
  }
}

for (const theme of ['sunshine', 'moonlight', 'ocean', 'forest']) {
  test(`composer semantic states and editor text stay readable in ${theme}`, async ({ page }) => {
    await richFixture(page, theme);
    const references = page.locator('.chat-composer-reference');
    const fills = await references.evaluateAll(elements => elements.map(el => getComputedStyle(el).backgroundColor));
    expect(fills[0]).not.toBe(fills[1]);
    await expect(references.nth(2)).toHaveCSS('border-style', 'dashed');
    const input = page.getByRole('textbox', { name: 'Rich message', exact: true });
    expect(await input.evaluate(el => getComputedStyle(el).color)).toBe(await page.locator('body').evaluate(el => getComputedStyle(el).color));
    await input.evaluate(el => { el.textContent = ''; el.setAttribute('data-empty', 'true'); });
    expect(await input.evaluate(el => getComputedStyle(el, '::before').content)).toContain('Write a message');
    expect(await input.evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1');
    await input.fill('Native selection 你好');
    await input.evaluate(el => { el.removeAttribute('data-empty'); const range = document.createRange(); range.selectNodeContents(el); const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(range); });
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('Native selection 你好');
    expect(await input.evaluate(el => getComputedStyle(el).caretColor)).toBe(await input.evaluate(el => getComputedStyle(el).color));
    const selected = await input.evaluate(el => ({ color: getComputedStyle(el, '::selection').color, background: getComputedStyle(el, '::selection').backgroundColor }));
    expect(selected.color).not.toBe(selected.background);
    await page.locator('.chat-composer').evaluate(el => el.setAttribute('data-state', 'readonly'));
    await input.evaluate(el => { el.setAttribute('contenteditable', 'false'); el.setAttribute('aria-readonly', 'true'); });
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.locator('.chat-composer').evaluate(el => { el.setAttribute('data-state', 'disabled'); el.setAttribute('aria-disabled', 'true'); });
    await page.locator('.chat-composer button, .chat-composer select').evaluateAll(elements => elements.forEach(el => el.setAttribute('disabled', '')));
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeDisabled();
    await expect(page.locator('.chat-composer')).toHaveCSS('opacity', '1');
  });
}

test.describe('touch attachments', () => {
  test.use({ hasTouch: true, viewport: { width: 320, height: 800 } });

  test('retry and remove remain reachable while keyboard focus reveals scrolled rows', async ({ page }) => {
    await richFixture(page);
    expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
    const tray = page.locator('.chat-composer-attachments');
    await page.locator('#before-composer').focus();
    await page.keyboard.press('Tab');
    const last = page.getByRole('button', { name: 'Retry attachment 10', exact: true });
    await last.focus();
    await expect(last).toBeFocused();
    expect(await tray.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
    const trayBounds = await tray.boundingBox();
    const lastBounds = await last.boundingBox();
    expect(lastBounds!.y).toBeGreaterThanOrEqual(trayBounds!.y);
    expect(lastBounds!.y + lastBounds!.height).toBeLessThanOrEqual(trayBounds!.y + trayBounds!.height);
    expect(await last.evaluate(el => { const style = getComputedStyle(el); return style.boxShadow !== 'none' || (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0); })).toBe(true);
    const remove = page.getByRole('button', { name: 'Remove attachment 10', exact: true });
    await expect(remove).toHaveCSS('opacity', '1');
    await remove.evaluate(el => el.addEventListener('click', () => el.setAttribute('data-activated', 'true')));
    await remove.tap();
    await expect(remove).toHaveAttribute('data-activated', 'true');
  });
});

for (const dir of ['ltr', 'rtl']) {
  test(`native suggestions escape a clipped chat container and fit viewport edges in ${dir}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 500 });
    await page.setContent(`<!doctype html><html lang="en" data-theme="moonlight" dir="${dir}"><head><title>Composer suggestions</title><style>${css}</style></head><body style="background:var(--color-surface);color:var(--color-on-surface)">
      <main><h1>Suggestions</h1><div id="chat-container" style="position:fixed;inset-inline:8px;inset-block-end:8px;block-size:100px;overflow:hidden"><div class="chat-input-area"><div class="chat-composer"><textarea class="chat-composer-input" style="anchor-name:--composer-test" aria-label="Message" aria-controls="suggestions" aria-haspopup="listbox"></textarea></div></div>
      <div class="chat-composer-completions" id="suggestions" role="region" tabindex="0" aria-label="Suggestion panel" popover="manual" style="position-anchor:--composer-test"><div class="chat-composer-breadcrumb">Project / src</div><div class="chat-composer-group" id="files-heading">Files</div><div role="listbox" aria-labelledby="files-heading">${Array.from({ length: 8 }, (_, index) => `<div class="chat-composer-option" role="option" tabindex="-1" aria-selected="${index === 0}" ${index === 1 ? 'aria-disabled="true"' : ''}><span class="chat-composer-label">${longLabel}</span><span class="chat-composer-description">File ${index + 1}</span></div>`).join('')}</div><p class="chat-composer-status" role="status">8 matches</p></div>
      </div></main></body></html>`);
    const panel = page.locator('#suggestions');
    await panel.evaluate(el => (el as HTMLElement).showPopover());
    await expect(panel).toBeVisible();
    const bounds = await panel.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(500);
    const container = await page.locator('#chat-container').boundingBox();
    expect(bounds!.y).toBeLessThan(container!.y);
    const active = page.getByRole('option').first();
    await active.focus();
    expect(await active.evaluate(el => { const style = getComputedStyle(el); return style.boxShadow !== 'none' || (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0); })).toBe(true);
    expect(await active.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(await page.getByRole('option').nth(2).evaluate(el => getComputedStyle(el).backgroundColor));
    await expect(page.getByRole('option').nth(1)).toHaveAttribute('aria-disabled', 'true');
    const hit = await active.evaluate(el => { const rect = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)); });
    expect(hit).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await panel.evaluate(el => (el as HTMLElement).hidePopover());
    await expect(panel).toBeHidden();
  });
}
