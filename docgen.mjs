import { parse } from 'vue-docgen-api'
import fs from 'fs-extra'
import glob from 'glob';
import _ from 'lodash-es';
import path from 'path';
import scss from 'postcss-scss';
import parseSCSS from './docgen-scss.mjs';

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

const components = Object.keys(componentObj); // Replace with your actual component names

// Helper function to check if file exists
function fileExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
  } catch(err) {
    console.error(err);
  }
  return false;
}

// Helper function to extract property details
function extractPropertyDetails(decl) {
    let doc = null;
    let fallback = null;
    let defaultValue = null;
  
    // Check if next node is a comment with documentation
    const next = decl.next();
    if (next && next.type === 'comment' && next.text.trim().startsWith('DOC:')) {
      doc = next.text.trim().substring(4).trim();
    }
  
    // Extract the entire value first
    let value = decl.value;
    
    // Check if value contains a fallback
    const match = value.match(/var\(--.*?,\s*(--.*?)\)/);
    if (match) {
      fallback = match[1];
      // Remove the fallback from the value
      value = value.replace(match[0], "").trim();
    }
  
    // If there's anything left in the value, that's our default value
    if (value) {
      defaultValue = value;
    }
  
    return {
      name: decl.prop,
      defaultValue,
      fallback,
      documentation: doc,
    };
  }
  

  
  

// Iterate over components
for (const component in componentObj) {
    // Prepare the expected SCSS file path
    const vueFilePath = componentObj[component].sourceFiles[0]; // assuming only one source file per component
    const componentDir = path.dirname(vueFilePath);
    const scssFileName = `${component}.module.scss`;
    const scssFilePath = path.join(componentDir, 'styles', scssFileName);

    const parsedSCSS = await parseSCSS(scssFilePath);
    if (parsedSCSS.simpleProperties.length > 0 || parsedSCSS.compositeProperties.length > 0){
      componentObj[component].UIProperties = parsedSCSS;
    }

  }

//Move to dist folder
fs.writeJsonSync('./dist/component-docgen.json', componentObj, { spaces: 2 });
fs.writeJsonSync('./dist/icon-component-docgen.json', iconComponentsObj, { spaces: 2 });

console.log("Docgen built");