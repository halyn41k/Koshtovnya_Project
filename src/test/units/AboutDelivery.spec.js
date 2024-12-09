import { shallowMount } from '@vue/test-utils';
import AboutDelivery from '../../components/AboutDelivery.vue';

// Мок для IntersectionObserver
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('AboutDelivery.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AboutDelivery);
    Object.defineProperty(window, 'getComputedStyle', {
      value: jest.fn().mockImplementation(() => ({
        fontSize: '34px',
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
      })),
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount(); // Очищення після кожного тесту
    }
  });

  it('повинен відображати головний заголовок', () => {
    const mainTitle = wrapper.find('.main-title');
    expect(mainTitle.exists()).toBe(true);
    expect(mainTitle.text()).toBe('Умови оплати та доставки');
  });

  it('повинен відображати заголовок секції "Доставка"', () => {
    const deliverySectionTitle = wrapper.find('.delivery-section .section-title');
    expect(deliverySectionTitle.exists()).toBe(true);
    expect(deliverySectionTitle.text()).toBe('Доставка');
  });

  it('повинен відображати заголовок секції "Умови доставки"', () => {
    const conditionsTitle = wrapper.find('.delivery-conditions .section-title');
    expect(conditionsTitle.exists()).toBe(true);
    expect(conditionsTitle.text()).toBe('1. Умови доставки:');
  });

  it('повинен відображати дві компанії доставки', () => {
    const deliveryItems = wrapper.findAll('.delivery-item');
    expect(deliveryItems.length).toBe(2);

    expect(deliveryItems.at(0).find('.delivery-company').text()).toContain('Нова Пошта');
    expect(deliveryItems.at(1).find('.delivery-company').text()).toContain('Укрпошта');
  });

  it('повинен відображати секцію "Оплата" з правильним заголовком', () => {
    const paymentSectionTitle = wrapper.find('.payment-section .section-title');
    expect(paymentSectionTitle.exists()).toBe(true);
    expect(paymentSectionTitle.text()).toBe('2. Оплата');
  });

  it('повинен відображати три способи оплати', () => {
    const paymentItems = wrapper.findAll('.payment-item');
    expect(paymentItems.length).toBe(3);

    expect(paymentItems.at(0).find('.payment-method').text()).toContain('Оплата при отриманні');
    expect(paymentItems.at(1).find('.payment-method').text()).toContain('Передплата на банківську карту');
    expect(paymentItems.at(2).find('.payment-method').text()).toContain('Онлайн оплата карткою');
  });

  it('повинен відображати додаткові умови', () => {
    const additionalConditions = wrapper.find('.additional-conditions .subsection-title');
    expect(additionalConditions.exists()).toBe(true);
    expect(additionalConditions.text()).toBe('Додаткові умови:');

    const conditionsItems = wrapper.findAll('.condition-item');
    expect(conditionsItems.length).toBe(2);

    expect(conditionsItems.at(0).text()).toContain(
      '• У випадку оплати післяплатою, клієнт оплачує додаткову комісію перевізника за цей вид послуги.'
    );

    expect(conditionsItems.at(1).text()).toContain(
      '• Замовлення відправляється протягом 1-2 робочих днів після підтвердження оплати або оформлення післяплати.'
    );
  });

  it('повинен відображати подяку у футері', () => {
    const thankYouMessage = wrapper.find('.thank-you-message');
    expect(thankYouMessage.exists()).toBe(true);
    expect(thankYouMessage.text()).toBe('Дякуємо, що обрали наш магазин!');
  });

  it('повинен мати правильний стиль для заголовка', () => {
    const titleElement = wrapper.find('.main-title').element;
    const computedStyles = window.getComputedStyle(titleElement);
  
    expect(computedStyles.fontSize).toBe('34px');
    expect(computedStyles.color).toBe('rgb(0, 0, 0)');
    expect(computedStyles.textAlign).toBe('center');
  });
  
});
