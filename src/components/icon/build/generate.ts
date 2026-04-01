/* eslint-disable */
// @ts-nocheck
import path from 'path';
import { glob } from 'glob';
import fs from 'fs-extra';
import { upperFirst, camelCase } from 'lodash-es';
import { JSDOM } from 'jsdom';
import iconData from '@rei/cedar-icons';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolve(dir: string) {
  return path.join(__dirname, '..', dir);
}

// indexArr builds the 'index' index.ts file
const indexArr: string[] = [];

Object.keys(iconData).forEach(function (name) {
  const pascalName = upperFirst(camelCase(name));
  const content = iconData[name];
  const outFile = resolve(`comps/${name}.vue`);

  // everything in root svg element
  const fragment = JSDOM.fragment(content).firstChild;

  // Strip the title element from the svg fragment
  fragment.querySelectorAll('title').forEach((el: Node) => {
    el.parentNode?.removeChild(el);
  });
  const { innerHTML } = fragment;

  // create vue component
  const component = `
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: '${pascalName}',
  });
  
  defineProps({
    props: {
      type: Object,
    }
  });
  </script>
  <template>
    <cdr-icon v-bind="props">
      <slot/>
      ${innerHTML.trim()}
    </cdr-icon>
  </template>
  `;

  // write component file
  fs.outputFileSync(`${outFile}`, component);

  // add file to 'index'
  indexArr.push(`export { default as Icon${pascalName} } from './comps/${name}.vue';`);
});

// output the 'index' file
fs.outputFileSync(
  resolve('index.ts'),
  `// file created by generate.ts
${indexArr.join('\n')}
`,
);
