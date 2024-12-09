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
            <span class="price">{{ localTotalAmount }}₴</span>
          </div>
        </div>
        <button class="payment-button" @click="submitPayment">
          <span>Оплатити</span>
        </button>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "PaymentSummary",
    props: {
      cartItems: {
        type: Array,
        required: true,
      },
      deliveryCost: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      cityRef: {
        type: String,
        required: true,
      },
      deliveryType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localDeliveryCost: this.deliveryCost,
        localTotalAmount: this.totalAmount,
      };
    },
    methods: {
        async calculateDeliveryCost() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  // Перевірка, чи обрано всі необхідні дані
  if (!this.cityRef) {
    console.error("Місто не обрано.");
    alert("Будь ласка, виберіть місто доставки.");
    return;
  }

  if (!this.deliveryType) {
    console.error("Тип доставки не обрано.");
    alert("Будь ласка, виберіть тип доставки.");
    return;
  }

  try {
    // Визначення типу доставки
    let serviceType;
    if (this.deliveryType === "відділення") {
      serviceType = "WarehouseWarehouse";
    } else if (this.deliveryType === "кур'єр") {
      serviceType = "WarehouseDoors";
    } else {
      throw new Error("Некоректний тип доставки.");
    }

    // Підготовка даних для запиту
    const requestData = {
      CityRecipient: this.cityRef, // Ref міста
      ServiceType: serviceType,   // Тип доставки
      product_ids: this.cartItems.map((item) => item.id), // Масив id товарів
    };

    // Логування для відладки
    console.log("Дані запиту на обрахунок доставки:", requestData);

    // Відправлення запиту
    const response = await axios.post(
      "http://26.235.139.202:8080/api/nova-poshta/delivery/cost",
      requestData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Обробка відповіді
    if (response.data?.cost !== undefined) {
      this.localDeliveryCost = response.data.cost; // Вартість доставки
      this.updateTotalAmount(); // Оновлення загальної суми
    } else {
      console.error("Некоректна відповідь API:", response.data);
    }
  } catch (error) {
    console.error("Помилка обрахунку доставки:", error.message || error);
    alert("Не вдалося обрахувати доставку. Перевірте введені дані.");
  }
},

      updateTotalAmount() {
        const itemsCost = this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        this.localTotalAmount = itemsCost + this.localDeliveryCost;
      },
      submitPayment() {
        this.$emit("submit-payment");
      },
    },
    mounted() {
      this.calculateDeliveryCost();
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
  position:absolute;
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
</style>