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
