const process = require('process');
const path = require('path');

module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-jit-props': {
      files: [path.resolve('node_modules/@rei/cdr-tokens/dist/rei-dot-com/css/cdr-tokens.css')],
    },
    'postcss-calc': { mediaQueries: true },
    'postcss-pxtorem': {
      // change
      rootValue: 10,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [/^html$/],
      mediaQuery: false,
      minPixelValue: 0,
    },
    'postcss-inline-svg': {
      // paths are relative to root
      paths: [process.cwd()],
    },
    autoprefixer: {},
  },
};
