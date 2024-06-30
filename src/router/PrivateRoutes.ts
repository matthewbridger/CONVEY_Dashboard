import Home from '../views/home/Index.vue';

const PrivateRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/',
    component: () => import('../layouts/private/AppContainer.vue'),
    children: [
        {
            name: 'Home',
            path: '',
            component: Home
        },
        {
            path: '/account',
            component: () => import('../layouts/private/RouteContainer.vue'),
            children: [
                {
                    name: 'Account',
                    path: '',
                    component: () => import('../views/account/Index.vue')
                },
            ]
        },
    ]
};

export default PrivateRoutes;
