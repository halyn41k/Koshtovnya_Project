<template>
  <div class="address-container">
    <Loader v-if="loading" />

    <!-- Show "Create new address" button if no address is available -->
    <div v-if="!addressAvailable && !loading" class="no-address">
      <button class="add-address-button" @click="showForm = true">
        <span class="plus-icon">+</span> Створити нову адресу
      </button>
    </div>

    <!-- Show the address form if `showForm` is true -->
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

    <!-- Show address card if `addressAvailable` is true -->
    <div v-else-if="addressAvailable && !loading" class="address-card">
      <h2 class="card-title">Ваша адреса доставки</h2>
      <p><strong>Ім’я:</strong> {{ firstName }}</p>
      <p><strong>Прізвище:</strong> {{ lastName }}</p>
      <p><strong>Телефон:</strong> {{ phoneNumber }}</p>
      <p><strong>Місто:</strong> {{ city }}</p>
      <p><strong>Відділення пошти:</strong> {{ postalOffice }}</p>

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
import Loader from '../Loader.vue'; // Import the loader component

export default {
  name: 'UserAddresses',
  components: {
    Loader, // Register the loader component
  },
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
      loading: true, // Flag to show loader while checking address
    };
  },
  created() {
    this.fetchUserAddress();
  },
  methods: {
    // Fetch user address from API
    async fetchUserAddress() {
      try {
        const response = await fetch('http://26.235.139.202:8080/api/user-address');
        if (!response.ok) {
          throw new Error('Помилка при отриманні адреси');
        }
        const data = await response.json();
        const address = data.data.address;

        if (address) {
          this.firstName = address.user.split(' ')[0]; // First name
          this.lastName = address.user.split(' ')[1]; // Last name
          this.phoneNumber = address.phone_number;
          this.city = address.city;
          this.postalOffice = address.delivery_address;
          this.addressAvailable = true;
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        this.loading = false; // Hide loader when done
      }
    },

    // Validate the form fields
    validateFields() {
      this.errors = {}; // Reset errors
      if (!this.firstName) this.errors.firstName = 'Введіть ім’я';
      if (!this.lastName) this.errors.lastName = 'Введіть прізвище';
      if (!this.phoneNumber) this.errors.phoneNumber = 'Введіть телефон';
      if (!this.city) this.errors.city = 'Введіть місто';
      if (!this.postalOffice) this.errors.postalOffice = 'Введіть відділення пошти';
      return Object.keys(this.errors).length === 0; // Return true if no errors
    },

    // Submit the address form (create or update)
    submitAddress() {
      if (this.validateFields()) {
        // Logic to save the new address or update the existing one
        this.addressAvailable = true;
        this.showForm = false;
      }
    },

    // Edit the address (show the form)
    editAddress() {
      this.showForm = true;
    },

    // Delete the address
    deleteAddress() {
      this.addressAvailable = false; // Remove the address
      this.showForm = false; // Hide the form
      this.firstName = ''; // Reset the form
      this.lastName = '';
      this.phoneNumber = '';
      this.city = '';
      this.postalOffice = '';
      this.errors = {}; // Clear errors
    },

    // Cancel editing the address
    cancelEdit() {
      this.showForm = false; // Hide the form
    },
  },
};
</script>

<style scoped>
.address-container {
  padding: 20px;
}

.no-address {
  margin-bottom: 20px;
}

.add-address-button {
  background-color: #6b1f1f;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.address-form,
.address-card {
  margin-top: 20px;
}


.address-container {
  padding: 20px;
}

.no-address {
  margin-bottom: 20px;
}

.add-address-button {
  background-color: #6b1f1f;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.address-form,
.address-card {
  margin-top: 20px;
}

.loader {
  /* Loader styling here */
  width: 100px;
  height: 100px;
  background-color: #6b1f1f;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


.address-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-left: -10px; 
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
