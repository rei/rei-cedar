//require('@babel/register');

// http://nightwatchjs.org/getingstarted#settings-file
module.exports = {
  plugins: ['vite-plugin-nightwatch'],
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  custom_commands_path: [
    './node_modules/nightwatch-axe/src/commands',
  ],
  globals_path: './globals.js',

  test_settings: {
    default: {
      silent: true,
      globals: {
        devServerURL: `http://localhost:3000/#/`,
        asyncHookTimeout: 180000,
      },
      desiredCapabilities: {
        browserName : 'chrome'
      },
      webdriver: {
        start_process: true,
        server_path: "node_modules/.bin/chromedriver",
        port: 9515
      },
    },
  },
};