import { useModals } from '@uicommon/composables/useModals.js'
import { defineStore } from 'pinia'
import { EModal } from '@/constants/ui'
import { UpdateHoloFuelProfilePayload, useHposInterface } from '@/interfaces/HposInterface'
import { isHoloFuelProfile } from '@/types/predicates'
import type { HoloFuelProfile } from '@/types/types'
import { EUserKycLevel } from '@/types/types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

const { getCoreAppVersion, getUser, updateHoloFuelProfile, updateHoloportName, getKycLevel } =
  useHposInterface()

interface State {
  holoportId: string | undefined,
  publicKey: string | undefined
  email: string
  networkFlavour: string
  sshAccess: boolean
  deviceName: string
  hposVersion: string
  holoFuel: HoloFuelProfile
  coreAppVersion: string
  kycLevel: EUserKycLevel
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    holoportId: undefined,
    publicKey: undefined,
    email: '',
    networkFlavour: '',
    sshAccess: true,
    deviceName: '',
    hposVersion: '',
    holoFuel: {
      agentAddress: null,
      nickname: '',
      avatarUrl: ''
    },
    coreAppVersion: '',
    kycLevel: EUserKycLevel.one
  }),

  actions: {
    async getUser(): Promise<void> {
      const { coreAppVersion } = await getCoreAppVersion()
      const getUserResponse = await getUser()
      const kycLevel = await getKycLevel()

      if (getUserResponse.user && isHoloFuelProfile(getUserResponse.holoFuelProfile)) {
        const { user, holoport, holoFuelProfile } = getUserResponse
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail ?? ''
        this.networkFlavour = holoport.networkFlavour ?? ''
        this.deviceName = holoport.name ?? ''
        this.hposVersion = holoport.hposVersion ?? ''
        this.holoFuel = holoFuelProfile
      }

      if (kycLevel) {
        this.kycLevel = kycLevel
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        showModal(EModal.error_modal)
      }

      if (coreAppVersion) {
        this.coreAppVersion = coreAppVersion
      }

      const hostUrl = window.location.host;
      this.holoportId = hostUrl.split(".")[0]
    },

    async updateHoloFuelProfile({
      nickname = this.holoFuel.nickname,
      avatarUrl = this.holoFuel.avatarUrl
    }: UpdateHoloFuelProfilePayload): Promise<boolean> {
      const isSuccess = await updateHoloFuelProfile({
        nickname,
        avatarUrl
      })

      if (isSuccess) {
        this.holoFuel.nickname = nickname
        this.holoFuel.avatarUrl = avatarUrl
      }

      return isSuccess
    },

    async updateDeviceName(name: string): Promise<void> {
      this.deviceName = name

      await updateHoloportName(name)
    }
  }
})
