// babel.config.js
module.exports = {
    presets: [
      [
        '@babel/preset-env',  // Дозволяє використовувати сучасний JavaScript
        {
          targets: {
            node: 'current'    // Налаштування для роботи в Node.js (необхідно для Jest)
          }
        }
      ]
    ]
  };
  