import { expect, test, type Page } from '@playwright/test';

async function mount(page: Page, markup: string, script = '') {
  await page.goto('/tests/fixtures/test-fixture.html');
  await page.evaluate(({ markup, script }) => {
    document.body.innerHTML = markup;
    if (script) Function(script)();
  }, { markup, script });
}

test.describe('Actions components', () => {
  test('controlled FAB owns disclosure, dismissal, focus restoration, and closed reachability', async ({ page }) => {
    await mount(page, `
      <main><button id="before">Before</button></main>
      <div class="fab fab-contained fab-speed-dial fab-controlled" id="dial">
        <button class="btn fab-trigger" id="dial-trigger" aria-expanded="false" aria-controls="dial-actions" aria-label="Create">+</button>
        <div class="fab-actions" id="dial-actions">
          <a class="btn fab-action" href="#message"><span class="fab-label">Message</span><span aria-hidden="true">M</span></a>
          <button class="btn fab-action"><span class="fab-label">Photo</span><span aria-hidden="true">P</span></button>
        </div>
      </div>
      <button id="after">After</button>`, `
        const dial = document.querySelector('#dial');
        const trigger = document.querySelector('#dial-trigger');
        const close = (restore = false) => {
          dial.classList.remove('fab-open');
          trigger.setAttribute('aria-expanded', 'false');
          if (restore) trigger.focus();
        };
        trigger.addEventListener('click', () => {
          const open = !dial.classList.contains('fab-open');
          dial.classList.toggle('fab-open', open);
          trigger.setAttribute('aria-expanded', String(open));
        });
        document.addEventListener('keydown', event => {
          if (event.key === 'Escape' && dial.classList.contains('fab-open')) close(true);
        });
        document.addEventListener('click', event => {
          if (!dial.contains(event.target)) close(false);
        });
      `);

    const trigger = page.locator('#dial-trigger');
    const actions = page.locator('#dial-actions');
    await expect(actions).toBeHidden();
    await trigger.focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#after')).toBeFocused();

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(actions).toBeVisible();
    await trigger.focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Message' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(actions).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.locator('#before').click();
    await expect(actions).toBeHidden();
  });

  test('FAB placement uses logical edges and stays usable in a narrow contained layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await mount(page, `
      <div id="stage" style="position:relative;width:320px;height:480px" dir="ltr">
        <div id="end" class="fab fab-contained" style="--fab-offset-inline:12px;--fab-offset-block:16px">
          <button class="btn fab-trigger" aria-label="End action">+</button>
        </div>
        <div id="start" class="fab fab-contained fab-start" style="--fab-offset-inline:12px;--fab-offset-block:16px">
          <button class="btn fab-trigger" aria-label="Start action">+</button>
        </div>
      </div>`);

    const stage = (await page.locator('#stage').boundingBox())!;
    const end = (await page.locator('#end').boundingBox())!;
    const start = (await page.locator('#start').boundingBox())!;
    expect(end.x).toBeGreaterThan(start.x);
    expect(start.x).toBeGreaterThanOrEqual(stage.x);
    expect(end.x + end.width).toBeLessThanOrEqual(stage.x + stage.width);

    await page.locator('#stage').evaluate(el => el.setAttribute('dir', 'rtl'));
    const rtlEnd = (await page.locator('#end').boundingBox())!;
    const rtlStart = (await page.locator('#start').boundingBox())!;
    expect(rtlEnd.x).toBeLessThan(rtlStart.x);
  });

  test('single and extended FABs retain the shared Button geometry contract', async ({ page }) => {
    await mount(page, `
      <div style="position:relative;width:360px;height:200px">
        <div class="fab fab-contained fab-start" style="--fab-offset-block:16px;--fab-offset-inline:16px">
          <button class="btn btn-primary fab-trigger" id="single-fab" aria-label="Compose">+</button>
        </div>
        <div class="fab fab-contained" style="--fab-offset-block:16px;--fab-offset-inline:16px">
          <button class="btn btn-primary fab-trigger fab-extended" id="extended-fab"><span aria-hidden="true">+</span> Compose</button>
        </div>
      </div>`);

    const single = (await page.locator('#single-fab').boundingBox())!;
    const extended = (await page.locator('#extended-fab').boundingBox())!;
    expect(single.width).toBeCloseTo(single.height, 0);
    expect(extended.width).toBeGreaterThan(single.width);
    expect(extended.height).toBeCloseTo(single.height, 0);
    await expect(page.locator('#extended-fab')).toHaveAccessibleName('Compose');
  });

  test('Swap follows checkbox and aria-pressed state without changing its accessible name', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(page, `
      <label class="swap swap-rotate" id="native-swap">
        <input class="swap-input" type="checkbox" aria-label="Mute notifications">
        <span class="swap-off" aria-hidden="true">Sound on</span>
        <span class="swap-on" aria-hidden="true">Muted</span>
      </label>
      <button class="swap" id="controlled-swap" aria-pressed="false" aria-label="Toggle navigation">
        <span class="swap-off" aria-hidden="true">Menu</span>
        <span class="swap-on" aria-hidden="true">Close</span>
      </button>
      <label class="swap" id="disabled-swap">
        <input class="swap-input" type="checkbox" aria-label="Unavailable setting" disabled>
        <span class="swap-off" aria-hidden="true">Off</span><span class="swap-on" aria-hidden="true">On</span>
      </label>`, `
        const button = document.querySelector('#controlled-swap');
        button.addEventListener('click', () => button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true')));
      `);

    const checkbox = page.getByRole('checkbox', { name: 'Mute notifications' });
    const native = page.locator('#native-swap');
    await expect(native.locator('.swap-off')).toBeVisible();
    await expect(native.locator('.swap-on')).toBeHidden();
    await page.keyboard.press('Tab');
    await expect(checkbox).toBeFocused();
    expect(await native.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    await checkbox.check();
    await expect(native.locator('.swap-on')).toBeVisible();
    await expect(native.locator('.swap-off')).toBeHidden();
    await expect(checkbox).toHaveAccessibleName('Mute notifications');
    const reducedDuration = await native.locator('.swap-on').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration));
    expect(reducedDuration).toBeLessThanOrEqual(0.001);

    const controlled = page.getByRole('button', { name: 'Toggle navigation' });
    await controlled.click();
    await expect(controlled).toHaveAttribute('aria-pressed', 'true');
    await expect(controlled.locator('.swap-on')).toBeVisible();
    await expect(controlled).toHaveAccessibleName('Toggle navigation');
    const disabled = page.getByRole('checkbox', { name: 'Unavailable setting' });
    await expect(disabled).toBeDisabled();
    expect(Number(await page.locator('#disabled-swap').evaluate(el => getComputedStyle(el).opacity))).toBeLessThan(1);
  });

  test('Dropdown uses native Popover state for disclosure and dismissal', async ({ page }) => {
    await mount(page, `
      <div class="dropdown dropdown-block-end">
        <button class="btn" id="dropdown-trigger" popovertarget="dropdown-content">Account</button>
        <div class="dropdown-content" id="dropdown-content" popover="auto"><a href="#profile">Profile</a></div>
      </div>
      <button id="outside">Outside</button>`);

    const trigger = page.locator('#dropdown-trigger');
    const content = page.locator('#dropdown-content');
    await trigger.focus();
    await expect(content).toBeHidden();
    await trigger.hover();
    await expect(content).toBeHidden();
    await trigger.click();
    await expect(content).toBeVisible();
    expect(await content.evaluate(el => el.matches(':popover-open'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.locator('#outside').click();
    await expect(content).toBeHidden();
  });

  test('Theme Controller keeps preference, resolved theme, and visual selection separate', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await mount(page, `
      <fieldset class="theme-controller" aria-label="Theme preference">
        <input class="theme-controller-item" id="theme-system" type="radio" name="theme-test" value="system" checked>
        <label class="theme-controller-label" for="theme-system">System</label>
        <input class="theme-controller-item" id="theme-light" type="radio" name="theme-test" value="sunshine">
        <label class="theme-controller-label" for="theme-light">Light</label>
        <input class="theme-controller-item" id="theme-dark" type="radio" name="theme-test" value="moonlight">
        <label class="theme-controller-label" for="theme-dark">Dark</label>
      </fieldset>`, `
        const media = matchMedia('(prefers-color-scheme: dark)');
        const apply = preference => {
          const resolved = preference === 'system' ? (media.matches ? 'moonlight' : 'sunshine') : preference;
          document.documentElement.dataset.theme = resolved;
          document.documentElement.dataset.themePreference = preference;
        };
        document.querySelector('fieldset').addEventListener('change', event => apply(event.target.value));
        apply('system');
      `);

    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'moonlight');
    await expect(page.getByRole('radio', { name: 'System' })).toBeChecked();
    // Users activate the visible label; the radio itself is intentionally clipped.
    await page.getByText('Light', { exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'sunshine');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'sunshine');
    await expect(page.getByRole('radio', { name: 'Light' })).toBeChecked();
  });
});
