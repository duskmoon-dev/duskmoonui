import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const css = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');

async function fixture(page: Page, markup: string) {
  await page.setContent(`<!doctype html><html lang="en" data-theme="sunshine"><head><title>Chat</title><style>${css}</style></head><body><main><h1>Chat</h1>${markup}</main></body></html>`);
}

const message = `<div id="message" class="chat chat-start">
  <div class="chat-bubble">The response is ready.</div>
  <div class="chat-status" aria-label="Response metrics">
    <span class="chat-status-item"><span class="chat-status-value">42</span> token/s</span>
    <span class="chat-status-item"><span class="chat-status-value">1,248</span> tokens</span>
  </div>
  <div class="chat-actions chat-actions-hover">
    <button type="button" class="btn btn-ghost btn-xs">Edit</button>
    <button type="button" class="btn btn-ghost btn-xs">Retry</button>
  </div>
</div>`;

test('marker gaps remain hoverable and clickable across the whole rail width', async ({ page }) => {
  await fixture(page, `<div class="chat-scroll" style="height:220px">
    <div class="chat-scroll-track" aria-label="Reply navigation">${[1,2,3].map(n => `<button type="button" class="chat-scroll-indicator" data-chat-tl="${n}" aria-label="Reply ${n}"></button>`).join('')}</div>
    <div class="chat-scroll-body">${[1,2,3].map(n => `<div class="chat chat-start" data-chat-tl="${n}" style="height:180px"><div class="chat-bubble">Reply ${n}</div></div>`).join('')}</div>
  </div>`);
  const markers = page.locator('.chat-scroll-indicator');
  const boxes = await markers.evaluateAll(items => items.map(el => {
    const r = el.getBoundingClientRect();
    return {x:r.x,y:r.y,width:r.width,height:r.height};
  }));
  const dashHeight = await markers.first().evaluate(el => parseFloat(getComputedStyle(el, '::before').height));
  expect(dashHeight).toBeLessThan(boxes[0].height);
  const trackWidth = await page.locator('.chat-scroll-track').evaluate(el => el.getBoundingClientRect().width);
  expect(boxes[0].width).toBe(trackWidth);
  for (let i = 0; i < boxes.length - 1; i++) {
    expect(Math.abs(boxes[i].y + boxes[i].height - boxes[i+1].y)).toBeLessThan(0.1);
  }
  for (const x of [Math.ceil(boxes[0].x) + 1, Math.floor(boxes[0].x + boxes[0].width/2), Math.floor(boxes[0].x + boxes[0].width) - 1]) {
    for (let y = Math.ceil(boxes[0].y); y < Math.floor(boxes.at(-1)!.y + boxes.at(-1)!.height); y += 1) {
      await page.mouse.move(x, y);
      expect(await page.evaluate(({x,y}) => document.elementFromPoint(x,y)?.classList.contains('chat-scroll-indicator'), {x,y})).toBe(true);
      await expect.poll(() => markers.evaluateAll(items => items.some(el => el.matches(':hover'))), {message:JSON.stringify({x,y,boxes})}).toBe(true);
    }
  }
  await markers.first().evaluate(el => el.addEventListener('click', () => el.setAttribute('data-clicked', 'true')));
  await page.mouse.click(Math.floor(boxes[0].x + boxes[0].width/2), Math.floor(boxes[0].y + boxes[0].height) - 1);
  await expect(markers.first()).toHaveAttribute('data-clicked', 'true');
  await page.mouse.move(890, 790);
  await page.locator('.chat-scroll-indicator').first().evaluate(el => (el as HTMLElement).blur());
  const animation = await markers.first().evaluate(el => {
    const a = el.getAnimations({subtree:true}).find(animation => animation instanceof CSSAnimation && animation.animationName === 'chat-scroll-indicator-activate');
    return { name:getComputedStyle(el,'::before').animationName, timeline: a?.timeline?.constructor.name };
  });
  expect(animation.name).toBe('chat-scroll-indicator-activate');
  expect(animation.timeline).toBe('ViewTimeline');
  await page.emulateMedia({ reducedMotion:'reduce' });
  expect(await markers.first().evaluate(el => getComputedStyle(el,'::before').animationName)).toBe('none');
});

test('metrics stay visible and actions reveal on message hover and keyboard focus without reflow', async ({ page }) => {
  await fixture(page, `<button id="before">Before message</button>${message}`);
  await page.mouse.move(890, 790);
  const actions = page.locator('.chat-actions');
  await expect(actions).toHaveCSS('opacity', '0');
  await expect(page.locator('.chat-status')).toBeVisible();
  const height = await page.locator('#message').evaluate(el => el.getBoundingClientRect().height);
  await page.locator('.chat-bubble').hover();
  await expect(actions).toHaveCSS('opacity', '1');
  await page.getByRole('button', {name:'Retry'}).click();
  expect(await page.locator('#message').evaluate(el => el.getBoundingClientRect().height)).toBe(height);
  await page.locator('#before').focus();
  await page.mouse.move(890, 790);
  await expect(actions).toHaveCSS('opacity', '0');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', {name:'Edit',exact:true})).toBeFocused();
  await expect(actions).toHaveCSS('opacity', '1');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', {name:'Retry'})).toBeFocused();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.setViewportSize({width:320,height:640});
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test.describe('touch chat actions', () => {
  test.use({hasTouch:true, viewport:{width:375,height:700}});
  test('actions are visible before interaction and tappable', async ({page}) => {
    await fixture(page, message);
    expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
    await expect(page.locator('.chat-actions')).toHaveCSS('opacity','1');
    await page.getByRole('button',{name:'Retry'}).evaluate(el => el.addEventListener('click', () => el.setAttribute('data-retried','true')));
    await page.getByRole('button',{name:'Retry'}).tap();
    await expect(page.getByRole('button',{name:'Retry'})).toHaveAttribute('data-retried','true');
  });
});
