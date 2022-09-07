export function mockGlobalCrypto() {
  localStorage.setItem('authToken', 'abba')
  Object.defineProperty(global, 'crypto', {
    value: {
      subtle: {
        digest: () => Promise.resolve('unchecked string')
      }
    }
  })
}
