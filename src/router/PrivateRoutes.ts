import Home from '../views/home/Index.vue';

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
