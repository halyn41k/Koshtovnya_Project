<template>
  <div class="wishlist">
    <h2 class="wishlist-title">Список бажань</h2>
    <div v-if="loading" class="loading">Завантаження...</div>
    <div v-else-if="items.length === 0" class="no-items">
      Ваш список бажань порожній :(
    </div>
    <div v-else>
      <div class="wishlist-items">
        <div v-for="(item, index) in items" :key="index" class="wishlist-item">
          <router-link :to="`/productpage/${item.id}`" class="product-link">
            <div class="item-content">
              <span class="item-number">{{ index + 1 }}.</span>
              <img :src="item.imageSrc" alt="Product Image" class="item-image" />
              <div class="item-details">
                <h3 class="item-name">{{ item.title }}</h3>
                <p class="item-price">{{ item.price }}₴</p>
                <button
                  class="buy-button"
                  :disabled="item.loading"
                  @click.prevent="addToCart(item)"
                >
                  {{ item.loading ? "Додається..." : "Додати в кошик" }}
                </button>
              </div>
            </div>
          </router-link>
          <button
            class="remove-button"
            @click.stop="removeItem(index)"
            aria-label="Remove item"
          >
            X
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserWishlist",
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  methods: {
    async fetchWishlist() {
      this.loading = true;
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }
      try {
        const response = await axios.get("http://26.235.139.202:8080/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.items = response.data.products.map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          imageSrc: item.image_url || "default_image_path",
        }));
      } catch (error) {
        console.error("Помилка завантаження списку бажань:", error);
        alert("Не вдалося завантажити ваш список бажаного.");
      } finally {
        this.loading = false;
      }
    },
    async addToCart(item) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Будь ласка, увійдіть у свій обліковий запис.');
    this.$router.push('/login');
    return;
  }

  try {
    // Додавання товару до кошика без передачі quantity
    const cartData = { product_id: item.id };
    const response = await axios.post(
      'http://26.235.139.202:8080/api/cart',
      cartData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('Відповідь після додавання товару:', response.data);  // Логування відповіді

    // Перевірка, чи додавання успішне
    if (response.data && response.data.message === 'Product added to cart') {
      alert('Товар успішно додано до кошика.');

      // Оновлення або повторне завантаження даних кошика, якщо потрібно
    } else {
      console.error('Товари не були додані.');
      alert('Не вдалося додати товар до кошика.');
    }

  } catch (error) {
    console.error('Помилка додавання товару до кошика:', error);
    alert('Не вдалося додати товар до кошика.');
  }
},

  },


  mounted() {
    this.fetchWishlist();
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@400;700&family=Montserrat:wght@600&display=swap');

* {
  font-family: 'Merriweather', serif;
  box-sizing: border-box;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: flex; /* Вирівнюємо елементи flex */
  gap: 20px;
  align-items: center;
}

.wishlist {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-left: -10px;
}

.wishlist-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.no-items {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 30px;
}

.wishlist-items {
  max-height: 500px; /* Встановлюємо максимальну висоту для прокручуваного контейнера */
  overflow-y: auto; /* Додаємо вертикальний скрол */
  padding-right: 10px; /* Для відступу від скролбару */
}

/* Стиль для скроллбару */
.wishlist-items::-webkit-scrollbar {
  width: 8px;
}

.wishlist-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.wishlist-items::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.wishlist-item {
  display: flex;
  background-color: #F5EAE9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s;
}

.wishlist-item:hover {
  transform: scale(1.02);
}

.item-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #333;
}

.item-content {
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.item-name {
  font-size: 18px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: #333;
}

.item-price {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #A01212;
}

.buy-button {
  background-color: #6B1F1F;
  color: #fff;
  font-family: 'Merriweather', sans-serif;
  font-size: 16px;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.buy-button:hover {
  background-color: #a01212;
}

.remove-button {
  background-color: #6B1F1F;
  color: #C4AEAC;
  font-size: 16px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  position: absolute;
  top: 10px;
  right: 10px;
}

.remove-button:hover {
  background-color: #8B0E0E;
}
</style>