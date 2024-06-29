import { createRouter, createWebHistory } from 'vue-router'
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useUserStore } from '../store/user.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/error/404.vue')
    },
    PublicRoutes,
    PrivateRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const { is_current_session_valid } = useUserStore();

  const is_valid_user_session = await is_current_session_valid();
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if(is_valid_user_session == true) {
          next();
      }
      else {
          return next({ name: 'SignIn' });
      }
  }
  else {
      if(is_valid_user_session == true && (to.name == 'SignIn' || to.name == 'SignUp')) {
          return next({ name: 'Dashboard' });
      }
      next();
  }
});
export default router
