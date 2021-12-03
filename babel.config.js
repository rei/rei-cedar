/* eslint-disable */

module.exports = function (api) {
  const env = process.env.NODE_ENV;
  const babelEnv = process.env.BABEL_ENV;
  const supportedBrowsers = require("@rei/browsers-config");
  api.cache(true);

  // TODO: refactor to use babel `env` API here instead

  const targets = env === 'test' 
  ? {
      node: 'current',
    } 
  : supportedBrowsers;

  const presetEnvConfig = (env === 'prod') ?
  {
    modules: false, // enables tree-shaking
    targets, // polyfill based on supported browsers
    corejs: 3, // use corejs@3 for polyfills
    useBuiltIns: 'usage', // polyfill based on usage in source code.
  } :
  {
    targets
  }

  const presets = [
    [
      "@babel/preset-env",
      presetEnvConfig,
    ],
  ];

  return {
    presets,
  };
}
