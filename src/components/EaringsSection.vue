<template>
    <section class="earings-section">
      <aside class="sidebar">
        <FilterComponent />
      </aside>
      <main class="main-content">
        <h1 class="section-title">Сережки</h1>
        <div class="earings-grid">
          <article
            v-for="(earing, index) in earings"
            :key="index"
            :class="['earings-card', { 'special-background': earing.id === 3 || earing.id === 5 }]"
          >
            <div class="image-container">
              <img :src="earing.image" :alt="earing.name" class="earings-image" />
            </div>
            <div class="earings-info">
              <h2 class="earings-name">{{ earing.name }}</h2>
              <p class="earings-price">{{ earing.price }}₴</p>
              <div class="material-wishlist">
                <p class="earings-material">{{ earing.material }}</p>
                <div class="wishlist-icon" @click="toggleWishlist(earing)">
                  <svg
                    v-if="isInWishlist(earing.name)"
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    </section>
    <section class="category-product-section">
  <CategoryProduct />
</section>
</template>
  
  <script>
  import { defineAsyncComponent } from 'vue';
  
  export default {
    name: 'EaringsSection',
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
        earings: [
          {
            id: 1,
            name: 'Орнамент',
            price: 120,
            material: 'Чеський бісер',
            image: require('@/assets/Орнамент.png'),
          },
          {
            id: 2,
            name: 'Танок вогню і світла',
            price: 75,
            material: 'Китайський бісер',
            image: require('@/assets/Танок вогню і світла.png'),
          },
          {
            id: 3,
            name: 'Маки',
            price: 310,
            material: 'Японський бісер',
            image: require('@/assets/Маки.png'),
          },
          {
            id: 4,
            name: 'Вишиванка',
            price: 290,
            material: 'Японський бісер',
            image: require('@/assets/Вишиванка.png'),
          },
          {
            id: 5,
            name: 'Сонячний спалах',
            price: 185,
            material: 'Чеський бісер',
            image: require('@/assets/Сонячний спалах.png'),
          },
          {
            id: 6,
            name: 'Рубінові квіти',
            price: 150,
            material: 'Чеський бісер',
            image: require('@/assets/Рубінові квіти.png'),
          },
          {
            id: 7,
            name: 'Небесне натхнення',
            price: 80,
            material: 'Китайський бісер',
            image: require('@/assets/Небесне натхнення.png'),
          },
          {
            id: 8,
            name: 'Сонячна хвиля',
            price: 240,
            material: 'Японський бісер',
            image: require('@/assets/Сонячна хвиля.png'),
          },
          {
            id: 9,
            name: 'Смарагдова тінь',
            price: 90,
            material: 'Китайський бісер',
            image: require('@/assets/Смарагдова тінь.png'),
          },
          {
            id: 10,
            name: 'Поле трояндів',
            price: 90,
            material: 'Китайський бісер',
            image: require('@/assets/Поле трояндів.png'),
          },
          {
            id: 11,
            name: 'Сонячний обрі́й',
            price: 145,
            material: 'Чеський бісер',
            image: require('@/assets/Сонячний обрі́й.png'),
          },
          {
            id: 12,
            name: 'Сніжний мак',
            price: 240,
            material: 'Японський бісер',
            image: require('@/assets/Сніжний мак.png'),
          },
        ],
        wishlist: [],
      };
    },
    methods: {
      isInWishlist(productName) {
        return this.wishlist.includes(productName);
      },
      toggleWishlist(earing) {
        if (this.isInWishlist(earing.name)) {
          this.wishlist = this.wishlist.filter(item => item !== earing.name);
          alert(`${earing.name} видалено зі списку бажаного!`);
        } else {
          this.wishlist.push(earing.name);
          alert(`${earing.name} додано до списку бажаного!`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @font-face {
    font-family: 'KyivType Titling';
    src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Heavy2.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  .earings-section {
    display: flex;
    padding: 20px;
    justify-content: center;
    margin-top: 150px;
  }
  
  .main-content {
    flex-grow: 1;
    max-width: 1200px;
  }
  
  .section-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif; /* Changed to Heavy2 font */
    font-weight: 900; 
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    margin-top: 50px;
    font-size: 30px;
    margin-bottom: 40px;
  }
  
  .earings-grid {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .earings-card {
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
  
  .earings-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    width: 100%;
    height: 180px;
  }
  
  .earings-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .earings-card:hover .earings-image {
    transform: scale(1.05);
  }
  
  .earings-info {
    color: #333;
    padding: 10px;
    font-family: 'Merriweather', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }
  
  .earings-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .earings-price {
    align-items: baseline;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #a01212;
    margin-top: -5px;
  }
  
  .earings-material {
    font-size: 16px;
    color: #808080;
    margin-top: -20px;
  }
  
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
    width: 40px;
    height: 30px;
    margin-left: auto;
  }
  .buy-button img {
  width: 20px;
  height: 15px;
  margin-left: auto;
}

.button-icon{
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
  </style>
  