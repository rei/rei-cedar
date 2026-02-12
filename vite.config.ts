/// <reference types="vitest" />
import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import options from './rollupOptions.mjs';
import cssNameNormalizer from './vite-plugin-css-name-normalizer';

const version = process.env.npm_package_version;
const componentsDir = fileURLToPath(new URL('./src/components', import.meta.url));
const componentEntrypointsDir = fileURLToPath(new URL('./src/entrypoints', import.meta.url));

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const getComponentEntries = () => {
  const entries: Record<string, string> = {};

  fs.mkdirSync(componentEntrypointsDir, { recursive: true });

  const existingEntrypoints = fs
    .readdirSync(componentEntrypointsDir)
    .filter((fileName) => fileName.endsWith('.ts'));

  existingEntrypoints.forEach((fileName) => {
    fs.unlinkSync(path.join(componentEntrypointsDir, fileName));
  });

  fs.readdirSync(componentsDir, { withFileTypes: true }).forEach((dirEntry) => {
    if (!dirEntry.isDirectory()) return;

    const componentPath = path.join(componentsDir, dirEntry.name);
    const vueEntries = fs
      .readdirSync(componentPath)
      .filter((fileName) => fileName.endsWith('.vue') && fileName.startsWith('Cdr'));
    const typeSource = fs.existsSync(path.join(componentPath, 'types.ts'))
      ? 'types'
      : fs.existsSync(path.join(componentPath, 'interfaces.ts'))
        ? 'interfaces'
        : null;

    vueEntries.forEach((fileName) => {
      const componentName = fileName.replace(/^Cdr/, '').replace(/\.vue$/, '');
      const entryName = toKebabCase(componentName);
      const entryFilePath = path.join(componentEntrypointsDir, `${entryName}.ts`);
      const entryFileContents = [
        `export { default as ${fileName.replace(/\.vue$/, '')} } from '../components/${dirEntry.name}/${fileName}';`,
        typeSource ? `export type * from '../components/${dirEntry.name}/${typeSource}';` : '',
      ]
        .filter(Boolean)
        .join('\n');

      fs.writeFileSync(entryFilePath, `${entryFileContents}\n`);
      entries[entryName] = `./src/entrypoints/${entryName}.ts`;
    });
  });

  return entries;
};

const componentEntries = getComponentEntries();

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
    rollupOptions: options,
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
      },
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
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
  ],
});
