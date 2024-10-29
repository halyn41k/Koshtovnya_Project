<template> 
    <div class="order-history">
      <h2 class="order-history-title">Історія замовлень</h2>
      <div v-if="orders.length === 0" class="no-orders">
        Ви не розмістили жодного замовлення :(
      </div>
      <div v-else>
        <div v-for="(order, index) in orders" :key="index" class="order-item">
          <div class="order-item-header">
            <span class="item-number">{{ index + 1 }}</span>
            <span class="item-title">{{ order.title }}</span>
          </div>
          <div class="order-item-content">
            <img :src="order.imageSrc" alt="Product Image" class="item-image"/>
            <div class="item-details">
              <span class="item-price">Ціна: {{ order.price }}</span>
              <span class="item-quantity">Кількість: {{ order.quantity }}</span>
              <span class="item-total">Всього: {{ order.totalPrice }}</span>
            </div>
          </div>
          <p class="order-status">Статус: {{ order.status || 'Статус не встановлено' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderHistory',
    data() {
      return {
        orders: [
          { title: 'Товар 1', price: '100 грн', quantity: 2, totalPrice: '200 грн', imageSrc: 'path_to_image', status: 'Доставлено' },
          { title: 'Товар 2', price: '150 грн', quantity: 1, totalPrice: '150 грн', imageSrc: 'path_to_image', status: 'Відправлено' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@400;700&display=swap');
  
  * {
    font-family: 'Merriweather', serif;
  }
  
  .order-history {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    text-align: left; /* Вирівнювання по лівій стороні */
  }
  
  .order-history-title {
    font-size: 20px;
    text-align: left; /* Заголовок вирівняний по лівій стороні */
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
    flex-direction: column;
    align-items: flex-start;
    height: 100px;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .order-item-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .item-number {
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .item-title {
    font-size: 14px;
    font-weight: bold;
  }
  
  .order-item-content {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  
  .item-image {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .item-price {
    font-family: 'Inter', sans-serif; /* Шрифт Inter для ціни */
    font-size: 12px;
    color: #A01212;
  }
  
  .item-quantity {
    font-family: 'Inter', sans-serif; /* Шрифт Inter для кількості */
    font-size: 12px;
    color: #CA7E7E;
  }
  
  .item-total {
    font-size: 12px;
    color: #A01212;
  }
  
  .order-status {
    font-size: 14px;
    color: #555;
    margin-top: 6px;
  }
  </style>
  