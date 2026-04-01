import { parse } from 'vue-docgen-api';
import type { ComponentDoc, PropDescriptor } from 'vue-docgen-api';
import fs from 'fs-extra';
import { globSync } from 'glob';
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

type DocgenDefaultValue = string | boolean | unknown[];

function normalizeDefaultValue(value: string): DocgenDefaultValue {
  if (value === 'false') return false;
  if (value === 'true') return true;
  if (value === '[]') return [];

  return trimApostrophes(value);
}

async function createDocgenObj(filePath: string, docgenObj: DocgenObject): Promise<void> {
  const parsedComponentFile = await parse(filePath);
  docgenObj[parsedComponentFile.displayName] = parsedComponentFile;

  Object.values(docgenObj).forEach((component) => {
    component.props?.forEach((prop: PropDescriptor) => {
      const defaultValue = prop.defaultValue?.value;

      if (typeof defaultValue === 'string') {
        (prop.defaultValue as { value: DocgenDefaultValue }).value = normalizeDefaultValue(
          defaultValue,
        );
      }

      const valuesDescription = getTagDescription(prop.tags?.values?.[0]);

      if (valuesDescription) {
        (prop as PropDescriptor & { values?: string[] }).values = valuesDescription
          .split(',')
          .map((value: string) => {
            return value.trim();
          });
        delete prop.tags?.values;
      }
    });
  });
}

function trimApostrophes(str: DocgenDefaultValue): DocgenDefaultValue {
  if (typeof str === 'string' && str[0] === "'" && str[str.length - 1] === "'") {
    return str.slice(1, -1);
  }
  return str;
}

function getTagDescription(tag: unknown): string | undefined {
  if (tag && typeof tag === 'object' && 'description' in tag) {
    return typeof tag.description === 'string' ? tag.description : undefined;
  }

  return undefined;
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
