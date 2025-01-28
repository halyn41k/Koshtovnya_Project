module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest', // Упевніться, що використовується `vue3-jest`
    '^.+\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(@vue|vue-styleguidist)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
