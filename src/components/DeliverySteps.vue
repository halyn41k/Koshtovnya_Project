<template>
    <div class="delivery-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ completed: step.completed }"
      >
        <div class="step-divider" v-if="index !== 0"></div>
        <div class="step-header" @click="toggleStep(index)">
          <span class="step-text">{{ step.title }}</span>
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
              <input class="input-field" v-model="formData.lastName" placeholder="Прізвище" />
              <input class="input-field" v-model="formData.email" placeholder="Електронна пошта" />
              <input class="input-field" v-model="formData.phone" placeholder="Номер телефону" />
            </div>
          </template>
          <template v-else-if="step.title === 'Поштове відділення'">
            <div class="input-container">
              <input class="input-field" v-model="formData.city" placeholder="Місто" />
              <input class="input-field" v-model="formData.postalOffice" placeholder="Відділення пошти" />
              <input class="input-field" v-model="formData.phoneDelivery" placeholder="Номер телефону" />
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
            </div>
          </template>
          <button v-if="canProceedToNextStep" @click="completeStep" class="next-button">Далі</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeliverySteps',
    props: ['onUpdateAddressData'],
    data() {
      return {
        steps: [
          { title: 'Особиста інформація', completed: false, isExpanded: true },
          { title: 'Поштове відділення', completed: false, isExpanded: false },
          { title: 'Оплата', completed: false, isExpanded: false },
        ],
        currentStep: 0,
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          postalOffice: '',
          phoneDelivery: '',
        },
        selectedPaymentOption: '',
        paymentOptions: [
          'Оплата дебютовою або кредитною карткою',
          'Оплата за допомогою PayPal',
          'Банківський переказ',
        ],
      };
    },
    computed: {
      canProceedToNextStep() {
        const stepData = this.steps[this.currentStep];
        if (stepData.title === 'Особиста інформація') {
          return this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.phone;
        } else if (stepData.title === 'Поштове відділення') {
          return this.formData.city && this.formData.postalOffice && this.formData.phoneDelivery;
        } else if (stepData.title === 'Оплата') {
          return this.selectedPaymentOption;
        }
        return false;
      },
    },
    methods: {
  toggleStep(index) {
    if (index <= this.currentStep) {
      this.steps[index].isExpanded = !this.steps[index].isExpanded;
    }
  },
  completeStepAndUpdateAddress() {
  this.completeStep();
  if (this.currentStep === 1) {
    const addressData = {
      name: `${this.formData.firstName} ${this.formData.lastName}`,
      phone: this.formData.phoneDelivery,
      city: this.formData.city,
      postalOffice: this.formData.postalOffice
    };
    console.log("Address Data:", addressData); // Додаємо консоль для перевірки
    this.$emit('update-address-data', addressData);
    }
  },
  completeStep() {
    this.markStepAsComplete();
  },
  markStepAsComplete() {
    this.steps[this.currentStep].completed = true;
    this.steps[this.currentStep].isExpanded = false;
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.steps[this.currentStep].isExpanded = true;
    }
      },
    },
  };
  </script>
  
 
  <style scoped>
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
    /* Сховуємо стандартне радіо, щоб стилізувати псевдоелементом */
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
  </style>