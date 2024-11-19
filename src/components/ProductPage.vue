<template>
  <main class="product-content">
    <section class="product-section">
      <div class="product-layout">
        <article class="product-image-container">
          <!-- Зображення товару -->
          <img
            loading="lazy"
            :src="product.image_url"
            alt="Фото товару"
            class="product-image"
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
                <!-- Кількість товару -->
                <div class="quantity-selector">
                  <input
                    type="number"
                    v-model="quantity"
                    :max="product.quantity"
                    min="1"
                    class="quantity-input"
                  />
                </div>
                <button class="buy-button" :disabled="!product.is_available">
                  <span class="buy-text">Купити</span>
                </button>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>

    <!-- Характеристики товару -->
    <h2 class="specifications-title">Характеристики</h2>
    <section class="specifications-list">
      <dl class="spec-grid">
        <div
          class="spec-item"
          v-for="(value, key) in productCharacteristics"
          :key="key"
        >
          <dt class="spec-term">{{ key }}</dt>
          <dd class="spec-description">{{ value }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  computed: {
    productCharacteristics() {
      // Вибираємо всі характеристики, крім певних
      const excludeKeys = ['id', 'name', 'price', 'image_url', 'sizes', 'is_available', 'quantity'];
      return Object.keys(this.product)
        .filter((key) => !excludeKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.product[key];
          return obj;
        }, {});
    },
  },
  created() {
    const productId = this.$route.params.id;
    fetch(`http://26.235.139.202:8080/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        this.product = data.data;
      })
      .catch((error) => {
        console.error('Помилка при завантаженні даних про товар:', error);
      });
  },
};
</script>

<style scoped>
/* Layout */
.product-content {
    display: flex;
    flex-direction: column;
    margin-top: 250px;
  }
  
  .product-layout {
    display: flex;
    gap: 20px;
  }
  
  .product-image-container {
    width: 40%;
    position: relative;
  }
  
  .product-image {
  width: 90%;
  height: 300px; /* Фіксована висота */
  object-fit: cover; /* Забезпечує покриття без спотворень */
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
  </style>
  