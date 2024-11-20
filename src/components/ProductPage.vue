<template>
  <main class="product-content">
    <section class="product-section">
      <div class="product-layout">
        <!-- Зображення товару -->
        <article class="product-image-container">
          <img
            loading="lazy"
            :src="product.image_url"
            alt="Фото товару"
            class="product-image"
          />
          <img
            src="@/assets/size_change.png"
            alt="Змінити розмір"
            class="size-icon"
            @click="resizeImage"
          />
        </article>

        <article class="product-info-container">
          <div class="product-info-wrapper">
            <section class="product-card">
              <div class="product-header">
                <h1 class="product-title">{{ product.name }}</h1>
                <hr class="thin-divider" />
                <p class="product-price">{{ product.price }}₴</p>
                <div
                  class="availability-badge"
                  :class="{ 'available': product.is_available, 'unavailable': !product.is_available }"
                >
                  <span>{{ product.is_available ? 'В наявності' : 'Немає в наявності' }}</span>
                </div>
                <p class="delivery-time">Приблизний час доставки: 1-7 днів</p>
              </div>
              <hr class="thin-divider" />
              <label for="size-select" class="size-label">Розмір</label>
              <div class="size-selector">
                <select id="size-select" class="size-dropdown">
                  <option
                    v-for="size in product.sizes"
                    :key="size"
                    :value="size"
                  >
                    {{ size }} см
                  </option>
                </select>
              </div>
              <div class="purchase-controls">
                <div class="quantity-controls" v-if="product.is_available">
                  <div class="quantity-selector">
                    <button class="arrow-button arrow-up" @click="incrementQuantity"></button>
                    <input
                      type="number"
                      v-model="quantity"
                      :max="product.quantity"
                      min="1"
                      class="quantity-input"
                    />
                    <button class="arrow-button arrow-down" @click="decrementQuantity"></button>
                  </div>
                  <button class="buy-button">
                    <span class="buy-text">Купити</span>
                  </button>
                </div>
                <p v-else class="out-of-stock-message">Товар тимчасово відсутній. Повідомте, коли буде в наявності.</p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>

    <h2 class="specifications-title">Характеристики</h2>
    <section class="specifications-list">
      <dl class="spec-grid">
        <div
          class="spec-item"
          v-for="(value, key) in localizedCharacteristics"
          :key="key"
        >
          <dt class="spec-term">{{ key }}</dt>
          <dd class="spec-description">{{ value }}</dd>
          <hr class="spec-divider" />
        </div>
      </dl>
    </section>

    <h2 class="reviews-title">Відгуки</h2>
    <section class="reviews-section">
  <div class="reviews-container">
    <p v-if="!product.reviews || product.reviews.length === 0" class="no-reviews">
      Немає відгуків.
    </p>
    <div v-else>
      <ul class="reviews-list">
        <li v-for="review in product.reviews" :key="review.id" class="review-item">
          <p class="review-author">{{ review.author }}</p>
          <p class="review-text">{{ review.text }}</p>
          <span class="review-rating">Оцінка: {{ review.rating }}/5</span>
        </li>
      </ul>
      <button class="review-button">Написати відгук</button>
    </div>
  </div>
</section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      quantity: 1,
      translations: {
        country_of_manufacture: "Країна виробник товару",
        material: "Матеріал",
        type_of_fitting: "Фурнітура",
        type_of_bead: "Тип бісеру",
        weight: "Вага",
        colors: "Кольори",
        bead_producer_name: "Виробник бісеру",
      },
    };
  },
  computed: {
    productCharacteristics() {
      const excludeKeys = ['id', 'name', 'price', 'image_url', 'sizes', 'is_available', 'quantity'];
      return Object.keys(this.product)
        .filter((key) => !excludeKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.product[key];
          return obj;
        }, {});
    },
  localizedCharacteristics() {
    return Object.entries(this.productCharacteristics).reduce((acc, [key, value]) => {
      const translatedKey = this.translations[key] || key;
      acc[translatedKey] = value === null ? "Немає" : value; // Якщо значення null, замінюємо на "Немає"
      return acc;
    }, {});
  },
  },
  methods: {
    resizeImage() {
      alert("Змінено розмір зображення!");
    },
    incrementQuantity() {
      if (this.quantity < this.product.quantity) {
        this.quantity++;
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
  created() {
  const productId = this.$route.params.id;
  
  // Завантажуємо дані про продукт
  fetch(`http://26.235.139.202:8080/api/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      this.product = data.data;
      
      // Після успішного завантаження продукту завантажуємо відгуки
      return fetch(`http://26.235.139.202:8080/api/products/${productId}/reviews`);
    })
    .then((response) => response.json())
    .then((reviewsData) => {
      // Додаємо відгуки до об'єкта продукту
      this.product.reviews = reviewsData.data;
    })
    .catch((error) => {
      console.error("Помилка при завантаженні даних:", error);
    });
}

};
</script>

<style scoped>

.size-icon {
  position: absolute;
  right: 0;
  top: -50px; /* Піднято на 300px */
  right: -50px;
  transform: translateY(-50%);
  width: 35px;
  height: 40px;
  cursor: pointer;
}

.specifications-list .spec-grid {
  margin-left: 50px; /* Зміщення характеристик ліворуч */
}

.spec-divider {
  border-top: 1px solid grey;
  margin: 8px 0;
}

.reviews-section {
  margin-top: 30px;
}

.reviews-title {
  font-size: 22px;
  text-align: center;
}

.reviews-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-reviews {
  font-size: 16px;
  color: #666;
  flex-grow: 1;
}

.review-button {
  background-color: #6b1f1f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-image {
  width: 90%;
  height: 300px;
  object-fit: cover;
  margin-left: 100px;
  margin-top: 15px;
  box-shadow: 50px 10px 20px #4e2a2a; /* Збільшена інтенсивність тіні */
}


.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-input {
  width: 50px;
  height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.arrow-button {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;base64,..."); /* Додайте свої іконки */
  background-repeat: no-repeat;
  background-position: center;
}

.arrow-up {
  background-image: url('@/assets/arrow-up.png'); /* Іконка вверх */
}

.arrow-down {
  background-image: url('@/assets/arrow-down.png'); /* Іконка вниз */
}

.buy-button {
  flex-grow: 1;
}

.product-image {
  width: 90%;
  height: 300px;
  object-fit: cover;
  margin-left: 100px;
  margin-top: 15px;
  box-shadow: 0px 4px 8px #744444; /* Тінь з кольором #744444 */
}

.purchase-controls .out-of-stock-message {
  font-size: 16px;
  color: #a01212;
  font-family: 'Merriweather', serif;
}
.product-content {
    display: flex;
    flex-direction: column;
    margin-top: 200px;
  }
  
  .product-layout {
    display: flex;
    gap: 20px;
  }
  
  .product-image-container {
    width: 40%;
    position: relative;
  }
  

  .size-icon {
    position: absolute;
    right: -20px;
    width: 35px;
    height: 40px;
    margin-top: 360px;
    margin-left: 100px;
  }
  
  /* Product Info */
  .product-info-container {
    width: 50%;
    margin-left: auto;
  }
  
  .product-info-wrapper {
    margin-top: 13px;
    display: flex;
    flex-direction: column;
  }
  
  .product-card {
    background: #FFF7F6;
    padding: 26px 24px;
    text-align: center;
    background-image: url('@/assets/angle.png');
    background-size: 220px 220px;
    background-repeat: no-repeat;
    background-position: top right;
  }
  
  .product-title {
    color: #000;
    font-size: 30px;
    font-family: 'Merriweather', serif;
  }
  
  .product-price {
    color: #A01212;
    font-size: 25px;
    margin-top: 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }
  
  .availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #3C6B1F;
    color: #FFF;
    font-size: 18px;
    font-family: 'Merriweather', serif;
    border-radius: 8px;
    padding: 10px 15px;
    margin-top: 10px;
  }
  
  .size-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #171717;
  }
  
  .delivery-time
  {
    font-family: 'Montserrat', sans-serif;
  }
  
  /* Controls */
  .size-selector {
    margin-top: 20px;
  }
  
  .size-dropdown {
    width: 170px;
    height: 40px;
    background-color: #F6E7E7;
    border: none;
    font-family: 'Montserrat', sans-serif;
    padding-right: 20px;
    background-image: url('data:image/svg+xml;base64,...');
    background-position: calc(100% - 10px) center;
    background-repeat: no-repeat;
  }
  
  .purchase-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  
  .buy-button {
    width: 100%;
    max-width: 200px;
    display: flex;
    justify-content: space-between; /* Align text and icon */
    align-items: center;
    padding: 5px;
    color: #FFF;
    background: #6B1F1F;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-family: 'Merriweather', serif;
  }
  
  .buy-text {
    margin-left: 10px; /* Align text to the left */
  }
  
  .cart-icon {
    margin-right: 10px; /* Align icon to the right */
  }
  
  /* Centered Sections */
  .centered-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  /* Specifications */
  .specifications-title {
    font-size: 22px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-top: -100px;
    color: #171717;
  }
  
  .wider-centered-section {
    width: 90%; /* Wider content */
    max-width: 1400px;
  }
  
  .decorative-line {
    border-top: 2px solid grey;
    margin: 20px auto;
    width: 100%;
  }
  
  .purchase-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    background-color: #F6E7E7;
    border: 1px solid #ccc;
  }
  
  .quantity-input {
    width: 50px;
    height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #F6E7E7;
  }
  
  .quantity-arrows {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .arrow-up,
  .arrow-down {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #F6E7E7;
    background-image: url('data:image/svg+xml;base64,...'); /* Replace with dropdown arrow icon */
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .wishlist-square {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    cursor: pointer;
  }
  
  .heart-icon {
    width: 24px;
    height: 24px;
  }
  
  .specifications-list {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    color: #171717;
  }
  
  .spec-grid {
    display: flex;
    flex-direction: column; /* Робимо всі елементи вертикальними */
    gap: 2px;
    width: 2400px;
    margin-left: 200px;
  }
  .spec-term {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    text-align: left;
    margin-bottom: -15px;
  }
  
  
  .spec-description {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    text-align: right;
  }
  
  .spec-divider {
    border-top: 1px solid lightgrey;
    margin: 8px 0;
  }
  
  /* Reviews */
  .reviews-title {
    font-size: 22px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-top: 20px;
    color: #171717;
  }
  .specifications-list, .reviews-section {
    padding-top: 10px; /* Adjusted spacing */
  }
  
  .specifications-title,
  .reviews-title {
    font-size: 22px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: #171717;
    position: relative;
    text-align: center;
    margin: 20px 0;
  }
  
  .specifications-title::before,
  .reviews-title::before,
  .specifications-title::after,
  .reviews-title::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 2px;
    background: grey;
  }
  
  .specifications-title::before,
  .reviews-title::before {
    left: 0;
  }
  
  .specifications-title::after,
  .reviews-title::after {
    right: 0;
  }
  
  
  .no-reviews {
    font-family: 'Merriweather', serif;
    font-size: 18px;
    color: #333;
    margin-left: 100px;
  }
  
  .reviews-container {
    display: flex;
    justify-content: space-between; /* Align "Немає відгуків" left, button right */
    align-items: center;
    margin-top: 20px;
  }
  
  .review-button {
    display: flex;
    gap: 10px;
    background: #6B1F1F;
    color: #FFF;
    padding: 10px;
    border-radius: 8px;
    font-family: 'Merriweather', serif;
    font-size: 18px;
  }

  .reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.review-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.review-text {
  margin-bottom: 5px;
}

.review-rating {
  font-size: 14px;
  color: #888;
}

  </style>
  