import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const docsUrl = process.env.DOCS_BASE_URL ?? '/duskmoonui/docs/en/components/button/';
const MODES = [
  { value: 'sunshine', label: 'Light', theme: 'sunshine' },
  { value: 'moonlight', label: 'Dark', theme: 'moonlight' },
  { value: 'auto', label: 'Auto (system)', theme: 'sunshine' },
];

async function chooseMode(page: Page, label: string) {
  const toggle = page.locator('[data-theme-toggle]');
  await toggle.getByRole('button', { name: /^Theme preference:/ }).click();
  await toggle.getByText(label, { exact: true }).click();
  await expect(toggle.locator('[popover]')).toBeHidden();
}

test.describe('Theme Switcher Functionality', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(docsUrl);
    await expect(page.getByRole('button', { name: /^Theme preference:/ })).toBeEnabled();
  });

  test('keeps an independent theme dropdown visible while navigation is collapsed', async ({ page }) => {
    const toggle = page.locator('[data-theme-toggle]');
    const trigger = toggle.getByRole('button', { name: 'Theme preference: Auto (system)', exact: true });
    const panel = toggle.locator('[popover]');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();
    await expect(page.locator('#docs-header-menu [data-theme-toggle]')).toHaveCount(0);
    await trigger.click();
    const group = toggle.getByRole('radiogroup', { name: 'Theme preference', exact: true });
    await expect(group).toBeVisible();
    await expect(group.getByRole('radio')).toHaveCount(3);
    await expect(group.getByRole('radio', { name: 'Auto (system)', exact: true })).toBeChecked();
    await expect(group.getByRole('radio', { name: 'Light', exact: true })).not.toBeChecked();
    await expect(group.getByRole('radio', { name: 'Dark', exact: true })).not.toBeChecked();
  });

  test('applies, remembers and indicates all three modes, then closes the dropdown', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    const toggle = page.locator('[data-theme-toggle]');
    const backgrounds: string[] = [];
    for (const { value, label, theme } of MODES) {
      await chooseMode(page, label);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(toggle.locator('input[value="' + value + '"]')).toBeChecked();
      await expect(toggle.locator('input:checked')).toHaveCount(1);
      await expect(toggle.getByRole('button', { name: 'Theme preference: ' + label, exact: true })).toBeFocused();
      await expect(toggle.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
      expect(await page.evaluate(() => localStorage.getItem('theme-mode'))).toBe(value);
      backgrounds.push(await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor));
    }
    expect(backgrounds[0]).not.toBe(backgrounds[1]);
  });

  test('restores a saved mode and its selected option after reload', async ({ page }) => {
    await chooseMode(page, 'Dark');
    await page.reload();
    const toggle = page.locator('[data-theme-toggle]');
    await expect(toggle.getByRole('button', { name: 'Theme preference: Dark', exact: true })).toBeEnabled();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'moonlight');
    await expect(toggle.locator('input[value="moonlight"]')).toBeChecked();
    await expect(toggle.locator('[popover]')).toBeHidden();
  });

  test('restores auto mode and follows system changes only while auto is selected', async ({ page }) => {
    await chooseMode(page, 'Auto (system)');
    await page.reload();
    const toggle = page.locator('[data-theme-toggle]');
    await expect(toggle.getByRole('button', { name: 'Theme preference: Auto (system)', exact: true })).toBeEnabled();
    await expect(toggle.locator('input[value="auto"]')).toBeChecked();
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'moonlight');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'sunshine');
    await chooseMode(page, 'Dark');
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'moonlight');
    await chooseMode(page, 'Auto (system)');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'sunshine');
  });

  test('supports keyboard selection, Escape, outside dismissal and focus restoration', async ({ page }) => {
    const toggle = page.locator('[data-theme-toggle]');
    const trigger = toggle.getByRole('button', { name: /^Theme preference:/ });
    const panel = toggle.locator('[popover]');
    await trigger.focus();
    await page.keyboard.press('Space');
    await expect(panel).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(toggle.getByRole('radio', { name: 'Auto (system)', exact: true })).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(panel).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'sunshine');
    await expect(trigger).toHaveAccessibleName('Theme preference: Light');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.mouse.click(2, 400);
    await expect(panel).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('opens the theme and navigation popovers independently with native light dismiss', async ({ page }) => {
    const navigationTrigger = page.getByRole('button', { name: 'Navigation menu', exact: true });
    const navigation = page.locator('#docs-header-menu');
    const toggle = page.locator('[data-theme-toggle]');
    const themeTrigger = toggle.getByRole('button', { name: /^Theme preference:/ });
    const themePanel = toggle.locator('[popover]');
    await navigationTrigger.click();
    await expect(navigation).toBeVisible();
    await themeTrigger.click();
    await expect(themePanel).toBeVisible();
    await expect(navigation).toBeHidden();
    await expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');
    await navigationTrigger.click();
    await expect(navigation).toBeVisible();
    await expect(themePanel).toBeHidden();
    await expect(themeTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  for (const theme of ['sunshine', 'moonlight']) {
    test('theme dropdown fits a 320px RTL viewport and is accessible in ' + theme, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.addInitScript(theme => localStorage.setItem('theme-mode', theme), theme);
      await page.reload();
      await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
      const toggle = page.locator('[data-theme-toggle]');
      await toggle.getByRole('button', { name: /^Theme preference:/ }).click();
      const panel = toggle.getByRole('radiogroup', { name: 'Theme preference', exact: true });
      await expect(panel).toBeVisible();
      const bounds = (await panel.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
      await expect(page.locator('.docs-header')).toHaveCSS('height', '64px');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      expect((await new AxeBuilder({ page }).include('[data-theme-toggle]').analyze()).violations).toEqual([]);
    });
  }
});
