/**
 * Visual regression tests for Button component
 * Tests all button variants across themes
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('Button Variants - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('primary button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-primary">Primary Button</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-primary.png');
    });

    test('secondary button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-secondary">Secondary Button</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-secondary.png');
    });

    test('tertiary button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-tertiary">Tertiary Button</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-tertiary.png');
    });

    test('outline button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-outline">Outline Button</button>
          <button class="btn btn-outline btn-primary">Outline Primary</button>
          <button class="btn btn-outline btn-secondary">Outline Secondary</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-outline.png');
    });

    test('ghost button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-ghost">Ghost Button</button>
          <button class="btn btn-ghost btn-primary">Ghost Primary</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-ghost.png');
    });

    test('button sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100 flex items-center gap-4';
        container.innerHTML = `
          <button class="btn btn-primary btn-xs">Extra Small</button>
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Default</button>
          <button class="btn btn-primary btn-lg">Large</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-sizes.png');
    });

    test('semantic buttons render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100 flex gap-4';
        container.innerHTML = `
          <button class="btn btn-info">Info</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-error">Error</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-semantic.png');
    });

    test('disabled button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100 flex gap-4';
        container.innerHTML = `
          <button class="btn btn-primary" disabled>Disabled Primary</button>
          <button class="btn btn-secondary" disabled>Disabled Secondary</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('sunshine-btn-disabled.png');
    });
  });

  test.describe('Button Variants - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('all button variants in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-4';
        container.innerHTML = `
          <div class="flex gap-4">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-tertiary">Tertiary</button>
          </div>
          <div class="flex gap-4">
            <button class="btn btn-outline btn-primary">Outline Primary</button>
            <button class="btn btn-ghost btn-primary">Ghost Primary</button>
          </div>
          <div class="flex gap-4">
            <button class="btn btn-info">Info</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-error">Error</button>
          </div>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#button-test');
      await expect(button).toHaveScreenshot('moonlight-btn-all.png');
    });
  });

  test.describe('Button States', () => {
    test('hover state shows visual feedback', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-primary" id="hover-btn">Hover Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#hover-btn');
      await button.hover();
      await expect(page.locator('#button-test')).toHaveScreenshot('btn-hover-state.png');
    });

    test('focus state shows outline', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'button-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-primary" id="focus-btn">Focus Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#focus-btn');
      await button.focus();
      await expect(page.locator('#button-test')).toHaveScreenshot('btn-focus-state.png');
    });
  });
});
