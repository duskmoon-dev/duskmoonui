import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { compile } from 'tailwindcss';

const roles = ['', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error', 'accent', 'neutral', 'base'];
const sources: Record<string, string> = {
  bundle: readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8'),
  components: ['chat', 'markdown-body'].map(name => readFileSync(new URL(`../../dist/components/${name}.css`, import.meta.url), 'utf8')).join('\n'),
  standalone: readFileSync(new URL('../../dist/standalone/duskmoonui.css', import.meta.url), 'utf8'),
  plugin: '',
};

test.beforeAll(async () => {
  const plugin = await import('../../dist/standalone/duskmoonui.mjs');
  const compiler = await compile('@plugin "duskmoonui"; @tailwind utilities;', {
    loadModule: async () => ({ module: plugin.default, base: import.meta.dirname }),
  });
  sources.plugin = compiler.build(['chat', 'chat-end', 'chat-bubble', 'chat-bubble-filled', 'markdown-body', ...roles.filter(Boolean).map(role => `chat-bubble-${role}`)]);
});

const markdown = `<div class="markdown-body">
  <p>Readable prose with <a href="#example">a link</a>, <code>inline code</code> and <kbd>Enter</kbd>.</p>
  <blockquote><p>A quotation with <a href="#quote">a link</a>.</p></blockquote>
  <h6>A small heading</h6><p><del>Deleted text</del> <s>Old text</s></p>
  <figure><figcaption>A caption</figcaption></figure>
  <pre><code>console.log("Readable code");</code></pre>
  <table><thead><tr><th>Header <a href="#header">link</a></th></tr></thead>
    <tbody><tr><td>Plain row <a href="#plain">link</a></td></tr>
      <tr><td>Striped row <a href="#striped">link</a></td></tr></tbody></table>
  <mark>Highlighted text</mark>
</div>`;

for (const theme of ['sunshine', 'moonlight', 'ocean', 'forest']) {
  for (const source of Object.keys(sources)) {
    test(`${theme}/${source}: Markdown honors bubble and surface foregrounds`, async ({ page }) => {
      const tokens = readFileSync(new URL(`../../dist/themes/generated/${theme}.css`, import.meta.url), 'utf8');
      const bubbles = roles.flatMap(role => [false, true].map(filled =>
        `<div class="chat chat-end"><div class="chat-bubble ${role ? `chat-bubble-${role}` : ''} ${filled ? 'chat-bubble-filled' : ''}">${markdown}</div></div>`)).join('');
      await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><style>${sources[source]}\n${tokens}</style></head><body>
        <span id="surface" style="color:var(--color-on-surface)"></span>
        <span id="highlight" style="color:var(--color-on-tertiary-container)"></span>
        <div id="outside">${markdown}</div>${bubbles}</body></html>`);

      const result = await page.evaluate(() => {
        const color = (el: Element) => getComputedStyle(el).color;
        const prose = '.markdown-body, .markdown-body > p, .markdown-body > p > a, blockquote, blockquote a, h6, del, s, figcaption, tbody tr:first-child td, tbody tr:first-child a';
        const surface = 'code, pre, kbd, th, th a, tbody tr:nth-child(2) td, tbody tr:nth-child(2) a';
        return {
          surface: color(document.querySelector('#surface')!),
          highlight: color(document.querySelector('#highlight')!),
          outside: color(document.querySelector('#outside .markdown-body')!),
          bubbles: Array.from(document.querySelectorAll('.chat-bubble'), el => ({
            foreground: color(el),
            prose: Array.from(el.querySelectorAll(prose), color),
            surfaces: Array.from(el.querySelectorAll(surface), color),
            highlight: color(el.querySelector('mark')!),
            decoration: getComputedStyle(el.querySelector('a')!).textDecorationLine,
          })),
        };
      });
      expect(result.outside).toBe(result.surface);
      for (const bubble of result.bubbles) {
        for (const color of bubble.prose) expect(color).toBe(bubble.foreground);
        for (const color of bubble.surfaces) expect(color).toBe(result.surface);
        expect(bubble.highlight).toBe(result.highlight);
        expect(bubble.decoration).toContain('underline');
      }
    });
  }
}
