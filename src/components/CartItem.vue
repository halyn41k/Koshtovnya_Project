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
          <button @click="removeItem" class="remove-button" aria-label="Видалити товар">Х</button>
        </div>
        <div class="item-controls">
          <p class="item-quantity">Кількість: {{ quantity }}</p>
          <div class="quantity-controls">
            <button @click="increaseQuantity" class="quantity-button increase" aria-label="Збільшити кількість">+</button>
            <button @click="decreaseQuantity" class="quantity-button decrease" aria-label="Зменшити кількість">-</button>
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
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return this.price * this.quantity;
    }
  },
  methods: {
    increaseQuantity() {
      this.$emit('change-quantity', this.quantity + 1);
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.$emit('change-quantity', this.quantity - 1);
      }
    },
    removeItem() {
      this.$emit('remove-item');
    }
  }
};
</script>


<style scoped>
.cart-item {
display: flex;
border-radius: 16px;
background-color: rgba(255, 247, 246, 1);
border: 1px solid rgba(230, 230, 230, 1);
overflow: hidden;
margin-bottom: 40px;
padding: 15px;
height: auto;
max-width: 800px;
margin-left: 100px;
}

.item-number {
font-feature-settings: "liga" off, "clig" off;
color: #333;
font: 600 32px/1.3 Montserrat, sans-serif;
padding: 20px;
margin: 0;
margin-top: 60px;
}

.item-content {
display: flex;
flex-grow: 1;
padding: 10px;
align-items: center;
}

.item-image {
width: 120px;
height: 120px;
object-fit: cover;
border-radius: 8px;
margin-right: 15px;
}

.item-details {
flex-grow: 1;
display: flex;
flex-direction: column;
gap: 8px;
}

.item-header {
display: flex;
justify-content: space-between;
align-items: center;
}

.item-title {
color: #000;
font-family: Merriweather, sans-serif;
font-weight: 700;
font-size: 18px;
}

.item-price {
color: rgba(160, 18, 18, 1);
font-family: Inter, sans-serif;
font-weight: 600;
font-size: 16px;
}

.remove-button {
border-radius: 5px;
background-color: rgba(107, 31, 31, 1);
color: #fff;
padding: 5px;
font-size: 16px;
border: none;
cursor: pointer;
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
}

.item-controls {
display: flex;
justify-content: space-between;
align-items: center;
}

.item-quantity {
color: rgba(160, 18, 18, 0.5);
font-size: 20px;
}

.quantity-controls {
display: flex;
gap: 8px;
}

.quantity-button {
border-radius: 8px;
padding: 5px 10px;
font-size: 18px;
border: none;
cursor: pointer;
}

.increase {
background-color: rgba(107, 31, 31, 1);
color: #fff;
}

.decrease {
background-color: rgba(230, 230, 230, 1);
color: rgba(107, 31, 31, 1);
}

.item-total {
color: rgba(160, 18, 18, 1);
font-size: 20px;
font-family: Inter, sans-serif;
font-weight: 600;
}

@media (max-width: 991px) {
.cart-item {
  flex-direction: column;
  padding: 10px;
  margin-left: 20px;
  max-width: 100%;
}

.item-number {
  font-size: 24px;
  padding: 10px 0;
}

.item-content {
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.item-image {
  margin: 10px 0;
}

.item-details {
  margin: 0;
  text-align: center;
}
}
</style>
