import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router';

import { truckRoute } from '@/modules/truck/routes';

const routes: RouteRecordRaw[] = [
  truckRoute,
  {
    path: '/',
    redirect: { name: 'truck-list' },
  },
];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },

  routes,
});

export default router;
