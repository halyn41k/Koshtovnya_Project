<template>
  <div class="main-container">
    <!-- Welcome Section -->
    <div class="welcome-image"></div>

    <!-- Header Text and New Button -->
    <div class="text-container">
      <div class="handmade-beaded-products">
        Вироби ручної роботи<br>з бісеру
      </div>
      <div class="exclusive-necklaces-bracelets-earrings">
        <br>Ексклюзивні гердани, браслети, <br> силянки та інше
      </div>
      <!-- New Button to View Products -->
      <router-link to="/allproduct" class="view-products-button">
      <button class="view-products-button">Дивитися вироби</button>
      </router-link>
    </div>

    <!-- Content Section -->
    <div class="content-container">
      <div class="left-image-container">
        <div class="girl-image"></div>
        <div class="pattern-image"></div>
      </div>
      <div class="right-text-container">
        <div class="quote-text">
          <span class="ukrainian-heritage">
            Українське етно – це голос предків, вишитий на полотні душі, вплетений у музику вітрів і відлуння карпатських вершин. Це нескінченне джерело сили та краси, яке живить наше сьогодення...
          </span>
        </div>
        <span class="gnat-khotkevich">Гнат Хоткевич</span>
      </div>
    </div>

    <!-- Popular Goods Section -->
    <section class="popular-goods">
      <h2 class="section-title">Популярні товари</h2>
      <div class="arrow-container">
        <img src="@/assets/left_arrow.png" alt="left-arrow" class="arrow left-arrow" @click="showPreviousProducts" />
        <div class="product-grid">
          <div class="product-row">
            <div v-for="product in visibleProducts" :key="product.id" class="product-column">
              <article class="product-card">
                <img :src="product.image_url" :alt="product.name" class="product-main-image" />
                <div class="product-details">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">{{ product.price }}₴</p>
                  <p class="product-info">{{ product.country_of_manufacture }}</p>
                  <button class="buy-button">
                    <span>Купити</span>
                    <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
        <img src="@/assets/arrow_big.png" alt="right-arrow" class="arrow right-arrow" @click="showNextProducts" />
      </div>

      <div class="dots-container">
        <span v-for="(dot, index) in totalPages" :key="index" :class="['dot', index === currentPage ? 'dark' : 'light']"></span>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="new-arrivals">
      <h2 class="section-title">Новинки</h2>
      <div class="arrow-container">
        <img src="@/assets/left_arrow.png" alt="left-arrow" class="arrow left-arrow" @click="showPreviousNewArrivals" />
        <div class="product-grid">
          <div class="product-row">
            <div v-for="product in visibleNewArrivals" :key="product.id" class="product-column">
              <article class="product-card">
                <img :src="product.image_url" :alt="product.name" class="product-main-image" />
                <div class="product-details">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">{{ product.price }}₴</p>
                  <p class="product-info">{{ product.country_of_manufacture }}</p>
                  <button class="buy-button">
                    <span>Купити</span>
                    <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
        <img src="@/assets/arrow_big.png" alt="right-arrow" class="arrow right-arrow" @click="showNextNewArrivals" />
      </div>
    </section>

    <div class="instagram-section">
  <div class="instagram-text-container">
    <img src="@/assets/instapattern.png" alt="Instagram pattern" class="insta-pattern-image" />
    <p class="follow-text">Слідкуй за нами в Instagram, щоб <br>не пропустити найцікавіше!</p>
    <p class="instagram-handle">
      <span class="instagram-handle-link">@koshtovnya_jewelry</span>
    </p>
  </div>

  <!-- Instagram images displayed individually below text -->
  <div class="instagram-grid">
    <div class="instagram-image">
      <img src="@/assets/pic1.png" alt="Instagram Image 1" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic2.png" alt="Instagram Image 2" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic3.png" alt="Instagram Image 3" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic4.png" alt="Instagram Image 4" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic5.png" alt="Instagram Image 5" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic6.png" alt="Instagram Image 6" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic7.png" alt="Instagram Image 7" />
    </div>
    <div class="instagram-image">
      <img src="@/assets/pic8.png" alt="Instagram Image 8" />
    </div>
  </div>
</div>

    <!-- Category Product Component -->
    <CategoryProduct />
  </div>
</template>

<script>
import CategoryProduct from '@/components/CategoryProduct.vue';

export default {
  components: {
    CategoryProduct
  },
  data() {
    return {
      products: [],
      newArrivals: [],
      visibleProducts: [],
      visibleNewArrivals: [],
      currentPage: 0,
      newArrivalsPage: 0,
      productsPerPage: 3,
      instagramImages: [
        { id: 1, src: "@/assets/instagram1.png", alt: "Instagram Image 1" },
        { id: 2, src: "@/assets/instagram2.png", alt: "Instagram Image 2" },
        { id: 3, src: "@/assets/instagram3.png", alt: "Instagram Image 3" },
        { id: 4, src: "@/assets/instagram4.png", alt: "Instagram Image 4" },
      ]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
    newArrivalsTotalPages() {
      return Math.ceil(this.newArrivals.length / this.productsPerPage);
    }
  },
  methods: {
    async fetchPopularProducts() {
      try {
        const response = await fetch("http://192.168.1.44:8080/api/popular-products");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        this.products = data.data;
        this.updateVisibleProducts();
      } catch (error) {
        console.error("Помилка при отриманні популярних товарів:", error.message);
      }
    },
    async fetchNewArrivals() {
      try {
        const response = await fetch("http://192.168.1.44:8080/api/new-arrivals");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        this.newArrivals = data.data;
        this.updateVisibleNewArrivals();
      } catch (error) {
        console.error("Помилка при отриманні новинок:", error.message);
      }
    },
    showNextProducts() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.updateVisibleProducts();
      }
    },
    showPreviousProducts() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateVisibleProducts();
      }
    },
    showNextNewArrivals() {
      if (this.newArrivalsPage < this.newArrivalsTotalPages - 1) {
        this.newArrivalsPage++;
        this.updateVisibleNewArrivals();
      }
    },
    showPreviousNewArrivals() {
      if (this.newArrivalsPage > 0) {
        this.newArrivalsPage--;
        this.updateVisibleNewArrivals();
      }
    },
    updateVisibleProducts() {
      const start = this.currentPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      this.visibleProducts = this.products.slice(start, end);
    },
    updateVisibleNewArrivals() {
      const start = this.newArrivalsPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      this.visibleNewArrivals = this.newArrivals.slice(start, end);
    }
  },
  mounted() {
    this.fetchPopularProducts();
    this.fetchNewArrivals();
  }
};
</script>

  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Podkova:wght@400..800&family=Inter:wght@600&display=swap');
  
  @font-face {
    font-family: 'KyivType Titling';
    src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  
  /* Загальний контейнер */
  .main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 180px;
}
  
  /* Welcome зображення */
  .welcome-image {
  width: 100%;
  height: 510px;
  background: url(@/assets/welcome.png) no-repeat center;
  background-size: cover;
}
  
  /* Заголовки */
  .text-container {
  position: relative;
  margin-top: -450px;
  padding: 100px;
  text-align: left;
}
  
.handmade-beaded-products,
.exclusive-necklaces-bracelets-earrings {
  color: #F6F8F6;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 840;
  line-height: 1.2;
  text-align: left;
}

.handmade-beaded-products {
  font-size: 45px;
  margin-top: -50px; /* Increased space between texts */
}

.exclusive-necklaces-bracelets-earrings {
  font-size: 30px;
}

.button-container {
  margin-top: 550px;
}
  
  /* Контент */
  .content-container {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    align-items: center;
  }
  
  .left-image-container {
    display: flex;
    align-items: center;
  }
  
  .girl-image {
    width: 350px;
    height: 450px;
    background: url(@/assets/girl.png) no-repeat left;
    background-size: cover;
    border-radius: 140px;
    margin-left: 200px;
    margin-top: 150px;
    z-index: 1;
  }
  
  .pattern-image {
    width: 200px;
    height: 450px;
    background: url(@/assets/patern_ethno.png) no-repeat center;
    background-size: cover;
    opacity: 0.5;
    margin-left: -100px;
    margin-top: 150px;
  }
  
  .right-text-container {
    max-width: 600px;
    margin-top: 100px;
    margin-right: 150px;
  }
  
  .quote-text {
    text-align: left;
    margin-left: -50px;
  }
  
  .ukrainian-heritage {
    font-family: 'Podkova', sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.3;
    color: #000;
  }
  
  .gnat-khotkevich {
    font-family: 'Podkova', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
    color: #000;
    margin-left: 350px;
  }
  
  /* Секція популярних товарів */
  .popular-goods {
    display: flex;
    flex-direction: column;
    border-bottom: -100px; /* Reduced margin */
  }
  
  .section-title {
    color: #222222;
    font-family: 'KyivType Titling', sans-serif; /* Changed to Heavy2 font */
    font-weight: 900;
    font-size: 32px; /* Increased font size by 5px */
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    margin-top: 70px;
  }
  
  /* Арров для переключення */
  .arrow-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%; /* Ближче до карток */
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
    left: 150px; /* Стрілка тепер ближче до картки зліва */
  }
  
  .right-arrow {
    right: 150px; /* Стрілка тепер ближче до картки справа */
  }
  
  .arrow:hover {
    transform: scale(1.2);
  }
  
  .product-grid {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    padding: 0;
  }
  
  .product-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    margin: 0;
  }
  
  .product-column {
    flex-grow: 1;
    flex-basis: 280px;
    max-width: 280px;
    margin: 0;
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
  
  .product-title,
  .product-price,
  .product-info {
    margin-top: 0px;
    color:#000;
    text-align: left; /* Вирівнювання з лівого боку */
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
  
  .product-material-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .product-material-icon:hover {
    transform: scale(1.1);
  }
  
  .button-icon{
    width: 10px;
    height: 10px;
    margin-right: 5px;
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
    text-transform: none; /* Remove uppercase */
    padding-left: 15px; /* Add left padding */
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  
  .buy-button:hover {
    background-color: #a01212;
    transform: translateY(-2px);
  }
  
  .buy-button span {
    text-align: left;
  }
  
  .buy-button img {
    width: 20px;
    height: 15px;
    margin-left: auto;
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
  
  /* Style for the heart icon, common properties */
  .wishlist-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .wishlist-icon:hover {
    transform: scale(1.1);
  }
  
  /* Filled heart icon (the heart is in the wishlist) */
  .filled-heart {
    fill: #A01212; /* Filled heart color */
  }
  
  /* Empty heart icon (the heart is not in the wishlist) */
  .empty-heart {
    stroke: #B3B3B3; /* Empty heart border color */
    stroke-width: 2; /* Ensure visible stroke */
    fill: none; /* Keep the heart hollow */
  }
  
  .view-products-button {
  font-family: 'Merriweather', sans-serif;
  color: #fff;
  background-color: #6B1F1F;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 50px; /* Ensures button is on a new line */
  transition: background-color 0.3s ease, transform 0.3s ease;

}

.view-products-button:hover {
    background-color: #a01212;
  }

.instagram-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
  margin-left: 150px;
}

.instagram-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
}

.follow-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;
}

.instagram-handle {
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  color: #000;
  margin-top: -20px;
}

.insta-pattern-image {
  width: 680px;
  height: 90px;
  margin-left: 560px; /* Positions pattern to the right of the text */
  margin-bottom: -130px;
}

.instagram-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
}

/* Instagram handle hover underline effect */
.instagram-handle-link {
  font-size: 25px;
  font-family: 'Montserrat', sans-serif;
  color: black;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
}

.instagram-handle-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 0;
  background-color: #333;
  transition: width 0.3s ease;
}

.instagram-handle-link:hover::after {
  width: 100%;
}

.instagram-handle-link:hover {
  color: #333;
}

/* Instagram images hover zoom effect */
.instagram-image {
  width: 300px;
  height: 300px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.instagram-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.instagram-image:hover img {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


  @media (max-width: 991px) {
    .product-row {
      flex-direction: column;
    }
  
    .product-column {
      width: 100%;
    }
  
    .product-card {
      margin-top: 15px;
    }
  }
</style>