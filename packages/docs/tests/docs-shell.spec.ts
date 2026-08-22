import { expect, test } from '@playwright/test';

test.describe('documentation shell', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('fits the mobile viewport without hiding navigation', async ({ page }) => {
    const docsUrl =
      process.env.DOCS_BASE_URL ??
      '/duskmoonui/docs/en/components/button/';

    await page.goto(docsUrl);
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(5);
    expect(
      await navLinks.evaluateAll(links =>
        links.every(link => {
          const style = window.getComputedStyle(link);
          return style.display !== 'none' && style.visibility !== 'hidden';
        }),
      ),
    ).toBe(true);

    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );

    expect(documentWidth).toBeLessThanOrEqual(375);
  });

  test('fits the tablet viewport with every navigation control visible', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const docsUrl =
      process.env.DOCS_BASE_URL ??
      '/duskmoonui/docs/en/components/button/';

    await page.goto(docsUrl);
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('.nav-links > a');
    const themeController = page.locator('.nav-links .theme-controller');
    await expect(navLinks).toHaveCount(5);
    await expect(themeController).toBeVisible();
    await expect(themeController).toBeEnabled();

    const controlsFit = await page
      .locator('.nav-links > a, .nav-links .theme-controller')
      .evaluateAll(controls =>
        controls.every(control => {
          const bounds = control.getBoundingClientRect();
          const style = window.getComputedStyle(control);
          return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            bounds.width > 0 &&
            bounds.height > 0 &&
            bounds.left >= 0 &&
            bounds.right <= window.innerWidth
          );
        }),
      );

    expect(controlsFit).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(768);
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
