require('dotenv').config() // this is necessary for testing. Otherwise the process.env does not get set up befoe constants are defined
import axios from 'axios'
import mergeMockHappData from 'src/mergeMockHappData'
import { signRequest, hashString } from 'src/utils/keyManagement'
import { getHpAdminKeypair, eraseHpAdminKeypair } from 'src/utils/keyManagement'
import stringify from 'fast-json-stable-stringify'
import router from 'src/router'
// import { response } from 'express'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

// bump port number by 1 for tests so we can run tests with the UI open
const HPOS_PORT = process.env.NODE_ENV === 'test' ? Number(process.env.VUE_APP_HPOS_PORT) + 1 : process.env.VUE_APP_HPOS_PORT

export const HPOS_API_URL = HPOS_PORT
  ? `http://localhost:${HPOS_PORT}`
  : (window.location.protocol + '//' + window.location.host)

function hposCall ({ pathPrefix, method = 'get', path, headers: userHeaders = {} }) {
  return async params => {
    const fullUrl = HPOS_API_URL + pathPrefix + path

    const authToken = localStorage.getItem('authToken')
    // If localStorage.getItem('authToken') == null then hposCall should return error 401
    if (localStorage.getItem('authToken') == null) {
      return new Response(null, {
        status: 401
      });
      return new Response({status: 401})
    }

    const headers = {
      ...axiosConfig.headers,
      ...userHeaders,
      'X-Hpos-Auth-Token': authToken
    }

    let data

    switch (method) {
      case 'get':
        ({ data } = await axios.get(fullUrl, { params, headers }))
        return data
      case 'post':
        ({ data } = await axios.post(fullUrl, params, { headers }))
        return data
      case 'put':
        ({ data } = await axios.put(fullUrl, params, { headers }))
        return data
      case 'delete':
        ({ data } = await axios.delete(fullUrl, { params, headers }))
        return data
      default:
        throw new Error(`No case in hposCall for ${method} method`)
    }
  }
}

export function hposAdminCall (args) {
  // On 401 redirect to login and unset authToken because the reason for 401 might be it's expired
  try {
    const response = await hposCall({
      ...args,
      pathPrefix: '/api/v1'
    })
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.setItem('authToken')
      router.push('/login')
    }
  }
  return response
}

export function hposHolochainCall (args) {
  // On 401 redirect to login and unset authToken because the reason for 401 might be it's expired
  try {
    const response = await hposCall({
      ...args,
      pathPrefix: '/holochain-api/v1'
    })
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.setItem('authToken')
      router.push('/login')
    }
  }
  return response
}



const presentHposSettings = (hposSettings) => {
  const { admin, holoportos = {}, deviceName } = hposSettings
  return {
    hostPubKey: admin.public_key,
    registrationEmail: admin.email,
    networkStatus: holoportos.network || 'test', // ie: 'live'
    sshAccess: holoportos.sshAccess || false,
    deviceName: deviceName || (admin.public_key && admin.public_key.slice(-8)) || 'Your HP'
  }
}

const HposInterface = {
  dashboard: async () => {
    const dashboardData = await hposHolochainCall({ method: 'get', path: '/dashboard' })({ duration_unit: 'DAY', amount: 1 })
    dashboardData.currentTotalStorage = '--' // currently hiding this value from the UI as it's mock data coming from the api
    return dashboardData
  },

  hostedHapps: async () => {
    const result = await hposHolochainCall({ method: 'get', path: '/hosted_happs' })({
      duration_unit: "WEEK",
      amount: 1
    })

    if (Array.isArray(result)) {
      return result.filter(happ => happ.enabled)
        .map(mergeMockHappData)
        .map(happ => ({ // currently hiding storage value from the UI as it's mock data coming from the api
          ...happ,
          storage: '--'
        }))
    } else {
      console.error("hosted_happs didn't return an array")
      return []
    }
  },

  settings: async () => {
    const result = await hposAdminCall({ method: 'get', path: '/config' })()
    return presentHposSettings(result)
  },

  checkAuth: async (email, password, authToken) => {
    const keypair = await getHpAdminKeypair(email, password)
    if (keypair === null) {
      return false
    }

    // crate signature header
    const signatureHeader = {
      "X-Hpos-Admin-Signature": keypair.sign(authToken),
    }

    // there is no need to keep keypair
    eraseHpAdminKeypair()

    try {
      // Make a call to some endpoint and only in case of 200 return true
      await hposCall({
        method: 'get', path: '/config', headers: signatureHeader,
        pathPrefix: '/api/v1'
      })
    } catch (error) {
      // This will be executed if error.response.status === 401
      console.log('checkAuth failed', error)
      return false
    }

    return true
  },

  updateSettings: async ({ deviceName }) => {
    const settingsResponse = await hposAdminCall({ method: 'get', path: '/config' })()

    // Updating the config endpoint requires the hash of the current config to make sure nothing has changed.
    const headers = {
      'X-Hpos-Admin-CAS': await hashString(stringify(settingsResponse))
    }

    const settingsConfig = {
      ...settingsResponse
    }
    if (deviceName !== undefined) {
      settingsConfig.deviceName = deviceName
    }

    await hposAdminCall({ method: 'put', path: '/config', headers })(settingsConfig)
    // We don't assume the successful PUT /api/v1/config returns the current config
    return presentHposSettings(settingsConfig)
  },

  getSshAccess: async () => {
    const { enabled } = await hposAdminCall({ method: 'get', path: '/profiles/development/features/ssh' })()
    return enabled
  },

  enableSshAccess: async () => {
    const { enabled } = await hposAdminCall({ method: 'put', path: '/profiles/development/features/ssh' })()
    return enabled
  },

  disableSshAccess: async () => {
    const { enabled } = hposAdminCall({ method: 'delete', path: '/profiles/development/features/ssh' })()
    return enabled
  }
}

export default HposInterface
