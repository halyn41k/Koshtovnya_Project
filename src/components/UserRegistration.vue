<template>
    <div class="registration-container">
      <header class="registration-header">
        <div class="header-line"></div>
      </header>
      <h1 class="registration-title-container">
        <div class="line"></div>
        <span class="registration-title">Реєстрація</span>
        <div class="line"></div>
      </h1>
  
      <main class="registration-main">
        <div class="registration-background-image"></div>
        <form class="registration-form" @submit.prevent="submitRegistration">
          <div class="form-group">
            <div class="form-labels">
              <label for="firstName" class="form-label">Ім'я:</label>
              <label for="lastName" class="form-label">Прізвище:</label>
              <label for="email" class="form-label">Email:</label>
              <label for="password" class="form-label">Пароль:</label>
            </div>
            <div class="form-inputs">
              <input 
                type="text" 
                id="firstName" 
                class="form-input" 
                v-model="firstName" 
                aria-label="Ім'я" 
                placeholder="Введіть ваше ім'я" 
                required
              />
              <input 
                type="text" 
                id="lastName" 
                class="form-input" 
                v-model="lastName" 
                aria-label="Прізвище" 
                placeholder="Введіть ваше прізвище" 
                required
              />
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
          <p class="login-prompt">
    Вже маєте обліковий запис?
    <a href="/login" class="login-link">Увійти</a>
  </p>
  
          <button type="submit" class="registration-button">
            <span>Зареєструватися</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?placeholderIfAbsent=true&apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="" class="registration-icon" />
          </button>
        </form>
      </main>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
        eyeOpenIcon: '@/assets/eye.png',
        eyeClosedIcon: '@/assets/hide.png'
      };
    },
    methods: {
      submitRegistration() {
        if (this.firstName && this.lastName && this.email && this.password) {
          console.log('Ім\'я:', this.firstName);
          console.log('Прізвище:', this.lastName);
          console.log('Email:', this.email);
          console.log('Пароль:', this.password);
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
  .registration-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .registration-background-image {
    background-image: url('@/assets/logins.png');
    background-size: cover;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .registration-header {
    z-index: 10;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    padding: 63px 80px 0;
  }
  
  .registration-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0; /* Adjust spacing as needed */
  }
  
  .line {
    flex: 1; /* Take available space */
    height: 2px; /* Thickness of the line */
    background-color: grey; /* Color of the line */
    margin: 0 10px; /* Space between the line and the title */
    margin-top:120px;
  }
  
  .registration-title {
    color: #333;
    font-family: 'KyivType Titling', sans-serif;
    font-weight: 900; 
    text-shadow: 0 4px 4px rgba(99, 2, 2, 0.22);
    letter-spacing: -2px;
    text-align: center;
    margin-top: 150px;
    font-size: 30px;
    margin-bottom: 40px;
  }
  
  .registration-main {
    background-color: rgba(255, 247, 246, 0.9);
    display: flex;
    width: 1440px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 96px 80px; /* Зменшено на 50 пікселів */
    border: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2;
  }
  
  .registration-form {
    display: flex;
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
    align-items: baseline;
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
  
  .login-prompt {
    color: var(--Schemes-On-Error-Container, #852221);
    margin-top: -10px;
    font: 400 20px/1.3 Merriweather, sans-serif;
  }
  
  .login-link {
    font-weight: 700;
    color: #852221;
  }
  
  .registration-button {
    background-color: #6b1f1f;
    border-radius: 8px;
    border: none;
    color: white;
    display: flex;
    justify-content: space-between; /* Change to space-between */
    align-items: center;
    margin: 20px 0;
    min-height: 50px;
    width: 290px;
    max-width: 100%;
    padding: 0 20px; /* Add padding for spacing */
    font: 400 18px/1.3 Merriweather, sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .registration-text {
    flex: 1; /* Allow text to take available space */
    text-align: left; /* Align text to the left */
  }
  
  .registration-icon {
    margin-left: 10px; /* Add margin for spacing */
  }
  
  
  .registration-button:hover {
    background-color: #a01212;
  }
  </style>
  