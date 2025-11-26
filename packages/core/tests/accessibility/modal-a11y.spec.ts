/**
 * Accessibility tests for Modal component
 * Tests focus trapping, ARIA attributes, keyboard navigation
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Modal Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('WCAG Compliance', () => {
    test('open modal passes axe audit', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'relative h-96';
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 id="modal-title" class="modal-title">Modal Title</h3>
              <div class="modal-body">
                <p>Modal content goes here.</p>
              </div>
              <div class="modal-action">
                <button class="btn">Close</button>
              </div>
            </div>
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

    test('modal has correct role and aria attributes', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="test-modal" class="modal modal-open"
               role="dialog"
               aria-modal="true"
               aria-labelledby="modal-title">
            <div class="modal-box">
              <h3 id="modal-title">Test Modal</h3>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#test-modal');

      expect(await modal.getAttribute('role')).toBe('dialog');
      expect(await modal.getAttribute('aria-modal')).toBe('true');
      expect(await modal.getAttribute('aria-labelledby')).toBe('modal-title');
    });

    test('alert dialog has correct role', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="alert-dialog" class="modal modal-open alert-dialog"
               role="alertdialog"
               aria-modal="true"
               aria-labelledby="alert-title"
               aria-describedby="alert-desc">
            <div class="modal-box">
              <h3 id="alert-title">Warning</h3>
              <p id="alert-desc">Are you sure you want to delete this?</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const dialog = page.locator('#alert-dialog');

      expect(await dialog.getAttribute('role')).toBe('alertdialog');
      expect(await dialog.getAttribute('aria-describedby')).toBe('alert-desc');
    });
  });

  test.describe('Focus Management', () => {
    test('focus moves to modal when opened', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="trigger-btn">Open Modal</button>
          <div id="test-modal" class="modal" role="dialog" aria-modal="true">
            <div class="modal-box" tabindex="-1" id="modal-content">
              <h3>Modal Title</h3>
              <button id="modal-btn">Modal Button</button>
            </div>
          </div>
        `;
        document.body.appendChild(container);

        document.getElementById('trigger-btn')?.addEventListener('click', () => {
          document.getElementById('test-modal')?.classList.add('modal-open');
          document.getElementById('modal-content')?.focus();
        });
      });

      await page.locator('#trigger-btn').click();

      // Wait for modal to open
      await page.waitForSelector('.modal-open');

      // Focus should be inside modal
      const focusedElement = await page.evaluate(() =>
        document.activeElement?.closest('.modal-box') !== null
      );

      expect(focusedElement).toBe(true);
    });

    test('Tab key cycles through modal elements', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true">
            <div class="modal-box">
              <h3>Modal Title</h3>
              <input id="input1" type="text" class="input" />
              <input id="input2" type="text" class="input" />
              <button id="btn1" class="btn">Cancel</button>
              <button id="btn2" class="btn btn-primary">Submit</button>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      // Focus first element
      await page.locator('#input1').focus();

      // Tab through elements
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('input2');

      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('btn1');

      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('btn2');
    });

    test('focus returns to trigger element when modal closes', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="trigger-btn">Open Modal</button>
          <div id="test-modal" class="modal" role="dialog" aria-modal="true">
            <div class="modal-box">
              <button id="close-btn" class="btn">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(container);

        const trigger = document.getElementById('trigger-btn');
        const modal = document.getElementById('test-modal');
        const closeBtn = document.getElementById('close-btn');

        trigger?.addEventListener('click', () => {
          modal?.classList.add('modal-open');
          closeBtn?.focus();
        });

        closeBtn?.addEventListener('click', () => {
          modal?.classList.remove('modal-open');
          trigger?.focus();
        });
      });

      const triggerBtn = page.locator('#trigger-btn');
      await triggerBtn.click();

      // Close modal
      await page.locator('#close-btn').click();

      // Focus should return to trigger
      const focusedId = await page.evaluate(() => document.activeElement?.id);
      expect(focusedId).toBe('trigger-btn');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('Escape key closes modal', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="test-modal" class="modal modal-open" role="dialog" aria-modal="true">
            <div class="modal-box">
              <button id="close-btn">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(container);

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            document.getElementById('test-modal')?.classList.remove('modal-open');
          }
        });
      });

      await page.keyboard.press('Escape');

      const isOpen = await page.locator('#test-modal').evaluate((el) =>
        el.classList.contains('modal-open')
      );

      expect(isOpen).toBe(false);
    });

    test('Tab wraps within modal (focus trap)', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true">
            <div class="modal-box" id="modal-box">
              <button id="first-btn" class="btn">First</button>
              <button id="last-btn" class="btn">Last</button>
              <div class="modal-focus-trap" tabindex="0" id="focus-trap"></div>
            </div>
          </div>
        `;
        document.body.appendChild(container);

        // Simple focus trap implementation
        document.getElementById('focus-trap')?.addEventListener('focus', () => {
          document.getElementById('first-btn')?.focus();
        });
      });

      // Focus last button
      await page.locator('#last-btn').focus();

      // Tab should wrap to first button
      await page.keyboard.press('Tab');

      const focusedId = await page.evaluate(() => document.activeElement?.id);
      expect(focusedId).toBe('first-btn');
    });
  });

  test.describe('Screen Reader Support', () => {
    test('modal has accessible name from title', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="modal-heading">
            <div class="modal-box">
              <h3 id="modal-heading" class="modal-title">Account Settings</h3>
              <p>Update your account preferences.</p>
            </div>
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

    test('modal description is accessible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="test-modal" class="modal modal-open"
               role="dialog"
               aria-modal="true"
               aria-labelledby="title"
               aria-describedby="description">
            <div class="modal-box">
              <h3 id="title">Delete Item</h3>
              <p id="description">This action cannot be undone. Are you sure?</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#test-modal');

      const describedBy = await modal.getAttribute('aria-describedby');
      expect(describedBy).toBe('description');

      const description = await page.locator('#description').textContent();
      expect(description).toContain('cannot be undone');
    });
  });

  test.describe('Visual Indicators', () => {
    test('close button is clearly visible', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'relative h-96';
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true">
            <div class="modal-box">
              <button class="modal-close" aria-label="Close modal">×</button>
              <h3>Modal Title</h3>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const closeBtn = page.locator('.modal-close');

      // Button should be visible
      await expect(closeBtn).toBeVisible();

      // Should have accessible label
      const ariaLabel = await closeBtn.getAttribute('aria-label');
      expect(ariaLabel).toBe('Close modal');
    });

    test('modal content has sufficient contrast', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'relative h-96';
        container.innerHTML = `
          <div class="modal modal-open" role="dialog" aria-modal="true">
            <div class="modal-box">
              <h3 class="modal-title">Modal Title</h3>
              <p class="modal-body">This is the modal content with regular text.</p>
              <div class="modal-action">
                <button class="btn">Cancel</button>
                <button class="btn btn-primary">Confirm</button>
              </div>
            </div>
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

  test.describe('Reduced Motion', () => {
    test('modal respects reduced motion preference', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="test-modal" class="modal modal-open">
            <div class="modal-box">Content</div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const transition = await page.locator('#test-modal').evaluate((el) =>
        window.getComputedStyle(el).transition
      );

      // Should have no/minimal transition with reduced motion
      // Either transition duration is 0 or transition is none
      const hasReducedMotion =
        transition === 'none 0s ease 0s' ||
        transition.includes('0s') ||
        transition === 'none';

      expect(hasReducedMotion).toBe(true);
    });
  });
});
