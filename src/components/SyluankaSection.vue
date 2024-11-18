<template>
  <section class="syluanka-section">
    <aside class="sidebar">
      <FilterComponent />
    </aside>
    <main class="main-content">
      <h1 class="section-title">Силянки</h1>
      <div class="syluanka-grid">
        <article
          v-for="(syluanka, index) in visibleSyluankas"
          :key="index"
          :class="['syluanka-card', { 'special-background': syluanka.id === 3 || syluanka.id === 5 }]"
        >
          <div class="image-container">
            <img :src="syluanka.image" :alt="syluanka.name" class="syluanka-image" />
          </div>
          <div class="syluanka-info">
            <h2 class="syluanka-name">{{ syluanka.name }}</h2>
            <p class="syluanka-price">{{ syluanka.price }}₴</p>
            <div class="material-wishlist">
              <p class="syluanka-material">{{ syluanka.material }}</p>
              <div class="wishlist-icon" @click="toggleWishlist(syluanka)">
                <svg
                  v-if="isInWishlist(syluanka.name)"
                  class="filled-heart"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  v-else
                  class="empty-heart"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
            </div>
            <button class="buy-button">
              <span>Купити</span>
              <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
            </button>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          :class="['page-button', { active: currentPage === page - 1 }]" 
          @click="changePage(page - 1)"
        >
          {{ page }}
        </button>
      </div>
    </main>
  </section>
  <section class="category-product-section">
    <CategoryProduct />
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'SyluankaSection',
  components: {
    FilterComponent: defineAsyncComponent(() =>
      import('./FilterComponent.vue')
    ),
    CategoryProduct: defineAsyncComponent(() =>
      import('./CategoryProduct.vue')
    ),
  },
  data() {
    return {
      syluankas: [
        { id: 1, name: 'Силянка "Гуцулка"', price: 1000, material: 'Чеський бісер', image: require('@/assets/Гуцулка2.png') },
        { id: 2, name: 'Силянка "Лемківська"', price: 1600, material: 'Японський бісер', image: require('@/assets/Лемківська.png') },
        { id: 3, name: 'Силянка "Темна ніч"', price: 800, material: 'Чеський бісер', image: require('@/assets/Темна ніч.png') },
        { id: 4, name: 'Силянка "Класична"', price: 650, material: 'Китайський бісер', image: require('@/assets/Класична.png') },
        { id: 5, name: 'Силянка "Хризантеми"', price: 550, material: 'Китайський бісер', image: require('@/assets/Хризантеми.png') },
        { id: 6, name: 'Силянка "Готична"', price: 1480, material: 'Японський бісер', image: require('@/assets/Готична.png') },
        { id: 7, name: 'Силянка "Гуцульська"', price: 1100, material: 'Чеський бісер', image: require('@/assets/Гуцульська.png') },
        { id: 8, name: 'Силянка "Традиційна"', price: 1530, material: 'Японський бісер', image: require('@/assets/Традиційна.png') },
        { id: 9, name: 'Силянка "Веселка"', price: 1030, material: 'Китайський бісер', image: require('@/assets/Веселка.png') },
        { id: 10, name: 'Силянка "Прозора"', price: 1450, material: 'Чеський бісер', image: require('@/assets/Прозора.png') },
        { id: 11, name: 'Силянка "Червоні квіти"', price: 1390, material: 'Японський бісер', image: require('@/assets/Червоні квіти.png') },
        { id: 12, name: 'Силянка "Білосніжна"', price: 550, material: 'Китайський бісер', image: require('@/assets/Білосніжна.png') },
      ],
      currentPage: 0,
      itemsPerPage: 15,
      wishlist: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.syluankas.length / this.itemsPerPage);
    },
    visibleSyluankas() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.syluankas.slice(start, end);
    }
  },
  methods: {
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.currentPage = page;
      }
    },
    isInWishlist(productName) {
      return this.wishlist.includes(productName);
    },
    toggleWishlist(syluanka) {
      if (this.isInWishlist(syluanka.name)) {
        this.wishlist = this.wishlist.filter(item => item !== syluanka.name);
        alert(`${syluanka.name} видалено зі списку бажаного!`);
      } else {
        this.wishlist.push(syluanka.name);
        alert(`${syluanka.name} додано до списку бажаного!`);
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
  .syluanka-section {
    display: flex;
    padding: 20px;
    justify-content: center;
    margin-top: 150px;
  }
  
  .main-content {
    flex-grow: 1;
    max-width: 1200px;
  }
  
  .section-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif; /* Changed to Heavy2 font */
    font-weight: 900; 
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    margin-top: 50px;
    font-size: 30px;
    margin-bottom: 40px;
  }
  
  .syluanka-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .syluanka-card {
    border-radius: 12px;
    background-color: #fff7f6;
    padding-bottom: 15px;
    border: 2px solid #e6e6e6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    width: 280px;
    height: 390px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .syluanka-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    width: 100%;
    height: 180px;
  }
  
  .syluanka-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .syluanka-card:hover .syluanka-image {
    transform: scale(1.05);
  }
  
  .syluanka-info {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }
  
  .syluanka-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .syluanka-price {
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #a01212;
    margin-top: -5px;
  }
  
  .syluanka-material {
    font-size: 16px;
    color: #808080;
    margin-top: -20px;
  }
  
  .material-wishlist {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .wishlist-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-top: -30px;
  }
  
  .wishlist-icon:hover {
    transform: scale(1.1);
  }
  
  .filled-heart {
    fill: #A01212;
  }
  
  .empty-heart {
    stroke: #B3B3B3;
    stroke-width: 2;
    fill: none;
  }
  
  .buy-button {
    border-radius: 10px;
    background-color: #6b1f1f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    width: 100%;
    font-family: 'Merriweather', sans-serif;
    font-size: 18px;
    text-transform: none;
    padding-left: 15px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .buy-button:hover {
    background-color: #a01212;
    transform: translateY(-2px);
  }
  
  .buy-button span {
    text-align: left;
  }
  
  .buy-button img {
    width: 40px;
    height: 30px;
    margin-left: auto;
  }
  .buy-button img {
  width: 20px;
  height: 15px;
  margin-left: auto;
}

.button-icon{
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
  </style>
  
  
  <style scoped>
  @font-face {
    font-family: 'KyivType Titling';
    src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  .syluanka-section {
    display: flex;
    padding: 20px;
    justify-content: center;
    margin-top: 150px;
  }
  
  .main-content {
    flex-grow: 1;
    max-width: 1200px;
  }
  
  .section-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif; /* Changed to Heavy2 font */
    font-weight: 900; 
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    margin-top: 50px;
    font-size: 30px;
    margin-bottom: 40px;
  }
  
  .syluanka-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .syluanka-card {
    border-radius: 12px;
    background-color: #fff7f6;
    padding-bottom: 15px;
    border: 2px solid #e6e6e6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    width: 280px;
    height: 390px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .syluanka-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    width: 100%;
    height: 180px;
  }
  
  .syluanka-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .syluanka-card:hover .syluanka-image {
    transform: scale(1.05);
  }
  
  .syluanka-info {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }
  
  .syluanka-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .syluanka-price {
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #a01212;
    margin-top: -5px;
  }
  
  .syluanka-material {
    font-size: 16px;
    color: #808080;
    margin-top: -20px;
  }
  
  .material-wishlist {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .wishlist-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-top: -30px;
  }
  
  .wishlist-icon:hover {
    transform: scale(1.1);
  }
  
  .filled-heart {
    fill: #A01212;
  }
  
  .empty-heart {
    stroke: #B3B3B3;
    stroke-width: 2;
    fill: none;
  }
  
  .buy-button {
    border-radius: 10px;
    background-color: #6b1f1f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    width: 100%;
    font-family: 'Merriweather', sans-serif;
    font-size: 18px;
    text-transform: none;
    padding-left: 15px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .buy-button:hover {
    background-color: #a01212;
    transform: translateY(-2px);
  }
  
  .buy-button span {
    text-align: left;
  }
  
  .buy-button img {
    width: 40px;
    height: 30px;
    margin-left: auto;
  }
  .buy-button img {
  width: 20px;
  height: 15px;
  margin-left: auto;
}

.button-icon{
  width: 10px;
  height: 10px;
  margin-right: 5px;
}


.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  border: 2px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 6px;
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  transition: all 0.3s ease; /* Додаємо плавний перехід */
}

.pagination button:hover {
  background-color: #6b1f1f; /* Колір фону при ховері */
  color: white; /* Колір тексту при ховері */
  transform: scale(1.1); /* Збільшення кнопки */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тінь навколо кнопки */
}

.pagination button.active {
  background-color: #6b1f1f;
  color: white;
}
  </style>
  