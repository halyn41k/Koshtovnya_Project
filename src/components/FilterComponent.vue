<template>
  <div class="filter-container">
    <section class="filter">
      <h2 class="section-title">Доступність</h2>
      <hr class="divider" />
      <div class="availability-options">
        <div class="option" v-for="item in availabilityOptions" :key="item.name">
          <input
            type="checkbox"
            :id="item.name"
            :value="item.name"
            v-model="selectedAvailability"
          />
          <label :for="item.name">{{ item.name }} ({{ item.count }})</label>
        </div>
      </div>

      <h3 class="subsection-title">Розмір</h3>
      <hr class="divider" />
      <div class="dropdown-menu">
        <select v-model="selectedSize" class="dropdown">
          <option value="">(без фільтра)</option>
          <option v-for="size in sizeOptions" :key="size" :value="size">
            {{ size }} см
          </option>
        </select>
      </div>

      <h3 class="subsection-title">Колір</h3>
      <hr class="divider" />
      <div class="dropdown-menu">
        <select v-model="selectedColor" class="dropdown">
          <option value="">(без фільтра)</option>
          <option v-for="color in colorOptions" :key="color" :value="color">
            {{ color }}
          </option>
        </select>
      </div>

      <h3 class="subsection-title">Тип бісеру</h3>
      <hr class="divider" />
      <div class="bead-type-options">
        <div class="option" v-for="item in beadTypeOptions" :key="item.name">
          <input
            type="checkbox"
            :id="item.name"
            :value="item.name"
            v-model="selectedBeadTypes"
          />
          <label :for="item.name">{{ item.name }} ({{ item.count }})</label>
        </div>
      </div>

      <h3 class="subsection-title">Виробник бісеру</h3>
      <hr class="divider" />
      <div class="manufacturer-options">
        <div class="option" v-for="item in beadProducerOptions" :key="item.origin_country">
          <input
            type="checkbox"
            :id="item.origin_country"
            :value="item.origin_country"
            v-model="selectedProducers"
          />
          <label :for="item.origin_country">{{ item.origin_country }} ({{ item.count }})</label>
        </div>
      </div>

      <h3 class="subsection-title">Вага</h3>
      <hr class="divider" />
      <div class="input-box">
        <div class="min-box">
          <input type="number" v-model="weightRange[0]" :min="weightOptions.min" :max="weightOptions.max" step="1" />
        </div>
        <div class="input-divider"></div>
        <div class="max-box">
          <input type="number" v-model="weightRange[1]" :min="weightOptions.min" :max="weightOptions.max" step="1" />
        </div>
      </div>
      <div class="range-slider">
        <input type="range" v-model="weightRange[0]" :min="weightOptions.min" :max="weightOptions.max" class="slider" step="1" />
        <input type="range" v-model="weightRange[1]" :min="weightOptions.min" :max="weightOptions.max" class="slider" step="1" />
        <div class="slider-track" :style="trackStyle(weightRange[0], weightRange[1], weightOptions.max)"></div>
      </div>

      <h3 class="subsection-title">Ціна</h3>
      <hr class="divider" />
      <div class="input-box">
        <div class="min-box">
          <input type="number" v-model="priceRange[0]" :min="priceOptions.min" :max="priceOptions.max" step="1" />
        </div>
        <div class="input-divider"></div>
        <div class="max-box">
          <input type="number" v-model="priceRange[1]" :min="priceOptions.min" :max="priceOptions.max" step="1" />
        </div>
      </div>
      <div class="range-slider">
        <input type="range" v-model="priceRange[0]" :min="priceOptions.min" :max="priceOptions.max" class="slider" step="1" />
        <input type="range" v-model="priceRange[1]" :min="priceOptions.min" :max="priceOptions.max" class="slider" step="1" />
        <div class="slider-track" :style="trackStyle(priceRange[0], priceRange[1], priceOptions.max)"></div>
      </div>


      <div class="apply-filters">
        <button @click="applyFilters" class="results-button">Результати</button>
      </div>

      <div class="pattern-background"></div>
    </section>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "FilterComponent",
  props: {
    fetchProducts: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      availabilityOptions: [],
      sizeOptions: [],
      colorOptions: [],
      beadTypeOptions: [],
      beadProducerOptions: [],
      weightOptions: { min: 0, max: 1000 },
      priceOptions: { min: 0, max: 10000 },
      selectedAvailability: [],
      selectedSize: "",
      selectedColor: "",
      selectedBeadTypes: [],
      selectedProducers: [],
      weightRange: [0, 1000],
      priceRange: [0, 10000],
    };
  },
  created() {
    this.loadFilters();
  },
  methods: {
    async loadFilters() {
      try {
        const response = await axios.get("http://26.235.139.202:8080/api/filter");
        const data = response.data;

        this.availabilityOptions = data["Доступність"] || [];
        this.sizeOptions = data["Розмір"] || [];
        this.colorOptions = data["Колір"] || [];
        this.beadTypeOptions = data["Тип бісеру"] || [];
        this.beadProducerOptions = data["Виробник бісеру"] || [];
        this.weightOptions = data["Вага"] || { min: 0, max: 1000 };
        this.priceOptions = data["Ціна"] || { min: 0, max: 10000 };
        this.weightRange = [this.weightOptions.min, this.weightOptions.max];
        this.priceRange = [this.priceOptions.min, this.priceOptions.max];
      } catch (error) {
        console.error("Помилка завантаження фільтрів:", error);
      }
    },
    trackStyle(min, max, maxRange) {
      const minPercent = (min / maxRange) * 100;
      const maxPercent = (max / maxRange) * 100;
      return {
        left: `${minPercent}%`,
        right: `${100 - maxPercent}%`,
        background: "linear-gradient(to right, #ccc, #6B1F1F, #ccc)",
      };
    },
    applyFilters() {
  const filters = {};

  // Перевірка наявності вибору доступності
  if (this.selectedAvailability.length > 0) {
    // Перетворюємо значення на '1' або '0', залежно від обраного варіанту
    filters.is_available = this.selectedAvailability.map((availability) => 
      availability === 'В наявності' ? '1' : '0'
    );
  }

  // Додавання інших фільтрів
  if (this.selectedSize) {
    filters.size = parseFloat(this.selectedSize);
  }

  if (this.selectedColor) {
    filters.color = this.selectedColor;
  }

  if (this.selectedBeadTypes.length > 0) {
    filters.type_of_bead = this.selectedBeadTypes;
  }

  if (this.selectedProducers.length > 0) {
    filters.bead_producer = this.selectedProducers;
  }

  if (this.weightRange[0] !== this.weightOptions.min || this.weightRange[1] !== this.weightOptions.max) {
    filters.weight_from = parseFloat(this.weightRange[0]);
    filters.weight_to = parseFloat(this.weightRange[1]);
  }

  if (this.priceRange[0] !== this.priceOptions.min || this.priceRange[1] !== this.priceOptions.max) {
    filters.price_from = parseFloat(this.priceRange[0]);
    filters.price_to = parseFloat(this.priceRange[1]);
  }

  // Викликаємо fetchProducts з усіма фільтрами
  this.fetchProducts(1, filters);
  console.log('Вибрані фільтри:', filters);

    },
  },
};
</script>


  
  <style scoped>
  .filter {
    top: 150px; 
    margin-left: -40px; 
    z-index: 2; 
    background-color: #fff7f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 700px;
    font-family: 'Montserrat', sans-serif;
  }
  
  .pattern-background {
    position: absolute;
    top: -15px;
    left: 100px;
    transform: translateX(-10%); 
    width: 300px;
    height: 1000px; 
    background-image: url('@/assets/patternik.png');
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1; 
  
  }
  
  .section-title,
  .subsection-title {
  text-align: center; 
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0; 
  color: #333;
  align-items: center;
}


.divider {
    width: 30px;
    height: 1px;
    background-color: #8F8A8A;
    margin-bottom: 15px;
  }
  
  .dropdown {
    width: 100%;
    height: 40px;
    background-color: #F6E7E7;
    border: none;
    font-family: 'Montserrat', sans-serif;
    padding-right: 20px;
    background-image: url('data:image/svg+xml;base64,...'); /* Arrow icon as base64 */
    background-position: calc(100% - 10px) center;
    background-repeat: no-repeat;
  }
  
  .option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  input[type="checkbox"] {
    accent-color: #996666;
  }
  
  .range-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .slider-container {
    position: relative;
    width: 100%;
  }
  
  input[type="range"].slider {
  -webkit-appearance: none; 
  appearance: none; 
  width: 100%;
  height: 5px;
  background: transparent;
  position: absolute;
}

  
  input[type="range"].slider::-webkit-slider-runnable-track {
    height: 5px;
  }
  
  input[type="range"].slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
  }
  
  .double-slider-box {
    padding: 20px 40px;
    border-radius: 10px;
    max-width: 20rem;
  }
  
  .range-title {
    margin-bottom: 4rem;
    text-align: center; 
  }

  
  .range-slider {
    position: relative;
    width: calc(100% - 30px); 
    margin-left: 5px; 
    height: 5px;
    margin: 30px 0;
    background-color: #8a8a8a;
    border-radius: 5px;
    margin-left: 10px;
  }
  
  .slider-track {
    height: 100%;
    margin-left: 20px;
    position: absolute;
    background-color: #6B1F1F;
    border-radius: 5px;
  }
  
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: calc(90% + 30px);
    background: none;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -7px; 
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    border: 3px solid #999;
    pointer-events: auto;
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
    position: relative;
    top: -12px; 
    left: 5px; 
    z-index: 5;
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    border: 3px solid #6B1F1F;
    pointer-events: auto;
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
    position: relative;
    top: -2px;
  }
  
  input[type="range"]::-ms-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    border: 3px solid #6B1F1F;
    pointer-events: auto;
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
    position: relative;
    top: -2px;
  }
  
  input[type="range"]:nth-of-type(2) {
    z-index: 10;
  }
  
  .input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px; 
  }
  
  .min-box,
  .max-box {
    width: 45%; 

  }
  
  .input-divider {
    width: 10px;
    height: 1px;
    background-color: #8a8a8a; 
  }
  
  .double-slider-box {
    padding: 20px;
    border-radius: 10px;
    max-width: 20rem;
  }
  
  .range-title {
    margin-bottom: 1rem; 
  }
  
  input[type="number"] {
    width: 50%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .results-button {
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  padding: 12px 20px;
  font-weight: 700;
  border-radius: 8px;
  background-color: #6b1f1f; 
  color: white; /* Текст білий */
  border: none;
  cursor: pointer;
  transition: all 0.3s ease; /* Плавний перехід для змін */
  width: 230px;
}


.results-button:hover {
  background-color: #a01212; /* Темніший відтінок при наведенні */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Додаємо тінь при наведенні */
}
я
.results-button:focus {
  outline: none; /* Видаляємо стандартне обведення фокусу */
  box-shadow: 0 0 0 3px rgba(153, 102, 102, 0.6); /* Тінь для фокусу */
}

.results-button:active {
  background-color: #a01212; /* Тіні темніший відтінок при натисканні */
  transform: translateY(2px); /* Зробити кнопку натискною */
}

.apply-filters{
  display: flex;
  justify-content: center; /* Центрує кнопку по горизонталі */
  width: 100%; /* Забезпечує, що контейнер займає всю ширину */
  margin-top: 20px; /* Відступ від інших елементів */
}

  
  </style>
