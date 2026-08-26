import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const CORE_DIR = join(import.meta.dir, '..');
const CSS_ART_DIR = join(CORE_DIR, '..', 'css-art');
const SRC_DIR = join(CORE_DIR, 'src');
const DEFAULT_OUTPUT_DIR = join(CORE_DIR, 'dist', 'standalone');

interface StandaloneBundle {
  entrypoint: string;
  format: 'esm' | 'cjs';
  name: string;
}

const bundles: StandaloneBundle[] = [
  { entrypoint: 'tailwind-plugin.ts', format: 'esm', name: 'duskmoonui.mjs' },
  { entrypoint: 'tailwind-plugin.ts', format: 'cjs', name: 'duskmoonui.js' },
];

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

export async function buildStandaloneBundles(outputDir = DEFAULT_OUTPUT_DIR): Promise<void> {
  const [corePackageJson, cssArtPackageJson] = (
    await Promise.all([
      readFile(join(CORE_DIR, 'package.json'), 'utf8'),
      readFile(join(CSS_ART_DIR, 'package.json'), 'utf8'),
    ])
  ).map((content) => JSON.parse(content) as { version: string });
  const banner = `/**\n * @duskmoon-dev/core v${corePackageJson.version}\n * Standalone Tailwind CSS v4 plugin bundle\n * https://github.com/duskmoon-dev/duskmoonui\n * @license MIT\n */`;

  await mkdir(outputDir, { recursive: true });

  for (const bundle of bundles) {
    const result = await Bun.build({
      entrypoints: [join(SRC_DIR, bundle.entrypoint)],
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

  const [coreCss, cssArtCss, themesCss] = await Promise.all([
    readAndInlineCss(join(SRC_DIR, 'index.css')),
    readAndInlineCss(join(CSS_ART_DIR, 'src', 'index.css')),
    readAndInlineCss(join(SRC_DIR, 'themes', 'index.css')),
  ]);
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
