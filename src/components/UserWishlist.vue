<template>
    <article class="wishlist-item">
      <span class="item-number">{{ itemNumber }}.</span>
      <div class="item-content">
        <img :src="imageSrc" :alt="itemName" class="item-image" />
        <div class="item-details">
          <div class="item-header">
            <h3 class="item-name">{{ itemName }}</h3>
            <button class="remove-button" @click="removeItem" aria-label="Remove item">X</button>
          </div>
          <p class="item-price">{{ price }}₴ / за штуку</p>
          <button class="buy-button" @click="buyItem">Купити</button>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    name: 'WishlistItem',
    props: {
      itemNumber: {
        type: Number,
        required: true
      },
      imageSrc: {
        type: String,
        required: true
      },
      itemName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    methods: {
      removeItem() {
        // Додати логіку для видалення елементу
      },
      buyItem() {
        // Додати логіку для покупки елементу
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@400;700&display=swap');
  
  .wishlist-item {
    display: flex;
    gap: 16px;
    width: 100%;
    max-width: 500px;
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    background-color: #F5EAE9;
  }
  
  .item-number {
    font: 700 18px Merriweather, serif;
    color: #333;
  }
  
  .item-content {
    display: flex;
    gap: 16px;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 6px;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-name {
    font: 700 16px Merriweather, serif;
    color: #333;
  }
  
  .item-price {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #A01212;
  }
  
  .remove-button {
    background-color: transparent;
    border: 1px solid #A01212;
    color: #A01212;
    font-size: 14px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .buy-button {
    background-color: #6B1F1F;
    color: #fff;
    font-family: 'Merriweather', serif;
    font-size: 14px;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .buy-button:hover {
    background-color: #8B0E0E;
  }
  
  @media (max-width: 991px) {
    .wishlist-item {
      flex-direction: column;
      align-items: stretch;
    }
  
    .item-content {
      flex-direction: row;
      align-items: center;
    }
  }
  </style>
  