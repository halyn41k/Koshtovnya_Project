<template>
  <div class="payment-step">
    <div 
      v-for="(option, idx) in paymentOptions" 
      :key="idx" 
      class="payment-option"
    >
      <input
        type="radio"
        :id="`payment-${idx}`"
        :value="option"
        v-model="selectedPaymentOption"
        class="radio-input"
        @change="validatePaymentInfo"
      />
      <label :for="`payment-${idx}`" class="payment-label">
        {{ option }}
      </label>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>
  
  <script>
  export default {
    name: 'PaymentStep',
    data() {
      return {
        paymentOptions: ['Оплата на картку', 'Оплата при отриманні'],
        selectedPaymentOption: '',
        error: ''
      }
    },
    methods: {
      validatePaymentInfo() {
        let valid = true;
        this.error = '';
  
        if (!this.selectedPaymentOption) {
          this.error = 'Оберіть спосіб оплати';
          valid = false;
        }
  
        this.$emit('validation', {
          data: { paymentMethod: this.selectedPaymentOption },
          isValid: valid
        });
  
        return valid;
      }
    }
  }
  </script>

  
<style scoped>

  
@media (max-width: 991px) {
 

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
  border: 5px solid #9D9292;
  border-radius: 30%;
  background-color: transparent;
}

/* Стиль обраного радіо-доту */
.radio-input:checked + .payment-label::before {
  background-color: #6B1F1F;
  border: 4.5px solid #9D9292;
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
}
</style>