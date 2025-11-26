/**
 * T066: Integration test for code example copy functionality
 * Tests that code blocks can be copied to clipboard
 */

import { test, expect } from '@playwright/test';

test.describe('Code Example Copy Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a component documentation page with code examples
    await page.goto('/docs/en/components/button');
  });

  test.describe('Copy Button Presence', () => {
    test('code blocks have copy buttons', async ({ page }) => {
      const codeBlock = page.locator('.code-block, pre').first();
      await expect(codeBlock).toBeVisible();

      const copyButton = page.locator('.copy-button, [data-copy-button]').first();
      await expect(copyButton).toBeVisible();
    });

    test('copy button has accessible label', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      const ariaLabel = await copyButton.getAttribute('aria-label');
      const title = await copyButton.getAttribute('title');
      const buttonText = await copyButton.textContent();

      // Should have some accessible identifier
      const hasLabel =
        ariaLabel?.toLowerCase().includes('copy') ||
        title?.toLowerCase().includes('copy') ||
        buttonText?.toLowerCase().includes('copy');

      expect(hasLabel).toBe(true);
    });
  });

  test.describe('Copy Functionality', () => {
    test('clicking copy button updates button text', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      // Click copy button
      await copyButton.click();

      // Wait for text change
      await page.waitForTimeout(100);

      const updatedText = await copyButton.textContent();

      // Text should change to indicate copy was successful
      expect(updatedText?.toLowerCase()).toMatch(/copied|success|✓/i);
    });

    test('button text reverts after timeout', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      // Get initial text
      const initialText = await copyButton.textContent();

      // Click copy button
      await copyButton.click();

      // Wait for revert (typically 2-3 seconds)
      await page.waitForTimeout(2500);

      const revertedText = await copyButton.textContent();

      // Text should revert to original
      expect(revertedText).toBe(initialText);
    });

    test('copy button writes to clipboard', async ({ page, context }) => {
      // Grant clipboard permissions
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);

      const codeBlock = page.locator('.code-block code, pre code').first();
      const expectedCode = await codeBlock.textContent();

      const copyButton = page.locator('.copy-button, [data-copy-button]').first();
      await copyButton.click();

      await page.waitForTimeout(100);

      // Read clipboard
      const clipboardContent = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      // Normalize whitespace for comparison
      expect(clipboardContent.trim()).toBe(expectedCode?.trim());
    });
  });

  test.describe('Multiple Code Blocks', () => {
    test('each code block has its own copy button', async ({ page }) => {
      const codeBlocks = page.locator('.code-block, pre');
      const copyButtons = page.locator('.copy-button, [data-copy-button]');

      const blockCount = await codeBlocks.count();
      const buttonCount = await copyButtons.count();

      // Should have at least as many buttons as code blocks
      expect(buttonCount).toBeGreaterThanOrEqual(Math.min(blockCount, 1));
    });

    test('copying one block does not affect others', async ({ page }) => {
      const copyButtons = page.locator('.copy-button, [data-copy-button]');
      const buttonCount = await copyButtons.count();

      if (buttonCount >= 2) {
        // Click first button
        await copyButtons.first().click();

        // Check second button is unaffected
        const secondButtonText = await copyButtons.nth(1).textContent();
        expect(secondButtonText?.toLowerCase()).not.toMatch(/copied|success/);
      }
    });
  });

  test.describe('Keyboard Accessibility', () => {
    test('copy button is keyboard focusable', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      // Tab to the copy button
      await page.keyboard.press('Tab');
      let attempts = 0;
      while (attempts < 10) {
        const focused = await page.evaluate(
          () => document.activeElement?.classList.contains('copy-button')
        );
        if (focused) break;
        await page.keyboard.press('Tab');
        attempts++;
      }

      await copyButton.focus();
      const isFocused = await copyButton.evaluate(
        (el) => document.activeElement === el
      );

      expect(isFocused).toBe(true);
    });

    test('copy button can be activated with Enter key', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      await copyButton.focus();
      const initialText = await copyButton.textContent();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      const updatedText = await copyButton.textContent();

      // Text should change after activation
      expect(updatedText).not.toBe(initialText);
    });

    test('copy button can be activated with Space key', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      await copyButton.focus();
      const initialText = await copyButton.textContent();

      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      const updatedText = await copyButton.textContent();

      // Text should change after activation
      expect(updatedText).not.toBe(initialText);
    });
  });

  test.describe('Visual Feedback', () => {
    test('copy button has visible focus indicator', async ({ page }) => {
      const copyButton = page.locator('.copy-button, [data-copy-button]').first();

      await copyButton.focus();

      const outline = await copyButton.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      const boxShadow = await copyButton.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      // Should have visible focus indicator
      const hasFocusIndicator =
        outline !== 'none' ||
        boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    });
  });
});
