import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import routes from './router';
import DevPage from './DevPage.vue';

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

createApp(DevPage).use(router).mount('#main');
