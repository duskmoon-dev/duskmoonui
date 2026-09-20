import { test, expect } from '@playwright/test';

test.describe('Feedback components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('renders loading, radial, native progress, and safe closed toast states', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <span id="loading" class="loading loading-spinner loading-lg" style="color: rgb(1, 2, 3)"></span>
        <div id="radial" class="radial-progress" style="--radial-progress-value: 120; --radial-progress-size: 5rem">100%</div>
        <progress id="native-zero" class="progress" value="0" max="10" aria-label="Zero"></progress>
        <progress id="native-indeterminate" class="progress" max="10" aria-label="Working"></progress>
        <div class="toast-container toast-container-top-end" dir="rtl">
          <div id="closed-toast" class="toast"><button>Closed</button></div>
          <div id="open-toast" class="toast toast-show"><button>Open</button></div>
        </div>`;
    });
    await expect(page.locator('#loading')).toHaveCSS('width', '28px');
    await expect(page.locator('#loading')).toHaveCSS('color', 'rgb(1, 2, 3)');
    await expect(page.locator('#radial')).toHaveCSS('width', '80px');
    expect(await page.locator('#native-zero').evaluate((el) => (el as HTMLProgressElement).value)).toBe(0);
    expect(await page.locator('#native-indeterminate').evaluate((el) => (el as HTMLProgressElement).value)).toBe(0);
    await expect(page.locator('#closed-toast')).toHaveCSS('visibility', 'hidden');
    await expect(page.locator('#closed-toast button')).not.toBeFocused();
    await page.locator('#open-toast button').focus();
    await expect(page.locator('#open-toast button')).toBeFocused();
  });

  test('opens and closes a toast with native HTML commands', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `<button id="show-native-toast" command="show-popover" commandfor="native-toast">Show toast</button>
        <div id="native-toast" class="toast-container toast-container-top-start" popover="manual">
          <div class="toast" role="status">
            <div class="toast-content"><div class="toast-message">Saved</div></div>
            <button id="hide-native-toast" class="toast-close" command="hide-popover" commandfor="native-toast" aria-label="Dismiss">×</button>
          </div>
        </div>`;
    });

    const supported = await page.evaluate(() => 'commandForElement' in HTMLButtonElement.prototype);
    test.skip(!supported, 'Command Invokers are unavailable in this browser');

    await page.locator('#show-native-toast').click();
    await expect(page.locator('#native-toast')).toHaveJSProperty('popover', 'manual');
    expect(await page.locator('#native-toast').evaluate((el) => el.matches(':popover-open'))).toBe(true);
    await expect(page.locator('#native-toast .toast')).toHaveCSS('visibility', 'visible');
    await expect(page.locator('#native-toast .toast')).toHaveCSS('opacity', '1');

    await page.locator('#hide-native-toast').click();
    expect(await page.locator('#native-toast').evaluate((el) => el.matches(':popover-open'))).toBe(false);
  });

  test('renders filled primary and semantic accent toast colors', async ({ page }) => {
    const colors = await page.evaluate(() => {
      document.body.innerHTML = `
        <div id="filled-toast" class="toast toast-filled toast-primary">
          <div class="toast-content"><div class="toast-title">Primary</div><div class="toast-message">Filled</div></div>
          <button class="toast-close">×</button>
        </div>
        <div id="accent-toast" class="toast toast-success toast-accent">Success</div>
        <div id="primary-probe" style="background: var(--color-primary)"></div>
        <div id="primary-content-probe" style="color: var(--color-primary-content)"></div>
        <div id="success-probe" style="background: var(--color-success)"></div>`;

      const filled = getComputedStyle(document.getElementById('filled-toast')!);
      const accent = getComputedStyle(document.getElementById('accent-toast')!);
      const accentEdge = getComputedStyle(document.getElementById('accent-toast')!, '::before');
      return {
        filledBackground: filled.backgroundColor,
        primaryBackground: getComputedStyle(document.getElementById('primary-probe')!).backgroundColor,
        filledColor: filled.color,
        primaryContent: getComputedStyle(document.getElementById('primary-content-probe')!).color,
        accentBorder: accent.borderTopColor,
        accentEdge: accentEdge.backgroundColor,
        success: getComputedStyle(document.getElementById('success-probe')!).backgroundColor,
      };
    });

    expect(colors.filledBackground).toBe(colors.primaryBackground);
    expect(colors.filledColor).toBe(colors.primaryContent);
    expect(colors.accentBorder).toBe(colors.success);
    expect(colors.accentEdge).toBe(colors.success);
  });

  test('renders primary snackbar with the active theme role colors', async ({ page }) => {
    const colors = await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
      document.body.innerHTML = `
        <div id="snackbar" class="snackbar snackbar-primary snackbar-show">
          <span class="snackbar-message">Primary snackbar</span>
          <button id="snackbar-action" class="snackbar-action">Undo</button>
          <button id="snackbar-close" class="snackbar-close">×</button>
        </div>
        <div id="primary-probe" style="background: var(--color-primary)"></div>
        <div id="content-probe" style="color: var(--color-primary-content)"></div>`;

      const snackbar = getComputedStyle(document.getElementById('snackbar')!);
      return {
        background: snackbar.backgroundColor,
        primary: getComputedStyle(document.getElementById('primary-probe')!).backgroundColor,
        color: snackbar.color,
        content: getComputedStyle(document.getElementById('content-probe')!).color,
        action: getComputedStyle(document.getElementById('snackbar-action')!).color,
        close: getComputedStyle(document.getElementById('snackbar-close')!).color,
      };
    });

    expect(colors.background).toBe(colors.primary);
    expect(colors.color).toBe(colors.content);
    expect(colors.action).toBe(colors.content);
    expect(colors.close).toBe(colors.content);
  });

  test('keeps alert icon and title aligned while actions occupy the end of the row', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `<div id="basic-alert" class="alert"><div class="alert-content"><p id="basic-message">Basic message</p></div></div>
      <div id="alert" class="alert alert-error">
        <span id="alert-icon" class="alert-icon">!</span>
        <div class="alert-content"><h4 id="alert-title" class="alert-title">Payment Failed</h4><p id="alert-description" class="alert-description">Please update your payment method.</p></div>
        <div id="alert-actions" class="alert-actions"><button>Dismiss</button><button>Update Payment</button></div>
      </div>
      <div id="bottom-alert" class="alert alert-error alert-actions-bottom">
        <span id="bottom-icon" class="alert-icon">!</span>
        <div class="alert-content"><h4 id="bottom-title" class="alert-title">Payment Failed</h4><p id="bottom-description" class="alert-description">Please update your payment method.</p></div>
        <div id="bottom-actions" class="alert-actions"><button>Dismiss</button><button>Update Payment</button></div>
      </div>`;
    });
    const basicBox = await page.locator('#basic-alert').boundingBox();
    const basicMessageBox = await page.locator('#basic-message').boundingBox();
    expect(basicBox).not.toBeNull();
    expect(basicMessageBox).not.toBeNull();
    expect(Math.abs((basicMessageBox!.y + basicMessageBox!.height / 2) - (basicBox!.y + basicBox!.height / 2))).toBeLessThan(2);
    const boxes = await page.evaluate(() => Object.fromEntries(
      ['alert-icon', 'alert-title', 'alert-description', 'alert-actions'].map((id) => {
        const box = document.getElementById(id)!.getBoundingClientRect();
        return [id, { top: box.top, bottom: box.bottom, center: box.top + box.height / 2, left: box.left }];
      }),
    ));
    expect(Math.abs(boxes['alert-icon'].center - boxes['alert-title'].center)).toBeLessThan(4);
    expect(Math.abs(boxes['alert-actions'].center - boxes['alert-description'].center)).toBeLessThan(30);
    expect(boxes['alert-actions'].left).toBeGreaterThan(boxes['alert-icon'].left);

    const bottomBoxes = await page.evaluate(() => Object.fromEntries(
      ['bottom-icon', 'bottom-title', 'bottom-description', 'bottom-actions'].map((id) => {
        const box = document.getElementById(id)!.getBoundingClientRect();
        return [id, { top: box.top, bottom: box.bottom, center: box.top + box.height / 2, left: box.left }];
      }),
    ));
    expect(Math.abs(bottomBoxes['bottom-icon'].center - bottomBoxes['bottom-title'].center)).toBeLessThan(4);
    expect(bottomBoxes['bottom-actions'].top).toBeGreaterThan(bottomBoxes['bottom-description'].bottom);
  });

  test('moves default alert actions below content on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.evaluate(() => {
      document.body.innerHTML = `<div id="responsive-alert" class="alert alert-error">
        <span class="alert-icon" aria-hidden="true">!</span>
        <div class="alert-content"><h4 class="alert-title">Payment Failed</h4><p class="alert-description">Please update your payment method.</p></div>
        <div id="responsive-actions" class="alert-actions"><button>Dismiss</button><button>Update Payment</button></div>
      </div>`;
    });
    const layout = await page.evaluate(() => {
      const alert = document.getElementById('responsive-alert')!.getBoundingClientRect();
      const content = document.querySelector('#responsive-alert .alert-content')!.getBoundingClientRect();
      const actions = document.getElementById('responsive-actions')!.getBoundingClientRect();
      return { alertWidth: alert.width, contentWidth: content.width, actionsTop: actions.top, contentBottom: content.bottom };
    });
    expect(layout.alertWidth).toBeLessThanOrEqual(360);
    expect(layout.contentWidth).toBeGreaterThan(0);
    expect(layout.actionsTop).toBeGreaterThan(layout.contentBottom);
  });

  test('tooltip uses native focus and Escape when supported', async ({ page }) => {
    const supported = await page.evaluate(() =>
      'showPopover' in HTMLElement.prototype && 'interestForElement' in HTMLElement.prototype,
    );
    test.skip(!supported, 'Popover or Interest Invoker is unavailable in this browser');
    await page.evaluate(() => {
      document.body.innerHTML = `<button id="tip-trigger" interestfor="tip" aria-describedby="tip">Help</button><div id="tip" popover="hint" class="tooltip" role="tooltip">Helpful text</div>`;
    });
    await page.locator('#tip-trigger').focus();
    await expect(page.locator('#tip')).toHaveAttribute('popover', 'hint');
    await page.keyboard.press('Escape');
    await expect(page.locator('#tip')).not.toHaveCSS('opacity', '1');
  });
});
