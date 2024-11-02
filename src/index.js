import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/HomePage.vue')
  },
  {
    path: '/bracelets',
    name: 'BraceletSection',
    component: () => import('@/components/BraceletSection.vue') 
  },
  {
    path: '/herdany',
    name: 'Gerdany',
    component: () => import('@/components/GerdanSection.vue')
  },
  {
    path: '/dukats',
    name: 'Dukats',
    component: () => import('@/components/DucatsSection.vue')
  },
  {
    path: '/sylyanky',
    name: 'Sylyanky',
    component: () => import('@/components/SyluankaSection.vue')
  },
  {
    path: '/earrings',
    name: 'Earrings',
    component: () => import('@/components/EaringsSection.vue')
  },
  {
    path: '/belts',
    name: 'Belts',
    component: () => import('@/components/BeltsSection.vue')
  },
  {
    path: '/aboutus',
    name: 'Aboutus',
    component: () => import('@/components/AboutUs.vue')
  },
  {
    path: '/aboutdelivery',
    name: 'AboutDelivery',
    component: () => import('@/components/AboutDelivery.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/UserLogin.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/components/UserRegistration.vue')
  },
  {
    path: '/productpage',
    name: 'ProductPage',
    component: () => import('@/components/ProductPage.vue')
  },
  {
    path: '/wishlist',
    name: 'UserWishlist',
    component: () => import('@/components/UserWishlist.vue')
  },
  {
    path: '/account',
    name: 'AccountInfo',
    component: () => import('@/components/AccountInfo.vue')
  },
  {
    path:'/cart',
    name: 'CartShop',
    component: () => import('@/components/CartShopPage.vue')
  },
  {
    path:'/allproduct',
    name: 'AllProductsPage',
    component: () => import('@/components/AllProductsPage.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
