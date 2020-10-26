import { isFunction } from 'lodash/fp'
import mockData from './hpos'

export default function mockHposCall (method = 'get', apiVersion = 'v1', path) {
  return function (params) {
    const fullPath = '/' + apiVersion + '/' + path
    const funcOrResult = mockData[method][fullPath]
    const result = isFunction(funcOrResult) ? funcOrResult(params) : funcOrResult
    return Promise.resolve(result)
  }
}
