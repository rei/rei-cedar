/* eslint-disable */
const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const _ = require('lodash');
const { JSDOM } = require('jsdom');
const iconData = require('@rei/cedar-icons');

function resolve(dir: string) {
  return path.join(__dirname, '..', dir);
}

// indexArr builds the 'index' index.ts file
const indexArr: string[] = [];

Object.keys(iconData).forEach(function (name) {
  const pascalName = _.upperFirst(_.camelCase(name));
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

})

// output the 'index' file
fs.outputFileSync(
  resolve('index.ts'),
  `// file created by generate.ts
/* eslint-disable */
${indexArr.join('\n')}`,
);
