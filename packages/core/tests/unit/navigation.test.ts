import { beforeAll, describe, expect, it } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const coreRoot = join(import.meta.dir, '../..');
const navigationComponents = [
  'navbar', 'menu', 'breadcrumbs', 'pagination', 'tabs', 'link', 'megamenu',
] as const;

describe('Navigation compatibility aggregate', () => {
  let source: string;
  let aggregate: string;
  let componentsAggregate: string;
  let main: string;
  let packageJson: { exports: Record<string, Record<string, string>> };

  beforeAll(async () => {
    [source, aggregate, componentsAggregate, main, packageJson] = await Promise.all([
      readFile(join(coreRoot, 'src/components/navigation.css'), 'utf8'),
      readFile(join(coreRoot, 'dist/components/navigation.css'), 'utf8'),
      readFile(join(coreRoot, 'dist/components/index.css'), 'utf8'),
      readFile(join(coreRoot, 'dist/index.css'), 'utf8'),
      readFile(join(coreRoot, 'package.json'), 'utf8').then(JSON.parse),
    ]);
  });

  it('keeps component-specific files canonical and preserves historical dropdown coverage', () => {
    expect(source).toContain('@import "./dropdown.css"');
    for (const component of navigationComponents) {
      expect(source).toContain(`@import "./${component}.css"`);
    }
  });

  it('resolves local imports in the built CSS aggregate', () => {
    expect(aggregate).not.toMatch(/@import\s+["'].\/[^"']+\.css["']/);
    for (const selector of ['.navbar', '.menu', '.breadcrumbs', '.pagination', '.tabs', '.link', '.megamenu']) {
      expect(aggregate).toContain(selector);
      expect(componentsAggregate).toContain(selector);
      expect(main).toContain(selector);
    }
  });

  it('publishes explicit CSS and constructable stylesheet exports', async () => {
    for (const component of navigationComponents) {
      const entry = packageJson.exports[`./components/${component}`];
      expect(entry.style).toBe(`./dist/components/${component}.css`);
      expect(entry.import).toBe(`./dist/esm/components/${component}.js`);
      expect(entry.default).toBe(entry.import);
      expect(entry.types).toBe(`./dist/esm/components/${component}.d.ts`);

      const [css, module] = await Promise.all([
        readFile(join(coreRoot, entry.style), 'utf8'),
        import(`../../dist/esm/components/${component}.js`),
      ]);
      expect(css.length).toBeGreaterThan(100);
      expect(module.css).toBe(css);
      expect(module.css).not.toMatch(/@import\s+["'].\/[^"']+\.css["']/);
    }
  });

  it('keeps native popover dropdown rules in the compatibility aggregate', () => {
    expect(aggregate).toContain(':popover-open');
    expect(aggregate).toContain('position-anchor');
    expect(aggregate).toContain('prefers-reduced-motion');
  });
});

describe('Semantic and legacy navigation states', () => {
  it('supports current-page state alongside bottom navigation legacy active state', async () => {
    const css = await readFile(join(coreRoot, 'src/components/bottom-navigation.css'), 'utf8');
    expect(css).toContain('.bottom-nav-item.active');
    expect(css).toContain('[aria-current="page"]');
    expect(css).toContain(':focus-visible');
  });

  it('supports current-step state alongside stepper legacy active state', async () => {
    const css = await readFile(join(coreRoot, 'src/components/stepper.css'), 'utf8');
    expect(css).toContain('.stepper-step-active');
    expect(css).toContain('[aria-current="step"]');
  });

  it('supports semantic current-page pagination state', async () => {
    const css = await readFile(join(coreRoot, 'src/components/pagination.css'), 'utf8');
    expect(css).toContain('.pagination-item-active');
    expect(css).toContain('[aria-current="page"]');
  });
});
