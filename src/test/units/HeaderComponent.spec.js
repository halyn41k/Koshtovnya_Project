import { mount } from '@vue/test-utils';
import HeaderComponent from '../../components/HeaderComponent.vue';

// Замокати axios, щоб уникнути помилок з ESM
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('HeaderComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HeaderComponent, {
      global: {
        mocks: {
          $t: (msg) => {
            const translations = {
              aboutUs: 'Про нас',
              aboutDelivery: 'Доставка',
              wishlist: 'Список бажань',
              bracelets: 'Браслети',
              herdany: 'Гердани',
              dukats: 'Дукати',
              sylyanky: 'Силянки',
              earrings: 'Сережки',
              belts: 'Пояси',
              logo: 'Коштовня',
              searchPlaceholder: 'Пошук...',
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

  it('перевіряє, що всі навігаційні посилання присутні в DOM', () => {
    const expectedLinks = [
      { route: '/aboutus', text: 'Про нас' },
      { route: '/aboutdelivery', text: 'Доставка' },
      { route: '/bracelets', text: 'Браслети' },
      { route: '/herdany', text: 'Гердани' },
      { route: '/dukats', text: 'Дукати' },
      { route: '/sylyanky', text: 'Силянки' },
      { route: '/earrings', text: 'Сережки' },
      { route: '/belts', text: 'Пояси' },
    ];
  
    // Фільтруємо тільки навігаційні посилання
    const links = wrapper.findAll('a').filter((link) =>
      expectedLinks.some(({ route }) => link.attributes('href') === route)
    );
  
    expect(links.length).toBe(expectedLinks.length);
  
    links.forEach((link, index) => {
      const { route, text } = expectedLinks[index];
      expect(link.attributes('href')).toBe(route); // Перевіряємо маршрут
      expect(link.text()).toBe(text); // Перевіряємо текст
    });
  });
});
