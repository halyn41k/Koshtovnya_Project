<template>
    <div class="filter-container"> 
      </div>
      <!-- Фільтр -->
      <section class="filter">
        <!-- Доступність Section -->
        <h2 class="section-title">Доступність</h2>
        <hr class="divider" />
        <div class="availability-options">
          <div class="option">
            <input type="checkbox" id="outOfStock" v-model="availabilityFilters.outOfStock" />
            <label for="outOfStock">Немає в наявності</label>
          </div>
          <div class="option">
            <input type="checkbox" id="inStock" v-model="availabilityFilters.inStock" />
            <label for="inStock">В наявності</label>
          </div>
        </div>
  
        <!-- Розмір Section -->
        <h3 class="subsection-title">Розмір</h3>
        <hr class="divider" />
        <div class="dropdown-menu">
          <select v-model="selectedSize" class="dropdown" @change="applyFilters">
            <option value="">(без фільтра)</option>
            <option value="16">16 см</option>
            <option value="17">17 см</option>
            <option value="18">18 см</option>
            <option value="19">19 см</option>
            <option value="20">20 см</option>
            <option value="25">25 см</option>
          </select>
        </div>
  
        <!-- Колір Section -->
        <h3 class="subsection-title">Колір</h3>
        <hr class="divider" />
        <div class="dropdown-menu">
          <select v-model="selectedColors" class="dropdown" @change="applyFilters">
            <option value="">(без фільтра)</option>
            <option value="Червоний">Червоний</option>
            <option value="Зелений">Зелений</option>
            <option value="Синій">Синій</option>
            <option value="Жовтий">Жовтий</option>
            <option value="Чорний">Чорний</option>
          </select>
        </div>
  
      <!-- Тип бісеру Section -->
      <h3 class="subsection-title">Тип бісеру</h3>
      <hr class="divider" /> <!-- Thin line below the title -->
      <div class="bead-type-options">
        <div class="option">
          <input type="checkbox" id="matte" @change="applyFilters" />
          <label for="matte">Матовий</label>
        </div>
        <div class="option">
          <input type="checkbox" id="transparent" @change="applyFilters" />
          <label for="transparent">Прозорий</label>
        </div>
      </div>
  
      <!-- Виробник бісеру Section -->
      <h3 class="subsection-title">Виробник бісеру</h3>
      <hr class="divider" /> <!-- Thin line below the title -->
      <div class="manufacturer-options">
        <div class="option">
          <input type="checkbox" id="china" @change="applyFilters" />
          <label for="china">Китай</label>
        </div>
        <div class="option">
          <input type="checkbox" id="czech" @change="applyFilters" />
          <label for="czech">Чехія</label>
        </div>
        <div class="option">
          <input type="checkbox" id="japan" @change="applyFilters" />
          <label for="japan">Японія</label>
        </div>
      </div>
  
  <!-- Слайдер Вага -->
  <h3 class="subsection-title">Вага</h3>
  <hr class="divider" />
  <div class="input-box">
    <div class="min-box">
      <input type="number" v-model="weightRange[0]" :min="0" :max="3000" step="1" @input="handleNumberInput('weightRange', 0, $event)" />
    </div>
    <div class="input-divider"></div>
    <div class="max-box">
      <input type="number" v-model="weightRange[1]" :min="0" :max="3000" step="1" @input="handleNumberInput('weightRange', 1, $event)" />
    </div>
  </div>
  <div class="range-slider" @click="moveClosestThumb($event, 'weightRange', 3000)">
    <input type="range" v-model="weightRange[0]" :min="0" :max="3000" class="slider" step="1" @input="applyFilters" />
    <input type="range" v-model="weightRange[1]" :min="0" :max="3000" class="slider" step="1" @input="applyFilters" />
    <div class="slider-track" :style="trackStyle(weightRange[0], weightRange[1], 3000)"></div>
  </div>
  
  <!-- Слайдер Ціна -->
  <h3 class="range-title">Ціна</h3>
  <hr class="divider" />
  <div class="input-box">
    <div class="min-box">
      <input type="number" v-model="priceRange[0]" :min="0" :max="10000" step="1" @input="handleNumberInput('priceRange', 0, $event)" />
    </div>
    <div class="input-divider"></div>
    <div class="max-box">
      <input type="number" v-model="priceRange[1]" :min="0" :max="10000" step="1" @input="handleNumberInput('priceRange', 1, $event)" />
    </div>
  </div>
  <div class="range-slider" @click="moveClosestThumb($event, 'priceRange', 10000)">
    <input type="range" v-model="priceRange[0]" :min="0" :max="10000" class="slider" step="1" @input="applyFilters" />
    <input type="range" v-model="priceRange[1]" :min="0" :max="10000" class="slider" step="1" @input="applyFilters" />
    <div class="slider-track" :style="trackStyle(priceRange[0], priceRange[1], 10000)"></div>
  </div>
  <div class="pattern-background"></div>
  
    </section>
  </template>
  
  <script>
  export default {
    name: 'FilterComponent',
    data() {
      return {
        availabilityFilters: {
          outOfStock: false,
          inStock: false,
        },
        selectedSize: '',
        selectedColors: '',
        weightRange: [0, 3000], // Діапазон ваги
        priceRange: [0, 10000], // Діапазон ціни
      };
    },
    methods: {
      applyFilters() {
        console.log('Застосовані фільтри:', {
          availability: this.availabilityFilters,
          size: this.selectedSize,
          colors: this.selectedColors,
          priceRange: this.priceRange,
          weightRange: this.weightRange,
        });
      },
      trackStyle(min, max, maxRange) {
        const minPercent = (min / maxRange) * 100;
        const maxPercent = (max / maxRange) * 100;
        return {
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
          backgroundColor: '#6B1F1F',
        };
      },
      moveClosestThumb(event, rangeName, maxRange) {
        const rect = event.target.getBoundingClientRect();
        const clickPosition = ((event.clientX - rect.left) / rect.width) * maxRange;
        const [minValue, maxValue] = this[rangeName];
  
        const distToMin = Math.abs(minValue - clickPosition);
        const distToMax = Math.abs(maxValue - clickPosition);
  
        if (distToMin < distToMax) {
          this[rangeName][0] = Math.max(0, Math.min(Math.round(clickPosition), this[rangeName][1] - 1)); // Ліва точка
        } else {
          this[rangeName][1] = Math.min(maxRange, Math.max(Math.round(clickPosition), this[rangeName][0] + 1)); // Права точка
        }
      },
      handleNumberInput(range, index, event) {
        let value = Math.max(0, Math.floor(event.target.value)); // Обмежуємо введення тільки цілими числами
  
        if (index === 0) {
          this[range][0] = Math.min(value, this[range][1] - 1); // Ліва точка не перетинає праву
        } else {
          this[range][1] = Math.max(value, this[range][0] + 1); // Права точка не перетинає ліву
        }
  
        this.applyFilters();
      },
    },
  };
  
  
  
  </script>
  
  <style scoped>
  .filter {
    top: 150px; /* Початкова позиція фільтру */
    margin-left: -40px; /* Зсув фільтру, щоб він не перекривав паттерн */
    z-index: 2; /* Фільтр поверх паттерна */
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
    transform: translateX(-10%); /* Вирівнюємо по центру сторінки */
    width: 300px; /* Зменшена ширина зображення */
    height: 1000px; /* Зменшена висота зображення */
    background-image: url('@/assets/patternik.png');
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1; /* Зображення позаду фільтру */
  
  }
  
  /* Section Titles */
  .section-title,
.subsection-title {
  text-align: center; /* Центрує заголовки */
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0; /* Зменшує відстань зверху і знизу */
  color: #333;
  align-items: center;
}

  
  /* Divider: thin 10px wide line */
  .divider {
    width: 30px;
    height: 1px;
    background-color: #8F8A8A;
    margin-bottom: 15px;
  }
  
  /* Dropdown Styling */
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
  
  /* Option Styling */
  .option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  /* Checkbox Styling */
  input[type="checkbox"] {
    accent-color: #996666;
  }
  
  /* Slider Styles */
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
  
  /* Новий Слайдер */
  .double-slider-box {
    padding: 20px 40px;
    border-radius: 10px;
    max-width: 20rem;
  }
  
  .range-title {
    margin-bottom: 4rem;
  }
  
  .range-slider {
    position: relative;
    width: 100%;
    height: 5px;
    margin: 30px 0;
    background-color: #8a8a8a;
  }
  
  .slider-track {
    height: 100%;
    position: absolute;
    background-color: #6B1F1F;
  }
  
  .slider-track {
    height: 100%;
    position: absolute;
    background-color: #6B1F1F;
  }
  
  /* Слайдери Ціна/Вага */
  
  .range-slider {
    position: relative;
    width: calc(100% - 30px); /* Зменшено ширину на 40px (по 20px з кожної сторони) */
    margin-left: 5px; /* Додано відступ зліва */
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
    width: calc(90% + 30px); /* Ширина збільшена на 40px (по 20px з кожної сторони) */
    background: none;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -7px; /* Зміщено вліво на 20px */
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
    top: -12px; /* Підняти на 10px вище */
    left: 5px; /* Змістити правіше на 3px */
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
    gap: 20px; /* Менший відступ між колонками */
  }
  
  .min-box,
  .max-box {
    width: 45%; /* Встановити однакову ширину для введення ваги і ціни */
  }
  
  .input-divider {
    width: 10px;
    height: 1px;
    background-color: #8a8a8a; /* Полоска між комірками */
  }
  
  .double-slider-box {
    padding: 20px;
    border-radius: 10px;
    max-width: 20rem;
  }
  
  .range-title {
    margin-bottom: 1rem; /* Зменшено відстань */
  }
  
  input[type="number"] {
    width: 50%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  </style>
  