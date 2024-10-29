<template>
    <div class="login-container">
      <header class="login-header">
        <div class="header-line"></div>
      </header>
      <h1 class="section-title-container">
        <div class="line"></div>
        <span class="section-title">Вхід</span>
        <div class="line"></div>
      </h1>
      <main class="login-main">
        <div class="login-background-image"></div>
        <form class="login-form" @submit.prevent="submitLogin">
          <div class="form-group">
            <div class="form-labels">
              <label for="email" class="form-label">Email:</label>
              <label for="password" class="form-label">Пароль:</label>
            </div>
            <div class="form-inputs">
              <input 
                type="email" 
                id="email" 
                class="form-input" 
                v-model="email" 
                aria-label="Email" 
                placeholder="Введіть ваш email" 
                required
              />
              <div class="password-input-container">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  class="form-input" 
                  v-model="password" 
                  aria-label="Пароль" 
                  placeholder="Введіть пароль" 
                  required
                />
                <button type="button" @click="togglePasswordVisibility" class="toggle-password-button">
                  <img :src="showPassword ? eyeOpenIcon : eyeClosedIcon" alt="Toggle password visibility" />
                </button>
              </div>
            </div>
          </div>
          <p class="signup-prompt">
            Немає облікового запису?
            <a href="/registration" class="signup-link">Створіть його тут</a>
          </p>
          <button type="button" class="google-login-button">
            <span>Увійти за допомогою</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/08aa0f49547eb61ccbdd8f240faf33e528e6a75140fa2fd508211e78b31846db?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Google logo" class="google-icon" />
          </button>
          <button type="submit" class="login-button">
            <span>Увійти</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="login-icon" />
          </button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        showPassword: false,
        eyeOpenIcon: '@/assets/eye.png',
        eyeClosedIcon: '@/assets/hide.png'
      };
    },
    methods: {
      submitLogin() {
        if (this.email && this.password) {
          console.log('Email:', this.email);
          console.log('Password:', this.password);
        } else {
          alert('Будь ласка, введіть ваші дані.');
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .login-background-image {
    background-image: url('@/assets/logins.png');
    background-size: cover;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .login-header {
    z-index: 10;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    padding: 63px 80px 0;
  }
  .section-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 150px; /* Adjust spacing as needed */
  }
  .line {
    flex: 1; /* Take available space */
    height: 2px; /* Thickness of the line */
    background-color: grey; /* Color of the line */
    margin: 0 10px; /* Space between the line and the title */
  }
  
  .section-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif;
    font-weight: 900; 
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    font-size: 30px;
    margin: 0 20px; /* Adjust margin as needed */
  }
  
  .section-title::before,
  .section-title::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 150px; /* Довжина ліній */
    height: 1px;
    background-color: black; /* Чорний для тестування */
  }
  
  .section-title::before {
    left: -170px; /* Відступ для лівої лінії */
  }
  
  .section-title::after {
    right: -170px; /* Відступ для правої лінії */
  }
  
  
  .login-main {
    background-color: rgba(255, 247, 246, 0.9);
    display: flex;
    margin-top: 0px;
    width: 1440px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 96px 80px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2;
  }
  
  .login-form {
    display: flex;
    margin-bottom: -32px;
    width: 1159px;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    align-self: stretch;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .form-labels {
    display: flex;
    gap: 30px;
    flex-direction: column;
    color: var(--Grays-Black, #000);
    white-space: nowrap;
    margin: auto 0;
    padding: 0 1px 6px;
    font: 400 18px/1.3 Merriweather, sans-serif;
  }
  
  .form-input {
    border-radius: 8px;
    border: 1px solid var(--Grays-Black, #000);
    background-color: #E6D7D7;
    display: flex;
    height: 35px;
    width: 800px;
    gap: 10px;
    font-size: 18px;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
  }
  
  .form-input:focus {
    background-color: #E6D7D7;
    outline: none;
  }
  
  .form-input:not(:placeholder-shown) {
    background-color: #E6D7D7;
  }
  
  .password-input-container {
    position: relative;
    width: 900px;
  }
  
  .toggle-password-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .signup-prompt {
    color: var(--Schemes-On-Error-Container, #852221);
    margin-top: -10px;
    margin-left: -100px;
    font: 400 20px/1.3 Merriweather, sans-serif;
  }
  
  .signup-link {
    font-weight: 700;
    color: #852221;
  }
  
  .google-login-button {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    margin-top: 43px;
    margin-left: -100px;
    min-height: 50px;
    width: 290px;
    max-width: 100%;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    color: var(--Grays-Black, #111111);
    justify-content: flex-start;
    padding: 10px 0 10px 10px;
    font: 400 18px/1.3 Merriweather, sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .google-login-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .login-button {
    background-color: #6b1f1f;
    border-radius: 8px;
    border: none;
    color: white;
    display: flex;
    justify-content: space-between; /* Розміщує текст та іконку на протилежних сторонах */
    align-items: center; /* Вирівнює по центру */
    margin: 20px 0;
    min-height: 50px;
    width: 290px;
    max-width: 100%;
    padding: 0 10px; /* Внутрішній відступ для простору */
    font: 400 18px/1.3 Merriweather, sans-serif;
    transition: background-color 0.3s ease;
    margin-left: -100px;
  }
  
  
  .login-button:hover {
    background-color: #a01212;
  }
  </style>
  