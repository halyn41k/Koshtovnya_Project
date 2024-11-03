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
      <!-- Підключаємо компонент Summary -->
      <Summary />
    </div>
  </main>
</template>

<script>
import CartItem from './CartItem.vue';
import Summary from './Summary.vue';

export default {
  name: 'CartShopPage',
  components: {
    CartItem,
    Summary,
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
  padding-top: 200px;
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
}
</style>
