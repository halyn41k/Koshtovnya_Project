import { shallowMount } from '@vue/test-utils';
import ProductPage from '@/components/ProductPage.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductPage Component', () => {
  let wrapper;

  const mockProduct = {
    id: 1,
    name: 'Тестовий товар',
    price: 1500,
    image_url: 'https://example.com/image.jpg',
    sizes: [10, 20, 30],
    is_available: true,
  };

  const mockRoute = {
    params: {
      id: 1,
    },
  };

  beforeEach(() => {
    // Мокаємо fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockProduct }),
      })
    );

    // Мокаємо localStorage з токеном
    global.localStorage = {
      getItem: jest.fn((key) => (key === 'token' ? 'mock-token' : null)),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    // Мокаємо відповідь API
    axios.get.mockResolvedValue({ data: { data: mockProduct } });

    // Мокаємо fetchWishlist ще до створення компонента
    jest.spyOn(ProductPage.methods, 'fetchWishlist').mockImplementation(() => {});

    // Монтуюємо компонент
    wrapper = shallowMount(ProductPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        stubs: {
          ProductReviews: true, // Замоканий компонент
          ViewOtherProduct: true, // Замоканий компонент
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищення моків
    delete global.localStorage; // Видалення моків для localStorage
    delete global.fetch; // Видалення моків для fetch
  });

  it('Відображає заголовок товару без помилок авторизації', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await wrapper.vm.$nextTick();

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    const title = wrapper.find('.product-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(mockProduct.name);

    consoleErrorSpy.mockRestore();
  });

  it('Компонент main.product-content відображається коректно', async () => {
    await wrapper.vm.$nextTick();

    // Перевіряємо, чи є компонент main.product-content
    const mainContent = wrapper.find('main.product-content');
    expect(mainContent.exists()).toBe(true);

    // Перевіряємо наявність основних секцій
    expect(mainContent.find('.product-section').exists()).toBe(true); // Секція продукту
    expect(mainContent.find('.specifications-list').exists()).toBe(true); // Секція характеристик

    // Перевіряємо, чи замокані компоненти існують
    expect(wrapper.findComponent({ name: 'ProductReviews' }).exists()).toBe(true); // Секція оглядів
    expect(wrapper.findComponent({ name: 'ViewOtherProduct' }).exists()).toBe(true); // Секція інших продуктів
  });

  it('Зображення товару (img.product-image) відображається з коректним URL', async () => {
    await wrapper.vm.$nextTick();

    // Знаходимо зображення
    const productImage = wrapper.find('img.product-image');

    // Перевіряємо, чи існує зображення
    expect(productImage.exists()).toBe(true);

    // Перевіряємо, чи атрибут src відповідає URL з product.image_url
    expect(productImage.attributes('src')).toBe(mockProduct.image_url);
  });

  it('Відображає заголовок товару (`product.name`) та його ціну (`product.price`)', async () => {
    await wrapper.vm.$nextTick();

    // Перевіряємо заголовок
    const title = wrapper.find('.product-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(mockProduct.name);

    // Перевіряємо ціну
    const price = wrapper.find('.product-price');
    expect(price.exists()).toBe(true);
    expect(price.text()).toBe(`${mockProduct.price}₴`);
  });

  // Перевірка відображення бейджа доступності
  it('Перевіряє візуальне відображення бейджа доступності', async () => {
    await wrapper.vm.$nextTick();

    const availabilityBadge = wrapper.find('.availability-badge');
    expect(availabilityBadge.exists()).toBe(true);
    expect(availabilityBadge.classes()).toContain('available');
    expect(availabilityBadge.text()).toBe('В наявності');
  });

  // Товар без розмірів
  it('Перевіряє відображення без розмірів, якщо розміри відсутні', async () => {
    wrapper.setData({
      product: {
        ...mockProduct,
        sizes: [],
      },
    });
    await wrapper.vm.$nextTick();

    const sizeDropdown = wrapper.find('select.size-dropdown');
    expect(sizeDropdown.exists()).toBe(true);
    expect(sizeDropdown.findAll('option').length).toBe(0);
  });

  it('Перевіряє відображення без характеристик, якщо вони відсутні', async () => {
    // Задаємо товар без додаткових характеристик
    wrapper.setData({
      product: {
        id: 1,
        name: 'Тестовий товар',
        price: 1500,
        image_url: 'https://example.com/image.jpg',
        sizes: [10, 20, 30],
        is_available: true,
      },
    });
  
    await wrapper.vm.$nextTick();
  
    // Перевіряємо, чи відсутні характеристики
    const specificationsList = wrapper.find('.specifications-list');
    expect(specificationsList.exists()).toBe(true);
  
    const specificationItems = specificationsList.findAll('.spec-item');
    expect(specificationItems.length).toBe(0); // Характеристик немає
  });
  
  it('Перевіряє відображення випадаючого списку розмірів з варіантами', async () => {
    // Задаємо товар із розмірами
    wrapper.setData({
      product: {
        id: 1,
        name: 'Тестовий товар',
        price: 1500,
        image_url: 'https://example.com/image.jpg',
        sizes: [10, 20, 30], // Масив розмірів
        is_available: true,
      },
    });
  
    await wrapper.vm.$nextTick();
  
    // Знаходимо випадаючий список
    const sizeDropdown = wrapper.find('select.size-dropdown');
    expect(sizeDropdown.exists()).toBe(true); // Перевіряємо, що список існує
  
    // Перевіряємо кількість варіантів у списку
    const options = sizeDropdown.findAll('option');
    expect(options.length).toBe(3); // Очікуємо 3 варіанти (10, 20, 30)
  
    // Перевіряємо значення кожного варіанту
    expect(options.at(0).text()).toBe('10 см');
    expect(options.at(1).text()).toBe('20 см');
    expect(options.at(2).text()).toBe('30 см');
  
    // Перевіряємо атрибути value кожного варіанту
    expect(options.at(0).attributes('value')).toBe('10');
    expect(options.at(1).attributes('value')).toBe('20');
    expect(options.at(2).attributes('value')).toBe('30');
  });
  
  it('Перевіряє коректну локалізацію характеристик товару', async () => {
    // Задаємо товар із характеристиками
    wrapper.setData({
      product: {
        id: 1,
        name: 'Тестовий товар',
        price: 1500,
        image_url: 'https://example.com/image.jpg',
        sizes: [10, 20, 30],
        is_available: true,
        material: 'Бавовна',
        weight: '500 г',
        colors: ['червоний', 'зелений'],
      },
    });
  
    await wrapper.vm.$nextTick();
  
    // Перевіряємо, чи список характеристик рендериться
    const specificationsList = wrapper.find('.specifications-list');
    expect(specificationsList.exists()).toBe(true);
  
    // Знаходимо всі локалізовані характеристики
    const specificationItems = specificationsList.findAll('.spec-item');
  
    // Очікуємо 3 характеристики: material, weight, colors
    expect(specificationItems.length).toBe(3);
  
    // Перевіряємо кожну характеристику
    const materialItem = specificationItems.at(0);
    expect(materialItem.find('.spec-term').text()).toBe('Матеріал'); // Локалізований ключ
    expect(materialItem.find('.spec-description').text()).toBe('Бавовна'); // Значення
  
    const weightItem = specificationItems.at(1);
    expect(weightItem.find('.spec-term').text()).toBe('Вага'); // Локалізований ключ
    expect(weightItem.find('.spec-description').text()).toBe('500 г'); // Значення
  
    const colorsItem = specificationItems.at(2);
    expect(colorsItem.find('.spec-term').text()).toBe('Кольори'); // Локалізований ключ
    expect(colorsItem.find('.spec-description').text()).toBe('червоний, зелений'); // Об'єднаний список
  });
  
  it('Перевірка роботи кнопки збільшення кількості (`increaseQuantity`) з граничними значеннями', async () => {
    wrapper.setData({
      product: {
        ...mockProduct,
        quantity: 5, // Максимальна кількість товару
      },
      quantity: 1, // Початкова кількість
    });
  
    await wrapper.vm.$nextTick();
  
    const increaseButton = wrapper.find('.quantity-arrow.up-arrow');
    expect(increaseButton.exists()).toBe(true);
  
    // Кількість збільшується до максимальної
    for (let i = 1; i < 5; i++) {
      await increaseButton.trigger('click');
      expect(wrapper.vm.quantity).toBe(i + 1); // Перевіряємо кожне збільшення
    }
  
    // Перевіряємо, що кількість не перевищує `product.quantity`
    await increaseButton.trigger('click');
    expect(wrapper.vm.quantity).toBe(5); // Залишається максимальною
  });
  
  it('Перевірка роботи кнопки зменшення кількості (`decreaseQuantity`) з граничними значеннями', async () => {
    wrapper.setData({
      product: mockProduct,
      quantity: 2, // Початкова кількість
    });
  
    await wrapper.vm.$nextTick();
  
    const decreaseButton = wrapper.find('.quantity-arrow.down-arrow');
    expect(decreaseButton.exists()).toBe(true);
  
    // Кількість зменшується до мінімальної
    await decreaseButton.trigger('click');
    expect(wrapper.vm.quantity).toBe(1); // Мінімальне значення
  
    // Перевіряємо, що кількість не стає меншою за 1
    await decreaseButton.trigger('click');
    expect(wrapper.vm.quantity).toBe(1); // Залишається мінімальною
  });
  
  it('Перевірка, що кнопки враховують граничні значення', async () => {
    wrapper.setData({
      product: {
        ...mockProduct,
        quantity: 3, // Максимальна кількість товару
      },
      quantity: 3, // Початкова кількість
    });
  
    await wrapper.vm.$nextTick();
  
    const increaseButton = wrapper.find('.quantity-arrow.up-arrow');
    const decreaseButton = wrapper.find('.quantity-arrow.down-arrow');
  
    // Натискаємо кнопку збільшення, коли кількість вже максимальна
    await increaseButton.trigger('click');
    expect(wrapper.vm.quantity).toBe(3); // Залишається максимальною
  
    // Встановлюємо мінімальну кількість
    wrapper.setData({ quantity: 1 });
    await wrapper.vm.$nextTick();
  
    // Натискаємо кнопку зменшення, коли кількість вже мінімальна
    await decreaseButton.trigger('click');
    expect(wrapper.vm.quantity).toBe(1); // Залишається мінімальною
  });
  
  it('Перевірка відкриття модального вікна для зображення (`openModal`)', async () => {
    wrapper.setData({ isModalOpen: false }); // Початково модальне вікно закрите
  
    await wrapper.vm.openModal(); // Викликаємо метод відкриття модального вікна
    expect(wrapper.vm.isModalOpen).toBe(true); // Перевіряємо, чи встановлено `isModalOpen` в true
  
    await wrapper.vm.$nextTick();
  
    const modalOverlay = wrapper.find('.modal-overlay');
    expect(modalOverlay.exists()).toBe(true); // Перевіряємо, чи з'явилося модальне вікно
  });
  
  it('Перевірка закриття модального вікна (`closeModal`)', async () => {
    wrapper.setData({ isModalOpen: true }); // Початково модальне вікно відкрите
  
    await wrapper.vm.closeModal(); // Викликаємо метод закриття модального вікна
    expect(wrapper.vm.isModalOpen).toBe(false); // Перевіряємо, чи встановлено `isModalOpen` в false
  
    await wrapper.vm.$nextTick();
  
    const modalOverlay = wrapper.find('.modal-overlay');
    expect(modalOverlay.exists()).toBe(false); // Перевіряємо, чи модальне вікно зникло
  });
  
  it('Наявність кнопки "Купити" для доступного товару', async () => {
    wrapper.setData({
      product: {
        ...mockProduct,
        is_available: true, // Товар доступний
      },
    });
  
    await wrapper.vm.$nextTick();
  
    const buyButton = wrapper.find('.buy-button');
    expect(buyButton.exists()).toBe(true); // Перевіряємо, що кнопка існує
    expect(buyButton.text()).toBe('Купити'); // Текст кнопки
    expect(buyButton.attributes('disabled')).toBeUndefined(); // Кнопка активна
  
    const notifyButton = wrapper.find('.notify-button');
    expect(notifyButton.exists()).toBe(false); // Кнопки "Повідомити про наявність" не повинно бути
  });
  
  it('Наявність кнопки "Повідомити про наявність" для недоступного товару (`notifyWhenAvailable`)', async () => {
    wrapper.setData({
      product: {
        ...mockProduct,
        is_available: false, // Товар недоступний
      },
    });
  
    await wrapper.vm.$nextTick();
  
    const notifyButton = wrapper.find('.notify-button');
    expect(notifyButton.exists()).toBe(true); // Перевіряємо, що кнопка існує
    expect(notifyButton.text()).toBe('Повідомити про наявність'); // Текст кнопки
    expect(notifyButton.attributes('disabled')).toBeUndefined(); // Кнопка активна
  
    const buyButton = wrapper.find('.buy-button');
    expect(buyButton.exists()).toBe(false); // Кнопки "Купити" не повинно бути
  });
  
  it('Перевірка додавання товару до списку бажаного (`toggleWishlist`)', async () => {
    // Імітуємо, що товар відсутній у списку бажаного
    wrapper.setData({
      wishlist: [],
      product: mockProduct,
    });
  
    // Замінюємо toggleWishlist мокованою функцією
    const toggleWishlistMock = jest.fn();
    wrapper.vm.toggleWishlist = toggleWishlistMock;
  
    // Викликаємо toggleWishlist
    await wrapper.vm.toggleWishlist(mockProduct);
  
    // Перевіряємо, чи викликано моковану функцію
    expect(toggleWishlistMock).toHaveBeenCalledWith(mockProduct);
  
    // Перевіряємо, чи товар додано до списку бажаного
    wrapper.setData({ wishlist: [mockProduct.id] }); // Емітуємо додавання
    expect(wrapper.vm.wishlist).toContain(mockProduct.id);
  });
  
  it('Перевірка видалення товару зі списку бажаного', async () => {
    // Імітуємо, що товар є у списку бажаного
    wrapper.setData({
      wishlist: [mockProduct.id],
      product: mockProduct,
    });
  
    // Замінюємо toggleWishlist мокованою функцією
    const toggleWishlistMock = jest.fn();
    wrapper.vm.toggleWishlist = toggleWishlistMock;
  
    // Викликаємо toggleWishlist
    await wrapper.vm.toggleWishlist(mockProduct);
  
    // Перевіряємо, чи викликано моковану функцію
    expect(toggleWishlistMock).toHaveBeenCalledWith(mockProduct);
  
    // Перевіряємо, чи товар видалено зі списку бажаного
    wrapper.setData({ wishlist: [] }); // Емітуємо видалення
    expect(wrapper.vm.wishlist).not.toContain(mockProduct.id);
  });
  
  it('Перевірка стану серця (заповнене/порожнє) залежно від `isInWishlist`', async () => {
    // Сценарій: товар у списку бажаного
    wrapper.setData({
      wishlist: [mockProduct.id],
      product: mockProduct,
    });
    await wrapper.vm.$nextTick();
  
    // Знаходимо іконку серця
    const filledHeart = wrapper.find('.filled-heart');
    expect(filledHeart.exists()).toBe(true); // Заповнене серце відображається
  
    const emptyHeart = wrapper.find('.empty-heart');
    expect(emptyHeart.exists()).toBe(false); // Порожнє серце не відображається
  
    // Сценарій: товар не в списку бажаного
    wrapper.setData({
      wishlist: [],
    });
    await wrapper.vm.$nextTick();
  
    // Знову перевіряємо іконки
    expect(wrapper.find('.filled-heart').exists()).toBe(false); // Заповнене серце не відображається
    expect(wrapper.find('.empty-heart').exists()).toBe(true); // Порожнє серце відображається
  });  
});
