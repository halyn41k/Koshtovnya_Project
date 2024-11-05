<template>
    <section class="welcome-section">
      <h2 class="welcome-title">
        Вас вітає адмін панель сайту
        <span class="logo-wrapper">
          <img src="@/assets/logo.svg" alt="Коштовня Лого" class="logo-image" />
        </span>
        Коштовня!
      </h2>
      <p class="welcome-description">
        Виберіть вкладку зліва, щоб почати керувати сайтом
      </p>
    </section>
  </template>
  
  <script>
  export default {
    name: 'WelcomeAdmin',
  };
  </script>
  
  <style scoped>
  .welcome-section {
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
  }
  
  .welcome-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  /* Adjust logo-wrapper for close alignment */
  .logo-wrapper {
    display: flex;
    align-items: center;
    margin-left: 4px; /* Small space between text and logo */
  }
  
  .logo-image {
    width: 150px;
    height: 150px;
  }
  
  .welcome-description {
    font-size: 20px;
  }
  </style>
  