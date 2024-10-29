<template>
    <header class="account-header">
      <!-- Account Title with Side Lines and Custom Font Style -->
      <h1 class="account-title-container">
        <div class="line"></div>
        <span class="account-title">Ваш аккаунт</span>
        <div class="line"></div>
      </h1>
    </header>
    <main class="account-page">
      <section class="account-content">
        <!-- Sidebar menu -->
        <div class="account-sidebar">
          <nav class="profile-menu">
            <ul class="menu-list">
              <li
                class="menu-item"
                v-for="(menuItem, index) in menuItems"
                :key="index"
                @click="selectTab(index)"
                :class="{ active: activeTab === index }"
              >
                <img :src="menuItem.icon" class="menu-icon" 
                     :class="{ 'user-icon': menuItem.title === 'Інформація', 'heart-icon': menuItem.title === 'Список бажаного' }" 
                     alt="Icon" />
                <h2 class="section-title">{{ menuItem.title }}</h2>
              </li>
            </ul>
          </nav>
        </div>
  
        <!-- Account information content -->
        <div class="account-details">
          <component :is="activeTabContent" 
                     :firstName="firstName" 
                     :lastName="lastName" 
                     :email="email" />
        </div>
      </section>
    </main>
  </template>
  
  <script>
  import PersonalInfo from './PersonalInfo.vue';
  import Addresses from './UserAddresses.vue';
  import OrderHistory from './OrderHistory.vue';
  import Wishlist from './UserWishlist.vue';
  
  export default {
    name: 'AccountInfo',
    components: {
      PersonalInfo,
      Addresses,
      OrderHistory,
      Wishlist,
    },
    data() {
      return {
        activeTab: 0,
        firstName: 'Ім’я', // Fill with actual values
        lastName: 'Прізвище', // Fill with actual values
        email: 'email@example.com', // Fill with actual values
        menuItems: [
          { title: 'Інформація', icon: require('@/assets/user.png') },
          { title: 'Адреси', icon: require('@/assets/location.png') },
          { title: 'Історія замовлень', icon: require('@/assets/history.png') },
          { title: 'Список бажаного', icon: require('@/assets/heart.png') },
          { title: 'Вийти', icon: require('@/assets/exit.png') },
        ],
      };
    },
    computed: {
      activeTabContent() {
        switch (this.activeTab) {
          case 0: return 'PersonalInfo';
          case 1: return 'Addresses';
          case 2: return 'OrderHistory';
          case 3: return 'Wishlist';
          case 4: return 'Logout';
          default: return 'PersonalInfo';
        }
      },
    },
    methods: {
      selectTab(index) {
        if (index === 4) { // Assuming "Вийти" is the last tab
          this.$router.push('/login');
        } else {
          this.activeTab = index;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @font-face {
    font-family: 'KyivType Titling';
    src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  
  * {
    font-family: 'Merriweather', sans-serif;
  }
  
  .account-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .account-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
  }
  
  .line {
    flex: 1;
    height: 2px;
    background-color: grey;
    margin: 0 10px;
    margin-top: 120px;
  }
  
  .account-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif;
    font-weight: 900;
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    font-size: 30px;
    margin-bottom: 40px;
    margin-top: 150px;
  }
  
  .account-page {
    display: flex;
    flex-direction: column;
    max-width: 1300px;
    margin: 0 auto;
    height: 450px;
    background-color: #FFF7F6;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-image: url('@/assets/accountpattern.png');
    background-position: right;
    background-repeat: no-repeat;
    background-size: 50%;
  }
  
  .account-content {
    display: flex;
    margin-top: 20px;
  }
  
  .account-sidebar {
    border-right: 1px solid #ddd;
    padding: 20px;
    width: 250px;
  }
  
  .profile-menu {
    display: flex;
    flex-direction: column;
  }
  
  .menu-list {
    align-items: left;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-item {
    margin: 15px 0;
    align-items: center;
    display: flex;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .menu-item.active {
    background-color: #F6E7E7;
  }
  
  .menu-item:hover {
    background-color: #F6E7E7;
  }
  
  .menu-icon {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
  
  .user-icon {
    width: 23px;
    transform: translate(3px, 2px);
    margin-left: 3px;
  }
  
  /* Change heart icon to black */
  .heart-icon {
    filter: brightness(0);
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    cursor: pointer;
    color: #6b1f1f;
  }
  
  .account-details {
    width: calc(100% - 250px);
    padding-left: 20px;
    padding-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    .account-content {
      flex-direction: column;
    }
  
    .account-sidebar,
    .account-details {
      width: 100%;
      padding: 0;
    }
  
    /* Adjust background image for smaller screens */
    .account-page {
      background-size: cover;
      background-position: center;
    }
  }
  </style>
  