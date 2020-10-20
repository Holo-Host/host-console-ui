module.exports = {
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    "src/(.*)$": "<rootDir>/src/$1",
    "pages/(.*)$": "<rootDir>/src/pages/$1",
    "components/(.*)$": "<rootDir>/src/components/$1"        
  },
}
