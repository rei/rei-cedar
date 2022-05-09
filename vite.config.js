/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
  //base: '/rei-cedar-next/',
  build: {
    lib: {
      entry: resolve(__dirname, '/src/lib.js'),
      name: 'cedar',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  css: {
    modules: {
      generateScopedName: (name) => {
        return `${name}_${packageJson.version.replace(/\./g, '-')}`;
      }   
    },
  },
  resolve: {
    alias: {
      'srcdir': resolve(__dirname, 'src'),
      'cssdir': resolve(__dirname, 'src/css'),
      'assetsdir': resolve(__dirname, 'src/assets'),
      'componentsdir': resolve(__dirname, 'src/components'),
      'mixinsdir': resolve(__dirname, 'src/mixins'),
      '~': resolve(__dirname, 'node_modules')
    }
  },
  plugins: [
    vue(),
  ],
})