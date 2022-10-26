import { defineStore } from 'pinia'
import { useHposInterface } from '@/interfaces/HposInterface'

const { getCoreAppVersion, getUser, updateHoloFuelProfile, updateHoloportName } = useHposInterface()

export const useUserStore = defineStore('user', {
  state: () => ({
    publicKey: null,
    email: '',
    networkFlavour: '',
    sshAccess: '',
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
    async getUser() {
      const { coreAppVersion } = await getCoreAppVersion()
      const { user, holoport, holoFuelProfile } = await getUser()

      if (user && holoFuelProfile && coreAppVersion) {
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail
        this.networkFlavour = holoport.networkFlavour
        this.sshAccess = true
        this.deviceName = holoport.name
        this.hposVersion = holoport.hposVersion
        this.holoFuel = holoFuelProfile
        this.coreAppVersion = coreAppVersion
      }
    },

    async updateHoloFuelProfile({
      nickname = this.holoFuel.nickname,
      avatarUrl = this.holoFuel.avatarUrl
    }) {
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

    async updateDeviceName(name) {
      this.deviceName = name

      await updateHoloportName(name)
    }
  }
})
