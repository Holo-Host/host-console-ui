// there's some duplication between this file and mock-hpos-api/authUtils.js

// Parse window.location to retrieve holoPort's HC public key (3rd level subdomain in URL)
const getHcPubkey = () => {
  return ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    ? '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'
    : window.location.hostname.split('.')[0])
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
// Use singleton pattern
// Return null when trying to initialize with no params
// TODO: the default email and password here are for testing only and should be removed before merging
export const getHpAdminKeypair = async (email='test@test.com', password='asasas') => {
  if (HpAdminKeypairInstance) return HpAdminKeypairInstance

  const hcKey = getHcPubkey()

  if (!hcKey || !email || !password) return null

  const HpAdminKeypair = await importHpAdminKeypairClass()
  HpAdminKeypairInstance = new HpAdminKeypair(hcKey, email, password)

  return HpAdminKeypairInstance
}

// Return empty string if HpAdminKeypair is still not initialized
export const signPayload = async (method, request, bodyHash) => {
  const keypair = await getHpAdminKeypair()

  if (keypair === null) return ''

  const payload = { method: method.toLowerCase(), request, body: bodyHash || '' }

  try {
    const signature = keypair.sign(payload)
    // console.log({method, request, bodyHash, signature})
    
    return signature
  } catch (error) {
    throw (error)
  }
}

export const hashString = async (string) => {
  const dataBytes = Buffer.from(string)
  const hashBytes = await crypto.subtle.digest('SHA-512', dataBytes)

  return Buffer.from(hashBytes).toString('base64')
}