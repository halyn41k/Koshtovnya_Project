import { mount } from '@vue/test-utils';
import CategoryProduct from '../../components/CategoryProduct.vue';

describe('CategoryProduct.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CategoryProduct, {
      global: {
        mocks: {
          $t: (msg) => msg, // Стаб для i18n
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount(); // Очищення після кожного тесту
  });

  it('повинен відображати заголовок секції', () => {
    const sectionTitle = wrapper.find('.section-title');
    expect(sectionTitle.exists()).toBe(true); // Перевіряємо, що заголовок існує
    expect(sectionTitle.text()).toBe('shopByCategory'); // Перевіряємо текст заголовка
  });

  it('повинен показувати декоративні квадрати у відповідних категоріях', async () => {
    // Налаштовуємо тестові дані
    wrapper.setData({
      categories: [
        { id: 1, name: 'Браслети', url: '/bracelets', image_url: '/image1.png' },
        { id: 2, name: 'Гердани', url: '/herdany', image_url: '/image2.png' },
        { id: 3, name: 'Силянки', url: '/sylyanky', image_url: '/image3.png' },
        { id: 4, name: 'Дукати', url: '/dukats', image_url: '/image4.png' },
        { id: 5, name: 'Сережки', url: '/earrings', image_url: '/image5.png' },
      ],
    });

    await wrapper.vm.$nextTick(); // Очікуємо оновлення DOM

    const categoryItems = wrapper.findAll('.category-item');
    expect(categoryItems.length).toBe(5); // Перевіряємо, що рендериться 5 категорій

    // Перевіряємо квадрати у 1-й, 3-й і 5-й категоріях
    [0, 2, 4].forEach((index) => {
      const item = categoryItems.at(index);
      expect(item.find('.light-square').exists()).toBe(true); // Світлий квадрат
      expect(item.find('.dark-square').exists()).toBe(true);  // Темний квадрат
    });

    // Перевіряємо, що у 2-й і 4-й категоріях квадратів немає
    [1, 3].forEach((index) => {
      const item = categoryItems.at(index);
      expect(item.find('.light-square').exists()).toBe(false);
      expect(item.find('.dark-square').exists()).toBe(false);
    });
  });
});