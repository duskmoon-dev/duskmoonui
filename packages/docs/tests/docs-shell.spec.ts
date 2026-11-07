import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const docsUrl = process.env.DOCS_BASE_URL ?? '/duskmoonui/docs/en/components/button/';

test.describe('documentation shell', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const width of [320, 640, 768, 1024, 1279]) {
    test(`collapses navigation into a native dropdown at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(docsUrl);
      const header = page.locator('.docs-header');
      const menu = header.locator('#docs-header-menu');
      const trigger = header.getByRole('button', { name: 'Navigation menu', exact: true });
      await expect(trigger).toBeVisible();
      await expect(header.getByRole('button', { name: /^Theme preference:/ })).toBeVisible();
      await expect(menu.locator('[data-theme-toggle]')).toHaveCount(0);
      await expect(menu).toHaveAttribute('popover', 'auto');
      await expect(menu).toBeHidden();
      expect((await header.boundingBox())!.height).toBeLessThanOrEqual(72);
      await expect(header.locator('.logo .badge')).toBeVisible();
      expect(await header.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      await trigger.focus();
      await page.keyboard.press('Space');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(menu).toBeVisible();
      expect(await menu.evaluate(el => el.matches(':popover-open'))).toBe(true);
      await expect(menu.locator(':scope > a')).toHaveCount(5);
      for (const link of await menu.locator(':scope > a').all()) await expect(link).toBeVisible();
      const controls = header.locator('#docs-header-menu > a, [data-theme-toggle] > button');
      for (const control of await controls.all()) {
        const rect = (await control.boundingBox())!;
        expect(rect.x).toBeGreaterThanOrEqual(0);
        expect(rect.x + rect.width).toBeLessThanOrEqual(width);
      }
      await page.keyboard.press('Tab');
      await expect(menu.getByRole('link', { name: 'Docs', exact: true })).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(menu).toBeHidden();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(trigger).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }

  test('keeps long component titles readable within the mobile viewport', async ({
    page,
  }) => {
    const docsUrl = new URL(
      '/duskmoonui/docs/en/components/autocomplete/',
      process.env.DOCS_BASE_URL ?? 'http://localhost:4321',
    ).href;

    await page.goto(docsUrl);
    await page.waitForLoadState('networkidle');

    const heading = page.locator('article > header h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Autocomplete');

    const headingMetrics = await heading.evaluate(element => {
      const bounds = element.getBoundingClientRect();

      return {
        clientWidth: element.clientWidth,
        fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
        scrollWidth: element.scrollWidth,
        left: bounds.left,
        right: bounds.right,
      };
    });

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
    expect(headingMetrics.scrollWidth).toBeLessThanOrEqual(
      headingMetrics.clientWidth,
    );
    expect(headingMetrics.left).toBeGreaterThanOrEqual(0);
    expect(headingMetrics.right).toBeLessThanOrEqual(375);
    expect(headingMetrics.fontSize).toBeGreaterThanOrEqual(36);

    const futureTitleMetrics = await heading.evaluate(element => {
      element.textContent =
        'ExtraordinarilyLongUnbrokenComponentDocumentationTitle';

      return {
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      };
    });

    expect(futureTitleMetrics.scrollWidth).toBeLessThanOrEqual(
      futureTitleMetrics.clientWidth,
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
  });

  for (const width of [1280, 1440]) {
    test(`keeps navigation inline at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(docsUrl);
      const header = page.locator('.docs-header');
      const menu = header.locator('#docs-header-menu');
      await expect(header.locator('.header-menu-trigger')).toBeHidden();
      await expect(menu).not.toHaveAttribute('popover');
      await expect(menu).toBeVisible();
      const controls = header.locator('#docs-header-menu > a, [data-theme-toggle] > button');
      await expect(controls).toHaveCount(6);
      const rects = (await Promise.all((await controls.all()).map(control => control.boundingBox()))).map(rect => rect!);
      const centers = rects.map(rect => rect.y + rect.height / 2);
      expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(2);
      expect(rects.every(rect => rect.x >= 0 && rect.x + rect.width <= width)).toBe(true);
      expect((await header.boundingBox())!.height).toBeLessThanOrEqual(80);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }

  test('dismisses on outside clicks and navigation, and preserves theme state across resize', async ({ page }) => {
    await page.goto(docsUrl);
    const menu = page.locator('#docs-header-menu');
    const trigger = page.getByRole('button', { name: 'Navigation menu', exact: true });
    const themeToggle = page.locator('[data-theme-toggle]');
    await themeToggle.getByRole('button', { name: /^Theme preference:/ }).click();
    await themeToggle.getByText('Dark', { exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'moonlight');
    await expect(themeToggle.locator('input[value="moonlight"]')).toBeChecked();
    await themeToggle.evaluate(el => { (el as HTMLElement).dataset.testState = 'preserve'; });
    await trigger.click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(trigger).toBeHidden();
    await expect(menu).not.toHaveAttribute('popover');
    await expect(page.locator('[data-test-state="preserve"]')).toBeVisible();
    await expect(themeToggle.locator('input[value="moonlight"]')).toBeChecked();
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(trigger).toBeVisible();
    await expect(menu).toBeHidden();
    await trigger.click();
    await expect(themeToggle.locator('input[value="moonlight"]')).toBeChecked();
    await page.mouse.click(2, 400);
    await expect(menu).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    const target = await menu.getByRole('link', { name: 'Components', exact: true }).evaluate(link => (link as HTMLAnchorElement).href);
    await menu.getByRole('link', { name: 'Components', exact: true }).click();
    await page.waitForURL(target);
    await expect(page.locator('#docs-header-menu')).toBeHidden();
    await expect(page.locator('[data-theme-toggle]')).toHaveCount(1);
    await expect(page.locator('.docs-header')).toHaveCSS('height', '64px');
  });

  for (const theme of ['sunshine', 'moonlight']) {
    test(`native navigation is accessible in ${theme} and RTL`, async ({ page }) => {
      await page.addInitScript(theme => localStorage.setItem('theme-mode', theme), theme);
      await page.goto(docsUrl);
      await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
      await page.getByRole('button', { name: 'Navigation menu', exact: true }).click();
      const menu = page.locator('#docs-header-menu');
      await expect(menu).toBeVisible();
      const rect = (await menu.boundingBox())!;
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.width).toBeLessThanOrEqual(375);
      expect((await new AxeBuilder({ page }).include('.docs-header').analyze()).violations).toEqual([]);
    });
  }

  test('navigation links remain available without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });
    const page = await context.newPage();
    await page.goto(new URL(docsUrl, 'http://localhost:4321').href);
    for (const link of await page.locator('.nav-links > a').all()) await expect(link).toBeVisible();
    await expect(page.locator('.header-menu-trigger')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    await context.close();
  });

  test('production search remains usable inside the dropdown and inline header', async ({ page }) => {
    await page.goto(docsUrl);
    test.skip(await page.locator('#search').count() === 0, 'Pagefind is only included in production.');
    const menu = page.locator('#docs-header-menu');
    await page.getByRole('button', { name: 'Navigation menu', exact: true }).click();
    const search = page.locator('#search .pagefind-ui__search-input');
    await expect(search).toBeVisible();
    await search.fill('composer');
    await expect(page.locator('#search .pagefind-ui__result').first()).toBeVisible();
    const bounds = (await page.locator('#search .pagefind-ui__drawer').boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(375);
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(menu).not.toHaveAttribute('popover');
    await expect(search).toBeVisible();
    await expect(search).toHaveValue('composer');
    expect(await page.locator('.docs-header').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  });

  test('skips unavailable Pagefind assets in development', async ({ page }) => {
    const pagefindFailures: string[] = [];

    page.on('response', response => {
      if (response.status() >= 400 && response.url().includes('/pagefind/')) {
        pagefindFailures.push(`${response.status()} ${response.url()}`);
      }
    });

    const docsUrl =
      process.env.DOCS_BASE_URL ??
      '/duskmoonui/docs/en/components/button/';

    await page.goto(docsUrl);
    await page.waitForLoadState('networkidle');

    expect(pagefindFailures).toEqual([]);
  });
});
