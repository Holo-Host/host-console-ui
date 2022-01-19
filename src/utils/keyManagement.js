import stringify from 'fast-json-stable-stringify'

// there's some duplication between this file and mock-hpos-api/authUtils.js

// Parse window.location to retrieve holoPort's HC public key (3rd level subdomain in URL)
const getHcPubkey = () => {
  if (process.env.VUE_APP_USE_REAL_PUB_KEY === 'true') {
    return window.location.hostname.split('.')[0]
  } else if (process.env.VUE_APP_HOLOPORT_URL) {
    return (new URL(process.env.VUE_APP_HOLOPORT_URL)).hostname.split('.')[0]
  } else {
    return '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'
  }
}

// This import has to be async because of the way that dumb webpack interacts with wasm
// It took me more than 2 days to make it work so DO NOT even try to touch this code!
const importHpAdminKeypairClass = async () => {
  const wasm = await import('@holo-host/hp-admin-keypair')
  return wasm.HpAdminKeypair
}

let HpAdminKeypairInstance

// Erase keypair
export const eraseHpAdminKeypair = () => {
  HpAdminKeypairInstance = undefined
}

// Create keypair using wasm-based HpAdminKeypair Class
// Uses singleton pattern
// Return null when trying to initialize with no params
export const getHpAdminKeypair = async (email, password) => {
  if (HpAdminKeypairInstance) return HpAdminKeypairInstance

  const hcKey = getHcPubkey()

  if (!hcKey || !email || !password) return null

  const HpAdminKeypair = await importHpAdminKeypairClass()
  HpAdminKeypairInstance = new HpAdminKeypair(hcKey, email, password)

  return HpAdminKeypairInstance
}

export const checkHpAdminKeypair = () => !!HpAdminKeypairInstance

export const signRequest = async (method, url, params) => {
  const keypair = await getHpAdminKeypair()

  // Workaround to allow making requests within unit tests
  if (keypair === null) {
    return ''
  }

  let path_to_sign = (new URL(url)).pathname
  let body = ''
  if (params) {
    switch (method) {
      case 'get':
      case 'delete':
        path_to_sign = `${path_to_sign}?${new URLSearchParams(params)}`
        break
      case 'post':
      case 'put':
        // BUG: real server (hp-admin-crypto) does not properly check the body when
        //      verifying signature [1]. pass empty string so that it validates
        //      successfully
        //
        // [1]: https://github.com/Holo-Host/hp-admin-crypto/issues/25
        //
        // correct code:
        //
        // body = stringify(params)
        break
      default:
        throw new Error(`No case in hposCall for ${method} method`)
    }
  }

  const payload = { method: method.toLowerCase(), request: path_to_sign, body }
  const signature = keypair.sign(payload)

  return signature
}

export const hashString = async (string) => {
  const dataBytes = Buffer.from(string)
  const hashBytes = await crypto.subtle.digest('SHA-512', dataBytes)

  return Buffer.from(hashBytes).toString('base64')
}
