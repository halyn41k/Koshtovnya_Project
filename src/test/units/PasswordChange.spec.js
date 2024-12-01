import { shallowMount } from '@vue/test-utils';
import ChangePassword from '../../components/ChangePassword.vue'; // Виправлено назву компонента

describe('ChangePassword.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ChangePassword);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount(); // Очищення після кожного тесту
    }
  });

  it('відтворює всі необхідні елементи', () => {
    // Заголовки
    expect(wrapper.find('.password-change-title').text()).toBe('Зміна паролю');

    // Поля для введення паролів
    expect(wrapper.find('#currentPassword').exists()).toBe(true);
    expect(wrapper.find('#newPassword').exists()).toBe(true);
    expect(wrapper.find('#confirmPassword').exists()).toBe(true);

    // Кнопки видимості паролів
    expect(wrapper.findAll('.toggle-password-button').length).toBe(3);

    // Кнопка для зміни пароля
    const submitButton = wrapper.find('.password-change-button');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toContain('Змінити пароль');
  });

  it('правильно обробляє введення', async () => {
    const currentPasswordInput = wrapper.find('#currentPassword');
    const newPasswordInput = wrapper.find('#newPassword');
    const confirmPasswordInput = wrapper.find('#confirmPassword');

    // Симулюємо введення тексту
    await currentPasswordInput.setValue('current_password');
    await newPasswordInput.setValue('new_password');
    await confirmPasswordInput.setValue('new_password_confirm');

    // Перевіряємо дані в моделі
    expect(wrapper.vm.currentPassword).toBe('current_password');
    expect(wrapper.vm.newPassword).toBe('new_password');
    expect(wrapper.vm.confirmPassword).toBe('new_password_confirm');
  });

  it('правильно перемикає видимість паролів', async () => {
    const toggleButtons = wrapper.findAll('.toggle-password-button');

    // Перевіряємо початковий стан видимості
    expect(wrapper.vm.showCurrentPassword).toBe(false);
    expect(wrapper.vm.showNewPassword).toBe(false);
    expect(wrapper.vm.showConfirmPassword).toBe(false);

    // Натискаємо кнопки видимості
    await toggleButtons.at(0).trigger('click');
    expect(wrapper.vm.showCurrentPassword).toBe(true);

    await toggleButtons.at(1).trigger('click');
    expect(wrapper.vm.showNewPassword).toBe(true);

    await toggleButtons.at(2).trigger('click');
    expect(wrapper.vm.showConfirmPassword).toBe(true);
  });
});
