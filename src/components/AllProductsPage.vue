<template> 
  <section class="products-section">
    <aside class="sidebar">
      <FilterComponent />
    </aside>
    <main class="main-content">
      <h1 class="section-title">Всі вироби</h1>
      <div class="products-grid">
        <article
          v-for="product in products"
          :key="product.id"
          :class="['product-card', { 'special-background': product.id === 3 || product.id === 5 }]">
          <!-- Використовуємо router-link для створення переходу на сторінку продукту -->
          <router-link :to="`/productpage/${product.id}`" class="product-card-link">
            <div class="image-container">
              <img :src="product.image_url" :alt="product.name" class="product-image" />
            </div>
            <div class="product-info">
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">{{ product.price }} грн</p>
              <div class="material-wishlist">
                <p class="product-material">{{ product.bead_producer_name }}</p>
                <div class="wishlist-icon" @click="toggleWishlist(product)">
                  <svg
                    v-if="isInWishlist(product.name)"
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
          </router-link>
        </article>
      </div>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ 'active': currentPage === page }"
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
import axios from 'axios';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'AllProducts',
  components: {
    FilterComponent: defineAsyncComponent(() => import('./FilterComponent.vue')),
    CategoryProduct: defineAsyncComponent(() => import('./CategoryProduct.vue')),
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 15,
      wishlist: [],
    };
  },
  methods: {
    async fetchProducts(page = 1) {
      try {
        const response = await axios.get(`http://26.235.139.202:8080/api/products?page=${page}`);
        this.products = response.data.data; // Отримуємо масив продуктів
        this.totalPages = response.data.meta.last_page; // Визначаємо кількість сторінок
        this.currentPage = response.data.meta.current_page; // Оновлюємо поточну сторінку
      } catch (error) {
        console.error('Помилка завантаження продуктів:', error);
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.fetchProducts(page);
      }
    },
    isInWishlist(productName) {
      return this.wishlist.includes(productName);
    },
    toggleWishlist(product) {
      if (this.isInWishlist(product.name)) {
        this.wishlist = this.wishlist.filter(item => item !== product.name);
        alert(`${product.name} видалено зі списку бажаного!`);
      } else {
        this.wishlist.push(product.name);
        alert(`${product.name} додано до списку бажаного!`);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* Font import */
@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

/* Layout for the main product section */
.products-section {
  display: flex;
  padding: 20px;
  justify-content: center;
  margin-top: 150px;
}

.main-content {
  flex-grow: 1;
  max-width: 1200px;
}

/* Title styling */
.section-title {
  color: #333;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 900;
  text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
  letter-spacing: -2px;
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  margin-bottom: 40px;
}

/* Grid to display products */
.products-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
}

/* Card container */
.product-card {
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

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Image container */
.image-container {
  width: 100%;
  height: 180px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  color: #333;
  padding: 10px;
  font-family: 'Merriweather', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
  text-decoration: none;
  color: inherit;
  gap: 10px; /* Збільшити відступи між елементами */
  position: relative; /* Додаємо для позиціонування серця */
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px; /* Зменшуємо відступ між назвою і ціною */
}

.product-price {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a01212;
  margin-top: -230px; /* Забираємо зайвий відступ */
}

.product-material {
  font-size: 16px;
  color: #808080;
  margin-top: -210px; /* Забираємо зайвий відступ */
}

.material-wishlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute; /* Позиціонуємо в середині card */
  width: 100%;
  margin-top: 220px;
}
.wishlist-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-left: -100px;
  
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


/* Buy button styling */
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
  margin-top: -190px; 
}

.buy-button:hover {
  background-color: #a01212;
  transform: translateY(-2px);
}

.buy-button span {
  text-align: left;
}

.buy-button img {
  width: 20px;
  height: 15px;
  margin-left: auto;
}

.button-icon {
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
.product-card-link {
  text-decoration: none; /* Прибираємо підкреслення */
  color: inherit; /* Забираємо зміни кольору тексту */
}

/* При фокусі або наведенні */

</style>
