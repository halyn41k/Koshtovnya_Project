<template>
    <main class="cart">
      <!-- Заголовок з боковими лініями -->
      <header class="cart-header">
        <div class="line"></div>
        <h1 class="main-title">Кошик</h1>
        <div class="line"></div>
      </header>
      <!-- Весь вміст кошика -->
      <div class="cart-content">
        <section class="cart-items">
          <CartItem
            :itemNumber="1"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0bf96480ece714f079c9843f43c1f30f47a5cccc1c7e182979a1be8b68324be8?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5"
            title="Браслет 'Розмаїття кольорів'"
            price="750₴"
            quantity="2"
            totalPrice="1500₴"
          />
          <CartItem
            :itemNumber="2"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d58f1b57332f78186f2422ff9cf0ab91eb0b5a533f0578d1ffbcb6ff8cacb928?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5"
            title="Гердан 'Гуцулка'"
            price="1200₴"
            quantity="1"
            totalPrice="1200₴"
          />
        </section>
        <aside class="cart-summary">
          <div class="summary-content">
            <div class="summary-header">
              <h2 class="summary-title">Сума до оплати</h2>
              <p class="summary-subtitle">Загальна сума</p>
            </div>
            <p class="summary-total">2700₴</p>
          </div>
          <button class="checkout-button">
            Перейти до оплати
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="checkout-icon" />
          </button>
        </aside>
      </div>
    </main>
  </template>
  
  
  <script>
  import CartItem from './CartItem.vue';
  
  export default {
    name: 'CartShopPage',
    components: {
      CartItem,
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
  padding-top: 150px; /* Відступ для опускання всього вмісту */
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
  /* Скопіюйте тут стиль заголовка з About Us */
  color: #333; /* Приклад кольору */
  font-family: 'KyivType Titling Heavy', sans-serif;
  font-weight: 900;
  text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
  letter-spacing: -2px;
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  margin-bottom: 40px;
}

.cart-content {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.cart-items {
  width: 50%;
}

.cart-summary {
  width: 30%;
  border-radius: 8px;
  background-color: rgba(255, 247, 246, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  padding: 12px 6px;
}

/* Зменшені розміри текстів та елементів */
.summary-title {
  font-size: 16px;
  font-weight: 600;
}

.summary-total {
  font-size: 14px;
}

.checkout-button {
  padding: 3px 8px;
  font-size: 12px;
}

.checkout-icon {
  width: 12px;
  height: 12px;
}
</style>
