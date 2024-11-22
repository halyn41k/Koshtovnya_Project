import { mount } from '@vue/test-utils';
import FooterComponent from '../../components/FooterComponent.vue';
import router from '../../index.js';

describe('FooterComponent.vue', () => {
  let wrapper;

  beforeEach(async () => {
    // Встановлення початкового маршруту перед тестами
    await router.push('/');
    await router.isReady();

    wrapper = mount(FooterComponent, {
      global: {
        plugins: [router], // Додаємо маршрутизатор
      },
    });
  });

  afterEach(() => {
    wrapper.unmount(); // Очищення після кожного тесту
  });

  it('повинен містити логотип із текстом "Коштовня"', () => {
    const logoTitle = wrapper.find('.logo-title');
    expect(logoTitle.exists()).toBe(true); // Перевіряє наявність логотипу
    expect(logoTitle.text()).toBe('Коштовня'); // Перевіряє текст логотипу
  });

  it('повинен мати опис у секції логотипу', () => {
    const description = wrapper.find('.description');
    expect(description.exists()).toBe(true); // Перевіряє наявність опису
    expect(description.text()).toContain(
      'Ми виготовляємо унікальні прикраси ручної роботи з бісеру, зберігаючи традиції української культури.'
    ); // Перевіряє текст опису
  });

  it('повинен відображати три посилання в секції "ПОСИЛАННЯ"', () => {
    const footerLinks = wrapper.find('.footer-links .nav-section:nth-of-type(1) .footer-list');
    const links = footerLinks.findAll('.footer-link');
    expect(links.length).toBe(3); // Перевіряє кількість посилань
    expect(links.at(0).text()).toContain('Про нас'); // Перше посилання
    expect(links.at(1).text()).toContain('Про Оплату | Доставку'); // Друге посилання
    expect(links.at(2).text()).toContain('Кабінет користувача'); // Третє посилання
  });

  it('повинен переходити за посиланнями при кліку', async () => {
    const links = wrapper.findAll('.footer-links .footer-link');
    const expectedRoutes = ['/aboutus', '/aboutdelivery', '/account']; // Очікувані маршрути

    for (let i = 0; i < links.length; i++) {
      const link = links.at(i);

      // Перевірка атрибуту 'href'
      const href = link.attributes('href');
      expect(href).toBe(expectedRoutes[i]); // Перевіряє, що шлях у href правильний

      // Оновлення маршруту і перевірка
      await router.push(href); // Переходимо на маршрут
      expect(router.currentRoute.value.path).toBe(expectedRoutes[i]); // Перевіряє активний шлях
    }
  });

  it('повинен відображати секцію "ЗВ\'ЯЖІТЬСЯ З НАМИ" з контактною інформацією', () => {
    const contactInfo = wrapper.find('.contact-info');
    expect(contactInfo.exists()).toBe(true); // Перевіряє наявність секції контактів

    const address = contactInfo.find('.address');
    expect(address.exists()).toBe(true);
    expect(address.text()).toBe('вул. Степана Бандери 22, Коломия'); // Адреса

    const phone = contactInfo.find('.phone');
    expect(phone.exists()).toBe(true);
    expect(phone.text()).toBe('+380123456789'); // Телефон

    const email = contactInfo.find('.email');
    expect(email.exists()).toBe(true);
    expect(email.text()).toBe('koshtovnya@mail.com'); // Email
  });

  it('повинен відображати три соціальні іконки', () => {
    const socialLinks = wrapper.findAll('.social-links .social-link');
    expect(socialLinks.length).toBe(3); // Перевіряє кількість соціальних іконок

    const instagramLink = socialLinks.at(0);
    expect(instagramLink.attributes('href')).toBe('https://www.instagram.com'); // Instagram

    const facebookLink = socialLinks.at(1);
    expect(facebookLink.attributes('href')).toBe('https://www.facebook.com'); // Facebook

    const tiktokLink = socialLinks.at(2);
    expect(tiktokLink.attributes('href')).toBe('https://www.tiktok.com'); // TikTok
  });

  it('повинен мати правильну структуру HTML', () => {
    expect(wrapper.find('.footer').exists()).toBe(true); // Основний контейнер футера
    expect(wrapper.find('.footer-content').exists()).toBe(true); // Вміст футера
  });
});
