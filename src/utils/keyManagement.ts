import type { HpAdminKeypair } from '@holo-host/hp-admin-keypair'

// Parse window.location to retrieve holoPort's HC public key (3rd level subdomain in URL)
const getHcPubkey = (): string | undefined => {
  if (import.meta.env.VITE_USE_REAL_PUB_KEY === 'true') {
    return window.location.hostname.split('.')[0]
  } else if (import.meta.env.VITE_HOLOPORT_URL) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new URL(import.meta.env.VITE_HOLOPORT_URL).hostname.split('.')[0]
  } else {
    return '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'
  }
}

// This import has to be async because of the way that dumb webpack interacts with wasm
// It took me more than 2 days to make it work so DO NOT even try to touch this code!
const importHpAdminKeypairClass = async (): Promise<typeof HpAdminKeypair> => {
  const wasm = await import('@holo-host/hp-admin-keypair')
  return wasm.HpAdminKeypair
}

let HpAdminKeypairInstance: typeof HpAdminKeypair | HpAdminKeypair | undefined

export const eraseHpAdminKeypair = (): void => {
  HpAdminKeypairInstance = undefined
}

// Create keypair using wasm-based HpAdminKeypair Class
// Uses singleton pattern
// Return null when trying to initialize with no params
export const getHpAdminKeypair = async (
  email: string,
  password: string
): Promise<typeof HpAdminKeypair | HpAdminKeypair | null> => {
  if (HpAdminKeypairInstance) {
    return HpAdminKeypairInstance
  }

  const hcKey = getHcPubkey()

  if (!hcKey || !email || !password) {
    return null
  }

  const HpAdminKeypair = await importHpAdminKeypairClass()
  HpAdminKeypairInstance = new HpAdminKeypair(hcKey, email, password)

  return HpAdminKeypairInstance
}

export const checkHpAdminKeypair = (): boolean => !!HpAdminKeypairInstance

export const hashString = async (string: string): Promise<string> => {
  const dataBytes = Buffer.from(string)
  const hashBytes = await crypto.subtle.digest('SHA-512', dataBytes)

  return Buffer.from(hashBytes).toString('base64')
}
