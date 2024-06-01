import { createRouter, createWebHashHistory } from 'vue-router';

import Operations from '@pages/operations/index.vue';
import OperationsUISelect from '@pages/operations/UISelect.vue';

const routes = [
  { path: '/', redirect: '/operations' },
  { path: '/operations', name: 'operations', component: Operations },
  { path: '/operations/ui-select', name: 'operations-ui-select', component: OperationsUISelect },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
