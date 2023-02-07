module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    '@vue/vue3-jest': {
      transform: {
        i18n: 'vue-i18n-jest'
      }
    }
  },
  transform: {
    '^.+\\ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleFileExtensions: ['vue', 'js', 'ts', 'json', 'jsx'],
  moduleNameMapper: {
    '@uicommon/(.*)$': '<rootDir>/ui-common-library/src/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    'src/(.*)$': '<rootDir>/src/$1',
    'pages/(.*)$': '<rootDir>/src/pages/$1',
    'components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^vue$': '<rootDir>/node_modules/vue'
  },
  setupFiles: ['jest-canvas-mock'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/constants.ts',
    '/src/__tests__/utils.js',
    '/ui-common-library/'
  ]
};
