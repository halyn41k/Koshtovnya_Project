<template>
  <header class="header">
    <div class="top-bar">
      <ul class="nav-links">
        <li><router-link to="/aboutus">{{ $t('aboutUs') }}</router-link></li>
        <li><router-link to="/aboutdelivery">{{ $t('aboutDelivery') }}</router-link></li>
      </ul>

      <div class="language-currency">
        <div class="language">
          <img :src="currentFlag" :alt="selectedLanguage + ' Flag'" class="flag">
          <select v-model="selectedLanguage" @change="changeLanguage" class="dropdown no-border">
            <option value="uk">Українська</option>
            <option value="en">English</option>
          </select>
        </div>

        <div class="currency">
          <select v-model="selectedCurrency" class="dropdown no-border">
            <option value="UAH">UAH ₴</option>
            <option value="USD">USD $</option>
          </select>
        </div>
        <router-link :to="{ path: '/account', query: { tab: 'wishlist' } }" class="wishlist">{{ $t('wishlist') }}</router-link>
      </div>
    </div>

    <div class="separator"></div>

    <div class="main-header">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="$t('searchPlaceholder')" 
          @keyup.enter="startSearch"
        />
        <div class="search-icon" @click="startSearch">
          <img src="@/assets/magnifying-glass-svgrepo-com.svg" alt="Search Icon" />
        </div>
        <SearchResults v-if="searchQuery" :query="searchQuery" />
      </div>

      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
        <h1>Коштовня</h1>
      </router-link>

      <div class="user-cart">
        <router-link to="/account" class="user-icon">
          <img src="@/assets/user-svgrepo-com (1).svg" alt="User Icon" class="icon" />
        </router-link>

        <router-link to="/cart" class="cart-icon">
        <img src="@/assets/cart-svgrepo-com.svg" alt="Cart Icon" class="icon" />
        <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
      </router-link>

      </div>
    </div>

    <nav class="nav-menu">
      <ul>
        <li><router-link to="/bracelets">{{ $t('bracelets') }}</router-link></li>
        <li><router-link to="/herdany">{{ $t('herdany') }}</router-link></li>
        <li><router-link to="/dukats">{{ $t('dukats') }}</router-link></li>
        <li><router-link to="/sylyanky">{{ $t('sylyanky') }}</router-link></li>
        <li><router-link to="/earrings">{{ $t('earrings') }}</router-link></li>
        <li><router-link to="/belts">{{ $t('belts') }}</router-link></li>
      </ul>
    </nav>
  </header>
</template>


<script>
import SearchResults from './SearchResults.vue';
import axios from 'axios';

export default {
  components: {
    SearchResults,
  },
  data() {
    return {
      selectedLanguage: 'uk',
      selectedCurrency: 'UAH',
      cartCount: 0, // Лічильник товарів у кошику
      searchQuery: '', // Пошуковий запит
    };
  },
  computed: {
    currentFlag() {
      return this.selectedLanguage === 'uk'
        ? 'https://flagcdn.com/w320/ua.png'
        : 'https://flagcdn.com/w320/gb.png';
    },
  },
  methods: {
    async fetchCartCount() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://26.235.139.202:8080/api/cart/cart-count', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.cartCount = response.data.cart_count || 0; // Оновлення значення з API
      } catch (error) {
        console.error('Помилка завантаження кількості товарів у кошику:', error);
      }
    },
    startSearch() {
      console.log('Searching:', this.searchQuery);
    },
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
  },
  mounted() {
    this.fetchCartCount(); // Завантаження початкового значення
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400&display=swap');

@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Black2.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

body {
  margin: 0;
  font-family: 'Merriweather', serif;
}

.nav-links a,
.wishlist,
.language-currency select,
.search-bar input {
  font-family: 'Montserrat', serif;
  font-weight: 400; 
  font-size: 14px; 
}

.search-bar {
  margin-left: 40px;
  font-family: 'Montserrat', serif;
}

.header {
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px; 
  background-color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 10px; 
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px; 
}

.language-currency {
  display: flex;
  align-items: center;
  gap: 10px; 
}

.language {
  display: flex;
  align-items: center;
  gap: 5px;
}

.language .flag {
  width: 15px; 
  height: 10px;
}

.no-border {
  border: none;
  outline: none;
  font-size: 12px;
  background-color: white;
}

.wishlist {
  text-decoration: none;
  color: #333;
  font-size: 14px; 
}

.separator {
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  filter: blur(1px);
  margin: 0 auto;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px; 
  margin-top: 5px; 
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  width: 250px; 
  background-color:white;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  padding-right: 25px;
  border-radius: 5px;
  background-color: #F1E6E6;
  border: none; 
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search-icon img {
  width: 15px; 
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: -230px; 
  text-decoration: none;
}

.logo img {
  width: 60px; 
}

.logo h1 {
  color:#111111;
  font-size: 20px;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 900;
}

.user-cart {
  display: flex;
  gap: 10px; 
  position: relative;
}

.user-cart .icon {
  width: 30px; 
}

.nav-menu {
  background-color: rgba(107, 31, 31, 0.09);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 0; 
}

.nav-menu ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  display: inline-block;
}

.nav-menu a {
  text-decoration: none;
  color: #6B1F1F;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: bold;
  padding: 8px 10px; 
  font-size: 14px; 
  border-bottom: 3px solid transparent;
  transition: border-bottom 0.3s ease, background-color 0.3s ease; 
}

.nav-menu a:hover {
  border-bottom: 3px solid #6B1F1F;
  background-color: white;
}


.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 250px;
  background-color: #FFF7F6; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px; 
}

.search-results h2 {
  margin: 0 0 10px; 
  text-align: center; 
  font-family: 'Montserrat', sans-serif;
  font-weight: bold; 
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #EAEAEA;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-results img {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.product-details {
  flex-grow: 1; 
  text-align: center; 
}

.product-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.product-price {
  font-family: 'Montserrat', sans-serif;
  font-weight: normal; 
}

.search-results::-webkit-scrollbar {
  width: 6px; 
}

.search-results::-webkit-scrollbar-thumb {
  background: #ccc; 
  border-radius: 10px; 
}

.search-results::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #a01212;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bounce 0.3s ease;
}

.cart-icon.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}


@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}


</style>
