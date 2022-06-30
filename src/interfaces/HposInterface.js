// this is necessary for testing.
// Otherwise the process.env does not get set up before constants are defined.
import axios from 'axios'
import stringify from 'fast-json-stable-stringify'
import mergeMockHappData from 'src/mergeMockHappData'
import { signRequest, hashString } from 'src/utils/keyManagement'
require('dotenv').config()

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

// bump port number by 1 for tests so we can run tests with the UI open
const HPOS_PORT =
  process.env.NODE_ENV === 'test'
    ? Number(process.env.VUE_APP_HPOS_PORT) + 1
    : process.env.VUE_APP_HPOS_PORT

export const HPOS_API_URL = HPOS_PORT
  ? `http://localhost:${HPOS_PORT}`
  : `${window.location.protocol}//${window.location.host}`

function hposCall({ pathPrefix, method = 'get', path, headers: userHeaders = {} }) {
  return async (params) => {
    const fullUrl = HPOS_API_URL + pathPrefix + path

    const signature = await signRequest(method, fullUrl, params)
    const headers = {
      ...axiosConfig.headers,
      ...userHeaders,
      'X-Hpos-Admin-Signature': signature
    }

    let response

    switch (method) {
      case 'get':
        response = await axios.get(fullUrl, { params, headers })
        return response?.data

      case 'post':
        response = await axios.post(fullUrl, params, { headers })
        return response?.data

      case 'put':
        response = await axios.put(fullUrl, params, { headers })
        return response?.data

      case 'delete':
        response = await axios.delete(fullUrl, { params, headers })
        return response?.data

      default:
        throw new Error(`No case in hposCall for ${method} method`)
    }
  }
}

export function hposAdminCall(args) {
  return hposCall({
    ...args,
    pathPrefix: '/api/v1'
  })
}

export function hposHolochainCall(args) {
  return hposCall({
    ...args,
    pathPrefix: '/holochain-api/v1'
  })
}

const presentHposSettings = (hposSettings) => {
  const { admin, holoportos = {}, deviceName } = hposSettings
  return {
    hostPubKey: admin.public_key,
    registrationEmail: admin.email,
    networkStatus: holoportos.network || 'test', // ie: 'live'
    sshAccess: holoportos.sshAccess || false,
    // eslint-disable-next-line no-magic-numbers
    deviceName: deviceName || (admin.public_key && admin.public_key.slice(-8)) || 'Your HP'
  }
}

const HposInterface = {
  dashboard: () => {
    return hposHolochainCall({ method: 'get', path: '/dashboard' })({
      duration_unit: 'DAY',
      amount: 1
    })
  },

  hostedHapps: async () => {
    const result = await hposHolochainCall({ method: 'get', path: '/hosted_happs' })({
      duration_unit: 'WEEK',
      amount: 1
    })

    if (Array.isArray(result)) {
      return result
        .filter((happ) => happ.enabled)
        .map(mergeMockHappData)
        .map((happ) => ({
          // currently hiding storage value from the UI as it's mock data coming from the api
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

  checkAuth: async () => {
    try {
      await HposInterface.settings()
    } catch (error) {
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
    const { enabled } = await hposAdminCall({
      method: 'get',
      path: '/profiles/development/features/ssh'
    })()
    return enabled
  },

  enableSshAccess: async () => {
    const { enabled } = await hposAdminCall({
      method: 'put',
      path: '/profiles/development/features/ssh'
    })()
    return enabled
  },

  disableSshAccess: async () => {
    const { enabled } = await hposAdminCall({
      method: 'delete',
      path: '/profiles/development/features/ssh'
    })()
    return enabled
  }
}

export default HposInterface
