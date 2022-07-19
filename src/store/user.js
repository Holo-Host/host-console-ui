import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useUserStore = defineStore('user', {
  state: () => ({
    publicKey: null,
    email: '',
    networkStatus: '',
    sshAccess: '',
    deviceName: '',
    displayName: '',
    hposVersion: ''
  }),

  actions: {
    async getUser() {
      const user = await HposInterface.settings()

      // Mocked until we have holofuel API running here
      const displayName = ''

      if (user) {
        this.publicKey = user.hostPubKey
        this.email = user.registrationEmail
        this.networkStatus = user.networkStatus
        this.sshAccess = user.sshAccess
        this.deviceName = user.deviceName
        this.hposVersion = user.hposVersion
        this.displayName = displayName
      }
    },

    updateDisplayName(value) {
      // TODO: API call to save the displayName in holofuel
      this.displayName = value
    }
  }
})
