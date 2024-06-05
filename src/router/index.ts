import { createRouter, createWebHistory } from 'vue-router'
import PrivateRoutes from './PrivateRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/error/404.vue')
    },
    PrivateRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  next();
});

export default router
