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
