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
=                <template v-if="step.title === 'Особиста інформація'">
                  <div class="input-container">
                    <input class="input-field" v-model="formData.firstName" placeholder="Ім'я" />
                    <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
                    
                    <input class="input-field" v-model="formData.lastName" placeholder="Прізвище" />
                    <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
                    
                    <input class="input-field" v-model="formData.email" placeholder="Електронна пошта" />
                    <span v-if="errors.email" class="error">{{ errors.email }}</span>
                    
                    <input class="input-field" v-model="formData.phone" placeholder="Номер телефону" />
                    <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                  </div>
                </template>
                
                <template v-else-if="step.title === 'Поштове відділення'">
                  <div class="input-container">
                    <input class="input-field" v-model="formData.city" placeholder="Місто" />
                    <span v-if="errors.city" class="error">{{ errors.city }}</span>
                    
                    <div class="postal-service-select">
                      <select v-model="formData.postalService" class="input-field">
                        <option disabled value="">Оберіть пошту</option>
                        <option value="Укрпошта">Укрпошта</option>
                        <option value="Нова Пошта">Нова Пошта</option>
                      </select>
                      <span v-if="errors.postalService" class="error">{{ errors.postalService }}</span>
                    </div>

                    <input
                      class="input-field"
                      v-if="formData.postalService"
                      v-model="formData.postalOffice"
                      :placeholder="`Відділення ${formData.postalService}`"
                    />
                    <span v-if="errors.postalOffice" class="error">{{ errors.postalOffice }}</span>
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
              <div class="summary-row">
                <span>Проміжний підсумок</span>
                <span class="price">2700₴</span>
              </div>
              <div class="summary-row">
                <span>Доставка</span>
                <span class="price">0₴</span>
              </div>
              <div class="summary-row total">
                <span>Загальна сума</span>
                <span class="price">2700₴</span>
              </div>
            </div>
            <button class="payment-button">
              <span>Оплатити</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Payment icon" class="button-icon" />
            </button>
          </div>
        </section>
      </div>
      
      <p class="payment-notice">Будь ласка, перевірте своє замовлення перед оплатою</p>
      <section class="order-items">
        <div class="item">
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/0bf96480ece714f079c9843f43c1f30f47a5cccc1c7e182979a1be8b68324be8?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Браслет 'Розмаїття кольорів'" class="item-image" />
          <div class="item-details">
            <h3 class="item-title">Браслет "Розмаїття кольорів"</h3>
            <p class="item-price">750₴ / за штуку</p>
            <p class="item-quantity">Кількість: 2</p>
          </div>
        </div>
        <div class="item">
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d58f1b57332f78186f2422ff9cf0ab91eb0b5a533f0578d1ffbcb6ff8cacb928?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Гердан 'Гуцулка'" class="item-image" />
          <div class="item-details">
            <h3 class="item-title">Гердан "Гуцулка"</h3>
            <p class="item-price">1200₴ / за штуку</p>
            <p class="item-quantity">Кількість: 1</p>
          </div>
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
export default {
  name: 'PaymentComponent', // Назва компонента

  // Дані для компонента
  data() {
    return {
      // Кроки процесу оформлення замовлення
      steps: [
        { title: 'Особиста інформація', completed: false, isExpanded: true }, // Перший крок
        { title: 'Поштове відділення', completed: false, isExpanded: false }, // Другий крок
        { title: 'Оплата', completed: false, isExpanded: false }, // Третій крок
      ],
      currentStep: 0, // Поточний крок
      formData: {
        // Данні форми
        firstName: '', // Ім'я
        lastName: '', // Прізвище
        email: '', // Email
        phone: '', // Номер телефону
        city: '', // Місто
        postalService: '', // Поштове відділення
        postalOffice: '', // Поштове відділення
        phoneDelivery: '', // Телефон для доставки (якщо не заповнене — буде заповнене основним телефоном)
      },
      selectedPaymentOption: '', // Вибір способу оплати
      paymentOptions: [
        'Оплата дебютовою або кредитною карткою', // Способи оплати
        'Оплата за допомогою PayPal',
        'Банківський переказ',
      ],
      errors: {}, // Об'єкт для зберігання помилок валідації
    };
  },

  computed: {
    // Перевірка, чи можна перейти до наступного кроку (немає помилок)
    canProceedToNextStep() {
      return !Object.keys(this.errors).length; // Якщо немає помилок
    },
  },

  methods: {
    // Метод для валідації даних та переходу до наступного кроку
    validateAndProceed() {
      this.errors = {}; // Очищення попередніх помилок

      // Валідація для кожного кроку
      if (this.currentStep === 0) { // Крок 1 — Особиста інформація
        if (!this.formData.firstName) this.errors.firstName = 'Ім\'я обов\'язкове';
        if (!this.formData.lastName) this.errors.lastName = 'Прізвище обов\'язкове';
        if (!this.formData.email || !this.validateEmail(this.formData.email)) this.errors.email = 'Введіть коректний email';
        if (!this.formData.phone) this.errors.phone = 'Номер телефону обов\'язковий';
      } else if (this.currentStep === 1) { // Крок 2 — Поштове відділення
        if (!this.formData.city) this.errors.city = 'Місто обов\'язкове';
        if (!this.formData.postalService) this.errors.postalService = 'Оберіть поштову службу';
        if (!this.formData.postalOffice) this.errors.postalOffice = 'Відділення обов\'язкове';
        // Якщо телефон для доставки порожній — використовуємо основний телефон
        if (!this.formData.phoneDelivery) this.formData.phoneDelivery = this.formData.phone;
        if (!this.formData.phoneDelivery) this.errors.phoneDelivery = 'Телефон обов\'язковий';
      } else if (this.currentStep === 2) { // Крок 3 — Оплата
        if (!this.selectedPaymentOption) this.errors.paymentOption = 'Оберіть спосіб оплати';
      }

      // Якщо немає помилок, переходимо до завершення кроку
      if (!Object.keys(this.errors).length) {
        this.completeStep();
      }
    },

    // Метод для перевірки коректності введеного email
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email); // Перевірка за допомогою регулярного виразу
    },

    // Метод для розгортання/згортання кроків
    toggleStep(index) {
      if (index <= this.currentStep) { // Розгортати тільки попередні або поточний крок
        this.steps[index].isExpanded = !this.steps[index].isExpanded;
      }
    },

    // Метод для завершення поточного кроку
    completeStep() {
      this.steps[this.currentStep].completed = true; // Позначити крок як завершений
      this.steps[this.currentStep].isExpanded = false; // Сховати крок
      if (this.currentStep < this.steps.length - 1) { // Якщо є наступний крок
        this.currentStep++; // Перехід до наступного кроку
        this.steps[this.currentStep].isExpanded = true; // Розгорнути наступний крок
      }
    },
  },
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

</style>