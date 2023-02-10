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
