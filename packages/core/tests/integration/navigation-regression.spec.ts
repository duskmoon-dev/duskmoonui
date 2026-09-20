import { expect, test, type Page } from '@playwright/test';

const productionCss = '<link rel="stylesheet" href="/dist/index.css">';

async function installTabIntegration(page: Page) {
  await page.evaluate(() => {
    for (const tablist of document.querySelectorAll<HTMLElement>('[role="tablist"]')) {
      const tabs = Array.from(tablist.querySelectorAll<HTMLElement>(':scope > [role="tab"]'));
      const enabled = () => tabs.filter(tab => !tab.matches(':disabled, [aria-disabled="true"]'));
      const activate = (tab: HTMLElement, focus = true) => {
        for (const candidate of tabs) {
          const selected = candidate === tab;
          candidate.setAttribute('aria-selected', String(selected));
          candidate.tabIndex = selected ? 0 : -1;
          candidate.classList.toggle('tab-active', selected);
          const panelId = candidate.getAttribute('aria-controls');
          const panel = panelId ? document.getElementById(panelId) : null;
          if (panel) {
            panel.hidden = !selected;
            panel.toggleAttribute('inert', !selected);
            panel.classList.toggle('tab-panel-show', selected);
          }
        }
        if (focus) tab.focus();
      };
      tablist.addEventListener('click', event => {
        const tab = (event.target as Element).closest<HTMLElement>('[role="tab"]');
        if (tab?.parentElement === tablist && !tab.matches(':disabled, [aria-disabled="true"]')) activate(tab, false);
      });
      tablist.addEventListener('keydown', event => {
        if (!(event.target instanceof HTMLElement) || event.target.parentElement !== tablist) return;
        const candidates = enabled();
        const current = candidates.indexOf(event.target);
        const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
        const rtl = getComputedStyle(tablist).direction === 'rtl';
        let next = current;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = candidates.length - 1;
        else if (vertical && event.key === 'ArrowDown') next = (current + 1) % candidates.length;
        else if (vertical && event.key === 'ArrowUp') next = (current - 1 + candidates.length) % candidates.length;
        else if (!vertical && event.key === 'ArrowRight') next = (current + (rtl ? -1 : 1) + candidates.length) % candidates.length;
        else if (!vertical && event.key === 'ArrowLeft') next = (current + (rtl ? 1 : -1) + candidates.length) % candidates.length;
        else return;
        event.preventDefault();
        activate(candidates[next]);
      });
    }
  });
}

test.describe('navigation production entrypoint', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('independent and nested tablists keep selection and panels scoped', async ({ page }) => {
    await page.setContent(`${productionCss}
      <div id="outer" class="tabs" role="tablist" aria-label="Outer">
        <button id="outer-a" class="tab tab-active" role="tab" aria-selected="true" aria-controls="outer-panel-a">Outer A</button>
        <button id="outer-b" class="tab" role="tab" aria-selected="false" tabindex="-1" aria-controls="outer-panel-b">Outer B</button>
      </div>
      <section id="outer-panel-a" class="tab-panel tab-panel-show" role="tabpanel">
        <div id="nested" class="tabs" role="tablist" aria-label="Nested">
          <button id="nested-a" class="tab tab-active" role="tab" aria-selected="true" aria-controls="nested-panel-a">Nested A</button>
          <button id="nested-b" class="tab" role="tab" aria-selected="false" tabindex="-1" aria-controls="nested-panel-b">Nested B</button>
        </div>
        <section id="nested-panel-a" class="tab-panel tab-panel-show"><a id="nested-link" href="#nested">Nested action</a></section>
        <section id="nested-panel-b" class="tab-panel" hidden inert>Nested second</section>
      </section>
      <section id="outer-panel-b" class="tab-panel" hidden inert>Outer second</section>
      <div id="peer" class="tabs" role="tablist" aria-label="Peer">
        <button id="peer-a" class="tab tab-active" role="tab" aria-selected="true" aria-controls="peer-panel-a">Peer A</button>
        <button id="peer-b" class="tab" role="tab" aria-selected="false" tabindex="-1" aria-controls="peer-panel-b">Peer B</button>
      </div>
      <section id="peer-panel-a" class="tab-panel tab-panel-show">Peer first</section>
      <section id="peer-panel-b" class="tab-panel" hidden inert>Peer second</section>`);
    await installTabIntegration(page);

    await page.locator('#nested-b').click();
    await expect(page.locator('#nested-b')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#nested-panel-b')).toBeVisible();
    await expect(page.locator('#outer-a')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#peer-a')).toHaveAttribute('aria-selected', 'true');
  });

  test('tab keyboard handling honors RTL, orientation, disabled tabs, Home and End', async ({ page }) => {
    await page.setContent(`${productionCss}
      <div class="tabs" role="tablist" dir="rtl" aria-label="RTL tabs">
        <button id="one" class="tab tab-active" role="tab" aria-selected="true" aria-controls="panel-one">One</button>
        <button id="disabled" class="tab" role="tab" disabled aria-selected="false" tabindex="-1" aria-controls="panel-disabled">Disabled</button>
        <button id="three" class="tab" role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-three">Three</button>
      </div>
      <section id="panel-one" class="tab-panel tab-panel-show">One</section>
      <section id="panel-disabled" class="tab-panel" hidden inert>Disabled</section>
      <section id="panel-three" class="tab-panel" hidden inert>Three</section>
      <div class="tabs tabs-vertical" role="tablist" aria-orientation="vertical" aria-label="Vertical tabs">
        <button id="top" class="tab tab-active" role="tab" aria-selected="true" aria-controls="panel-top">Top</button>
        <button id="bottom" class="tab" role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-bottom">Bottom</button>
      </div>
      <section id="panel-top" class="tab-panel tab-panel-show">Top</section>
      <section id="panel-bottom" class="tab-panel" hidden inert>Bottom</section>`);
    await installTabIntegration(page);

    await page.locator('#one').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#three')).toBeFocused();
    await page.keyboard.press('Home');
    await expect(page.locator('#one')).toBeFocused();
    await page.keyboard.press('End');
    await expect(page.locator('#three')).toBeFocused();
    await page.locator('#top').focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#bottom')).toBeFocused();
    await expect(page.locator('#panel-bottom')).toBeVisible();
  });

  test('hidden panels override stale show state and do not expose descendants to Tab', async ({ page }) => {
    await page.setContent(`${productionCss}
      <section id="stale" class="tab-panel tab-panel-show" hidden inert><button id="unreachable">Unreachable</button></section>
      <button id="before">Before</button><a id="after" href="#after">After</a>`);
    await expect(page.locator('#stale')).toBeHidden();
    await page.locator('#before').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#after')).toBeFocused();
  });

  test('native megamenus open independently and support Escape, light dismiss, focus, and mobile access', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 640 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setContent(`${productionCss}
      <button id="outside">Outside</button>
      <nav id="mega-one" class="megamenu megamenu-desktop" style="--megamenu-anchor: --mega-one-anchor">
        <button id="trigger-one" class="megamenu-trigger" type="button" popovertarget="panel-one">Products</button>
        <div id="panel-one" class="megamenu-panel" popover="auto"><a id="first-link" class="link" href="#first" autofocus>First link</a></div>
      </nav>
      <nav id="mega-two" class="megamenu megamenu-desktop" style="--megamenu-anchor: --mega-two-anchor">
        <button id="trigger-two" class="megamenu-trigger" type="button" popovertarget="panel-two">Company</button>
        <div id="panel-two" class="megamenu-panel" popover="auto"><a class="link" href="#second">Second link</a></div>
      </nav>
      <details id="mobile" class="megamenu-mobile"><summary>Browse</summary><nav class="menu"><a class="link" href="#mobile">Mobile destination</a></nav></details>`);

    await expect(page.locator('#mobile')).toHaveCSS('display', 'block');
    await expect(page.locator('#mega-one')).toHaveCSS('display', 'none');
    await page.setViewportSize({ width: 900, height: 640 });
    await page.locator('#trigger-one').click();
    await expect(page.locator('#panel-one')).toBeVisible();
    expect(await page.locator('#panel-one').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThan(0.001);
    await expect(page.locator('#first-link')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#panel-one')).toBeHidden();
    await expect(page.locator('#trigger-one')).toBeFocused();

    await page.locator('#trigger-one').click();
    await page.locator('#trigger-two').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#panel-one')).toBeHidden();
    await expect(page.locator('#panel-two')).toBeVisible();
    await page.locator('#outside').click();
    await expect(page.locator('#panel-two')).toBeHidden();
  });

  test('Link has visible keyboard focus, wraps in narrow content, and reduces motion', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setContent(`${productionCss}<div style="width:7rem"><a id="link" class="link link-hover" href="#target">averylonglinkwithoutbreakopportunities</a></div>`);
    const link = page.locator('#link');
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
    expect(await link.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThan(0.001);
    const parent = (await link.locator('..').boundingBox())!;
    const box = (await link.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(parent.width + 1);
    expect(box.height).toBeGreaterThan(20);
  });
});
