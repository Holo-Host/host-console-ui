import { kAuthTokenLSKey } from '@/constants.ts'

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
