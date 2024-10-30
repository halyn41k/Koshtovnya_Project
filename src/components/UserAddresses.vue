<template>
  <div class="address-container">
    <!-- Check if there's an address; if not, show a button to add a new address -->
    <div v-if="!addressAvailable" class="no-address">
      <button class="add-address-button" @click="showForm = true">
        <span class="plus-icon">+</span> Створити нову адресу
      </button>
    </div>

    <!-- Form to add/update address -->
    <div v-if="showForm" class="address-form">
      <h2>{{ addressAvailable ? 'Оновити адресу' : 'Додати нову адресу' }}</h2>
      <form @submit.prevent="submitAddress">
        <label>
          Ім’я:
          <input type="text" v-model="firstName" required />
        </label>
        <label>
          Прізвище:
          <input type="text" v-model="lastName" required />
        </label>
        <label>
          Телефон:
          <input type="tel" v-model="phoneNumber" required />
        </label>
        <label>
          Місто:
          <input type="text" v-model="city" required />
        </label>
        <label>
          Відділення пошти:
          <input type="text" v-model="postalOffice" required />
        </label>
        <button type="submit" class="save-button">Зберегти</button>
        <button type="button" class="cancel-button" @click="cancelEdit">Скасувати</button>
      </form>
    </div>

    <!-- Display address details if available -->
    <div v-else-if="addressAvailable" class="address-card">
      <h2 class="card-title">Ваша адреса доставки</h2>
      <p><strong>Ім’я:</strong> {{ firstName }}</p>
      <p><strong>Прізвище:</strong> {{ lastName }}</p>
      <p><strong>Телефон:</strong> {{ phoneNumber }}</p>
      <p><strong>Місто:</strong> {{ city }}</p>
      <p><strong>Відділення пошти:</strong> {{ postalOffice }}</p>

      <!-- Action buttons for updating or deleting the address -->
      <div class="button-group">
        <button class="update-button" @click="editAddress">Оновити</button>
        <button class="delete-button" @click="deleteAddress">Видалити</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAddresses',
  data() {
    return {
      addressAvailable: false, // Boolean to check if there's an address
      showForm: false, // Boolean to toggle address form visibility
      firstName: '', // Name data
      lastName: '',
      phoneNumber: '',
      city: '',
      postalOffice: '',
    };
  },
  methods: {
    submitAddress() {
      this.addressAvailable = true;
      this.showForm = false;
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
    },
    cancelEdit() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.address-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}

.no-address,
.address-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Merriweather', sans-serif;
  color: #555;
  font-size: 18px;
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
}

.plus-icon {
  font-size: 24px;
  margin-right: 8px;
}

.address-card,
.address-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  font-family: 'Merriweather', sans-serif;
}

.card-title,
.address-form h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.address-form form {
  display: flex;
  flex-direction: column;
}

.address-form label {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.address-form input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

.save-button,
.cancel-button {
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

.update-button:hover,
.delete-button:hover {
  background-color: #6b1f1f;
  color: white;
}
</style>
