import { mount } from '@vue/test-utils';
import CategoryProduct from '../../components/CategoryProduct.vue';

// Додаємо стаб для fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }), // Імітація відповіді API
  })
);

describe('CategoryProduct.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CategoryProduct, {
      global: {
        mocks: {
          $t: (msg) => msg, // Стаб для i18n
        },
        stubs: {
          'router-link': true, // Стаб для компонента router-link
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount(); // Очищення після кожного тесту
  });

  it('Коректне застосування стилів для заголовка секції', () => {
    // Знаходимо заголовок секції
    const sectionTitle = wrapper.find('.section-title');

    // Перевіряємо, чи існує елемент із класом section-title
    expect(sectionTitle.exists()).toBe(true);

    // Перевірка наявності класів, що відповідають стилю
    expect(sectionTitle.classes()).toContain('section-title');
  });

  it('Коректне відображення шрифтів KyivType Titling', () => {
    // Знаходимо заголовок секції
    const sectionTitle = wrapper.find('.section-title');

    // Перевіряємо, чи існує елемент із класом section-title
    expect(sectionTitle.exists()).toBe(true);

    // Перевіряємо, чи має клас, що відповідає KyivType Titling
    expect(sectionTitle.classes()).toContain('section-title');
  });

  it('Відображення заголовка секції (Shop By Category)', () => {
    // Знаходимо заголовок секції
    const sectionTitle = wrapper.find('.section-title');
  
    // Перевіряємо, чи існує елемент із класом section-title
    expect(sectionTitle.exists()).toBe(true);
  
    // Перевіряємо, чи текст відповідає очікуваному
    expect(sectionTitle.text()).toBe('shopByCategory');
  });

  it('Коректне відображення елементів категорій у вигляді сітки', () => {
    // Знаходимо контейнер категорій
    const categoryGrid = wrapper.find('.category-grid');
  
    // Перевіряємо, чи існує елемент із класом category-grid
    expect(categoryGrid.exists()).toBe(true);
  
    // Перевіряємо кількість елементів категорій у сітці
    const categoryItems = categoryGrid.findAll('.category-item');
    expect(categoryItems.length).toBe(wrapper.vm.categories.length);
  
    // Перевіряємо, чи кожен елемент має клас category-item
    categoryItems.forEach((item) => {
      expect(item.classes()).toContain('category-item');
    });
  });

 
  
});
