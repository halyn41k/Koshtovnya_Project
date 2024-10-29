<template>
    <main class="cart">
      <header class="cart-header">
        <div class="header-line"></div>
        <h1 class="cart-title">Кошик</h1>
        <div class="header-line"></div>
      </header>
      <div class="cart-content">
        <section class="cart-items">
          <CartItem
            :itemNumber="1"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0bf96480ece714f079c9843f43c1f30f47a5cccc1c7e182979a1be8b68324be8?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5"
            title="Браслет &quot;Розмаїття кольорів&quot;"
            price="750₴"
            quantity="2"
            totalPrice="1500₴"
          />
          <CartItem
            :itemNumber="2"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d58f1b57332f78186f2422ff9cf0ab91eb0b5a533f0578d1ffbcb6ff8cacb928?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5"
            title="Гердан &quot;Гуцулка&quot;"
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
  .cart {
    display: flex;
    flex-direction: column;
  }
  
  .cart-header {
    display: flex;
    align-items: center;
    gap: 20px; /* Reduced gap */
    color: var(--Grays-Black, #000);
    letter-spacing: -1px;
    font: 700 20px/1.3 'Kyiv * Type Titling', -apple-system, Roboto, Helvetica, sans-serif;
    flex-wrap: wrap;
  }
  
  .header-line {
    flex-grow: 1;
    height: 30px; /* Reduced height */
  }
  
  .cart-title {
    font-feature-settings: "liga" off, "clig" off;
    text-shadow: 0px 2px 2px rgba(99, 2, 2, 0.22);
    margin-top: 15px; /* Reduced margin */
    font-size: 20px; /* Reduced font size */
  }
  
  .cart-content {
    display: flex;
    gap: 10px; /* Reduced gap */
    margin-top: 24px; /* Reduced margin */
  }
  
  .cart-items {
    width: 50%; /* Narrower width */
  }
  
  .cart-summary {
    width: 30%; /* Narrower width */
    border-radius: 16px; /* Reduced border radius */
    background-color: rgba(255, 247, 246, 1);
    border: 1px solid rgba(230, 230, 230, 1);
    padding: 24px 12px; /* Reduced padding */
  }
  
  .summary-content {
    display: flex;
    justify-content: space-between;
  }
  
  .summary-header {
    font-family: Merriweather, sans-serif;
    color: var(--Grays-Black, #000);
  }
  
  .summary-title {
    font-feature-settings: "liga" off, "clig" off;
    font-size: 20px; /* Reduced font size */
    font-weight: 600; /* Adjusted weight */
  }
  
  .summary-subtitle {
    font-feature-settings: "liga" off, "clig" off;
    font-size: 14px; /* Reduced font size */
    font-weight: 400;
    margin-top: 12px; /* Reduced margin */
  }
  
  .summary-total {
    color: rgba(160, 18, 18, 1);
    text-align: right;
    align-self: flex-end;
    font: 500 16px Inter, sans-serif; /* Reduced font size */
  }
  
  .checkout-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 6px; /* Reduced border radius */
    background-color: rgba(107, 31, 31, 1);
    color: #fff;
    padding: 6px 15px; /* Reduced padding */
    font: 600 14px Merriweather, sans-serif; /* Reduced font size */
    margin-top: 15px; /* Reduced margin */
    border: none;
    cursor: pointer;
  }
  
  .checkout-icon {
    width: 24px; /* Reduced icon size */
    height: 24px; /* Reduced icon size */
  }
  
  @media (max-width: 991px) {
    .cart-header {
      white-space: initial;
    }
  
    .cart-content {
      flex-direction: column;
      margin-top: 20px;
    }
  
    .cart-items,
    .cart-summary {
      width: 100%;
    }
  
    .cart-summary {
      margin-top: 20px; /* Reduced margin */
      padding: 15px; /* Reduced padding */
    }
  
    .summary-total {
      margin-top: 20px; /* Reduced margin */
    }
  }
  
  </style>