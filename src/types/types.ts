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

export interface UpdatePricePayload {
  prop: string
  value: number
}

export enum EHostingPlan {
  free = 'free',
  paid = 'paid'
}

export interface MappedHApp {
  id: string
  name: string
  icon: string
  hostingPlan: string
}

export interface UpdateHAppPlanProps {
  id: string
  value: EHostingPlan
}
