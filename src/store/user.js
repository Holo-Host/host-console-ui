import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

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
      const { coreAppVersion } = await HposInterface.getCoreAppVersion()
      const { user, holoport, holoFuelProfile } = await HposInterface.getUser()

      if (user && holoFuelProfile && coreAppVersion) {
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail
        this.networkFlavour = holoport.networkFlavour
        this.sshAccess = true
        this.deviceName = user.deviceName
        this.hposVersion = holoport.hposVersion
        this.holoFuel = holoFuelProfile
        this.coreAppVersion = coreAppVersion
      }
    },

    async updateHoloFuelProfile({
      nickname = this.holoFuel.nickname,
      avatarUrl = this.holoFuel.avatarUrl
    }) {
      const isSuccess = await HposInterface.updateHoloFuelProfile({
        nickname,
        avatarUrl
      })

      if (isSuccess) {
        this.holoFuel.nickname = nickname
        this.holoFuel.avatarUrl = avatarUrl
      }

      return isSuccess
    },

    async updateDeviceName(value) {
      this.deviceName = value

      await HposInterface.updateSettings({
        deviceName: value
      })
    }
  }
})
