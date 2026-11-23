// Copy src/mixins/*.scss to dist/mixins so they ship with the package
// and resolve through the package.json exports map (./mixins/*).
// Runs after vite build (which emits dist/mixins/*.mjs for the TS mixins)
// and before validate-package.

import path from 'path';
import fs from 'fs-extra';

const SRC = path.join('src', 'mixins');
const DIST = path.join('dist', 'mixins');

fs.ensureDirSync(DIST);

fs.readdirSync(SRC)
  .filter((file) => file.endsWith('.scss'))
  .forEach((file) => {
    fs.copyFileSync(path.join(SRC, file), path.join(DIST, file));
  });

console.log(
  `Copied ${fs.readdirSync(SRC).filter((f) => f.endsWith('.scss')).length} mixin files to ${DIST}`,
);
