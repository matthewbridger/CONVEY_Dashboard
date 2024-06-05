import Home from '../views/home/index.vue';

const PrivateRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/',
    children: [
        {
            name: 'Home',
            path: '',
            component: Home
        },
    ]
};

export default PrivateRoutes;
