<template>
  <section class="belts-section">
    <aside class="sidebar">
      <FilterComponent />
    </aside>
    <main class="main-content">
      <h1 class="section-title">Пояси</h1>
      <div class="belts-grid">
        <article
          v-for="(belt, index) in visibleBelts"
          :key="index"
          :class="['belts-card', { 'special-background': belt.id === 3 || belt.id === 5 }]"
        >
          <div class="image-container">
            <img :src="belt.image" :alt="belt.name" class="belts-image" />
          </div>
          <div class="belts-info">
            <h2 class="belts-name">{{ belt.name }}</h2>
            <p class="belts-price">{{ belt.price }}₴</p>
            <div class="material-wishlist">
              <p class="belts-material">{{ belt.material }}</p>
              <div class="wishlist-icon" @click="toggleWishlist(belt)">
                <svg
                  v-if="isInWishlist(belt.name)"
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
  name: 'BeltsSection',
  components: {
    FilterComponent: defineAsyncComponent(() => import('./FilterComponent.vue')),
    CategoryProduct: defineAsyncComponent(() => import('./CategoryProduct.vue')),
  },
  data() {
    return {
      belts: [
        { id: 1, name: 'Пояс "Маковий сплеск"', price: 1500, material: 'Чеський бісер', image: require('@/assets/Маковий сплеск.png') },
        { id: 2, name: 'Пояс "Сині мрії"', price: 750, material: 'Китайський бісер', image: require('@/assets/Сині мрії.png') },
        { id: 3, name: 'Пояс "Золота симфонія маків"', price: 760, material: 'Китайський бісер', image: require('@/assets/Золота симфонія маків.png') },
        { id: 4, name: 'Пояс "Квітковий акорд"', price: 1490, material: 'Японський бісер', image: require('@/assets/Квітковий акорд.png') },
        { id: 5, name: 'Пояс "Ромбове мереживо"', price: 1120, material: 'Чеський бісер', image: require('@/assets/Ромбове мереживо.png') },
        { id: 6, name: 'Пояс "Гуцульський"', price: 1580, material: 'Японський бісер', image: require('@/assets/Гуцульський2.png') },
        { id: 7, name: 'Пояс "Різнобарвна симфонія"', price: 1160, material: 'Чеський бісер', image: require('@/assets/Різнобарвна симфонія.png') },
        { id: 8, name: 'Пояс "Ромбові відблиски"', price: 700, material: 'Китайський бісер', image: require('@/assets/Ромбові відблиски.png') },
        { id: 9, name: 'Пояс "Квітковий стиль"', price: 1680, material: 'Японський бісер', image: require('@/assets/Квітковий стиль.png') },
        { id: 10, name: 'Пояс "Контрастні ромби"', price: 1400, material: 'Японський бісер', image: require('@/assets/Контрастні ромби.png') },
        { id: 11, name: 'Пояс "Сині зорі"', price: 790, material: 'Китайський бісер', image: require('@/assets/Сині зорі.png') },
        { id: 12, name: 'Пояс "Сніжні ромби"', price: 1080, material: 'Чеський бісер', image: require('@/assets/Сніжні ромби.png') },
      ],
      currentPage: 0,
      itemsPerPage: 15, // кількість елементів на сторінці
      wishlist: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.belts.length / this.itemsPerPage);
    },
    visibleBelts() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.belts.slice(start, end);
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
    toggleWishlist(belt) {
      if (this.isInWishlist(belt.name)) {
        this.wishlist = this.wishlist.filter(item => item !== belt.name);
        alert(`${belt.name} видалено зі списку бажаного!`);
      } else {
        this.wishlist.push(belt.name);
        alert(`${belt.name} додано до списку бажаного!`);
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
  .belts-section {
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
  
  .belts-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .belts-card {
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
  
  .belts-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    width: 100%;
    height: 180px;
  }
  
  .belt-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .belt-card:hover .belt-image {
    transform: scale(1.05);
  }
  
  .belt-info {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }
  
  .belts-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .belts-price {
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #a01212;
    margin-top: -5px;
  }
  
  .belts-material {
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
  .belts-section {
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
  
  .belts-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .belts-card {
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
  
  .belts-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    width: 100%;
    height: 180px;
  }
  
  .belts-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .belts-card:hover .belts-image {
    transform: scale(1.05);
  }
  
  .belts-info {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }
  
  .belts-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .belts-price {
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #a01212;
    margin-top: -5px;
  }
  
  .belts-material {
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
  