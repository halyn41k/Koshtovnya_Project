<template>
    <main class="order-management">
      <h1 class="order-title">Замовлення</h1>
      <section class="filter-section">
        <h2 class="filter-title">Фільтр</h2>
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/4b09284ab367fa70a05a4a4f59e91721443ad7e8e783dfd2c26fb681ebacd30f?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Filter icon" class="filter-icon" />
      </section>
      <form class="search-form" @submit.prevent="handleSearch">
        <label for="searchInput" class="visually-hidden">Пошук</label>
        <input type="text" id="searchInput" class="search-input" placeholder="Пошук" aria-label="Пошук" />
        <button type="submit" class="search-button">
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d5c4873b11c69bccf0067abe1ce038edad573eb5f56d874777e45978e309d1df?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Search icon" class="search-icon" />
        </button>
      </form>
      <section class="order-header">
        <div class="order-header-left">
          <h3 class="order-header-item">ID</h3>
          <h3 class="order-header-item">Номер/Деталі</h3>
        </div>
        <div class="order-header-right">
          <h3 class="order-header-item">Статус</h3>
          <h3 class="order-header-item">Телефон</h3>
          <h3 class="order-header-item">Додано</h3>
          <h3 class="order-header-item">Керування</h3>
        </div>
      </section>
      <ul class="order-list">
        <li v-for="(order, index) in orders" :key="index" class="order-item">
          <div class="order-details">
            <div class="order-id-name">
              <span class="order-id">{{ index + 1 }}.</span>
              <div class="order-name">
                <h4 class="order-number">Замовлення №{{ index + 1 }}</h4>
                <p class="order-description">Гердан "Гуцулка"</p>
              </div>
            </div>
            <div class="order-info">
              <span class="order-status">{{ order.status }}</span>
              <span class="order-phone">{{ order.phone }}</span>
              <span class="order-date">{{ order.date }}</span>
            </div>
          </div>
          <div class="order-actions">
            <button class="action-button delete-button" @click="deleteOrder(index)">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/fd9b15981ca264bc0f4746a9acc8dbbd74d669751270302ca2c8bc000258d798?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Delete icon" class="action-icon" />
              <span>Видалити</span>
            </button>
            <button class="action-button update-button" @click="showUpdateModal(index)">
              <img :src="'http://b.io/ext_' + (index + 4) + '-'" alt="Update icon" class="action-icon" />
              <span>Оновити</span>
            </button>
          </div>
        </li>
      </ul>
  
      <!-- Update Order Modal -->
      <div v-if="isUpdateModalVisible" class="modal">
        <div class="modal-content">
          <h3>Оновити замовлення</h3>
          <form @submit.prevent="updateOrder">
            <label>
              Статус:
              <input type="text" v-model="updatedOrder.status" />
            </label>
            <label>
              Телефон:
              <input type="text" v-model="updatedOrder.phone" />
            </label>
            <label>
              Дата:
              <input type="text" v-model="updatedOrder.date" />
            </label>
            <button type="submit">Зберегти</button>
            <button type="button" @click="closeModal">Скасувати</button>
          </form>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    name: 'OrderList',
    data() {
      return {
        orders: [
          { status: 'В очікуванні', phone: '+380981234567', date: '01.01.2024' },
          { status: 'В очікуванні', phone: '+380981234567', date: '01.01.2024' },
          { status: 'Відправлено', phone: '+380981234567', date: '01.01.2024' },
          { status: 'Доставлено', phone: '+380981234567', date: '01.01.2024' },
          { status: 'В очікуванні', phone: '+380981234567', date: '01.01.2024' },
          { status: 'В очікуванні', phone: '+380981234567', date: '01.01.2024' },
        ],
        isUpdateModalVisible: false,
        updatedOrder: { status: '', phone: '', date: '' },
        orderIndexToUpdate: null
      };
    },
    methods: {
      handleSearch() {
        // Implement search functionality
      },
      deleteOrder(index) {
        this.orders.splice(index, 1);
      },
      showUpdateModal(index) {
        this.orderIndexToUpdate = index;
        this.updatedOrder = { ...this.orders[index] };
        this.isUpdateModalVisible = true;
      },
      updateOrder() {
        this.$set(this.orders, this.orderIndexToUpdate, this.updatedOrder);
        this.closeModal();
      },
      closeModal() {
        this.isUpdateModalVisible = false;
        this.updatedOrder = { status: '', phone: '', date: '' };
        this.orderIndexToUpdate = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .order-management {
    font-family: Montserrat, sans-serif;
  transform: scale(0.9); /* Зменшує контент вдвічі */
  transform-origin: top left; /* Задає точку масштабування з лівого верхнього кута */
  font-family: Montserrat, sans-serif;
  width: 1200px; /* Компенсує зменшення, щоб зберегти початковий розмір контейнера */
  margin-left: 20px;
  }
  
  .order-title {
    color: #000;
    font-size: 40px;
    font-weight: 700;
  }
  
  .filter-section {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 32px;
  }
  
  .filter-title {
    color: #000;
    font-size: 30px;
    font-weight: 400;
  }
  
  .filter-icon {
    width: 37px;
    height: 39px;
    object-fit: contain;
  }
  
  .search-form {
    display: flex;
    align-items: center;
    margin-top: 22px;
    max-width: 410px;
    border-radius: 8px;
    background-color: rgba(107, 31, 31, 0.1);
    padding: 5px 23px;
  }
  
  .search-input {
    flex-grow: 1;
    border: none;
    background: transparent;
    font-size: 17px;
    color: #000;
  }
  
  .search-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .search-icon {
    width: 40px;
    height: 40px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
    padding: 24px 35px;
    border-radius: 24px;
    background-color: #FFF7F6;
    border: 2px solid #E6E6E6;
  }
  
  .order-header-left,
  .order-header-right {
    display: flex;
    gap: 40px;
  }
  
  .order-header-item {
    font-size: 20px;
    font-weight: 400;
    color: #000;
  }
  
  .order-list {
    list-style-type: none;
    padding: 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding: 27px 28px;
    border-radius: 24px;
    background-color: #FFF7F6;
    border: 2px solid #E6E6E6;
  }
  
  .order-details {
    display: flex;
    gap: 156px;
  }
  
  .order-id-name {
    display: flex;
    align-items: center;
    gap: 44px;
  }
  
  .order-id {
    font-size: 50px;
    font-weight: 600;
    color: #000;
    text-shadow: 0px 4px 4px rgba(99, 2, 2, 0.22);
  }
  
  .order-name {
    display: flex;
    flex-direction: column;
  }
  
  .order-number {
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin: 0;
  }
  
  .order-description {
    font-size: 20px;
    font-weight: 400;
    color: #000;
    margin: 18px 0 0;
  }
  
  .order-info {
    display: flex;
    gap: 64px;
  }
  
  .order-status,
  .order-phone,
  .order-date {
    font-size: 20px;
    font-weight: 400;
    color: #000;
  }
  
  .order-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    background-color: #C4AEAC;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #000;
  }
  
  .action-icon {
    width: 24px;
    height: 24px;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
  
  @media (max-width: 991px) {
    .order-header,
    .order-item {
      padding: 24px 20px;
    }
  
    .order-details {
      flex-direction: column;
      gap: 20px;
    }
  
    .order-id {
      font-size: 40px;
    }
  
    .order-info {
      flex-wrap: wrap;
    }
  }

  
  </style>