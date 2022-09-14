import { kAuthTokenLSKey } from '@/constants'

export function mockGlobalCrypto() {
  localStorage.setItem(kAuthTokenLSKey, 'abba')
  Object.defineProperty(global, 'crypto', {
    value: {
      subtle: {
        digest: () => Promise.resolve('unchecked string')
      }
    }
  })
}
