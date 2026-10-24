import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['build/component-variables/__tests__/**/*.spec.ts'],
    environment: 'node',
  },
});
