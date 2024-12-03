// src/test/units/UserRegistration.spec.js

import { mount } from '@vue/test-utils';
import UserRegistration from '../../components/UserRegistration.vue';

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    headers: {
      get: jest.fn().mockReturnValue('application/json'),
    },
    json: () => Promise.resolve({ message: 'Registration successful' }),
  })
);

Storage.prototype.setItem = jest.fn();
global.alert = jest.fn();

describe('UserRegistration.vue', () => {
  let wrapper;
  const mockRouterPush = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

  beforeEach(() => {
    wrapper = mount(UserRegistration, {
      global: {
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    });

    jest.clearAllMocks();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Контейнер має правильний клас', () => {
    const registrationContainer = wrapper.find('.registration-container');
    expect(registrationContainer.exists()).toBe(true);
    expect(registrationContainer.classes()).toContain('registration-container');
  });

  it('Заголовок секції має правильний текст і клас', () => {
    const sectionTitle = wrapper.find('span.registration-title');
    expect(sectionTitle.exists()).toBe(true);
    expect(sectionTitle.text()).toBe('Реєстрація');
    expect(sectionTitle.classes()).toContain('registration-title');
  });

  it('Функціональність кнопки показу/приховування пароля працює правильно', async () => {
    const passwordInput = wrapper.find('input#password');
    const togglePasswordButton = wrapper.find('button.toggle-password-button');

    // Отримуємо HTML SVG-елемента
    const getCurrentIconSVG = () => togglePasswordButton.find('svg').html();

    // Ключові частини SVG-коду для перевірки
    const expectedEyeClosedPath = 'M2 2L22 22M12 4.5C7 4.5 2.73 7.61 1 12c1.23 2.9 3.37 5.15 6.13 6.3';
    const expectedEyeOpenPath = 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5';

    // Початковий стан
    expect(passwordInput.attributes('type')).toBe('password');
    expect(getCurrentIconSVG()).toContain(expectedEyeClosedPath);

    // Клік по кнопці зміни видимості пароля
    await togglePasswordButton.trigger('click');

    // Стан після кліку
    expect(passwordInput.attributes('type')).toBe('text');
    expect(getCurrentIconSVG()).toContain(expectedEyeOpenPath);

    // Повторний клік
    await togglePasswordButton.trigger('click');

    // Повернення до початкового стану
    expect(passwordInput.attributes('type')).toBe('password');
    expect(getCurrentIconSVG()).toContain(expectedEyeClosedPath);
  });

  it('Не дозволяє відправити форму з порожніми полями', async () => {
    const form = wrapper.find('form');

    await form.trigger('submit.prevent'); // Імітуємо відправку форми

    expect(form.element.checkValidity()).toBe(false); // Вбудована перевірка браузера
  });

  it('Не дозволяє відправити форму з некоректним email', async () => {
    const emailInput = wrapper.find('input#email');
    const form = wrapper.find('form');

    await emailInput.setValue('invalid-email');
    await form.trigger('submit.prevent');

    expect(form.element.checkValidity()).toBe(false); // Некоректний email не пройде перевірку
  });

  it('Пропускає форму, якщо всі поля валідні', async () => {
    const firstNameInput = wrapper.find('input#first_name');
    const lastNameInput = wrapper.find('input#last_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');

    await firstNameInput.setValue('John');
    await lastNameInput.setValue('Doe');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue('securepassword');

    expect(form.element.checkValidity()).toBe(true); // Всі поля валідні
  });

  it('Прив\'язка даних через v-model оновлює стан компонента', async () => {
    const firstNameInput = wrapper.find('input#first_name');
    const lastNameInput = wrapper.find('input#last_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');

    // Вводимо дані у поля
    await firstNameInput.setValue('Jane');
    await lastNameInput.setValue('Smith');
    await emailInput.setValue('jane.smith@example.com');
    await passwordInput.setValue('mypassword');

    // Перевіряємо стан компонента
    expect(wrapper.vm.first_name).toBe('Jane');
    expect(wrapper.vm.last_name).toBe('Smith');
    expect(wrapper.vm.email).toBe('jane.smith@example.com');
    expect(wrapper.vm.password).toBe('mypassword');
  });

  it('Рендерить усі поля та кнопки з очікуваними атрибутами', () => {
    const firstNameInput = wrapper.find('input#first_name');
    expect(firstNameInput.exists()).toBe(true);
    expect(firstNameInput.attributes('type')).toBe('text');
    expect(firstNameInput.attributes('placeholder')).toBe('Введіть ваше ім\'я');
    expect(firstNameInput.attributes('required')).toBeDefined();

    const lastNameInput = wrapper.find('input#last_name');
    expect(lastNameInput.exists()).toBe(true);
    expect(lastNameInput.attributes('type')).toBe('text');
    expect(lastNameInput.attributes('placeholder')).toBe('Введіть ваше прізвище');
    expect(lastNameInput.attributes('required')).toBeDefined();

    const emailInput = wrapper.find('input#email');
    expect(emailInput.exists()).toBe(true);
    expect(emailInput.attributes('type')).toBe('email');
    expect(emailInput.attributes('placeholder')).toBe('Введіть ваш email');
    expect(emailInput.attributes('required')).toBeDefined();

    const passwordInput = wrapper.find('input#password');
    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.attributes('type')).toBe('password');
    expect(passwordInput.attributes('placeholder')).toBe('Введіть пароль');
    expect(passwordInput.attributes('required')).toBeDefined();

    const togglePasswordButton = wrapper.find('button.toggle-password-button');
    expect(togglePasswordButton.exists()).toBe(true);
    expect(togglePasswordButton.attributes('type')).toBe('button');

    const submitButton = wrapper.find('button.registration-button');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.attributes('type')).toBe('submit');
    expect(submitButton.text()).toContain('Зареєструватися');
  });

  it('Кліки на посилання "Увійти" направляють користувача на правильний роут (/login)', () => {
    const loginLink = wrapper.find('a.login-link'); // Знаходимо посилання "Увійти"
    
    expect(loginLink.exists()).toBe(true); // Перевіряємо, що посилання існує
    expect(loginLink.attributes('href')).toBe('/login'); // Перевіряємо атрибут href
  });
  
  it('Не дозволяє відправити форму, якщо не введено пароль', async () => {
    const firstNameInput = wrapper.find('input#first_name');
    const lastNameInput = wrapper.find('input#last_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');
  
    // Імітація введення всіх полів, крім пароля
    await firstNameInput.setValue('John');
    await lastNameInput.setValue('Doe');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue(''); // Leave the password field blank
  
    // Тригер подання форми
    await form.trigger('submit.prevent');
  
    // форма не повинна надсилатися
    expect(global.alert).toHaveBeenCalledWith('Будь ласка, заповніть усі поля.');
    expect(form.element.checkValidity()).toBe(false);
  });

  it('Не дозволяє відправити форму, якщо не введено ім\'я', async () => {
    const lastNameInput = wrapper.find('input#last_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');
  
    // Заповнюємо всі поля, крім імені
    await lastNameInput.setValue('Doe');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue('securepassword');
  
    // Імітуємо відправку форми
    await form.trigger('submit.prevent');
  
    // Перевіряємо: форма не повинна відправлятись
    expect(global.alert).toHaveBeenCalledWith('Будь ласка, заповніть усі поля.');
    expect(form.element.checkValidity()).toBe(false);
  });
  
  it('Не дозволяє відправити форму, якщо не введено прізвище', async () => {
    const firstNameInput = wrapper.find('input#first_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');
  
    // Заповнюємо всі поля, крім прізвища
    await firstNameInput.setValue('John');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue('securepassword');
  
    // Імітуємо відправку форми
    await form.trigger('submit.prevent');
  
    // Перевіряємо: форма не повинна відправлятись
    expect(global.alert).toHaveBeenCalledWith('Будь ласка, заповніть усі поля.');
    expect(form.element.checkValidity()).toBe(false);
  });
  
  it('Не дозволяє відправити форму, якщо не введено пошту', async () => {
    const firstNameInput = wrapper.find('input#first_name');
    const lastNameInput = wrapper.find('input#last_name');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');
  
    // Заповнюємо всі поля, крім пошти
    await firstNameInput.setValue('John');
    await lastNameInput.setValue('Doe');
    await passwordInput.setValue('securepassword');
  
    // Імітуємо відправку форми
    await form.trigger('submit.prevent');
  
    // Перевіряємо: форма не повинна відправлятись
    expect(global.alert).toHaveBeenCalledWith('Будь ласка, заповніть усі поля.');
    expect(form.element.checkValidity()).toBe(false);
  });

  it('Показує повідомлення про помилку, якщо запит невдалий (response.ok === false)', async () => {
    // Мокаємо fetch для повернення невдалого запиту
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false, // Симулюємо невдалий запит
        json: () => Promise.resolve({ message: 'email вже зайнятий' }),
      })
    );
  
    const firstNameInput = wrapper.find('input#first_name');
    const lastNameInput = wrapper.find('input#last_name');
    const emailInput = wrapper.find('input#email');
    const passwordInput = wrapper.find('input#password');
    const form = wrapper.find('form');
  
    // Заповнюємо всі поля
    await firstNameInput.setValue('John');
    await lastNameInput.setValue('Doe');
    await emailInput.setValue('john.doe@example.com');
    await passwordInput.setValue('securepassword');
  
    // Імітуємо відправку форми
    await form.trigger('submit.prevent');
  
    // Перевіряємо, що alert викликаний із відповідним повідомленням
    expect(global.alert).toHaveBeenCalledWith('Помилка реєстрації: email вже зайнятий');
  });
});
