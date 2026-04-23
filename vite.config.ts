/// <reference types="vitest" />
import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import options from './build/config/rollupOptions.mjs';
import { generateComponentEntrypoints } from './build/generate-entrypoints';
import cssNameNormalizer from './build/plugins/vite-plugin-css-name-normalizer';

const version = process.env.npm_package_version ?? '0.0.0';
const componentEntries = generateComponentEntrypoints();
const shouldGenerateDeclarations = process.env.STORYBOOK !== 'true';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rei-cedar/',
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        lib: './src/lib.ts',
        ...componentEntries,
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.mjs`,
    },
    rolldownOptions: options,
  },
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: (name) => `${name}_${version.replace(/\./g, '-')}`,
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
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/test/playwright', '**/templates/__tests__'],
    environment: 'jsdom',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
  plugins: [
    vue(),
    cssNameNormalizer(),
    ...(shouldGenerateDeclarations
      ? [
          dts({
            tsconfigPath: './tsconfig.build.json',
            rollupTypes: false,
            exclude: ['src/**/*.stories.ts', 'src/**/examples/**'],
          }),
        ]
      : []),
  ],
});
