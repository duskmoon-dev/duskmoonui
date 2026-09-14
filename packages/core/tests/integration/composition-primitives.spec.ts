import { expect, test } from '@playwright/test';

test.describe('Composition primitives', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('indicator follows logical start and end in LTR and RTL', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div id="ltr" class="indicator" dir="ltr"><span class="indicator-item indicator-start badge">1</span><button class="btn">Inbox</button></div>
      <div id="rtl" class="indicator" dir="rtl"><span class="indicator-item indicator-start badge">1</span><button class="btn">Inbox</button></div>
    `);
    const ltr = await page.locator('#ltr .indicator-item').boundingBox();
    const rtl = await page.locator('#rtl .indicator-item').boundingBox();
    const ltrAnchor = await page.locator('#ltr').boundingBox();
    const rtlAnchor = await page.locator('#rtl').boundingBox();
    expect(ltr!.x + ltr!.width / 2).toBeCloseTo(ltrAnchor!.x, 0);
    expect(rtl!.x + rtl!.width / 2).toBeCloseTo(rtlAnchor!.x + rtlAnchor!.width, 0);
    await expect(page.locator('#ltr')).toHaveCSS('overflow', 'visible');
  });

  test('join composes mixed native controls and keeps focus above siblings', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <form class="join"><input class="join-item input" aria-label="Query"><select class="join-item select" aria-label="Scope"><option>All</option></select><button class="join-item btn">Go</button></form>
    `);
    await page.locator('select').focus();
    await expect(page.locator('select')).toHaveCSS('z-index', '1');
    await expect(page.locator('form')).toHaveCSS('flex-direction', 'row');
    await page.locator('button').hover();
    await expect(page.locator('button')).toHaveCSS('z-index', '1');
  });

  test('join preserves logical outer corners in RTL', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div class="join" dir="rtl"><button id="first" class="join-item btn">First</button><button class="join-item btn">Middle</button><button id="last" class="join-item btn">Last</button></div>
    `);
    await expect(page.locator('#first')).toHaveCSS('border-top-left-radius', '0px');
    await expect(page.locator('#first')).not.toHaveCSS('border-top-right-radius', '0px');
    await expect(page.locator('#last')).toHaveCSS('border-top-right-radius', '0px');
    await expect(page.locator('#last')).not.toHaveCSS('border-top-left-radius', '0px');
  });

  test('stack overlaps items without absolute positioning', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div class="stack stack-end"><div class="card">Front</div><div class="card" style="height: 80px">Taller back</div></div>
    `);
    const front = await page.locator('.stack > :first-child').boundingBox();
    const back = await page.locator('.stack > :nth-child(2)').boundingBox();
    await expect(page.locator('.stack > :nth-child(2)')).toHaveCSS('position', 'relative');
    expect(back!.x).toBeGreaterThan(front!.x);
    const stack = await page.locator('.stack').boundingBox();
    expect(stack!.height).toBeGreaterThanOrEqual(80);
  });

  for (const theme of ['sunshine', 'moonlight']) {
    test(`hero and footer compose in the ${theme} theme`, async ({ page }) => {
      await page.setContent(`
        <link rel="stylesheet" href="/dist/index.css">
        <main data-theme="${theme}">
          <section class="hero hero-start" style="min-height: 12rem"><div class="hero-overlay"></div><div class="hero-content"><h1>Overview</h1></div></section>
          <footer class="footer"><nav><h2 class="footer-title">Product</h2><a href="#docs">Docs</a></nav><nav><h2 class="footer-title">Company</h2><a href="#about">About</a></nav></footer>
        </main>
      `);
      await expect(page.locator('.hero')).toHaveCSS('display', 'grid');
      await expect(page.locator('.hero-content')).toHaveCSS('z-index', '1');
      await expect(page.locator('.footer')).toHaveCSS('display', 'grid');
      await expect(page.locator('.footer')).toHaveCSS('color', /(?:rgb|oklch)/);
    });
  }

  test('sidebar layout responds to its container and application state', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div id="narrow-wrap" style="width: 30rem"><div id="narrow" class="sidebar-layout"><aside class="sidebar-layout-sidebar">Nav</aside><main class="sidebar-layout-content">Content</main></div></div>
      <div id="wide-wrap" style="width: 60rem"><div id="wide" class="sidebar-layout"><aside class="sidebar-layout-sidebar">Nav</aside><main class="sidebar-layout-content">Content</main></div></div>
    `);
    await expect(page.locator('#narrow .sidebar-layout-sidebar')).toHaveCSS('display', 'none');
    await expect(page.locator('#wide .sidebar-layout-sidebar')).toHaveCSS('display', 'block');
    await expect(page.locator('#wide .sidebar-layout-sidebar')).toHaveCSS('width', '280px');
    await page.locator('#wide').evaluate((element) => element.classList.add('sidebar-layout-compact'));
    await expect(page.locator('#wide .sidebar-layout-sidebar')).toHaveCSS('width', '80px');
    await page.locator('#wide').evaluate((element) => element.classList.add('sidebar-layout-hidden'));
    await expect(page.locator('#wide .sidebar-layout-sidebar')).toHaveCSS('display', 'none');
  });

  test('sidebar start and end follow RTL geometry', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div style="width: 60rem" dir="rtl"><div id="rtl-start" class="sidebar-layout sidebar-layout-start"><aside class="sidebar-layout-sidebar">Nav</aside><main class="sidebar-layout-content">Content</main></div></div>
      <div style="width: 60rem" dir="rtl"><div id="rtl-end" class="sidebar-layout sidebar-layout-end"><aside class="sidebar-layout-sidebar">Nav</aside><main class="sidebar-layout-content">Content</main></div></div>
    `);
    const startSidebar = await page.locator('#rtl-start .sidebar-layout-sidebar').boundingBox();
    const startLayout = await page.locator('#rtl-start').boundingBox();
    const endSidebar = await page.locator('#rtl-end .sidebar-layout-sidebar').boundingBox();
    const endLayout = await page.locator('#rtl-end').boundingBox();
    expect(startSidebar!.x + startSidebar!.width).toBeCloseTo(startLayout!.x + startLayout!.width, 0);
    expect(endSidebar!.x).toBeCloseTo(endLayout!.x, 0);
  });

  test('mask shapes clip image and background content while preserving aspect ratios', async ({ page }) => {
    await page.setContent(`
      <link rel="stylesheet" href="/dist/index.css">
      <div id="background" class="mask mask-diamond" style="width: 8rem; height: 5rem; background: red"></div>
      <img id="image" class="mask mask-circle" width="96" height="96" alt="Color sample" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='blue'/%3E%3C/svg%3E">
    `);
    await expect(page.locator('#background')).toHaveCSS('clip-path', /polygon/);
    await expect(page.locator('#image')).toHaveCSS('clip-path', /circle/);
    await expect(page.locator('#image')).toHaveCSS('object-fit', 'cover');
    const background = await page.locator('#background').boundingBox();
    expect(background!.width / background!.height).toBeCloseTo(128 / 80, 1);
  });
});
