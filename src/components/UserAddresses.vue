<template>
  <div class="address-container">
    <!-- Display add button if no address available -->
    <div v-if="!addressAvailable" class="no-address">
      <button class="add-address-button" @click="showForm = true">
        <span class="plus-icon">+</span> Створити нову адресу
      </button>
    </div>

    <!-- Address form for adding/updating -->
    <div v-if="showForm" class="address-form">
      <h2>{{ addressAvailable ? 'Оновити адресу' : 'Додати нову адресу' }}</h2>
      <form @submit.prevent="submitAddress">
        <label>
          <span>Ім’я:</span>
          <input type="text" v-model="firstName" :class="{'error': errors.firstName}" required />
          <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
        </label>
        <label>
          <span>Прізвище:</span>
          <input type="text" v-model="lastName" :class="{'error': errors.lastName}" required />
          <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
        </label>
        <label>
          <span>Телефон:</span>
          <input type="tel" v-model="phoneNumber" :class="{'error': errors.phoneNumber}" required />
          <span v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>
        </label>
        <label>
          <span>Місто:</span>
          <input type="text" v-model="city" :class="{'error': errors.city}" required />
          <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
        </label>
        <label>
          <span>Відділення пошти:</span>
          <input type="text" v-model="postalOffice" :class="{'error': errors.postalOffice}" required />
          <span v-if="errors.postalOffice" class="error-message">{{ errors.postalOffice }}</span>
        </label>
        <button type="submit" class="save-button">Зберегти</button>
        <button type="button" class="cancel-button" @click="cancelEdit">Скасувати</button>
      </form>
    </div>

    <!-- Display address card if available -->
    <div v-else-if="addressAvailable" class="address-card">
      <h2 class="card-title">Ваша адреса доставки</h2>
      <p><strong>Ім’я:</strong> {{ firstName }}</p>
      <p><strong>Прізвище:</strong> {{ lastName }}</p>
      <p><strong>Телефон:</strong> {{ phoneNumber }}</p>
      <p><strong>Місто:</strong> {{ city }}</p>
      <p><strong>Відділення пошти:</strong> {{ postalOffice }}</p>

      <!-- Buttons for editing or deleting address -->
      <div class="button-group">
        <button class="update-button" @click="editAddress">
          <img src="@/assets/edit.png" alt="Edit" class="icon" /> Оновити
        </button>
        <button class="delete-button" @click="deleteAddress">
          <img src="@/assets/delete.png" alt="Delete" class="icon" /> Видалити
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAddresses',
  data() {
    return {
      addressAvailable: false,
      showForm: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      city: '',
      postalOffice: '',
      errors: {},
    };
  },
  methods: {
    validateFields() {
      this.errors = {};
      if (!this.firstName) this.errors.firstName = 'Введіть ім’я';
      if (!this.lastName) this.errors.lastName = 'Введіть прізвище';
      if (!this.phoneNumber) this.errors.phoneNumber = 'Введіть телефон';
      if (!this.city) this.errors.city = 'Введіть місто';
      if (!this.postalOffice) this.errors.postalOffice = 'Введіть відділення пошти';
      return Object.keys(this.errors).length === 0;
    },
    submitAddress() {
      if (this.validateFields()) {
        this.addressAvailable = true;
        this.showForm = false;
      }
    },
    editAddress() {
      this.showForm = true;
    },
    deleteAddress() {
      this.addressAvailable = false;
      this.showForm = false;
      this.firstName = '';
      this.lastName = '';
      this.phoneNumber = '';
      this.city = '';
      this.postalOffice = '';
      this.errors = {};
    },
    cancelEdit() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.address-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-left: -10px; /* Shift content left by 50px */
}

.no-address {
  align-self: flex-start;
  font-family: 'Merriweather', sans-serif;
  color: #555;
  font-size: 18px;
}

.add-address-button,
.save-button,
.cancel-button,
.update-button,
.delete-button {
  font-family: 'Merriweather', sans-serif;
}

.add-address-button {
  background: none;
  border: 2px solid #6b1f1f;
  border-radius: 8px;
  color: #6b1f1f;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.plus-icon {
  font-size: 24px;
  margin-right: 8px;
}

.address-form form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.address-form label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
}

.address-form label span {
  flex-basis: 30%;
}

.address-form input {
  width: 65%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-button,
.cancel-button {
  width: 100%;
  background: #6b1f1f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.save-button:hover {
  background: #4f1414;
}

.cancel-button {
  background: #888;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.update-button,
.delete-button {
  background: none;
  border: 2px solid #6b1f1f;
  border-radius: 8px;
  color: #6b1f1f;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.update-button:hover,
.delete-button:hover {
  background-color: #6b1f1f;
  color: white;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.error-message {
  color: red;
  font-size: 14px;
}

.error {
  border-color: red;
}
</style>
