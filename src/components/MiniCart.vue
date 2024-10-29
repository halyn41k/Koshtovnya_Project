<template>
    <section class="mini-cart">
      <header class="cart-header">
        <h1 class="cart-title">Ваш кошик</h1>
      </header>
      <main class="cart-content">
        <CartItem
          v-for="(item, index) in items"
          :key="item.id"
          :item-number="index + 1"
          :image-src="item.imageSrc" 
          :item-name="item.name"
          :price="item.price"
          :quantity="item.quantity"
        />
      </main>
      <footer class="cart-summary">
        <div class="summary-details">
          <div class="summary-text">
            <h2 class="summary-title">Сума до оплати</h2>
            <p class="summary-subtitle">Загальна сума</p>
          </div>
          <p class="summary-total">{{ total }}₴</p>
        </div>
        <button class="checkout-button">
          <span>Перейти до оплати</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="checkout-icon" />
        </button>
      </footer>
    </section>
  </template>
  
  <script>
  import CartItem from './MiniCartItem.vue';
  
  export default {
    name: 'MiniCart',
    components: {
      CartItem,
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
  };
  </script>
  
  <style scoped>
  .mini-cart {
    position: absolute; /* Дозволяє позиціонування міні-картки */
    top: 60px; /* Відступ зверху на 60 пікселів */
    right: 0; /* Вирівнювання по правому краю */
    background-color: #fffcfc; /* Фон міні-картки */
    max-width: 400px; /* Задайте ширину міні-картки */
    border: 1px solid #ccc; /* Межа міні-картки */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Тінь для кращого вигляду */
    z-index: 1000; /* Переконайтеся, що міні-картка поверх інших елементів */
  }
  
  .cart-header {
    background-color: rgba(152, 115, 110, 0.2);
    padding: 20px; /* Зменшено відступ для заголовка */
  }
  
  .cart-title {
    color: #000;
    font: 600 24px/1.3 "Kyiv * Type Titling", -apple-system, Roboto, Helvetica, sans-serif; /* Зменшено шрифт */
    letter-spacing: -1px;
    text-shadow: 0 2px 2px rgba(99, 2, 2, 0.22); /* Зменшено тінь */
  }
  
  .cart-content {
    background-color: rgba(255, 247, 246, 0.42);
    padding-bottom: 20px; /* Зменшено відступ внизу */
  }
  
  .cart-summary {
    background-color: #fff7f6;
    border: 2px solid #e6e6e6;
    border-radius: 12px; /* Зменшено радіус */
    margin: 20px; /* Зменшено відступ */
    padding: 20px; /* Зменшено відступ */
  }
  
  .summary-details {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px; /* Зменшено проміжок */
  }
  
  .summary-text {
    font-family: Merriweather, sans-serif;
    color: #000;
  }
  
  .summary-title {
    font-size: 20px; /* Зменшено шрифт заголовка */
    font-weight: 700;
  }
  
  .summary-subtitle {
    font-size: 16px; /* Зменшено шрифт підзаголовка */
    margin-top: 10px; /* Зменшено відступ */
  }
  
  .summary-total {
    color: #a01212;
    font: 600 18px Inter, sans-serif; /* Зменшено шрифт */
    text-align: right;
    align-self: flex-end;
    margin-top: 20px; /* Зменшено відступ */
  }
  
  .checkout-button {
    background-color: #6b1f1f;
    border: none;
    border-radius: 5px; /* Зменшено радіус */
    color: #fff;
    display: flex;
    font: 700 14px Merriweather, sans-serif; /* Зменшено шрифт */
    gap: 10px; /* Зменшено проміжок */
    justify-content: space-between;
    margin-top: 15px; /* Зменшено відступ */
    padding: 5px 10px; /* Зменшено відступ */
    width: 100%;
  }
  
  .checkout-icon {
    width: 24px; /* Зменшено розмір іконки */
    height: 24px;
  }
  
  @media (max-width: 991px) {
    .cart-header {
      padding: 0 10px; /* Зменшено відступ */
    }
  
    .cart-summary {
      margin-top: 20px; /* Зменшено відступ */
      padding: 10px; /* Зменшено відступ */
    }
  
    .summary-total {
      margin-top: 10px; /* Зменшено відступ */
    }
  }
  </style>
  