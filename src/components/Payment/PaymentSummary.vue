<template>
  <section class="payment-summary">
    <div class="order-summary">
      <h2 class="summary-title">Сума до оплати</h2>
      <div class="summary-details">
        <div class="summary-row" v-for="item in cartItems" :key="item.id">
          <span>{{ item.title }}</span>
          <span class="price">{{ item.price * item.quantity }}₴</span>
        </div>
        <div class="summary-row">
          <span>Доставка</span>
          <span class="price">{{ localDeliveryCost }}₴</span>
        </div>
        <div class="summary-row total">
          <span>Загальна сума</span>
          <span class="price">{{ totalWithDelivery }}₴</span>
        </div>
      </div>
      <button class="payment-button" @click="submitOrder">
        <span>Оформити замовлення</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5"
          alt="" class="login-icon" />
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "PaymentSummary",
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        secondName: '',
        phone: ''
      },
      localDeliveryCost: this.deliveryCost,
      localTotalAmount: this.totalAmount,
    };
  },
  props: {
    cartItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    deliveryCost: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    cityRef: {
      type: String,
      required: true,
      default: "",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "",
    },
    typeOfCard: {
      type: String,
      default: "",
    },
  },
  methods: {
    async submitOrder() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }

      const orderData = {
        last_name: this.formData.lastName,
        first_name: this.formData.firstName,
        second_name: this.formData.secondName,
        phone_number: this.formData.phone,
        city: this.cityRef,
        payment_method: this.paymentMethod,
        type_of_card: this.paymentMethod === "Післяоплата" ? "" : this.typeOfCard,
        delivery_cost: this.localDeliveryCost,
        cart_cost: this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };

      // Додаємо валідацію перед відправкою
      const requiredFields = [
        'first_name',
        'last_name',
        'phone_number',
        'city',
        'payment_method'
      ];

      const missingFields = requiredFields.filter(field => !orderData[field]);

      if (missingFields.length > 0) {
        alert(`Відсутні обов'язкові поля: ${missingFields.join(', ')}`);
        return;
      }

      try {
        const response = await axios.post(
          "http://26.235.139.202:8080/api/orders",
          orderData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Замовлення успішно оформлено!");
      } catch (error) {
        alert("Не вдалося оформити замовлення. Перевірте дані.");
      }
    },
  },
  computed: {
    totalWithDelivery() {
      return (
        this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + this.deliveryCost
      );
    },
  },
};
</script>



<style scoped>
@media (max-width: 991px) {

  .payment-steps,
  .payment-summary,
  .order-items,
  .delivery-address {
    width: 100%;
  }

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
  transition: background-color 0.3s;
  height: 40px;
  font-size: 15px;
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


.payment-summary {
  z-index: 5;
  /* Встановлюємо більш високий пріоритет */
}
</style>