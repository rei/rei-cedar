// http://eslint.org/docs/user-guide/configuring
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      // matches aliases from vite.config.js
      alias: {
        map: [
          ['srcdir', resolve('src')],
          ['cssdir', resolve('src/css')],
          ['assetsdir', resolve('src/assets')],
          ['componentsdir', resolve('src/components')],
          ['compositionsdir', resolve('src/compositions')],
          ['mixinsdir', resolve('src/mixins')],
        ],
        extensions: ['.vue', '.json', '.js'],
      },
    },
  },
  // add custom rules or overrides here
  rules: {
    // require .vue extension when importing for vite
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'always',
      ts: 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'no-use-before-define': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/require-default-prop': 0,
    'vue/attributes-order': 0,
    'vue/no-multiple-template-root': 0,
    'max-len': ['error', {
      code: 100,
      ignoreComments: true,
      ignoreTrailingComments: true,
    }],
    'vue/multiline-html-element-content-newline': 0,
  },
};
