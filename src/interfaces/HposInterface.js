import axios from 'axios'
import { omitBy, isUndefined } from 'lodash/fp'
import mockHposCall from 'src/mocks/mockHposCall'
import mergeMockHappData from 'src/mergeMockHappData'
import { signPayload, hashString } from 'src/utils/keyManagement'

const MOCK_HPOS_CONNECTION = process.env.NODE_ENV === 'test'
  ? false
  : true

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const HPOS_API_URL = !process.env.VUE_APP_HPOS_URL 
  ? (window.location.protocol + '//' + window.location.hostname) 
  : process.env.VUE_APP_HPOS_URL

export function hposCall ({ method = 'get', path, apiVersion = 'v1', headers: userHeaders = {} }) {
  if (MOCK_HPOS_CONNECTION) {
    return mockHposCall(method, apiVersion, path)
  } else {
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
}

const HposInterface = {
  hostedHapps: async () => {
    const result = await hposCall({ method: 'get', path: 'hosted_happs' })()
    return result.hosted_happs.map(mergeMockHappData)
  },
  checkAuth: async () => {
    try {
      await HposInterface.hostedHapps()
    } catch (error) {
      return false
    }

    return true
  }
}

export default HposInterface
