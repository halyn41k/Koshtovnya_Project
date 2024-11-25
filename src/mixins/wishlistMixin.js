import axios from 'axios';

export default {
  data() {
    return {
      wishlist: [], // Список бажаного
    };
  },
  methods: {
    async fetchWishlist() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Користувач не авторизований');
        return;
      }
      try {
        const response = await axios.get('http://26.235.139.202:8080/api/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.wishlist = response.data.data.map((item) => item.id);
      } catch (error) {
        console.error('Помилка завантаження списку бажаного:', error);
      }
    },
    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    },
    async toggleWishlist(product) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Будь ласка, увійдіть у свій обліковий запис.');
        this.$router.push('/login');
        return;
      }
      try {
        if (this.isInWishlist(product.id)) {
          await axios.delete(`http://26.235.139.202:8080/api/wishlist/${product.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.wishlist = this.wishlist.filter((id) => id !== product.id);
          alert(`${product.name} видалено зі списку бажаного.`);
        } else {
          await axios.post(
            'http://26.235.139.202:8080/api/wishlist',
            { product_id: product.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.wishlist.push(product.id);
          alert(`${product.name} додано до списку бажаного.`);
        }
      } catch (error) {
        console.error('Помилка при оновленні списку бажаного:', error);
      }
    },
  },
  created() {
    this.fetchWishlist();
  },
};
