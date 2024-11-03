<template>
    <div class="order-items">
      <div class="item">
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/0bf96480ece714f079c9843f43c1f30f47a5cccc1c7e182979a1be8b68324be8?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Браслет 'Розмаїття кольорів'" class="item-image" />
        <div class="item-details">
          <h3 class="item-title">Браслет "Розмаїття кольорів"</h3>
          <p class="item-price">750₴ / за штуку</p>
          <p class="item-quantity">Кількість: 2</p>
        </div>
      </div>
      <div class="item">
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d58f1b57332f78186f2422ff9cf0ab91eb0b5a533f0578d1ffbcb6ff8cacb928?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Гердан 'Гуцулка'" class="item-image" />
        <div class="item-details">
          <h3 class="item-title">Гердан "Гуцулка"</h3>
          <p class="item-price">1200₴ / за штуку</p>
          <p class="item-quantity">Кількість: 1</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderItems'
  }
  </script>
  
  <style scoped>
.order-items {
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 21px 25px; /* 32px / 1.5, 37px / 1.5 */
  background-color: #fff;
}

.item {
  display: flex;
  gap: 13px; /* 20px / 1.5 */
  border-radius: 16px; /* 24px / 1.5 */
  background-color: rgba(255, 247, 246, 1);
  padding: 13px; /* 20px / 1.5 */
  border: 1.33px solid rgba(230, 230, 230, 1); /* 2px / 1.5 */
  margin-bottom: 25px; /* 38px / 1.5 */
}

.item-image {
  width: 115px; /* 173px / 1.5 */
  height: 106px; /* 159px / 1.5 */
  object-fit: contain;
}

.item-details {
  font: 700 13.33px/1.3 Merriweather, sans-serif; /* 20px / 1.5 */
}

.item-title {
  color: var(--Grays-Black, #000);
  margin-bottom: 2.67px; /* 4px / 1.5 */
}

.item-price {
  color: rgba(160, 18, 18, 1);
  font-family: Inter, sans-serif;
  font-weight: 600;
  margin-bottom: 17.33px; /* 26px / 1.5 */
}

.item-quantity {
  color: rgba(160, 18, 18, 0.5);
}

  
  @media (max-width: 991px) {
    .order-items {
      max-width: 100%;
      padding: 20px;
    }
  
    .item {
      flex-direction: column;
    }
  
    .item-image {
      width: 100%;
      height: auto;
    }
  }
  </style>