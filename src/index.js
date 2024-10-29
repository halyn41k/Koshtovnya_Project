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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
