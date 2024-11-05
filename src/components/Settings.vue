<template>
    <main class="settings-content">
      <header class="settings-header">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/323c4a41975024a41335e068c0653ecd7e32a04e8e9a79655a5b6ee065ec92f4?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Settings logo" class="settings-logo" />
        <h1 class="settings-title">Налаштування</h1>
      </header>
      <section class="logo-section">
        <h2 class="section-title">Змінити логотип:</h2>
        <button class="upload-button">Завантажити фото</button>
      </section>
      <section class="contact-info-section">
        <h2 class="section-title">Змінити контактну інформацію:</h2>
        <div class="contact-info-container">
          <h3 class="contact-info-title">Контактна Інформація</h3>
          <form class="contact-form">
            <div class="form-group">
              <label for="address" class="form-label">Адреса (поточна: вул. Степана Бандери 22, Коломия)</label>
              <input type="text" id="address" class="form-input" value="вул. Степана Бандери 22, Коломия" />
            </div>
            <div class="form-group">
              <label for="phone" class="form-label">Телефон (поточний: +380123456789)</label>
              <input type="tel" id="phone" class="form-input" value="+380123456789" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Електронна пошта (поточна: koshtovnya@mail.com)</label>
              <input type="email" id="email" class="form-input" value="koshtovnya@mail.com" />
            </div>
            <button type="submit" class="submit-button">Зберегти зміни</button>
          </form>
        </div>
      </section>
    </main>
  </template>

<script>
export default {
  name: 'ProfitReportView',
};
</script>
  
  <style scoped>
  .settings-content {
    display: flex;
    max-width: 845px;
    flex-direction: column;
    align-items: flex-start;
    font-family: Montserrat, sans-serif;
  transform: scale(0.7); /* Зменшує контент вдвічі */
  transform-origin: top left; /* Задає точку масштабування з лівого верхнього кута */
  width: 1200px; /* Компенсує зменшення, щоб зберегти початковий розмір контейнера */
  margin-left: 20px;
  }
  
  .settings-header {
    display: flex;
    gap: 18px;
    font-size: 40px;
    color: #000;
    font-weight: 700;
    white-space: nowrap;
  }
  
  @media (max-width: 991px) {
    .settings-header {
      white-space: initial;
    }
  }
  
  .settings-logo {
    aspect-ratio: 1.07;
    object-fit: contain;
    object-position: center;
    width: 73px;
  }
  
  .settings-title {
    flex-grow: 1;
    margin: auto 0;
  }
  
  .logo-section {
    display: flex;
    margin-top: 41px;
    gap: 40px;
    font-weight: 700;
    flex-wrap: wrap;
  }
  
  @media (max-width: 991px) {
    .logo-section {
      margin-top: 40px;
    }
  }
  
  .section-title {
    color: #000;
    font-size: 25px;
    line-height: 1;
    flex-grow: 1;
    margin: auto 0;
  }
  
  .upload-button, .submit-button {
    border-radius: 8px;
    background-color: #6b1f1f;
    color: #fff;
    font-size: 20px;
    line-height: 1.3;
    padding: 16px 28px;
    border: none;
    cursor: pointer;
  }
  
  @media (max-width: 991px) {
    .upload-button, .submit-button {
      padding-left: 20px;
    }
  }
  
  .contact-info-section {
    margin-top: 78px;
    width: 100%;
  }
  
  @media (max-width: 991px) {
    .contact-info-section {
      max-width: 100%;
      margin-top: 40px;
    }
  }
  
  .contact-info-container {
    border-radius: 5px;
    background-color: #fff7f6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 57px;
    padding: 37px 21px 21px;
    border: 1px solid #ddd;
  }
  
  @media (max-width: 991px) {
    .contact-info-container {
      max-width: 100%;
      margin-top: 40px;
    }
  }
  
  .contact-info-title {
    color: #040404;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 33px;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    color: #333;
    font-weight: 500;
  }
  
  .form-group {
    margin-bottom: 19px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 9px;
  }
  
  .form-input {
    border-radius: 5px;
    background-color: #eee3e3;
    width: 100%;
    color: #757575;
    padding: 16px 13px;
    font: 400 17px Inter, sans-serif;
    border: 1px solid #eee3e3;
  }
  
  @media (max-width: 991px) {
    .form-input {
      padding-right: 20px;
    }
  }
  
  .submit-button {
    align-self: flex-start;
    margin-top: 15px;
  }
  
  @media (max-width: 991px) {
    .submit-button {
      max-width: 100%;
      padding: 14px 20px;
    }
  }
  </style>