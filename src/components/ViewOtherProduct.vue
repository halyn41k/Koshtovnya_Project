<template>
  <section class="view-other-products">
    <h2 class="specifications-title">{{ $t('Переглянути інші товари') }}</h2>
    <div class="arrow-container">
      <img src="@/assets/left_arrow.png" alt="left-arrow" class="arrow left-arrow" @click="showPreviousProducts" />
      <div class="product-grid">
        <article v-for="product in visibleProducts" :key="product.id" class="product-card">
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
              <svg v-if="product.is_in_wishlist" class="filled-heart" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg v-else class="empty-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
            </span>
          </p>
          <button class="buy-button">
            <span>{{ $t('buyButton') }}</span>
            <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
          </button>
        </article>
      </div>
      <img src="@/assets/arrow_big.png" alt="right-arrow" class="arrow right-arrow" @click="showNextProducts" />
    </div>
    <div class="dots-container">
      <span v-for="(dot, index) in totalPages" :key="index"
        :class="['dot', index === currentPage ? 'dark' : 'light']"></span>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      visibleProducts: [],
      currentPage: 0,
      productsPerPage: 3,
      totalPages: 0,
      wishlist: [], // Store IDs of products in the wishlist
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://26.235.139.202:8080/api/popular-products");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        this.products = data.data;
        this.updateVisibleProducts();
        this.totalPages = Math.ceil(this.products.length / this.productsPerPage);

        // Fetch the wishlist after products are fetched
        await this.fetchWishlist();
      } catch (error) {
        console.error("Error fetching popular products:", error.message);
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

        // Ensure the response contains products
        if (response.data && response.data.products) {
          this.wishlist = response.data.products.map((item) => item.id);
        } else {
          console.warn('Некоректна структура відповіді API для списку бажаного:', response.data);
          this.wishlist = [];
        }

        // Sync product states with the wishlist
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
          // Remove from wishlist
          await axios.delete(`http://26.235.139.202:8080/api/wishlist/${product.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.wishlist = this.wishlist.filter((id) => id !== product.id);
        } else {
          // Add to wishlist
          await axios.post(
            'http://26.235.139.202:8080/api/wishlist',
            { product_id: product.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.wishlist.push(product.id);
        }

        // Immediately update product's wishlist state
        product.is_in_wishlist = this.isInWishlist(product.id);
      } catch (error) {
        console.error('Помилка при оновленні списку бажаного:', error);
      }
    },

    updateVisibleProducts() {
      const start = this.currentPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      this.visibleProducts = this.products.slice(start, end);
    },

    showPreviousProducts() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateVisibleProducts();
      }
    },

    showNextProducts() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.updateVisibleProducts();
      }
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.specifications-title {
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: center;
  color: #171717;
  margin: 20px 0;
  position: relative;
}

.specifications-title::before,
.specifications-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 35%;
  height: 2px;
  background: grey;
  transform: translateY(-50%);
}

.specifications-title::before {
  left: 0;
}

.specifications-title::after {
  right: 0;
}

.view-other-products {
  margin-top: 70px;
}

.arrow-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;
}

.arrow {
  cursor: pointer;
  width: 40px;
  height: 40px;
  transform: scale(1);
  transition: transform 0.3s ease;
  position: absolute;
  top: 50%;
}

.left-arrow {
  left: 150px;
}

.right-arrow {
  right: 150px;
}

.arrow:hover {
  transform: scale(1.2);
}

.product-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: nowrap;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
}

.product-column {
  flex-grow: 1;
  flex-basis: 280px;
  max-width: 280px;
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
  min-height: 360px;
  /* Якщо хочете зберегти мінімальну висоту */
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
  line-height: 1.8;
  /* Компактний текст */
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
  justify-content: space-between;
  /* Розташування тексту і сердечка */
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
  width: 24px;
  /* Розмір іконки */
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

.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #480b0b;
  opacity: 75%;
}

.dot.light {
  background-color: #480b0b;
  opacity: 25%;
}
</style>
