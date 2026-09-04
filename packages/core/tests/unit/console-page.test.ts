import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Console Page Layout', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(import.meta.dir, '../../src/components/console-page.css'),
      'utf-8',
    );
  });

  it('defines a named inline-size container', () => {
    expect(css).toMatch(
      /\.console-page\s*\{[^}]*container-type:\s*inline-size[^}]*container-name:\s*console-page/s,
    );
  });

  it('fills the available container width', () => {
    expect(css).toMatch(/\.console-page\s*\{[^}]*width:\s*100%/s);
  });

  it('uses a content-only track in the narrow default frame', () => {
    expect(css).toMatch(
      /\.console-page-frame\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
    );
  });

  it('defaults to a mobile trigger with the persistent sidebar hidden', () => {
    expect(css).toMatch(
      /\.console-page-menu-trigger\s*\{[^}]*display:\s*(?:inline-)?flex/s,
    );
    expect(css).toMatch(
      /\.console-page-sidebar\s*\{[^}]*display:\s*none/s,
    );
    expect(css).toMatch(
      /\.console-page-sidebar-toggle\s*\{[^}]*display:\s*none/s,
    );
    expect(css).toContain('.console-page-mobile-menu');
  });

  it('uses the expanded sidebar track in a wide container', () => {
    expect(css).toMatch(
      /@container\s+console-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.console-page-frame\s*\{[^}]*grid-template-columns:\s*var\(--console-page-sidebar-width\)\s+minmax\(0,\s*1fr\)/s,
    );
  });

  it('uses the compact sidebar track and hides its text labels', () => {
    expect(css).toMatch(
      /\.console-page-sidebar-compact[^,{]*\.console-page-frame\s*\{[^}]*grid-template-columns:\s*var\(--console-page-sidebar-compact-width\)\s+minmax\(0,\s*1fr\)/s,
    );
    expect(css).toMatch(
      /\.console-page-sidebar-compact[^,{]*\.console-page-nav-label\s*\{[^}]*position:\s*absolute[^}]*clip:\s*rect\(0,\s*0,\s*0,\s*0\)/s,
    );
  });

  it('centers drawer items in the compact icon rail', () => {
    expect(css).toMatch(
      /\.console-page-sidebar-compact[^,{]*\.console-page-sidebar-body\s+\.drawer-item\s*\{[^}]*justify-content:\s*center/s,
    );
  });

  it('removes the sidebar track and sidebar in the hidden state', () => {
    expect(css).toMatch(
      /\.console-page-sidebar-hidden[^,{]*\.console-page-frame\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
    );
    expect(css).toMatch(
      /\.console-page-sidebar-hidden[^,{]*\.console-page-sidebar\s*\{[^}]*display:\s*none/s,
    );
  });

  it('shows the persistent sidebar and hides the mobile trigger in a wide container', () => {
    expect(css).toMatch(
      /@container\s+console-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.console-page-sidebar\s*\{[^}]*display:\s*(?:block|flex|grid)[^}]*\}[\s\S]*?\.console-page-sidebar-toggle\s*\{[^}]*display:\s*(?:inline-)?flex[^}]*\}[\s\S]*?\.console-page-menu-trigger\s*\{[^}]*display:\s*none/s,
    );
    expect(css).toMatch(
      /@container\s+console-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.console-page-mobile-menu\s*\{[^}]*display:\s*none/s,
    );
  });

  it('disables sidebar and frame transitions when reduced motion is requested', () => {
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.console-page-frame[^}]*transition:\s*none/s,
    );
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.console-page-sidebar[^}]*transition:\s*none/s,
    );
  });
});
