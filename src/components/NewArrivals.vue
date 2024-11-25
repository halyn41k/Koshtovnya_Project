<template>
  <section class="popular-goods">
    <h2 class="section-title">{{ $t('newArrivals') }}</h2>
    <div class="arrow-container">
      <img
        src="@/assets/left_arrow.png"
        alt="left-arrow"
        class="arrow left-arrow"
        @click="showPreviousProducts"
      />
      <div class="product-grid">
        <div
          v-for="product in visibleProducts"
          :key="product.id"
          class="product-column"
        >
          <!-- Додаємо router-link для обгортки картки -->
          <router-link :to="`/productpage/${product.id}`" class="product-card-link">
            <div class="product-card">
              <img
                :src="product.image_url"
                alt="product-image"
                class="product-main-image"
              />
              <div class="product-details">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">{{ product.price }} грн</p>
              </div>
              <p class="material-wishlist">
                <span class="product-material">{{ product.bead_producer_name }}</span>
                <span class="wishlist-icon" @click.stop="toggleWishlist(product)">
                  <svg
                    v-if="product.is_in_wishlist"
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
                </span>
              </p>
              <button class="buy-button">
                <span>{{ $t('buyButton') }}</span>
                <img
                  src="@/assets/miniarrow.png"
                  alt="Arrow icon"
                  class="button-icon"
                />
              </button>
            </div>
          </router-link>
        </div>
      </div>
      <img
        src="@/assets/arrow_big.png"
        alt="right-arrow"
        class="arrow right-arrow"
        @click="showNextProducts"
      />
    </div>
    <div class="dots-container">
      <span
        v-for="(dot, index) in totalPages"
        :key="index"
        :class="['dot', index === currentPage ? 'dark' : 'light']"
      ></span>
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
    productsPerPage: 3, // Змінено на 3 для відображення трьох карточок
    totalPages: 0,
    wishlist: [],
  };
},
methods: {
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

  async fetchPopularProducts() {
    try {
      const response = await fetch("http://26.235.139.202:8080/api/new-arrivals");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      this.products = data.data;
      this.updateVisibleProducts();
      this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
    } catch (error) {
      console.error("Error fetching popular products:", error.message);
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
  this.fetchPopularProducts();
},
};
</script>


<style scoped>
.product-card-link {
text-decoration: none;
color: inherit;
display: block;
}
.product-card-link:hover .product-card {
transform: translateY(-5px);
}

 .section-title {
  color: #222222;
  font-family: 'KyivType Titling', sans-serif; 
  font-weight: 900;
  font-size: 32px; 
  text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
  letter-spacing: -2px;
  text-align: center;
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
gap: 40px; /* Відстань між карточками */
flex-wrap: nowrap; /* Не обертати рядок */
padding: 0;
max-width: 900px; /* Обмеження ширини для трьох карточок */
margin: 0 auto; /* Вирівнювання по центру */
}


.product-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin: 0;
}

.product-column {
  flex-grow: 1;
  flex-basis: 280px;
  max-width: 280px;
  margin: 0;
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
  height: 390px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-main-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  transition: transform 0.3s ease;
}

.product-card:hover .product-main-image {
  transform: scale(1.05);
}

.product-details {
  color: #333;
  padding: 10px;
  font-family: 'Merriweather', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
}

.product-title,
.product-price,
.product-info {
  margin-top: 0px;
  color:#000;
  text-align: left; 
}

.product-price {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a01212;
  margin-top: -5px;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
  color: #808080;
}

.product-material-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product-material-icon:hover {
  transform: scale(1.1);
}

.button-icon{
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.buy-button {
  border-radius: 10px;
  background-color: #6b1f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
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
  width: 20px;
  height: 15px;
  margin-left: auto;
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
  background-color: #480B0B;
  opacity: 75%;
}

.dot.light {
  background-color: #480B0B;
  opacity: 25%;
}

.wishlist-icon {
  width: 30px;
  height: 30px;
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

.view-products-button {
font-family: 'Merriweather', sans-serif;
color: #fff;
background-color: #6B1F1F;
border: none;
padding: 10px 20px;
border-radius: 8px;
cursor: pointer;
font-size: 18px;
margin-top: 50px; 
transition: background-color 0.3s ease, transform 0.3s ease;

}

.view-products-button:hover {
  background-color: #a01212;
}

.buy-button {
border-radius: 10px;
background-color: #6b1f1f;
display: flex;
justify-content: space-between;
align-items: center;
padding: 12px 15px;
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


.material-wishlist {
display: flex;
justify-content: space-between; /* Розташування тексту і сердечка */
align-items: center;
margin-left: 2px;
margin-right: 9px;
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

</style>