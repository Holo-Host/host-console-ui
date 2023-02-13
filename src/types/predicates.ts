import type { AdminSignature, CheckAuthResponse, Error, HoloFuelProfile } from '@/types/types'

export function isAdminSignature(target: CheckAuthResponse): target is AdminSignature {
  return target !== null
}

export function isError(error: Error | unknown): error is Error {
  return error !== undefined
}

export function isHoloFuelProfile(target: unknown): target is HoloFuelProfile {
  return target !== null
}

export function isNumber(target: unknown): target is number {
  return typeof target === 'number'
}
