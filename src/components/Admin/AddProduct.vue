<template>
  <main class="product-add">
    <header class="product-header">
      <h1 class="product-title">Додавання продукту</h1>
    </header>
    <section class="product-form-container">
      <form class="product-form" @submit.prevent="addProduct">
        <div class="form-group">
          <label for="productName" class="form-label">Назва продукту</label>
          <input id="productName" v-model="form.name" type="text" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="productImage" class="form-label">Зображення</label>
          <input id="productImage" type="file" class="form-input" @change="onImageChange" accept="image/*" required>
        </div>
        <div class="form-group">
          <label for="productCategory" class="form-label">Категорія</label>
          <select id="productCategory" v-model="form.category" class="form-input" required>
            <option v-for="category in formData.categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="productPrice" class="form-label">Ціна</label>
          <input id="productPrice" v-model.number="form.price" type="number" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="beadProducer" class="form-label">Виробник бісеру</label>
          <select id="beadProducer" v-model="form.bead_producer" class="form-input" required>
            <option v-for="producer in formData.bead_producers" :key="producer" :value="producer">{{ producer }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="countryOfManufacture" class="form-label">Країна виробництва</label>
          <select id="countryOfManufacture" v-model="form.country_of_manufacture" class="form-input" required>
  <option v-for="country in formData.countries" :key="country" :value="country">{{ country }}</option>
</select>
        </div>
        <div class="form-group">
          <label for="typeOfBead" class="form-label">Тип бісеру</label>
          <select id="typeOfBead" v-model="form.type_of_bead" class="form-input" required>
  <option v-for="type in formData.types_of_bead" :key="type" :value="type">{{ type }}</option>
</select>
        </div>
        <div class="form-group">
          <label for="productWeight" class="form-label">Вага</label>
          <input id="productWeight" v-model.number="form.weight" type="number" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="productColors" class="form-label">Кольори</label>
          <select id="productColors" @change="onColorsChange" multiple class="form-input" required>
  <option v-for="color in formData.colors" :key="color" :value="color">{{ color }}</option>
</select>

        </div>
        <div class="form-group">
          <label for="productSizes" class="form-label">Розміри</label>
          <div v-for="(size, index) in form.sizes" :key="index" class="size-group">
            <input v-model.number="size.size" type="number" class="form-input" placeholder="Розмір" required>
            <input v-model.number="size.quantity" type="number" class="form-input" placeholder="Кількість" required>
            <button type="button" @click="removeSize(index)" class="remove-button">-</button>
          </div>
          <button type="button" @click="addSize" class="add-button">+</button>
        </div>
        <div class="form-group">
          <label for="productFittings" class="form-label">Фурнітура</label>
          <div v-for="(fitting, index) in form.fittings" :key="index" class="fitting-group">
            <select v-model="fitting.fitting" class="form-input" required>
              <option v-for="f in formData.fittings" :key="f" :value="f">{{ f }}</option>
            </select>
            <select v-model="fitting.material" class="form-input" required>
              <option v-for="material in formData.materials" :key="material" :value="material">{{ material }}</option>
            </select>
            <input v-model.number="fitting.quantity" type="number" class="form-input" placeholder="Кількість" required>
            <button type="button" @click="removeFitting(index)" class="remove-button">-</button>
          </div>
          <button type="button" @click="addFitting" class="add-button">+</button>
        </div>
        <button type="submit" class="submit-button">Додати продукт</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ProductAddForm',
  data() {
    return {
      form: {
        name: '',
        category: '',
        price: 0,
        bead_producer: '',
        country_of_manufacture: '',
        type_of_bead: '',
        weight: 0,
        colors: [],
        sizes: [{ size: 0, quantity: 1 }],
        fittings: [{ fitting: '', material: '', quantity: 1 }],
      },
      formData: {
        categories: [],
        bead_producers: [],
        countries: [],
        types_of_bead: [],
        colors: [],
        fittings: [],
        materials: [],
      },
      image: null,
    };
  },
  methods: {
    async fetchFormData() {
  try {
    const response = await fetch('http://26.235.139.202:8080/api/products/form-data');
    if (!response.ok) {
      throw new Error(`HTTP помилка: ${response.status}`);
    }
    const result = await response.json();
    console.log(result.data); // Перевіряємо ключі
    this.formData = {
      ...result.data,
      countries: result.data.countries_of_manufacture,
      types_of_bead: result.data.type_of_bead,
    };
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
    alert('Не вдалося завантажити дані форми. Перевірте зʼєднання з сервером.');
  }
},
    onImageChange(event) {
      this.image = event.target.files[0];
    },
    addSize() {
      this.form.sizes.push({ size: 0, quantity: 1 });
    },
    removeSize(index) {
      this.form.sizes.splice(index, 1);
    },
    addFitting() {
      this.form.fittings.push({ fitting: '', material: '', quantity: 1 });
    },
    removeFitting(index) {
      this.form.fittings.splice(index, 1);
    },
    async addProduct() {
  const formData = new FormData();
  formData.append('image', this.image);
  formData.append('name', this.form.name);
  formData.append('category', this.form.category);
  formData.append('price', this.form.price);
  formData.append('bead_producer', this.form.bead_producer);
  formData.append('country_of_manufacture', this.form.country_of_manufacture);
  formData.append('type_of_bead', this.form.type_of_bead);
  formData.append('weight', this.form.weight);

  // Додаємо кольори
  this.form.colors.forEach(color => {
    formData.append('colors[]', color);
  });

  // Додаємо розміри
  this.form.sizes.forEach((size, index) => {
    formData.append(`sizes[${index}][size]`, size.size);
    formData.append(`sizes[${index}][quantity]`, size.quantity);
  });

  // Додаємо фурнітуру
  this.form.fittings.forEach((fitting, index) => {
    formData.append(`fittings[${index}][fitting]`, fitting.fitting);
    formData.append(`fittings[${index}][material]`, fitting.material);
    formData.append(`fittings[${index}][quantity]`, fitting.quantity);
  });

  console.log([...formData.entries()]); // Дебаг: перевіряємо, що дані надсилаються коректно

  try {
    const response = await fetch('http://26.235.139.202:8080/api/products', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Помилка сервера:', errorResponse);
      throw new Error('Failed to add product');
    }

    const data = await response.json();
    console.log('Продукт додано:', data);
    alert('Продукт успішно додано!');
    this.resetForm();
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Не вдалося додати продукт. Перевірте дані.');
  }
},

    resetForm() {
      this.form = {
        name: '',
        category: '',
        price: 0,
        bead_producer: '',
        country_of_manufacture: '',
        type_of_bead: '',
        weight: 0,
        colors: [],
        sizes: [{ size: 0, quantity: 1 }],
        fittings: [{ fitting: '', material: '', quantity: 1 }],
      };
      this.image = null;
    },
  },
  created() {
    this.fetchFormData();
  },
};
</script>

<style scoped>
.product-add {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-header {
  text-align: center;
  margin-bottom: 30px;
}

.product-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.product-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  color: #555;
}

.form-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #7a8b9c;
  outline: none;
}

.size-group,
.fitting-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-button,
.add-button {
  background-color: #f44336;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button {
  background-color: #4caf50;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.add-button:hover {
  background-color: #388e3c;
}

.submit-button {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .product-add {
    padding: 15px;
  }

  .product-title {
    font-size: 28px;
  }

  .form-input {
    font-size: 13px;
  }

  .submit-button {
    font-size: 14px;
    padding: 10px 15px;
  }
}

select[multiple] {
  height: auto;
  min-height: 100px; /* Зроби список візуально зручним */
}

</style>
