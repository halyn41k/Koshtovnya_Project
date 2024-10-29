module.exports = {
  root: true,
  env: {
    node: true,
    browser: true // Додаємо середовище браузера
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

  },
};
