import { shallowMount } from '@vue/test-utils';
import AboutUs from '../../components/AboutUs.vue';

describe('AboutUs.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AboutUs);
  });

  afterEach(() => {
    wrapper.unmount(); // Заміна destroy() на unmount()
  });

  // Мок для window.alert, оскільки JSDOM не підтримує цю функцію
  beforeAll(() => {
    window.alert = jest.fn();
  });

  it('повинен відображати головний заголовок', () => {
    const mainTitle = wrapper.find('.main-title');
    expect(mainTitle.exists()).toBe(true);
    expect(mainTitle.text()).toBe('Про нас');
  });

  it('повинен відображати заголовок секції "Історія заснування"', () => {
    const sectionTitle = wrapper.find('.section-title');
    expect(sectionTitle.exists()).toBe(true);
    expect(sectionTitle.text()).toBe('Історія заснування "Коштовня"');
  });

  it('повинен відображати FAQ заголовок', () => {
    const faqTitle = wrapper.find('.faq-title');
    expect(faqTitle.exists()).toBe(true);
    expect(faqTitle.text()).toContain('Часті запитання');
  });

  it('повинен відображати три FAQ елементи', () => {
    const faqItems = wrapper.findAll('.faq-item');
    expect(faqItems.length).toBe(3);
  });

  it('повинен розгортати відповідь на питання FAQ при натисканні', async () => {
    const faqButton = wrapper.findAll('.faq-question').at(0);
    await faqButton.trigger('click');
    expect(wrapper.vm.faqOpen[0]).toBe(true);
    const faqAnswer = wrapper.find('.faq-answer');
    expect(faqAnswer.exists()).toBe(true);
    expect(faqAnswer.text()).toContain('Дорожчий бісер часто відрізняється якістю');
  });

  it('повинен очищувати форму після відправки', async () => {
    const emailInput = wrapper.find('#email');
    const messageInput = wrapper.find('#message');

    await emailInput.setValue('test@example.com');
    await messageInput.setValue('Це тестове повідомлення');

    expect(wrapper.vm.form.email).toBe('test@example.com');
    expect(wrapper.vm.form.message).toBe('Це тестове повідомлення');

    await wrapper.find('form').trigger('submit.prevent');

    // Перевіряємо, чи очистилися поля форми
    expect(wrapper.vm.form.email).toBe('');
    expect(wrapper.vm.form.message).toBe('');
  });
});
