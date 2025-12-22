/**
 * Accessibility tests for Form components
 * Tests labels, ARIA attributes, error announcements
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Form Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test.describe('Label Association', () => {
    test('input has associated label', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="email-input">
              <span class="label-text">Email</span>
            </label>
            <input id="email-input" type="email" class="input input-bordered" />
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const labelViolations = results.violations.filter(
        v => v.id === 'label'
      );

      expect(labelViolations).toHaveLength(0);
    });

    test('checkbox has associated label', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <label class="label cursor-pointer gap-2">
            <input type="checkbox" class="checkbox" />
            <span class="label-text">Accept terms</span>
          </label>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('radio group has proper labeling', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <fieldset>
            <legend>Select an option</legend>
            <label class="label cursor-pointer gap-2">
              <input type="radio" name="options" class="radio" value="1" />
              <span class="label-text">Option 1</span>
            </label>
            <label class="label cursor-pointer gap-2">
              <input type="radio" name="options" class="radio" value="2" />
              <span class="label-text">Option 2</span>
            </label>
          </fieldset>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Error Handling', () => {
    test('error state uses aria-invalid', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="error-input">
              <span class="label-text">Email</span>
            </label>
            <input id="error-input" type="email"
                   class="input input-bordered input-error"
                   aria-invalid="true"
                   aria-describedby="error-msg" />
            <span id="error-msg" class="helper-text error">
              Please enter a valid email
            </span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#error-input');

      const ariaInvalid = await input.getAttribute('aria-invalid');
      expect(ariaInvalid).toBe('true');

      const ariaDescribedBy = await input.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBe('error-msg');
    });

    test('error message is accessible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="password-input">
              <span class="label-text">Password</span>
            </label>
            <input id="password-input" type="password"
                   class="input input-bordered input-error"
                   aria-invalid="true"
                   aria-describedby="password-error" />
            <span id="password-error" class="helper-text error" role="alert">
              Password must be at least 8 characters
            </span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Required Fields', () => {
    test('required field has aria-required', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="required-input">
              <span class="label-text required">Name</span>
            </label>
            <input id="required-input" type="text"
                   class="input input-bordered"
                   required
                   aria-required="true" />
          </div>
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#required-input');

      const ariaRequired = await input.getAttribute('aria-required');
      const hasRequired = await input.evaluate((el) =>
        (el as HTMLInputElement).required
      );

      expect(ariaRequired === 'true' || hasRequired).toBe(true);
    });

    test('required indicator is visible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="required-field">
              <span class="label-text required">Email</span>
            </label>
            <input id="required-field" type="email"
                   class="input input-bordered" required />
          </div>
        `;
        document.body.appendChild(container);
      });

      const labelText = page.locator('.label-text.required');

      const content = await labelText.evaluate((el) =>
        window.getComputedStyle(el, '::after').content
      );

      // Should have asterisk indicator
      expect(content).toContain('*');
    });
  });

  test.describe('Select Accessibility', () => {
    test('select has associated label', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="form-control">
            <label class="label" for="country-select">
              <span class="label-text">Country</span>
            </label>
            <select id="country-select" class="select select-bordered">
              <option value="">Choose a country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('form elements are in logical tab order', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <form id="test-form">
            <input id="field1" type="text" class="input input-bordered" />
            <input id="field2" type="email" class="input input-bordered" />
            <select id="field3" class="select select-bordered">
              <option>Option</option>
            </select>
            <button id="submit" class="btn btn-primary">Submit</button>
          </form>
        `;
        document.body.appendChild(container);
      });

      const expectedOrder = ['field1', 'field2', 'field3', 'submit'];

      for (const expectedId of expectedOrder) {
        await page.keyboard.press('Tab');
        const focusedId = await page.evaluate(() => document.activeElement?.id);
        expect(focusedId).toBe(expectedId);
      }
    });

    test('checkbox can be toggled with Space', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <input id="checkbox" type="checkbox" class="checkbox" />
        `;
        document.body.appendChild(container);
      });

      const checkbox = page.locator('#checkbox');
      await checkbox.focus();

      expect(await checkbox.isChecked()).toBe(false);

      await page.keyboard.press('Space');
      expect(await checkbox.isChecked()).toBe(true);
    });
  });

  test.describe('Color Contrast', () => {
    test('form labels have sufficient contrast', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="form-control">
            <label class="label">
              <span class="label-text">Label Text</span>
              <span class="label-text-alt">Helper text</span>
            </label>
            <input type="text" class="input input-bordered" />
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2aa'])
        .analyze();

      const colorContrastViolations = results.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(colorContrastViolations).toHaveLength(0);
    });

    test('error messages have sufficient contrast', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="form-control error">
            <label class="label" for="error-field">
              <span class="label-text">Email</span>
            </label>
            <input id="error-field" type="email" class="input input-error" />
            <span class="helper-text error">This field is required</span>
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2aa'])
        .analyze();

      const colorContrastViolations = results.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(colorContrastViolations).toHaveLength(0);
    });
  });

  test.describe('Assistive Technology', () => {
    test('form has accessible name', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <form aria-labelledby="form-title">
            <h2 id="form-title">Contact Form</h2>
            <div class="form-control">
              <label class="label" for="name">
                <span class="label-text">Name</span>
              </label>
              <input id="name" type="text" class="input input-bordered" />
            </div>
          </form>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
});
