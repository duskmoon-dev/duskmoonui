import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Home Page Layout', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(import.meta.dir, '../../src/components/home-page.css'),
      'utf-8',
    );
  });

  it('defines a named inline-size container', () => {
    expect(css).toMatch(
      /\.home-page\s*\{[^}]*container-type:\s*inline-size[^}]*container-name:\s*home-page/s,
    );
  });

  it('fills the available container width', () => {
    expect(css).toMatch(/\.home-page\s*\{[^}]*width:\s*100%/s);
  });

  it('shows the menu trigger and hides the full navigation by default', () => {
    expect(css).toMatch(
      /\.home-page-menu-trigger\s*\{[^}]*display:\s*(?:inline-)?flex/s,
    );
    expect(css).toMatch(/\.home-page-nav\s*\{[^}]*display:\s*none/s);
  });

  it('switches from the menu trigger to full navigation in a wide container', () => {
    expect(css).toMatch(
      /@container\s+home-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.home-page-nav\s*\{[^}]*display:\s*flex[^}]*\}[\s\S]*?\.home-page-menu-trigger\s*\{[^}]*display:\s*none/s,
    );
    expect(css).toMatch(
      /@container\s+home-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.home-page-mobile-menu\s*\{[^}]*display:\s*none/s,
    );
  });

});
