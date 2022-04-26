// // The Vue build version to load with the `import` command
// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHashHistory } from "vue-router";
import routes from './router';
import Dev from './Dev.vue'; //eslint-disable-line
// // routing
// Vue.use(VueRouter);
//
// const router = new VueRouter({ routes });
//
// export default routes; //eslint-disable-line
//
// Vue.config.productionTip = false;
// Vue.config.devtools = false;
//
// /* eslint-disable no-new */
// new Vue({
//   router,
//   el: '#main',
//   render: (app) => app(Dev),
// });

import KitchenSink from 'srcdir/dev/KitchenSink.vue';
import { createApp } from 'vue';


const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

  createApp(Dev).use(router).mount('#main');
