const js = require('@eslint/js');
const pluginVue = require('eslint-plugin-vue');
const tseslint = require('typescript-eslint');
const vueParser = require('vue-eslint-parser');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'build/*.js',
      'config/*.js',
      'dist-docs/',
      'dist/',
      'test/',
      'node_modules/',
      'backstop_data/html_report/',
      'src/**/__tests__/*.spec.js',
      'src/**/dist/*.js',
      'src/**/examples/',
      'src/components/icon/comps/*',
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-use-before-define': 0,
      'vue/require-default-prop': 0,
      'vue/attributes-order': 0,
      'vue/no-multiple-template-root': 0,
      'vue/multiline-html-element-content-newline': 0,
      '@typescript-eslint/no-explicit-any': 0,
      camelcase: 'off',
      '@typescript-eslint/naming-convention': 'off',
      'no-undef': 'off',
      camelcase: 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
];
