<template>
    <div class="filter-container"> 
      </div>
      <section class="filter">
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
  
      <h3 class="subsection-title">Тип бісеру</h3>
      <hr class="divider" />
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
  
      <h3 class="subsection-title">Виробник бісеру</h3>
      <hr class="divider" /> 
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
        // Фільтри для доступності товарів
        availabilityFilters: {
          outOfStock: false, // Товари, яких немає в наявності
          inStock: false, // Товари, які є в наявності
        },
        selectedSize: '', // Обраний розмір
        selectedColors: '', // Обрані кольори
        weightRange: [0, 3000], // Діапазон ваги у грамах
        priceRange: [0, 10000], // Діапазон ціни у гривнях
      };
    },
    methods: {
      /**
       * Застосовує фільтри до даних.
       * Наразі лише виводить інформацію про вибрані фільтри у консоль.
       */
      applyFilters() {
        console.log('Застосовані фільтри:', {
          availability: this.availabilityFilters,
          size: this.selectedSize,
          colors: this.selectedColors,
          priceRange: this.priceRange,
          weightRange: this.weightRange,
        });
      },

      /**
       * Розраховує стиль для треку діапазону (смуга між двома ползунками).
       * @param {number} min - Мінімальне значення
       * @param {number} max - Максимальне значення
       * @param {number} maxRange - Загальний діапазон
       * @returns {Object} Об'єкт стилю CSS
       */
      trackStyle(min, max, maxRange) {
        const minPercent = (min / maxRange) * 100; // Мінімальний відсоток
        const maxPercent = (max / maxRange) * 100; // Максимальний відсоток
        return {
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
          backgroundColor: '#6B1F1F', // Колір заповненої частини
        };
      },

      /**
       * Визначає, який ползунок (лівий чи правий) слід перемістити залежно від кліку.
       * @param {MouseEvent} event - Подія кліку
       * @param {string} rangeName - Назва діапазону (наприклад, 'priceRange' або 'weightRange')
       * @param {number} maxRange - Максимальне значення діапазону
       */
      moveClosestThumb(event, rangeName, maxRange) {
        const rect = event.target.getBoundingClientRect(); // Розміри і позиція треку
        const clickPosition = ((event.clientX - rect.left) / rect.width) * maxRange; // Позиція кліку у діапазоні
        const [minValue, maxValue] = this[rangeName]; // Поточні значення діапазону

        // Визначає, до якої точки ближче клік
        const distToMin = Math.abs(minValue - clickPosition);
        const distToMax = Math.abs(maxValue - clickPosition);

        if (distToMin < distToMax) {
          // Переміщує ліву точку
          this[rangeName][0] = Math.max(0, Math.min(Math.round(clickPosition), this[rangeName][1] - 1));
        } else {
          // Переміщує праву точку
          this[rangeName][1] = Math.min(maxRange, Math.max(Math.round(clickPosition), this[rangeName][0] + 1));
        }
      },

      /**
       * Обробляє зміну значення в полях введення діапазонів.
       * @param {string} range - Назва діапазону (наприклад, 'priceRange' або 'weightRange')
       * @param {number} index - Індекс змінюваної точки (0 - ліва, 1 - права)
       * @param {Event} event - Подія вводу
       */
      handleNumberInput(range, index, event) {
        let value = Math.max(0, Math.floor(event.target.value)); // Гарантує, що значення буде цілим числом >= 0

        if (index === 0) {
          // Змінює мінімальне значення, не дозволяючи йому перетнути максимальне
          this[range][0] = Math.min(value, this[range][1] - 1);
        } else {
          // Змінює максимальне значення, не дозволяючи йому перетнути мінімальне
          this[range][1] = Math.max(value, this[range][0] + 1);
        }

        this.applyFilters(); // Застосовує фільтри після зміни значень
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
  
  </style>
  