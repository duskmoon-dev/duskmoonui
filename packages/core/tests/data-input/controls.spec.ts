import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, posix } from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const assets = process.env.DATA_INPUT_CORE_DIR || join(import.meta.dirname, '../..');
const asset = (path: string) => readFileSync(join(assets, path), 'utf8');
function baselineCss(path: string, visited = new Set<string>()): string {
  if (visited.has(path)) return '';
  visited.add(path);
  return execFileSync('git', ['show', 'HEAD:packages/core/src/' + path], { encoding: 'utf8' })
    .replace(/^\s*@import\s+["']([^"']+)["']\s*;/gm, (_, dependency) => baselineCss(posix.join(posix.dirname(path), dependency), visited));
}
const core = process.env.DATA_INPUT_BASELINE ? baselineCss('index.css') : asset('dist/index.css');
const themeBase = asset('dist/base.css') + asset('dist/themes/generated/sunshine.css');
const docsRoot = join(import.meta.dirname, '../../../docs/src/content/docs/en/components');
function example(name: string, index = 0) {
  const source = readFileSync(join(docsRoot, name + '.mdx'), 'utf8');
  const examples = [...source.matchAll(/code=\{\x60([\s\S]*?)\x60\}/g)];
  if (!examples[index]) throw new Error('Missing copyable example: ' + name);
  return examples[index][1];
}
async function fixture(page: Page, markup: string, css = core, theme = 'sunshine', dir = 'ltr') {
  await page.setContent(`<html lang="en" data-theme="${theme}" dir="${dir}"><head><title>Data Input</title><style>${css}</style></head><body><main>${markup}</main></body></html>`);
}
async function tabForward(page: Page, browserName: string) {
  // macOS WebKit's native all-controls navigation uses Option-Tab.
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
}

test('aggregate checkbox and radio draw exactly one native-state mark', async ({ page }) => {
  await fixture(page, '<input class="checkbox" type="checkbox" checked aria-label="Checkbox"><input class="radio" type="radio" checked aria-label="Radio">');
  for (const name of ['checkbox', 'radio']) {
    expect(await page.locator(`.${name}`).evaluate(el => getComputedStyle(el, '::after').content)).toBe('none');
    expect(await page.locator(`.${name}`).evaluate(el => getComputedStyle(el, '::before').content)).toBe('""');
  }
});

test('server invalid wins over native-valid success and focused filled color modifiers', async ({ page }) => {
  for (const name of ['input', 'select', 'textarea']) {
    for (const variant of ['', `${name}-filled`, `${name}-outlined`, `${name}-ghost`]) {
      const attrs = `id="field" class="${name} ${variant} ${name}-success validator validator-success" required aria-invalid="true"`;
      const control = name === 'input' ? `<input ${attrs} value="accepted">` : name === 'select' ? `<select ${attrs}><option selected>accepted</option><option>still valid</option></select>` : `<textarea ${attrs}>accepted</textarea>`;
      await fixture(page, `<form><div class="form-group form-group-success">${control}<p class="helper-text-error">Error: rejected by the server.</p></div></form><button id="blur">Next</button><span id="error" style="color:var(--color-error)"></span>`);
      const field = page.locator('#field');
      await field.focus();
      if (name !== 'select') await field.fill('still valid');
      else await field.selectOption({ label: 'still valid' });
      await page.locator('#blur').click();
      await page.locator('form').evaluate(el => {
        el.addEventListener('submit', event => event.preventDefault());
        (el as HTMLFormElement).requestSubmit();
      });
      expect(await field.evaluate(el => (el as HTMLInputElement).validity.valid)).toBe(true);
      expect(await field.evaluate(el => el.matches(':user-valid'))).toBe(true);
      const error = await page.locator('#error').evaluate(el => getComputedStyle(el).color);
      for (const focused of [false, true, false]) {
        if (focused) await field.focus(); else await page.locator('#blur').focus();
        expect(await field.evaluate(el => getComputedStyle(el).color)).toBe(error);
        await expect.poll(() => field.evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
        if (focused) expect(await field.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
      }
    }
  }
});

test('ordinary controls stay neutral; native error and success require opt-in', async ({ page }) => {
  await fixture(page, '<input id="ordinary" class="input" required><input id="opted" class="input validator validator-success" required><div class="validate"><input id="immediate" class="input" required></div>');
  const color = await page.locator('#ordinary').evaluate(el => getComputedStyle(el).borderBottomColor);
  expect(await page.locator('#opted').evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(color);
  expect(await page.locator('#immediate').evaluate(el => getComputedStyle(el).borderBottomColor)).not.toBe(color);
  await page.locator('#ordinary').fill('text');
  await page.locator('#opted').focus();
  await expect.poll(() => page.locator('#ordinary').evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(color);
  await page.locator('#opted').fill('text');
  await page.locator('#ordinary').focus();
  expect(await page.locator('#opted').evaluate(el => getComputedStyle(el).borderBottomColor)).not.toBe(color);
});

test('explicit errors beat every semantic palette and segmented OTP appearance', async ({ page }) => {
  const colors = ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'];
  const textControls = ['input', 'select', 'textarea'];
  const controls = [...textControls, 'checkbox', 'radio', 'switch', 'toggle', 'file-input', 'otp-code'];
  const markup = controls.map(name => {
    const attrs = `id="${name}" class="${name} validator validator-success" aria-invalid="true"`;
    if (name === 'select') return `<select ${attrs}><option>Valid</option></select>`;
    if (name === 'textarea') return `<textarea ${attrs}>Valid</textarea>`;
    const type = name === 'file-input' ? 'file' : name === 'radio' ? 'radio' : ['checkbox', 'switch', 'toggle'].includes(name) ? 'checkbox' : 'text';
    return `<input ${attrs} type="${type}" value="001234" checked>`;
  }).join('');
  await fixture(page, `<form>${markup}<div id="segments" class="otp-input"><input id="segment" class="otp-input-field validator validator-success" value="1" aria-invalid="true"></div><button type="button">Blur</button></form><span id="error" style="color:var(--color-error)"></span>`);
  const error = await page.locator('#error').evaluate(el => getComputedStyle(el).color);
  for (const color of colors) {
    for (const name of controls) {
      const control = page.locator('#' + name);
      const variants = textControls.includes(name) ? ['', `${name}-filled`, `${name}-outlined`, `${name}-ghost`] : [''];
      for (const variant of variants) {
        await control.evaluate((el, value) => el.className = value, `${name} ${name}-${color} ${variant} validator validator-success`);
        await control.focus();
        expect(await control.evaluate(el => getComputedStyle(el).color)).toBe(error);
        await expect.poll(() => control.evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
        expect(await control.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
        await page.getByRole('button', { name: 'Blur', exact: true }).focus();
        await expect.poll(() => control.evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
      }
    }
    for (const appearance of ['outlined', 'filled', 'underline', 'underlined', 'ghost']) {
      await page.locator('#segments').evaluate((el, value) => el.className = value, `otp-input otp-input-${color} otp-input-${appearance}`);
      await page.locator('#segment').focus();
      expect(await page.locator('#segment').evaluate(el => getComputedStyle(el).color)).toBe(error);
      await expect.poll(() => page.locator('#segment').evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
      expect(await page.locator('#segment').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    }
  }
});

test('forced colors preserve native checked controls and keyboard focus', async ({ page, browserName }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await fixture(page, ['checkbox', 'radio', 'switch', 'toggle'].map(name => `<label>${name}<input class="${name}" type="${name === 'radio' ? 'radio' : 'checkbox'}" checked></label>`).join(''));
  expect(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)).toBe(true);
  for (const name of ['checkbox', 'radio', 'switch', 'toggle']) {
    const control = page.getByLabel(name, { exact: true });
    await expect(control).toBeChecked();
    await tabForward(page, browserName);
    await expect(control).toBeFocused();
    expect(await control.evaluate(el => el.matches(':focus-visible'))).toBe(true);
    expect(await control.evaluate(el => getComputedStyle(el).appearance)).toBe('auto');
    expect(await control.evaluate(el => getComputedStyle(el, '::before').content)).toBe('none');
    expect(await control.evaluate(el => getComputedStyle(el, '::after').content)).toBe('none');
    expect(await control.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  }
});

test('aggregate, individual, legacy, standalone and adopted module rendering agree', async ({ page }) => {
  const names = ['input', 'checkbox', 'radio', 'select', 'textarea', 'switch', 'toggle', 'range', 'file-input', 'otp-input', 'rating', 'filter-group', 'form-group'];
  const markup = `<input class="input input-filled validator validator-success" required value="valid" aria-invalid="true">
    <input type="checkbox" class="checkbox checkbox-secondary" checked>
    <input type="radio" class="radio radio-tertiary" checked>
    <input type="checkbox" class="switch" checked>
    <input type="checkbox" class="toggle toggle-sm" checked>
    <select class="select"><option>Choice</option></select><textarea class="textarea">Notes</textarea>
    <input class="file-input" type="file"><input type="range" class="range range-sm">
    <input class="otp-code" value="001234">
    <div class="rating rating-native"><label class="rating-item"><input type="radio" class="rating-input" checked><span class="rating-icon">&#9733;</span></label></div>
    <div class="filter-group"><label class="chip"><input type="checkbox" class="filter-group-input" checked>News</label></div>`;
  const styles = async () => {
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
    return page.locator('main').evaluate(el => [...el.querySelectorAll('*')].map(node => {
    const properties = ['color', 'background-color', 'border-color', 'border-width', 'border-radius', 'display', 'width', 'height', 'box-shadow', 'outline'];
    const read = (pseudo?: string) => {
      const style = getComputedStyle(node, pseudo);
      return Object.fromEntries([...properties, 'content', 'transform'].map(p => [p, style.getPropertyValue(p)]));
    };
    return [read(), read('::before'), read('::after')];
    }));
  };
  await fixture(page, markup);
  const aggregate = await styles();
  await fixture(page, markup, themeBase + names.map(n => asset('dist/components/' + n + '.css')).join('\n'));
  await expect.poll(styles).toEqual(aggregate);
  await fixture(page, markup, themeBase + asset('dist/components/form.css') + ['switch', 'toggle', 'otp-input', 'rating', 'filter-group'].map(n => asset('dist/components/' + n + '.css')).join('\n'));
  await expect.poll(styles).toEqual(aggregate);
  await fixture(page, markup, asset('dist/standalone/duskmoonui.css'));
  await expect.poll(styles).toEqual(aggregate);
  await fixture(page, markup, themeBase);
  for (const name of names) {
    const module = asset('dist/esm/components/' + name + '.js');
    expect(module).not.toMatch(/^\s*@import/m);
    await page.evaluate(async source => {
      const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      const module = await import(/* @vite-ignore */ url);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, module.styles];
      URL.revokeObjectURL(url);
    }, module);
  }
  await expect.poll(styles).toEqual(aggregate);
});

test('all semantic controls preserve explicit invalid on focus and native reset', async ({ page }) => {
  const names = ['checkbox', 'radio', 'switch', 'toggle', 'file-input', 'otp-input-field', 'otp-code'];
  await fixture(page, `<form>${names.map(name => `<label>${name}<input id="${name}" name="${name}" type="${name === 'file-input' ? 'file' : ['otp-code', 'otp-input-field'].includes(name) ? 'text' : name === 'radio' ? 'radio' : 'checkbox'}" class="${name} ${name}-success validator validator-success" ${['checkbox', 'radio', 'switch', 'toggle'].includes(name) ? 'checked' : 'value="001234"'} aria-invalid="true"></label>`).join('')}<button type="reset">Reset</button></form><span id="error" style="color:var(--color-error)"></span>`);
  const error = await page.locator('#error').evaluate(el => getComputedStyle(el).color);
  for (const name of names) {
    const control = page.locator('#' + name);
    await control.focus();
    expect(await control.evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
    expect(await control.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
  }
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  for (const name of names) {
    await expect(page.locator('#' + name)).toHaveAttribute('aria-invalid', 'true');
    expect(await page.locator('#' + name).evaluate(el => getComputedStyle(el).borderBottomColor)).toBe(error);
  }
});

test('OTP native editing, length/pattern, FormData and reset from actual docs examples', async ({ page }) => {
  for (const index of [0, 1]) {
    await fixture(page, example('otp-input', index));
    const control = page.locator('.otp-code');
    const value = index ? '0012' : '001234';
    await control.click();
    await page.keyboard.insertText(value);
    // The four-digit example has an initial value: replace it through native selection.
    await control.evaluate(el => (el as HTMLInputElement).select());
    await page.keyboard.insertText(value);
    await expect(control).toHaveValue(value);
    expect(await control.evaluate(el => (el as HTMLInputElement).validity.valid)).toBe(true);
    expect(await page.locator('form').evaluate(el => [...new FormData(el as HTMLFormElement).values()])).toEqual([value]);
    await control.evaluate(el => (el as HTMLInputElement).setSelectionRange(1, 3));
    await page.keyboard.insertText('99');
    await expect(control).toHaveValue('099' + value.slice(3));
    await page.keyboard.press('Backspace');
    await expect(control).toHaveValue('09' + value.slice(3));
    expect(await control.evaluate(el => (el as HTMLInputElement).validity.valid)).toBe(false);
    await control.fill('abcdef'.slice(0, value.length));
    expect(await control.evaluate(el => (el as HTMLInputElement).validity.patternMismatch)).toBe(true);
    await control.fill('123456789');
    await expect(control).toHaveValue('123456789'.slice(0, value.length));
    expect(await control.evaluate(el => getComputedStyle(el).caretColor)).not.toBe('rgba(0, 0, 0, 0)');
    expect(await control.evaluate(el => getComputedStyle(el).pointerEvents)).toBe('auto');
    await page.getByRole('button', { name: /Reset/ }).click();
    await expect(control).toHaveValue(index ? '0012' : '');
  }
});

test('OTP guides align with native characters instead of spanning an unrelated field width', async ({ page }, testInfo) => {
  for (const index of [0, 1]) {
    for (const dir of ['ltr', 'rtl']) {
      await fixture(page, example('otp-input', index), core, 'moonlight', dir);
      const control = page.locator('.otp-code');
      await control.fill(index ? '0012' : '001234');
      const geometry = await control.evaluate(el => {
        const input = el as HTMLInputElement;
        const style = getComputedStyle(input);
        const glyph = document.createElement('span');
        glyph.style.fontFamily = style.fontFamily;
        glyph.style.fontSize = style.fontSize;
        glyph.textContent = input.value;
        document.body.append(glyph);
        const textWidth = glyph.getBoundingClientRect().width;
        glyph.remove();
        const inset = ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth']
          .reduce((sum, property) => sum + parseFloat(style[property as keyof CSSStyleDeclaration] as string), 0);
        return {
          textWidth,
          contentWidth: input.getBoundingClientRect().width - inset,
          guideWidth: parseFloat(style.backgroundSize),
          origin: style.backgroundOrigin,
          repeat: style.backgroundRepeat,
          scrollLeft: input.scrollLeft,
        };
      });
      expect(geometry.guideWidth).toBeCloseTo(geometry.textWidth, 0);
      expect(geometry.contentWidth).toBeGreaterThanOrEqual(geometry.textWidth);
      expect(geometry.contentWidth - geometry.textWidth).toBeLessThanOrEqual(3);
      expect(geometry.origin).toBe('content-box');
      expect(geometry.repeat).toBe('no-repeat');
      expect(geometry.scrollLeft).toBe(0);
      await page.screenshot({ path: testInfo.outputPath(`otp-complete-${index}-${dir}.png`), fullPage: false, caret: 'initial' });
      await control.evaluate(el => (el as HTMLInputElement).setSelectionRange(1, 3));
      await page.keyboard.insertText('99');
      await expect(control).toHaveValue(index ? '0992' : '099234');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Delete');
      await expect(control).toHaveValue(index ? '092' : '09234');
      await page.screenshot({ path: testInfo.outputPath(`otp-${index}-${dir}.png`), fullPage: false, caret: 'initial' });
      await page.getByRole('button', { name: /Reset/ }).click();
      await expect(control).toHaveValue(index ? '0012' : '');
    }
  }
  await page.setViewportSize({ width: 360, height: 800 });
  await fixture(page, '<div style="width:140px">' + example('otp-input') + '</div>');
  await page.locator('html').evaluate(el => el.style.fontSize = '32px');
  const control = page.locator('.otp-code');
  await control.fill('001234');
  expect(await control.evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(140);
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Backspace');
  await expect(control).toHaveValue('00124');
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(control).toHaveValue('');
});

test('OTP clipboard paste uses the native input, not a segmented handler', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'Playwright clipboard permissions are Chromium-specific; editing is checked on every engine.');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.route('http://localhost/otp-test', route => route.fulfill({ contentType: 'text/html', body: `<html><head><style>${core}</style></head><body>${example('otp-input')}</body></html>` }));
  await page.goto('http://localhost/otp-test');
  await page.evaluate(() => navigator.clipboard.writeText('001234'));
  await page.locator('.otp-code').click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
  await expect(page.locator('.otp-code')).toHaveValue('001234');
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).get('code'))).toBe('001234');
});

test('Rating native selection, keyboard, semantic precedence, no-rating and reset', async ({ page }) => {
  await fixture(page, example('rating'));
  await page.getByRole('radio', { name: '3 stars', exact: true }).check();
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).get('rating'))).toBe('3');
  await page.getByRole('radio', { name: '3 stars', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: '4 stars', exact: true })).toBeChecked();
  await page.locator('.rating-item').last().evaluate(el => el.classList.add('filled', 'active'));
  const empty = await page.locator('.rating-item').last().evaluate(el => getComputedStyle(el).color);
  const selected = await page.locator('.rating-item').nth(4).evaluate(el => getComputedStyle(el).color);
  expect(empty).not.toBe(selected);
  await page.locator('.rating-item').last().hover();
  expect(await page.locator('.rating-item').last().evaluate(el => getComputedStyle(el).color)).toBe(empty);
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(page.getByRole('radio', { name: 'No rating' })).toBeChecked();
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).get('rating'))).toBe('0');
  await fixture(page, '<form><div class="rating rating-native"><label class="rating-item"><input class="rating-input" name="optional" type="radio" value="1" aria-label="1 star"><span class="rating-icon">&#9733;</span></label></div><button type="reset">Reset</button></form>');
  await page.getByRole('radio').check();
  await page.getByRole('button').click();
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).has('optional'))).toBe(false);
  await fixture(page, '<form>' + example('rating', 1) + '</form>');
  expect(await page.locator('form').evaluate(el => [...new FormData(el as HTMLFormElement).entries()])).toEqual([]);
  for (const radio of await page.getByRole('radio').all()) {
    await expect(radio).toBeDisabled();
    expect(Number(await radio.evaluate(el => getComputedStyle(el.parentElement!).opacity))).toBeLessThan(1);
  }
});

test('Filter single/multiple selection, keyboard, focus, disabled, scoped clear and reset', async ({ page, browserName }) => {
  await fixture(page, '<button type="button" id="keyboard-start">Before filters</button>' + example('filter-group'));
  await page.getByRole('radio', { name: 'Open', exact: true }).check();
  await page.getByRole('radio', { name: 'Open', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Closed', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'Archived', exact: true })).toBeDisabled();
  // Re-enter the selected native group through keyboard navigation, not mouse focus.
  await page.locator('#keyboard-start').focus();
  await tabForward(page, browserName);
  await expect(page.getByRole('radio', { name: 'Closed', exact: true })).toBeFocused();
  const focus = await page.getByRole('radio', { name: 'Closed', exact: true }).evaluate(el => getComputedStyle(el.parentElement!).outlineStyle);
  expect(focus).not.toBe('none');
  await expect(page.getByRole('radio', { name: 'All', exact: true })).toBeVisible();
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).getAll('status'))).toEqual(['closed']);
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(page.getByRole('radio', { name: 'All', exact: true })).toBeChecked();
  await fixture(page, example('filter-group', 1));
  await page.getByRole('checkbox', { name: 'Events', exact: true }).check();
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).getAll('category'))).toEqual(['news', 'events']);
  await page.locator('form').evaluate(el => {
    const input = document.createElement('input'); input.name = 'unrelated'; input.defaultValue = 'preserved'; el.append(input);
  });
  await page.getByRole('button', { name: 'Clear categories' }).click();
  expect(await page.locator('form').evaluate(el => [...new FormData(el as HTMLFormElement).entries()])).toEqual([['unrelated', 'preserved']]);
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(page.getByRole('checkbox', { name: 'News', exact: true })).toBeChecked();
  await page.locator('fieldset').evaluate(el => (el as HTMLFieldSetElement).disabled = true);
  for (const control of await page.getByRole('checkbox').all()) {
    await expect(control).toBeDisabled();
    await expect.poll(() => control.evaluate(el => Number(getComputedStyle(el.parentElement!).opacity))).toBeCloseTo(0.38, 2);
  }
  expect(await page.locator('form').evaluate(el => [...new FormData(el as HTMLFormElement).entries()])).toEqual([['unrelated', 'preserved']]);
});

test('composed native controls, disabled fieldset, indeterminate, Range stepping and reset', async ({ page, browserName }) => {
  await fixture(page, example('form'));
  await page.getByLabel('Email (required)', { exact: true }).fill('test@example.com');
  await page.getByLabel('Language', { exact: true }).selectOption('fr');
  await page.getByLabel('Enable notifications', { exact: true }).uncheck();
  await page.getByLabel('Notification volume', { exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  expect(await page.locator('form').evaluate(el => Object.fromEntries(new FormData(el as HTMLFormElement)))).toEqual({
    email: 'test@example.com', language: 'fr', volume: '55', notes: 'Default note',
  });
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(page.getByLabel('Email (required)', { exact: true })).toHaveValue('');
  await expect(page.getByLabel('Language', { exact: true })).toHaveValue('en');
  await expect(page.getByLabel('Enable notifications', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Notification volume', { exact: true })).toHaveValue('50');
  await fixture(page, '<form><fieldset disabled><legend>Disabled</legend>' + ['checkbox', 'radio', 'switch', 'toggle', 'range', 'input', 'file-input', 'otp-code'].map(name => `<input aria-label="${name}" class="${name}" name="${name}" type="${name === 'radio' ? 'radio' : ['checkbox', 'switch', 'toggle'].includes(name) ? 'checkbox' : name === 'range' ? 'range' : name === 'file-input' ? 'file' : 'text'}" checked>`).join('') + '<select class="select" name="select" aria-label="Select"><option>Option</option></select><textarea name="textarea" class="textarea" aria-label="Notes"></textarea></fieldset><button>After</button></form>');
  expect(await page.locator('form').evaluate(el => [...new FormData(el as HTMLFormElement).entries()])).toEqual([]);
  for (const input of await page.locator('fieldset :is(input,select,textarea)').all()) {
    await expect(input).toBeDisabled();
    expect(Number(await input.evaluate(el => getComputedStyle(el).opacity))).toBeLessThan(1);
  }
  await tabForward(page, browserName);
  await expect(page.getByRole('button', { name: 'After', exact: true })).toBeFocused();
  await fixture(page, '<label><input class="checkbox" type="checkbox">Mixed</label>');
  await page.getByRole('checkbox').evaluate(el => (el as HTMLInputElement).indeterminate = true);
  expect(await page.getByRole('checkbox').evaluate(el => el.matches(':indeterminate'))).toBe(true);
  await page.getByRole('checkbox').click();
  expect(await page.getByRole('checkbox').evaluate(el => (el as HTMLInputElement).indeterminate)).toBe(false);
});

test('native File Input and date selection submit real values and reset', async ({ page }) => {
  await fixture(page, example('file-input'));
  await page.getByLabel('Attachment (required)', { exact: true }).setInputFiles({ name: 'report.pdf', mimeType: 'application/pdf', buffer: Buffer.from('test') });
  expect(await page.locator('form').evaluate(el => (new FormData(el as HTMLFormElement).get('attachment') as File).name)).toBe('report.pdf');
  await page.getByRole('button', { name: /Clear/ }).click();
  expect(await page.getByLabel('Attachment (required)', { exact: true }).evaluate(el => (el as HTMLInputElement).files!.length)).toBe(0);
  await fixture(page, example('datepicker'));
  await page.getByLabel('Appointment date', { exact: true }).fill('2026-12-20');
  expect(await page.locator('form').evaluate(el => new FormData(el as HTMLFormElement).get('appointment'))).toBe('2026-12-20');
  await page.getByRole('button').click();
  await expect(page.getByLabel('Appointment date', { exact: true })).toHaveValue('2026-09-18');
});

test('Toggle action uses aria-pressed over stale classes and local demo keyboard behavior', async ({ page }) => {
  await fixture(page, example('toggle'));
  const button = page.getByRole('button', { name: 'Bold', exact: true });
  await button.hover();
  const unpressedHover = await button.evaluate(async el => {
    getComputedStyle(el).backgroundColor;
    await Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => {})));
    return getComputedStyle(el).backgroundColor;
  });
  await button.evaluate(el => el.classList.add('active', 'toggle-btn-active'));
  await expect.poll(() => button.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(unpressedHover);
  await page.mouse.move(0, 0);
  await button.evaluate(el => el.classList.remove('active', 'toggle-btn-active'));
  await button.evaluate(async el => {
    getComputedStyle(el).backgroundColor;
    await Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => {})));
  });
  const initial = await button.evaluate(el => getComputedStyle(el).backgroundColor);
  await button.evaluate(el => el.classList.add('active', 'toggle-btn-active'));
  expect(await button.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(initial);
  await button.focus(); await page.keyboard.press('Space');
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(await button.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(initial);
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-pressed', 'false');
});

test('actual examples: light/dark, RTL, narrow, zoom, reduced motion, forced-colors and accessibility', async ({ page }, testInfo) => {
  const markup = ['form', 'otp-input', 'rating', 'filter-group', 'file-input', 'datepicker'].map(name => example(name)).join('');
  for (const theme of ['sunshine', 'moonlight']) {
    for (const dir of ['ltr', 'rtl']) {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await fixture(page, markup, core, theme, dir);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath('controls-' + theme + '-' + dir + '.png'), fullPage: false, caret: 'initial' });
      await page.locator('html').evaluate(el => el.style.fontSize = '200%');
      await page.evaluate(() => new Promise(requestAnimationFrame));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const otp = page.locator('.otp-code').first();
      await otp.fill('001234');
      await page.keyboard.press('ArrowLeft');
      expect(await otp.evaluate(el => (el as HTMLInputElement).selectionStart)).toBe(5);
      await page.keyboard.press('Backspace');
      await expect(otp).toHaveValue('00124');
      await otp.fill('001234');
      expect(await otp.evaluate(el => getComputedStyle(el).caretColor)).not.toBe('rgba(0, 0, 0, 0)');
      await page.screenshot({ path: testInfo.outputPath('controls-zoom-' + theme + '-' + dir + '.png'), fullPage: false, caret: 'initial' });
    }
  }
  await page.emulateMedia({ forcedColors: 'active' });
  await page.locator('.otp-code').first().focus();
  expect(await page.locator('.otp-code').first().evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  expect(await page.locator('.otp-code').first().evaluate(el => getComputedStyle(el).backgroundImage)).toBe('none');
});
