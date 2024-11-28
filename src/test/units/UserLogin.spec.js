import { mount } from '@vue/test-utils';
import UserLogin from '../../components/UserLogin.vue';

// Стаб для глобального fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    headers: {
      get: jest.fn().mockReturnValue('application/json'),
    },
    json: () => Promise.resolve({ token: 'mock-token' }),
  })
);

describe('UserLogin.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UserLogin, {
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot /></a>', // Мокаємо router-link
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks(); // Очищуємо моки після кожного тесту
  });

  it('Контейнер має правильний клас', () => {
    const loginContainer = wrapper.find('.login-container');
    expect(loginContainer.exists()).toBe(true);
    expect(loginContainer.classes()).toContain('login-container');
  });

  it('Заголовок секції має правильний текст і клас', () => {
    const sectionTitle = wrapper.find('span.section-title');
    expect(sectionTitle.exists()).toBe(true);
    expect(sectionTitle.text()).toBe('Вхід');
    expect(sectionTitle.classes()).toContain('section-title');
  });

  it('Форма має правильний клас', () => {
    const loginForm = wrapper.find('form.login-form');
    expect(loginForm.exists()).toBe(true);
    expect(loginForm.classes()).toContain('login-form');
  });

  it('Поле Email має правильні атрибути і класи', () => {
    const emailInput = wrapper.find('input#email');
    expect(emailInput.exists()).toBe(true);
    expect(emailInput.attributes('type')).toBe('email');
    expect(emailInput.attributes('placeholder')).toBe('Введіть ваш email');
    expect(emailInput.classes()).toContain('form-input');
  });

  it('Поле Password має правильні атрибути і класи', () => {
    const passwordInput = wrapper.find('input#password');
    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.attributes('type')).toBe('password');
    expect(passwordInput.attributes('placeholder')).toBe('Введіть пароль');
    expect(passwordInput.classes()).toContain('form-input');
  });

  it('Кнопка "Увійти" має правильні атрибути і класи', () => {
    const loginButton = wrapper.find('button.login-button');
    expect(loginButton.exists()).toBe(true);
    expect(loginButton.classes()).toContain('login-button');
    expect(loginButton.attributes('type')).toBe('submit');
    expect(loginButton.text()).toContain('Увійти');
  });

  it('Посилання на реєстрацію має правильний текст і клас', () => {
    const registrationLink = wrapper.find('a.signup-link');
    expect(registrationLink.exists()).toBe(true);
    expect(registrationLink.text()).toBe('Створіть його тут');
    expect(registrationLink.classes()).toContain('signup-link');
  });

  it('Фонова картинка рендериться з правильним класом', () => {
    const backgroundImage = wrapper.find('.login-background-image');
    expect(backgroundImage.exists()).toBe(true);
    expect(backgroundImage.classes()).toContain('login-background-image');
  });

  it('Кнопка показу/приховування пароля рендериться з правильним класом', () => {
    const togglePasswordButton = wrapper.find('button.toggle-password-button');
    expect(togglePasswordButton.exists()).toBe(true);
    expect(togglePasswordButton.classes()).toContain('toggle-password-button');
  });

  it('Перевірка валідації форми: обов’язковість полів Email і Пароль', async () => {
    // Знаходимо форму
    const loginForm = wrapper.find('form.login-form');
    expect(loginForm.exists()).toBe(true);
  
    // Сабміт без введених даних
    await loginForm.trigger('submit.prevent');
  
    // Перевірка повідомлень про помилку
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    expect(emailInput.element.validity.valueMissing).toBe(true); // Поле Email обов'язкове
    expect(passwordInput.element.validity.valueMissing).toBe(true); // Поле Password обов'язкове
  
    // Вводимо коректні значення
    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');
    await loginForm.trigger('submit.prevent');
  
    // Перевірка, що валідаційні помилки відсутні
    expect(emailInput.element.validity.valid).toBe(true);
    expect(passwordInput.element.validity.valid).toBe(true);
  });
  
  
});
