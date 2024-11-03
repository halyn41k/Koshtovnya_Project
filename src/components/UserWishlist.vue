<template> 
  <div class="wishlist">
    <h2 class="wishlist-title">Список бажань</h2>
    <div v-if="items.length === 0" class="no-items">
      Ваш список бажань порожній :(
    </div>
    <div v-else>
      <div v-for="(item, index) in items" :key="index" class="wishlist-item">
        <span class="item-number">{{ index + 1 }}.</span>
        <div class="item-content">
          <img :src="item.imageSrc" alt="Product Image" class="item-image"/>
          <div class="item-details">
            <div class="item-header">
              <h3 class="item-name">{{ item.title }}</h3>
              <button class="remove-button" @click="removeItem(index)" aria-label="Remove item">X</button>
            </div>
            <p class="item-price">{{ item.price }}₴ / за штуку</p>
            <button class="buy-button" @click="buyItem">Купити</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserWishlist',
  data() {
    return {
      items: [
        { title: 'Товар 1', price: '750', imageSrc: 'path_to_image' },
        { title: 'Товар 2', price: '150', imageSrc: 'path_to_image' },
      ],
    };
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1); // Remove item from wishlist
    },
    buyItem() {
      this.$router.push('/cart'); // Redirect to cart
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@400;700&family=Montserrat:wght@600&display=swap');

* {
  font-family: 'Merriweather', serif;
}

.wishlist {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.wishlist-title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 10px;
}

.no-items {
  font-size: 16px;
  color: #666;
  text-align: left;
  margin-top: 10px;
}

.wishlist-item {
  display: flex;
  align-items: flex-start;
  background-color: #F5EAE9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
}

.item-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px;
  font-weight: 600;
  color: #333;
  margin-right: 20px;
  margin-top: 50px;
  margin-left: -80px;
}

.item-content {
  display: flex;
  gap: 20px;
}

.item-image {
  width: 180px;
  height: 180px;
  margin-right: 20px;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-size: 20px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: #333;
}

.item-price {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #A01212;
  margin-bottom: 10px;
}

.buy-button {
  background-color: #6B1F1F;
  color: #fff;
  font-family: 'Merriweather', sans-serif;
  font-size: 16px;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
  margin-left: 450px;
}

.buy-button:hover {
  background-color: #8B0E0E;
}

.remove-button {
  background-color: #6B1F1F;
  color: #C4AEAC;
  font-size: 16px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
