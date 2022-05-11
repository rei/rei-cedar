import { createRouter, createWebHashHistory } from "vue-router";
import routes from './router';
import Dev from './Dev.vue'; //eslint-disable-line

import { createApp } from 'vue';


const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

  createApp(Dev).use(router).mount('#main');
