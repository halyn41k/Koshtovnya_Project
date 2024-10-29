<template>
    <main class="product-content">
      <section class="product-section">
        <div class="product-layout">
          <article class="product-image-container">
            <!-- Product Images -->
            <img
              loading="lazy"
              src="@/assets/example1.png"
              alt="Браслет Українські візерунки - детальне фото"
              class="product-image"
            />
            <img src="@/assets/changesize.png" alt="Icon indicating size change" class="size-icon" />
          </article>
  
          <article class="product-info-container">
            <div class="product-info-wrapper">
              <!-- Product Card -->
              <section class="product-card">
                <div class="product-header">
                  <h1 class="product-title">Браслет "Українські візерунки"</h1>
                  <hr class="thin-divider" />
                  <p class="product-price">450₴</p>
                  <div class="availability-badge">
                    <span>В наявності</span>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/2fa8a5e3fb0d7f4e50d013c3be62239c979ad941450aa2d98464c4a0f5433aad?apiKey=c3e46d0a629546c7a48302a5db3297d5"
                      alt="Availability icon"
                      class="availability-icon"
                    />
                  </div>
                  <p class="delivery-time">Приблизний час доставки: 1-7 днів</p>
                </div>
                <hr class="thin-divider" />
                <label for="size-select" class="size-label">Розмір</label>
                <div class="size-selector">
                  <select id="size-select" class="size-dropdown">
                    <option value="16">16 см</option>
                    <option value="17">17 см</option>
                    <option value="18">18 см</option>
                  </select>
                </div>
                <div class="purchase-controls">
                  <!-- Quantity Selector -->
                  <div class="quantity-selector">
                    <input type="number" value="1" min="1" class="quantity-input" />
                    <div class="quantity-arrows">
                      <span class="arrow-up"></span>
                      <span class="arrow-down"></span>
                    </div>
                  </div>
                  <!-- Buy Button -->
                  <button class="buy-button">
                    <span class="buy-text">Купити</span>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?apiKey=c3e46d0a629546c7a48302a5db3297d5"
                      alt="Cart icon"
                      class="cart-icon"
                    />
                  </button>
                  <!-- Wishlist Icon -->
                  <span class="wishlist-square" @click="toggleWishlist(bracelet)">
                    <img src="@/assets/hearting.png" alt="Heart icon" class="heart-icon" />
                  </span>
                </div>
                <hr class="divider" />
              </section>
            </div>
          </article>
        </div>
      </section>
  
      <!-- Updated Specifications Section -->
      <h2 class="specifications-title">Характеристики</h2>
      <section class="specifications-list wider-centered-section">
        <dl class="spec-grid">
          <div class="spec-item" v-for="(spec, index) in specifications" :key="index">
            <dt class="spec-term">{{ spec.term }}</dt>
            <dd class="spec-description">{{ spec.description }}</dd>
            <hr class="spec-divider" />
          </div>
        </dl>
      </section>
  
      <!-- Updated Reviews Section -->
      <h2 class="reviews-title">Відгуки</h2>
      <section class="reviews-section wider-centered-section">
        <div class="reviews-container">
          <p class="no-reviews">Немає відгуків</p>
          <button class="review-button">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/01a58c2e65db623b654e6b388e9515e71e2ea4163c809a8be5054260f63327b7?apiKey=c3e46d0a629546c7a48302a5db3297d5"
              alt="Review icon"
              class="review-icon"
            />
            <span>Написати відгук</span>
          </button>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wishlist: [],
        bracelet: { name: 'Браслет Українські візерунки' },
        specifications: [
          { term: 'Країна виробник товару', description: 'Україна' },
          { term: 'Матеріал', description: 'Бісер, метал' },
          { term: 'Вага', description: '25 г' },
          { term: 'Розмір', description: '16 см' },
          { term: 'Колір', description: 'Білий, голубий, жовтий' },
          { term: 'Виробник бісеру', description: 'Китай' },
        ],
      };
    },
    methods: {
      isInWishlist(productName) {
        return this.wishlist.includes(productName);
      },
      toggleWishlist(bracelet) {
        if (this.isInWishlist(bracelet.name)) {
          this.wishlist = this.wishlist.filter((item) => item !== bracelet.name);
          alert(`${bracelet.name} видалено зі списку бажаного!`);
        } else {
          this.wishlist.push(bracelet.name);
          alert(`${bracelet.name} додано до списку бажаного!`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Montserrat:wght@700&family=Inter:wght@600&display=swap');
  
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
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
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
  