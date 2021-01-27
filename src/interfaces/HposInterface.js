require('dotenv').config() // this is necessary for testing. Otherwise the process.env does not get set up befoe constants are defined
import axios from 'axios'
import { omitBy, isUndefined } from 'lodash/fp'
import mockHposCall from 'src/mocks/mockHposCall'
import mergeMockHappData from 'src/mergeMockHappData'
import { signPayload, hashString } from 'src/utils/keyManagement'
import stringify from 'fast-json-stable-stringify'

// const MOCK_HPOS_CONNECTION = process.env.NODE_ENV === 'test'
//   ? false
//   : true

const MOCK_HPOS_CONNECTION = false

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

// bump port number by 1 for tests so you can run tests with the UI open
const HPOS_PORT = process.env.NODE_ENV === 'test' ? Number(process.env.VUE_APP_HPOS_PORT) + 1 : process.env.VUE_APP_HPOS_PORT

export const HPOS_API_URL = HPOS_PORT
  ? `http://localhost:${HPOS_PORT}`
  : (window.location.protocol + '//' + window.location.hostname) 

export function hposCall ({ method = 'get', path, apiVersion = 'v1', headers: userHeaders = {} }) {
  return async params => {
    const fullPath = HPOS_API_URL + '/api/' + apiVersion + '/' + path

    const urlObj = new URL(fullPath)

    let bodyHash

    if (params) {
      bodyHash = await hashString(stringify(params))
    }

    const signature = await signPayload(method, urlObj.pathname, bodyHash)

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

const presentHposSettings = (hposSettings) => {
  const { admin, holoportos = {}, name } = hposSettings
  return {
    hostPubKey: admin.public_key,
    registrationEmail: admin.email,
    networkStatus: holoportos.network || 'test', // ie: 'live'
    sshAccess: holoportos.sshAccess || false,
    deviceName: name || 'Your HP'
  }
}

const HposInterface = {
  hostedHapps: async () => {
    const result = await hposCall({ method: 'get', path: 'hosted_happs' })()
    return result.hosted_happs.map(mergeMockHappData)
  },

  settings: async () => {
    const result = await hposCall({ method: 'get', path: 'config' })()
    return presentHposSettings(result)
  },

  checkAuth: async () => {
    try {
      await HposInterface.hostedHapps()
    } catch (error) {
      return false
    }

    return true
  },

  updateSettings: async ({ hostPubKey, deviceName, sshAccess }) => {
    const settingsResponse = await hposCall({ method: 'get', path: 'config' })()

    // Updating the config endpoint requires the hash of the current config to make sure nothing has changed.
    const headers = {
      'X-Hpos-Admin-CAS': await hashString(stringify(settingsResponse))
    }

    // settingsConfig must contain .admin.{email,public_key}, but may contain other arbitrary
    // data.
    const settingsConfig = {
      ...settingsResponse
    }
    if (hostPubKey !== undefined) {
      settingsConfig.admin.public_key = hostPubKey
    }
    if (deviceName !== undefined) {
      settingsConfig.name = deviceName
    }
    if (sshAccess !== undefined) {
      settingsConfig.holoportos = {
        sshAccess: sshAccess
      }
    }

    await hposCall({ method: 'put', path: 'config', headers })(settingsConfig)
    // We don't assume the successful PUT /api/v1/config returns the current config
    return presentHposSettings(settingsConfig)
  },
}

export default HposInterface
