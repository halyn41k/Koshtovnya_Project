<template>
  <main class="product-list">
    <header class="product-header">
      <div class="product-title-container">
        <h1 class="product-title">Товари</h1>
        <div class="filter-container">
          <span class="filter-text">Фільтр</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/4b09284ab367fa70a05a4a4f59e91721443ad7e8e783dfd2c26fb681ebacd30f?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Filter icon" class="filter-icon" />
        </div>
        <form class="search-form" @submit.prevent="handleSearch">
          <label for="searchInput" class="visually-hidden">Пошук</label>
          <input type="text" id="searchInput" class="search-input" placeholder="Пошук" />
          <button type="submit" class="search-button">
            <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d5c4873b11c69bccf0067abe1ce038edad573eb5f56d874777e45978e309d1df?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Search icon" class="search-icon" />
          </button>
        </form>
      </div>
      <button class="add-product-button">
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/b16e6ab49c38393f90f82fabc8bc836adcc3b48eb08a452c5ccea5d5a207d0ea?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Add icon" class="add-icon" />
        <span>Добавити</span>
      </button>
    </header>

    <section class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </section>
  </main>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Гердан "Квітка папороті"', price: '1500₴', material: 'Чеський бісер', image: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/ef875de800dadfa860b1f6bfa18a07082dec4f6e1d5931f4104c2dcdab6ea17f?apiKey=c3e46d0a629546c7a48302a5db3297d5&' },
        { id: 2, name: 'Браслет "Український мотив"', price: '750₴', material: 'Китайський бісер', image: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/2ad8e1ee64a513e03138c9947981841af47801d6937bae9fe8682564b7178f57?apiKey=c3e46d0a629546c7a48302a5db3297d5&' },
        { id: 3, name: 'Браслет "Українські візерунки"', price: '450₴', material: 'Китайський бісер', image: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/5aa05ca83611f5071fa2da2f00607997bb605923d58ed42913c4abf81fa60c41?apiKey=c3e46d0a629546c7a48302a5db3297d5&' },
        { id: 4, name: 'Браслет "Розмаїття кольорів"', price: '750₴', material: 'Чешський бісер', image: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/51dce7dc141431de068e877e6e79143c0d633b1fe529be77bab31e8122e93b83?apiKey=c3e46d0a629546c7a48302a5db3297d5&' },
        { id: 5, name: 'Браслет "Чорно-білий розмай"', price: '650₴', material: 'Чешський бісер', image: 'https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/38dd35b539d5b055a2e4bb30fb23d0927e6104f5357f31bab1164ebc9f4536d5?apiKey=c3e46d0a629546c7a48302a5db3297d5&' },
      ],
    };
  },
  methods: {
    handleSearch() {
      // Implement search functionality
    },
  },
};
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px; /* Adjusted for better balance */
}

.product-title-container {
  flex: 1;
}

.product-title {
  font-family: Montserrat, sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px; /* Reduced for a cleaner look */
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.search-form {
  display: flex;
  align-items: center;
  background-color: rgba(107, 31, 31, 0.1);
  border-radius: 8px;
  padding: 8px 20px;
  border: 1px solid transparent;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: Montserrat, sans-serif;
  font-size: 17px;
  color: #000;
  outline: none;
  height: 20px;;
}

.search-input:focus {
  border: 1px solid #333;
  border-radius: 8px;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
}

.search-icon {
  width: 45px;
  height: 45px;
}

.add-product-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #C4AEAC;
  border: none;
  border-radius: 18px;
  padding: 12px 18px;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 15px; /* Adjusted to fit container */
  color: #000;
  width: 150px;
  height: 50px;
  margin-left: -100px;
}

.add-icon {
  width: 36px;
  height: 36px; /* Adjusted for balance */
}

.product-grid {
  margin-top: -100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Збільшено мінімальну ширину */
  gap: 10px;
}


.visually-hidden {
  position: absolute;
  width: 30px;
  height: 100px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 991px) {
  .product-header {
    flex-direction: column;
  }

  .add-product-button {
    margin-top: 24px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px; /* Adjusted for narrower screens */
  }
}

@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
