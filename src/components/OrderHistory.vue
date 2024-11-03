<template> 
  <div class="order-history">
    <h2 class="order-history-title">Історія замовлень</h2>
    <div v-if="orders.length === 0" class="no-orders">
      Ви не розмістили жодного замовлення :(
    </div>
    <div v-else>
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <span class="item-number">{{ index + 1 }}.</span>
        <img :src="order.imageSrc" alt="Product Image" class="item-image"/>
        <div class="item-details">
          <span class="item-title">{{ order.title }}</span>
          <span class="item-price">{{ order.price }} / за штуку</span>
          <span class="item-quantity">Кількість: {{ order.quantity }}</span>
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
}

.order-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.order-history-title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 10px;
}

.no-orders {
  font-size: 16px;
  color: #666;
  text-align: left;
  margin-top: 10px;
}

.order-item {
  display: flex;
  align-items: flex-start;
  background-color: #F5EAE9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.item-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px;
  font-weight: 600;
  color: #333;
  margin-right: 20px;
  margin-top: 50px;
  margin-left: -80px;
}

.item-image {
  width: 180px;
  height: 180px;
  margin-right: 20px;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 20px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.item-price {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #A01212;
  margin-bottom: 10px;
}

.item-quantity {
  font-size: 20px;
  font-family: 'Merriweather', serif;
  font-weight: bold;
  color: #CA7E7E;
}

.order-status {
  font-size: 25px;
  font-family: 'Merriweather', serif;
  color: #555;
  text-align: left;
  margin-top: 30px;
}
</style>
