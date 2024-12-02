// Copy cdr-fonts, cdr-reset, and cdr-palette to root folder.
// Cedar 15 expects these files to be in root.
// For 16, it would be helpful to remove this and have all styles in /style.

const path = require('path');
const fs = require('fs-extra');

const DIST = 'dist';

['cdr-fonts.css', 'cdr-reset.css', 'cdr-palette.css'].forEach(file => {
  fs.copyFileSync(path.join(DIST, '/style', file), path.join(DIST, file));
})