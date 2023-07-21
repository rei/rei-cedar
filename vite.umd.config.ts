/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import options from './rollupOptions.mjs';

options.output.preserveModules = false;

const version = process.env.npm_package_version;

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
    rollupOptions: {
      ...options,
      external: (id) => ['vue', 'core-js', 'tabbable'].some(
        (dep) => dep === id || id.startsWith(`${dep}/`),
      ),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: (name) => `${name}_${version?.replace(/\./g, '-')}`,
    },
  },
  resolve: {
    alias: {
      srcdir: fileURLToPath(new URL('./src', import.meta.url)),
      cssdir: fileURLToPath(new URL('./src/css', import.meta.url)),
      componentsdir: fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      mixinsdir: fileURLToPath(new URL('./src/mixins', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
  },
  plugins: [vue()],
});
