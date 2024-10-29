<template>
    <section class="buy-by-category">
      <h2 class="section-title">Придбайте за категорією</h2>
      <div class="category-container">
        <div class="category-grid">
          <!-- Динамічне завантаження категорій -->
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/category/${category.id}`"
            class="category-item with-squares"
          >
            <div class="square light-square"></div>
            <div class="square dark-square"></div>
            <div class="image-wrapper">
              <img
                loading="lazy"
                :src="category.image_url"
                :alt="category.name"
                class="category-image"
              />
            </div>
            <div class="category-title-wrapper">
              <h2 class="category-title">{{ category.name }}</h2>
              <span class="arrow">→</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [], // Масив для зберігання категорій
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await fetch("http://192.168.1.44:8080/api/categories");
  
          // Перевіряємо, чи відповідь типу JSON
          if (!response.ok) {
            throw new Error(`HTTP помилка: ${response.status}`);
          }
  
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Сервер не повернув JSON");
          }
  
          const data = await response.json();
          this.categories = data.map((category) => ({
            id: category.id,
            name: category.name,
            image_url: category.image_url,
          }));
        } catch (error) {
          console.error("Помилка при отриманні категорій:", error.message);
          console.error("Повна інформація про помилку:", error);
        }
      },
    },
    mounted() {
      // Викликаємо метод отримання категорій після рендеру компонента
      this.fetchCategories();
    },
  };
  </script>
  
  
  <style scoped>
    @font-face {
      font-family: 'KyivType Titling';
      src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Bold3.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
    }
  
    @font-face {
      font-family: 'KyivType Titling Heavy';
      src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
    }
  
    .section-title {
      color: #333;
      font-family: 'KyivType Titling Heavy', sans-serif;
      font-weight: 900;
      text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
      letter-spacing: -2px;
      text-align: center;
      margin-top: 50px;
      font-size: 30px;
      margin-bottom: 40px;
    }
  
    .buy-by-category {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      background-color: #fff7f6;
      margin-top: 20px;
    }
  
    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 100px;
      width: 100%;
      max-width: 1200px;
    }
  
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      text-decoration: none;
      color: inherit;
    }
  
    .category-item:hover {
      text-decoration: none;
    }
  
    .image-wrapper {
      position: relative;
      width: 300px;
      height: 300px; /* Збільшено висоту зображень */
      overflow: hidden;
      margin-top: 20px; /* Додає відступ зверху для опускання елементів */
    }
  
    .category-title-wrapper {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: -1px;
      color: rgb(107, 31, 31);
      margin-top: 10px;
      font-family: 'KyivType Titling', sans-serif;
    }
  
    .category-title {
      font-family: 'KyivType Titling';
      font-weight: 900;
      margin-right: 10px;
    }
  
  /* Стилі для квадратів */
  .square {
    position: absolute;
    width: 300px;
    height: 340px;
    z-index: 1;
    pointer-events: none;
    transition: transform 0.5s ease; /* Додає плавний перехід для анімації */
  }
  
  .light-square {
    background-color: #EADCDB;
    top: -20px;
    left: -50px;
  }
  
  .dark-square {
    background-color: #C4AEAC;
    top: 20px;
    right: -50px;
  }
  
  /* Анімація при наведенні */
  .category-item:hover .light-square {
    transform: translate(-10px, -10px); /* Розсування світлого квадрата вгору та вліво */
  }
  
  .category-item:hover .dark-square {
    transform: translate(10px, 10px); /* Розсування темного квадрата вниз та вправо */
  }
  
  
    .category-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }
  
    .arrow {
      font-size: 24px;
      transition: transform 0.3s ease;
    }
  
    .category-item:hover .arrow {
      transform: translateX(10px);
    }
  
    @media (max-width: 768px) {
      .category-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }
    }
  
    @media (max-width: 480px) {
      .category-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
  </style>
  