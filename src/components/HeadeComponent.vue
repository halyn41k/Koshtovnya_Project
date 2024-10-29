<template>
  <header class="header">
    <div class="top-bar">
      <ul class="nav-links">
        <li><router-link to="/aboutus">Про нас</router-link></li>
        <li><router-link to="/aboutdelivery">Про оплату | Доставку</router-link></li>
      </ul>

      <div class="language-currency">
        <div class="language">
          <img :src="currentFlag" :alt="selectedLanguage + ' Flag'" class="flag">
          <select v-model="selectedLanguage" class="dropdown no-border">
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
        <router-link to="/wishlist" class="wishlist">Список бажаного</router-link>
      </div>
    </div>

    <div class="separator"></div>

    <div class="main-header">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Пошук в нашому каталозі">
        <div class="search-icon" @click="search">
          <img src="@/assets/magnifying-glass-svgrepo-com.svg" alt="Search Icon">
        </div>
      </div>

      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
        <h1>Коштовня</h1>
      </router-link>

      <div class="user-cart" @mouseenter="showMiniCart" @mouseleave="hideMiniCart">
        <router-link to="/account" class="user-icon">
          <img src="@/assets/user-svgrepo-com (1).svg" alt="User Icon" class="icon">
        </router-link>

        <router-link to="/cart" class="cart-icon">
          <img src="@/assets/cart-svgrepo-com.svg" alt="Cart Icon" class="icon">
        </router-link>

        <MiniCart v-if="isMiniCartVisible" :items="cartItems" :total="total" />
      </div>
    </div>

    <nav class="nav-menu">
      <ul>
        <li><router-link to="/bracelets">Браслети</router-link></li>
        <li><router-link to="/herdany">Гердани</router-link></li>
        <li><router-link to="/dukats">Дукати</router-link></li>
        <li><router-link to="/sylyanky">Силянки</router-link></li>
        <li><router-link to="/earrings">Сережки</router-link></li>
        <li><router-link to="/belts">Пояси</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import MiniCart from './MiniCart.vue';

export default {
  components: {
    MiniCart,
  },
  data() {
    return {
      searchQuery: '',
      selectedLanguage: 'uk',
      selectedCurrency: 'UAH',
      isMiniCartVisible: false,
      cartItems: [
        { id: 1, name: 'Браслет', price: 250, quantity: 1, imageSrc: '@/assets/bracelet.png' },
        { id: 2, name: 'Сережки', price: 150, quantity: 2, imageSrc: '@/assets/earrings.png' },
      ],
      total: 400,
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
    showMiniCart() {
      this.isMiniCartVisible = true;
    },
    hideMiniCart() {
      this.isMiniCartVisible = false;
    },
    search() {
      console.log('Searching for:', this.searchQuery);
    },
  },
  mounted() {
    this.$router.afterEach((to) => {
      console.log('Navigated to:', to.path);
    });
  }
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

/* Apply Montserrat Regular to specific texts */
.nav-links a,
.wishlist,
.language-currency select,
.search-bar input {
  font-family: 'Montserrat', serif;
  font-weight: 400; /* Regular */
  font-size: 14px; /* Slightly reduced font size */
}

.search-bar {
  margin-left: 40px;
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
  padding: 5px 15px; /* Reduced padding */
  background-color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 10px; /* Reduced gap */
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px; /* Reduced font size */
}

.language-currency {
  display: flex;
  align-items: center;
  gap: 10px; /* Reduced gap */
}

.language {
  display: flex;
  align-items: center;
  gap: 5px;
}

.language .flag {
  width: 15px; /* Reduced flag size */
  height: 10px;
}

/* No border for language and currency dropdowns */
.no-border {
  border: none;
  outline: none;
  font-size: 12px;
  background-color: white;
}

.wishlist {
  text-decoration: none;
  color: #333;
  font-size: 14px; /* Reduced font size */
}

/* Сіра розмита полоска */
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
  padding: 10px 15px; /* Reduced padding */
  margin-top: 5px; /* Reduced margin-top */
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  width: 250px; /* Reduced width */
  background-color:white;
}

.search-bar input {
  width: 100%;
  padding: 8px; /* Reduced padding */
  padding-right: 25px;
  border-radius: 5px;
  background-color: #F1E6E6;
  border: none; /* No border */
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
  width: 15px; /* Reduced icon size */
}

/* Move logo 50px left instead of 100px */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: -230px; /* Reduced margin */
  text-decoration: none;
}

.logo img {
  width: 60px; /* Reduced logo size */
}

.logo h1 {
  color:#111111;
  font-size: 20px; /* Reduced font size */
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 900;
}

.user-cart {
  display: flex;
  gap: 10px; /* Reduced gap */
  position: relative;
}

.user-cart .icon {
  width: 30px; /* Reduced icon size */
}

.nav-menu {
  background-color: rgba(107, 31, 31, 0.09);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 0; /* Reduced padding */
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
  padding: 8px 10px; /* Reduced padding */
  font-size: 14px; /* Reduced font size */
  border-bottom: 3px solid transparent;
  transition: border-bottom 0.3s ease, background-color 0.3s ease; /* Add transition */
}

.nav-menu a:hover {
  border-bottom: 3px solid #6B1F1F;
  background-color: white;
}



</style>
