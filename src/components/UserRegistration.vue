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
              <label for="first_name" class="form-label">Ім'я:</label>
              <label for="last_name" class="form-label">Прізвище:</label>
              <label for="email" class="form-label">Email:</label>
              <label for="password" class="form-label">Пароль:</label>
            </div>
            <div class="form-inputs">
              <input 
                type="text" 
                id="first_name" 
                class="form-input" 
                v-model="first_name" 
                aria-label="Ім'я" 
                placeholder="Введіть ваше ім'я" 
                required
              />
              <input 
                type="text" 
                id="last_name" 
                class="form-input" 
                v-model="last_name" 
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
                        <button 
                          type="button" 
                          @click="togglePasswordVisibility" 
                          class="toggle-password-button"
                        >
                          <span v-html="showPassword ? eyeOpenIcon : eyeClosedIcon"></span>
                        </button>
                      </div>
            </div>
          </div>
          <p class="login-prompt">
    Вже маєте обліковий запис?
    <router-link to="/login" class="login-link">Увійти</router-link>
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        showPassword: false,
        eyeOpenIcon: `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5z" stroke="#555" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="#555"/>
          </svg>`,
        eyeClosedIcon: `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L22 22M12 4.5C7 4.5 2.73 7.61 1 12c1.23 2.9 3.37 5.15 6.13 6.3m5.87-2.8c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 0l6.57 6.57M16.87 16.87c1.9-1.02 3.37-2.77 4.13-4.87-1.73-4.39-6-7.5-11-7.5-1.08 0-2.13.14-3.13.4" stroke="#555" stroke-width="2"/>
          </svg>`
      };
    },
    methods: {
      async submitRegistration() {
  if (!this.first_name || !this.last_name || !this.email || !this.password) {
    alert('Будь ласка, заповніть усі поля.');
    return;
  }
  try {
    const response = await fetch('http://26.235.139.202:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',  // added Accept header
      },
      body: JSON.stringify({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Помилка з беку:', errorData);
      throw new Error(errorData.message || 'Не вдалося зареєструватися.');
    }

    const data = await response.json();
    alert(`Реєстрація успішна! Ласкаво просимо, ${data.first_name}!`);
    this.$router.push({ name: 'Login' });

  } catch (error) {
    console.error('Помилка реєстрації:', error.message);
    alert(`Помилка реєстрації: ${error.message}`);
  }


    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
  
  <style scoped>
  .registration-container {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100vw; 
  overflow-x: hidden; 
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
    margin: 20px 0;
  }
  
  .line {
    flex: 1; 
    height: 2px; 
    background-color: grey; 
    margin: 0 10px; 
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
    padding: 96px 80px; 
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
  right: 110px; 
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px; 
  height: 24px; 
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
    justify-content: space-between; 
    align-items: center;
    margin: 20px 0;
    min-height: 50px;
    width: 290px;
    max-width: 100%;
    padding: 0 20px; 
    font: 400 18px/1.3 Merriweather, sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .registration-text {
    flex: 1; 
    text-align: left;
  }
  
  .registration-icon {
    margin-left: 10px; 
  }
  
  
  .registration-button:hover {
    background-color: #a01212;
  }
  </style>
  