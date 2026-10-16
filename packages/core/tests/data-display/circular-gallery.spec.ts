import { readFileSync } from 'node:fs';
import { test, expect, type CDPSession, type Page } from '@playwright/test';

const assets = {
  individual: '../../../css-art/dist/art/circular-gallery.css',
  bundle: '../../../css-art/dist/index.css',
  minified: '../../../css-art/dist/index.min.css',
  standalone: '../../dist/standalone/duskmoonui.css',
};
const image = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="60"%3E%3Cpath fill="teal" d="M0 0h40v60H0z"/%3E%3C/svg%3E';

function gallery(id: string, size: string, rotation = 0) {
  return `<section id="${id}" class="art-circular-gallery ${size}" style="--art-circular-gallery-rotation:${rotation}deg">
    ${Array.from({ length: 20 }, (_, index) => `<div id="${id}-${index + 1}" data-title="Photo ${index + 1}" style="--i:${index + 1};--bg-img:linear-gradient(teal,teal)"><a href="#${id}-${index + 1}"><img src='${image}' alt="Photo ${index + 1}"></a></div>`).join('')}
    <h1>Gallery</h1></section>`;
}

async function previewBox(cdp: CDPSession, selector: string) {
  const { root } = await cdp.send('DOM.getDocument');
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
  const { node } = await cdp.send('DOM.describeNode', { nodeId });
  const preview = node.pseudoElements!.find(pseudo => pseudo.pseudoType === 'before')!;
  return (await cdp.send('DOM.getBoxModel', { backendNodeId: preview.backendNodeId })).model;
}

async function expectCentered(page: Page, cdp: CDPSession, id: string, card: number) {
  const selector = `#${id}-${card}`;
  await page.locator(`${selector} a`).focus();
  await page.keyboard.press('Enter');
  await page.mouse.move(0, 0);
  await expect.poll(() => page.evaluate(() => location.hash)).toBe(selector);
  await expect.poll(() => page.locator(selector).evaluate(el => getComputedStyle(el, '::before').scale)).toBe('1');
  await expect.poll(() => page.locator(selector).evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1');
  const root = await page.locator(`#${id}`).evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2, size: el.clientWidth };
  });
  const box = await previewBox(cdp, selector);
  const quad = box.border;
  expect(Math.abs((quad[0] + quad[4]) / 2 - root.x)).toBeLessThan(1);
  expect(Math.abs((quad[1] + quad[5]) / 2 - root.y)).toBeLessThan(1);
  expect(box.width).toBeCloseTo(root.size * 0.4, 0);
  expect(box.height).toBeCloseTo(root.size * 0.4, 0);
  expect(Math.abs(quad[1] - quad[3])).toBeLessThan(1); // Counterrotation keeps the preview upright.
  const title = await page.locator(selector).evaluate(el => {
    const style = getComputedStyle(el, '::after');
    return { anchor: style.positionAnchor, opacity: style.opacity, content: style.content };
  });
  expect(title).toEqual({ anchor: '--art-circular-gallery-card', opacity: '1', content: `"Photo ${card}"` });
}

for (const [asset, path] of Object.entries(assets)) {
  for (const [size, expected] of [['art-circular-gallery-sm', 400], ['', 600], ['art-circular-gallery-lg', 800]] as const) {
    for (const rotation of [0, 37]) {
      test(`${asset}: ${expected}px at ${rotation}deg centers native hash previews`, async ({ page, context }) => {
        const css = readFileSync(new URL(path, import.meta.url), 'utf8');
        await page.setViewportSize({ width: 1200, height: 1100 });
        await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body style="margin:140px">${gallery('proof', size, rotation)}${gallery('second', size, rotation)}</body></html>`);
        const cdp = await context.newCDPSession(page);
        await expectCentered(page, cdp, 'proof', 1);
        await page.locator('#proof h1').evaluate(el => el.textContent = 'A different and much longer gallery heading');
        await expectCentered(page, cdp, 'proof', 20);
        await expectCentered(page, cdp, 'second', 1);
        await cdp.detach();
      });
    }
  }
}
