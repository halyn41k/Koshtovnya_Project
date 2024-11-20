import { createApp } from 'vue';
import App from './App.vue';
import router from './index.js';
import i18n from './i18n';  // Імпортуємо i18n

// Додаємо i18n до застосунку
createApp(App)
  .use(router)  // Використовуємо роутер
  .use(i18n)    // Використовуємо i18n
  .mount('#app');  // Монтуємо застосунок
