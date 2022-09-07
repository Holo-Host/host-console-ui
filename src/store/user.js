import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'
import { eraseHpAdminKeypair, getHpAdminKeypair } from '../utils/keyManagement'

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
    }
  }),

  actions: {
    async getUser(email, password) {
      const { user, holoFuelProfile } = await HposInterface.getUser(email, password)

      if (user && holoFuelProfile) {
        this.publicKey = user.public_key
        this.email = user.email
        this.networkStatus = user.networkStatus
        this.sshAccess = true
        this.deviceName = user.deviceName
        this.hposVersion = user.hposVersion
        this.holoFuel = holoFuelProfile
      }
    },

    async login(email, password) {
      eraseHpAdminKeypair()

      await getHpAdminKeypair(email, password)
      const { user, holoFuelProfile } = await HposInterface.getUser(email, password)

      if (user && holoFuelProfile) {
        this.publicKey = user.public_key
        this.email = user.email
        this.networkStatus = user.networkStatus
        this.sshAccess = true
        this.deviceName = user.deviceName
        this.hposVersion = user.hposVersion
        this.holoFuel = holoFuelProfile

        return true
      } else {
        return false
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
