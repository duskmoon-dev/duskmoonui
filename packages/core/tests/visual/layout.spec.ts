/**
 * Responsive layout behavior.
 *
 * The viewport stays fixed while the layout containers use different inline
 * sizes. Differing results therefore prove that the layouts respond to their
 * named containers rather than to viewport media queries.
 */

import { test, expect, type Page } from '@playwright/test';

const VIEWPORT = { width: 1280, height: 900 };

async function mount(page: Page, markup: string) {
  await page.locator('body').evaluate((body, content) => {
    body.innerHTML = content;
  }, markup);
}

async function displayOf(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => getComputedStyle(element).display);
}

test.describe('Responsive page layouts', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/tests/fixtures/test-fixture.html');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });
  });

  test('sign page changes composition from its container width', async ({ page }) => {
    await mount(page, `
      <div id="sign-wide" class="sign-page" style="width: 900px">
        <div class="sign-page-frame">
          <aside class="sign-page-aside">DuskMoon</aside>
          <main class="sign-page-main">
            <div class="sign-page-content">Sign in</div>
          </main>
        </div>
      </div>
      <div id="sign-narrow" class="sign-page" style="width: 560px">
        <div class="sign-page-frame">
          <aside class="sign-page-aside">DuskMoon</aside>
          <main class="sign-page-main">
            <div class="sign-page-content">Sign in</div>
          </main>
        </div>
      </div>
    `);

    expect(await page.evaluate(() => window.innerWidth)).toBe(VIEWPORT.width);

    const [wideColumns, narrowColumns] = await Promise.all([
      page.locator('#sign-wide .sign-page-frame').evaluate((element) => getComputedStyle(element).gridTemplateColumns),
      page.locator('#sign-narrow .sign-page-frame').evaluate((element) => getComputedStyle(element).gridTemplateColumns),
    ]);

    expect(wideColumns.split(' ')).toHaveLength(2);
    expect(narrowColumns.split(' ')).toHaveLength(1);
  });

  test('home page swaps appbar navigation for a compact menu trigger by container width', async ({ page }) => {
    await mount(page, `
      <div id="home-wide" class="home-page" style="width: 900px">
        <div class="home-page-frame">
          <header class="appbar">
            <div class="appbar-title">Home</div>
            <nav class="home-page-nav">Primary navigation</nav>
            <button class="appbar-action home-page-menu-trigger" aria-label="Open navigation">Menu</button>
          </header>
          <main class="home-page-main"><div class="home-page-content">Content</div></main>
        </div>
      </div>
      <div id="home-narrow" class="home-page" style="width: 560px">
        <div class="home-page-frame">
          <header class="appbar">
            <div class="appbar-title">Home</div>
            <nav class="home-page-nav">Primary navigation</nav>
            <button class="appbar-action home-page-menu-trigger" aria-label="Open navigation">Menu</button>
          </header>
          <main class="home-page-main"><div class="home-page-content">Content</div></main>
          <div id="home-mobile-menu" class="home-page-mobile-menu" popover>Compact navigation</div>
        </div>
      </div>
    `);

    expect(await page.evaluate(() => window.innerWidth)).toBe(VIEWPORT.width);
    await expect.poll(() => displayOf(page, '#home-wide .home-page-nav')).not.toBe('none');
    await expect.poll(() => displayOf(page, '#home-wide .home-page-menu-trigger')).toBe('none');
    await expect.poll(() => displayOf(page, '#home-narrow .home-page-nav')).toBe('none');
    await expect.poll(() => displayOf(page, '#home-narrow .home-page-menu-trigger')).not.toBe('none');

    await page.locator('#home-mobile-menu').evaluate((element) => (element as HTMLElement & { showPopover(): void }).showPopover());
    await expect(page.locator('#home-mobile-menu')).toBeVisible();
    await page.locator('#home-narrow').evaluate((element) => ((element as HTMLElement).style.width = '900px'));
    await expect.poll(() => displayOf(page, '#home-mobile-menu')).toBe('none');
  });

  test('console page supports expanded, compact, and hidden sidebar states', async ({ page }) => {
    await mount(page, `
      <div id="console-wide" class="console-page" style="width: 960px; height: 640px">
        <div class="console-page-frame">
          <header class="appbar console-page-appbar">
            <button class="appbar-action console-page-sidebar-toggle" aria-label="Change sidebar">Menu</button>
            <div class="appbar-title">Console</div>
            <button class="appbar-action console-page-menu-trigger" aria-label="Open navigation">Menu</button>
          </header>
          <aside class="console-page-sidebar">
            <nav class="console-page-sidebar-body" aria-label="Console navigation">
              <a class="drawer-item" href="#">
                <span class="drawer-item-icon" aria-hidden="true">H</span>
                <span class="console-page-nav-label">Home</span>
              </a>
            </nav>
          </aside>
          <main class="console-page-main">Console content</main>
        </div>
      </div>
    `);

    const consolePage = page.locator('#console-wide');
    const frame = consolePage.locator('.console-page-frame');
    const label = consolePage.locator('.console-page-nav-label');

    await expect.poll(() => frame.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).toMatch(/^\d+(?:\.\d+)?px\s+\d+(?:\.\d+)?px$/);
    await expect.poll(() => label.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');

    await consolePage.evaluate((element) => element.classList.add('console-page-sidebar-compact'));
    await expect.poll(() => frame.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).toMatch(/^80px\s+/);
    await expect.poll(() => label.evaluate((element) => getComputedStyle(element).width)).toBe('1px');
    await expect(consolePage.locator('.drawer-item')).toHaveAccessibleName('Home');
    await expect
      .poll(() =>
        consolePage.locator('.drawer-item').evaluate((item) => {
          const icon = item.querySelector('.drawer-item-icon');
          if (!icon) return Number.POSITIVE_INFINITY;
          const itemBox = item.getBoundingClientRect();
          const iconBox = icon.getBoundingClientRect();
          return Math.abs(itemBox.left + itemBox.width / 2 - (iconBox.left + iconBox.width / 2));
        }),
      )
      .toBeLessThan(1);

    await consolePage.evaluate((element) => {
      element.classList.remove('console-page-sidebar-compact');
      element.classList.add('console-page-sidebar-hidden');
    });
    await expect.poll(() => frame.evaluate((element) => getComputedStyle(element).gridTemplateColumns)).toMatch(/^\d+(?:\.\d+)?px$/);
    await expect.poll(() => displayOf(page, '#console-wide .console-page-sidebar')).toBe('none');
  });

  test('small console container uses the appbar menu instead of the persistent sidebar', async ({ page }) => {
    await mount(page, `
      <div id="console-narrow" class="console-page" style="width: 560px; height: 640px">
        <div class="console-page-frame">
          <header class="appbar console-page-appbar">
            <button class="appbar-action console-page-sidebar-toggle" aria-label="Change sidebar">Sidebar</button>
            <div class="appbar-title">Console</div>
            <button class="appbar-action console-page-menu-trigger" aria-label="Open navigation">Menu</button>
          </header>
          <aside class="console-page-sidebar">Persistent navigation</aside>
          <main class="console-page-main">Console content</main>
          <div class="console-page-mobile-menu" popover>Compact navigation</div>
        </div>
      </div>
    `);

    expect(await page.evaluate(() => window.innerWidth)).toBe(VIEWPORT.width);
    await expect.poll(() => displayOf(page, '#console-narrow .console-page-sidebar')).toBe('none');
    await expect.poll(() => displayOf(page, '#console-narrow .console-page-sidebar-toggle')).toBe('none');
    await expect.poll(() => displayOf(page, '#console-narrow .console-page-menu-trigger')).not.toBe('none');

    const columns = await page
      .locator('#console-narrow .console-page-frame')
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    expect(columns.split(' ')).toHaveLength(1);
  });
});
