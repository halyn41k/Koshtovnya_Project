<template>
  <main class="cart">
    <header class="cart-header">
      <div class="line"></div>
      <h1 class="main-title">Кошик</h1>
      <div class="line"></div>
    </header>
    <div class="cart-content">
      <section class="cart-items">
        <div v-if="loading" class="loading">Завантаження...</div>
        <div v-else-if="cartItems.length === 0" class="empty-cart">
          Ваш кошик порожній.
        </div>
        <CartItem
          v-for="(item, index) in cartItems"
          :key="item.id"
          :item-number="index + 1"
          :image-src="item.imageSrc"
          :title="item.title"
          :price="item.price"
          :quantity="item.quantity"
          @change-quantity="updateQuantity(index, $event)"
          @remove-item="removeItem(index)"
        />
      </section>
      <Summary v-if="cartItems.length > 0" :cartItems="cartItems" />
    </div>
  </main>
</template>

<script>
import CartItem from './CartItem.vue'; // Компонент для відображення товару в кошику
import Summary from './Summary.vue'; // Компонент для підсумкової інформації
import axios from 'axios'; // Бібліотека для роботи з API

export default {
  name: 'CartShopPage',
  components: {
    CartItem, // Підключення компоненту товару
    Summary,  // Підключення компоненту підсумків
  },
  data() {
    return {
      cartItems: [], // Масив товарів у кошику
      loading: false, // Стан завантаження
    };
  },
  methods: {
    // Завантаження товарів у кошик
    async fetchCartItems() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }
      try {
        const response = await axios.get("http://26.235.139.202:8080/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.products)) {
          this.cartItems = response.data.products.map((product) => ({
            id: product.id,
            title: product.name || 'Без назви',
            price: product.price || 0,
            quantity: product.quantity || 0,
            imageSrc: product.image_url || "default_image_path",
          }));
        } else {
          console.error("Непередбачувана структура даних:", response.data);
          alert("Отримано некоректні дані.");
        }
      } catch (error) {
        console.error("Помилка завантаження кошика:", error);
        alert("Не вдалося завантажити дані кошика.");
      }
    },

    // Оновлення кількості товару
    updateQuantity(index, newQuantity) {
      this.cartItems[index].quantity = newQuantity;
    },

    // Видалення товару з кошика
    async removeItem(index) {
      const itemToRemove = this.cartItems[index];
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Будь ласка, увійдіть у свій обліковий запис.');
        this.$router.push('/login');
        return;
      }

      try {
        await axios.delete(`http://26.235.139.202:8080/api/cart/${itemToRemove.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.cartItems.splice(index, 1);
        alert(`Товар "${itemToRemove.title}" успішно видалено.`);
      } catch (error) {
        console.error('Помилка видалення товару:', error);
        alert('Не вдалося видалити товар із кошика.');
      }
    },
  },
  mounted() {
    this.fetchCartItems(); // Завантажити товари при завантаженні сторінки
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'KyivType Medium';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeSans-Medium2.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

.cart {
  display: flex;
  flex-direction: column;
  padding: 0 46.67px;
  margin-top: 180px;
  background-image: url('@/assets/cartpattern.png'); /* Додаємо фон */
  background-size: cover;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.line {
  flex: 1;
  height: 1px;
  background-color: grey;
}

.main-title {
  font-family: 'KyivType Titling', sans-serif;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -1.2px;
  text-shadow: 0 2px 3px rgba(99, 2, 2, 0.22);
  text-align: center;
}

.cart-content {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.cart-items {
  width: 50%;
  height: 500px;
  overflow-y: auto; /* Тонкий скрол */
  scrollbar-width: thin; /* Для Firefox */
}

/* Стиль для скроллбару */
.cart-items::-webkit-scrollbar {
  width: 8px;
}

.cart-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.loading {
  text-align: center;
  color: grey;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: grey;
}
</style>
