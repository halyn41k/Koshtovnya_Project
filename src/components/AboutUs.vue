<template>
    <article class="about-us">
      <header class="about-us__header">
        <!-- Title with side lines -->
        <h1 class="section-title-container">
          <div class="line"></div>
          <span class="main-title">Про нас</span>
          <div class="line"></div>
        </h1>
      </header>
      <section class="about-us__content">
        <div class="about-us__text-section">
          <h2 class="section-title">Історія заснування "Коштовня"</h2>
          <p class="about-us__text">
            У 2015 році зародилася ідея, яка почалася з простого захоплення — створення традиційних герданів із бісеру.
            Спочатку це було заняттям для душі, відтворюючи автентичні візерунки та орнаменти. Кожен виріб випромінював
            свою унікальну енергію, об'єднуючи традиційні українські мотиви з сучасними елементами. Це дозволяло
            створювати прикраси, які мали не лише естетичну цінність, але й несли в собі глибокий символізм.
          </p>
        </div>
        <div class="about-us__image-wrapper">
          <img src="@/assets/ukrainepattern.png" alt="Традиційні гердани та прикраси" class="about-us__image" loading="lazy" />
        </div>
      </section>
      <section class="about-us__growth">
        <div class="about-us__image-container">
          <img src="@/assets/woman.png" alt="Розвиток бренду Коштовня" class="about-us__background-image with-frame" />
        </div>
        <div class="about-us__text-content">
          <p class="about-us__description">
            Із часом прикраси почали привертати увагу друзів, знайомих, а потім і ширшого кола людей. Інтерес до виробів
            ручної роботи зростав, і це стало поштовхом до розвитку маленького бізнесу. Тоді стало зрозуміло, що це більше,
            ніж просто хобі, і цей проект має потенціал вирости в щось більше.
            <br /><br />
            "Коштовня" виросла з простого захоплення у справжній бренд, де кожна прикраса створюється з душею та повагою до
            традицій. У виробах поєднується багатовікова українська культура та сучасні тенденції, що робить кожну річ
            унікальною і неповторною.
          </p>
        </div>
        <div class="about-us__process-image-container">
          <img src="@/assets/deliverypattern.png" alt="Процес створення прикрас" class="about-us__process-image" loading="lazy" />
        </div>
      </section>
      <footer class="about-us__footer">
        <p class="about-us__conclusion">
          "Коштовня" — це місце, де кожен виріб проходить свій особливий шлях від ідеї до реального втілення. Продукція
          продовжує розвиватися, пропонуючи клієнтам нові унікальні вироби, які підкреслюють індивідуальність кожного.
        </p>
      </footer>
    </article>
  </template>
  
  <style scoped>
    /* Font definitions */
    @font-face {
      font-family: 'KyivType Titling';
      src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeSans-Heavy2.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
    }
  
    @font-face {
      font-family: 'KyivType Medium2';
      src: url('@/assets/fonts/KyivType2020-14-12/KyivType-NoVariable/TTF/KyivTypeSans-Medium2.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
    }
  
    .about-us {
      background-color: #fdf5f4;
      padding: 160px 40px 100px;
      width: calc(100% - 100px);
      max-width: 1700px;
      margin: auto;
      border-radius: 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      color: #333;
      position: relative;
      z-index: 2;
    }
  
    .about-us__header {
      text-align: center;
      margin-bottom: 50px;
    }
  
    /* Container for title with side lines */
    .section-title-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
    }
  
    .line {
      flex: 1;
      height: 2px;
      background-color: grey;
      margin: 0 10px;
      margin-top: -0px;
    }
  
    .main-title {
      font-family: 'KyivType Titling', sans-serif;
      font-size: 34px;
      font-weight: 900;
      letter-spacing: -1.2px;
      text-shadow: 0 2px 3px rgba(99, 2, 2, 0.22);
      text-align: center;
      margin: 0;
    }
  
    .about-us__content {
      display: flex;
      align-items: flex-start;
      gap: 40px;
    }
  
    .about-us__text-section {
      flex: 1 1 60%;
      text-align: left;
    }
  
    .about-us__image-wrapper {
      flex: 1 1 40%;
      text-align: left;
    }
  
    .section-title {
      margin-left: 40px;
      font-family: 'KyivType Medium2', sans-serif;
      font-weight: 700;
      margin-bottom: 20px;
    }
  
    .about-us__description {
      font: 500 18px/32px 'KyivType Titling', sans-serif;
      color: #111111;
      margin-top: -50px;
      text-align: left;
    }
  
    .about-us__text {
      margin-left: 40px;
      font: 500 18px/27px 'KyivType Titling', sans-serif;
      color: #111111;
    }
  
    .about-us__conclusion {
      font: 500 18px/27px 'KyivType Titling', sans-serif;
      color: #111111;
      margin-top: 0px;
    }
  
    .about-us__image {
      width: 100%;
      max-height: 650px;
      object-fit: cover;
    }
  
    .about-us__growth {
      display: flex;
      align-items: center;
      margin-top: 30px;
      gap: 40px;
    }
  
    .about-us__image-container {
      margin-left: 0;
      margin-top: -30px;
      width: 60%;
      height: auto;
      position: relative;
    }
  
    .about-us__background-image {
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  
    .about-us__process-image-container {
      flex: 1 1 40%;
      text-align: center;
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
    }
  
    .about-us__process-image {
      margin-top: 200px;
      width: 100%;
      height: 1200px;
      opacity: 0.4;
      z-index: -1;
    }
  
    /* Responsive adjustments */
    @media (max-width: 991px) {
      .about-us {
        padding: 110px 20px 60px;
      }
  
      .about-us__content,
      .about-us__growth {
        flex-direction: column;
        align-items: center;
      }
  
      .about-us__text-section,
      .about-us__image-wrapper,
      .about-us__text-content,
      .about-us__image-container,
      .about-us__process-image-container {
        width: 100%;
        text-align: center;
      }
  
      .about-us__process-image {
        width: 100%;
      }
    }
  </style>
  