import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/HomePage.vue')
  },
  {
    path: '/account',
    name: 'AccountInfo',
    component: () => import('@/components/AccountInfo.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/UserLogin.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/components/Admin.vue')
  },
  {
    path: '/aboutdelivery',
    name: 'AboutDelivery',
    component: () => import('@/components/AboutDelivery.vue')
  },
  {
    path: '/loader',
    name: 'Loader',
    component: () => import('@/components/Loader.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/components/Payment.vue')
  },
  {
    path:'/cart',
    name: 'CartShop',
    component: () => import('@/components/CartShopPage.vue')
  },
  {
    path:'/delete-room',
    name: 'DeleteRoom',
    component: () => import('@/components/DeleteRoom.vue')
  },
  {
    path:'/manager',
    name: 'ManagerDashboard',
    component: () => import('@/components/Manager.vue')
  },
  { path: '/add-admin',
    name: 'AddAdmin',
    component: () => import('@/components/AddAdmin.vue')
  },
  { path: '/delete-admin', 
    name: 'DeleteAdmin',
    component: () => import('@/components/DeleteAdmin.vue') 
  },
  {
    path: '/bracelets',
    name: 'BraceletSection',
    component: import('@/components/BraceletSection.vue') 
  },
  {
  path: '/test',
  name: 'Test',
  component: () => import('@/components/Test.vue')
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
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/components/Wishlist.vue')
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
