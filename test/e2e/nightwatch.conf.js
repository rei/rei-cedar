//require('@babel/register');

// http://nightwatchjs.org/getingstarted#settings-file

const vite = require('./vite.js');

const startViteServer = function() {
  return vite.start({
    configFile: './vite.config.ts',
  });
}

let viteServer;

module.exports = {
  plugins: ['nightwatch-axe-verbose'],
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  test_settings: {
    default: {
      silent: true,
      globals: {
        devServerURL: `http://localhost:3000/#/`,
        asyncHookTimeout: 180000,
        async before() {
          viteServer = await startViteServer(); 
          const port = viteServer.config.server.port;
          this.launchUrl = `http://localhost:${port}`;
        },
        async after() {
          await viteServer.close();
        },
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