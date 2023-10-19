/* eslint-disable camelcase */
import axios from 'axios'
import { kAuthTokenLSKey, kCoreAppVersionLSKey } from '@/constants'
import kHttpStatus from '@/constants/httpStatues'
import router from '@/router'
import { isKycLevel } from '@/types/predicates'
import type { CheckAuthResponse, EUserKycLevel } from '@/types/types'
import { retry } from '@/utils/functionUtils'
import { eraseHpAdminKeypair, getHpAdminKeypair } from '@/utils/keyManagement'

interface HposInterface {
  getUsage: () => Promise<UsageResponse | { error: unknown }>
  getTopHostedHapps: () => Promise<HApp[] | { error: unknown }>
  getHostedHapps: () => Promise<HApp[] | { error: unknown }>
  getHAppDetails: (id: string) => Promise<HAppDetails | { error: unknown }>
  getHostEarnings: () => Promise<HostEarnings | { error: unknown }>
  getHostPreferences: () => Promise<HostPreferencesResponse | { error: unknown }>
  checkAuth: (email: string, password: string, authToken: string) => Promise<CheckAuthResponse>
  getUser: () => Promise<User>
  getKycLevel: () => Promise<EUserKycLevel | null>
  getHposStatus: () => Promise<HPosStatus>
  updateHoloportName: (name: string) => Promise<void>
  getHoloFuelProfile: () => unknown
  updateHoloFuelProfile: ({ nickname, avatarUrl }: UpdateHoloFuelProfilePayload) => Promise<boolean>
  getPaidInvoices: () => Promise<HposHolochainCallResponse>
  getUnpaidInvoices: () => Promise<HposHolochainCallResponse>
  getRedemptionHistory: () => Promise<HposHolochainCallResponse>
  getCoreAppVersion: () => Promise<CoreAppVersion>
  redeemHoloFuel: (payload: RedeemHoloFuelPayload) => Promise<RedemptionTransaction | boolean>
  HPOS_API_URL: string
}

interface RedeemHoloFuelPayload {
  amount: string
  note?: string
  wallet_address: string
}

export interface RedemptionTransaction {
  id: string
  amount: number
  fee: string
  completed_date: number
  created_date: number
  transaction_type: string
  counterparty: string
  direction: string
  status: string
  note?: string
  proof_of_service?: {
    redemption: string // The `eth_hash` (ie: wallet_address) will be stored here in Redemption Transactions
  }
  url?: string
  expiration_date?: number
}

interface ReserveSettings {
  reserve_id: string
  pub_key: string
  info: Record<string, string>
}

type ReserveSettingsResponse = ReserveSettings[]

export interface UpdateHoloFuelProfilePayload {
  nickname?: string
  avatarUrl?: string
}

interface HposStatusResponse {
  holo_nixpkgs: {
    channel: {
      name: string
      rev: string
    }
    current_system: {
      rev: string
    }
  }
  holoport: {
    name: string
  }
}

interface HposConfigResponse {
  admin: {
    public_key: string
    email: string
  }
  deviceName?: string
}

interface HoloFuelProfileResponse {
  agent_address: number[]
  nickname: string
  avatar_url: string
}

interface CoreAppVersionResponse {
  version: string
}

export interface HostPreferencesResponse {
  max_fuel_before_invoice: string
  max_time_before_invoice: [number, number]
  price_bandwidth: string
  price_compute: string
  price_storage: string
}

type HposHolochainCallResponse =
  | HostEarnings
  | HApp[]
  | HAppDetails
  | UsageResponse
  | HposStatusResponse
  | HoloFuelProfileResponse
  | CoreAppVersionResponse
  | Promise<Transaction[] | Redemption[] | boolean>
  | CoreAppVersion
  | HostPreferencesResponse
  | RedemptionTransaction
  | ReserveSettingsResponse
  | EUserKycLevel

type HposAdminCallResponse = HposConfigResponse

export interface UsageResponse {
  totalHostedHapps: number
  totalHostedAgents: number
  currentTotalStorage: number
  totalUsage: {
    cpu: number
    bandwidth: number
  }
}

export interface HApp {
  id: string
  name: string
  enabled: boolean
  isPaused: boolean
  sourceChains: number
  hostedAgents?: number
  storage: number
  usage: {
    bandwidth: number
    cpu: number
  }
}

export interface HAppDetails {
  id: string
  name: string
  description: string
  categories: string[]
  enabled: boolean
  isPaused: boolean
  sourceChains: number
  daysHosted: number
  earnings: {
    total: number
    last7Days: number
    averageWeekly: number
  }
  last7DaysUsage: {
    bandwidth: number
    cpu: number
    storage: number
  }
  hostingPlan: 'paid' | 'free'
}

export interface Earnings {
  last30days: number | string
  last7days: number | string
  lastday: number | string
}

export interface HostEarnings {
  earnings: Earnings
  holofuel: {
    available: number | string
    balance: number | string
    redeemable: number | string
  }
  recentPayments: unknown[]
}

interface Settings {
  hostPubKey?: string
  registrationEmail?: string
  deviceName?: string
}

interface HPosStatus {
  networkFlavour?: string
  hposVersion?: string
  name?: string
}

interface CoreAppVersion {
  coreAppVersion: string | null
}

export interface Transaction {
  id: string
  amount: string
  created_date: string
  completed_date: string
  transaction_type: Record<string, unknown>
  counterparty: string
  direction: Record<string, unknown>
  status: Record<string, unknown>
  note: string
  proof_of_service_token: string | null
  url: string | null
  expiration_date: string
}

export interface Redemption {
  id: string
  createdDate: string
  completedAmount: string
  redemptionAmount: string
  transactionId: string
  status: string
  isPartial: boolean
}

interface Error {
  response: {
    status: number
  }
}

function isError(error: Error | unknown): error is Error {
  return error !== undefined
}

function isHappArray(array: unknown): array is HApp[] {
  return Array.isArray(array)
}

function isHAppDetails(data: unknown): data is HAppDetails {
  return typeof data === 'object' && data !== null
}

interface HposCallArgs {
  pathPrefix?: string
  method: string
  path: string
  headers?: Record<string, unknown>
  params?: Record<string, unknown>
}

interface HoloFuelProfile {
  agentAddress?: Uint8Array
  nickname: string
  avatarUrl: string
}

export interface User {
  user: Settings
  holoport: HPosStatus
  holoFuelProfile: HoloFuelProfile | unknown
}

// Return devNet for channel develop, alphaNet for channel master, otherwise channel name
function formatNetworkName(holoNixpkgs: { channel: { name: string } }): string {
  if (holoNixpkgs?.channel && holoNixpkgs.channel.name) {
    if (holoNixpkgs.channel.name === 'master') return 'alphaNet'
    else if (holoNixpkgs.channel.name === 'develop') return 'devNet'
    else return holoNixpkgs.channel.name
  } else {
    return 'Unknown'
  }
}

// Return first 7 characters of holoport's revision
function formatHposVersion(holoNixpkgs: { current_system: { rev: string } }): string {
  const strLen = 7

  return holoNixpkgs?.current_system && holoNixpkgs.current_system.rev
    ? holoNixpkgs.current_system.rev.substring(0, strLen)
    : 'Unknown'
}

export function useHposInterface(): HposInterface {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }

  const kTopHappsToDisplay = 3

  // bump port number by 1 for tests, so we can run tests with the UI open
  const HPOS_PORT =
    import.meta.env.NODE_ENV === 'test'
      ? Number(import.meta.env.VITE_HPOS_PORT) + 1
      : import.meta.env.VITE_HPOS_PORT

  const HPOS_API_URL = HPOS_PORT
    ? `http://localhost:${HPOS_PORT}`
    : `${window.location.protocol}//${window.location.host}`

  async function hposCall({
    pathPrefix,
    method = 'get',
    path,
    headers: userHeaders = {},
    params
  }: HposCallArgs): Promise<HposHolochainCallResponse & HposAdminCallResponse> {
    const fullUrl = `${HPOS_API_URL}${pathPrefix}${path}`

    const authToken = localStorage.getItem(kAuthTokenLSKey)

    const headers = {
      'X-Hpos-Auth-Token': authToken,
      ...axiosConfig.headers,
      ...userHeaders
    }

    let response

    switch (method) {
    case 'get':
      response = await axios.get(fullUrl, { params, headers })
      return response.data

    case 'post':
      response = await axios.post(fullUrl, params, { headers })
      return response.data

    case 'put':
      response = await axios.put(fullUrl, params, { headers })
      return response.data

    case 'delete':
      response = await axios.delete(fullUrl, { params, headers })
      return response.data

    default:
      throw new Error(`No case in hposCall for ${method} method`)
    }
  }

  async function hposAdminCall(args: HposCallArgs): Promise<HposAdminCallResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await hposCall({
        ...args,
        pathPrefix: '/api/v1'
      })
    } catch (err) {
      if (isError(err) && err.response && err.response.status === kHttpStatus.UNAUTHORIZED) {
        localStorage.removeItem(kAuthTokenLSKey)
        await router.push('/login')
      }

      return Promise.reject(err)
    }
  }

  async function hposHolochainCall(args: HposCallArgs): Promise<HposHolochainCallResponse> {
    // On 401 redirect to login and unset authToken because the reason for 401 might be it's expired
    try {
      return await hposCall({
        ...args,
        pathPrefix: '/holochain-api/v1'
      })
    } catch (err) {
      if (isError(err) && err.response && err.response.status === kHttpStatus.UNAUTHORIZED) {
        localStorage.removeItem(kAuthTokenLSKey)
        await router.push('/login')
      }

      return Promise.reject(err)
    }
  }

  async function getUsage(): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/usage',
        params: {
          usage_interval: 1
        }
      })
    } catch (error) {
      console.error('usage encountered an error: ', error)
      return { error }
    }
  }

  async function getTopHostedHapps(): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      // NB: the `/hosted_happs` endpoint returns happs sorted by earnings in descending order
      const result = await hposHolochainCall({
        method: 'get',
        path: '/hosted_happs',
        params: {
          usage_interval: 7,
          quantity: kTopHappsToDisplay
        }
      })

      if (isHappArray(result)) {
        return result.filter((happ: HApp) => happ.enabled)
      } else {
        console.error("getTopHostedHapps didn't return an array")
        return []
      }
    } catch (error) {
      console.error('getTopHostedHapps encountered an error: ', error)
      return { error }
    }
  }

  async function getHostedHapps(): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      const result = await hposHolochainCall({
        method: 'get',
        path: '/hosted_happs',
        params: {
          usage_interval: 7
        }
      })

      if (isHappArray(result)) {
        return result.filter((happ) => happ.enabled)
      } else {
        console.error("getHostedHapps didn't return an array")
        return []
      }
    } catch (error) {
      console.error('getHostedHapps encountered an error: ', error)
      return { error }
    }
  }

  async function getHAppDetails(
    id: string
  ): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      const result = await hposHolochainCall({
        method: 'get',
        path: '/happ',
        params: {
          id
        }
      })

      if (isHAppDetails(result)) {
        return result
      } else {
        console.error("getHAppDetails didn't return a HAppDetails object")
        return { error: "getHAppDetails didn't return a HAppDetails object" }
      }
    } catch (error) {
      console.error('getHAppDetails encountered an error: ', error)
      return { error }
    }
  }

  async function getHostEarnings(): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_earnings'
      })
    } catch (error) {
      console.error('getHostEarnings encountered an error: ', error)
      return { error }
    }
  }

  async function getHostPreferences(): Promise<HposHolochainCallResponse | { error: unknown }> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_preferences'
      })
    } catch (error) {
      console.error('getHostPreferences encountered an error: ', error)
      throw error
    }
  }

  // async function setHostPreferences(hostPreferences): Promise<HposHolochainCallResponse> {
  //   try {
  //     const params: Record<string, unknown> = {
  //       appId: localStorage.getItem(kCoreAppVersionLSKey),
  //       roleId: 'core-app',
  //       zomeName: 'hha',
  //       fnName: 'set_happ_preferences',
  //       payload: hostPreferences
  //     }
  //
  //     await hposHolochainCall({
  //       method: 'post',
  //       path: '/zome_call',
  //       params
  //     })
  //
  //     return true
  //   } catch (error) {
  //     return false
  //   }
  // }

  async function checkAuth(
    email: string,
    password: string,
    authToken: string
  ): Promise<CheckAuthResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const keypair: { sign: (authToken: string) => string } = await getHpAdminKeypair(
      email,
      password
    )

    if (keypair === null) {
      return false
    }

    const adminSignature: string = keypair.sign(authToken)

    // create signature header
    const signatureHeader: Record<string, unknown> = {
      'X-Hpos-Admin-Signature': adminSignature,
      // Normally this header is auto set by hposCall using a localStorage.getItem('authToken')
      // but authToken is not recorded yet in localStorage so we have to set this header manually
      'X-Hpos-Auth-Token': authToken
    }

    // there is no need to keep keypair
    eraseHpAdminKeypair()

    try {
      await hposCall({
        method: 'get',
        path: '/config',
        headers: signatureHeader,
        pathPrefix: '/api/v1'
      })

      return { adminSignature }
    } catch (err) {
      // This will be executed if response.status === 401
      console.error('User authentication failed', err)
      return null
    }
  }

  async function getSettings(): Promise<Settings> {
    try {
      const { admin, deviceName } = await hposAdminCall({
        method: 'get',
        path: '/config'
      })
      return {
        hostPubKey: admin.public_key,
        registrationEmail: admin.email,
        deviceName:
          // eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
          deviceName || (admin.public_key && `...${admin.public_key.slice(-8)}`) || 'Your HP'
      }
    } catch (err) {
      return {}
    }
  }

  async function getHposStatus(): Promise<HPosStatus> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { holo_nixpkgs, holoport } = await hposAdminCall({
        method: 'get',
        path: '/status'
      })

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        networkFlavour: formatNetworkName(holo_nixpkgs),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        hposVersion: formatHposVersion(holo_nixpkgs),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        name: holoport.name
      }
    } catch (err) {
      return {}
    }
  }

  async function getHoloFuelProfileAttempt(): Promise<HoloFuelProfile> {
    const params = {
      appId: localStorage.getItem(kCoreAppVersionLSKey),
      roleId: 'holofuel',
      zomeName: 'profile',
      fnName: 'get_my_profile',
      payload: null
    }

    const response = await hposHolochainCall({
      method: 'post',
      path: '/zome_call',
      params
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { agent_address: agentAddress, nickname, avatar_url: avatarUrl } = response

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    return { agentAddress: Uint8Array.from(agentAddress.data), nickname, avatarUrl }
  }

  function getHoloFuelProfile(): unknown {
    const kRetries = 2
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return retry(getHoloFuelProfileAttempt, kRetries)
  }

  async function getUser(): Promise<User | boolean> {
    const user = await getSettings()
    const holoport = await getHposStatus()
    const holoFuelProfile = await getHoloFuelProfile()

    return { user, holoport, holoFuelProfile }
  }

  async function updateHoloportName(name: string): Promise<void> {
    try {
      await hposAdminCall({
        method: 'put',
        path: '/holoport/name',
        params: { name }
      })
    } catch (error) {
      console.error('updateHoloportName failed: ', error)
    }
  }

  async function updateHoloFuelProfile({
    nickname,
    avatarUrl
  }: UpdateHoloFuelProfilePayload): Promise<boolean> {
    try {
      const params = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'profile',
        fnName: 'update_my_profile',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        payload: { nickname, avatarUrl }
      }

      await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params
      })

      return true
    } catch (error) {
      return false
    }
  }

  async function getPaidInvoices(): Promise<HposHolochainCallResponse> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_invoices',
        params: { invoice_set: 'paid' }
      })
    } catch (error) {
      return false
    }
  }

  async function getUnpaidInvoices(): Promise<HposHolochainCallResponse> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/host_invoices',
        params: { invoice_set: 'unpaid' }
      })
    } catch (error) {
      return false
    }
  }

  async function getRedemptionHistory(): Promise<HposHolochainCallResponse> {
    try {
      return await hposHolochainCall({
        method: 'get',
        path: '/redemptions'
      })
    } catch (error) {
      return false
    }
  }

  async function getCoreAppVersion(): Promise<CoreAppVersion> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { version: coreAppVersion } = await hposHolochainCall({
        method: 'get',
        path: '/core_app_version'
      })

      if (typeof coreAppVersion === 'string') {
        localStorage.setItem(kCoreAppVersionLSKey, coreAppVersion)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { coreAppVersion }
    } catch (error) {
      return {
        coreAppVersion: null
      }
    }
  }

  async function getKycLevel(): Promise<EUserKycLevel | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await hposHolochainCall({
        method: 'get',
        path: '/kyc'
      })

      if (isKycLevel(data)) {
        return data
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  async function redeemHoloFuel(
    payload: RedeemHoloFuelPayload
  ): Promise<RedemptionTransaction | boolean> {
    try {
      const getReserveDetailsParams = {
        appId: localStorage.getItem(kCoreAppVersionLSKey),
        roleId: 'holofuel',
        zomeName: 'reserves',
        fnName: 'get_all_reserve_accounts_details',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        payload: null
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const reserveAccountsDetails: ReserveSettingsResponse = (await hposHolochainCall({
        method: 'post',
        path: '/zome_call',
        params: getReserveDetailsParams
      })) as ReserveSettingsResponse

      if (reserveAccountsDetails[0]) {
        const initiateRedemptionParams = {
          appId: localStorage.getItem(kCoreAppVersionLSKey),
          roleId: 'holofuel',
          zomeName: 'transactor',
          fnName: 'redeem',
          payload: {
            reserve_id: reserveAccountsDetails[0].reserve_id,
            amount: payload.amount,
            wallet_address: payload.wallet_address,
            expiration_date: Number.MAX_SAFE_INTEGER
          }
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const transaction: RedemptionTransaction = (await hposHolochainCall({
          method: 'post',
          path: '/zome_call',
          params: initiateRedemptionParams
        })) as RedemptionTransaction

        return transaction
      }

      return false
    } catch (error) {
      return false
    }
  }

  return {
    getUsage,
    getTopHostedHapps,
    getHostedHapps,
    getHostEarnings,
    checkAuth,
    getUser,
    getHposStatus,
    updateHoloportName,
    getHoloFuelProfile,
    updateHoloFuelProfile,
    getPaidInvoices,
    getUnpaidInvoices,
    getRedemptionHistory,
    getCoreAppVersion,
    getHostPreferences,
    redeemHoloFuel,
    getKycLevel,
    getHAppDetails,
    HPOS_API_URL
  }
}
/* eslint-enable camelcase */
