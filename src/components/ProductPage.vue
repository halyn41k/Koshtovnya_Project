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
                <hr class="divider" />
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
                <div class="quantity-wrapper">
                      <div class="quantity-display">
                        {{ quantity }}
                      </div>
                      <div class="quantity-buttons">
                        <button class="quantity-arrow up-arrow" @click="increaseQuantity">
                          ▲
                        </button>
                        <button class="quantity-arrow down-arrow" @click="decreaseQuantity">
                          ▼
                        </button>
                      </div>
                    </div>



                <button class="buy-button">
                  <span class="buy-text">Купити</span>
                </button>

                <!-- Сердечко (вибір у список бажаного) -->
                <div class="wishlist-wrapper">
                  <div class="wishlist-square" @click="toggleWishlist(product)">
                    <svg
                      v-if="isInWishlist(product.name)"
                      class="filled-heart heart-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <svg
                      v-else
                      class="empty-heart heart-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </div>
                </div>
              </div>⠀
              <hr class="thin-divider" />
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

    <!-- Pass productId only if it's defined -->
    <ProductReviews v-if="productId" :productId="productId" />

    <section>
      <ViewOtherProduct />
    </section>
  </main>
</template>

<script>
import ViewOtherProduct from "./ViewOtherProduct.vue";
import ProductReviews from "./ProductReviews.vue";

export default {
  components: {
    ProductReviews,
    ViewOtherProduct,
  },
  data() {
    return {
      product: {},
      quantity: 1,
      isImageEnlarged: false,
      wishlist: [],
      translations: {
        country_of_manufacture: "Країна виробник товару",
        material: "Матеріал",
        type_of_fitting: "Фурнітура",
        type_of_bead: "Тип бісеру",
        weight: "Вага",
        colors: "Кольори",
        bead_producer_name: "Виробник бісеру",
      },
      productId: null, // Initialize productId to null
    };
  },
  computed: {
    productCharacteristics() {
      const excludeKeys = [
        "id",
        "name",
        "price",
        "image_url",
        "sizes",
        "is_available",
        "quantity",
      ];
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
  increaseQuantity() {
    if (this.quantity < this.product.quantity) {
      this.quantity++;
    }
  },
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  },
  toggleWishlist(product) {
    if (this.isInWishlist(product.name)) {
      this.wishlist = this.wishlist.filter((item) => item !== product.name);
      alert(`${product.name} видалено зі списку бажаного!`);
    } else {
      this.wishlist.push(product.name);
      alert(`${product.name} додано до списку бажаного!`);
    }
  },
  isInWishlist(productName) {
    return this.wishlist.includes(productName);
  },
  resizeImage() {
    alert("Змінено розмір зображення!");
  },
  useTestData() {
    this.product = {
      id: 1,
      name: "Керамічна ваза",
      price: 450,
      image_url: "https://via.placeholder.com/300",
      sizes: [20, 25, 30],
      is_available: true,
      quantity: 10,
      material: "Кераміка",
      country_of_manufacture: "Україна",
      type_of_fitting: "Латунь",
      type_of_bead: "Скляний",
      weight: "1 кг",
      colors: "Білий, Золотий",
      bead_producer_name: "GlassCo",
    };
  },
},

  created() {
    const productIdFromRoute = this.$route.params.id;
    if (productIdFromRoute) {
      this.productId = productIdFromRoute;
      
      // Завантаження даних про продукт
      fetch(`http://26.235.139.202:8080/api/products/${this.productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Помилка завантаження продукту");
          }
          return response.json();
        })
        .then((data) => {
          this.product = data.data || {}; // Переконуємося, що `data` існує
        })
        .catch((error) => {
          console.error("Помилка при завантаженні даних:", error);

          // Використовуємо тестові дані
          this.useTestData();
        });
    }
    
  },
};
</script>


<style scoped>
.title-divider {
  margin: 8px 0; /* Відступ зверху та знизу */
  width: 50%; /* Ширина лінії (коротша, ніж інші) */
  border: 1px solid #ccc; /* Тонка сіра лінія */
}

.size-icon {
  position: absolute;
  right: 0;
  top: 300px; /* Піднято на 300px */
  transform: translateY(-50%);
  width: 35px;
  height: 40px;
  cursor: pointer;
  right: -90px;
}

.specifications-list .spec-grid {
  margin-left: 50px; /* Зміщення характеристик ліворуч */
}

.spec-divider {
  border-top: 1px solid grey;
  margin: 8px 0;
}



.product-image {
  width: 90%;
  height: 300px;
  object-fit: cover;
  margin-left: 100px;
  margin-top: 15px;
  box-shadow: 10px 10px 50px #ddafaf; /* Збільшена інтенсивність тіні */

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

.purchase-controls {
  display: flex;
  align-items: center;
  gap: 10px; /* Відстань між елементами */
  margin-left: -30px;
}
.quantity-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80px;
  height: 40px;
  background-color: #f9f9f9;
  margin-left: -10px;

}

.quantity-display {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  border-right: 1px solid #ccc;
}

.quantity-buttons {
  display: flex;
  flex-direction: column;
}

.quantity-arrow {
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  color: #6b1f1f;
}

.quantity-arrow:hover {
  background-color: #f0f0f0;
}

.up-arrow {
  border-bottom: 1px solid #ccc;
}

.quantity-display {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #171717;
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


.image-normal .product-image {
  width: 300px;
  height: auto;
}

.image-enlarged .product-image {
  width: 500px; /* Новий розмір для збільшення */
  height: auto;
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
    margin-bottom: 4px;
  }
  
  .product-price {
    color: #A01212;
    font-size: 25px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    
  }
  
  .availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #3C6B1F;
    color: #FFF;
    font-size: 15px;
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
  background-color: #F6E7E7; /* основний колір фону */
  border: none;
  font-family: 'Montserrat', sans-serif;
  padding-right: 20px;
  background-image: url('data:image/svg+xml;base64,...');
  background-position: calc(100% - 10px) center;
  background-repeat: no-repeat;
  
}

.size-dropdown option {
  background-color: #F6E7E7; /* основний колір */
  color: #171717; /* колір тексту */
}

.size-dropdown option:hover {
  background-color: #D8B3B3; /* темніший колір, коли наведено */
}

  
  .purchase-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .buy-button {
    max-width: 200px;
    display: flex;
    justify-content: space-between; /* Align text and icon */
    
    padding: 12px 17px; /* Збільшені падінги */
    width: 180px; /* Більша ширина */
    color: #FFF;
    align-items: center;
    background: #6B1F1F;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-family: 'Merriweather', serif;
  }

  /* Centered Sections */
  .centered-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  

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
    text-align: left;
    margin-left: 800px;
  }
  
  .spec-divider {
    border-top: 1px solid lightgrey;
    margin: 8px 0;
  }
  
  /* Reviews */
 
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


.heart-icon {
  width: 20px;
  height: 20px;
}

.divider{
  width: 100px;
}
  
  </style>
  