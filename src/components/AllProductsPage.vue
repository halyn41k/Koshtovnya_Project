<template>
  <section class="products-section">
    <aside class="sidebar">
      <FilterComponent />
    </aside>
    <main class="main-content">
      <h1 class="section-title">Всі вироби</h1>
      <div class="products-grid">
        <article
          v-for="(product, index) in products"
          :key="index"
          :class="['product-card', { 'special-background': product.id === 3 || product.id === 5 }]"
        >
          <div class="image-container">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-price">{{ product.price }}</p>
            <div class="material-wishlist">
              <p class="product-material">{{ product.material }}</p>
              <div class="wishlist-icon" @click="toggleWishlist(product)">
                <svg
                  v-if="isInWishlist(product.name)"
                  class="filled-heart"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  v-else
                  class="empty-heart"
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
            <button class="buy-button">
              <span>Купити</span>
              <img src="@/assets/miniarrow.png" alt="Arrow icon" class="button-icon" />
            </button>
          </div>
        </article>
      </div>
    </main>
  </section>
  <section class="category-product-section">
    <CategoryProduct />
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'AllProducts',
  components: {
    FilterComponent: defineAsyncComponent(() =>
      import('./FilterComponent.vue')
    ),
    CategoryProduct: defineAsyncComponent(() =>
      import('./CategoryProduct.vue')
    ),
  },
  data() {
    return {
      products: [
      {
            id: 1,
            name: 'Браслет "Розмаїття кольорів"',
            price: '750₴',
            material: 'Чешський бісер',
            image: require('@/assets/Розмаїття кольорів.jpg'),
          },
          {
            id: 2,
            name: 'Браслет "Українські візерунки"',
            price: '450₴',
            material: 'Китайський бісер',
            image: require('@/assets/Українські візерунки.jpg'),
          },
          {
            id: 3,
            name: 'Браслет "Чорно-білий розмай"',
            price: '650₴',
            material: 'Чешський бісер',
            image: require('@/assets/Чорно-білий розмай.jpg'),
          },
          {
            id: 4,
            name: 'Браслет "Український мотив"',
            price: '750₴',
            material: 'Китайський бісер',
            image: require('@/assets/Український мотив.png'),
          },
          {
            id: 5,
            name: 'Браслет "Квіти України"',
            price: '390₴',
            material: 'Чешський бісер',
            image: require('@/assets/Квіти України.png'),
          },
          {
            id: 6,
            name: 'Браслет "Теплий соняшник"',
            price: '1280₴',
            material: 'Японський бісер',
            image: require('@/assets/Теплий соняшник.png'),
          },
          {
            id: 7,
            name: 'Браслет "Три кольори"',
            price: '1060₴',
            material: 'Японський бісер',
            image: require('@/assets/Три кольори.jpg'),
          },
          {
            id: 8,
            name: 'Браслет "Національні мотиви"',
            price: '590₴',
            material: 'Китайський бісер',
            image: require('@/assets/Національні мотиви.jpg'),
          },
          {
            id: 9,
            name: 'Браслет "Золота квітка"',
            price: '620₴',
            material: 'Чешський бісер',
            image: require('@/assets/Золота квітка.png'),
          },
          {
            id: 10,
            name: 'Браслет "Гуцульський"',
            price: '1025₴',
            material: 'Японський бісер',
            image: require('@/assets/Гуцульський.png'),
          },
          {
            id: 11,
            name: 'Браслет "Вишиванка"',
            price: '560₴',
            material: 'Чешський бісер',
            image: require('@/assets/Вишиванка.png'),
          },
          {
            id: 12,
            name: 'Браслет "Червоні троянди"',
            price: '1300₴',
            material: 'Японський бісер',
            image: require('@/assets/Червоні троянди.png'),
          },
          {
            id: 1,
            name: 'Дукат "Блакитна симфонія"',
            price: 1180,
            material: 'Китайський бісер',
            image: require('@/assets/Блакитна симфонія.png'),
          },
          {
            id: 2,
            name: 'Дукат "Лісовий оберіг"',
            price: 1520,
            material: 'Чеський бісер',
            image: require('@/assets/Лісовий оберіг.png'),
          },
          {
            id: 3,
            name: 'Дукат "Золотий світанок"',
            price: 1590,
            material: 'Чеський бісер',
            image: require('@/assets/Золотий світанок.png'),
          },
          {
            id: 5,
            name: 'Дукат "Зоряний танець"',
            price: 1210,
            material: 'Китайський бісер',
            image: require('@/assets/Зоряний танець.png'),
          },
          {
            id: 6,
            name: 'Дукат "Жар серця"',
            price: 1940,
            material: 'Японський бісер',
            image: require('@/assets/Жар серця.png'),
          },
          {
            id: 7,
            name: 'Дукат "Смарагд у ночі"',
            price: 1480,
            material: 'Чеський бісер',
            image: require('@/assets/Смарагд у ночі.png'),
          },
          {
            id: 8,
            name: 'Дукат "Морська глибина"',
            price: 1200,
            material: 'Чеський бісер',
            image: require('@/assets/Морська глибина.png'),
          },
          {
            id: 9,
            name: 'Дукат "Калиновий жар"',
            price: 960,
            material: 'Китайський бісер',
            image: require('@/assets/Калиновий жар.png'),
          },
          {
            id: 10,
            name: 'Дукат "Сніжний квіт"',
            price: 910,
            material: 'Японський бісер',
            image: require('@/assets/Сніжний квіт.png'),
          },
          {
            id: 11,
            name: 'Дукат "Лазурне небо"',
            price: 420,
            material: 'Китайський бісер',
            image: require('@/assets/Лазурне небо.png'),
          },
          {
            id: 12,
            name: 'Дукат "Багряний захід"',
            price: 960,
            material: 'Японський бісер',
            image: require('@/assets/Багряний захід.png'),
          },
          {
            id: 1,
            name: 'Пояс "Маковий сплеск"',
            price: 1500,
            material: 'Чеський бісер',
            image: require('@/assets/Маковий сплеск.png'),
          },
          {
            id: 2,
            name: 'Пояс "Сині мрії"',
            price: 750,
            material: 'Китайський бісер',
            image: require('@/assets/Сині мрії.png'),
          },
          {
            id: 3,
            name: 'Пояс "Золота симфонія маків"',
            price: 760,
            material: 'Китайський бісер',
            image: require('@/assets/Золота симфонія маків.png'),
          },
          {
            id: 4,
            name: 'Пояс "Квітковий акорд"',
            price: 1490,
            material: 'Японський бісер',
            image: require('@/assets/Квітковий акорд.png'),
          },
          {
            id: 5,
            name: 'Пояс "Ромбове мереживо"',
            price: 1120,
            material: 'Чеський бісер',
            image: require('@/assets/Ромбове мереживо.png'),
          },
          {
            id: 6,
            name: 'Пояс "Гуцульський"',
            price: 1580,
            material: 'Японський бісер',
            image: require('@/assets/Гуцульський2.png'),
          },
          {
            id: 7,
            name: 'Пояс "Різнобарвна симфонія"',
            price: 1160,
            material: 'Чеський бісер',
            image: require('@/assets/Різнобарвна симфонія.png'),
          },
          {
            id: 8,
            name: 'Пояс "Ромбові відблиски"',
            price: 700,
            material: 'Китайський бісер',
            image: require('@/assets/Ромбові відблиски.png'),
          },
          {
            id: 9,
            name: 'Пояс "Квітковий стиль"',
            price: 1680,
            material: 'Японський бісер',
            image: require('@/assets/Квітковий стиль.png'),
          },
          {
            id: 10,
            name: 'Пояс "Контрастні ромби"',
            price: 1400,
            material: 'Японський бісер',
            image: require('@/assets/Контрастні ромби.png'),
          },
          {
            id: 11,
            name: 'Пояс "Сині зорі"',
            price: 790,
            material: 'Китайський бісер',
            image: require('@/assets/Сині зорі.png'),
          },
          {
            id: 12,
            name: 'Пояс "Сніжні ромби"',
            price: 1080,
            material: 'Чеський бісер',
            image: require('@/assets/Сніжні ромби.png'),
          },
          {
            id: 1,
            name: 'Сережки "Орнамент"',
            price: 120,
            material: 'Чеський бісер',
            image: require('@/assets/Орнамент.png'),
          },
          {
            id: 2,
            name: 'Сережки "Танок вогню і світла"',
            price: 75,
            material: 'Китайський бісер',
            image: require('@/assets/Танок вогню і світла.png'),
          },
          {
            id: 3,
            name: 'Сережки "Маки"',
            price: 310,
            material: 'Японський бісер',
            image: require('@/assets/Маки.png'),
          },
          {
            id: 4,
            name: 'Сережки "Вишиванка"',
            price: 290,
            material: 'Японський бісер',
            image: require('@/assets/Вишиванка.png'),
          },
          {
            id: 5,
            name: 'Сережки "Сонячний спалах"',
            price: 185,
            material: 'Чеський бісер',
            image: require('@/assets/Сонячний спалах.png'),
          },
          {
            id: 6,
            name: 'Сережки "Рубінові квіти"',
            price: 150,
            material: 'Чеський бісер',
            image: require('@/assets/Рубінові квіти.png'),
          },
          {
            id: 7,
            name: 'Сережки "Небесне натхнення"',
            price: 80,
            material: 'Китайський бісер',
            image: require('@/assets/Небесне натхнення.png'),
          },
          {
            id: 8,
            name: 'Сережки "Сонячна хвиля"',
            price: 240,
            material: 'Японський бісер',
            image: require('@/assets/Сонячна хвиля.png'),
          },
          {
            id: 9,
            name: 'Сережки "Смарагдова тінь"',
            price: 90,
            material: 'Китайський бісер',
            image: require('@/assets/Смарагдова тінь.png'),
          },
          {
            id: 10,
            name: 'Сережки "Поле трояндів"',
            price: 90,
            material: 'Китайський бісер',
            image: require('@/assets/Поле трояндів.png'),
          },
          {
            id: 11,
            name: 'Сережки "Сонячний обрі́й"',
            price: 145,
            material: 'Чеський бісер',
            image: require('@/assets/Сонячний обрі́й.png'),
          },
          {
            id: 12,
            name: 'Сережки "Сніжний мак"',
            price: 240,
            material: 'Японський бісер',
            image: require('@/assets/Сніжний мак.png'),
          },
          {
            id: 1,
            name: 'Гердан "Квітка папороті"',
            price: '1500₴',
            material: 'Чешський бісер',
            image: require('@/assets/Квітка папороті.png'),
          },
          {
            id: 2,
            name: 'Гердан "Гуцулка"',
            price: '1200₴',
            material: 'Чешський бісер',
            image: require('@/assets/Гуцулка.png'),
          },
          {
            id: 3,
            name: 'Гердан "Українська вишиванка"',
            price: '2100₴',
            material: 'Японський бісер',
            image: require('@/assets/Українська вишиванка.png'),
          },
          {
            id: 4,
            name: 'Гердан "Фіалковий"',
            price: '800₴',
            material: 'Китайський бісер',
            image: require('@/assets/Фіалковий.png'),
          },
          {
            id: 5,
            name: 'Гердан "Теплі спогади"',
            price: '1900₴',
            material: 'Японський бісер',
            image: require('@/assets/Теплі спогади.png'),
          },
          
          {
            id: 7,
            name: 'Гердан "Макове диво"',
            price: '850₴',
            material: 'Китайський бісер',
            image: require('@/assets/Макове диво.png'),
          },
          {
            id: 8,
            name: 'Гердан "Червоно-білий"',
            price: '750₴',
            material: 'Китайський бісер',
            image: require('@/assets/Червоно-Білий.png'),
          },
          {
            id: 9,
            name: 'Гердан "Калина"',
            price: '2320₴',
            material: 'Японський бісер',
            image: require('@/assets/Калина.png'),
          },
          {
            id: 10,
            name: 'Гердан "Прозорий"',
            price: '1650₴',
            material: 'Чешський бісер',
            image: require('@/assets/Прозорий.png'),
          },
          {
            id: 11,
            name: 'Гердан "Мереживо"',
            price: '1300₴',
            material: 'Чешський бісер',
            image: require('@/assets/Мереживо.png'),
          },
          {
            id: 12,
            name: 'Гердан "Петрівський розпис"',
            price: '1100₴',
            material: 'Китайський бісер',
            image: require('@/assets/Петрівський розпис.png'),
          },
          {
            id: 1,
            name: 'Силянка "Гуцулка"',
            price: 1000,
            material: 'Чеський бісер',
            image: require('@/assets/Гуцулка2.png'),
          },
          {
            id: 2,
            name: 'Силянка "Лемківська"',
            price: 1600,
            material: 'Японський бісер',
            image: require('@/assets/Лемківська.png'),
          },
          {
            id: 3,
            name: 'Силянка "Темна ніч"',
            price: 800,
            material: 'Чеський бісер',
            image: require('@/assets/Темна ніч.png'),
          },
          {
            id: 4,
            name: 'Силянка "Класична"',
            price: 650,
            material: 'Китайський бісер',
            image: require('@/assets/Класична.png'),
          },
          {
            id: 5,
            name: 'Силянка "Хризантеми"',
            price: 550,
            material: 'Китайський бісер',
            image: require('@/assets/Хризантеми.png'),
          },
          {
            id: 6,
            name: 'Силянка "Готична"',
            price: 1480,
            material: 'Японський бісер',
            image: require('@/assets/Готична.png'),
          },
          {
            id: 7,
            name: 'Силянка "Гуцульська"',
            price: 1100,
            material: 'Чеський бісер',
            image: require('@/assets/Гуцульська.png'),
          },
          {
            id: 8,
            name: 'Силянка "Традиційна"',
            price: 1530,
            material: 'Японський бісер',
            image: require('@/assets/Традиційна.png'),
          },
          {
            id: 9,
            name: 'Силянка "Веселка"',
            price: 1030,
            material: 'Китайський бісер',
            image: require('@/assets/Веселка.png'),
          },
          {
            id: 10,
            name: 'Силянка "Прозора"',
            price: 1450,
            material: 'Чеський бісер',
            image: require('@/assets/Прозора.png'),
          },
          {
            id: 11,
            name: 'Силянка "Червоні квіти"',
            price: 1390,
            material: 'Японський бісер',
            image: require('@/assets/Червоні квіти.png'),
          },
          {
            id: 12,
            name: 'Силянка "Білосніжна"',
            price: 550,
            material: 'Китайський бісер',
            image: require('@/assets/Білосніжна.png'),
          },

      ],
      wishlist: [],
    };
  },
  methods: {
    isInWishlist(productName) {
      return this.wishlist.includes(productName);
    },
    toggleWishlist(product) {
      if (this.isInWishlist(product.name)) {
        this.wishlist = this.wishlist.filter(item => item !== product.name);
        alert(`${product.name} видалено зі списку бажаного!`);
      } else {
        this.wishlist.push(product.name);
        alert(`${product.name} додано до списку бажаного!`);
      }
    },
  },
};
</script>

<style scoped>
/* Font import */
@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

/* Layout for the main product section */
.products-section {
  display: flex;
  padding: 20px;
  justify-content: center;
  margin-top: 150px;
}

.main-content {
  flex-grow: 1;
  max-width: 1200px;
}

/* Title styling */
.section-title {
  color: #333;
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 900;
  text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
  letter-spacing: -2px;
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  margin-bottom: 40px;
}

/* Grid to display products */
.products-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
}

/* Card container */
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

/* Image container */
.image-container {
  width: 100%;
  height: 180px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Product details */
.product-info {
  color: #333;
  padding: 10px;
  font-family: 'Merriweather', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.product-price {
  align-items: baseline;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a01212;
  margin-top: -5px;
}

.product-material {
  font-size: 16px;
  color: #808080;
  margin-top: -20px;
}

/* Wishlist and material section */
.material-wishlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wishlist-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: -30px;
}

.wishlist-icon:hover {
  transform: scale(1.1);
}

.filled-heart {
  fill: #A01212;
}

.empty-heart {
  stroke: #B3B3B3;
  stroke-width: 2;
  fill: none;
}

/* Buy button styling */
.buy-button {
  border-radius: 10px;
  background-color: #6b1f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px;
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

.buy-button span {
  text-align: left;
}

.buy-button img {
  width: 20px;
  height: 15px;
  margin-left: auto;
}

.button-icon {
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
</style>
