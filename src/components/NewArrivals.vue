<template>
    <section class="new-arrivals">
      <h2 class="section-title">{{ $t('newArrivals') }}</h2>
      <div class="arrow-container">
        <img src="@/assets/left_arrow.png" alt="left-arrow" class="arrow left-arrow" @click="showPreviousNewArrivals" />
        <div class="product-grid">
          <div v-for="product in visibleNewArrivals" :key="product.id" class="product-column">
            <router-link :to="`/productpage/${product.id}`" class="product-card-link">
              <div class="product-card">
                <img :src="product.image_url" alt="product-image" class="product-main-image" />
                <div class="product-details">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">{{ product.price }} грн</p>
                  <p class="product-info">{{ product.bead_producer_name }}</p>
                  <!-- Кнопка "Купити" -->
                  <button class="buy-button">
                    <span>{{ $t('buyButton') }}</span>
                    <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <img src="@/assets/arrow_big.png" alt="right-arrow" class="arrow right-arrow" @click="showNextNewArrivals" />
      </div>
      <div class="dots-container">
        <span v-for="(dot, index) in totalPages" :key="index" :class="['dot', index === newArrivalsPage ? 'dark' : 'light']"></span>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newArrivals: [],
        visibleNewArrivals: [],
        newArrivalsPage: 0,
        productsPerPage: 3,
        totalPages: 0,
      };
    },
    methods: {
      async fetchNewArrivals() {
        try {
          const response = await fetch("http://26.235.139.202:8080/api/new-arrivals");
          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          const data = await response.json();
          this.newArrivals = data.data.map(product => ({
            ...product,
            bead_producer_name: product.bead_producer_name.replace(/\\u([\dA-F]{4})/gi, (_, hex) =>
              String.fromCharCode(parseInt(hex, 16))
            )
          }));
          this.updateVisibleNewArrivals();
          this.totalPages = Math.ceil(this.newArrivals.length / this.productsPerPage);
        } catch (error) {
          console.error("Error fetching new arrivals:", error.message);
        }
      },
      updateVisibleNewArrivals() {
        const start = this.newArrivalsPage * this.productsPerPage;
        const end = start + this.productsPerPage;
        this.visibleNewArrivals = this.newArrivals.slice(start, end);
      },
      showPreviousNewArrivals() {
        if (this.newArrivalsPage > 0) {
          this.newArrivalsPage--;
          this.updateVisibleNewArrivals();
        }
      },
      showNextNewArrivals() {
        if (this.newArrivalsPage < this.totalPages - 1) {
          this.newArrivalsPage++;
          this.updateVisibleNewArrivals();
        }
      },
    },
    mounted() {
      this.fetchNewArrivals();
    },
  };
  </script>
  
  
  <style scoped>
  .product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

  /* Ваші стилі залишаються без змін */
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
    text-transform: none; 
    padding-left: 15px; 
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .buy-button:hover {
    background-color: #a01212;
    transform: translateY(-2px);
  }
  
  .section-title {
    color: #222222;
    font-family: 'KyivType Titling', sans-serif;
    font-weight: 900;
    font-size: 32px;
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
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
    gap: 40px; /* Відстань між картками */
    flex-wrap: wrap; /* Тепер можна обертати картки, щоб вони заповнювали рядки */
    max-width: 900px;
    margin: 0 auto;
  }
  
  .product-column {
    flex-grow: 1;
    flex-basis: 270px;
    max-width: 270px;
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
    width: 270px;
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
    transition: transform 0.3s ease;
  }
  
  .product-card:hover .product-main-image {
    transform: scale(1.05);
  }
  
  .product-details {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
    margin-top: -5px;
  }
  
  .product-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -10px;
    color: #808080;
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
    background-color: #480B0B;
    opacity: 75%;
  }
  
  .dot.light {
    background-color: #480B0B;
    opacity: 25%;
  }

  .button-icon{
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  </style>
  