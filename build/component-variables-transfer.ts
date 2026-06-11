import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEST_REPO_NAME = 'rei-cedar-component-variables';
const DEST_PATH = 'dist/scss';
const SUPPORTED_COMPONENTS: string[] = [
  /* component vars */
  'CdrButton.vars.scss',
  'CdrCard.vars.scss',
  'CdrChip.vars.scss',
  'CdrBreadcrumb.vars.scss',
  'CdrFormGroup.vars.scss',
  'CdrFormError.vars.scss',
  'CdrGrid.vars.scss',
  'CdrLabelStandalone.vars.scss',
  'CdrLabelWrapper.vars.scss',
  'CdrRadio.vars.scss',
  'CdrCheckbox.vars.scss',
  'CdrLink.vars.scss',
  'CdrInput.vars.scss',
  'CdrSelect.vars.scss',
  'CdrSkeleton.vars.scss',
  'CdrList.vars.scss',
  'CdrTable.vars.scss',
];

const destMixinsDir = path.join(__dirname, `../../${DEST_REPO_NAME + path.sep + DEST_PATH}`);

// get vars files
const files = globSync('./**/*.vars.scss', { ignore: ['../**/node_modules/**'] });

// copy vars files
files.forEach((f) => {
  const fname = path.basename(f).replace(/^_/, ''); // remove `_` prefix from global vars files
  if (!SUPPORTED_COMPONENTS.includes(fname)) {
    console.log(`skipping ${fname}`);
    return;
  }
  const outDest = `${destMixinsDir}/${fname}`;
  fs.copySync(f, outDest);
  console.log(`copied ${fname} to ${outDest}`);
});

/* iterate over SUPPORTED_COMPONENTS to ensure that vars are loaded in correct order */
const indexFile = SUPPORTED_COMPONENTS.map((fname) => `@use "./${fname}" as *;`).join('\n');
const singleFile = SUPPORTED_COMPONENTS.map((fname) =>
  fs.readFileSync(`${destMixinsDir}/${fname}`, 'utf8'),
).join('\n');

fs.outputFileSync(`${destMixinsDir}/index.scss`, indexFile);
fs.outputFileSync(`${destMixinsDir}/cedar-component-variables.scss`, singleFile);
