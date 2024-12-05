import { shallowMount } from '@vue/test-utils';
import HomePage from '@/components/HomePage.vue';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('HomePage.vue', () => {
  let wrapper;

  beforeAll(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }), // Імітація даних API
      })
    );
    // Mock browser methods
    window.alert = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  beforeEach(() => {
    wrapper = shallowMount(HomePage, {
      global: {
        mocks: {
          $t: (msg) => {
            const translations = {
              viewProducts: 'Переглянути товари',
              handmadeProducts: 'Ручні вироби',
              exclusiveJewelry: 'Ексклюзивні прикраси',
              quoteText: 'Українська спадщина',
              gnatKhotkevich: 'Гнат Хоткевич',
            };
            return translations[msg] || msg;
          },
        },
        stubs: ['router-link', 'PopularProducts', 'NewArrivals', 'CategoryProduct'],
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    jest.clearAllMocks();
  });

  it('слід загорнути кнопку «Переглянути продукти» у маршрутизатор із правильним маршрутом', () => {
    const routerLink = wrapper.find('router-link-stub');
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.attributes('to')).toBe('/allproduct');
  });

  it('має мати ефект наведення курсора на кнопку «Переглянути продукти».', async () => {
    const button = wrapper.find('.view-products-button');
    expect(button.exists()).toBe(true);

    jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
      if (element === button.element) {
        return { backgroundColor: 'rgb(160, 18, 18)' };
      }
      return {};
    });

    await button.trigger('mouseenter');
    expect(getComputedStyle(button.element).backgroundColor).toBe('rgb(160, 18, 18)');

    jest.restoreAllMocks();
  });

  it('має отримати популярні продукти на монтуванні', async () => {
    await wrapper.vm.fetchPopularProducts();
    expect(global.fetch).toHaveBeenCalledWith('http://26.235.139.202:8080/api/popular-products');
  });

  // Тестування API запитів (нові надходження)
  it('повинен отримати нових надходжень', async () => {
    await wrapper.vm.fetchNewArrivals();
    expect(global.fetch).toHaveBeenCalledWith('http://26.235.139.202:8080/api/new-arrivals');
  });

  // Тестування IntersectionObserver
  it('має викликати IntersectionObserver для спостереження за елементами, що зникають', () => {
    const observerMock = jest.fn();
    global.IntersectionObserver = jest.fn(() => ({
      observe: observerMock,
      unobserve: jest.fn(),
    }));

    wrapper.vm.observeElements();

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
      expect(observerMock).toHaveBeenCalledWith(element);
    });
  });

});
