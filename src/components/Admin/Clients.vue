<template>
    <main class="client-list">
      <h1 class="client-list__title">Клієнти</h1>
      <div class="client-list__controls">
        <div class="filter">
          <span class="filter__text">Фільтр</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/4b09284ab367fa70a05a4a4f59e91721443ad7e8e783dfd2c26fb681ebacd30f?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Filter icon" class="filter__icon" />
        </div>
        <div class="search-form">
          <div class="search-input">
            <span class="search-button__text">Пошук</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d5c4873b11c69bccf0067abe1ce038edad573eb5f56d874777e45978e309d1df?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Search icon" class="search-icon" />
          </div>
          <button class="add-button">
            <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/a27ea7f8a293148ec591123dc3120b25f531a1f574adc4774e1503c5d2772fcb?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Add icon" class="add-button__icon" />
            <span class="add-button__text">Додати</span>
          </button>
        </div>
      </div>
      <section class="client-table">
        <header class="client-table__header">
          <div class="client-table__header-left">
            <span class="client-table__header-id">ID</span>
            <span class="client-table__header-name">Ім'я/Email</span>
          </div>
          <div class="client-table__header-right">
            <span class="client-table__header-order">№ Замовлення</span>
            <span class="client-table__header-phone">Телефон</span>
            <span class="client-table__header-date">Додано</span>
            <span class="client-table__header-actions">Керування</span>
          </div>
        </header>
        <ul class="client-list__items">
          <li v-for="(client, index) in clients" :key="index" class="client-item">
            <div class="client-item__info">
              <div class="client-item__main">
                <span class="client-item__id">{{ index + 1 }}.</span>
                <div class="client-item__name-email">
                  <span class="client-item__name">{{ client.name }}</span>
                  <span class="client-item__email">{{ client.email }}</span>
                </div>
              </div>
              <div class="client-item__details">
                <span class="client-item__order">{{ client.order }}</span>
                <span class="client-item__phone">{{ client.phone }}</span>
                <span class="client-item__date">{{ client.date }}</span>
              </div>
            </div>
            <div class="client-item__actions">
              <button class="action-button action-button--delete">
                <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/ba078f16c37c9f7f4a38bffc3903a0783959b7a0f9fc95368926f1c2df1ef2a7?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Delete icon" class="action-button__icon" />
                <span class="action-button__text">Видалити</span>
              </button>
              <button class="action-button action-button--update">
                <img :src="`http://b.io/ext_${5 + index}-`" alt="Update icon" class="action-button__icon" />
                <span class="action-button__text">Оновити</span>
              </button>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'ClientList',
    data() {
      return {
        clients: [
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №1', phone: '+380981234567', date: '01.01.2024' },
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №2', phone: '+380981234567', date: '01.01.2024' },
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №1', phone: '+380981234567', date: '01.01.2024' },
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №1', phone: '+380981234567', date: '01.01.2024' },
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №1', phone: '+380981234567', date: '01.01.2024' },
          { name: 'Степан Мельник', email: 'stepan@gmail.com', order: 'Замовлення №1', phone: '+380981234567', date: '01.01.2024' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .client-list {
  transform: scale(0.9); 
  transform-origin: top left; 
  font-family: Montserrat, sans-serif;
  width: 1200px; 
  margin-left: 20px;
}

  
  .client-list__title {
    color: #000;
    font-size: 40px;
    font-weight: 700;
  }
  
  .client-list__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
  }
  
  .filter {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 30px;
    color: #000;
  }
  
  .filter__icon {
    width: 37px;
    height: 39px;
    object-fit: contain;
  }
  
 
  .search-form {
  display: flex;
  align-items: center;
  background-color: #F1E9E9;
  border-radius: 8px;
  padding: 8px 20px;
  border: 1px solid transparent;
  width: 400px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: Montserrat, sans-serif;
  font-size: 17px;
  color: #000;
  outline: none;
}

.search-icon {
  width: 30px; 
  height: 30px;
  margin-left: 8px;
}
  
  .add-button {
    display: flex;
    align-items: center;
    gap: 17px;
    padding: 8px 15px;
    border-radius: 12px;
    background-color: #C4AEAC;
    font-size: 16px;
    color: #000;
    border: none;
    cursor: pointer;
  }
  
  .add-button__icon {
    width: 24px;
    height: 29px;
    object-fit: contain;
  }
  
  .client-table {
    margin-top: 22px;
  }
  
  .client-table__header {
    display: flex;
    justify-content: space-between;
    padding: 26px 35px;
    border-radius: 24px;
    background-color: #FFF7F6;
    border: 2px solid #E6E6E6;
    font-size: 20px;
    color: #000;
  }
  
  .client-table__header-left,
  .client-table__header-right {
    display: flex;
    gap: 130px;
  }
  
  .client-list__items {
    list-style-type: none;
    padding: 0;
  }
  
  .client-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 27px 28px;
    border-radius: 24px;
    background-color: #FFF7F6;
    border: 2px solid #E6E6E6;
    margin-top: 22px;
  }
  
  .client-item__info {
    display: flex;
    gap: 78px;
  }
  
  .client-item__main {
    display: flex;
    align-items: center;
    gap: 44px;
  }
  
  .client-item__id {
    color: #000;
    font-size: 50px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -2.5px;
    text-shadow: 0px 4px 4px rgba(99, 2, 2, 0.22);
  }
  
  .client-item__name-email {
    display: flex;
    flex-direction: column;
  }
  
  .client-item__name {
    color: #000;
    font-size: 24px;
    font-weight: 700;
  }
  
  .client-item__email {
    color: #000;
    font-size: 20px;
    margin-top: 18px;
  }
  
  .client-item__details {
    display: flex;
    gap: 80px;
    font-size: 20px;
    color: #000;
  }
  
  .client-item__actions {
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
    font-size: 16px;
    color: #000;
    border: none;
    cursor: pointer;
  }
  
  .action-button__icon {
    width: 24px;
    height: 29px;
    object-fit: contain;
  }
  
  @media (max-width: 991px) {
    .client-item__id {
      font-size: 40px;
    }
  
    .client-table__header,
    .client-item {
      padding-left: 20px;
      padding-right: 20px;
    }
  
    .client-item__info,
    .client-item__details {
      flex-wrap: wrap;
    }
  }
  </style>