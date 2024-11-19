<template>
    <div>
      <div v-if="isVisible" class="search-results" @mousedown.stop>
        <h2>Результати пошуку:</h2>
        <ul>
          <li
            v-for="product in highlightedResults"
            :key="product.id"
            class="search-result-item"
          >
            <router-link :to="`/productpage/${product.id}`" class="product-link">
              <img :src="product.image_url" alt="Product Image" />
              <div class="product-details">
                <h3 v-html="product.highlightedName"></h3>
                <p>Ціна: {{ product.price }} ₴</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      query: {
        type: String,
        required: false,
        default: "",
      },
    },
    data() {
      return {
        results: [],
        isVisible: false,
      };
    },
    computed: {
      highlightedResults() {
        const query = this.query.trim();
        if (!query) return this.results;
  
        const regex = new RegExp(`(${query})`, "gi");
        return this.results.map((product) => ({
          ...product,
          highlightedName: product.name.replace(
            regex,
            '<span class="highlight">$1</span>'
          ),
        }));
      },
    },
    watch: {
      query(newQuery) {
        if (newQuery.trim()) {
          this.search(newQuery);
        } else {
          this.results = [];
          this.isVisible = false;
        }
      },
    },
    methods: {
      search(query) {
        const apiUrl = `http://26.235.139.202:8080/api/products/search/${query}`;
        axios
          .get(apiUrl)
          .then((response) => {
            this.results = response.data.data;
            this.isVisible = true;
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
            this.results = [];
            this.isVisible = false;
          });
      },
      handleOutsideClick(event) {
        if (!this.$el.contains(event.target)) {
          this.isVisible = false;
        }
      },
    },
    mounted() {
      document.addEventListener("mousedown", this.handleOutsideClick);
    },
    beforeUnmount() {
      document.removeEventListener("mousedown", this.handleOutsideClick);
    },
  };
  </script>
  
  <style scoped>
  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 250px;
    background-color: #fff7f6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
  }
  
  .search-results h2 {
    margin: 0 0 10px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 18px; /* Зменшено на 5 пікселів */
  }
  
  .search-results ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .search-result-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
  }
  
  .search-result-item:last-child {
    border-bottom: none;
  }
  
  .search-results img {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }
  
  .product-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
  
  .product-details {
    flex-grow: 1;
    text-align: left;
  }
  
  .product-details h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin: 0;
    font-size: 15px; /* Зменшено на 3 пікселя */
  }
  
  .product-details p {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    font-size: 12px;
  }
  
  .highlight {
    color: gray;
    font-weight: bold;
    font-size: 14px; /* Розмір також зменшено */
  }
  
  .search-results::-webkit-scrollbar {
    width: 6px; /* Зроблено тоншим */
  }
  
  .search-results::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 5px;
  }
  </style>
  