<template>
  <section class="payment">
    <header class="payment-header">
      <div class="header-line"></div>
      <span class="main-title">Оплата</span>
      <div class="header-line"></div>
    </header>
    <main class="payment-content" :style="{ backgroundImage: `url(${require('@/assets/paymentpattern.png')})` }">
      <PaymentStepsParent :currentStep="currentStep" />
      <OrderReview v-if="currentStep === 1" :cartItems="cartItems" />
      <DeliveryAddress v-if="currentStep === 2" :formData="formData" />
      <PaymentSummary 
        v-if="currentStep === 3"
        :cart-items="cartItems"
        :delivery-cost="deliveryCost"
        :total-amount="totalAmount"
        :city-ref="selectedCityRef"
        :delivery-type="selectedDeliveryType"
        :customer-details="customerDetails"
        :delivery-details="deliveryDetails"
        :payment-method="selectedPaymentMethod" 
        :type-of-card="typeOfCard"
      />
    </main>
  </section>
</template>

<script>
import OrderReview from "./OrderReview.vue";
import DeliveryAddress from "./DeliveryAddress.vue";
import PaymentSummary from "./PaymentSummary.vue";
import PaymentStepsParent from "./PaymentStepsParent.vue";

export default {
  name: "PaymentComponent",
  components: {
    OrderReview,
    DeliveryAddress,
    PaymentSummary,
    PaymentStepsParent,
  },
  data() {
    return {
      cartItems: [],
      formData: {
        cityRef: null,
        deliveryType: null,
      },
      deliveryCost: 0,
      totalAmount: 0,
      currentStep: 1,
    };
  },
};
</script>

  <style scoped>

.city-suggestions {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.city-suggestions ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.city-suggestions li {
  padding: 5px;
  cursor: pointer;
}

.city-suggestions li:hover {
  background-color: #f0f0f0;
}
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
  background-image: url('@/assets/paymentpattern.png'); 
  background-attachment: fixed;
  background-size: cover;
  padding: 0 46.67px;
  margin-top: 28px;
}
  
  .payment-notice {
    font: 700 16.67px/22px Merriweather, sans-serif;
    margin: 148.67px 0 0 18.67px;

  }
 
</style>