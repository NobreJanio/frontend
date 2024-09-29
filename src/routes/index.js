import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Men from '../views/Men.vue';
import Women from '../views/Women.vue';
import Kids from '../views/Kids.vue';
import Cart from '../views/Cart.vue';
import Contact from '../views/Contact.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/categories/men',
        name: 'Men',
        component: Men,
    },
    {
        path: '/categories/women',
        name: 'Women',
        component: Women,
    },
    {
        path: '/categories/kids',
        name: 'Kids',
        component: Kids,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL), // ou process.env.VUE_APP_BASE_URL
    routes, // A variável routes deve ser um array
});

export default router;
