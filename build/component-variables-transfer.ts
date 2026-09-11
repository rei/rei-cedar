import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEST_REPO_NAME = 'rei-cedar-component-variables';
const DEST_PATH = 'dist/scss';
const sourceDir = path.join(__dirname, '../src');
const mapFiles = globSync('components/**/styles/vars/*.maps.scss', { cwd: sourceDir }).sort();
const SUPPORTED_COMPONENTS = [
  ...mapFiles.map((file) => path.basename(file)),
  'CdrButton.vars.scss',
  'CdrBanner.vars.scss',
  'CdrLink.vars.scss',
  'CdrChip.vars.scss',
  'CdrCard.vars.scss',
  'CdrBreadcrumb.vars.scss',
  'CdrFormGroup.vars.scss',
  'CdrFormError.vars.scss',
  'CdrGrid.vars.scss',
  'CdrLabelStandalone.vars.scss',
  'CdrLabelWrapper.vars.scss',
  'CdrRadio.vars.scss',
  'CdrCheckbox.vars.scss',
  'CdrInput.vars.scss',
  'CdrSelect.vars.scss',
  'CdrSkeleton.vars.scss',
  'CdrList.vars.scss',
  'CdrTable.vars.scss',
];

const destMixinsDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, `../../${DEST_REPO_NAME + path.sep + DEST_PATH}`);

// get vars files
const files = globSync('**/*.{vars,maps}.scss', { cwd: sourceDir, absolute: true });

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

// Sass modules must load once; concatenating files repeats their @use namespaces.
const indexFile = SUPPORTED_COMPONENTS.map((fname) => `@forward "./${fname}";`).join('\n') + '\n';
fs.outputFileSync(`${destMixinsDir}/index.scss`, indexFile);
fs.outputFileSync(`${destMixinsDir}/cedar-component-variables.scss`, '@forward "./index";\n');
