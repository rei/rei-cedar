import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

describe('Library Build ', () => {

  it('should be tree-shakeable', async () => {
    const libraryConfig = await import('../../vite.config.mjs')

    // Build config overrides.
    const rawConfig = libraryConfig.config;
    rawConfig.configFile = false; // needed to pass in this config object instead of reading from fs
    rawConfig.build.outDir = './dist-test';

    // Build Cedar library
    await build(defineConfig(rawConfig));

    // Build app using the built Cedar library
    const appBundles = await build({
      configFile: false,
      plugins: [vue()],
      minify: true,
      mode: 'production',
      build: {
        write: true,
        rollupOptions: {
          input: {
            app: './test/build/harnesses/apps/app1/src/main.mjs'
          }
        }
      }
    });

    expect(appBundles.output[0].code).to.include('CdrButton');
    expect(appBundles.output[0].code).to.not.include('CdrCard');
  });
});
