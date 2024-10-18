import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import config from './vite.config';

export default defineConfig({
  base: '/rei-cedar/',
  css: config.css,
  resolve: config.resolve,
  plugins: [vue()],
  define: { 'process.env': { NODE_ENV: 'production' } },
  build: {
    outDir: 'pages',
    lib: {
      name: 'main',
      entry: './index.html',
    },
  },
});
