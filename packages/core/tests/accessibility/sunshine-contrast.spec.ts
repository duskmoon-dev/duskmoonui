import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { generatePluginCSS } from '../../src/index';

const roles = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
];
const surfaces = [
  'surface',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'surface-variant',
];

async function render(
  page: Page,
  theme: string | null,
  backgrounds = surfaces,
) {
  await page.goto('/tests/fixtures/test-fixture.html');
  await page.evaluate(
    ({ theme, backgrounds, roles }) => {
      if (theme) document.documentElement.dataset.theme = theme;
      else delete document.documentElement.dataset.theme;
      document.body.replaceChildren();
      const style = document.createElement('style');
      style.textContent =
        '* { transition: none !important; animation: none !important; }';
      document.head.append(style);
      for (const background of backgrounds) {
        const section = document.createElement('section');
        section.style.cssText = `background:var(--color-${background});color:var(--color-on-surface);padding:16px;display:grid;gap:12px`;
        const add = (name: string, role: string, html: string) => {
          const wrapper = document.createElement('div');
          wrapper.dataset.case = `${background}/${role}/${name}`;
          wrapper.innerHTML = html;
          section.append(wrapper);
        };
        for (const role of roles) {
          for (const variant of [
            '',
            'btn-outline',
            'btn-outlined',
            'btn-text',
            'btn-ghost',
            'btn-tonal',
          ]) {
            add(
              `button-${variant || 'filled'}`,
              role,
              `<button data-measure class="btn btn-${role} ${variant}">Action</button>`,
            );
          }
          for (const variant of [
            '',
            'badge-outline',
            'badge-outlined',
            'badge-tonal',
          ]) {
            add(
              `badge-${variant || 'filled'}`,
              role,
              `<span data-measure class="badge badge-${role} ${variant}">Status</span>`,
            );
          }
          for (const variant of [
            'alert-filled',
            'alert-outlined',
            'alert-ghost',
          ]) {
            add(
              variant,
              role,
              `<div data-measure class="alert alert-${role} ${variant}">Notification</div>`,
            );
            add(
              `${variant}-description`,
              role,
              `<div class="alert alert-${role} ${variant}"><p data-measure class="alert-description">Description</p></div>`,
            );
          }
          for (const variant of [
            '',
            'chip-outlined',
            'chip-ghost',
            'chip-tonal',
          ]) {
            add(
              variant,
              role,
              `<button data-measure class="chip chip-${role} ${variant}">Label</button>`,
            );
          }
          add(
            'input',
            role,
            `<input data-measure aria-label="Value" class="input input-${role}" value="Value">`,
          );
          add(
            'input-filled',
            role,
            `<input data-measure aria-label="Value" class="input input-filled input-${role}" value="Value">`,
          );
          add(
            'textarea',
            role,
            `<textarea data-measure aria-label="Message" class="textarea textarea-${role}">Message</textarea>`,
          );
          add(
            'select',
            role,
            `<select data-measure aria-label="Choice" class="select select-${role}"><option>Choice</option></select>`,
          );
          add(
            'avatar',
            role,
            `<div data-measure class="avatar avatar-${role}">AB</div>`,
          );
          add(
            'toggle-ghost',
            role,
            `<button data-measure class="toggle-btn toggle-btn-ghost toggle-btn-${role}">Toggle</button>`,
          );
          add(
            'autocomplete',
            role,
            `<div class="autocomplete autocomplete-${role}"><input data-measure class="autocomplete-input" value="Value" aria-label="Search"></div>`,
          );
          for (const name of ['multi-select', 'tree-select', 'cascader']) {
            add(
              name,
              role,
              `<div class="${name} ${name}-${role}"><button data-measure class="${name}-trigger">Choice</button></div>`,
            );
          }
          add(
            'otp-field',
            role,
            `<div class="otp-input otp-input-${role}"><input data-measure class="otp-input-field" value="1" aria-label="Digit"></div>`,
          );
          add(
            'otp-code',
            role,
            `<input data-measure class="otp-code otp-code-${role}" value="1234" aria-label="Code">`,
          );
          add(
            'otp-wrapper',
            role,
            `<div class="otp-input otp-input-${role}"><input data-measure class="otp-code" value="1234" aria-label="Code"></div>`,
          );
          add(
            'time-input',
            role,
            `<div class="time-input time-input-${role}"><input data-measure class="time-input-field" value="12:30" aria-label="Time"></div>`,
          );
          add(
            'datepicker',
            role,
            `<div class="datepicker datepicker-${role}"><input data-measure class="datepicker-input" value="2026-10-25" aria-label="Date"></div>`,
          );
          add(
            'file-upload',
            role,
            `<div class="file-upload file-upload-${role}"><button data-measure class="file-upload-dropzone">Upload a file</button></div>`,
          );
          add(
            'collapse',
            role,
            `<div class="collapse collapse-${role}"><button data-measure class="collapse-trigger">Expand</button></div>`,
          );
          for (const variant of ['', 'toast-filled', 'toast-ghost']) {
            add(
              `toast-${variant}`,
              role,
              `<div class="toast toast-open toast-${role} ${variant}"><span data-measure class="toast-icon">!</span><div class="toast-content"><span data-measure class="toast-title">Notice</span><span data-measure class="toast-message">Message</span><button data-measure class="toast-action">Undo</button></div></div>`,
            );
          }
          if (role !== 'accent') {
            add(
              'radial-progress',
              role,
              `<div class="radial-progress radial-progress-${role}" style="--radial-progress-value:50"><span data-measure>50%</span></div>`,
            );
            for (const name of ['kbd', 'countdown']) {
              add(
                name,
                role,
                `<span data-measure class="${name} ${name}-${role}">123</span>`,
              );
            }
            add(
              'stat',
              role,
              `<div class="stats"><div class="stat stat-${role}"><span data-measure class="stat-value">123</span></div></div>`,
            );
            add(
              'carousel',
              role,
              `<div class="carousel carousel-${role}"><div data-measure class="carousel-item">Slide</div></div>`,
            );
            add(
              'diff',
              role,
              `<div class="diff diff-${role}"><div data-measure class="diff-after">After</div></div>`,
            );
            add(
              'chat-composer',
              role,
              `<div class="chat-composer chat-composer-${role}"><span data-measure>Message</span></div>`,
            );
          }
          if (['info', 'success', 'warning', 'error'].includes(role)) {
            add(
              'helper',
              role,
              `<p data-measure class="helper-text helper-text-${role}">Helper</p>`,
            );
            add(
              'validation',
              role,
              `<div class="form-group form-group-${role}"><label data-measure class="form-label">Value</label><input data-measure class="input" value="Value" aria-label="Value"></div>`,
            );
          }
          if (['primary', 'secondary', 'tertiary'].includes(role)) {
            add(
              'link',
              role,
              `<a data-measure href="#" class="link link-${role}">Link</a>`,
            );
            add(
              'tab',
              role,
              `<div class="tabs"><button data-measure class="tab tab-active-${role}">Selected</button></div>`,
            );
            add(
              'tab-pill',
              role,
              `<div class="tabs tabs-pill"><button data-measure class="tab tab-active-${role}">Selected</button></div>`,
            );
            add(
              'tab-tonal',
              role,
              `<div class="tabs tabs-tonal"><button data-measure class="tab tab-active-${role}">Selected</button></div>`,
            );
            add(
              'accordion',
              role,
              `<div class="accordion accordion-${role}"><details open class="accordion-item"><summary data-measure class="accordion-header">Expanded</summary></details></div>`,
            );
            add(
              'stepper',
              role,
              `<div class="stepper stepper-${role}"><div class="stepper-step stepper-step-active"><span data-measure class="stepper-step-label">Current step</span></div></div>`,
            );
            add(
              'breadcrumb',
              role,
              `<div class="breadcrumbs breadcrumbs-${role}"><span data-measure class="breadcrumb-item-active">Current page</span></div>`,
            );
          }
        }
        add(
          'default-link',
          'primary',
          '<a data-measure href="#" class="link">Default link</a>',
        );
        add(
          'markdown-link',
          'primary',
          '<div class="markdown-body"><a data-measure href="#">Markdown link</a></div>',
        );
        add(
          'navbar',
          'primary',
          '<nav class="navbar"><a data-measure href="#" class="navbar-item navbar-item-active">Current page</a></nav>',
        );
        add(
          'invalid-native',
          'error',
          '<input data-measure aria-label="Invalid value" aria-invalid="true" class="input input-primary" value="Value">',
        );
        add(
          'valid-native',
          'success',
          '<input data-measure aria-label="Valid value" class="input validate" required value="Value">',
        );
        add(
          'default-radial-progress',
          'primary',
          '<div class="radial-progress" style="--radial-progress-value:50"><span data-measure>50%</span></div>',
        );
        document.body.append(section);
      }
    },
    { theme, backgrounds, roles },
  );
}

async function failures(page: Page, selector = '[data-measure]') {
  return page.locator(selector).evaluateAll((elements) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const rgba = (color: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data].map((value) => value / 255);
    };
    const over = (front: number[], back: number[]) => {
      const alpha = front[3] + back[3] * (1 - front[3]);
      return [
        ...front
          .slice(0, 3)
          .map((channel, index) =>
            alpha
              ? (channel * front[3] + back[index] * back[3] * (1 - front[3])) /
                alpha
              : 0,
          ),
        alpha,
      ];
    };
    const luminance = (rgb: number[]) =>
      rgb
        .slice(0, 3)
        .reduce(
          (sum, channel, index) =>
            sum +
            [0.2126, 0.7152, 0.0722][index] *
              (channel <= 0.04045
                ? channel / 12.92
                : ((channel + 0.055) / 1.055) ** 2.4),
          0,
        );
    return elements.flatMap((element) => {
      let foreground = rgba(getComputedStyle(element).color);
      let background = [0, 0, 0, 0];
      for (
        let ancestor: Element | null = element;
        ancestor;
        ancestor = ancestor.parentElement
      ) {
        const style = getComputedStyle(ancestor);
        // Text has flat backgrounds. Select's SVG and OTP's 3px underlines
        // sit outside the glyphs; radial labels sit over the opaque center.
        let layer = rgba(style.backgroundColor);
        if (ancestor.classList.contains('radial-progress')) {
          layer = rgba(getComputedStyle(ancestor, '::before').backgroundColor);
        } else if (
          style.backgroundImage !== 'none' &&
          !(
            style.backgroundRepeat === 'no-repeat' &&
            (ancestor.tagName === 'SELECT' ||
              (ancestor.classList.contains('otp-code') &&
                style.backgroundSize.endsWith(' 3px')))
          )
        ) {
          throw new Error(`Unsupported background: ${style.backgroundImage}`);
        }
        foreground = over(foreground, layer);
        background = over(background, layer);
        const brightness = style.filter.match(/^brightness\(([\d.]+)\)$/);
        if (style.filter !== 'none' && !brightness)
          throw new Error(`Unsupported filter: ${style.filter}`);
        for (const pixel of [foreground, background]) {
          pixel[3] *= Number(style.opacity);
          if (brightness)
            for (let i = 0; i < 3; i++)
              pixel[i] = Math.min(1, pixel[i] * Number(brightness[1]));
        }
      }
      foreground = over(foreground, [1, 1, 1, 1]);
      background = over(background, [1, 1, 1, 1]);
      const a = luminance(foreground),
        b = luminance(background);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      return ratio >= 4.5
        ? []
        : [
            {
              context: element
                .closest('[data-case]')
                ?.getAttribute('data-case'),
              ratio,
              color: getComputedStyle(element).color,
              background,
            },
          ];
    });
  });
}

test.describe('Surface foreground contrast (design#1)', () => {
  test.use({ colorScheme: 'light' });

  for (const theme of ['sunshine', null]) {
    test(`${theme ?? 'default Sunshine'}: text and filled labels meet AA across all light surfaces`, async ({
      page,
    }) => {
      await render(page, theme);
      expect(await failures(page)).toEqual([]);
    });
  }

  for (const theme of ['sunshine', 'moonlight', 'forest', 'ocean']) {
    test(`${theme}: surface foreground tokens${theme === 'sunshine' ? ' and filled pairs' : ''} meet AA`, async ({
      page,
    }) => {
      await render(page, theme, []);
      await page.evaluate(
        ({ roles, surfaces, theme }) => {
          for (const role of roles) {
            for (const surface of surfaces) {
              const swatch = document.createElement('div');
              swatch.dataset.case = `${surface}/${role}/tokens`;
              const ink =
                role === 'accent'
                  ? 'light-dark(var(--color-accent-content), var(--color-accent))'
                  : `var(--color-on-${role}-container)`;
              swatch.style.cssText = `background:var(--color-${surface});color:${ink}`;
              swatch.innerHTML = '<span data-measure>Foreground</span>';
              document.body.append(swatch);
            }
            // design#1 concerns Sunshine fills. Other themes' fill palettes are
            // independently owned by design; this fix only changes surface ink.
            // TODO(upstream): duskmoon-dev/design#3 — enable the other filled pairs after the token fix.
            if (theme === 'sunshine') {
              const swatch = document.createElement('div');
              swatch.dataset.case = `filled/${role}/tokens`;
              swatch.style.cssText = `background:var(--color-${role});color:var(--color-${role}-content)`;
              swatch.innerHTML = '<span data-measure>Filled</span>';
              document.body.append(swatch);
            }
          }
        },
        { roles, surfaces, theme },
      );
      expect(await failures(page)).toEqual([]);
    });
  }

  test('legacy component API keeps unfilled labels and semantic text readable', async ({
    page,
  }) => {
    await render(page, 'sunshine', []);
    await page
      .locator('link[rel="stylesheet"]')
      .evaluateAll((links) => links.forEach((link) => link.remove()));
    await page.addStyleTag({
      content: readFileSync(
        new URL('../../dist/themes/generated/sunshine.css', import.meta.url),
        'utf8',
      ),
    });
    await page.addStyleTag({
      content: generatePluginCSS({
        base: false,
        components: ['button', 'badge', 'chip', 'avatar', 'alert'],
      }),
    });
    await page.evaluate(() => {
      document.body.style.background = 'var(--color-surface)';
      for (const role of ['primary', 'secondary', 'tertiary']) {
        const suffix = role === 'primary' ? '' : `-${role}`;
        for (const name of ['btn-outlined', 'btn-text', 'badge-outlined']) {
          const element = document.createElement('span');
          element.dataset.case = `legacy/${role}/${name}`;
          element.setAttribute('data-measure', '');
          element.className = `${name.startsWith('btn') ? 'btn' : 'badge'} ${name}${suffix}`;
          element.textContent = 'Action';
          document.body.append(element);
        }
      }
      for (const role of ['info', 'success', 'warning', 'error']) {
        for (const name of ['chip', 'avatar']) {
          const element = document.createElement('span');
          element.dataset.case = `legacy/${role}/${name}`;
          element.setAttribute('data-measure', '');
          element.className = `${name} ${name}-${role}`;
          element.textContent = 'AB';
          document.body.append(element);
        }
        const alert = document.createElement('div');
        alert.dataset.case = `legacy/${role}/alert`;
        alert.className = `alert alert-tonal alert-${role}`;
        alert.innerHTML =
          '<span data-measure class="alert-title">Notice</span>';
        document.body.append(alert);
      }
    });
    expect(await failures(page)).toEqual([]);
  });

  test('links and unfilled buttons retain contrast through hover, focus and active states', async ({
    page,
  }) => {
    await render(page, 'sunshine', ['surface']);
    for (const role of roles) {
      for (const name of [
        'link',
        'button-filled',
        'button-btn-outline',
        'button-btn-text',
        'button-btn-ghost',
        'button-btn-tonal',
        'chip-outlined',
        'chip-ghost',
        '',
      ]) {
        if (
          !['primary', 'secondary', 'tertiary'].includes(role) &&
          name === 'link'
        )
          continue;
        const selector = `[data-case="surface/${role}/${name}"] [data-measure]`;
        const element = page.locator(selector);
        await element.hover();
        expect(
          await failures(page, selector),
          `${role}/${name}: hover`,
        ).toEqual([]);
        await element.focus();
        expect(
          await failures(page, selector),
          `${role}/${name}: focus`,
        ).toEqual([]);
        await page.mouse.down();
        try {
          expect(
            await failures(page, selector),
            `${role}/${name}: active`,
          ).toEqual([]);
        } finally {
          await page.mouse.up();
        }
      }
    }
  });

  for (const theme of ['moonlight', 'forest', 'ocean']) {
    test(`${theme}: unfilled brand controls remain readable`, async ({
      page,
    }) => {
      await render(page, theme, ['surface']);
      const selector =
        '[data-measure]:is(.link, .btn-outline, .btn-outlined, .btn-text, .btn-ghost, .badge-outline, .badge-outlined, .alert-outlined, .alert-ghost, .chip-outlined, .chip-ghost, .input, .textarea, .select, .toggle-btn-ghost, .kbd, .countdown, .stat-value), .tabs:not(.tabs-pill):not(.tabs-tonal) > [data-measure]';
      expect(await failures(page, selector)).toEqual([]);
    });
  }
});
