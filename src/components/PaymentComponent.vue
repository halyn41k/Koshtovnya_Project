<template>
    <section class="payment">
      <header class="payment-header">
        <div class="header-line"></div>
        <span class="main-title">Оплата</span>
        <div class="header-line"></div>
      </header>
      <main class="payment-content" :style="{ backgroundImage: `url(${require('@/assets/paymentpattern.png')})` }">
        <div class="payment-columns">
          <section class="payment-steps">
            <DeliverySteps />
          </section>
          <section class="payment-summary">
            <OrderSummary />
          </section>
        </div>
        <p class="payment-notice">Будь ласка, перевірте своє замовлення перед оплатою</p>
        <div class="order-details">
          <section class="order-items">
            <OrderItems />
          </section>
          <section class="delivery-address">
            <DeliveryAddress :addressData="addressData" />
          </section>
        </div>
      </main>
    </section>
  </template>
  
  <script>
  import DeliverySteps from './DeliverySteps.vue';
  import OrderSummary from './OrderSummary.vue';
  import OrderItems from './OrderItems.vue';
  import DeliveryAddress from './DeliveryAddress.vue';
  
  export default {
    name: 'PaymentComponent',
    components: {
      DeliverySteps,
      OrderSummary,
      OrderItems,
      DeliveryAddress
    },
    data() {
      return {
        addressData: {
          name: '', phone: '', city: '', postalOffice: '', street: ''
        }
      };
    },
    methods: {
      updateAddressData(data) {
        this.addressData = data;
      }
    }
  };
  </script>
  
  <style scoped>
  .payment-header {
    margin-top: 200px;
    display: flex;
    align-items: center;
    gap: 26.67px;
    font: 840 26.67px/1.3 'KyivType Titling', -apple-system, Roboto, Helvetica, sans-serif;
    letter-spacing: -1.33px;
  }
  
  
  .header-line {
    flex: 1;
    height: 2px;
    background-color: grey;
    margin: 0 10px;
  }
  
  .main-title {
    font-family: 'KyivType Titling', sans-serif;
    font-size: 34px;
    font-weight: 900;
    letter-spacing: -1.2px;
    text-shadow: 0 2px 3px rgba(99, 2, 2, 0.22);
    text-align: center;
  }
  
  .payment-content {
  background-image: url('@/assets/paymentpattern.png'); /* Додайте фіксований фон */
  background-attachment: fixed;
  background-size: cover;
  padding: 0 46.67px;
  margin-top: 28px;
}
  
  .payment-notice {
    font: 700 16.67px/22px Merriweather, sans-serif;
    margin: 148.67px 0 0 18.67px;
  }
  
  .order-details {
    gap: 13px;
    margin: 10px 0 0 18.67px;
    max-width: 1108px;
  }

  
  @media (max-width: 991px) {
    .payment-header {
      white-space: initial;
    }
  
    .payment-content {
      max-width: 100%;
      margin-top: 40px;
      padding: 0 20px;
    }
  
    .payment-columns {
      flex-direction: column;
    }
  
    .payment-steps,
    .payment-summary,
    .order-items,
    .delivery-address {
      width: 100%;
    }


    .payment-notice {
      max-width: 100%;
      margin-top: 40px;
    }
  
    .order-details {
      flex-direction: column;
      max-width: 100%;
    }
  }
  </style>
  