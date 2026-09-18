import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';

const origin = process.env.DATA_INPUT_DOCS_URL || 'http://localhost:4321';
const url = (name: string) => origin + '/duskmoonui/docs/en/components/' + name + '/';

test('Data Input pages and shared capability sections are discoverable on the actual docs site', async ({ page }) => {
  for (const name of ['form', 'form-group', 'validator', 'input', 'checkbox', 'radio', 'switch',
    'toggle', 'select', 'textarea', 'file-input', 'file-upload', 'filter-group', 'range', 'slider', 'rating', 'otp-input', 'autocomplete', 'datepicker']) {
    const response = await page.goto(url(name));
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('.showcase-preview').first()).toBeVisible();
  }
  await expect(page.locator('#inline-calendar')).toBeVisible();
  await page.goto(url('form-group'));
  await expect(page.locator('#fieldset')).toBeVisible();
  await expect(page.locator('#labels')).toBeVisible();
});

test('every copyable Data Input example uses defined core classes and valid associations', async ({ page }) => {
  const css = readFileSync(join(import.meta.dirname, '../../dist/index.css'), 'utf8');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const name of ['form', 'form-group', 'validator', 'otp-input', 'rating', 'range', 'slider',
    'select', 'textarea', 'filter-group', 'file-input', 'file-upload', 'datepicker', 'toggle',
    'input', 'checkbox', 'radio', 'switch', 'autocomplete']) {
    await page.goto(url(name));
    const classes = await page.locator('.showcase-preview [class]').evaluateAll(nodes => [...new Set(nodes.flatMap(node => [...node.classList]))]);
    for (const className of classes) {
      if (['active', 'filled', 'uploading'].includes(className)) continue;
      expect(css.includes('.' + className), name + ': undefined ' + className).toBe(true);
    }
    const broken = await page.locator('.showcase-preview').evaluateAll(previews => previews.flatMap(preview =>
      [...preview.querySelectorAll('[aria-describedby],label[for]')].flatMap(el => {
        const ids = (el.getAttribute('aria-describedby') || el.getAttribute('for') || '').split(/\s+/).filter(Boolean);
        return ids.filter(id => !document.getElementById(id));
      })));
    expect(broken).toEqual([]);
    const unlabeled = await page.locator('.showcase-preview :is(input,select,textarea)').evaluateAll(nodes => nodes.filter(node => {
      const control = node as HTMLInputElement;
      return control.type !== 'hidden' && !control.labels?.length && !control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby');
    }).map(node => node.outerHTML));
    expect(unlabeled, name + ': missing accessible labels').toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('served Checkbox application composition synchronizes selection and reset', async ({ page }) => {
  await page.goto(url('checkbox'));
  const form = page.locator('#demo-checkbox-items');
  const all = form.getByRole('checkbox', { name: 'Select All', exact: true });
  await expect.poll(() => all.evaluate(el => (el as HTMLInputElement).indeterminate)).toBe(true);
  await all.check();
  expect(await form.evaluate(el => new FormData(el as HTMLFormElement).getAll('item'))).toEqual(['1', '2', '3']);
  await form.getByRole('button', { name: 'Reset items', exact: true }).click();
  await expect(form.getByRole('checkbox', { name: 'Item 3', exact: true })).not.toBeChecked();
  await expect.poll(() => all.evaluate(el => (el as HTMLInputElement).indeterminate)).toBe(true);
  expect(await form.evaluate(el => new FormData(el as HTMLFormElement).getAll('item'))).toEqual(['1', '2']);
});

test('served OTP and Filter examples edit, submit, clear and reset without a Core runtime', async ({ page }) => {
  await page.goto(url('otp-input'));
  const otp = page.getByLabel('Verification code (6 digits)', { exact: true });
  await otp.fill('001234');
  expect(await otp.evaluate(el => new FormData((el as HTMLInputElement).form!).get('code'))).toBe('001234');
  await page.getByRole('button', { name: 'Reset code', exact: true }).click();
  await expect(otp).toHaveValue('');
  // Blur-time error feedback must not move Reset before the click completes.
  await otp.fill('00123');
  await page.getByRole('button', { name: 'Reset code', exact: true }).click();
  await expect(otp).toHaveValue('');
  await page.goto(url('filter-group'));
  await page.getByRole('checkbox', { name: 'Events', exact: true }).check();
  await page.getByRole('button', { name: 'Clear categories', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'News', exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Reset to News', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'News', exact: true })).toBeChecked();
  await page.goto(url('toggle'));
  const action = page.getByRole('button', { name: 'Bold', exact: true });
  await action.focus(); await page.keyboard.press('Space');
  await expect(action).toHaveAttribute('aria-pressed', 'true');
});

test('OTP state examples keep each label, control and feedback in one responsive field', async ({ page }, testInfo) => {
  for (const width of [1200, 360]) {
    for (const dir of ['ltr', 'rtl']) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url('otp-input'));
      await page.locator('html').evaluate((el, value) => el.dir = value, dir);
      const invalid = page.locator('#demo-otp-error');
      const disabled = page.locator('#demo-otp-disabled');
      for (const input of [invalid, disabled]) {
        const layout = await input.evaluate(el => {
          const control = el as HTMLInputElement;
          const group = control.closest('.form-group');
          const label = control.labels![0];
          const field = control.getBoundingClientRect();
          const heading = label.getBoundingClientRect();
          const rtl = document.documentElement.dir === 'rtl';
          return {
            grouped: !!group && group.contains(label),
            verticalGap: field.top - heading.bottom,
            alignment: rtl ? Math.abs(field.right - heading.right) : Math.abs(field.left - heading.left),
          };
        });
        expect(layout.grouped).toBe(true);
        expect(layout.verticalGap).toBeGreaterThanOrEqual(0);
        expect(layout.verticalGap).toBeLessThanOrEqual(16);
        expect(layout.alignment).toBeLessThanOrEqual(1);
      }
      const invalidBox = (await invalid.boundingBox())!;
      const disabledBox = (await disabled.boundingBox())!;
      if (width === 1200) expect(Math.abs(invalidBox.y - disabledBox.y)).toBeLessThanOrEqual(1);
      else expect(disabledBox.y).toBeGreaterThan(invalidBox.y + invalidBox.height);
      await expect(disabled).toBeDisabled();
      await expect(disabled).toHaveValue('0012');
      await expect(invalid).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('#demo-otp-error-message')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await disabled.scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath(`otp-states-${width}-${dir}.png`), fullPage: false });
    }
  }
});

test('served Calendar remains an explicitly static full-width grid on narrow/RTL views', async ({ page }, testInfo) => {
  for (const width of [1200, 360]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(url('datepicker'));
    await page.locator('html').evaluate(el => el.dir = 'rtl');
    const grid = page.locator('.datepicker-calendar').first();
    await grid.scrollIntoViewIfNeeded();
    const sizes = await grid.evaluate(el => ({
      calendar: el.getBoundingClientRect().width,
      weekdays: el.querySelector('.datepicker-weekdays')!.getBoundingClientRect().width,
      days: el.querySelector('.datepicker-days')!.getBoundingClientRect().width,
    }));
    expect(sizes.weekdays).toBeGreaterThan(sizes.calendar * 0.8);
    expect(sizes.days).toBe(sizes.weekdays);
    expect(await page.locator('.datepicker-inline').evaluate(el => el.querySelectorAll('button,input,[role="grid"]').length)).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('calendar-' + width + '.png'), fullPage: false });
  }
});
