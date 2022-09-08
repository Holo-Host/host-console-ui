import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    usage: {
      totalHostedHapps: 0,
      totalSourceChains: 0,
      currentTotalStorage: 0,
      totalUsage: {
        cpu: 0,
        bandwidth: 0
      }
    },
    hostEarnings: {},
    hostedHapps: []
  }),

  actions: {
    async getUsage() {
      this.usage = await HposInterface.getUsage()
    },

    async getHostedHapps() {
      this.hostedHapps = await HposInterface.getHostedHapps()
    },

    async getEarnings() {
      this.hostEarnings = await HposInterface.getHostEarnings()
    }
  }
})
