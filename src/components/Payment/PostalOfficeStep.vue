<template>
  <div class="delivery-step">
    <div class="input-container">
      <!-- Delivery Type Selection -->
      <select
        v-model="selectedDeliveryCategory"
        @change="updateDeliveryOptions"
        class="input-field"
      >
        <option disabled value="">Оберіть тип доставки</option>
        <option value="courier">Кур'єр</option>
        <option value="pickup">Самовивіз</option>
      </select>

      <!-- Delivery Method Selection -->
      <select
        v-model="formData.deliveryType"
        class="input-field"
        :disabled="!selectedDeliveryCategory"
        @change="validatePostalInfo"
      >
        <option disabled value="">Оберіть спосіб доставки</option>
        <option
          v-for="option in filteredDeliveryOptions"
          :key="option.id"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <span v-if="!filteredDeliveryOptions.length" class="error">
        Способи доставки не доступні
      </span>

      <!-- Dynamic Delivery Inputs -->
      <template v-if="formData.deliveryType && formData.deliveryType.includes('Кур\'єр')">
        <input
          class="input-field"
          v-model="formData.city"
          placeholder="Введіть місто"
          @input="handleCityInput"
        />
        <span v-if="errors.city" class="error">{{ errors.city }}</span>

        <div v-if="cities.length" class="city-suggestions">
          <ul>
            <li v-for="city in cities" :key="city.Ref" @click="selectCity(city)">
              {{ city.city }}
            </li>
          </ul>
        </div>

        <input
          class="input-field"
          v-model="formData.streetSearch"
          placeholder="Введіть назву вулиці"
          :disabled="!formData.city"
          @input="handleStreetSearch"
        />
        <span v-if="errors.street" class="error">{{ errors.street }}</span>

        <div v-if="streets.length" class="street-suggestions">
          <ul>
            <li v-for="(street, index) in streets" :key="index" @click="selectStreet(street)">
              {{ street.street || street.Name }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
    
  <script>
  import axios from "axios";

  export default {
  name: "PostalOfficeStep",
  data() {
    return {
      selectedDeliveryCategory: "",
      formData: {
        deliveryType: "",
        city: "",
        cityRef: "",
        streetSearch: "",
        street: "",
      },
      errors: {
        deliveryType: "",
        city: "",
        street: "",
      },
      filteredDeliveryOptions: [],
      cities: [],
      streets: [],
      deliveryData: {}, // Ensure this is populated correctly
    };
  },
    methods: {
      validatePostalInfo() {
      this.errors = {
        deliveryType: "",
        city: "",
        street: "",
      };

      let valid = true;

      if (!this.formData.deliveryType) {
        this.errors.deliveryType = "Тип доставки обов'язковий";
        valid = false;
      }

      if (this.selectedDeliveryCategory === "courier") {
        if (!this.formData.city) {
          this.errors.city = "Місто обов'язкове";
          valid = false;
        }

        if (!this.formData.street) {
          this.errors.street = "Вулиця обов'язкова";
          valid = false;
        }
      }

      this.$emit("validation", {
        data: this.formData,
        isValid: valid,
        errors: this.errors,
      });

      return valid;
    },
  
      updateDeliveryOptions() {
      if (this.selectedDeliveryCategory) {
        this.filteredDeliveryOptions = this.deliveryData[this.selectedDeliveryCategory];
      } else {
        this.filteredDeliveryOptions = [];
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

        console.log("Отримані типи доставки:", response.data.data); 
        this.deliveryOptions = response.data.data; 
      } catch (error) {
        this.handleApiError(error);
      } finally {
        this.loading = false;
      }
    },
    handleCityInput() {
  console.log("Введене місто:", this.formData.city);
  if (this.formData.city.length >= 3) {
    this.fetchCities();
  }
},


selectCity(city) {
  this.formData.city = city.city;   // Встановлюємо місто
  this.formData.cityRef = city.Ref;  // Встановлюємо Ref міста
  this.cities = [];  // Очищаємо список міст
  console.log("Вибране місто:", { city: this.formData.city, Ref: this.formData.cityRef });
  this.fetchWarehouses();  // Запит на відділення після вибору міста
},

    handleStreetSearch() {
      clearTimeout(this.streetSearchTimeout);
      this.streetSearchTimeout = setTimeout(() => {
        this.fetchStreets(); 
      }, 300);
    },

    selectStreet(street) {
      const streetName = street.street || street.Name; 
      this.formData.street = streetName;
      this.formData.streetSearch = streetName; 
      this.streets = []; 
      console.log("Вибрана вулиця:", this.formData.street);
    },

    async fetchCities() {
  const token = localStorage.getItem("token"); // Define token here
  console.log("Fetching cities with:", {
    city: this.formData.city,
    delivery_type: this.formData.deliveryType,
  });

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
    console.log("Cities API Response:", response.data);

    if (response.data.success && Array.isArray(response.data.data)) {
      this.cities = response.data.data;
    } else {
      console.error("Incorrect response format:", response.data);
      this.cities = [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error.response?.data || error.message);
  }
},
selectDeliveryType(type) {
  this.formData.deliveryType = type;  // Встановлюємо тип доставки
  console.log("Тип доставки обрано:", this.formData.deliveryType);
  this.fetchWarehouses();  // Оновлюємо відділення після вибору типу доставки
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
      // Підготувати дані для шаблону
      this.warehouses = response.data.data.map((item, index) => ({
        id: index + 1, // Унікальний ID
        name: item.warehouse, // Текст назви відділення
      }));
      console.log("Processed warehouses:", this.warehouses);
    } else {
      console.error("No data returned or invalid format");
    }
  } catch (error) {
    console.error("Error fetching warehouses:", error.response?.data || error.message);
  }
},
handleApiError(error) {
      if (error.response) {
        console.error("Помилка сервера:", error.response.data);
        alert(`Сервер повернув помилку: ${error.response.status}`);
      } else {
        console.error("Помилка запиту:", error.message);
        alert("Не вдалося виконати запит. Перевірте ваше з'єднання.");
      }
    },

    handlePostalOfficeSearch() {
      const query = this.formData.postalOfficeSearch.trim().toLowerCase();
      if (query) {
        this.warehouses = this.allWarehouses.filter(warehouse =>
          warehouse.Description.toLowerCase().includes(query)
        );
      } else {
        this.warehouses = [];
      }
    },

    selectPostalOffice(warehouse) {
      this.formData.postalOffice = warehouse.Description; 
      this.formData.postalOfficeSearch = warehouse.Description; 
      this.warehouses = []; 
    },
    },
    created() {
      this.fetchDeliveryTypes();
    }
  }
  </script>

  
<style scoped>

  
@media (max-width: 991px) {

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

    .payment-steps,
    .payment-summary,
    .order-items,
    .delivery-address {
      width: 100%;
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
.input-container {
margin-bottom: 20px;
}
.input-field {
width: 100%;
padding: 10px;
margin-bottom: 10px;
}
.error {
color: red;
font-size: 12px;
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

</style>