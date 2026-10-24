import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';
import fs from 'fs-extra';
import { globSync } from 'glob';
import { buildButtonCSS, buildButtonDemo } from './component-variables/button';
import contract from '../src/components/button/CdrButton.tokens';
import { buttonLegacyHooks } from './component-tokens/button-legacy-hooks';
import { generateScss } from './generate-component-maps';
import { buildScssBundle } from './component-variables/bundle';
import { standaloneScss } from './component-variables/standalone';
import type { ComponentTokenContract } from './component-tokens/types';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const destination = path.resolve(root, '../rei-cedar-component-variables/dist');
const supported = [
  'CdrButton',
  'CdrCard',
  'CdrChip',
  'CdrBreadcrumb',
  'CdrFormGroup',
  'CdrFormError',
  'CdrGrid',
  'CdrLabelStandalone',
  'CdrLabelWrapper',
  'CdrRadio',
  'CdrCheckbox',
  'CdrLink',
  'CdrInput',
  'CdrSelect',
  'CdrSkeleton',
  'CdrList',
  'CdrTable',
  'CdrCaption',
  'CdrQuote',
];

// Preserve public component override names while semantic values come from contracts.
const legacyHooks: Record<string, Record<string, string>> = {
  CdrLink: Object.fromEntries(
    ['default', 'neutral'].flatMap((variant) =>
      Object.entries({
        text: '--cdr-link-text-color',
        fill: '--cdr-link-fill-color',
        'text-hover': '--cdr-link-text-color-hover',
        'text-focus-visible': '--cdr-link-active-text-color-active',
        'text-active': '--cdr-link-active-text-color-active',
      }).map(([key, hook]) => [`${variant}/${key}`, hook]),
    ),
  ),
};

const { values } = parseArgs({ options: { component: { type: 'string' } } });
if (values.component && !supported.includes(values.component)) {
  throw new Error(`Unsupported component: ${values.component}`);
}

const sources = globSync('src/components/**/styles/vars/*.scss', { cwd: root, absolute: true });
const files = new Map<string, string>();

// Copy local @use/@forward dependencies as well as the public entrypoint.
function collect(source: string) {
  if (files.has(source)) return;
  const content = fs.readFileSync(source, 'utf8');
  files.set(source, content);
  for (const match of content.matchAll(/@(?:use|forward)\s+['"](\.\/[^'"]+)['"]/g)) {
    const dependency = path.resolve(path.dirname(source), match[1]);
    collect(dependency.endsWith('.scss') ? dependency : `${dependency}.scss`);
  }
}

for (const component of values.component ? [values.component] : supported) {
  const name = `${component}.vars.scss`;
  const source = sources.find((file) => path.basename(file) === name);
  if (!source) throw new Error(`Missing source: ${name}`);
  collect(source);
}

// Prepare every source before writing, so missing dependencies/contracts cannot leave a partial transfer.
const prepared = new Map<string, string>();
for (const [source, content] of files) {
  let generated =
    path.basename(source) === 'CdrButton.maps.scss'
      ? generateScss(
          contract,
          path.join(root, 'src/components/button/CdrButton.tokens.ts'),
          buttonLegacyHooks(contract),
        ).trimEnd() + '\n'
      : content;
  const component = path.basename(source).split('.')[0];
  const componentRoot = path.resolve(path.dirname(source), '../..');
  const contractPath = path.join(componentRoot, `${component}.tokens.ts`);
  if (component !== 'CdrButton' && fs.existsSync(contractPath)) {
    const { default: componentContract }: { default: ComponentTokenContract } = require(
      contractPath,
    );
    if (source.endsWith('.maps.scss') && legacyHooks[component]) {
      generated =
        generateScss(componentContract, contractPath, legacyHooks[component]).trimEnd() + '\n';
    }
    generated = standaloneScss(
      generated,
      componentContract,
      fs.readFileSync(path.join(componentRoot, `styles/${component}.module.scss`), 'utf8'),
    );
  }
  prepared.set(
    source,
    generated.replaceAll(
      '@rei/cdr-tokens/scss',
      '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss',
    ),
  );
}
for (const [source, content] of prepared) {
  fs.outputFileSync(path.join(destination, 'scss', path.basename(source)), content);
  console.log(`copied ${path.basename(source)}`);
}

// Existing entrypoints in a scoped build must resolve tokens with plain Dart Sass too.
for (const file of globSync('*.scss', { cwd: path.join(destination, 'scss'), absolute: true })) {
  const content = fs.readFileSync(file, 'utf8');
  // Card is not migrated in a button-only export; preserve v14's removed white fallback.
  const compatible =
    path.basename(file) === 'CdrCard.vars.scss'
      ? content.replace('#{tokens.$cdr-color-background-primary}', '#ffffff')
      : content;
  fs.writeFileSync(
    file,
    compatible.replaceAll(
      "'@rei/cdr-tokens/scss'",
      "'@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss'",
    ),
  );
}

fs.outputFileSync(
  path.join(destination, 'scss/index.scss'),
  supported.map((component) => `@forward './${component}.vars.scss';`).join('\n') + '\n',
);
fs.outputFileSync(
  path.join(destination, 'scss/cedar-component-variables.scss'),
  buildScssBundle(path.join(destination, 'scss'), supported),
);

if (!values.component || values.component === 'CdrButton') {
  fs.outputFileSync(
    path.join(destination, 'css/CdrButton.css'),
    buildButtonCSS(path.join(destination, 'scss/CdrButton.vars.scss')),
  );
  fs.outputFileSync(path.join(destination, 'demo/CdrButton.html'), buildButtonDemo(destination));
}
