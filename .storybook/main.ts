import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath, URL } from 'url';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          srcdir: fileURLToPath(new URL('../src', import.meta.url)),
          cssdir: fileURLToPath(new URL('../src/css', import.meta.url)),
          componentsdir: fileURLToPath(new URL('../src/components', import.meta.url)),
          mixinsdir: fileURLToPath(new URL('../src/mixins', import.meta.url)),
          '~': fileURLToPath(new URL('../node_modules', import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            charset: false,
            quietDeps: true,
            api: 'modern',
          },
        },
      },
    });
  },
};

export default config;
