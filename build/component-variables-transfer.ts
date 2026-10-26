import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';
import fs from 'fs-extra';
import { globSync } from 'glob';
import { buildComponentCSS, buildComponentDemo } from './component-variables/component';
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
const recipes = new Map<string, { contract: ComponentTokenContract; source: string }>();
for (const [source, content] of files) {
  let generated = content;
  const component = path.basename(source).split('.')[0];
  const componentRoot = path.resolve(path.dirname(source), '../..');
  const contractPath = path.join(componentRoot, `${component}.tokens.ts`);
  if (fs.existsSync(contractPath)) {
    const { default: componentContract }: { default: ComponentTokenContract } = require(
      contractPath,
    );
    const sharedRecipe = fs.existsSync(
      path.join(componentRoot, `styles/vars/${component}.recipe.scss`),
    );
    if (source.endsWith('.maps.scss') && componentContract.componentVariables?.hooks) {
      generated =
        generateScss(
          componentContract,
          contractPath,
          componentContract.componentVariables.hooks,
        ).trimEnd() + '\n';
    }
    const modulePath = path.join(componentRoot, `styles/${component}.module.scss`);
    if (sharedRecipe && componentContract.recipe === 'pressable') {
      recipes.set(component, { contract: componentContract, source: modulePath });
    } else {
      generated = standaloneScss(generated, componentContract, fs.readFileSync(modulePath, 'utf8'));
    }
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

fs.outputFileSync(
  path.join(destination, 'scss/index.scss'),
  supported.map((component) => `@forward './${component}.vars.scss';`).join('\n') + '\n',
);
fs.outputFileSync(
  path.join(destination, 'scss/cedar-component-variables.scss'),
  buildScssBundle(path.join(destination, 'scss'), supported),
);

for (const [component, { contract, source }] of recipes) {
  fs.outputFileSync(
    path.join(destination, `css/${component}.css`),
    buildComponentCSS(path.join(destination, `scss/${component}.vars.scss`), source, contract),
  );
  fs.outputFileSync(
    path.join(destination, `demo/${component}.html`),
    buildComponentDemo(destination, component, contract),
  );
}
