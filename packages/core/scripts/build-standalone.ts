import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import postcss from 'postcss';
import { objectify } from 'postcss-js';
import selectorParser from 'postcss-selector-parser';

const CORE_DIR = join(import.meta.dir, '..');
const CSS_ART_DIR = join(CORE_DIR, '..', 'css-art');
const SRC_DIR = join(CORE_DIR, 'src');
const DEFAULT_OUTPUT_DIR = join(CORE_DIR, 'dist', 'standalone');

type CssObject = Record<string, any>;

interface StandaloneBundle {
  format: 'esm' | 'cjs';
  name: string;
}

interface StandalonePluginStyles {
  base: CssObject;
  components: CssObject;
  utilities: CssObject;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
}

const bundles: StandaloneBundle[] = [
  { format: 'esm', name: 'duskmoonui.mjs' },
  { format: 'cjs', name: 'duskmoonui.js' },
];

const expectedFunctionalUtilities = new Set(['grid-cols-auto-fill-*', 'grid-cols-auto-fit-*']);
const componentLayers = new Set(['@layer components', '@layer css-art']);
const unsupportedTailwindDirectives = new Set([
  'apply',
  'config',
  'custom-variant',
  'plugin',
  'reference',
  'source',
  'variant',
]);

async function readAndInlineCss(filePath: string, visited = new Set<string>()): Promise<string> {
  const absolutePath = resolve(filePath);

  if (visited.has(absolutePath)) {
    return '';
  }
  visited.add(absolutePath);

  const content = await readFile(absolutePath, 'utf8');
  const imports = [...content.matchAll(/^\s*@import\s+["']([^"']+)["']\s*;?/gm)];
  let inlined = content;

  for (const match of imports) {
    const importedCss = await readAndInlineCss(join(dirname(absolutePath), match[1]), visited);
    inlined = inlined.replace(match[0], importedCss);
  }

  return inlined;
}

function appendRule(styles: CssObject, selector: string, rule: unknown): void {
  const currentRule = styles[selector];

  if (currentRule === undefined) {
    styles[selector] = rule;
    return;
  }

  styles[selector] = Array.isArray(currentRule) ? [...currentRule, rule] : [currentRule, rule];
}

function wrapWithAtRules(rule: unknown, atRules: string[]): unknown {
  return atRules.reduceRight<unknown>(
    (wrappedRule, atRule) => ({
      [atRule]: wrappedRule,
    }),
    rule,
  );
}

function moveLayerRules(styles: CssObject, layerValue: unknown, atRules: string[]): void {
  const layerBlocks = Array.isArray(layerValue) ? layerValue : [layerValue];

  for (const layerBlock of layerBlocks) {
    if (!layerBlock || typeof layerBlock !== 'object') {
      continue;
    }

    for (const [key, value] of Object.entries(layerBlock)) {
      if (key.startsWith('@keyframes ')) {
        appendRule(styles, key, value);
        continue;
      }

      if (key.startsWith('@')) {
        moveLayerRules(styles, value, [...atRules, key]);
        continue;
      }

      appendRule(styles, key, wrapWithAtRules(value, atRules));
    }
  }
}

function nestCssLayers(layer: string, value: unknown): CssObject {
  const nestedStyles: CssObject = {};
  moveLayerRules(nestedStyles, value, [layer]);
  return nestedStyles;
}

function splitSelectorBranches(selector: string): {
  classSelectors: string[];
  baseSelectors: string[];
} {
  const classSelectors: string[] = [];
  const baseSelectors: string[] = [];

  try {
    selectorParser((root) => {
      root.each((selectorNode) => {
        let hasClass = false;
        selectorNode.walkClasses(() => {
          hasClass = true;
        });

        (hasClass ? classSelectors : baseSelectors).push(selectorNode.toString());
      });
    }).processSync(selector);
  } catch {
    baseSelectors.push(selector);
  }

  return { classSelectors, baseSelectors };
}

function partitionCandidateStyles(
  styles: CssObject,
  candidateStyles: CssObject,
  baseStyles: CssObject,
): void {
  for (const [selector, rule] of Object.entries(styles)) {
    if (selector.startsWith('@keyframes ')) {
      appendRule(candidateStyles, selector, rule);
      continue;
    }

    if (selector.startsWith('@')) {
      appendRule(baseStyles, selector, rule);
      continue;
    }

    const { classSelectors, baseSelectors } = splitSelectorBranches(selector);

    if (classSelectors.length > 0) {
      appendRule(candidateStyles, classSelectors.join(', '), rule);
    }
    if (baseSelectors.length > 0) {
      appendRule(baseStyles, baseSelectors.join(', '), rule);
    }
  }
}

function createStandalonePluginStyles(css: string): StandalonePluginStyles {
  const root = postcss.parse(css);
  const themeDefaults: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};
  const boxShadow: Record<string, string> = {};
  const functionalUtilities = new Set<string>();

  root.walkAtRules((atRule) => {
    if (unsupportedTailwindDirectives.has(atRule.name)) {
      throw new Error(`Standalone plugin must explicitly implement @${atRule.name}`);
    }

    if (atRule.name === 'theme') {
      atRule.walkDecls((declaration) => {
        if (declaration.prop.startsWith('--radius-')) {
          borderRadius[declaration.prop.slice('--radius-'.length)] = `var(${declaration.prop})`;
        }
        if (declaration.prop.startsWith('--shadow-')) {
          boxShadow[declaration.prop.slice('--shadow-'.length)] = `var(${declaration.prop})`;
        }
        if (declaration.value !== 'initial') {
          themeDefaults[declaration.prop] = declaration.value;
        }
      });
      atRule.remove();
      return;
    }

    if (atRule.name === 'utility') {
      functionalUtilities.add(atRule.params.trim());
      atRule.remove();
    }
  });

  if (
    functionalUtilities.size !== expectedFunctionalUtilities.size ||
    [...functionalUtilities].some((name) => !expectedFunctionalUtilities.has(name))
  ) {
    throw new Error(
      `Standalone plugin must explicitly implement every @utility directive. Found: ${[
        ...functionalUtilities,
      ].join(', ')}`,
    );
  }

  const browserStyles = objectify(root) as CssObject;
  const base: CssObject = {};
  const components: CssObject = {};
  const utilities: CssObject = {};

  for (const [selector, rule] of Object.entries(browserStyles)) {
    if (componentLayers.has(selector)) {
      partitionCandidateStyles(nestCssLayers(selector, rule), components, base);
      continue;
    }

    if (selector === '@layer utilities') {
      partitionCandidateStyles(nestCssLayers(selector, rule), utilities, base);
      continue;
    }

    if (selector === '.sr-only' || selector === '.not-sr-only') {
      appendRule(utilities, selector, rule);
      continue;
    }

    if (selector.startsWith('@layer ')) {
      throw new Error(`Unsupported standalone CSS layer: ${selector}`);
    }

    appendRule(base, selector, rule);
  }

  if (Object.keys(themeDefaults).length > 0) {
    appendRule(base, ':root', themeDefaults);
  }

  return { base, components, utilities, borderRadius, boxShadow };
}

function generateStandaloneEntrypoint(styles: StandalonePluginStyles): string {
  const pluginSource = JSON.stringify(join(SRC_DIR, 'tailwind-plugin.ts'));

  return `import basePlugin from ${pluginSource};

const baseStyles = ${JSON.stringify(styles.base)};
const componentStyles = ${JSON.stringify(styles.components)};
const utilityStyles = ${JSON.stringify(styles.utilities)};

const baseConfig = basePlugin.config ?? {};
const baseTheme = baseConfig.theme ?? {};
const baseExtend = baseTheme.extend ?? {};

const duskmoonPlugin = {
  handler(api) {
    basePlugin.handler(api);
    api.addBase(baseStyles);
    api.addComponents(componentStyles);
    api.addUtilities(utilityStyles);
  },
  config: {
    ...baseConfig,
    theme: {
      ...baseTheme,
      extend: {
        ...baseExtend,
        borderRadius: {
          ...(baseExtend.borderRadius ?? {}),
          ...${JSON.stringify(styles.borderRadius)},
        },
        boxShadow: {
          ...(baseExtend.boxShadow ?? {}),
          ...${JSON.stringify(styles.boxShadow)},
        },
      },
    },
  },
};

export default duskmoonPlugin;
export { duskmoonPlugin };
`;
}

export async function buildStandaloneBundles(outputDir = DEFAULT_OUTPUT_DIR): Promise<void> {
  const [corePackageJson, cssArtPackageJson, coreCss, cssArtCss, themesCss] = await Promise.all([
    readFile(join(CORE_DIR, 'package.json'), 'utf8').then(
      (content) => JSON.parse(content) as { version: string },
    ),
    readFile(join(CSS_ART_DIR, 'package.json'), 'utf8').then(
      (content) => JSON.parse(content) as { version: string },
    ),
    readAndInlineCss(join(SRC_DIR, 'index.css')),
    readAndInlineCss(join(CSS_ART_DIR, 'src', 'index.css')),
    readAndInlineCss(join(SRC_DIR, 'themes', 'index.css')),
  ]);
  const banner = `/**\n * @duskmoon-dev/core v${corePackageJson.version}\n * @duskmoon-dev/css-art v${cssArtPackageJson.version}\n * Standalone Tailwind CSS v4 plugin bundle\n * https://github.com/duskmoon-dev/duskmoonui\n * @license MIT\n */`;

  await mkdir(outputDir, { recursive: true });

  const generatedEntrypoint = join(outputDir, '.standalone-entry.ts');
  const styles = createStandalonePluginStyles(`${coreCss}\n${cssArtCss}`);
  await writeFile(generatedEntrypoint, generateStandaloneEntrypoint(styles));

  try {
    for (const bundle of bundles) {
      const result = await Bun.build({
        entrypoints: [generatedEntrypoint],
        outdir: outputDir,
        naming: bundle.name,
        format: bundle.format,
        target: 'node',
        banner,
      });

      if (!result.success) {
        throw new Error(
          `Failed to build ${bundle.name}: ${result.logs.map((log) => log.message).join('\n')}`,
        );
      }
    }
  } finally {
    await rm(generatedEntrypoint, { force: true });
  }

  const cssBanner = `/**\n * @duskmoon-dev/core v${corePackageJson.version}\n * @duskmoon-dev/css-art v${cssArtPackageJson.version}\n * Complete standalone DuskMoonUI styles\n * https://github.com/duskmoon-dev/duskmoonui\n * @license MIT\n */`;
  const themesBanner = `/**\n * @duskmoon-dev/core v${corePackageJson.version}\n * Built-in DuskMoonUI themes\n * https://github.com/duskmoon-dev/duskmoonui\n * @license MIT\n */`;

  await Promise.all([
    writeFile(join(outputDir, 'duskmoonui.css'), `${cssBanner}\n\n${coreCss}\n\n${cssArtCss}`),
    writeFile(join(outputDir, 'duskmoonui-themes.css'), `${themesBanner}\n\n${themesCss}`),
  ]);
}

if (import.meta.main) {
  await buildStandaloneBundles();
  console.log('✓ Built standalone plugin and themes bundles');
}
