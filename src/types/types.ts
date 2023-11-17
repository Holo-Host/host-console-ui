export interface AuthHeaders {
  authToken: string
  adminSignature: string
}

export interface AdminSignature {
  adminSignature: string
}

export type CheckAuthResponse = AdminSignature | boolean | null

export interface Error {
  error: unknown
}

export interface BreadCrumb {
  label: string
  path?: string
}

export interface HoloFuelProfile {
  agentAddress: Uint8Array | null
  nickname: string
  avatarUrl: string
}

export interface PricesData {
  storage: number
  bandwidth: number
  cpu: number
}

export interface InvoicesData {
  due: {
    period: string
  }
  frequency: {
    amount: number
    period: string
  }
}

export interface HostPricing {
  host_pub_key: string
  price_compute: number
  price_storage: number
  price_bandwidth: number
}


export interface TableHeader {
  key: string
  isSortable: boolean
  isVisibleOnMobile: boolean
  label: string
  align: string
}

export enum ESortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface SortByProps {
  key: string
  direction: ESortDirection
}

export interface DashboardCardItem {
  label: string
  value: number
  isActive?: boolean
}

export enum EUserKycLevel {
  one = 'holo_kyc_1',
  two = 'holo_kyc_2'
}

export interface HoloFuelCardData {
  available: string | number
  redeemable: string | number
  kycLevel: EUserKycLevel
}