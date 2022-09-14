import axios from 'axios'
import stringify from 'fast-json-stable-stringify'
import router from 'src/router'
import { eraseHpAdminKeypair, getHpAdminKeypair, hashString } from 'src/utils/keyManagement'
import { kAuthTokenLSKey, kCoreAppVersionLSKey } from '@/constants'

require('dotenv').config()

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const kTopHappsToDisplay = 3

// bump port number by 1 for tests so we can run tests with the UI open
const HPOS_PORT =
  process.env.NODE_ENV === 'test'
    ? Number(process.env.VUE_APP_HPOS_PORT) + 1
    : process.env.VUE_APP_HPOS_PORT

export const HPOS_API_URL = HPOS_PORT
  ? `http://localhost:${HPOS_PORT}`
  : `${window.location.protocol}//${window.location.host}`

async function hposCall({ pathPrefix, method = 'get', path, headers: userHeaders = {}, params }) {
  const fullUrl = HPOS_API_URL + pathPrefix + path

  const authToken = localStorage.getItem(kAuthTokenLSKey)

  const headers = {
    'X-Hpos-Auth-Token': authToken,
    ...axiosConfig.headers,
    ...userHeaders
  }

  let response

  switch (method) {
    case 'get':
      response = await axios.get(fullUrl, { params, headers })
      return response.data
    case 'post':
      response = await axios.post(fullUrl, params, { headers })
      return response.data
    case 'put':
      response = await axios.put(fullUrl, params, { headers })
      return response.data
    case 'delete':
      response = await axios.delete(fullUrl, { params, headers })
      return response.data
    default:
      throw new Error(`No case in hposCall for ${method} method`)
  }
}

const hposAdminCall = async (args) => {
  try {
    return await hposCall({
      ...args,
      pathPrefix: '/api/v1'
    })
  } catch (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem(kAuthTokenLSKey)
      router.push('/login')
    }
    return Promise.reject(err)
  }
}

const hposHolochainCall = async (args) => {
  // On 401 redirect to login and unset authToken because the reason for 401 might be it's expired
  try {
    return await hposCall({
      ...args,
      pathPrefix: '/holochain-api/v1'
    })
  } catch (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem(kAuthTokenLSKey)
      router.push('/login')
    }
    return Promise.reject(err)
  }
}

const presentHposSettings = (hposSettings) => {
  const { admin, holoportOs = {}, deviceName } = hposSettings
  return {
    hostPubKey: admin.public_key,
    registrationEmail: admin.email,
    networkStatus: holoportOs.network, // ie: 'live'
    sshAccess: holoportOs.sshAccess || false,
    hposVersion: holoportOs.hposVersion,
    // eslint-disable-next-line no-magic-numbers
    deviceName: deviceName || (admin.public_key && `...${admin.public_key.slice(-8)}`) || 'Your HP'
  }
}

const HposInterface = {
  getUsage: async () => {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/usage',
        params: {
          duration_unit: 'DAY',
          amount: 1
        }
      })
    } catch (error) {
      console.error('usage encountered an error: ', error)
      return { error }
    }
  },

  getTopHostedHapps: async () => {
    try {
      const result = await hposHolochainCall({
        method: 'get',
        path: '/hosted_happs',
        params: {
          duration_unit: 'WEEK',
          amount: 1
        }
      })

      if (Array.isArray(result)) {
        return result
          .filter((happ) => happ.enabled)
          .sort((a, b) => b.sourceChains - a.sourceChains)
          .slice(0, kTopHappsToDisplay)
      } else {
        console.error("getHostedHapps didn't return an array")
        return []
      }
    } catch (error) {
      console.error('getHostedHapps encountered an error: ', error)
      return { error }
    }
  },

  getHostEarnings: async () => {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_earnings'
      })
    } catch (error) {
      console.error('getHostEarnings encountered an error: ', error)
      return { error }
    }
  },

  checkAuth: async (email, password, authToken) => {
    const keypair = await getHpAdminKeypair(email, password)

    if (keypair === null) {
      return false
    }

    const adminSignature = keypair.sign(authToken)

    // create signature header
    const signatureHeader = {
      'X-Hpos-Admin-Signature': adminSignature,
      // Normally this header is auto set by hposCall using a localStorage.getItem('authToken')
      // but authToken is not recorded yet in localStorage so we have to set this header manually
      'X-Hpos-Auth-Token': authToken
    }

    // there is no need to keep keypair
    eraseHpAdminKeypair()

    try {
      // Make a call to some endpoint and only in case of 200 return true
      await hposCall({
        method: 'get',
        path: '/config',
        headers: signatureHeader,
        pathPrefix: '/api/v1'
      })

      return { adminSignature }
    } catch (err) {
      // This will be executed if response.status === 401
      console.log('User authentication failed', err)
      return null
    }
  },

  getUser: async () => {
    try {
      const user = await HposInterface.getSettings()
      const holoFuelProfile = await HposInterface.getHoloFuelProfile()

      return { user, holoFuelProfile }
    } catch (error) {
      console.error('getUser failed', error)
      return false
    }
  },

  getSettings: async () => {
    try {
      const result = await hposAdminCall({
        method: 'get',
        path: '/config'
      })

      return presentHposSettings(result)
    } catch (err) {
      return {}
    }
  },

  updateSettings: async ({ deviceName }) => {
    try {
      const settingsResponse = await hposAdminCall({
        method: 'get',
        path: '/config'
      })

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

      await hposAdminCall({
        method: 'put',
        path: '/config',
        headers,
        params: settingsConfig
      })
      // We don't assume the successful PUT /api/v1/config returns the current config
      return presentHposSettings(settingsConfig)
    } catch (err) {
      return {}
    }
  },

  getHoloFuelProfile: async () => {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'profile',
        fnName: 'get_my_profile',
        payload: null
      }

      const {
        agent_address: agentAddress,
        nickname,
        avatar_url: avatarUrl
      } = await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params
      })

      return { agentAddress: Uint8Array.from(agentAddress.data), nickname, avatarUrl }
    } catch (error) {
      return {
        nickname: null,
        avatarUrl: null
      }
    }
  },

  getCoreAppVersion: async () => {
    try {
      const { version: coreAppVersion } = await hposHolochainCall({
        method: 'get',
        path: '/core_app_version'
      })

      localStorage.setItem(kCoreAppVersionLSKey, coreAppVersion)

      return { coreAppVersion }
    } catch (error) {
      return {
        coreAppVersion: null
      }
    }
  },

  async updateHoloFuelProfile({ nickname, avatarUrl }) {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'profile',
        fnName: 'update_my_profile',
        payload: { nickname, avatarUrl }
      }

      await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params
      })

      return true
    } catch (error) {
      return false
    }
  },

  getSshAccess: async () => {
    try {
      const { enabled } = await hposAdminCall({
        method: 'get',
        path: '/profiles/development/features/ssh'
      })
      return enabled
    } catch (err) {
      return null
    }
  },

  enableSshAccess: async () => {
    try {
      const { enabled } = await hposAdminCall({
        method: 'put',
        path: '/profiles/development/features/ssh'
      })
      return enabled
    } catch (err) {
      return null
    }
  },

  disableSshAccess: async () => {
    try {
      const { enabled } = hposAdminCall({
        method: 'delete',
        path: '/profiles/development/features/ssh'
      })
      return enabled
    } catch (err) {
      return null
    }
  }
}

export default HposInterface
