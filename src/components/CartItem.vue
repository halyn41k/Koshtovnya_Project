<template>
    <article class="cart-item">
      <div class="item-number">{{ itemNumber }}.</div>
      <div class="item-content">
        <img :src="imageSrc" :alt="title" class="item-image" />
        <div class="item-details">
          <div class="item-header">
            <div class="item-info">
              <h3 class="item-title">{{ title }}</h3>
              <p class="item-price">{{ price }} / за штуку</p>
            </div>
            <button class="remove-button" aria-label="Видалити товар">Х</button>
          </div>
          <div class="item-controls">
            <p class="item-quantity">Кількість: {{ quantity }}</p>
            <div class="quantity-controls">
              <button class="quantity-button increase" aria-label="Збільшити кількість">+</button>
              <button class="quantity-button decrease" aria-label="Зменшити кількість">-</button>
            </div>
            <p class="item-total">{{ totalPrice }}</p>
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
      title: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
      totalPrice: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    border-radius: 24px;
    background-color: rgba(255, 247, 246, 1);
    border: 2px solid rgba(230, 230, 230, 1);
    overflow: hidden;
    margin-bottom: 55px;
  }
  
  .item-number {
    font-feature-settings: "liga" off, "clig" off;
    text-shadow: 0px 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2.5px;
    color: var(--Grays-Black, #000);
    font: 600 50px/1.3 Montserrat, sans-serif;
    padding: 71px 20px;
  }
  
  .item-content {
    height: 50px;
    display: flex;
    flex-grow: 1;
    padding: 20px;
  }
  
  .item-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  
  .item-details {
    flex-grow: 1;
    margin-left: 20px;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .item-info {
    font-size: 20px;
  }
  
  .item-title {
    color: var(--Grays-Black, #000);
    font-family: Merriweather, sans-serif;
    font-weight: 700;
  }
  
  .item-price {
    color: rgba(160, 18, 18, 1);
    font-family: Inter, sans-serif;
    font-weight: 600;
    margin-top: 4px;
  }
  
  .remove-button {
    border-radius: 8px;
    background-color: rgba(107, 31, 31, 1);
    color: rgba(196, 174, 172, 1);
    padding: 2px 11px;
    font: 600 22px Inter, sans-serif;
    border: none;
    cursor: pointer;
  }
  
  .item-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
    font-family: Inter, sans-serif;
    font-weight: 600;
  }
  
  .item-quantity {
    color: rgba(160, 18, 18, 0.5);
    font: 700 20px Merriweather, sans-serif;
  }
  
  .quantity-controls {
    display: flex;
    gap: 10px;
  }
  
  .quantity-button {
    border-radius: 8px;
    padding: 2px 11px;
    font-size: 22px;
    border: none;
    cursor: pointer;
  }
  
  .increase {
    background-color: rgba(107, 31, 31, 1);
    color: rgba(196, 174, 172, 1);
  }
  
  .decrease {
    background-color: rgba(107, 31, 31, 0.2);
    color: rgba(107, 31, 31, 1);
    font-size: 30px;
  }
  
  .item-total {
    color: rgba(160, 18, 18, 1);
    font-size: 20px;
  }
  
  @media (max-width: 991px) {
    .item-number {
      font-size: 40px;
      margin-top: 40px;
    }
  
    .item-content {
      flex-direction: column;
    }
  
    .item-image {
      margin-top: 15px;
    }
  
    .item-details {
      margin-left: 0;
      margin-top: 20px;
    }
  }
  </style>