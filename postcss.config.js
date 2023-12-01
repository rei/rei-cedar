/* eslint-env node */

// const process = require('process');

module.exports = {
  syntax: 'postcss-scss',
  plugins: {
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
    autoprefixer: {},
  },
};