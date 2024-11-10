<template>
    <div class="form-container">
      <h2 class="page-title">Оновлення Товару</h2>
      <form @submit.prevent="updateProduct">
        
        <div class="form-group">
          <label for="product-photo">Завантажити Фото</label>
          <input type="file" id="product-photo" @change="handleFileUpload" accept="image/*">
        </div>
  
        <div class="form-group" v-for="(field, key) in productFields" :key="key">
          <label :for="key">{{ field.label }}</label>
          <input
            v-if="field.type !== 'select'"
            :type="field.type"
            :id="key"
            v-model="product[key]"
            :placeholder="field.placeholder"
            :required="field.required"
          />
          <select v-else :id="key" v-model="product[key]" required>
            <option v-for="option in field.options" :value="option.value" :key="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="submit-btn">Оновити Товар</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductUpdate",
    data() {
      return {
        product: {
          photo: null,
          name: "",
          price: null,
          beadType: "",
          countryOfOrigin: "",
          material: "",
          fittings: "",
          weight: null,
          size: "",
          color: "",
          beadManufacturer: ""
        },
        productFields: {
          name: { label: "Назва Товару", type: "text", placeholder: "Введіть назву товару", required: true },
          price: { label: "Ціна (грн)", type: "number", placeholder: "Введіть ціну товару", required: true },
          beadType: {
            label: "Вид Бісеру",
            type: "select",
            options: [
              { value: "japanese", label: "Японський" },
              { value: "czech", label: "Чеський" },
              { value: "chinese", label: "Китайський" }
            ],
            required: true
          },
          countryOfOrigin: { label: "Країна Виробник", type: "text", placeholder: "Введіть країну виробника" },
          material: { label: "Матеріал", type: "text", placeholder: "Введіть матеріал" },
          fittings: { label: "Фурнітура", type: "text", placeholder: "Введіть фурнітуру" },
          weight: { label: "Вага (г)", type: "number", placeholder: "Введіть вагу" },
          size: { label: "Розмір", type: "text", placeholder: "Введіть розмір" },
          color: { label: "Колір", type: "text", placeholder: "Введіть колір" },
          beadManufacturer: { label: "Виробник Бісеру", type: "text", placeholder: "Введіть виробника бісеру" }
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        this.product.photo = event.target.files[0];
      },
      updateProduct() {
        console.log("Product updated with data:", this.product);
        // Додайте логіку для оновлення товару
      }
    }
  };
  </script>
  
  <style scoped>
  .page-title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
  }
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #F1E9E9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    font-weight: 600;
    color: #040404;
    margin-bottom: 5px;
  }
  input[type="text"], input[type="number"], input[type="file"], select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .submit-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #6B1F1F;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .submit-btn:hover {
    background-color: #a01212;
  }
  </style>
  