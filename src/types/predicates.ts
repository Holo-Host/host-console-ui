import type { HostPreferencesResponse, Transaction } from '@/interfaces/HposInterface'
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

export function isHostPreferencesResponse(target: unknown): target is HostPreferencesResponse {
  return target !== undefined
}

export function isNumber(target: unknown): target is number {
  return typeof target === 'number'
}

export function isTransactionsArray(target: unknown): target is Transaction[] {
  return target !== undefined
}
