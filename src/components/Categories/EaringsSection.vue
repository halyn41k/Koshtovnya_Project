<template>
  <section class="products-section">
    <aside class="sidebar">
      <FilterComponent />
    </aside>
    <main class="main-content">
      <h1 class="section-title">Сережки</h1>
      <div class="products-grid">
        <article
          v-for="product in products"
          :key="product.id"
          :class="['product-card', { 'special-background': product.id === 3 || product.id === 5 }]">
          <router-link :to="`/productpage/${product.id}`" class="product-card-link">
            <div class="image-container">
              <img :src="product.image_url" :alt="product.name" class="product-image" />
            </div>
            <div class="product-info">
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">{{ product.price }} грн</p>
            </div>
          </router-link>
          <p class="material-wishlist">
            <span class="product-material">{{ product.bead_producer_name }}</span>
            <span class="wishlist-icon" @click.stop="toggleWishlist(product)">
              <svg
                v-if="product.is_in_wishlist"
                class="filled-heart"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
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
                stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
            </span>
          </p>
          <button class="buy-button">
            <span>Купити</span>
            <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
          </button>
        </article>
      </div>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ 'active': currentPage === page }">
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
    FilterComponent: defineAsyncComponent(() => import('../FilterComponent.vue')),
    CategoryProduct: defineAsyncComponent(() => import('../CategoryProduct.vue')),
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 15,
      wishlist: [], // Список ID продуктів у списку бажаного
    };
  },
  methods: {
    async fetchProducts(page = 1) {
      try {
        const response = await axios.get(`http://26.235.139.202:8080/api/categories/4/products?page=${page}`);
        this.products = response.data.data;
        this.totalPages = response.data.meta.last_page;
        this.currentPage = response.data.meta.current_page;

        // Завантажуємо список бажаного після отримання продуктів
        await this.fetchWishlist();
      } catch (error) {
        console.error('Помилка завантаження продуктів:', error);
      }
    },
    async fetchWishlist() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Користувач не авторизований');
    return;
  }
  try {
    const response = await axios.get('http://26.235.139.202:8080/api/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Перевіряємо, чи ключ `products` існує в відповіді
    if (response.data && response.data.products) {
      this.wishlist = response.data.products.map((item) => item.id);
    } else {
      console.warn('Некоректна структура відповіді API для списку бажаного:', response.data);
      this.wishlist = [];
    }

    // Синхронізуємо стан продуктів
    this.products.forEach((product) => {
      product.is_in_wishlist = this.isInWishlist(product.id);
    });
  } catch (error) {
    console.error('Помилка завантаження списку бажаного:', error);
  }

},

    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    },
    async toggleWishlist(product) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Будь ласка, увійдіть у свій обліковий запис.');
    this.$router.push('/login');
    return;
  }
  try {
    if (this.isInWishlist(product.id)) {
      // Видалення зі списку бажаного
      await axios.delete(`http://26.235.139.202:8080/api/wishlist/${product.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.wishlist = this.wishlist.filter((id) => id !== product.id);
    } else {
      // Додавання до списку бажаного
      await axios.post(
        'http://26.235.139.202:8080/api/wishlist',
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this.wishlist.push(product.id);
    }
    // Оновлюємо стан продукту напряму
    product.is_in_wishlist = this.isInWishlist(product.id);
  } catch (error) {
    console.error('Помилка при оновленні списку бажаного:', error);
  }
},


    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.fetchProducts(page);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>


<style scoped>
.products-section {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 150px;
}

.main-content {
  flex-grow: 1;
  max-width: 1200px;
}

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

.products-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
}

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
  height: auto;
  min-height: 360px; /* Якщо хочете зберегти мінімальну висоту */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 100%;
  height: 210px;
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
  padding: 15px;
  font-family: 'Merriweather', sans-serif;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
}

.product-name, 
.product-price, 
.product-material {
  margin: 0;
  line-height: 1.8; /* Компактний текст */
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.product-price {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a01212;
}

.product-material {
  font-size: 16px;
  color: #808080;
}

.buy-button {
  border-radius: 7px;
  background-color: #6b1f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px;
  border: none;
  color: #fff;
  cursor: pointer;
  width: 250px;
  font-family: 'Merriweather', sans-serif;
  font-size: 18px;
  text-transform: none;
  padding-left: 15px;
  transition: background-color 0.3s ease;
  margin-left: 15px;
  transform: translateY(-4px);
}

.buy-button:hover {
  background-color: #a01212;
}

.buy-button span {
  text-align: left;
}

.buy-button img {
  width: 20px;
  height: 15px;
}

.material-wishlist {
  display: flex;
  justify-content: space-between; /* Розташування тексту і сердечка */
  align-items: center;
  margin-left: 14px;
  margin-right: 14px;
  transform: translateY(-20px);
}

.product-material {
  font-size: 18px;
  color: #808080;
}

.wishlist-icon {
  width: 24px; /* Розмір іконки */
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
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
  transition: all 0.3s ease;
}

.pagination button:hover {
  background-color: #6b1f1f;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.pagination button.active {
  background-color: #6b1f1f;
  color: white;
}

.product-card-link {
  text-decoration: none;
  color: inherit;
}

</style>
