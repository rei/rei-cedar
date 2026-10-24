import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';

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

export function buildButtonCSS(
  entry = fileURLToPath(
    new URL('../../src/components/button/styles/vars/CdrButton.vars.scss', import.meta.url),
  ),
): string {
  const source = fileURLToPath(
    new URL('../../src/components/button/styles/CdrButton.module.scss', import.meta.url),
  );
  const module = readFileSync(source, 'utf8')
    .replace(
      "'./vars/CdrButton.maps'",
      `'${path.join(path.dirname(entry), 'CdrButton.maps.scss')}'`,
    )
    .replace("'./vars/CdrButton.vars'", `'${entry}'`);
  const elevated = ['primary', 'secondary', 'dark', 'sale']
    .map(
      (variant) =>
        `.cdr-button--${variant}-elevated { @include button.cdr-button-${variant}-elevated-mixin; }`,
    )
    .join('\n');
  return (
    '/* Generated from the CdrButton contract and shared Sass recipe. */\n' +
    sass.compileString(module, sassOptions).css +
    '\n' +
    sass.compileString(`@use '${entry}' as button; ${elevated}`, sassOptions).css +
    '\n'
  );
}

export interface ButtonExample {
  name: string;
  html: string;
  scss: string[];
}

export function compileButtonExamples(examples: ButtonExample[], entry: string): string {
  return sass.compileString(
    `@use '${entry.replaceAll('\\', '/')}' as *;\n` +
      examples
        .map((example) => `.cdr-button-${example.name} { ${example.scss.join('\n')} }`)
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
export function buildButtonDemo(destination: string): string {
  const { examples } = JSON.parse(
    readFileSync(path.join(destination, '../examples/cdr-button.json'), 'utf8'),
  );
  const styles = compileButtonExamples(
    examples,
    path.join(destination, 'scss/CdrButton.vars.scss'),
  );
  const tokens =
    tokenCSS(require.resolve('@rei/cdr-tokens/css')) +
    tokenCSS(require.resolve('@rei/cdr-tokens/css/color-action'));
  return `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CdrButton component variables</title>
<style>${tokens}\n${styles}
html { font-size: 62.5%; } body { margin: 3.2rem; font: 1.6rem/1.5 sans-serif; color: #312d27; background: #f8f7f2; }
main { display: grid; grid-template-columns: repeat(auto-fit,minmax(28rem,1fr)); gap: 2rem; }
article { padding: 2rem; background: white; border: 1px solid #d7d4ce; border-radius: .8rem; }
h1 { font-size: 3rem; } h2 { font: 600 1.4rem/1.5 monospace; margin: 0 0 1.6rem; }
button { transition: none !important; } .custom-hook { --cdr-color-button-surface: rebeccapurple; }
</style><h1>CdrButton — generated component variables</h1>
<p>Plain HTML and generated Sass mixins. Hover, use Tab, press, and resize to exercise the states.</p>
<main>${examples.map((example: ButtonExample) => `<article data-example="${example.name}"><h2>${example.name}</h2>${example.html}</article>`).join('\n')}
<article data-example="disabled"><h2>disabled</h2><button type="button" class="cdr-button-primary" disabled>Disabled</button></article>
<article data-example="custom-hook"><h2>public hook override</h2><button type="button" class="cdr-button-primary custom-hook">Custom color</button></article>
</main></html>\n`;
}
