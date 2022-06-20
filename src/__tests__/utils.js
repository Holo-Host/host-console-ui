export function mockGlobalCrypto() {
	Object.defineProperty(global, 'crypto', {
		value: {
			subtle: {
				digest: () => Promise.resolve('unchecked string')
			}
		}
	})
}
