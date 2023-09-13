import { parse } from 'vue-docgen-api'
import fs from 'fs-extra'
import glob from 'glob';
import _ from 'lodash-es';
import path from 'path';
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


// Iterate over components
for (const component in componentObj) {
    // Prepare the expected SCSS file path
    const vueFilePath = componentObj[component].sourceFiles[0]; // assuming only one source file per component
    const componentDir = path.dirname(vueFilePath);
    const scssFilePathPattern = path.join(componentDir, 'styles', '**', `${component}.*.scss`);

    // Use glob to find matching files
    const matchingFiles = glob.sync(scssFilePathPattern);

    // Iterate over the matching files
    for (const matchingFile of matchingFiles) {
        const parsedSCSS = await parseSCSS(matchingFile);
        if (parsedSCSS.length > 0){
            // Check if UIProperties already exists for this component
            if(componentObj[component].UIProperties) {
                // If it does, concatenate the new parsed SCSS with the existing ones
                componentObj[component].UIProperties = componentObj[component].UIProperties.concat(parsedSCSS);
            } else {
                // If it doesn't, assign the parsed SCSS to UIProperties
                componentObj[component].UIProperties = parsedSCSS;
            }
        }
    }
}

//Move to dist folder
fs.writeJsonSync('./dist/component-docgen.json', componentObj, { spaces: 2 });
fs.writeJsonSync('./dist/icon-component-docgen.json', iconComponentsObj, { spaces: 2 });

console.log("Docgen built");