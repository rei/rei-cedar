import '@rei/cdr-tokens/css';
// @rei/cdr-tokens@15.0.0-alpha.2's main CSS barrel does not include the
// semantic foundations, so load them explicitly for the dev app. Storybook
// does the same in .storybook/preview.ts.
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
import '@rei/cdr-tokens/css/color-graphik';
import '@rei/cdr-tokens/css/color-selection';
import '@rei/cdr-tokens/css/color-surface';

import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import routes from './router';
import DevPage from './DevPage.vue';

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

createApp(DevPage).use(router).mount('#main');
