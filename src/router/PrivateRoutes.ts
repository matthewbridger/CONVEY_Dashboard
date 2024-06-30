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
            children: [
                {
                    name: 'Account',
                    path: '',
                    component: () => import('../views/account/Index.vue')
                },
            ]
        },
        {
            path: '/user',
            children: [
                {
                    name: 'User',
                    path: '',
                    component: () => import('../views/users/Index.vue')
                },
            ]
        },
        {
            path: '/product',
            children: [
                {
                    name: 'Product',
                    path: '',
                    component: () => import('../views/products/Index.vue')
                },
            ]
        },
        {
            path: '/customer',
            children: [
                {
                    name: 'Customer',
                    path: '',
                    component: () => import('../views/customers/Index.vue')
                },
            ]
        },
    ]
};

export default PrivateRoutes;
