<template>
    <div class="address-container">
      <!-- Check if there are addresses; if none, show the prompt to create a new address -->
      <div v-if="!addressAvailable" class="no-address">
        <button class="add-address-button" @click="createAddress">
          <span class="plus-icon">+</span> Створити нову адресу
        </button>
      </div>
  
      <!-- Display address details if available -->
      <div v-else class="address-card">
        <h2 class="card-title">Ваша адреса доставки</h2>
        <p><strong>Ім’я:</strong> {{ firstName }}</p>
        <p><strong>Прізвище:</strong> {{ lastName }}</p>
        <p><strong>Телефон:</strong> {{ phoneNumber }}</p>
        <p><strong>Місто:</strong> {{ city }}</p>
        <p><strong>Відділення пошти:</strong> {{ postalOffice }}</p>
        
        <!-- Action buttons for updating or deleting the address -->
        <div class="button-group">
          <button class="update-button" @click="updateAddress">Оновити</button>
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
        firstName: '', // Name data
        lastName: '',
        phoneNumber: '',
        city: '',
        postalOffice: '',
      };
    },
    methods: {
      createAddress() {
        // Logic to create a new address (for now, just toggling availability)
        this.addressAvailable = true;
        this.firstName = 'Ім’я';
        this.lastName = 'Прізвище';
        this.phoneNumber = '+380123456789';
        this.city = 'Місто';
        this.postalOffice = 'Відділення №1';
      },
      updateAddress() {
        alert('Оновлення адреси');
        // Logic to update the address information
      },
      deleteAddress() {
        // Logic to delete the address information
        this.addressAvailable = false;
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.city = '';
        this.postalOffice = '';
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
  
  .no-address {
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
  
  .address-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: left;
    font-family: 'Merriweather', sans-serif;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  
  .address-card p {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
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
  
  .update-button:hover {
    background-color: #6b1f1f;
    color: white;
  }
  
  .delete-button:hover {
    background-color: #6b1f1f;
    color: white;
  }
  </style>
  