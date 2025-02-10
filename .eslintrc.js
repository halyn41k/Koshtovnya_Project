module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // Додаємо середовище браузера
    jest: true      // Додаємо середовище Jest для тестових функцій
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // Додати правило для дозволу непомічених імпортів
    'no-unused-vars': 'warn',  // Попередження замість помилки для невикористаних змінних
    'vue/multi-word-component-names': 'off',

  },
};
