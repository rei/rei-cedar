import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';
import type { ComponentTokenContract } from '../component-tokens/types';
import { hookVar } from '../component-tokens/naming';

const require = createRequire(import.meta.url);

// Sass alone does not resolve package.json exports; match Vite's token resolution.
export const sassOptions: sass.StringOptions<'sync'> = {
  quietDeps: true,
  loadPaths: [
    fileURLToPath(new URL('../../', import.meta.url)),
    fileURLToPath(new URL('../../node_modules', import.meta.url)),
  ],
  importers: [
    {
      findFileUrl(url) {
        return url === '@rei/cdr-tokens/scss' ? pathToFileURL(require.resolve(url)) : null;
      },
    },
  ],
};

export function elevatedVariants(contract: ComponentTokenContract): string[] {
  return Object.entries(contract.variants)
    .filter(([, value]) => value.rest.surface && value.rest.text && value.rest.border)
    .map(([variant]) => variant);
}

export function buildComponentCSS(
  entry: string,
  source: string,
  contract: ComponentTokenContract,
): string {
  const name = path.basename(entry, '.vars.scss');
  const prefix = contract.component;
  const module = readFileSync(source, 'utf8')
    .replace(`'./vars/${name}.maps'`, `'${path.join(path.dirname(entry), `${name}.maps.scss`)}'`)
    .replace(`'./vars/${name}.vars'`, `'${entry}'`);
  const elevated = elevatedVariants(contract)
    .map(
      (variant) =>
        `.${prefix}--${variant}-elevated { @include component.${prefix}-${variant}-elevated-mixin; }`,
    )
    .join('\n');
  return (
    `/* Generated from the ${name} contract and shared Sass recipe. */\n` +
    sass.compileString(module, sassOptions).css +
    '\n' +
    sass.compileString(`@use '${entry}' as component; ${elevated}`, sassOptions).css +
    '\n'
  );
}

export interface ComponentExample {
  name: string;
  html: string;
  scss: string[];
}

export function compileComponentExamples(
  examples: ComponentExample[],
  entry: string,
  prefix: string,
): string {
  return sass.compileString(
    `@use '${entry.replaceAll('\\', '/')}' as *;\n` +
      examples
        .map((example) => `.${prefix}-${example.name} { ${example.scss.join('\n')} }`)
        .join('\n'),
    sassOptions,
  ).css;
}

function tokenCSS(file: string): string {
  return readFileSync(file, 'utf8').replace(/@import\s+"([^"]+)";/g, (_, dependency: string) =>
    tokenCSS(path.resolve(path.dirname(file), dependency)),
  );
}

/** Offline HTML fixture: generated package mixins and tokens, with no Vue or JavaScript. */
export function buildComponentDemo(
  destination: string,
  name: string,
  contract: ComponentTokenContract,
): string {
  const prefix = contract.component;
  const defaultVariant = contract.defaultVariant ?? Object.keys(contract.variants)[0];
  const surfaceHook = hookVar(prefix, undefined, 'surface', 'rest', contract.hookPrefix);
  const { examples } = JSON.parse(
    readFileSync(path.join(destination, `../examples/${prefix}.json`), 'utf8'),
  );
  const styles = compileComponentExamples(
    examples,
    path.join(destination, `scss/${name}.vars.scss`),
    prefix,
  );
  const tokens =
    tokenCSS(require.resolve('@rei/cdr-tokens/css')) +
    tokenCSS(require.resolve(`@rei/cdr-tokens/css/color-${contract.interaction}`));
  return `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} component variables</title>
<style>${tokens}\n${styles}
html { font-size: 62.5%; } body { margin: 3.2rem; font: 1.6rem/1.5 sans-serif; color: #312d27; background: #f8f7f2; }
main { display: grid; grid-template-columns: repeat(auto-fit,minmax(28rem,1fr)); gap: 2rem; }
article { padding: 2rem; background: white; border: 1px solid #d7d4ce; border-radius: .8rem; }
h1 { font-size: 3rem; } h2 { font: 600 1.4rem/1.5 monospace; margin: 0 0 1.6rem; }
button { transition: none !important; } .custom-hook { ${surfaceHook}: rebeccapurple; }
</style><h1>${name} — generated component variables</h1>
<p>Plain HTML and generated Sass mixins. Hover, use Tab, press, and resize to exercise the states.</p>
<main>${examples.map((example: ComponentExample) => `<article data-example="${example.name}"><h2>${example.name}</h2>${example.html}</article>`).join('\n')}
<article data-example="disabled"><h2>disabled</h2><button type="button" class="${prefix}-${defaultVariant}" disabled>Disabled</button></article>
<article data-example="custom-hook"><h2>public hook override</h2><button type="button" class="${prefix}-${defaultVariant} custom-hook">Custom color</button></article>
</main></html>\n`;
}
