import { parse, ComponentDoc } from 'vue-docgen-api';
import fs from 'fs-extra';
import { globSync } from 'glob';
import _ from 'lodash-es';
import path from 'path';
import parseSCSS from './docgen-scss';

interface UIProperty {
  name: string;
  defaultValue: string;
  description: string | null;
}

interface ExtendedComponentDoc extends ComponentDoc {
  UIProperties?: UIProperty[];
}

type DocgenObject = Record<string, ExtendedComponentDoc>;

async function createDocgenObj(filePath: string, docgenObj: DocgenObject): Promise<void> {
  const parsedComponentFile = await parse(filePath);
  docgenObj[parsedComponentFile.displayName] = parsedComponentFile;

  _.forIn(docgenObj, (component) => {
    component.props?.forEach((prop) => {
      if (_.has(prop, 'defaultValue.value')) {
        if (prop.defaultValue!.value === 'false') {
          (prop.defaultValue!.value as unknown) = false;
        }
        if (prop.defaultValue!.value === 'true') {
          (prop.defaultValue!.value as unknown) = true;
        }
        if (prop.defaultValue!.value === '[]') {
          (prop.defaultValue!.value as unknown) = [];
        }
        prop.defaultValue!.value = trimApostrophes(prop.defaultValue!.value as string);
      }
      if (prop.tags && prop.tags.values && prop.tags.values[0].description) {
        (prop as Record<string, unknown>).values = prop.tags.values[0].description.split(',').map((value: string) => {
          return value.trim();
        });
        delete prop.tags.values;
      }
    });
  });
}

function trimApostrophes(str: string | boolean | unknown[]): string | boolean | unknown[] {
  if (typeof str === 'string' && str[0] === "'" && str[str.length - 1] === "'") {
    return str.slice(1, -1);
  }
  return str;
}

async function main(): Promise<void> {
  const componentFiles = globSync('./src/components/**/*.vue', {
    ignore: [
      './src/components/**/examples/**/*',
      './src/components/**/components/*',
      './src/components/icon/comps/*.vue',
    ],
  });
  const iconFiles = globSync('./src/components/icon/comps/*.vue');
  const componentObj: DocgenObject = {};
  const iconComponentsObj: DocgenObject = {};

  console.log('Building docgen file...');

  await Promise.all(
    componentFiles.map(async (filePath) => {
      await createDocgenObj(filePath, componentObj);
    }),
  );

  await Promise.all(
    iconFiles.map(async (filePath) => {
      await createDocgenObj(filePath, iconComponentsObj);
    }),
  );

  // Iterate over components
  for (const component in componentObj) {
    // Prepare the expected SCSS file path
    const vueFilePath = componentObj[component].sourceFiles?.[0]; // assuming only one source file per component
    if (!vueFilePath) continue;

    const componentDir = path.dirname(vueFilePath);
    const scssFilePathPattern = path.join(componentDir, 'styles', '**', `${component}.*.scss`);

    // Use glob to find matching files
    const matchingFiles = globSync(scssFilePathPattern);

    // Iterate over the matching files
    for (const matchingFile of matchingFiles) {
      const parsedSCSS = await parseSCSS(matchingFile);
      if (parsedSCSS.length > 0) {
        // Check if UIProperties already exists for this component
        if (componentObj[component].UIProperties) {
          // If it does, concatenate the new parsed SCSS with the existing ones
          componentObj[component].UIProperties =
            componentObj[component].UIProperties!.concat(parsedSCSS);
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

  console.log('Docgen built');
}

main().catch((error) => {
  console.error('Error generating docgen:', error);
  process.exit(1);
});
