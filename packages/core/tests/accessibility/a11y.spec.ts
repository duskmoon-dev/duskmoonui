/**
 * Accessibility audit tests using axe-core
 * Tests WCAG AA compliance for color contrast
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - Color Contrast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test('sunshine theme passes axe accessibility audit', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('moonlight theme passes axe accessibility audit', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('primary text on primary-container meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-primary-container text-on-primary-container p-4';
      div.textContent = 'Test text for contrast';
      div.id = 'contrast-test';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });

  test('secondary text on secondary-container meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-secondary-container text-on-secondary-container p-4';
      div.textContent = 'Test text for contrast';
      div.id = 'contrast-test-secondary';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test-secondary')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });

  test('tertiary text on tertiary-container meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-tertiary-container text-on-tertiary-container p-4';
      div.textContent = 'Test text for contrast';
      div.id = 'contrast-test-tertiary';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test-tertiary')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });

  test('error text on error-container meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-error-container text-on-error-container p-4';
      div.textContent = 'Error message text';
      div.id = 'contrast-test-error';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test-error')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });

  test('base-content on base-100 meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-base-100 text-base-content p-4';
      div.textContent = 'Regular body text';
      div.id = 'contrast-test-base';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test-base')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });

  test('on-surface text on surface meets contrast ratio', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-surface text-on-surface p-4';
      div.textContent = 'Surface text content';
      div.id = 'contrast-test-surface';
      document.body.appendChild(div);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contrast-test-surface')
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(colorContrastViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Semantic Colors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test('info color combinations are accessible', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-info text-info-content p-4';
      div.textContent = 'Info message';
      div.id = 'info-a11y';
      document.body.appendChild(div);
    });

    const results = await new AxeBuilder({ page })
      .include('#info-a11y')
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
  });

  test('success color combinations are accessible', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-success text-success-content p-4';
      div.textContent = 'Success message';
      div.id = 'success-a11y';
      document.body.appendChild(div);
    });

    const results = await new AxeBuilder({ page })
      .include('#success-a11y')
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
  });

  test('warning color combinations are accessible', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-warning text-warning-content p-4';
      div.textContent = 'Warning message';
      div.id = 'warning-a11y';
      document.body.appendChild(div);
    });

    const results = await new AxeBuilder({ page })
      .include('#warning-a11y')
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
  });

  test('error color combinations are accessible', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.className = 'bg-error text-error-content p-4';
      div.textContent = 'Error message';
      div.id = 'error-a11y';
      document.body.appendChild(div);
    });

    const results = await new AxeBuilder({ page })
      .include('#error-a11y')
      .withTags(['wcag2aa'])
      .analyze();

    expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
  });
});
