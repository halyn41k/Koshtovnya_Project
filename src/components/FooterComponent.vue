<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo-section">
        <div class="logo-wrapper">
          <img src="@/assets/logo.svg" alt="Коштовня Лого" class="logo">
          <h1 class="logo-title">Коштовня</h1>
        </div>
        <p class="description">Ми виготовляємо унікальні прикраси ручної роботи з бісеру, зберігаючи традиції української культури. У нас ви знайдете вироби, сповнені автентичності та краси.</p>

        <div class="social-media-section">
          <a href="#" class="social-link">
            <img src="@/assets/instagram-icon.png" alt="Instagram">
          </a>
          <a href="#" class="social-link">
            <img src="@/assets/facebook-icon.png" alt="Facebook">
          </a>
          <a href="#" class="social-link">
            <img src="@/assets/tiktok-icon.png" alt="TikTok">
          </a>
        </div>
      </div>

      <div class="contact-section">
        <ul>
          <li><strong>Email:</strong> <span class="contact-info">koshtovnya@mail.com</span></li>
          <li><strong>Телефон:</strong> <span class="contact-info">+380123456789</span></li>
          <li><strong>Адреса:</strong> <span class="contact-info">вул. Степана Бандери, 22</span></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Regular2.ttf') format('truetype');
  font-weight: 400; /* Regular2 */
  font-style: normal;
}

@font-face {
  font-family: 'KyivType Titling';
  src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeTitling-Black2.ttf') format('truetype');
  font-weight: bold; /* Bold для логотипу */
  font-style: normal;
}

/* Основний стиль для підвалу */
.footer {
  display: flex;
  justify-content: space-between;
  padding: 0px;
  background-color: #F4E7E5; /* Колір фону */
  font-family: 'Merriweather', serif;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.logo-section {
  width: 60%;
}

.logo-wrapper {
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  gap: 0px; /* Зменшена відстань між логотипом і текстом */
}

.logo-section .logo {
  width: 180px; /* Збільшений розмір логотипу */
  height: auto;
}

.logo-title {
  font-family: 'KyivType Titling', sans-serif;
  font-weight: bold; /* Стиль Bold для назви */
  font-size: 30px;
  color: black;
  margin-top: -5px; /* Підняти на 5 пікселів */
}

/* Опис під лого */
.description {
  font-family: 'KyivType Titling', sans-serif;
  font-weight: 500; /* Regular2 */
  font-size: 20px;
  line-height: 1.4; /* Збільшений міжрядковий інтервал для 5 рядків */
  width: 50%; /* Зменшена ширина для 5 рядків */
  margin-top: -130px; /* Підняти на 5 пікселів */
  margin-left: 30px; /* Відступ зліва */
  text-align: left; /* Вирівнювання тексту по лівому краю */
  color: black;
}

/* Соціальні мережі під описом */
.social-media-section {
  display: flex;
  gap: 35px; /* Збільшено відстань між іконками соцмереж */
  align-items: center;
  margin-top: 15px; /* Відступ від опису */
}

.social-link img {
  width: 40px; /* Збільшені іконки соцмереж */
  height: auto;
}

/* Секція контактної інформації */
.contact-section {
  width: 30%;
  text-align: right; /* Вирівнювання по правому краю */
  margin-top: 80px; /* Опустити контактну секцію нижче на 10 пікселів */
  margin-left: 5px; /* Зміщення ліворуч на 5 пікселів */
}

.contact-section ul {
  list-style: none;
  padding: 0;
  font-family: 'KyivType Titling', sans-serif; /* Шрифт для контактної інформації */
}

.contact-section li {
  margin-bottom: 20px; /* Збільшено відстань між пунктами */
  font-size: 20px; /* Збільшено шрифт */
  color: black; /* Чорний колір тексту */
}

.contact-info {
  font-family: 'KyivType Titling', sans-serif; /* Шрифт для контактної інформації */
  font-weight: 500; /* Medium стиль */
}
</style>
