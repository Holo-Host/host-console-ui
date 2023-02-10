import type { AdminSignature, CheckAuthResponse, Error } from '@/types/types'

export function isAdminSignature(target: CheckAuthResponse): target is AdminSignature {
  return target !== null
}

export function isError(error: Error | unknown): error is Error {
  return error !== undefined
}
