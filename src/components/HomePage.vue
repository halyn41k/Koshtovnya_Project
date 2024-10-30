<template>
  <div class="main-container">
    <!-- Welcome Section -->
    <div class="welcome-image"></div>

    <!-- Header Text -->
    <div class="text-container">
      <span class="handmade-beaded-products">Вироби ручної роботи з бісеру</span>
      <span class="exclusive-necklaces-bracelets-earrings">
        Ексклюзивні гердани, браслети, силянки та інше
      </span>
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

    <!-- Category Product Component -->
    <CategoryProduct />
  </div>
</template>

<script>
import CategoryProduct from '@/components/CategoryProduct.vue'; // Імпорт компонента

export default {
  components: {
    CategoryProduct // Реєстрація компонента
  },
  data() {
    return {
      products: [], // Масив для зберігання популярних товарів з API
      visibleProducts: [], // Товари, які відображаються на поточній сторінці
      currentPage: 0, // Номер поточної сторінки
      productsPerPage: 3 // Кількість товарів, що відображаються на сторінці
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    }
  },
  methods: {
    async fetchPopularProducts() {
      try {
        const response = await fetch("http://192.168.1.44:8080/api/popular-products");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Сервер не повернув JSON");
        }

        const data = await response.json();

        // Логування отриманих даних
        console.log("Отримані дані з API:", data);

        // Перевірка, чи є data масивом
        if (!Array.isArray(data.data)) {  // Змінено на data.data
          throw new Error("Очікував масив з API");
        }

        this.products = data.data; // Змінено на data.data
        this.updateVisibleProducts();
      } catch (error) {
        console.error("Помилка при отриманні популярних товарів:", error.message);
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
    updateVisibleProducts() {
      const start = this.currentPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      this.visibleProducts = this.products.slice(start, end);
    }
  },
  mounted() {
    this.fetchPopularProducts();
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
    height: 410px;
    background: url(@/assets/welcome.png) no-repeat center;
    background-size: cover;
    filter: blur(4px);
    opacity: 0.5;
  }
  
  /* Заголовки */
  .text-container {
    position: relative;
    margin-top: -320px;
    padding: 50px;
    text-align: center;
    z-index: 2;
  }
  
  .handmade-beaded-products {
    color: #330505;
    font-family: 'KyivType Titling', sans-serif;
    font-size: 45px;
    font-weight: 840;
    line-height: 1.2;
    margin-right: 500px;
  }
  
  .exclusive-necklaces-bracelets-earrings {
    display: block;
    color: #330505;
    font-family: 'KyivType Titling', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
    margin-right: 450px;
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
  