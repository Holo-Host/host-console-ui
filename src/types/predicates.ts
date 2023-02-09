import type { AdminSignature, CheckAuthResponse } from '@/types/types'

export function isAdminSignature(target: CheckAuthResponse): target is AdminSignature {
  return target !== null
}
