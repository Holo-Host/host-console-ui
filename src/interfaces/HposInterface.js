require('dotenv').config() // this is necessary for testing. Otherwise the process.env does not get set up befoe constants are defined
import axios from 'axios'
import mergeMockHappData from 'src/mergeMockHappData'
import { hashString } from 'src/utils/keyManagement'
import { getHpAdminKeypair, eraseHpAdminKeypair } from 'src/utils/keyManagement'
import stringify from 'fast-json-stable-stringify'
import router from 'src/router'

const CORE_APP_ID = 'core-app:0_3_1_alpha0::7f83bac1-fb97-4e0d-98d6-7888ef616de3'

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

async function hposCall ({ pathPrefix, method = 'get', path, headers: userHeaders = {}, params }) {
  const fullUrl = HPOS_API_URL + pathPrefix + path

  const authToken = localStorage.getItem('authToken')

  const headers = {
    'X-Hpos-Auth-Token': authToken,
    ...axiosConfig.headers,
    ...userHeaders,
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

const hposAdminCall = async (args) => {
  // On 401 redirect to login and unset authToken because the reason for 401 might be it's expired
  try {
    return await hposCall({
      ...args,
      pathPrefix: '/api/v1'
    })
  } catch (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('authToken')
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
      localStorage.removeItem('authToken')
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
  usage: async () => {
    try {
      const usageData = await hposHolochainCall({
        method: 'get',
        path: '/usage' ,
        params: {
          duration_unit: 'DAY',
          amount: 1
        }
      })
      return usageData
    } catch (err) {
      console.error("usage encountered an error: ", err)
      return {}
    }
  },

  hostedHapps: async () => {
    try {
      const result = await hposHolochainCall({
        method: 'get',
        path: '/hosted_happs',
        params: {
          duration_unit: "WEEK",
          amount: 1
        }
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
    } catch (err) {
      return []
    }
  },

  settings: async () => {
    try {
      const result = await hposAdminCall({ method: 'get', path: '/config' })
      return presentHposSettings(result)
    } catch (err) {
      return {}
    }
  },

  checkAuth: async (email, password, authToken) => {
    const keypair = await getHpAdminKeypair(email, password)
    if (keypair === null) {
      return false
    }

    // crate signature header
    const signatureHeader = {
      "X-Hpos-Admin-Signature": keypair.sign(authToken),
      // Normally this header is auto set by hposCall using a localStorage.getItem('authToken')
      // but authToken is not recorded yet in localStorage so we have to set this header manually
      'X-Hpos-Auth-Token': authToken
    }

    // there is no need to keep keypair
    eraseHpAdminKeypair()

    try {
      // Make a call to some endpoint and only in case of 200 return true
     let res = await hposCall({
        method: 'get', path: '/config', headers: signatureHeader,
        pathPrefix: '/api/v1'
      })
    } catch (err) {
      // This will be executed if response.status === 401
      console.log('User authentication failed', err)
      return false
    }

    return true
  },

  getUser: async () => {
    try {
      const user = await HposInterface.settings()
      const holoFuelProfile = await HposInterface.getHoloFuelProfile()

      return { user, holoFuelProfile }
    } catch (error) {
      console.error('getUser failed', error)
      return false
    }
  },

  updateSettings: async ({ deviceName }) => {
    try {
      const settingsResponse = await hposAdminCall({ method: 'get', path: '/config' })

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

      await hposAdminCall({ method: 'put', path: '/config', headers, params: settingsConfig })
      // We don't assume the successful PUT /api/v1/config returns the current config
      return presentHposSettings(settingsConfig)
    } catch (err) {
      return {}
    }
  },

  getHoloFuelProfile: async () => {
    const {
      agent_address: agentAddress,
      nickname,
      avatar_url: avatarUrl
    } = await hposHolochainCall({
      method: 'post',
      path: '/zome_call'
    })({
      appId: CORE_APP_ID,
      roleId: 'holofuel',
      zomeName: 'profile',
      fnName: 'get_my_profile',
      payload: null
    })

    return { agentAddress: Uint8Array.from(agentAddress.data), nickname, avatarUrl }
  },

  async updateHoloFuelProfile({ nickname, avatarUrl }) {
    try {
      await hposHolochainCall({
        method: 'post',
        path: '/zome_call'
      })({
        appId: CORE_APP_ID,
        roleId: 'holofuel',
        zomeName: 'profile',
        fnName: 'update_my_profile',
        payload: { nickname, avatarUrl }
      })

      return true
    } catch (error) {
      return false
    }
  },

  getSshAccess: async () => {
    try {
      const { enabled } = await hposAdminCall({ method: 'get', path: '/profiles/development/features/ssh' })
      return enabled
    } catch (err) {
      return null
    }
  },

  enableSshAccess: async () => {
    try {
      const { enabled } = await hposAdminCall({ method: 'put', path: '/profiles/development/features/ssh' })
      return enabled
    } catch (err) {
      return null
    }
  },

  disableSshAccess: async () => {
    try {
      const { enabled } = hposAdminCall({ method: 'delete', path: '/profiles/development/features/ssh' })
      return enabled
    } catch (err) {
      return null
    }
  }
}

export default HposInterface
