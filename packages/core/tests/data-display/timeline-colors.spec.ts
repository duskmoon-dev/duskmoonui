import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const variants = [
  ['accent', 'accent', 'accent-content'],
  ['neutral', 'neutral', 'neutral-content'],
  ['base', 'base-300', 'base-content'],
] as const;

for (const theme of ['sunshine', 'moonlight', 'ocean', 'forest']) {
  for (const asset of ['index.css', 'components/timeline.css']) {
    test(`${theme}: ${asset} colors semantic markers, icons, and dots`, async ({ page }) => {
      const css = readFileSync(new URL(`../../dist/${asset}`, import.meta.url), 'utf8');
      const tokens = readFileSync(new URL(`../../dist/themes/generated/${theme}.css`, import.meta.url), 'utf8');
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      const markup = variants.map(([role, background, content]) => `
        <div class="timeline-item">
          <span id="${role}" class="timeline-marker timeline-marker-${role}">
            <span class="timeline-marker-icon">✓</span>
            <span class="timeline-marker-dot"></span>
          </span>
          <span id="${role}-icon" class="timeline-marker timeline-marker-icon timeline-marker-${role}">★</span>
          <span id="${role}-background" style="background-color:var(--color-${background})"></span>
          <span id="${role}-content" style="color:var(--color-${content})"></span>
          <div class="timeline-content"><h2 class="timeline-title">${role} event</h2></div>
        </div>`).join('');
      await page.setContent(`<html lang="en" data-theme="${theme}"><head><title>Timeline colors</title><style>${css}\n${tokens}</style></head><body><main><div class="timeline">${markup}</div></main></body></html>`);

      for (const [role] of variants) {
        const colors = await page.evaluate(role => {
          const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
          const marker = style(`#${role}`);
          return {
            background: marker.backgroundColor,
            border: marker.borderTopColor,
            content: marker.color,
            nestedIcon: style(`#${role} .timeline-marker-icon`).color,
            dot: style(`#${role} .timeline-marker-dot`).backgroundColor,
            iconBackground: style(`#${role}-icon`).backgroundColor,
            iconContent: style(`#${role}-icon`).color,
            expectedBackground: style(`#${role}-background`).backgroundColor,
            expectedContent: style(`#${role}-content`).color,
          };
        }, role);
        expect(colors.background).not.toBe('rgba(0, 0, 0, 0)');
        expect(colors.content).not.toBe(colors.background);
        expect(colors.background).toBe(colors.expectedBackground);
        expect(colors.border).toBe(colors.expectedBackground);
        expect(colors.content).toBe(colors.expectedContent);
        expect(colors.nestedIcon).toBe(colors.expectedContent);
        expect(colors.dot).toBe(colors.expectedContent);
        expect(colors.iconBackground).toBe(colors.expectedBackground);
        expect(colors.iconContent).toBe(colors.expectedContent);
      }
      expect(errors).toEqual([]);
    });
  }
}
