import { parse } from 'vue-docgen-api'
import fs from 'fs-extra'
import glob from 'glob';
import _ from 'lodash-es'

const componentFiles = glob.sync("./src/components/*/*.vue");
const iconFiles = glob.sync("./src/components/icon/comps/*.vue");
const componentObj = {};
const iconComponentsObj = {};

console.log("Building docgen file...");

await Promise.all(componentFiles.map(async (filePath) => {
  await createDocgenObj(filePath, componentObj);
}));

await Promise.all(iconFiles.map(async (filePath) => {
  await createDocgenObj(filePath, iconComponentsObj);
}))

async function createDocgenObj(filePath, docgenObj) {
  let parsedComponentFile = await parse(filePath);
  docgenObj[parsedComponentFile.displayName] = parsedComponentFile;

  _.forIn(docgenObj, (component) => {
      component.props?.forEach((prop) => {
        if (_.has(prop, 'defaultValue.value')) {
          if (prop.defaultValue.value === 'false') {
            prop.defaultValue.value = false;
          }
          if (prop.defaultValue.value === 'true') {
            prop.defaultValue.value = true;
          }
          if (prop.defaultValue.value === '[]') {
            prop.defaultValue.value = [];
          }
            prop.defaultValue.value = trimApostrophes(prop.defaultValue.value);
          }
      });
  });
}

function trimApostrophes(str) {
  if (str && str[0] === "'" && str[-1] === "'") {
    return str.slice(1, -1);
  }
  return str;
}
//Move to dist folder
fs.writeJsonSync('./dist/component-docgen.json', componentObj, { spaces: 2 });
fs.writeJsonSync('./dist/icon-component-docgen.json', iconComponentsObj, { spaces: 2 });

console.log("Docgen built");