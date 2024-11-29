// src/test/units/UserLogin.spec.js

import { mount } from '@vue/test-utils';
import UserLogin from '../../components/UserLogin.vue';

// Мок для глобального fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    headers: {
      get: jest.fn().mockReturnValue('application/json'),
    },
    json: () => Promise.resolve({ token: 'mock-token' }),
  })
);

// Мок для window.alert
global.alert = jest.fn();

// Мок для router.push
const mockRouterPush = jest.fn();

describe('UserLogin.vue', () => {
  let wrapper;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Мокаємо console.log
  });

  afterAll(() => {
    // Відновлюємо оригінальну поведінку console.error
    console.error.mockRestore();
  });

  beforeEach(() => {
    wrapper = mount(UserLogin, {
      global: {
        mocks: {
          $router: {
            push: mockRouterPush, // Мокаємо router.push
          },
        },
        stubs: {
          'router-link': {
            template: '<a><slot /></a>', // Мокаємо router-link
          },
        },
      },
    });

    jest.clearAllMocks(); // Очищуємо всі моки перед кожним тестом
  });

  afterEach(() => {
    wrapper.unmount(); // Знищуємо інстанс компонента після кожного тесту
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
    const loginForm = wrapper.find('form.login-form');
    expect(loginForm.exists()).toBe(true);

    // Сабміт без введених даних
    await loginForm.trigger('submit.prevent');

    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    expect(emailInput.element.validity.valueMissing).toBe(true);
    expect(passwordInput.element.validity.valueMissing).toBe(true);

    // Вводимо коректні значення
    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');
    await loginForm.trigger('submit.prevent');

    expect(emailInput.element.validity.valid).toBe(true);
    expect(passwordInput.element.validity.valid).toBe(true);
  });

  it('Викликає alert при помилці входу', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    const loginForm = wrapper.find('form.login-form');
    await loginForm.trigger('submit.prevent');

    expect(global.alert).toHaveBeenCalledWith('Не вдалося увійти. Перевірте ваші дані.');
    expect(console.error).toHaveBeenCalledWith('Помилка входу:', 'Network error');
  });

  it('Перенаправляє після успішного входу', async () => {
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');

    const loginForm = wrapper.find('form.login-form');
    await loginForm.trigger('submit.prevent');

    expect(mockRouterPush).toHaveBeenCalledWith({ name: 'AccountInfo' });
  });

  it('Функціональність кнопки відображення/приховування пароля', async () => {
    const passwordInput = wrapper.find('input#password');
    const togglePasswordButton = wrapper.find('button.toggle-password-button');
  
    // Отримуємо HTML SVG-елемента
    const getCurrentIconSVG = () => togglePasswordButton.find('svg').html();
  
    // Ключові частини SVG-коду для перевірки
    const expectedEyeClosedPath = 'M2 2L22 22M12 4.5C7 4.5 2.73 7.61 1 12c1.23 2.9 3.37 5.15 6.13 6.3';
    const expectedEyeOpenPath = 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5';
  
    // Початковий стан: поле має тип "password", і відображається іконка закритого ока.
    expect(passwordInput.attributes('type')).toBe('password');
    expect(getCurrentIconSVG()).toContain(expectedEyeClosedPath);
  
    // Клік по кнопці зміни видимості пароля.
    await togglePasswordButton.trigger('click');
  
    // Після кліку: поле має тип "text", і відображається іконка відкритого ока.
    expect(passwordInput.attributes('type')).toBe('text');
    expect(getCurrentIconSVG()).toContain(expectedEyeOpenPath);
  
    // Повторний клік.
    await togglePasswordButton.trigger('click');
  
    // Повертається до початкового стану: поле "password", іконка закритого ока.
    expect(passwordInput.attributes('type')).toBe('password');
    expect(getCurrentIconSVG()).toContain(expectedEyeClosedPath);
  });
    
  it('Перевіряє, що всі тексти відповідають українській локалізації', () => {
    // Текст заголовка
    const sectionTitle = wrapper.find('span.section-title');
    expect(sectionTitle.text()).toBe('Вхід');

    // Тексти лейблів
    const emailLabel = wrapper.find('label[for="email"]');
    expect(emailLabel.text()).toBe('Email:');

    const passwordLabel = wrapper.find('label[for="password"]');
    expect(passwordLabel.text()).toBe('Пароль:');

    // Текст кнопки входу
    const loginButton = wrapper.find('button.login-button');
    expect(loginButton.text()).toContain('Увійти');

    // Текст посилання на реєстрацію
    const signupPrompt = wrapper.find('p.signup-prompt');
    expect(signupPrompt.text()).toContain('Немає облікового запису?');

    const signupLink = wrapper.find('a.signup-link');
    expect(signupLink.text()).toBe('Створіть його тут');

    // Повідомлення при помилці
    const alertMessage = 'Не вдалося увійти. Перевірте ваші дані.';
    global.alert(alertMessage); // Simulate an alert
    expect(global.alert).toHaveBeenCalledWith(alertMessage);

    // Логотип на кнопці (перевіряємо за alt текстом)
    const loginIcon = wrapper.find('.login-icon');
    expect(loginIcon.attributes('alt')).toBe('');
  });
  
  it('Відображає повідомлення про помилку при невірних даних', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Не вдалося увійти. Перевірте ваші дані.' }),
      })
    );
  
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const loginForm = wrapper.find('form.login-form');
  
    await emailInput.setValue('wrong@example.com');
    await passwordInput.setValue('wrongpassword');
    await loginForm.trigger('submit.prevent');
  
    expect(global.fetch).toHaveBeenCalledWith(
      'http://26.235.139.202:8080/api/login',
      expect.any(Object)
    );
    expect(global.alert).toHaveBeenCalledWith('Не вдалося увійти. Перевірте ваші дані.');
  });
  
  it('Відображає повідомлення про помилку при проблемах із сервером', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Server is down')));

    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const loginForm = wrapper.find('form.login-form');

    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');
    await loginForm.trigger('submit.prevent');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://26.235.139.202:8080/api/login',
      expect.any(Object)
    );
    expect(global.alert).toHaveBeenCalledWith('Не вдалося увійти. Перевірте ваші дані.');
    expect(console.error).toHaveBeenCalledWith('Помилка входу:', 'Server is down');
  });
}); 
