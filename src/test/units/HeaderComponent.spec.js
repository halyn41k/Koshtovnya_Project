import { mount } from '@vue/test-utils';
import HeaderComponent from '../../components/HeaderComponent.vue';

// Замокати axios, щоб уникнути помилок з ESM
jest.mock('axios', () => ({
  get: jest.fn(),
}));

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
  uk: 'Українська',
  en: 'English',
};

const globalConfig = {
  mocks: {
    $t: (msg) => translations[msg] || msg, // Локалізація
    $i18n: { locale: 'uk' }, // Поточна локаль
  },
  stubs: {
    'router-link': {
      props: ['to'],
      template: '<a :href="to"><slot /></a>', // Простий стаб
    },
    'SearchResults': {
      props: ['query'],
      template: '<div class="search-results">{{ query }}</div>',
    },
  },
};

describe('HeaderComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Ініціалізуємо компонент перед кожним тестом
    wrapper = mount(HeaderComponent, {
      global: globalConfig,
    });
  });

  afterEach(() => {
    // Звільнення ресурсів після кожного тесту
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

  it('перевіряє, що посилання використовують коректні маршрути', () => {
    const expectedRoutes = [
      { route: '/aboutus', text: 'Про нас' },
      { route: '/aboutdelivery', text: 'Доставка' },
      { route: '/bracelets', text: 'Браслети' },
      { route: '/herdany', text: 'Гердани' },
      { route: '/dukats', text: 'Дукати' },
      { route: '/sylyanky', text: 'Силянки' },
      { route: '/earrings', text: 'Сережки' },
      { route: '/belts', text: 'Пояси' },
    ];

    // Знаходимо всі елементи router-link
    const links = wrapper.findAll('a').filter((link) =>
      expectedRoutes.some(({ route }) => link.attributes('href') === route)
    );

    expect(links.length).toBe(expectedRoutes.length);

    links.forEach((link, index) => {
      const { route, text } = expectedRoutes[index];
      expect(link.attributes('href')).toBe(route); // Перевіряємо маршрут
      expect(link.text()).toBe(text); // Перевіряємо текст посилання
    });
  });

  it('перевіряє, чи відображається випадаючий список мов', () => {
    const languageDropdown = wrapper.find('.language .dropdown-container select');

    // Перевірка наявності елемента
    expect(languageDropdown.exists()).toBe(true);

    // Перевірка, що випадаючий список має правильні опції
    const options = languageDropdown.findAll('option');
    expect(options.length).toBe(2); // Очікуємо 2 мови
    expect(options[0].attributes('value')).toBe('uk');
    expect(options[0].text()).toBe('Українська');
    expect(options[1].attributes('value')).toBe('en');
    expect(options[1].text()).toBe('English');
  });

  it('рендерить вибір мови з коректними опціями', () => {
    const languageDropdown = wrapper.find('.language .dropdown-container select');

    expect(languageDropdown.exists()).toBe(true); // Елемент існує

    const options = languageDropdown.findAll('option');
    expect(options.length).toBe(2); // 2 опції
    expect(options[0].attributes('value')).toBe('uk');
    expect(options[0].text()).toBe('Українська');
    expect(options[1].attributes('value')).toBe('en');
    expect(options[1].text()).toBe('English');
  });

 it('змінює вибір мови та оновлює прапорець', async () => {
    const languageDropdown = wrapper.find('.language .dropdown-container select');

    await languageDropdown.setValue('en');
    expect(wrapper.vm.selectedLanguage).toBe('en');
    expect(wrapper.vm.$i18n.locale).toBe('en');
    expect(wrapper.find('.language .flag').attributes('src')).toContain('gb.png');
  });

  it('викликає метод changeLanguage при зміні мови', async () => {
    const changeLanguageSpy = jest.fn();
    wrapper.vm.changeLanguage = changeLanguageSpy;

    const languageDropdown = wrapper.find('.language .dropdown-container select');
    await languageDropdown.setValue('en'); // Змінюємо значення

    expect(changeLanguageSpy).toHaveBeenCalledTimes(1); // Перевіряємо виклик
  });

  it('рендерить випадаючий список валют', () => {
    const currencyDropdown = wrapper.find('.currency .dropdown-container select');

    // Перевірка, чи випадаючий список існує
    expect(currencyDropdown.exists()).toBe(true);

    // Перевірка, чи випадаючий список має правильні опції
    const options = currencyDropdown.findAll('option');
    expect(options.length).toBe(2); // Очікуємо 2 валюти
    expect(options[0].attributes('value')).toBe('UAH');
    expect(options[0].text()).toBe('UAH ₴');
    expect(options[1].attributes('value')).toBe('USD');
    expect(options[1].text()).toBe('USD $');
  });

  it('викликає метод changeCurrency при зміні валюти', async () => {
    // Замінюємо метод на мок-функцію
    const changeCurrencySpy = jest.fn();
    wrapper.vm.changeCurrency = changeCurrencySpy;

    // Знаходимо випадаючий список валюти
    const currencyDropdown = wrapper.find('.currency .dropdown-container select');

    // Змінюємо значення
    await currencyDropdown.setValue('USD');

    // Перевірка виклику changeCurrency
    expect(changeCurrencySpy).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.selectedCurrency).toBe('USD'); // Перевіряємо, чи оновлено модель
  });

  it('відображає поле для введення пошукового запиту', () => {
    // Знаходимо елемент поля вводу
    const searchInput = wrapper.find('.search-bar input');

    // Перевірка, чи елемент існує
    expect(searchInput.exists()).toBe(true);

    // Перевірка placeholder
    expect(searchInput.attributes('placeholder')).toBe('Пошук...');
  });

  it('оновлює модель searchQuery при введенні тексту', async () => {
    const searchInput = wrapper.find('.search-bar input');

    // Імітуємо введення тексту
    await searchInput.setValue('Тестовий запит');

    // Перевіряємо, чи оновилася модель
    expect(wrapper.vm.searchQuery).toBe('Тестовий запит');
  });

  it('викликає метод startSearch при натисканні Enter у пошуковому полі', async () => {
    // Замінюємо метод startSearch на мок-функцію
    wrapper.vm.startSearch = jest.fn();
  
    // Оновлюємо компонент
    await wrapper.setData({ searchQuery: 'Тестовий запит' });
  
    // Знаходимо поле вводу пошуку
    const searchInput = wrapper.find('.search-bar input');
  
    // Імітуємо натискання клавіші Enter
    await searchInput.trigger('keyup.enter');
  
    // Перевіряємо, що метод startSearch викликано
    expect(wrapper.vm.startSearch).toHaveBeenCalledTimes(1);
  });

  it('викликає метод startSearch при кліку на іконку пошуку', async () => {
    // Замінюємо метод startSearch на мок-функцію
    wrapper.vm.startSearch = jest.fn();
  
    // Оновлюємо компонент
    await wrapper.setData({ searchQuery: 'Тестовий запит' });
  
    // Знаходимо іконку пошуку
    const searchIcon = wrapper.find('.search-icon');
  
    // Імітуємо клік по іконці пошуку
    await searchIcon.trigger('click');
  
    // Перевіряємо, що метод startSearch викликано
    expect(wrapper.vm.startSearch).toHaveBeenCalledTimes(1);
  });
});
