<template>
  <div class="order-history">
    <h2 class="order-history-title">Історія замовлень</h2>
    <div v-if="orders.length === 0" class="no-orders">
      Ви не розмістили жодного замовлення :(
    </div>
    <div v-else>
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <span class="item-number">{{ index + 1 }}.</span>
        <div class="item-content">
          <img :src="order.imageSrc" alt="Product Image" class="item-image" />
          <div class="item-details">
            <div class="item-header">
              <span class="item-title">{{ order.title }}</span>
              <span class="item-price">{{ order.price }}₴</span>
            </div>
            <p class="item-quantity">Кількість: {{ order.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="order-status">Статус: {{ orders.length > 0 ? orders[0].status : 'В очікуванні' }}</p>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  data() {
    return {
      orders: [
        { title: 'Товар 1', price: '750₴', quantity: 2, imageSrc: 'path_to_image', status: 'В очікуванні' },
        { title: 'Товар 2', price: '150₴', quantity: 1, imageSrc: 'path_to_image', status: 'Доставлено' },
      ]
    };
  }
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
