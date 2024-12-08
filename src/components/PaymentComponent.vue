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
          <div class="delivery-steps">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step"
              :class="{ completed: step.completed }"
            >
              <div class="step-divider" v-if="index !== 0"></div>
              <div class="step-header" @click="toggleStep(index)">
                <span class="step-text">{{ index + 1 }}. {{ step.title }}</span>
                <img
                  v-if="step.completed"
                  src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/142a83ede010f318e450c11b423feee035ee7a5315eb7e3159f36ffbf44c3d8d?apiKey=c3e46d0a629546c7a48302a5db3297d5"
                  alt="Completed step icon"
                  class="step-icon"
                />
                <img
                  v-else-if="index === currentStep"
                  src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/ad917f73e2782cc1776c785f1fdafd9a8f21a73bb1ca3ab9d8e4a7a54ba3df3e?apiKey=c3e46d0a629546c7a48302a5db3297d5"
                  alt="Current step icon"
                  class="step-icon"
                />
              </div>
              <div v-if="index === currentStep && step.isExpanded" class="step-content">
                <template v-if="step.title === 'Особиста інформація'">
                  <div class="input-container">
                    <input class="input-field" v-model="formData.firstName" placeholder="Ім'я" />
                    <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>

                    <input class="input-field" v-model="formData.lastName" placeholder="Прізвище" />
                    <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>

                    <input class="input-field" v-model="formData.phone" placeholder="Номер телефону" />
                    <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                  </div>

                </template>
                
                <template v-else-if="step.title === 'Поштове відділення'">
<div class="input-container">
  <!-- Вибір типу доставки -->
  <select v-model="selectedDeliveryCategory" @change="updateDeliveryOptions" class="input-field">
    <option disabled value="">Оберіть тип доставки</option>
    <option value="courier">Кур'єр</option>
    <option value="pickup">Самовивіз</option>
  </select>
  
  <!-- Вибір способу доставки -->
  <select v-model="formData.deliveryType" class="input-field">
    <option disabled value="">Оберіть спосіб доставки</option>
    <option v-for="option in filteredDeliveryOptions" :key="option.id" :value="option.name">
      {{ option.name }}
    </option>
  </select>
  
  <span v-if="!filteredDeliveryOptions.length" class="error">Способи доставки не доступні</span>

    <!-- Вибір міста -->
    <input
  v-if="formData.deliveryType"
  class="input-field"
  v-model="formData.city"
  placeholder="Введіть місто"
  @input="handleCityInput"
/>
<div v-if="cities.length > 0" class="city-suggestions">
  <ul>
    <li
      v-for="city in cities"
      :key="city.Ref"
      @click="selectCity(city)"
    >
      {{ city.city }}
    </li>
  </ul>
</div>

    <span v-if="errors.city" class="error">{{ errors.city }}</span>

    <!-- Вибір вулиці для кур'єрської доставки -->
    <div v-if="formData.deliveryType === 'Кур\'єр Нової Пошти' && streets.length">
  <select v-model="formData.street" class="input-field">
    <option disabled value="">Оберіть вулицю</option>
    <option v-for="street in streets" :key="street.Ref" :value="street.Name">
      {{ street.Name }}
    </option>
  </select>
  <span v-if="errors.street" class="error">{{ errors.street }}</span>
</div>


    <!-- Введення номеру будинку -->
    <div v-if="formData.street">
      <input
        class="input-field"
        v-model="formData.houseNumber"
        placeholder="Введіть номер будинку"
      />
      <span v-if="errors.houseNumber" class="error">{{ errors.houseNumber }}</span>
    </div>
  </div>
</template>


                <template v-else-if="step.title === 'Оплата'">
                  <div class="payment-options">
                    <div class="payment-option" v-for="(option, idx) in paymentOptions" :key="idx">
                      <input
                        type="radio"
                        :id="option"
                        :value="option"
                        v-model="selectedPaymentOption"
                        class="radio-input"
                      />
                      <label :for="option" class="payment-label">{{ option }}</label>
                    </div>
                    <span v-if="errors.paymentOption" class="error">{{ errors.paymentOption }}</span>
                  </div>
                </template>
                
                <button v-if="canProceedToNextStep" @click="validateAndProceed" class="next-button">Далі</button>
              </div>
            </div>
          </div>
        </section>
        
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
                <span class="price">0₴</span>
              </div>
              <div class="summary-row total">
                <span>Загальна сума</span>
                <span class="price">{{ totalAmount }}₴</span>
              </div>
            </div>
            <button class="payment-button" @click="submitPayment">
              <span>Оплатити</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Payment icon" class="button-icon" />
            </button>
          </div>
        </section>
      </div>
      
      <p class="payment-notice">Будь ласка, перевірте своє замовлення перед оплатою</p>
      <section ref="orderItems" class="order-items">
        <div v-if="cartItems.length > 0">
          <div v-for="item in cartItems" :key="item.id" class="item">
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

      <div class="order-details">
        <section class="delivery-address">
          <h2 class="address-title">Ваша адреса доставки:</h2>
          <div class="address-box">
            <p><strong>Ім'я:</strong> {{ formData.firstName }} {{ formData.lastName }}</p>
            <p><strong>Телефон:</strong> {{ formData.phoneDelivery || formData.phone }}</p>
            <p><strong>Місто:</strong> {{ formData.city }}</p>
            <p><strong>Пошта:</strong> {{ formData.postalService }}</p>
            <p><strong>Відділення:</strong> {{ formData.postalOffice }}</p>
          </div>
        </section>
      </div>
    </main>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "PaymentComponent",

  data() {
    return {
      steps: [
        { title: "Особиста інформація", completed: false, isExpanded: false },
        { title: "Поштове відділення", completed: false, isExpanded: false },
        { title: "Оплата", completed: false, isExpanded: false },
      ],
      currentStep: 0,
      formData: {
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        postalService: "",
        postalOffice: "",
        deliveryType: "", // Тип доставки
        
      },
      streets: [], // Додаємо streets
      allWarehouses: [],
      cities: [],
      warehouses: [],
      errors: {},
      paymentOptions: ["Картка", "Наложений платіж"],
      selectedPaymentOption: "",
      cartItems: [],
      deliveryOptions: [],
      loading: false,
      deliveryData: {
        courier: [
          { id: 5, name: "Кур'єр Нової Пошти", delivery_type: "courier" },
          { id: 6, name: "Кур'єр УКРПОШТИ", delivery_type: "courier" },
        ],
        pickup: [
          { id: 1, name: "Самовивіз з наших магазинів", delivery_type: "pickup" },
          { id: 2, name: "Самовивіз з поштоматів Нової Пошти", delivery_type: "pickup" },
          { id: 3, name: "Самовивіз з Нової Пошти", delivery_type: "pickup" },
          { id: 4, name: "Самовивіз з УКРПОШТИ", delivery_type: "pickup" },
        ],
      },
      selectedDeliveryCategory: "", // обраний тип доставки: courier або pickup
      filteredDeliveryOptions: [], // фільтровані опції доставки
  
    };
  },

  computed: {
    totalAmount() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    canProceedToNextStep() {
      return (
        (this.currentStep === 0 && this.validatePersonalInfo()) ||
        (this.currentStep === 1 && this.validatePostalInfo()) ||
        (this.currentStep === 2 && this.selectedPaymentOption)
      );
    },
  },

  methods: {
    scrollToOrderItems() {
      const orderItemsSection = this.$el.querySelector(".order-items");
      if (orderItemsSection) {
        orderItemsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    toggleStep(index) {
    if (index <= this.currentStep) {
      this.steps[index].isExpanded = !this.steps[index].isExpanded;
    }
  },

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

        this.cartItems = response.data.products.map((item) => ({
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

    async fetchDeliveryTypes() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  this.loading = true;
  try {
    const response = await axios.get(
      "http://26.235.139.202:8080/api/delivery-types",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Отримані типи доставки:", response.data.data); // Логування для перевірки
    this.deliveryOptions = response.data.data; // Зберігаємо типи доставки
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Помилка авторизації: Токен недійсний або відсутній");
      alert("Ваша сесія закінчилася. Увійдіть ще раз.");
      this.$router.push("/login");
    } else {
      console.error("Помилка завантаження типів доставки:", error.message);
    }
  } finally {
    this.loading = false;
  }
},


    handleCityInput() {
  clearTimeout(this.citySearchTimeout);
  this.citySearchTimeout = setTimeout(() => {
    this.fetchCities();
  }, 300);
},


async selectCity(city) {
  this.formData.city = city.city; // Оновлюємо місто
  this.formData.ref = city.Ref; // Зберігаємо Ref міста для подальшого використання
  console.log("Selected city:", this.formData.city);
  console.log("City Ref:", this.formData.ref);  // Перевірте, чи отримуєте правильний Ref
  this.cities = []; // Очищаємо список міст після вибору

  if (this.formData.city && this.formData.deliveryType === "Кур'єр Нової Пошти") {
    await this.fetchStreets(); // Завантажуємо вулиці після вибору міста
  }
},


async fetchStreets() { 
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  if (this.formData.Ref) { // Використовуємо Ref з formData
    try {
      const response = await axios.get("http://26.235.139.202:8080/api/nova-poshta/streets", {
        headers: { Authorization: `Bearer ${token}` },
        params: { Ref: this.formData.Ref }, // Використовуємо Ref в параметрі запиту
      });
      console.log("Fetching streets for city Ref:", this.formData.Ref);

      this.streets = response.data.data || [];
      if (!this.streets.length) {
        alert("Не знайдено вулиць для обраного міста.");
        console.log(response.data);  // Логування відповіді API для вулиць
      }
    } catch (error) {
      console.error("Помилка завантаження вулиць:", error.message);
      alert("Не вдалося завантажити список вулиць.");
    }
  }
},



async fetchCities() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  if (this.formData.city.length >= 3) {
    try {
      const response = await axios.get(
        "http://26.235.139.202:8080/api/nova-poshta/cities",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            city: this.formData.city,
            delivery_type: this.formData.deliveryType,
          },
        }
      );

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        this.cities = response.data.data;
      } else {
        console.error("Неправильний формат даних:", response.data);
        this.cities = [];
      }
    } catch (error) {
      console.error("Помилка завантаження міст:", error.message);
      alert("Не вдалося завантажити список міст.");
    }
  } else {
    this.cities = []; // Очищуємо список, якщо ввід менше 3 символів
  }
},
async fetchWarehouses() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  if (this.formData.city && this.formData.deliveryType) {
    try {
      const params = {
        city: this.formData.city,
        delivery_type: this.formData.deliveryType,
      };

      if (this.formData.postalOfficeSearch) {
        params.warehouse = this.formData.postalOfficeSearch;
      }

      const response = await axios.get("http://26.235.139.202:8080/api/nova-poshta/ware-houses", {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });

      if (response.data && Array.isArray(response.data.data)) {
        this.warehouses = response.data.data;
      } else {
        console.error("Неправильний формат даних:", response.data);
        this.warehouses = [];
      }

    } catch (error) {
      console.error("Помилка завантаження відділень:", error.message);
      alert("Не вдалося завантажити список відділень.");
    }
  }
},


handlePostalOfficeSearch() {
    // Логіка пошуку відділень на основі введеного тексту
    const query = this.formData.postalOfficeSearch.trim().toLowerCase();
    if (query) {
      // Фільтруємо чи запитуємо сервер на основі введеного тексту
      this.warehouses = this.allWarehouses.filter(warehouse =>
        warehouse.Description.toLowerCase().includes(query)
      );
    } else {
      this.warehouses = [];
    }
  },
  selectPostalOffice(warehouse) {
    this.formData.postalOffice = warehouse.Description; // Зберігаємо вибране відділення
    this.formData.postalOfficeSearch = warehouse.Description; // Відображаємо його у полі вводу
    this.warehouses = []; // Очищаємо випадаючий список
  },

    async fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.setMessage("Ви не авторизовані. Увійдіть у систему.", "error");
          return;
        }

        const response = await axios.get(
          "http://26.235.139.202:8080/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user } = response.data;
        this.formData.firstName = user.first_name || "";
        this.formData.lastName = user.last_name || "";
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
      }
    },

    validateAndProceed() {
      let isValid = false;

      if (this.currentStep === 0) {
        isValid = this.validatePersonalInfo();
      } else if (this.currentStep === 1) {
        isValid = this.validatePostalInfo();
      } else if (this.currentStep === 2) {
        isValid = !!this.selectedPaymentOption;
        if (!isValid) {
          this.errors.paymentOption = "Оберіть спосіб оплати";
        }
      }

      if (isValid) {
        this.completeStep();
      }
    },

    validatePersonalInfo() {
      this.errors = {};
      let valid = true;
      if (!this.formData.firstName) {
        this.errors.firstName = "Ім'я обов'язкове";
        valid = false;
      }
      if (!this.formData.lastName) {
        this.errors.lastName = "Прізвище обов'язкове";
        valid = false;
      }
      if (!this.formData.phone) {
        this.errors.phone = "Номер телефону обов'язковий";
        valid = false;
      }
      return valid;
    },

    validatePostalInfo() {
      this.errors = {};
      let valid = true;
      if (!this.formData.city) {
        this.errors.city = "Місто обов'язкове";
        valid = false;
      }
      if (!this.formData.deliveryType) {
        this.errors.deliveryType = "Тип доставки обов'язковий";
        valid = false;
      }
      if (!this.formData.postalOffice) {
        this.errors.postalOffice = "Відділення обов'язкове";
        valid = false;
      }
      return valid;
    },

    completeStep() {
      this.steps[this.currentStep].completed = true;
      this.steps[this.currentStep].isExpanded = false;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.steps[this.currentStep].isExpanded = true;
      }
    },

    submitPayment() {
      console.log("Відправлення даних платежу:", this.formData);
    },
    updateDeliveryOptions() {
      if (this.selectedDeliveryCategory) {
        // Оновлюємо опції доставки відповідно до вибраного типу
        this.filteredDeliveryOptions = this.deliveryData[this.selectedDeliveryCategory];
      } else {
        this.filteredDeliveryOptions = [];
      }
    },
  },

  mounted() {
    this.scrollToOrderItems();
  },
  watch: {
  "formData.deliveryType"(newVal) {
    if (newVal === "Кур'єр Нової Пошти" && this.formData.city) {
      this.fetchStreets(); // Завантажуємо вулиці при виборі типу доставки
    }
  },
},
  created() {
    this.fetchCartItems();
    this.fetchDeliveryTypes();
    this.fetchProfile();
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
  max-height: 500px; /* Встановлюємо максимальну висоту */
  overflow-y: auto; /* Додаємо вертикальний скрол */
  margin-top: 20px; /* Відступ зверху */
  padding-right: 10px; /* Для естетики скролбару */
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
  
  .radio-input + .payment-label::before {
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
  .radio-input:checked + .payment-label::before {
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

</style>