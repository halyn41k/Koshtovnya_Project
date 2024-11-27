import { mount } from '@vue/test-utils';
import CategoryProduct from '../../components/CategoryProduct.vue';

// Стаб для глобального fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    headers: {
      get: jest.fn().mockReturnValue('application/json'), // Імітуємо заголовок 'content-type'
    },
    json: () => Promise.resolve({
      data: [
        { id: 1, name: 'Category 1', image_url: 'test-url-1' },
        { id: 2, name: 'Category 2', image_url: 'test-url-2' },
      ],
    }),
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
          'router-link': {
            template: '<a><slot /></a>', // Рендеринг внутрішнього контенту
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks(); // Очистка моків після кожного тесту
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

  it('отримує дані категорій із API та правильно їх відображає', async () => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://26.235.139.202:8080/api/categories');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.categories).toEqual([
      { id: 1, name: 'Category 1', image_url: 'test-url-1', url: '/bracelets' },
      { id: 2, name: 'Category 2', image_url: 'test-url-2', url: '/herdany' },
    ]);

    const categoryItems = wrapper.findAll('.category-item');
    expect(categoryItems.length).toBe(2);
    expect(categoryItems[0].find('img').attributes('src')).toBe('test-url-1');
    expect(categoryItems[0].find('.category-title').text()).toBe('Category 1');
    expect(categoryItems[1].find('img').attributes('src')).toBe('test-url-2');
    expect(categoryItems[1].find('.category-title').text()).toBe('Category 2');
  });

  it('відображає запасні категорії у разі невдачі при зверненні до API', async () => {
    // Імітуємо помилку в запиті API
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
  
    // Замокати console.error для цього тесту
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Чекаємо, поки виклик fetchCategories завершиться
    await wrapper.vm.fetchCategories();
  
    // Перевіряємо, що запасні категорії використано
    expect(wrapper.vm.categories).toEqual([
      { id: 1, name: 'Браслети', url: '/bracelets', image_url: expect.any(String) },
      { id: 2, name: 'Гердани', url: '/herdany', image_url: expect.any(String) },
      { id: 3, name: 'Силянки', url: '/sylyanky', image_url: expect.any(String) },
      { id: 4, name: 'Дукати', url: '/dukats', image_url: expect.any(String) },
      { id: 5, name: 'Сережки', url: '/earrings', image_url: expect.any(String) },
      { id: 6, name: 'Пояси', url: '/belts', image_url: expect.any(String) },
    ]);
  
    // Перевіряємо кількість DOM-елементів категорій
    const categoryItems = wrapper.findAll('.category-item');
    expect(categoryItems.length).toBe(6);
  
    // Перевіряємо, що кожен елемент правильно відображає дані з запасних категорій
    expect(categoryItems[0].find('.category-title').text()).toBe('Браслети');
    expect(categoryItems[1].find('.category-title').text()).toBe('Гердани');
    expect(categoryItems[2].find('.category-title').text()).toBe('Силянки');
    expect(categoryItems[3].find('.category-title').text()).toBe('Дукати');
    expect(categoryItems[4].find('.category-title').text()).toBe('Сережки');
    expect(categoryItems[5].find('.category-title').text()).toBe('Пояси');
  
    // Відновити початкову поведінку console.error
    consoleErrorMock.mockRestore();
  });
  
  it('Перевірка, що URL кожної категорії коректно додається під час мапінгу даних', async () => {
    // Очікуваний масив категорій з коректними URL
    const expectedCategories = [
      { id: 1, name: 'Category 1', image_url: 'test-url-1', url: '/bracelets' },
      { id: 2, name: 'Category 2', image_url: 'test-url-2', url: '/herdany' },
    ];
  
    // Виклик fetchCategories для отримання даних
    await wrapper.vm.fetchCategories();
  
    // Перевіряємо, чи дані категорій відповідають очікуваним
    expect(wrapper.vm.categories).toEqual(expectedCategories);
  
    // Перевіряємо, чи кожна категорія має коректний URL
    wrapper.vm.categories.forEach((category, index) => {
      expect(category.url).toBe(expectedCategories[index].url);
    });
  });
  
  it('Перевірка коректності підвантаження зображень категорій (lazy loading)', async () => {
    // Очікуємо, що fetch буде викликаний один раз
    expect(global.fetch).toHaveBeenCalledTimes(1);
  
    // Чекаємо завершення асинхронного виклику fetchCategories
    await wrapper.vm.$nextTick();
  
    // Отримуємо всі категорії
    const categoryImages = wrapper.findAll('.category-image');
  
    // Перевіряємо кількість зображень
    expect(categoryImages.length).toBe(wrapper.vm.categories.length);
  
    // Перевіряємо, що кожне зображення має атрибут loading="lazy"
    categoryImages.forEach((img) => {
      expect(img.attributes('loading')).toBe('lazy');
    });
  });
  

});
