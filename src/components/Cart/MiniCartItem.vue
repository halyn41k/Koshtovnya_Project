<template>
    <article class="cart-item">
      <span class="item-number">{{ itemNumber }}.</span>
      <div class="item-content">
        <img :src="imageSrc" :alt="itemName" class="item-image" />
        <div class="item-details">
          <div class="item-header">
            <h3 class="item-name">{{ itemName }}</h3>
            <button class="remove-button" aria-label="Remove item">Х</button>
          </div>
          <p class="item-price">{{ price }}₴ / за штуку</p>
          <div class="item-quantity">
            <p class="quantity-label">Кількість: {{ quantity }}</p>
            <div class="quantity-controls">
              <button class="quantity-button increase" @click="increaseQuantity" aria-label="Increase quantity">+</button>
              <button class="quantity-button decrease" @click="decreaseQuantity" aria-label="Decrease quantity">-</button>
            </div>
            <p class="item-total">{{ price * quantity }}₴</p>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    name: 'CartItem',
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
      },
      quantity: {
        type: Number,
        required: true
      }
    },
    methods: {
      increaseQuantity() {
        // Implement increase quantity logic
      },
      decreaseQuantity() {
        // Implement decrease quantity logic
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    gap: 16px;
    margin-top: 40px;
    width: 100%;
    max-width: 500px;
    position: relative; 
  }
  
  .item-number {
    color: #000;
    font: 700 24px/1.3 "Kyiv * Type Titling", -apple-system, Roboto, Helvetica, sans-serif;
    letter-spacing: -1px;
  }
  
  .item-content {
    background-color: #fff7f6;
    border: 2px solid #e6e6e6;
    border-radius: 16px;
    display: flex;
    gap: 16px;
    padding: 8px;
    width: 100%;
  }
  
  .item-image {
    aspect-ratio: 1.23;
    object-fit: contain;
    width: 140px;
    transition: transform 0.3s; 
    pointer-events: auto; 
  }
  
  .item-image:hover {
    transform: scale(1.2);
    z-index: 10;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-name {
    color: #000;
    font: 600 18px Merriweather, sans-serif;
  }
  
  .remove-button {
    background-color: #6b1f1f;
    border: none;
    border-radius: 6px;
    color: #c4aeac;
    font: 600 16px Inter, sans-serif;
    padding: 2px 8px;
  }
  
  .item-price {
    color: #a01212;
    font: 600 16px Inter, sans-serif;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Inter, sans-serif;
    font-weight: 600;
  }
  
  .quantity-label {
    color: rgba(160, 18, 18, 0.5);
    font: 600 16px Merriweather, sans-serif;
  }
  
  .quantity-controls {
    display: flex;
    gap: 6px;
  }
  
  .quantity-button {
    border: none;
    border-radius: 6px;
    color: #c4aeac;
    font-size: 18px;
    padding: 2px 8px;
  }
  
  .increase {
    background-color: #6b1f1f;
  }
  
  .decrease {
    background-color: rgba(107, 31, 31, 0.2);
    color: #6b1f1f;
  }
  
  .item-total {
    color: #a01212;
    font-size: 16px;
    text-align: right;
  }
  
  @media (max-width: 991px) {
    .cart-item {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      margin-top: 20px;
    }
  
    .item-image {
      margin-top: 8px;
    }
  
    .item-details {
      margin-top: 16px;
    }
  }
  </style>
  