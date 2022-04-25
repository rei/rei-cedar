// const path = require("path");
const vite = require('./vite.js');

const startViteServer = function() {
  return vite.start({
    configFile: '../../vite.config.js',
  });
}

let viteServer;
module.exports = {
  async before() {
    viteServer = await startViteServer(); 
    const port = viteServer.config.server.port;
    this.launchUrl = `http://localhost:${port}`;
  },
  async after() {
    await viteServer.close();
  },
}