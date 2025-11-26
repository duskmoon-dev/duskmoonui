/**
 * Integration tests for plugin loading in browser
 * Tests that CSS custom properties are correctly applied
 */

import { test, expect } from '@playwright/test';

test.describe('Plugin Loading - Browser Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test('CSS custom properties are defined', async ({ page }) => {
    const styles = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return {
        primary: computedStyle.getPropertyValue('--color-primary').trim(),
        secondary: computedStyle.getPropertyValue('--color-secondary').trim(),
        tertiary: computedStyle.getPropertyValue('--color-tertiary').trim(),
        base100: computedStyle.getPropertyValue('--color-base-100').trim(),
        baseContent: computedStyle.getPropertyValue('--color-base-content').trim(),
      };
    });

    // Verify that custom properties have values (not empty)
    expect(styles.primary).not.toBe('');
    expect(styles.secondary).not.toBe('');
    expect(styles.tertiary).not.toBe('');
    expect(styles.base100).not.toBe('');
    expect(styles.baseContent).not.toBe('');
  });

  test('color tokens follow HSL format', async ({ page }) => {
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
    });

    // HSL format: "H S% L%" (e.g., "30 90% 55%")
    const hslPattern = /^\d+\s+\d+%\s+\d+%$/;
    expect(primaryColor).toMatch(hslPattern);
  });

  test('utility classes apply correct colors', async ({ page }) => {
    // Create test element with bg-primary class
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-primary';
      div.id = 'test-element';
      div.style.width = '100px';
      div.style.height = '100px';
      document.body.appendChild(div);
    });

    const bgColor = await page.evaluate(() => {
      const element = document.getElementById('test-element');
      return getComputedStyle(element!).backgroundColor;
    });

    // Should have a valid color (not transparent)
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('transparent');
  });

  test('text utility classes work correctly', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'text-primary';
      div.id = 'text-test';
      div.textContent = 'Test';
      document.body.appendChild(div);
    });

    const textColor = await page.evaluate(() => {
      const element = document.getElementById('text-test');
      return getComputedStyle(element!).color;
    });

    expect(textColor).not.toBe('rgb(0, 0, 0)'); // Not default black
  });

  test('border utility classes work correctly', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'border border-primary';
      div.id = 'border-test';
      div.style.width = '100px';
      div.style.height = '100px';
      document.body.appendChild(div);
    });

    const borderColor = await page.evaluate(() => {
      const element = document.getElementById('border-test');
      return getComputedStyle(element!).borderColor;
    });

    expect(borderColor).not.toBe('rgb(0, 0, 0)');
  });

  test('all 65+ color tokens are defined', async ({ page }) => {
    const tokenCount = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      let count = 0;

      // List of expected tokens
      const tokens = [
        'primary', 'primary-focus', 'primary-content', 'primary-container', 'on-primary-container',
        'secondary', 'secondary-focus', 'secondary-content', 'secondary-container', 'on-secondary-container',
        'tertiary', 'tertiary-focus', 'tertiary-content', 'tertiary-container', 'on-tertiary-container',
        'surface', 'surface-dim', 'surface-bright',
        'surface-container-lowest', 'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest',
        'on-surface', 'on-surface-variant',
        'info', 'info-content', 'info-container', 'on-info-container',
        'success', 'success-content', 'success-container', 'on-success-container',
        'warning', 'warning-content', 'warning-container', 'on-warning-container',
        'error', 'error-content', 'error-container', 'on-error-container',
        'base-100', 'base-200', 'base-300', 'base-400', 'base-500',
        'base-600', 'base-700', 'base-800', 'base-900', 'base-content',
        'outline', 'outline-variant',
        'accent', 'accent-focus', 'accent-content',
        'neutral', 'neutral-focus', 'neutral-content', 'neutral-variant',
        'surface-variant',
        'inverse-surface', 'inverse-on-surface', 'inverse-primary',
        'shadow', 'scrim',
      ];

      for (const token of tokens) {
        const value = computedStyle.getPropertyValue(`--color-${token}`).trim();
        if (value) count++;
      }

      return count;
    });

    expect(tokenCount).toBeGreaterThanOrEqual(65);
  });
});
