/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import options from './build/config/rollupOptions.mjs';

const output = Array.isArray(options.output) ? options.output[0] : options.output;

const version = process.env.npm_package_version ?? '0.0.0';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rei-cedar',
  build: {
    emptyOutDir: false,
    lib: {
      entry: './src/lib.ts',
      formats: ['umd'],
      name: 'cedar',
    },
    rolldownOptions: {
      ...options,
      external: (id: string) => ['vue', 'tabbable'].some((dep) => dep === id || id.startsWith(`${dep}/`)),
      output: {
        ...output,
        preserveModules: false,
        globals: {
          ...output?.globals,
          vue: 'Vue',
          tabbable: 'tabbable',
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: (name) => `${name}_${version?.replace(/\./g, '-')}`,
    },
    preprocessorOptions: {
      scss: {
        charset: false,
        quietDeps: true,
        api: 'modern',
      } as never,
    },
  },
  resolve: {
      alias: {
        srcdir: fileURLToPath(new URL('./src', import.meta.url)),
        cssdir: fileURLToPath(new URL('./src/css', import.meta.url)),
        componentsdir: fileURLToPath(new URL('./src/components', import.meta.url)),
        mixinsdir: fileURLToPath(new URL('./src/mixins', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
    },
  plugins: [vue()],
});
