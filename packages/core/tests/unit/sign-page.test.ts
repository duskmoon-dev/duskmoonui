import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('Sign Page Layout', () => {
  let css: string;

  beforeAll(async () => {
    css = await readFile(
      resolve(import.meta.dir, '../../src/components/sign-page.css'),
      'utf-8',
    );
  });

  it('defines a named inline-size container', () => {
    expect(css).toMatch(
      /\.sign-page\s*\{[^}]*container-type:\s*inline-size[^}]*container-name:\s*sign-page/s,
    );
  });

  it('fills the available container width', () => {
    expect(css).toMatch(/\.sign-page\s*\{[^}]*width:\s*100%/s);
  });

  it('keeps the narrow frame on one content track', () => {
    expect(css).toMatch(
      /\.sign-page-frame\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
    );
  });

  it('adapts the child frame in a named container query', () => {
    expect(css).toMatch(
      /@container\s+sign-page\s*\(min-width:\s*48rem\)\s*\{[\s\S]*?\.sign-page-frame\s*\{[^}]*grid-template-columns:\s*[^;}]+\s+[^;}]+;/s,
    );
  });

});
