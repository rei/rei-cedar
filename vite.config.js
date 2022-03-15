import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
const packageJson = require('./package.json')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: (name) => {
        return `${name}_${packageJson.version.replace(/\./g, '-')}`;
      }   
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/lib.js'),
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
  plugins: [vue()]
})