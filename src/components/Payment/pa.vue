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
            @click="openModal"
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
                  :class="{ 'available': isAvailable, 'unavailable': !isAvailable }"
                >
                  <span>{{ isAvailable ? 'В наявності' : 'Немає в наявності' }}</span>
                </div>
                <p class="delivery-time">Приблизний час доставки: 1-7 днів</p>
              </div>
              <hr class="thin-divider" />
              <!-- Розмір -->
              <label for="size-select" class="size-label">Розмір</label>
              <div class="size-selector">
                <select
                  id="size-select"
                  class="size-dropdown"
                  v-model="selectedSize"
                >
                  <option
                    v-for="variant in product.variants"
                    :key="variant.size"
                    :value="variant.size"
                    :disabled="!variant.is_available"
                  >
                    {{ variant.size }} см
                    <span v-if="!variant.is_available"> (Немає в наявності)</span>
                  </option>
                </select>
              </div>

              <div class="purchase-controls">
                <div class="quantity-wrapper">
                  <div class="quantity-display">
                    {{ quantity }}
                  </div>
                  <div class="quantity-buttons">
                    <button
                      class="quantity-arrow up-arrow"
                      @click="increaseQuantity"
                      :disabled="!selectedVariant || quantity >= selectedVariant.quantity"
                    >
                      ▲
                    </button>
                    <button
                      class="quantity-arrow down-arrow"
                      @click="decreaseQuantity"
                      :disabled="quantity <= 1"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                <button
                  v-if="isAvailable"
                  class="buy-button"
                  :disabled="!selectedVariant"
                >
                  <span class="buy-text">Купити</span>
                </button>

                <button
                  v-else
                  class="notify-button"
                  @click="notifyWhenAvailable"
                >
                  <span class="notify-text">Повідомити про наявність</span>
                </button>

                <!-- Сердечко -->
                <div class="wishlist-wrapper">
                  <div class="wishlist-square" @click="toggleWishlist(product)">
                    <svg
                      v-if="isInWishlist(product.id)"
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
              </div>
              <hr class="thin-divider" />
            </section>
          </div>
        </article>
      </div>
    </section>

    <h2 class="specifications-title">Характеристики</h2>
    <section class="specifications-list">
      <dl class="spec-grid" v-if="localizedCharacteristics">
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
  </main>
</template>

<script>
import ViewOtherProduct from "./ViewOtherProduct.vue";
import ProductReviews from "./ProductReviews.vue";
import axios from "axios";

export default {
  components: {
    ProductReviews,
    ViewOtherProduct,
  },
  data() {
  return {
    isModalOpen: false,
    product: {
      variants: [],
    },
    quantity: 1,
    wishlist: [],
    selectedSize: null,
    translations: {
      country_of_manufacture: "Країна виробник товару",
      material: "Матеріал",
      type_of_fitting: "Фурнітура",
      type_of_bead: "Тип бісеру",
      weight: "Вага",
      colors: "Кольори",
      bead_producer_name: "Виробник бісеру",
    },
    productId: null,
  };
},

  computed: {
    isAvailable() {
    return Array.isArray(this.product.variants) && this.product.variants.some((variant) => variant.is_available);
  },
  // Обраний варіант розміру
  selectedVariant() {
    return Array.isArray(this.product.variants)
      ? this.product.variants.find((variant) => variant.size === this.selectedSize)
      : null;
  },

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
    // Локалізовані характеристики
    localizedCharacteristics() {
      return Object.entries(this.productCharacteristics).reduce((acc, [key, value]) => {
        const translatedKey = this.translations[key] || key;
        acc[translatedKey] = value === null ? "Немає" : value;
        return acc;
      }, {});
    },
  },
  methods: {
    async fetchWishlist() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Користувач не авторизований");
        return;
      }
      try {
        const wishlistResponse = await axios.get("http://26.235.139.202:8080/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlistItems = Array.isArray(wishlistResponse.data.products)
          ? wishlistResponse.data.products
          : [];
        this.wishlist = wishlistItems.map((item) => item.id); // Оновлюємо список бажаного
      } catch (error) {
        console.error("Помилка завантаження списку бажаного:", error);
      }
    },
    // Відкриття модального вікна
    openModal() {
      this.isModalOpen = true;
    },
    // Закриття модального вікна
    closeModal() {
      this.isModalOpen = false;
    },
    // Перевірка, чи товар є в списку бажаного
    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    },
    // Додавання або видалення товару зі списку бажаного
    async toggleWishlist(product) {
      const profile = await this.checkAuthAndFetchProfile();
      if (!profile) {
        alert("Будь ласка, увійдіть у свій обліковий запис.");
        this.$router.push("/login");
        return;
      }
      if (this.isInWishlist(product.id)) {
        // Видалити товар зі списку бажаного
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `http://26.235.139.202:8080/api/wishlist/${product.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.wishlist = this.wishlist.filter((id) => id !== product.id); // Оновлюємо список бажаного
          alert(`${product.name} видалено зі списку бажаного!`);
        } catch (error) {
          console.error("Помилка при видаленні з бажаного:", error);
          alert("Не вдалося видалити товар зі списку бажаного.");
        }
      } else {
        // Додати до списку бажаного
        try {
          const token = localStorage.getItem("token");
          await axios.post(
            "http://26.235.139.202:8080/api/wishlist",
            { product_id: product.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.wishlist.push(product.id); // Оновлюємо список бажаного
          alert(`${product.name} додано до списку бажаного!`);
        } catch (error) {
          console.error("Помилка при додаванні до списку бажаного:", error);
          alert("Не вдалося додати товар до списку бажаного.");
        }
      }
    },
    // Перевірка автентифікації та отримання профілю користувача
    async checkAuthAndFetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        return null; // Користувач не авторизований
      }
      try {
        const response = await axios.get("http://26.235.139.202:8080/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data; // Повертаємо дані профілю
      } catch (error) {
        console.error("Помилка авторизації:", error);
        return null; // Помилка при перевірці
      }
    },
    async notifyWhenAvailable() {
    const profile = await this.checkAuthAndFetchProfile();
    if (!profile) {
      alert("Будь ласка, увійдіть у свій обліковий запис.");
      this.$router.push("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Будь ласка, увійдіть у свій обліковий запис.");
      this.$router.push("/login");
      return;
    }

    try {
      await axios.post(
        "http://26.235.139.202:8080/api/notification", 
        { 
          product_id: this.productId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      alert(`Ви будете повідомлені, коли ${this.product.name} з'явиться в наявності!`);
    } catch (error) {
      console.error("Помилка при реєстрації сповіщення:", error);
      
      // More specific error handling
      if (error.response) {
        if (error.response.status === 422) {
          alert("Ви вже підписані на сповіщення про цей товар.");
        } else {
          alert("Не вдалося підписатися на сповіщення. Спробуйте пізніше.");
        }
      } else {
        alert("Помилка мережі. Перевірте підключення.");
      }
    }
  },
    // Збільшення кількості товару
    increaseQuantity() {
      if (this.selectedVariant && this.quantity < this.selectedVariant.quantity) {
        this.quantity++;
      }
    },
    // Зменшення кількості товару
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    // Зміна розміру зображення
    resizeImage() {
      alert("Змінено розмір зображення!");
    },
  },
  created() {
    const productIdFromRoute = this.$route.params.id;
    if (productIdFromRoute) {
      this.productId = productIdFromRoute;
      // Завантаження даних про товар
      fetch(`http://26.235.139.202:8080/api/products/${this.productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Помилка завантаження продукту");
          }
          return response.json();
        })
        .then((data) => {
          this.product = data.data || {};
        })
        .catch((error) => {
          console.error("Помилка при завантаженні даних:", error);
        });
    }
    // Завантаження списку бажаного
    this.fetchWishlist();
  }
};
</script>


