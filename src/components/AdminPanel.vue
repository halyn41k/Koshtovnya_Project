<template>
    <main class="admin-panel">
      <aside class="sidebar">
        <h1 class="sidebar-title">Адмін панель</h1>
        <nav class="sidebar-nav">
          <ul class="nav-list">
            <!-- Sidebar items that route to different components -->
            <li class="nav-item" @click="navigateTo('Products')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/7181c9bf4b4c01167bf72b6c144c4c944ddbe136464c136ce8292404d489d3ec?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Товари</span>
            </li>
            <li class="nav-item" @click="navigateTo('Employees')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/9bf1ac47245a9e955f3f57b5046a0b41f975a8b5881c99813f7d320c07ad4d13?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Працівники</span>
            </li>
            <li class="nav-item" @click="navigateTo('Orders')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/6f2400e8432da65be7178de6d0b28df24e5fc8f2421e9cfb6eb4d8a5d5fbe9d6?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Замовлення</span>
            </li>
            <li class="nav-item" @click="navigateTo('Reports')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/b4c605bb7958f5fb3c6d59ab4fa1fcc481aee339b429dd95028d85577d5470f9?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Звіти</span>
            </li>
            <li class="nav-item" @click="navigateTo('Clients')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/9a4f172895eba5cbc5f110e9159a0e8aa830e6248464d7be32e26b4ae15bf13c?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Клієнти</span>
            </li>
            <li class="nav-item" @click="navigateTo('Settings')">
              <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/d4fb741b5e72963905659fa5cf56396242a520a2f03afe2e006869f4327d7922?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="nav-icon" />
              <span class="nav-text">Налаштування</span>
            </li>
          </ul>
        </nav>
      </aside>
      <section class="content">
        <h2 class="content-title">
          Вас вітає адмін панель сайту
          <img src="@/assets/logo.svg" alt="Коштовня Лого" class="logo-image" /> Коштовня!
        </h2>
        <p class="content-description">
          Виберіть вкладку зліва, щоб почати керувати сайтом
        </p>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(componentName) {
        this.$router.push({ name: componentName });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Main admin panel container */
  .admin-panel {
    font-family: 'Montserrat', sans-serif;
    margin-top: 180px;
    display: flex;
    gap: 20px;
  }
  
  /* Sidebar styling */
  .sidebar {
    background-color: #fff7f6;
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    width: 30%;
  }
  
  .sidebar-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  .nav-list {
    list-style-type: none;
    padding: 0;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;
  }
  
  .nav-item:hover {
    color: #333;
  }
  
  .nav-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 0;
    background-color: #333;
    transition: width 0.3s ease;
    
  }
  
  .nav-item:hover::after {
    width: 200px;
  }
  
  .nav-icon {
    width: 16px;
    height: 20px;
  }
  
  /* Content section styling */
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    width: 70%;
  }
  
  .content-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 4px; /* Reduced gap for logo spacing */
  }
  
  .content-description {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .logo-image {
    width: 100px;
    height: 100px;
    vertical-align: middle;
  }
  
  /* Responsive styling */
  @media (max-width: 991px) {
    .admin-panel {
      flex-direction: column;
      gap: 20px;
    }
  
    .sidebar {
      width: 100%;
      padding: 20px;
      margin-top: 20px;
    }
  
    .content {
      width: 100%;
      margin-top: 20px;
    }
  }
  </style>
  