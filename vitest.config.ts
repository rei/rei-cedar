/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  css: {
    modules: {
      generateScopedName: (name) => {
        return name;
      }
    }
  },
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/test/e2e', '**/templates/__tests__'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
    plugins: [vue()],
});
