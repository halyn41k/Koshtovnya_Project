<template>
  <div class="payment-steps-container">
    <div class="steps-navigation">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step"
        :class="{
          'active': currentStep === index,
          'completed': index < currentStep,
          'disabled': index > currentStep
        }"
        @click="toggleStep(index)"
      >
        <div class="step-header">
          <span class="step-number">{{ index + 1 }}.</span>
          <span class="step-title">{{ step.title }}</span>
          <span 
            v-if="index < currentStep" 
            class="step-check-icon"
          >
            ✓
          </span>
        </div>
        <transition name="step-content">
          <div 
            v-if="step.isExpanded" 
            class="step-details"
          >
            <component 
              :is="stepComponents[index]"
              @validation="handleStepValidation(index, $event)"
            ></component>
          </div>
        </transition>
      </div>
    </div>

    <div class="navigation-buttons">
      <button 
        v-if="currentStep > 0" 
        @click="prevStep"
        class="btn-back"
      >
        Назад
      </button>
      <button 
        @click="nextStep" 
        :disabled="!isStepValid"
        class="btn-next"
      >
        {{ currentStep === steps.length - 1 ? 'Підтвердити' : 'Далі' }}
      </button>
    </div>
  </div>
</template>

<script>
import PersonalInfoStep from './PersonalInfoStep.vue';
import PostalOfficeStep from './PostalOfficeStep.vue';
import PaymentStep from './PaymentStep.vue';

export default {
  name: 'PaymentSteps',
  components: {
    PersonalInfoStep,
    PostalOfficeStep,
    PaymentStep
  },
  data() {
    return {
      steps: [
        { 
          title: 'Особиста інформація', 
          isExpanded: true, 
          isValid: false 
        },
        { 
          title: 'Поштове відділення', 
          isExpanded: false, 
          isValid: false 
        },
        { 
          title: 'Оплата', 
          isExpanded: false, 
          isValid: false 
        }
      ],
      stepComponents: [
        PersonalInfoStep,
        PostalOfficeStep,
        PaymentStep
      ],
      currentStep: 0,
      formData: {},
      isStepValid: false
    }
  },
  methods: {
    toggleStep(index) {
      // Only allow moving to previous steps or current step
      if (index <= this.currentStep) {
        // Collapse all steps
        this.steps.forEach((step, i) => {
          step.isExpanded = i === index;
        });
        
        // Set current step
        this.currentStep = index;
        this.isStepValid = this.steps[index].isValid;
      }
    },
    handleStepValidation(index, { data, isValid }) {
      // Update form data
      this.formData = { ...this.formData, ...data };
      
      // Mark step as valid
      this.steps[index].isValid = isValid;
      
      // Update current step validation state
      this.isStepValid = isValid;
    },
    nextStep() {
      if (this.isStepValid && this.currentStep < this.steps.length - 1) {
        // Move to next step
        this.currentStep++;
        
        // Expand next step, collapse others
        this.steps.forEach((step, index) => {
          step.isExpanded = index === this.currentStep;
        });
        
        // Reset step validation
        this.isStepValid = this.steps[this.currentStep].isValid;
      } else if (this.currentStep === this.steps.length - 1 && this.isStepValid) {
        // Submit order on final step
        this.submitOrder();
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        // Move to previous step
        this.currentStep--;
        
        // Expand previous step, collapse others
        this.steps.forEach((step, index) => {
          step.isExpanded = index === this.currentStep;
        });
        
        // Reset step validation
        this.isStepValid = this.steps[this.currentStep].isValid;
      }
    },
    submitOrder() {
      console.log('Замовлення:', this.formData);
      // Логіка відправки замовлення
    }
  }
}
</script>

<style scoped>
.payment-steps-container {
  max-width: 600px;
  margin-left: -10px;
  font-family: 'Merriweather', serif;
}

.steps-navigation {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.step {
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.step:last-child {
  border-bottom: none;
}

.step-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
}

.step-number {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.step-title {
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
}

.step-check-icon {
  color: green;
  font-weight: bold;
}

.step-details {
  padding: 15px;
  background-color: white;
}

.step.active .step-header {
  background-color: #f0f0f0;
}

.step.completed .step-header {
  background-color: #e6f3e6;
}

.step.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-back, .btn-next {
  font-family: 'Merriweather', serif;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
}

.btn-back {
  background-color: #f0f0f0;
  color: #333;
}

.btn-next {
  background-color: #4CAF50;
  color: white;
}

.btn-next:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Transition effects */
.step-content-enter-active, 
.step-content-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.step-content-enter, 
.step-content-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>