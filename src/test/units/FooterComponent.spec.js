import { mount } from '@vue/test-utils';
import FooterComponent from '../../components/FooterComponent.vue';

describe('FooterComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FooterComponent, {
      global: {
        mocks: {
          $t: (msg) => {
            const translations = {
              logo: 'Коштовня Лого', // Тестовий переклад для логотипу
              description: 'Опис компанії Коштовня', // Тестовий переклад для опису
              aboutUs: 'Про нас',
              aboutDelivery: 'Доставка',
              userAccount: 'Особистий кабінет',
              address: 'м. Київ, вул. Хрещатик, 1',
              phone: '+380123456789',
              email: 'koshtovnya@mail.com',
            };
            return translations[msg] || msg;
          },
        },
        stubs: {
          'router-link': {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('компонент рендиться без помилок', () => {
    expect(wrapper.exists()).toBe(true); // Перевіряємо, що компонент існує
  });

  it('повинен завантажувати зображення логотипу з правильним alt', () => {
    const logoImg = wrapper.find('img.logo-image');
    expect(logoImg.exists()).toBe(true);
    expect(logoImg.attributes('alt')).toBe('Коштовня Лого'); // Перевірка alt
  });

  it('повинен відображати правильний текст логотипу з локалізації', () => {
    const logoTitle = wrapper.find('h1.logo-title');
    expect(logoTitle.exists()).toBe(true);
    expect(logoTitle.text()).toBe('Коштовня Лого'); // Перевірка тексту
  });

  it('повинен відображати правильний текст опису з локалізації', () => {
    const description = wrapper.find('p.description');
    expect(description.exists()).toBe(true); // Перевірка наявності елемента
    expect(description.text()).toBe('Опис компанії Коштовня'); // Перевірка тексту з локалізації
  });

  it('Всі посилання у розділі footer-links присутні та мають правильні маршрути', () => {
    const expectedLinks = [
      { route: '/aboutus', text: 'Про нас' },
      { route: '/aboutdelivery', text: 'Доставка' },
      { route: '/account', text: 'Особистий кабінет' },
    ];

    const links = wrapper.findAll('.footer-list .footer-link');
    expect(links.length).toBe(expectedLinks.length);

    links.forEach((link, index) => {
      const { route, text } = expectedLinks[index];
      expect(link.attributes('href')).toBe(route); // Перевіряємо маршрут
      expect(link.text()).toBe(text); // Перевіряємо текст посилання
    });
  });

  it('повинен відображати правильну адресу', () => {
    const addressElement = wrapper.find('.address');
    expect(addressElement.exists()).toBe(true); // Перевірка наявності елемента
    expect(addressElement.text()).toBe('м. Київ, вул. Хрещатик, 1'); // Перевірка тексту
  });

  it('повинен відображати правильний номер телефону', () => {
    const phoneElement = wrapper.find('.phone');
    expect(phoneElement.exists()).toBe(true); // Перевірка наявності елемента
    expect(phoneElement.text()).toBe('+380123456789'); // Перевірка тексту
  });

  it('повинен відображати правильний email', () => {
    const emailElement = wrapper.find('.email');
    expect(emailElement.exists()).toBe(true); // Перевірка наявності елемента
    expect(emailElement.text()).toBe('koshtovnya@mail.com'); // Перевірка тексту
  });

  it('повинен містити посилання на Instagram з правильним URL', () => {
    const instagramLink = wrapper.find('a[href="https://www.instagram.com"]');
    expect(instagramLink.exists()).toBe(true); // Перевірка, чи є посилання
    expect(instagramLink.attributes('target')).toBe('_blank'); // Перевірка, чи відкривається в новій вкладці
  });

  it('повинен містити посилання на Facebook з правильним URL', () => {
    const facebookLink = wrapper.find('a[href="https://www.facebook.com"]');
    expect(facebookLink.exists()).toBe(true); // Перевірка, чи є посилання
    expect(facebookLink.attributes('target')).toBe('_blank'); // Перевірка, чи відкривається в новій вкладці
  });

  it('повинен містити посилання на TikTok з правильним URL', () => {
    const tiktokLink = wrapper.find('a[href="https://www.tiktok.com"]');
    expect(tiktokLink.exists()).toBe(true); // Перевірка, чи є посилання
    expect(tiktokLink.attributes('target')).toBe('_blank'); // Перевірка, чи відкривається в новій вкладці
  });

});
