const vite = require('vite');

module.exports.start = async (opts = {}) => {
  const { createServer } = vite;

  const options = Object.assign({
    root: './',
    base: '/',
    mode: 'development',
    configFile: '../../vite.config.ts',
    logLevel: 'info',
    clearScreen: false
  }, opts);

  options.server = {
    host: '127.0.0.1'
  };

  if (opts.server) {
    options.server = Object.assign(options.server, opts.server);
  }

  try {
    const server = await createServer(options);

    if (!server.httpServer) {
      throw new Error('HTTP server not available');
    }

    const port = await server.listen();
    const info = server.config.logger.info;

    info(`\n  vite v${require('vite/package.json').version} dev server running at:\n`);
    server.printUrls();

    return server;
  } catch (e) {
    console.error(`error when starting dev server:\n${e.stack}`);

    return e;
  }
};