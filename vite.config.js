import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/lib.js'),
      name: 'Cedar',
      fileName: (format) => `cedar.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // assetFileNames: (asset) => {
        //   return asset.name === 'style.css'
        //     ? 'cedar-compiled.css'
        //     : asset.name;
        // },
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