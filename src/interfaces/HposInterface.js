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
      // NB: the `/hosted_happs` endpoint returns happs sorted by earnings in descending order
      const result = await hposHolochainCall({
        method: 'get',
        path: '/hosted_happs',
        params: {
          duration_unit: 'WEEK',
          amount: 1,
          quantity: kTopHappsToDisplay
        }
      })

      if (Array.isArray(result)) {
        return result.filter((happ) => happ.enabled)
      } else {
        console.error("getTopHostedHapps didn't return an array")
        return []
      }
    } catch (error) {
      console.error('getTopHostedHapps encountered an error: ', error)
      return { error }
    }
  },

  getHostedHapps: async () => {
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
        return result.filter((happ) => happ.enabled)
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

  // TODO: Convert into a zome_call like for `setHostPreferences` once abstract and modularize the rust duration type for use in js
  getHostPreferences: async () => {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_preferences'
      })
    } catch (error) {
      console.error('getHostEarnings encountered an error: ', error)
      return { error }
    }
  },

  async setHostPreferences(hostPreferences) {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'core-app',
        zomeName: 'hha',
        fnName: 'set_happ_preferences',
        payload: hostPreferences
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
      const holoport = await HposInterface.getHposStatus()
      const holoFuelProfile = await HposInterface.getHoloFuelProfile()

      return { user, holoport, holoFuelProfile }
    } catch (error) {
      console.error('getUser failed', error)
      return false
    }
  },

  getHposStatus: async () => {
    try {
      // eslint-disable-next-line camelcase
      const { holo_nixpkgs, holoport } = await hposAdminCall({
        method: 'get',
        path: '/status'
      })

      return {
        networkFlavour: HposInterface.formatNetworkName(holo_nixpkgs),
        hposVersion: HposInterface.formatHposVersion(holo_nixpkgs),
        name: holoport.name
      }
    } catch (err) {
      return {}
    }
  },

  // Return devNet for channel develop, alphaNet for channel master, otherwise channel name
  formatNetworkName: (holoNixpkgs) => {
    if (holoNixpkgs && holoNixpkgs.channel && holoNixpkgs.channel.name) {
      if (holoNixpkgs.channel.name === 'master') return 'alphaNet'
      else if (holoNixpkgs.channel.name === 'develop') return 'devNet'
      else return holoNixpkgs.channel.name
    } else {
      return 'Unknown'
    }
  },

  // Return firs 7 characters of holoport's revision
  formatHposVersion: (holoNixpkgs) => {
    const strLen = 7
    return holoNixpkgs && holoNixpkgs.current_system && holoNixpkgs.current_system.rev
      ? holoNixpkgs.current_system.rev.substr(0, strLen)
      : 'Unknown'
  },

  getSettings: async () => {
    try {
      const { admin, deviceName } = await hposAdminCall({
        method: 'get',
        path: '/config'
      })
      return {
        hostPubKey: admin.public_key,
        registrationEmail: admin.email,
        deviceName:
          // eslint-disable-next-line no-magic-numbers
          deviceName || (admin.public_key && `...${admin.public_key.slice(-8)}`) || 'Your HP'
      }
    } catch (err) {
      return {}
    }
  },

  updateHoloportName: async (name) => {
    try {
      await hposAdminCall({
        method: 'put',
        path: '/holoport/name',
        params: { name }
      })
    } catch (error) {
      console.error('updateHoloportName failed: ', error)
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

  async getCompletedTransactions() {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'transactor',
        fnName: 'get_completed_transactions',
        payload: null
      }

      return await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params
      })
    } catch (error) {
      return false
    }
  },

  async getPendingTransactions() {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'transactor',
        fnName: 'get_pending_transactions',
        payload: null
      }

      return await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params
      })
    } catch (error) {
      return false
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
  }
}

export default HposInterface
