import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import ClothingItems from '../views/ClothingItems.vue';
import Categories from '../views/Categories.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/clothing-items',
        name: 'ClothingItems',
        component: ClothingItems,
        meta: { requiresAuth: true }
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.token) {
            next('/login');
            return;
        }
    }
    if (to.matched.some(record => record.meta.guest)) {
        if (store.state.token) {
            next('/dashboard');
            return;
        }
    }
    next();
});

export default router; 