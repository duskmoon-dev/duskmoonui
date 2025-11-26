/**
 * Visual regression tests for color system
 * Tests baseline screenshots for theme rendering
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Color System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test fixture page
    await page.goto('/test-fixture.html');
  });

  test('sunshine theme renders correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    // Wait for theme to apply
    await page.waitForTimeout(100);

    // Take screenshot of color swatches
    const colorSection = page.locator('[data-testid="color-swatches"]');
    await expect(colorSection).toHaveScreenshot('sunshine-colors.png');
  });

  test('moonlight theme renders correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    await page.waitForTimeout(100);

    const colorSection = page.locator('[data-testid="color-swatches"]');
    await expect(colorSection).toHaveScreenshot('moonlight-colors.png');
  });

  test('theme transition is smooth', async ({ page }) => {
    // Start with sunshine
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    // Switch to moonlight
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    // Verify no visual glitches during transition
    await expect(page).toHaveScreenshot('theme-transition.png');
  });

  test('primary color variants are visually distinct', async ({ page }) => {
    const primarySwatches = page.locator('[data-testid="primary-colors"]');
    await expect(primarySwatches).toHaveScreenshot('primary-variants.png');
  });

  test('secondary color variants are visually distinct', async ({ page }) => {
    const secondarySwatches = page.locator('[data-testid="secondary-colors"]');
    await expect(secondarySwatches).toHaveScreenshot('secondary-variants.png');
  });

  test('tertiary color variants are visually distinct', async ({ page }) => {
    const tertiarySwatches = page.locator('[data-testid="tertiary-colors"]');
    await expect(tertiarySwatches).toHaveScreenshot('tertiary-variants.png');
  });

  test('semantic colors render correctly', async ({ page }) => {
    const semanticSwatches = page.locator('[data-testid="semantic-colors"]');
    await expect(semanticSwatches).toHaveScreenshot('semantic-colors.png');
  });

  test('surface colors have proper elevation', async ({ page }) => {
    const surfaceSwatches = page.locator('[data-testid="surface-colors"]');
    await expect(surfaceSwatches).toHaveScreenshot('surface-elevation.png');
  });
});
