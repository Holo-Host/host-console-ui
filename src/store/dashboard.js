import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    usage: {
      totalHostedHapps: 0,
      totalHostedAgents: 0,
      currentTotalStorage: 0,
      totalUsage: {
        cpu: 0,
        bandwidth: 0
      }
    },
    hostEarnings: {
      earnings: { last30days: '0', last7days: '0', lastday: '0' },
      holofuel: { balance: '0' },
      recentPayments: []
    },
    hostedHapps: []
  }),

  actions: {
    async getUsage() {
      this.usage = await HposInterface.getUsage()
    },

    async getTopHostedHapps() {
      this.hostedHapps = await HposInterface.getTopHostedHapps()
    },

    async getEarnings() {
      this.hostEarnings = await HposInterface.getHostEarnings()
    }
  }
})
