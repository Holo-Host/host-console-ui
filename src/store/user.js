import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useUserStore = defineStore('user', {
  state: () => ({
    publicKey: null,
    email: '',
    networkStatus: '',
    sshAccess: '',
    deviceName: '',
    hposVersion: '',
    holoFuel: {
      agentAddress: '',
      nickname: '',
      avatarUrl: ''
    },
    coreAppVersion: ''
  }),

  actions: {
    async getUser() {
      const { user, holoFuelProfile } = await HposInterface.getUser()
      const { coreAppVersion } = await HposInterface.getCoreAppVersion()

      if (user && holoFuelProfile && coreAppVersion) {
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail
        this.networkStatus = user.networkStatus
        this.sshAccess = true
        this.deviceName = user.deviceName
        this.hposVersion = user.hposVersion
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
