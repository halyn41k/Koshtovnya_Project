<template>
    <section class="view-other-products">
      <h2 class="specifications-title">{{ $t('Переглянути інші товари') }}</h2>
      <div class="arrow-container">
        <img
          src="@/assets/left_arrow.png"
          alt="left-arrow"
          class="arrow left-arrow"
          @click="showPreviousProducts"
        />
        <div class="product-grid">
          <div
            v-for="product in visibleProducts"
            :key="product.id"
            class="product-column"
          >
            <router-link :to="`/productpage/${product.id}`" class="product-card-link">
              <div class="product-card">
                <img
                  :src="product.image_url"
                  alt="product-image"
                  class="product-main-image"
                />
                <div class="product-details">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">{{ product.price }} грн</p>
                  <p class="product-info">{{ product.bead_producer_name }}</p>
                  <button class="buy-button">
                    <span>{{ $t('buyButton') }}</span>
                    <img
                      src="@/assets/miniarrow.png"
                      alt="Arrow icon"
                      class="button-icon"
                    />
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <img
          src="@/assets/arrow_big.png"
          alt="right-arrow"
          class="arrow right-arrow"
          @click="showNextProducts"
        />
      </div>
      <div class="dots-container">
        <span
          v-for="(dot, index) in totalPages"
          :key="index"
          :class="['dot', index === currentPage ? 'dark' : 'light']"
        ></span>
      </div>⠀
    </section>
  </template>

<script>
export default {
  data() {
    return {
      products: [],
      visibleProducts: [],
      currentPage: 0,
      productsPerPage: 3,
      totalPages: 0,
    };
  },
  methods: {
    async fetchOtherProducts() {
      try {
        const response = await fetch("http://26.235.139.202:8080/api/popular-products");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        this.products = data.data;
        this.updateVisibleProducts();
        this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
      } catch (error) {
        console.error("Error fetching other products:", error.message);
      }
    },
    updateVisibleProducts() {
      const start = this.currentPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      this.visibleProducts = this.products.slice(start, end);
    },
    showPreviousProducts() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateVisibleProducts();
      }
    },
    showNextProducts() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.updateVisibleProducts();
      }
    },
  },
  mounted() {
    this.fetchOtherProducts();
  },
};
</script>
<style scoped>
.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.specifications-title {
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: center;
  color: #171717;
  margin: 20px 0;
  position: relative;
}

.specifications-title::before,
.specifications-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 35%;
  height: 2px;
  background: grey;
  transform: translateY(-50%);
}

.specifications-title::before {
  left: 0;
}

.specifications-title::after {
  right: 0;
}

.view-other-products {
  margin-top: 70px;
}

.arrow-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;
}

.arrow {
  cursor: pointer;
  width: 40px;
  height: 40px;
  transform: scale(1);
  transition: transform 0.3s ease;
  position: absolute;
  top: 50%;
}

.left-arrow {
  left: 150px;
}

.right-arrow {
  right: 150px;
}

.arrow:hover {
  transform: scale(1.2);
}

.product-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: nowrap;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
}

.product-column {
  flex-grow: 1;
  flex-basis: 280px;
  max-width: 280px;
}

.product-card {
  border-radius: 12px;
  background-color: #fff7f6;
  padding-bottom: 15px;
  border: 2px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 280px;
  height: 390px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-main-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.product-details {
  color: #333;
  padding: 10px;
  font-family: 'Merriweather', sans-serif;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
}

.product-price {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a01212;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #808080;
}

.buy-button {
  border-radius: 10px;
  background-color: #6b1f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border: none;
  color: #fff;
  cursor: pointer;
  width: 100%;
  font-family: 'Merriweather', sans-serif;
  font-size: 18px;
}

.buy-button:hover {
  background-color: #a01212;
  transform: translateY(-2px);
}

.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #480b0b;
  opacity: 75%;
}

.dot.light {
  background-color: #480b0b;
  opacity: 25%;
}
</style>
