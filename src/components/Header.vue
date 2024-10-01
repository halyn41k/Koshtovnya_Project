<template>
  <header class="header">
    <div class="top-bar">
      <ul class="nav-links">
        <li><a href="#">Про нас</a></li>
        <li><a href="#">Про оплату | Доставку</a></li>
      </ul>

      <div class="language-currency">
        <div class="language">
          <img :src="currentFlag" :alt="selectedLanguage + ' Flag'" class="flag">
          <select v-model="selectedLanguage" class="dropdown">
            <option value="uk">Українська</option>
            <option value="en">English</option>
          </select>
        </div>

        <div class="currency">
          <select v-model="selectedCurrency" class="dropdown">
            <option value="UAH">UAH ₴</option>
            <option value="USD">USD $</option>
          </select>
        </div>
        <a href="#" class="wishlist">Список бажаного</a>
      </div>
    </div>

    <div class="main-header">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Пошук в нашому каталозі">
        <div class="search-icon">
          <img src="@/assets/magnifying-glass-svgrepo-com.svg" alt="Search Icon">
        </div>
      </div>

      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo">
        <h1>Коштовня</h1>
      </div>

      <div class="user-cart">
        <a href="#" class="user-icon">
          <img src="@/assets/user-svgrepo-com (1).svg" alt="User Icon" class="icon">
        </a>
        <a href="#" class="cart-icon">
          <img src="@/assets/cart-svgrepo-com.svg" alt="Cart Icon" class="icon">
          <span class="cart-count">1</span>
        </a>
      </div>
    </div>

    <nav class="nav-menu">
      <ul>
        <li><a href="#">Браслети</a></li>
        <li><a href="#">Гердани</a></li>
        <li><a href="#">Дукати</a></li>
        <li><a href="#">Силянки</a></li>
        <li><a href="#">Сережки</a></li>
        <li><a href="#">Пояси</a></li>
      </ul>
    </nav>
  </header>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedLanguage: 'uk',
      selectedCurrency: 'UAH',
    };
  },
  computed: {
    currentFlag() {
      return this.selectedLanguage === 'uk'
        ? 'https://flagcdn.com/w320/ua.png'
        : 'https://flagcdn.com/w320/gb.png'; // Change to English flag
    },
  },
  methods: {
    search() {
      console.log('Searching for:', this.searchQuery);
    },
  },
};
</script>

  
  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
  
    @font-face {
      font-family: 'KyivType Titling';
      src: url('C:/Users/halyn/koshtovnya_website/src/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Bold.ttf') format('truetype');
      font-weight: bold;
      font-style: normal;
    }
  
    @font-face {
      font-family: 'KyivType Titling';
      src: url('C:/Users/halyn/koshtovnya_website/src/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Black2.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
    }
  
    /* Updated top-bar styling */
    .top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 10px;
  font-family: 'Merriweather', serif;
  font-weight: bold;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}

.language-currency {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Merriweather', serif;
}

.language {
  display: flex;
  align-items: center;
  gap: 3px; /* Add space between the flag and dropdown */
  margin-top: 1px; /* Lowers the flag and dropdown by 1px */
}

.language-currency .flag {
  width: 20px;
  height: 15px;
}

.dropdown {
  border: 1px solid #ccc;
  padding: 2px;
  font-size: 12px;
  background-color: white;
  border: none; /* Remove border from dropdown */
}

.wishlist {
  text-decoration: none;
  color: #333;
  padding-bottom: 2px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 10px 10px;
}

.search-bar {
  font-family: 'Merriweather', serif;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  width: 300px; /* Adjusted width for alignment */
}

.search-bar input {
  font-family: 'Merriweather', serif;
  background-color: rgba(107, 31, 31, 0.09);
  
  font-size: 13px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  padding-right: 30px; /* Add space for the search icon */
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(107, 31, 31, 0.09);
}

.search-icon img {
  width: 20px; /* Reduced size of the search icon */
  height: auto;
  color: rgba(107, 31, 31, 0.09);
}

.logo {
  display: flex;
  align-items: center; /* Vertically align the logo and text */
  gap: 10px; /* Space between the logo and text */
  margin-top: -10px;
  margin-left: -140px; /* Moves the logo and text 20px to the left */
}

.logo img {
  width: 80px;
  height: auto;
}

.logo h1 {
  font-size: 24px;
  margin: 0;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 900;
  color: black;
  text-align: center;
  
}


.user-cart {
  display: flex;
  gap: 15px;
}

.icon {
  width: 40px;
  height: 40px;
}

.cart-count {
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -10px;
  right: -10px;
}

.nav-menu {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: rgba(107, 31, 31, 0.09);
  padding: 5px 0;
  
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
  margin: 0;
  padding: 0;
}

.nav-menu a {
  display: inline-block;
  text-decoration: none;
  color: #6B1F1F;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: bold;
  padding: 10px 15px;
  border: 1px solid transparent;
  margin: 0;
  
}

.nav-menu li:not(:last-child) a {
  border-right: 1px solid #6B1F1F;
}

.nav-menu a:hover {
  background-color: rgba(107, 31, 31, 0.09);
  border-color: #6B1F1F;
}


  </style>
  