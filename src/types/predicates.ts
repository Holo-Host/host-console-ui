import type {
  HostPreferencesResponse,
  Redemption,
  Transaction
} from '@/interfaces/HposInterface'
import type { AdminSignature, CheckAuthResponse, Error, HoloFuelProfile } from '@/types/types'
import { EUserKycLevel } from '@/types/types'

export function isAdminSignature(target: CheckAuthResponse): target is AdminSignature {
  return target !== null
}

export function isError(target: Error | unknown): target is Error {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- This is the only way to check for an Error
  return (target as Error)?.error !== undefined
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

export function isRedemptionsArray(target: unknown): target is Redemption[] {
  return target !== undefined
}

export function isKycLevel(target: unknown): target is EUserKycLevel {
  return target !== undefined
}
