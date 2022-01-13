require('dotenv').config() // this is necessary for testing. Otherwise the process.env does not get set up befoe constants are defined
import axios from 'axios'
import { omitBy, isUndefined } from 'lodash/fp'
import mergeMockHappData from 'src/mergeMockHappData'
import { signPayload, hashString } from 'src/utils/keyManagement'
import stringify from 'fast-json-stable-stringify'

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
  : (window.location.protocol + '//' + window.location.hostname)

export function hposCall ({ pathPrefix = '/api/v1', method = 'get', path, headers: userHeaders = {} }) {
  return async params => {
    const fullPath = HPOS_API_URL + pathPrefix + path

    const urlObj = new URL(fullPath)

    let bodyHash
    let signature

    if (params) {
      bodyHash = await hashString(stringify(params))
      signature = await signPayload(method, `${urlObj.pathname}?${new URLSearchParams(params).toString()}`, bodyHash)
    } else {
      signature = await signPayload(method, urlObj.pathname, bodyHash)
    }

    const headers = omitBy(isUndefined, {
      ...axiosConfig.headers,
      ...userHeaders,
      'X-Body-Hash': bodyHash,
      'X-Hpos-Admin-Signature': signature
    })

    let data

    switch (method) {
      case 'get':
        ({ data } = await axios.get(fullPath, { params, headers }))
        return data
      case 'post':
        ({ data } = await axios.post(fullPath, params, { headers }))
        return data
      case 'put':
        ({ data } = await axios.put(fullPath, params, { headers }))
        return data
      case 'delete':
        ({ data } = await axios.delete(fullPath, { params, headers }))
        return data
      default:
        throw new Error(`No case in hposCall for ${method} method`)
    }
  }
}

export function hposAdminCall (args) {
  return hposCall({
    ...args,
    pathPrefix: '/api/v1'
  })
}

export function hposHolochainCall (args) {
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
    deviceName: deviceName || 'Your HP'
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

  checkAuth: async () => {
    try {
      await HposInterface.settings()
    } catch (error) {
      console.log('checkAuth failed')
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
