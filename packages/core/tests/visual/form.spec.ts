/**
 * Visual regression tests for Form components
 * Tests form controls, checkboxes, radios, toggles, and selects
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Form Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test.describe('Form Components - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('form control with label renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Address</span>
              <span class="label-text-alt">Required</span>
            </label>
            <input type="email" placeholder="email@example.com" class="input input-bordered" />
            <label class="label">
              <span class="label-text-alt">We'll never share your email</span>
            </label>
          </div>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-form-control.png');
    });

    test('checkbox renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-4';
        container.innerHTML = `
          <label class="label cursor-pointer gap-4">
            <input type="checkbox" class="checkbox" />
            <span class="label-text">Unchecked checkbox</span>
          </label>
          <label class="label cursor-pointer gap-4">
            <input type="checkbox" class="checkbox" checked />
            <span class="label-text">Checked checkbox</span>
          </label>
          <label class="label cursor-pointer gap-4">
            <input type="checkbox" class="checkbox checkbox-primary" checked />
            <span class="label-text">Primary checkbox</span>
          </label>
          <label class="label cursor-pointer gap-4">
            <input type="checkbox" class="checkbox checkbox-secondary" checked />
            <span class="label-text">Secondary checkbox</span>
          </label>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-checkbox.png');
    });

    test('checkbox sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 flex items-center gap-4';
        container.innerHTML = `
          <input type="checkbox" class="checkbox checkbox-xs" checked />
          <input type="checkbox" class="checkbox checkbox-sm" checked />
          <input type="checkbox" class="checkbox" checked />
          <input type="checkbox" class="checkbox checkbox-lg" checked />
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-checkbox-sizes.png');
    });

    test('radio buttons render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-4';
        container.innerHTML = `
          <label class="label cursor-pointer gap-4">
            <input type="radio" name="radio-test" class="radio" checked />
            <span class="label-text">Option 1 (selected)</span>
          </label>
          <label class="label cursor-pointer gap-4">
            <input type="radio" name="radio-test" class="radio" />
            <span class="label-text">Option 2</span>
          </label>
          <label class="label cursor-pointer gap-4">
            <input type="radio" name="radio-test2" class="radio radio-primary" checked />
            <span class="label-text">Primary radio</span>
          </label>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-radio.png');
    });

    test('toggle/switch renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-4';
        container.innerHTML = `
          <label class="label cursor-pointer gap-4">
            <span class="label-text">Toggle off</span>
            <input type="checkbox" class="toggle" />
          </label>
          <label class="label cursor-pointer gap-4">
            <span class="label-text">Toggle on</span>
            <input type="checkbox" class="toggle" checked />
          </label>
          <label class="label cursor-pointer gap-4">
            <span class="label-text">Toggle disabled</span>
            <input type="checkbox" class="toggle" disabled />
          </label>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-toggle.png');
    });

    test('toggle sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 flex items-center gap-4';
        container.innerHTML = `
          <input type="checkbox" class="toggle toggle-xs" checked />
          <input type="checkbox" class="toggle toggle-sm" checked />
          <input type="checkbox" class="toggle" checked />
          <input type="checkbox" class="toggle toggle-lg" checked />
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-toggle-sizes.png');
    });

    test('select renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <select class="select select-bordered w-full">
            <option disabled selected>Pick your favorite</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <select class="select select-bordered select-primary w-full">
            <option>Primary variant</option>
          </select>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-select.png');
    });

    test('textarea renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <textarea class="textarea textarea-bordered w-full" placeholder="Write your message here..."></textarea>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-textarea.png');
    });

    test('validation states render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <div class="form-control error">
            <label class="label">
              <span class="label-text">Email (Error)</span>
            </label>
            <input type="email" placeholder="Invalid email" class="input input-bordered input-error" value="not-an-email" />
            <span class="helper-text error">Please enter a valid email</span>
          </div>
          <div class="form-control success">
            <label class="label">
              <span class="label-text">Username (Success)</span>
            </label>
            <input type="text" class="input input-bordered input-success" value="validuser" />
            <span class="helper-text success">Username is available</span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('sunshine-form-validation.png');
    });
  });

  test.describe('Form Components - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('all form components in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'form-test';
        container.className = 'p-8 bg-base-100 w-96 flex flex-col gap-4';
        container.innerHTML = `
          <div class="form-control">
            <label class="label">
              <span class="label-text">Text Input</span>
            </label>
            <input type="text" placeholder="Enter text" class="input input-bordered" />
          </div>
          <div class="flex items-center gap-4">
            <input type="checkbox" class="checkbox" checked />
            <input type="radio" class="radio" checked />
            <input type="checkbox" class="toggle" checked />
          </div>
          <select class="select select-bordered">
            <option>Select option</option>
          </select>
        `;
        document.body.appendChild(container);
      });

      const form = page.locator('#form-test');
      await expect(form).toHaveScreenshot('moonlight-form-all.png');
    });
  });
});
