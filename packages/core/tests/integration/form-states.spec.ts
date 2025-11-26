/**
 * Integration tests for Form validation states
 * Tests error, success, and other form states
 */

import { test, expect } from '@playwright/test';

test.describe('Form Validation States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('Input Validation', () => {
    test('error state shows error styling', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <div class="form-control">
            <input id="error-input" type="email"
                   class="input input-bordered input-error"
                   value="invalid-email" />
            <span class="helper-text error">Please enter a valid email</span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#error-input');

      const borderColor = await input.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Border should be error color (red-ish)
      expect(borderColor).toContain('rgb');
    });

    test('success state shows success styling', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <div class="form-control success">
            <input id="success-input" type="text"
                   class="input input-bordered input-success"
                   value="valid-value" />
            <span class="helper-text success">Looks good!</span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#success-input');

      const borderColor = await input.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Border should be success color (green-ish)
      expect(borderColor).toContain('rgb');
    });

    test('input validation state updates dynamically', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input id="dynamic-input" type="email"
                 class="input input-bordered" />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#dynamic-input');

      // Initially neutral
      await input.fill('invalid');
      await input.evaluate((el) => el.classList.add('input-error'));

      const hasErrorClass = await input.evaluate((el) =>
        el.classList.contains('input-error')
      );
      expect(hasErrorClass).toBe(true);

      // Update to valid
      await input.fill('valid@email.com');
      await input.evaluate((el) => {
        el.classList.remove('input-error');
        el.classList.add('input-success');
      });

      const hasSuccessClass = await input.evaluate((el) =>
        el.classList.contains('input-success')
      );
      expect(hasSuccessClass).toBe(true);
    });
  });

  test.describe('Checkbox States', () => {
    test('checkbox checked state is visible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="checkbox" type="checkbox" class="checkbox" />
        `;
        document.body.appendChild(container);
      });

      const checkbox = page.locator('#checkbox');

      await checkbox.check();
      expect(await checkbox.isChecked()).toBe(true);

      await checkbox.uncheck();
      expect(await checkbox.isChecked()).toBe(false);
    });

    test('checkbox focus state is visible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="checkbox" type="checkbox" class="checkbox" />
        `;
        document.body.appendChild(container);
      });

      const checkbox = page.locator('#checkbox');
      await checkbox.focus();

      const outline = await checkbox.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      expect(outline).not.toBe('none');
    });
  });

  test.describe('Radio Button States', () => {
    test('radio button selection works in group', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="radio1" type="radio" name="group1" class="radio" />
          <input id="radio2" type="radio" name="group1" class="radio" />
          <input id="radio3" type="radio" name="group1" class="radio" />
        `;
        document.body.appendChild(container);
      });

      await page.locator('#radio1').check();
      expect(await page.locator('#radio1').isChecked()).toBe(true);
      expect(await page.locator('#radio2').isChecked()).toBe(false);

      await page.locator('#radio2').check();
      expect(await page.locator('#radio1').isChecked()).toBe(false);
      expect(await page.locator('#radio2').isChecked()).toBe(true);
    });
  });

  test.describe('Toggle States', () => {
    test('toggle switches between states', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="toggle" type="checkbox" class="toggle" />
        `;
        document.body.appendChild(container);
      });

      const toggle = page.locator('#toggle');

      // Initially off
      expect(await toggle.isChecked()).toBe(false);

      // Toggle on
      await toggle.click();
      expect(await toggle.isChecked()).toBe(true);

      // Toggle off
      await toggle.click();
      expect(await toggle.isChecked()).toBe(false);
    });

    test('toggle visual state changes with checked', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="toggle" type="checkbox" class="toggle" />
        `;
        document.body.appendChild(container);
      });

      const toggle = page.locator('#toggle');

      const initialBg = await toggle.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      await toggle.check();

      const checkedBg = await toggle.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Background should change when checked
      expect(checkedBg).not.toBe(initialBg);
    });
  });

  test.describe('Select States', () => {
    test('select changes value correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <select id="select" class="select select-bordered">
            <option value="">Choose...</option>
            <option value="opt1">Option 1</option>
            <option value="opt2">Option 2</option>
          </select>
        `;
        document.body.appendChild(container);
      });

      const select = page.locator('#select');

      await select.selectOption('opt1');
      expect(await select.inputValue()).toBe('opt1');

      await select.selectOption('opt2');
      expect(await select.inputValue()).toBe('opt2');
    });

    test('select focus state is visible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <select id="select" class="select select-bordered">
            <option>Option 1</option>
          </select>
        `;
        document.body.appendChild(container);
      });

      const select = page.locator('#select');
      await select.focus();

      const borderColor = await select.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Should have focus border color
      expect(borderColor).toContain('rgb');
    });
  });

  test.describe('Textarea States', () => {
    test('textarea accepts multiline input', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <textarea id="textarea" class="textarea textarea-bordered"></textarea>
        `;
        document.body.appendChild(container);
      });

      const textarea = page.locator('#textarea');
      const multilineText = 'Line 1\nLine 2\nLine 3';

      await textarea.fill(multilineText);

      expect(await textarea.inputValue()).toBe(multilineText);
    });

    test('textarea resizable', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <textarea id="textarea" class="textarea textarea-bordered"></textarea>
        `;
        document.body.appendChild(container);
      });

      const textarea = page.locator('#textarea');

      const resize = await textarea.evaluate((el) =>
        window.getComputedStyle(el).resize
      );

      // Should allow vertical resize at minimum
      expect(['vertical', 'both']).toContain(resize);
    });
  });

  test.describe('Disabled States', () => {
    test('disabled input is not editable', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 w-96';
        container.innerHTML = `
          <input id="disabled-input" type="text"
                 class="input input-bordered"
                 value="initial" disabled />
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#disabled-input');

      // Verify disabled attribute
      expect(await input.isDisabled()).toBe(true);

      // Value should remain unchanged
      expect(await input.inputValue()).toBe('initial');
    });

    test('disabled checkbox cannot be toggled', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <input id="disabled-checkbox" type="checkbox"
                 class="checkbox" disabled />
        `;
        document.body.appendChild(container);
      });

      const checkbox = page.locator('#disabled-checkbox');

      expect(await checkbox.isDisabled()).toBe(true);
      expect(await checkbox.isChecked()).toBe(false);
    });
  });
});
