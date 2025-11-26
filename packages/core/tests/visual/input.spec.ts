/**
 * Visual regression tests for Input component
 * Tests all input variants across themes
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('Input Variants - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('basic input renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input type="text" placeholder="Basic input" class="input input-bordered w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-basic.png');
    });

    test('color variant inputs render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <input type="text" placeholder="Primary" class="input input-bordered input-primary w-full" />
          <input type="text" placeholder="Secondary" class="input input-bordered input-secondary w-full" />
          <input type="text" placeholder="Tertiary" class="input input-bordered input-tertiary w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-colors.png');
    });

    test('semantic variant inputs render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <input type="text" placeholder="Info" class="input input-bordered input-info w-full" />
          <input type="text" placeholder="Success" class="input input-bordered input-success w-full" />
          <input type="text" placeholder="Warning" class="input input-bordered input-warning w-full" />
          <input type="text" placeholder="Error" class="input input-bordered input-error w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-semantic.png');
    });

    test('input sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <input type="text" placeholder="Extra Small" class="input input-bordered input-xs w-full" />
          <input type="text" placeholder="Small" class="input input-bordered input-sm w-full" />
          <input type="text" placeholder="Default" class="input input-bordered w-full" />
          <input type="text" placeholder="Large" class="input input-bordered input-lg w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-sizes.png');
    });

    test('ghost input renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input type="text" placeholder="Ghost input (no border)" class="input input-ghost w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-ghost.png');
    });

    test('disabled input renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input type="text" placeholder="Disabled input" class="input input-bordered w-full" disabled />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('sunshine-input-disabled.png');
    });
  });

  test.describe('Input Variants - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('all input variants in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <input type="text" placeholder="Default" class="input input-bordered w-full" />
          <input type="text" placeholder="Primary" class="input input-bordered input-primary w-full" />
          <input type="text" placeholder="Error" class="input input-bordered input-error w-full" />
          <input type="text" placeholder="Disabled" class="input input-bordered w-full" disabled />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('moonlight-input-all.png');
    });
  });

  test.describe('Input States', () => {
    test('focus state shows border change', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input type="text" placeholder="Focus me" class="input input-bordered w-full" id="focus-input" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#focus-input');
      await input.focus();
      await expect(page.locator('#input-test')).toHaveScreenshot('input-focus-state.png');
    });

    test('input with value renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'input-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input type="text" value="Hello, World!" class="input input-bordered w-full" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#input-test');
      await expect(input).toHaveScreenshot('input-with-value.png');
    });
  });
});
