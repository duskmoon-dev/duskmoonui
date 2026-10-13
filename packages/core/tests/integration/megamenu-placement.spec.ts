import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile } from 'tailwindcss';

const stylesheets = [
  'src/components/megamenu.css',
  'dist/components/megamenu.css',
  'dist/index.css',
  'standalone plugin',
];

let standaloneCss: string;
test.beforeAll(async () => {
  const pluginPath = resolve(import.meta.dirname, '../../dist/standalone/duskmoonui.mjs');
  const plugin = await import(pathToFileURL(pluginPath).href);
  const compiler = await compile('@plugin "duskmoonui";\n@tailwind utilities;', {
    async loadModule() {
      return { base: resolve(import.meta.dirname, '../..'), module: plugin.default, path: pluginPath };
    },
  });
  standaloneCss = compiler.build(['megamenu', 'megamenu-bar', 'megamenu-trigger', 'megamenu-panel', 'megamenu-panel-full']);
});

const placements = [
  { name: 'mobile near the bottom', width: 390, left: 40, top: 810, contentHeight: 231, full: false, above: true },
  { name: 'mobile after scrolling a tall document', width: 390, left: 40, top: 1810, scroll: 1000, contentHeight: 231, full: false, above: true },
  { name: 'full-width mobile near the bottom', width: 390, left: 40, top: 810, contentHeight: 231, full: true, above: true },
  { name: 'narrow desktop near the bottom', width: 768, left: 244, top: 785, contentHeight: 105, full: false, above: true },
  { name: 'desktop near the trailing edge', width: 1440, left: 1200, top: 810, contentHeight: 231, full: false, above: true },
  { name: 'mobile near the top', width: 390, left: 40, top: 0, contentHeight: 231, full: false, above: false },
  { name: 'mobile with tall scrollable content near the bottom', width: 390, left: 40, top: 810, contentHeight: 2000, full: false, above: true },
];

for (const stylesheet of stylesheets) {
  test.describe(`Megamenu placement with ${stylesheet}`, () => {
    for (const placement of placements) {
      test(placement.name, async ({ page }) => {
        await page.setViewportSize({ width: placement.width, height: 960 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/tests/fixtures/test-fixture.html');
        await page.setContent(`<!doctype html>
          ${stylesheet === 'standalone plugin' ? `<style>${standaloneCss}</style>` : `<link rel="stylesheet" href="/${stylesheet}">`}
          <body style="margin:8px">
            <div style="height:${placement.top}px"></div>
            <nav class="megamenu" style="margin-left:${placement.left}px;--megamenu-anchor:--test-mega">
              <ul class="megamenu-bar"><li>
                <button class="megamenu-trigger" id="trigger" popovertarget="test-mega">Explore DuskMoon</button>
                <div class="megamenu-panel ${placement.full ? 'megamenu-panel-full' : ''}" id="test-mega" popover="auto">
                  <div style="height:${placement.contentHeight}px;display:flex;flex-direction:column;justify-content:space-between">
                    <a href="#first">First destination</a>
                    <a id="last-link" href="#last">Last destination</a>
                  </div>
                </div>
              </li></ul>
            </nav>
            <div style="height:1800px"></div>
          </body>`);

        if ('scroll' in placement) await page.evaluate(scroll => window.scrollTo(0, scroll!), placement.scroll);

        const trigger = page.locator('#trigger');
        const panel = page.locator('#test-mega');
        await trigger.click();
        await expect(panel).toBeVisible();
        await expect(panel).toHaveCSS('position-anchor', '--test-mega');
        const bounds = (await panel.boundingBox())!;
        const anchor = (await trigger.boundingBox())!;
        expect(bounds.x).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(placement.width);
        expect(bounds.y).toBeGreaterThanOrEqual(0);
        expect(bounds.y + bounds.height).toBeLessThanOrEqual(960);
        if (placement.above === true) expect(bounds.y + bounds.height).toBeLessThanOrEqual(anchor.y);
        if (placement.above === false) expect(bounds.y).toBeGreaterThanOrEqual(anchor.y + anchor.height);

        await page.locator('#last-link').focus();
        await expect(page.locator('#last-link')).toBeFocused();
        const lastLink = (await page.locator('#last-link').boundingBox())!;
        expect(lastLink.y).toBeGreaterThanOrEqual(bounds.y);
        expect(lastLink.y + lastLink.height).toBeLessThanOrEqual(bounds.y + bounds.height);
        if (placement.contentHeight > 960) {
          expect(await panel.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
        }

        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
        await expect(trigger).toBeFocused();
        await trigger.click();
        await page.mouse.click(placement.width - 1, 959);
        await expect(panel).toBeHidden();
      });
    }
  });
}
