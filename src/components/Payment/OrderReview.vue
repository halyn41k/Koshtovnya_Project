<template>
  <div>
    <p class="payment-notice">
      Будь ласка, перевірте своє замовлення перед оплатою.
    </p>
    <section ref="orderItems" class="order-items">
      <div v-if="localCartItems.length > 0">
        <div v-for="item in localCartItems" :key="item.id" class="item">
          <img :src="item.image" alt="Product Image" class="item-image" />
          <div class="item-details">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-price">{{ item.price }}₴ / за штуку</p>
            <p class="item-quantity">Кількість: {{ item.quantity }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Ваш кошик порожній.</p>
      </div>
    </section>

    <PaymentSummary :cartItems="localCartItems" :deliveryCost="deliveryCost" :totalAmount="calculatedTotalAmount"
      :cityRef="formData.city" :deliveryType="formData.deliveryType" @submit-payment="submitOrder" />
  </div>
</template>

<script>
import axios from "axios";
import PaymentSummary from "./PaymentSummary.vue";

export default {
  name: "OrderReview",
  components: {
    PaymentSummary,
  },
  data() {
    return {
      localCartItems: [], // Локальна копія товарів
      deliveryCost: 0,
      loading: false,
      steps: [
        { title: "Особиста інформація", completed: false, isExpanded: true },
        { title: "Поштове відділення", completed: false, isExpanded: false },
        { title: "Оплата", completed: false, isExpanded: false },
      ],
      currentStep: 0,
      formData: {
        firstName: "",
        lastName: "",
        secondName: "",
        phone: "",
        city: "",
        deliveryType: "",
        warehouse: "",
        streetSearch: "",
        houseNumber: "",
      },
      errors: {},
      paymentOptions: ["Картка", "Готівка", "PayPal"],
      selectedPaymentOption: "",
      canProceedToNextStep: false,
    };
  },
  methods: {
    async fetchCartItems() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get("http://26.235.139.202:8080/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.localCartItems = response.data.products.map((item) => ({
          id: item.id,
          image: item.image_url,
          title: item.name,
          price: item.price,
          quantity: item.quantity,
        }));
      } catch (error) {
        console.error("Помилка завантаження кошика:", error);
        alert("Не вдалося завантажити кошик.");
      } finally {
        this.loading = false;
      }
    },
    submitOrder() {
      alert("Ваше замовлення успішно оформлено!");
    },
    validateAndProceed() {
      const errors = {};
      if (this.currentStep === 0) {
        if (!this.formData.firstName) errors.firstName = "Ім'я є обов'язковим";
        if (!this.formData.lastName) errors.lastName = "Прізвище є обов'язковим";
        if (!this.formData.phone) errors.phone = "Телефон є обов'язковим";
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      }

      this.errors = {};
      this.steps[this.currentStep].completed = true;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.steps[this.currentStep].isExpanded = true;
      } else {
        alert("Замовлення успішно підтверджене!");
      }
    },
  },
  computed: {
    calculatedTotalAmount() {
      return (
        this.localCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + this.deliveryCost
      );
    },
  },
  mounted() {
    this.fetchCartItems();
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
}

.order-items {
  max-height: 500px;
  /* Встановлюємо максимальну висоту */
  overflow-y: auto;
  /* Додаємо вертикальний скрол */
  margin-top: 20px;
  /* Відступ зверху */
  padding-right: 10px;
  /* Для естетики скролбару */
}

/* Налаштування для скролбару */
.order-items::-webkit-scrollbar {
  width: 8px;
}

.order-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.order-items::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Для стилізації елементів у секції */
.order-items .item {
  display: flex;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.order-items .item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.order-items .item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-items .item-title {
  font-size: 18px;
  font-weight: 600;
}

.order-items .item-price,
.order-items .item-quantity {
  font-size: 16px;
  color: #555;
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

.delivery-steps {
  font: 700 20px/1.3 Merriweather, sans-serif;
  color: #9d9292;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.step.completed .step-text {
  color: #a6a6a6;
}

.step-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.step-text {
  font-weight: bold;
  color: #040404;
}

.step-icon {
  width: 34px;
  height: 32px;
}

.step-divider {
  width: 300px;
  height: 1px;
  background-color: #9d9292;
  margin: 10px 0;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
}

.input-field {
  border: 1px solid #9D9292;
  padding: 8px;
  color: #6B1F1F;
  font-family: 'Montserrat', sans-serif;
  border-radius: 4px;
}

.payment-option {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.payment-label {
  color: #040404;
  font-weight: bold;
  cursor: pointer;
}

.radio-input {
  display: none;
}

.radio-input+.payment-label::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border: 2px solid #9D9292;
  border-radius: 50%;
  background-color: transparent;
}

/* Стиль обраного радіо-доту */
.radio-input:checked+.payment-label::before {
  background-color: #6B1F1F;
}

.next-button {
  padding: 10px 20px;
  background-color: #6B1F1F;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
}

.order-summary {
  position: absolute;
  top: 300px;
  right: 100px;
  z-index: 100;
  width: 300px;
  padding: 20px;
  border-radius: 16px;
  background-color: rgba(255, 247, 246, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  max-height: 400px;
  overflow-y: auto;
  transition: position 0.3s ease;
  z-index: 10;
}

.order-summary.sticky {
  position: absolute;
  top: auto;
  bottom: 00px;
}

.summary-title {
  color: #000;
  font: 700 20px/1.3 Merriweather, sans-serif;
  margin-bottom: 16px;
}

.summary-details {
  font: 400 14px/1.3 Merriweather, sans-serif;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price {
  color: rgba(160, 18, 18, 1);
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.total {
  font-size: 18px;
  margin-top: 16px;
}

.payment-button {
  border-radius: 8px;
  background-color: rgba(107, 31, 31, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font: 700 12px/1.3 Merriweather, sans-serif;
  padding: 6px 15px;
  margin-top: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
}

.button-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 991px) {
  .order-summary {
    max-width: 100%;
    margin-top: 20px;
    padding: 15px;
  }
}

.order-items {
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 21px 25px;
  background-color: #fff;
  width: 750px;
  margin-left: 50px;
}

.item {
  display: flex;
  gap: 13px;
  border-radius: 16px;
  background-color: rgba(255, 247, 246, 1);
  padding: 13px;
  border: 1.33px solid rgba(230, 230, 230, 1);
  margin-bottom: 25px;
  width: 700px;
  margin-top: 20px;
}

.item-image {
  width: 115px;
  height: 106px;
  object-fit: contain;
}

.item-details {
  font: 700 13.33px/1.3 Merriweather, sans-serif;
}

.item-title {
  color: var(--Grays-Black, #000);
  margin-bottom: 2.67px;
}

.item-price {
  color: rgba(160, 18, 18, 1);
  font-family: Inter, sans-serif;
  font-weight: 600;
  margin-bottom: 17.33px;
}

.item-quantity {
  color: rgba(160, 18, 18, 0.5);
}


@media (max-width: 991px) {
  .order-items {
    max-width: 100%;
    padding: 20px;
  }

  .item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: auto;
  }
}

.delivery-address {
  padding: 23.33px 0;
  font: 16.67px/1.3 Merriweather, sans-serif;
}

.address-title {
  margin-left: 25.33px;
}

.address-divider {
  margin-top: 13.33px;
}

.address-details {
  margin: 10.67px 0 0 25.33px;
}


@media (max-width: 991px) {
  .delivery-address {
    max-width: 100%;
    margin-top: 40px;
  }

  .address-title,
  .address-details {
    margin-left: 10px;
  }
}

.delivery-address {
  padding: 20px;
  font: 16px/1.3 Merriweather, sans-serif;
  margin-top: 20px;
}

.address-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.address-box {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 20px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.address-box p {
  margin: 5px 0;
}

@media (max-width: 991px) {
  .delivery-address {
    max-width: 100%;
    margin-top: 20px;
  }

  .address-title,
  .address-details {
    margin-left: 10px;
  }
}

.city-dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 10;
}

.city-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.city-dropdown li {
  padding: 8px 12px;
  cursor: pointer;
}

.city-dropdown li:hover {
  background-color: #f0f0f0;
}

.office-suggestions {
  position: absolute;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.office-suggestions ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.office-suggestions li {
  padding: 10px;
  cursor: pointer;
}

.office-suggestions li:hover {
  background-color: #f0f0f0;
}

.input-container {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 12px;
}

.city-suggestions {
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}

.city-suggestions ul {
  list-style-type: none;
  padding: 0;
}

.city-suggestions li {
  padding: 5px;
  cursor: pointer;
}

.city-suggestions li:hover {
  background-color: #f0f0f0;
}

.city-suggestions ul,
.street-suggestions ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
}

.city-suggestions li,
.street-suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.city-suggestions li:hover,
.street-suggestions li:hover {
  background-color: #f0f0f0;
}
</style>