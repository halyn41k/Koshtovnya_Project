<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <!-- Показувати футер, якщо це не адмін панель -->
    <FooterComponent v-if="!isAdminRoute" />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    // Перевірка, чи маршрут веде до адмін панелі
    isAdminRoute() {
      return this.$route.path.startsWith('/admin'); 
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token && this.$route.name !== 'Login') {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
