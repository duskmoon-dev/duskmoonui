import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { generatePluginCSS } from '../../src/index';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const bundle = read('../../dist/index.css');
const legacy = read('../../src/themes/generated/sunshine.css') + read('../../src/themes/generated/moonlight.css') + read('../../src/themes/generated/spacing.css') +
  read('../../src/components/button.css') + read('../../src/components/popover.css') +
  generatePluginCSS({ base: false, components: ['chat'] });

async function fixture(page: Page, css: string, theme: string, markup: string) {
  await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><title>Chat contracts</title><style>${css}
    * { transition: none !important; animation: none !important; }
    body { margin: 8px; background: var(--color-surface); color: var(--color-on-surface); }
  </style></head><body><main><h1>Chat contracts</h1>${markup}</main></body></html>`);
}

async function contrast(page: Page, selector: string) {
  return page.locator(selector).evaluateAll(elements => {
    const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    const rgba = (color: string) => {
      context.clearRect(0, 0, 1, 1); context.fillStyle = color; context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data].map(c => c / 255);
    };
    const luminance = (rgb: number[]) => rgb.slice(0, 3).reduce((s, c, i) => s + [0.2126, 0.7152, 0.0722][i] * (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4), 0);
    return elements.map(element => {
      const foreground = rgba(getComputedStyle(element).color);
      let background = [1, 1, 1, 1];
      for (let ancestor: Element | null = element; ancestor; ancestor = ancestor.parentElement) {
        const color = rgba(getComputedStyle(ancestor).backgroundColor);
        if (color[3] === 1) { background = color; break; }
        if (color[3] !== 0) throw new Error('Expected opaque or transparent backgrounds');
      }
      const a = luminance(foreground), b = luminance(background);
      return { text: element.textContent, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
    });
  });
}

const settings = `<form class="chat-composer">
  <textarea class="chat-composer-input" aria-label="Message"></textarea>
  <div class="chat-composer-toolbar chat-composer-toolbar-compact"><div class="chat-composer-actions">
    <button class="btn btn-ghost btn-sm chat-composer-access" data-active="true" type="button" popovertarget="demo-access" style="anchor-name:--demo-access">Access</button>
    <button class="btn btn-ghost btn-sm chat-composer-config chat-composer-model" type="button" popovertarget="demo-model" style="anchor-name:--demo-model"><span class="chat-composer-label">A very long model name that must truncate <span class="chat-composer-effort">Medium</span></span></button>
    <button class="btn btn-primary btn-sm" type="button">Send</button>
  </div></div>
</form>
<div id="demo-access" class="popover popover-menu chat-composer-menu" popover style="position-anchor:--demo-access" aria-label="Access choices"><button class="popover-menu-item" type="button" popovertarget="demo-access" popovertargetaction="hide">Ask first</button></div>
<div id="demo-model" class="popover popover-menu chat-composer-menu chat-composer-menu-end" popover style="position-anchor:--demo-model" aria-label="Models"><button class="popover-menu-item" type="button">Model A</button></div>`;

const context = `<div class="chat-composer-context" role="group" aria-label="Session context">
  <span class="chat-composer-context-item" title="/workspace/long-project-path/${'nested/'.repeat(30)}"><svg class="chat-composer-context-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 3h14v10H1z"/></svg><span class="chat-composer-context-label">/workspace/long-project-path/${'nested/'.repeat(30)}</span></span>
  <div class="chat-composer-context-end"><span class="chat-composer-context-item"><span class="chat-composer-context-label">Active goal</span><button class="btn btn-ghost btn-xs" type="button" aria-label="Clear goal">×</button></span>
    <span class="chat-composer-connection" data-state="connected" role="status">Connected</span></div>
</div>`;
const states = ['pending', 'approved', 'approved-for-session', 'declined', 'expired', 'answer-elsewhere'];
const approval = (state: string) => `<section class="chat-approval" data-state="${state}" aria-label="${state} approval">
  <div class="chat-approval-header"><h2 class="chat-approval-title">Run a command</h2><span class="chat-approval-status" role="status">${state}</span></div>
  <div class="chat-approval-details"><pre tabindex="0" role="region" aria-label="Requested command"><code>npm test ${'long-argument-'.repeat(40)}</code></pre><ul><li>src/file.ts</li></ul><p>${state === 'answer-elsewhere' ? 'Respond in the terminal.' : 'Run checks before continuing.'}</p></div>
  <div class="chat-approval-actions"><button class="btn btn-primary btn-sm" type="button">Approve</button><button class="btn btn-outlined btn-sm" type="button">Approve for session</button><button class="btn btn-error btn-sm" type="button">Decline</button></div>
</section>`;

for (const [distribution, css] of [['bundle', bundle], ['legacy', legacy]]) {
  for (const theme of ['sunshine', 'moonlight']) {
    test(`${distribution}/${theme}: settings triggers retain native menus and readable colors`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await fixture(page, css, theme, settings);
      const model = page.locator('.chat-composer-model');
      expect(parseFloat(await model.evaluate(el => getComputedStyle(el).borderRadius))).toBeGreaterThan(100);
      expect(await model.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
      await expect(page.locator('.chat-composer-access')).toHaveCSS('margin-inline-end', /\d+px/);
      for (const result of await contrast(page, '.chat-composer-access, .chat-composer-label, .chat-composer-effort')) expect(result.ratio, result.text || '').toBeGreaterThanOrEqual(4.5);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const label = page.locator('.chat-composer-model .chat-composer-label');
      expect(await label.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      await page.locator('.chat-composer-access').focus();
      expect(await page.locator('.chat-composer-access').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
      await page.keyboard.press('Enter');
      await expect(page.locator('#demo-access')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#demo-access')).toBeHidden();
      await expect(page.locator('.chat-composer-access')).toBeFocused();
      await model.click();
      await expect(page.locator('#demo-model')).toBeVisible();
      const menu = await page.locator('#demo-model').boundingBox();
      expect(menu!.x).toBeGreaterThanOrEqual(0);
      expect(menu!.x + menu!.width).toBeLessThanOrEqual(360);
      await page.keyboard.press('Escape');
    });

    test(`${distribution}/${theme}: attached context follows shell variants, wraps and truncates`, async ({ page }) => {
      for (const width of [320, 900]) {
        await page.setViewportSize({ width, height: 800 });
        for (const variant of ['', 'chat-composer-compact', 'chat-composer-ghost', 'chat-composer-compact chat-composer-ghost']) {
          await fixture(page, css, theme, `<form class="chat-composer ${variant}">${context}<textarea class="chat-composer-input" aria-label="Message"></textarea></form>`);
          const metrics = await page.locator('.chat-composer').evaluate(shell => {
            const bar = shell.querySelector('.chat-composer-context')!;
            const a = shell.getBoundingClientRect(), b = bar.getBoundingClientRect();
            const s = getComputedStyle(shell), c = getComputedStyle(bar);
            const label = shell.querySelector('.chat-composer-context-label')!;
            return { left: b.left - a.left, right: a.right - b.right, top: b.top - a.top,
              background: c.backgroundColor, shellBackground: s.backgroundColor,
              radius: c.borderStartStartRadius, shellRadius: s.borderStartStartRadius,
              inset: s.paddingInlineStart, border: s.borderColor,
              textOverflow: getComputedStyle(label).textOverflow, labelWidth: label.clientWidth, labelScroll: label.scrollWidth,
              overflow: document.documentElement.scrollWidth > window.innerWidth };
          });
          expect(metrics.left).toBe(1); expect(metrics.right).toBe(1); expect(metrics.top).toBe(1);
          expect(metrics.background).toBe(metrics.shellBackground);
          expect(metrics.radius).toBe(metrics.shellRadius);
          expect(metrics.inset).toBe(variant.includes('compact') ? '10px' : '16px');
          if (variant.includes('ghost')) expect(metrics.border).toBe('rgba(0, 0, 0, 0)');
          expect(metrics.textOverflow).toBe('ellipsis');
          if (width === 320) expect(metrics.labelScroll).toBeGreaterThan(metrics.labelWidth);
          expect(metrics.overflow).toBe(false);
          for (const state of ['connected', 'connecting', 'disconnected']) {
            await page.locator('.chat-composer-connection').evaluate((el, state) => { el.setAttribute('data-state', state); el.textContent = state; }, state);
            for (const result of await contrast(page, '.chat-composer-connection, .chat-composer-context-label')) expect(result.ratio, `${state}/${result.text}`).toBeGreaterThanOrEqual(4.5);
          }
          await page.locator('[aria-label="Clear goal"]').focus();
          expect(await page.locator('[aria-label="Clear goal"]').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
          await page.locator('.chat-composer-context').evaluate(el => el.setAttribute('hidden', ''));
          await expect(page.locator('.chat-composer-context')).toBeHidden();
        }
      }
    });

    test(`${distribution}/${theme}: approval states preserve host action order and pending behavior`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await fixture(page, css, theme, `<div class="chat chat-start chat-agent"><div class="chat-content"><details class="chat-tool"><summary class="chat-tool-header">Tool call</summary></details>${states.map(approval).join('')}</div></div><form class="chat-composer"><textarea class="chat-composer-input" aria-label="Message"></textarea></form>`);
      for (const state of states) {
        const request = page.locator(`.chat-approval[data-state="${state}"]`);
        for (const result of await contrast(page, `.chat-approval[data-state="${state}"] .chat-approval-title, .chat-approval[data-state="${state}"] .chat-approval-status`)) expect(result.ratio, `${state}/${result.text}`).toBeGreaterThanOrEqual(4.5);
        if (state === 'answer-elsewhere') {
          await expect(request.locator('.chat-approval-actions')).toBeHidden();
          await expect(request.locator('.chat-approval-details')).toContainText('Respond in the terminal.');
        } else {
          expect(await request.getByRole('button').allTextContents()).toEqual(['Approve', 'Approve for session', 'Decline']);
          const boxes = await request.getByRole('button').evaluateAll(elements => elements.map(el => {const r=el.getBoundingClientRect();return {left:r.left,right:r.right}}));
          expect(boxes.every(r => r.left >= 0 && r.right <= 320)).toBe(true);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const pending = page.locator('.chat-approval[data-state="pending"]');
      const command = pending.getByRole('region', { name: 'Requested command' });
      await command.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => command.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
      await pending.getByRole('button', { name: 'Approve', exact: true }).focus();
      expect(await pending.getByRole('button', { name: 'Approve', exact: true }).evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
      await page.evaluate(() => { (window as any).decisions = 0; document.querySelector('.chat-approval-actions')!.addEventListener('click', () => (window as any).decisions++); });
      await page.keyboard.press('Enter');
      expect(await page.evaluate(() => (window as any).decisions)).toBe(1);
      await expect(pending).toHaveAttribute('data-state', 'pending');
      await pending.evaluate(el => {el.setAttribute('aria-busy', 'true'); el.querySelectorAll('button').forEach(b => b.disabled = true);});
      await expect(pending.getByRole('button', { name: 'Approve', exact: true })).toBeDisabled();
      await expect(pending).toHaveCSS('border-style', 'dashed');
      await page.getByRole('textbox').focus();
      await page.keyboard.press('Enter');
      expect(await page.evaluate(() => (window as any).decisions)).toBe(1);
      await pending.evaluate(el => el.setAttribute('data-state', 'approved'));
      await expect(page.getByRole('textbox')).toBeFocused();
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
