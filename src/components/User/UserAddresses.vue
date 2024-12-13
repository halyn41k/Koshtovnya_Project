<template>
  <div class="address-container">
    <Loader v-if="loading" />

    <!-- Якщо немає адреси доставки -->
    <div v-if="!addressAvailable && !loading" class="no-address">
      <p class="no-address-text">Немає адреси доставки. Додайте або створіть нову адресу!</p>
      <button class="add-address-button" @click="showForm = true">
        <span class="plus-icon">+</span> Створити нову адресу
      </button>
    </div>

    <!-- Форма додавання або оновлення адреси -->
    <div v-if="showForm" class="address-form">
      <h2>{{ addressAvailable ? 'Оновити адресу' : 'Додати нову адресу' }}</h2>
      <form @submit.prevent="submitAddress">
        <!-- Телефон -->
        <label>
          <span>Телефон:</span>
          <input 
            type="tel" 
            v-model="phoneNumber" 
            :class="{ error: errors.phoneNumber }" 
            required 
          />
          <span v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>
        </label>

        <!-- Тип доставки -->
        <label>
          <span>Тип доставки:</span>
          <select v-model="formData.deliveryType" @change="updateDeliveryOptions">
            <option disabled value="">Оберіть тип доставки</option>
            <option value="courier">Кур'єр</option>
            <option value="pickup">Самовивіз</option>
          </select>
        </label>

       <!-- Спосіб доставки -->
<!-- Спосіб доставки -->
<label>
  <span>Спосіб доставки:</span>
  <select 
    v-model="formData.selectedDeliveryMethod" 
    :disabled="!filteredDeliveryOptions.length"
    @change="onDeliveryMethodChange"
  >
    <option value="">Оберіть спосіб доставки</option>
    <option 
      v-for="option in filteredDeliveryOptions" 
      :key="option.id" 
      :value="option.name"
    >
      {{ option.name }}
    </option>
  </select>
</label>


        <!-- Адресні деталі для кур'єрської доставки -->
        <template v-if="formData.deliveryType === 'courier'">
          <label>
            <span>Вулиця:</span>
            <select v-model="deliveryAddress.street">
              <option v-for="street in streets" :key="street" :value="street">
                {{ street }}
              </option>
            </select>
          </label>
          <label>
            <span>Будинок/Квартира:</span>
            <input type="text" v-model="deliveryAddress.number" required />
          </label>
        </template>

        <!-- Відділення для самовивозу -->
        <template v-if="formData.deliveryType === 'pickup'">
          <label>
            <span>Відділення:</span>
            <select v-model="deliveryAddress.warehouse">
              <option 
                v-for="warehouse in warehouses" 
                :key="warehouse.id" 
                :value="warehouse.name"
              >
                {{ warehouse.name }}
              </option>
            </select>
          </label>
        </template>

        <!-- Місто -->
        <label>
          <span>Місто:</span>
          <input 
            type="text" 
            v-model="formData.city" 
            @input="fetchCities" 
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
          <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
        </label>

        <div class="form-actions">
          <button type="submit" class="save-button">Зберегти</button>
          <button type="button" class="cancel-button" @click="cancelEdit">Скасувати</button>
        </div>
      </form>
    </div>

    <!-- Картка адреси -->
    <div v-else-if="addressAvailable && !loading" class="address-card">
      <h2 class="card-title">Ваша адреса доставки</h2>
      <p><strong>Телефон:</strong> {{ phoneNumber }}</p>
      <p><strong>Тип доставки:</strong> {{ formData.deliveryType }}</p>
      <p v-if="formData.deliveryType === 'courier'">
        <strong>Адреса:</strong> {{ deliveryAddress.street }} {{ deliveryAddress.number }}
      </p>
      <p v-if="formData.deliveryType === 'pickup'">
        <strong>Відділення:</strong> {{ deliveryAddress.warehouse }}
      </p>
      <p><strong>Місто:</strong> {{ formData.city }}</p>
      <div class="button-group">
        <button class="update-button" @click="editAddress">Оновити</button>
        <button class="delete-button" @click="deleteAddress">Видалити</button>
      </div>
    </div>
  </div>
</template>



<script>
import Loader from '../Loader.vue';
import axios from "axios"; 

export default {
  name: 'UserAddresses',
  components: { Loader },
  data() {
  return {
    addressAvailable: false,
    showForm: false,
    phoneNumber: '',
    deliveryType: '',
    city: '',
    formData: {
      city: '', // Ініціалізація об'єкта formData
      deliveryType: '',
      streetSearch: '',
      cityRef: '',
      selectedDeliveryMethod: '',

    },
    deliveryTypes: [],
    deliveryAddress: {
      street: '',
      number: '',
      warehouse: ''
      
    },
    deliveryOptions: {}, // Тут зберігатимуться всі доступні варіанти доставки
    filteredDeliveryOptions: [], // Відфільтровані способи доставки
    cities: [],
    streets: [],
    warehouses: [],
    postomats: [],
    errors: {},
    loading: true
  };
  },
  created() {
    this.fetchUserAddress();
    this.fetchDeliveryTypes();
    this.fetchCities();
  },
  methods: {
    onDeliveryMethodChange(event) {
    console.log("Спосіб доставки змінено:", event.target.value);
  },
    updateDeliveryOptions() {
    // Reset delivery method and options when delivery type changes
    this.selectedDeliveryMethod = '';
    this.filteredDeliveryOptions = [];

    // Filter delivery options based on selected delivery type
    if (this.formData.deliveryType) {
      this.filteredDeliveryOptions = Object.values(this.deliveryOptions)
        .filter(option => option.delivery_type === this.formData.deliveryType);
    }

    // Reset address-specific fields
    if (this.formData.deliveryType === 'courier') {
      this.deliveryAddress.warehouse = '';
      this.fetchStreets();
    } else if (this.formData.deliveryType === 'pickup') {
      this.deliveryAddress.street = '';
      this.deliveryAddress.number = '';
    }
  },

  selectCity(city) {
    this.formData.city = city.city;
    this.formData.cityRef = city.Ref;
    this.cities = [];

    // Only fetch warehouses if delivery type is pickup
    if (this.formData.deliveryType === 'pickup') {
      this.fetchWarehouses();
    }
  },

  // Modify fetchWarehouses to accept optional parameters
  async fetchWarehouses(city = null, cityRef = null) {
    const cityToUse = city || this.formData.city;
    const cityRefToUse = cityRef || this.formData.cityRef;

    if (!cityToUse || !this.formData.deliveryType) {
      console.warn('Місто або тип доставки не вибрано');
      return;
    }

    try {
      const response = await axios.get(
        "http://26.235.139.202:8080/api/nova-poshta/ware-houses",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            city: cityToUse,
            Ref: cityRefToUse,
            delivery_type: this.formData.deliveryType,
          },
        }
      );

      if (response.status === 200 && Array.isArray(response.data?.data)) {
        this.warehouses = response.data.data.map((item, index) => ({
          id: index + 1,
          name: item.warehouse,
        }));
      } else {
        console.error("No data returned or invalid format");
        this.warehouses = [];
      }
    } catch (error) {
      console.error("Error fetching warehouses:", error.response?.data || error.message);
      this.warehouses = [];
    }
  },
  selectCity(city) {
  this.formData.city = city.city;   // Встановлюємо місто
  this.formData.cityRef = city.Ref;  // Встановлюємо Ref міста
  this.cities = [];  // Очищаємо список міст
  console.log("Вибране місто:", { city: this.formData.city, Ref: this.formData.cityRef });
  this.fetchWarehouses();  // Запит на відділення після вибору міста
},
    // Fetch existing address
    async fetchUserAddress() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    this.loading = true;
    try {
      const response = await axios.get('http://26.235.139.202:8080/api/user-address', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        // Деструктуризація даних з відповіді
        const { 
          phone_number, 
          city, 
          delivery_name, 
          delivery_address,
          id  // Додаємо id адреси для подальшого використання
        } = response.data;

        this.phoneNumber = phone_number || '';
        this.formData.city = city || '';
        this.formData.deliveryType = delivery_name || '';
        this.addressId = id;  // Зберігаємо id адреси

        // Логіка для різних типів доставки
        if (delivery_name === 'courier') {
          const [street, number] = delivery_address.split(' ');
          this.deliveryAddress.street = street;
          this.deliveryAddress.number = number;
        } else if (delivery_name === 'pickup') {
          this.deliveryAddress.warehouse = delivery_address;
        }

        this.addressAvailable = true;
      }
    } catch (error) {
      console.error('Помилка отримання адреси:', error);
    } finally {
      this.loading = false;
    }
  },
async fetchUserPhoneNumber() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get('http://26.235.139.202:8080/api/user/phone-number', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Якщо номер телефону є, встановлюємо його
      if (response.data !== null) {
        this.phoneNumber = response.data;
      }
    } catch (error) {
      console.error('Помилка отримання номера телефону:', error);
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
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.data) {
      console.log("Отримані типи доставки:", response.data.data);
      this.deliveryOptions = response.data.data; // Зберігаємо отримані дані
    } else {
      console.error("Неправильний формат даних типів доставки:", response.data);
    }
  } catch (error) {
    console.error("Помилка отримання типів доставки:", error);
  } finally {
    this.loading = false;
  }
},
    async fetchCities() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
      this.$router.push("/login");
      return;
    }

    // Перевірка наявності значення у formData.city
    if (!this.formData.city || this.formData.city.length < 3) {
      console.warn("Місто не введено або занадто коротке для пошуку.");
      return;
    }

    try {
      const response = await axios.get(
        "http://26.235.139.202:8080/api/nova-poshta/cities",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            city: this.formData.city,
            delivery_type: this.formData.deliveryType
          }
        }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        this.cities = response.data.data;
      } else {
        console.error("Неправильний формат даних:", response.data);
        this.cities = [];
      }
    } catch (error) {
      console.error("Помилка під час завантаження міст:", error);
    }
  },
    async fetchDeliveryOptions() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
    this.$router.push("/login");
    return;
  }

  try {
    if (this.deliveryType === 'courier') {
      const response = await axios.get('http://26.235.139.202:8080/api/nova-poshta/streets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.streets = response.data;
    } else if (this.deliveryType === 'pickup') {
      const response = await axios.get('http://26.235.139.202:8080/api/nova-poshta/ware-houses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.warehouses = response.data;
    }
  } catch (error) {
    console.error('Error fetching delivery options:', error);
  }
},
async fetchStreets() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Ви не авторизовані. Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }

      if (this.formData.streetSearch.length >= 3) {
        try {
          const response = await axios.get(
            "http://26.235.139.202:8080/api/nova-poshta/streets",
            {
              headers: { Authorization: `Bearer ${token}` },
              params: {
                Ref: this.formData.cityRef,
                street: this.formData.streetSearch,
              },
            }
          );

          if (response.data && Array.isArray(response.data.data)) {
            this.streets = response.data.data;
          } else {
            console.error("Неправильний формат даних:", response.data);
            this.streets = [];
          }
        } catch (error) {
          this.handleApiError(error);
        }
      }
    },
    async fetchWarehouses() {
  this.warehouses = []; // Очистити старі дані
  console.log("Fetching warehouses for city:", this.formData.city, "Ref:", this.formData.cityRef);

  try {
    const response = await axios.get(
      "http://26.235.139.202:8080/api/nova-poshta/ware-houses",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          city: this.formData.city,
          Ref: this.formData.cityRef,
          delivery_type: this.formData.deliveryType,
        },
      }
    );

    console.log("Warehouses response:", response.data);

    if (response.status === 200 && Array.isArray(response.data?.data)) {
      // Форматування даних
      this.warehouses = response.data.data.map((item, index) => ({
        id: index + 1, // Унікальний ID
        name: item.warehouse, // Назва поштомату
      }));
      console.log("Processed warehouses:", this.warehouses);
    } else {
      console.error("No data returned or invalid format");
    }
  } catch (error) {
    console.error("Error fetching warehouses:", error.response?.data || error.message);
  }
},
selectCity(city) {
  this.formData.city = city.city;   // Встановлюємо місто
  this.formData.cityRef = city.Ref;  // Встановлюємо Ref міста
  this.cities = [];  // Очищаємо список міст
  console.log("Вибране місто:", { city: this.formData.city, Ref: this.formData.cityRef });
  this.fetchWarehouses();  // Запит на відділення після вибору міста
},


    validateFields() {
      this.errors = {};
      if (!this.phoneNumber) this.errors.phoneNumber = 'Введіть телефон';
      if (!this.deliveryType) this.errors.deliveryType = 'Оберіть тип доставки';
      if (this.deliveryType === 'courier' && !this.deliveryAddress.street) this.errors.street = 'Оберіть вулицю';
      if (this.deliveryType === 'pickup' && !this.deliveryAddress.warehouse) this.errors.warehouse = 'Оберіть відділення';
      return Object.keys(this.errors).length === 0;
    },
    async submitAddress() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    // Валідація
    if (!this.phoneNumber) {
      alert("Введіть номер телефону");
      return;
    }
    if (!this.formData.city) {
      alert("Оберіть місто");
      return;
    }
    if (!this.formData.deliveryType) {
      alert("Оберіть тип доставки");
      return;
    }

    // Формування адреси залежно від типу доставки
    const deliveryAddress = 
      this.formData.deliveryType === "courier"
        ? `${this.deliveryAddress.street} ${this.deliveryAddress.number}`
        : this.deliveryAddress.warehouse;

    try {
      const response = await axios.post(
        "http://26.235.139.202:8080/api/user-address",
        {
          phone_number: this.phoneNumber,
          city: this.formData.city,
          delivery_name: this.formData.deliveryType,
          delivery_address: deliveryAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Адресу успішно збережено!");
      this.fetchUserAddress();
      this.showForm = false;
    } catch (error) {
      console.error("Помилка збереження адреси:", error);
      alert(error.response?.data?.message || "Не вдалося зберегти адресу");
    }
  },
  resetAddressForm() {
    this.phoneNumber = '';
    this.formData.city = '';
    this.formData.deliveryType = '';
    this.deliveryAddress = {
      street: '',
      number: '',
      warehouse: ''
    };
    this.addressId = null;
  },


  async deleteAddress() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    try {
      await axios.delete(`http://26.235.139.202:8080/api/user-address/${this.addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Адресу успішно видалено');
      this.addressAvailable = false;
      this.resetAddressForm();
    } catch (error) {
      console.error('Помилка видалення адреси:', error);
      alert(error.response?.data?.message || 'Не вдалося видалити адресу');
    }
  },
    // Edit address
    editAddress() {
      this.showForm = true;
    },
    // Cancel edit
    cancelEdit() {
      this.showForm = false;
    }
  }
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
.city-suggestions {
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}
.city-suggestions ul {
  list-style-type: none;
  padding: 0;
}
.city-suggestions li {
  padding: 5px;
  cursor: pointer;
}
.city-suggestions li:hover {
  background-color: #f0f0f0;
}

.city-suggestions ul,
.street-suggestions ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
}

.city-suggestions li,
.street-suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.city-suggestions li:hover,
.street-suggestions li:hover {
  background-color: #f0f0f0;
}

select {
  font-family: 'Merriweather', sans-serif;
  font-size: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  width: 548px;
  box-sizing: border-box;
}

select:focus {
  outline: none;
  border-color: #4a90e2;
}

label span {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

</style>
