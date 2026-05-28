import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath, URL } from 'url';
import { mergeConfig, type PluginOption } from 'vite';

const excludedVitePlugins = new Set(['vite:dts', 'css-name-normalizer']);

const removeExcludedPlugins = async (plugins: PluginOption[]): Promise<PluginOption[]> => {
  const filteredPlugins = await Promise.all(
    plugins.map(async (plugin) => {
      const resolvedPlugin = await plugin;

      if (Array.isArray(resolvedPlugin)) {
        return removeExcludedPlugins(resolvedPlugin);
      }

      if (
        resolvedPlugin &&
        typeof resolvedPlugin === 'object' &&
        'name' in resolvedPlugin &&
        typeof resolvedPlugin.name === 'string' &&
        excludedVitePlugins.has(resolvedPlugin.name)
      ) {
        return [];
      }

      return [resolvedPlugin];
    }),
  );

  return filteredPlugins.flat();
};

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.plugins = await removeExcludedPlugins(config.plugins ?? []);

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
      optimizeDeps: {
        include: ['@vueuse/core'],
      },
    });
  },
};

export default config;
