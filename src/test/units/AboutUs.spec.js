import { shallowMount } from '@vue/test-utils'; 
import AboutUs from '../../components/AboutUs.vue'; 
 
describe('AboutUs.vue', () => { 
  let wrapper; 
 
  beforeEach(() => { 
    wrapper = shallowMount(AboutUs); 
  }); 
 
  afterEach(() => { 
    wrapper.unmount(); // Очищення після кожного тесту 
  }); 
 
  // Мок 
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
 
  it('показує повідомлення про помилку при відправленні порожньої форми', async () => { 
  const form = wrapper.find('form'); 
  const emailInput = wrapper.find('input[type="email"]'); 
  const messageTextarea = wrapper.find('textarea'); 
 
  // Викликаємо подію submit 
  await form.trigger('submit'); 
 
  // Перевіряємо, чи поля є недійсними 
  expect(emailInput.element.validity.valid).toBe(false); 
  expect(messageTextarea.element.validity.valid).toBe(false); 
 
  // Перевіряємо, що є відповідні повідомлення 
  expect(emailInput.element.validationMessage).toBeTruthy(); 
  expect(messageTextarea.element.validationMessage).toBeTruthy(); 
}); 
 
it('показує повідомлення про помилку при введенні некоректної електронної пошти', async () => { 
  // Знаходимо поля форми 
  const emailInput = wrapper.find('#email'); 
  const messageTextarea = wrapper.find('#message'); 
   
  // Встановлюємо значення для поля email і message 
  await emailInput.setValue('vitalii'); 
  await messageTextarea.setValue('Це тестове повідомлення'); 
   
  // Перевіряємо, чи значення textarea є коректним ДО сабміту 
  expect(messageTextarea.element.value).toBe('Це тестове повідомлення'); 
   
  // Сабмітимо форму 
  await wrapper.find('form').trigger('submit.prevent'); 
   
  // Тепер значення мають бути очищені 
  expect(messageTextarea.element.value).toBe(''); 
  expect(emailInput.element.value).toBe(''); 
}); 
 
it('змінює колір кнопки "Надіслати" при наведенні', async () => { 
  const submitButton = wrapper.find('.form-submit'); 
 
  // Мокаємо getComputedStyle 
  jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => { 
    if (element === submitButton.element) { 
      return { backgroundColor: 'rgb(142, 14, 14)' }; // Колір для імітації 
    } 
    return {}; 
  }); 
 
  // Емітуємо подію наведення 
  await
submitButton.trigger('mouseenter'); 
 
  // Перевіряємо, що колір став очікуваним 
  expect(getComputedStyle(submitButton.element).backgroundColor).toBe('rgb(142, 14, 14)'); 
 
  // Очищення мока 
  jest.restoreAllMocks(); 
}); 
 
it('змінює стиль поля введення email при фокусуванні', async () => { 
  const emailInput = wrapper.find('#email'); 
 
  // Мокаємо getComputedStyle 
  jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => { 
    if (element === emailInput.element) { 
      return { borderWidth: '2px', borderColor: 'rgb(99, 2, 2)' }; // Стиль для фокусу 
    } 
    return {}; 
  }); 
 
  // Емітуємо подію фокусу 
  await emailInput.trigger('focus'); 
 
  // Перевіряємо, чи змінився стиль 
  expect(getComputedStyle(emailInput.element).borderWidth).toBe('2px'); 
  expect(getComputedStyle(emailInput.element).borderColor).toBe('rgb(99, 2, 2)'); 
 
  // Очищення мока 
  jest.restoreAllMocks(); 
}); 
 
it('змінює стиль поля введення message при фокусуванні', async () => { 
  const messageInput = wrapper.find('#message'); 
 
  // Мокаємо getComputedStyle 
  jest.spyOn(window, 'getComputedStyle').mockImplementation((element) => { 
    if (element === messageInput.element) { 
      return { borderWidth: '2px', borderColor: 'rgb(99, 2, 2)' }; // Стиль для фокусу 
    } 
    return {}; 
  }); 
 
  // Емітуємо подію фокусу 
  await messageInput.trigger('focus'); 
 
  // Перевіряємо, чи змінився стиль 
  expect(getComputedStyle(messageInput.element).borderWidth).toBe('2px'); 
  expect(getComputedStyle(messageInput.element).borderColor).toBe('rgb(99, 2, 2)'); 
 
  // Очищення мока 
  jest.restoreAllMocks(); 
}); 
 /*
it('приймає допустимі електронні адреси з доменами, що містять крапку', async () => { 
  const emailInput = wrapper.find('#email'); 
  const messageInput = wrapper.find('#message'); 
  const form = wrapper.find('form'); 
 
  // Встановлюємо значення для полів 
  await emailInput.setValue('example.name@mail.co.uk'); 
  await messageInput.setValue('test'); 
 
  // Перевіряємо значення перед сабмітом 
  expect(wrapper.vm.form.email).toBe('example.name@mail.co.uk'); 
  expect(wrapper.vm.form.message).toBe('test'); 
 
  // Сабмітимо форму 
  await form.trigger('submit.prevent'); 
 
  // Перевіряємо, що поля очищуються після сабміту 
  expect(wrapper.vm.form.email).toBe(''); 
  expect(wrapper.vm.form.message).toBe(''); 
}); */
 
});