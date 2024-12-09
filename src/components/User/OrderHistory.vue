<template>
  <div class="order-history">
    <h2 class="order-history-title">Історія замовлень</h2>

    <!-- Show Loader while loading orders -->
    <Loader v-if="loading" />

    <!-- Show message if no orders found -->
    <div v-else-if="orders.length === 0" class="no-orders">
      Ви не розмістили жодного замовлення :(
    </div>

    <!-- Show order details if there are orders -->
    <div v-else>
      <div class="order-item" v-for="(order, index) in orders" :key="index">
        <div class="order-header">
          <span class="order-number">Замовлення №{{ order.id }}</span>
          <span class="order-status">Статус: {{ order.status }}</span>
        </div>
        <div class="order-details">
          <div v-for="(item, i) in order.items" :key="i" class="order-product">
            <img :src="item.image_url" alt="Product Image" class="order-product-image" />
            <div class="order-product-info">
              <h3>{{ item.title }}</h3>
              <p>Кількість: {{ item.quantity }}</p>
              <p>Ціна: {{ item.price }}₴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue'; // Import the loader component

export default {
  name: 'OrderHistory',
  components: {
    Loader, // Register the loader component
  },
  data() {
    return {
      orders: [],
      loading: true, // Initially loading is true
    };
  },
  methods: {
    async fetchOrders() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Будь ласка, увійдіть у свій обліковий запис.');
        this.$router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://26.235.139.202:8080/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Transform the response data to match the desired structure
        this.orders = response.data.orders.map((order) => ({
          id: order.id,
          status: order.status,
          items: order.items.map((item) => ({
            title: item.name,
            price: item.price,
            quantity: item.quantity,
            image_url: item.image_url || 'default_image_path',
          })),
        }));
      } catch (error) {
        console.error('Помилка завантаження замовлень:', error);
        alert('Не вдалося завантажити ваші замовлення.');
      } finally {
        this.loading = false; // Hide the loader after fetching is complete
      }
    },
  },
  mounted() {
    document.title = 'Історія замовлень';
    this.fetchOrders();
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@400;700&family=Montserrat:wght@600&display=swap');

* {
  font-family: 'Merriweather', serif;
  box-sizing: border-box;
}

.order-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-left: -10px;
}

.order-history-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.no-orders {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 30px;
}

.order-item {
  display: flex;
  background-color: #F5EAE9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s;
}

.order-item:hover {
  transform: scale(1.02);
}

.item-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #333;
  margin-right: 20px;
  margin-top: 10px;
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

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
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

.item-quantity {
  font-size: 16px;
  font-family: 'Merriweather', serif;
  font-weight: 600;
  color: #CA7E7E;
  margin-top: 10px;
}

.order-status {
  font-size: 20px;
  font-family: 'Merriweather', serif;
  color: #555;
  text-align: left;
  margin-top: 30px;
}
</style>
