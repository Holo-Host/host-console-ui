import { defineStore } from 'pinia'
import { UpdateHoloFuelProfilePayload, useHposInterface } from '@/interfaces/HposInterface'
import { isHoloFuelProfile } from '@/types/predicates'
import type { HoloFuelProfile } from '@/types/types'

const { getCoreAppVersion, getUser, updateHoloFuelProfile, updateHoloportName, getKycLevel } = useHposInterface()

interface State {
  publicKey: string | undefined
  email: string
  networkFlavour: string
  sshAccess: boolean
  deviceName: string
  hposVersion: string
  holoFuel: HoloFuelProfile
  coreAppVersion: string
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
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
    coreAppVersion: ''
  }),

  actions: {
    async getUser(): Promise<void> {
      const { coreAppVersion } = await getCoreAppVersion()
      const getUserResponse = await getUser()
      const kycLevel = await getKycLevel()

      console.log('kycLevelResponse', kycLevel)

      if (getUserResponse.user && isHoloFuelProfile(getUserResponse.holoFuelProfile)) {
        const { user, holoport, holoFuelProfile } = getUserResponse
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail ?? ''
        this.networkFlavour = holoport.networkFlavour ?? ''
        this.deviceName = holoport.name ?? ''
        this.hposVersion = holoport.hposVersion ?? ''
        this.holoFuel = holoFuelProfile
      }

      if (coreAppVersion) {
        this.coreAppVersion = coreAppVersion
      }
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
