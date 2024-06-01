import { createRouter, createWebHashHistory } from 'vue-router';

import Operations from '@pages/operations/index.vue';

const routes = [
  { path: '/', redirect: '/operations' },
  { path: '/operations', name: 'operations', component: Operations },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
