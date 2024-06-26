const PublicRoutes = {
    path: '/auth',
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'SignUp',
            path: '/signup',
            component: () => import('../views/auth/SignUp.vue')
        },
        {
            name: 'SignIn',
            path: '/signin',
            component: () => import('../views/auth/SignIn.vue')
        },
    ]
};

export default PublicRoutes;
