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
    ]
};

export default PrivateRoutes;
