import { defineStore } from 'pinia'
import { useHposInterface } from '@/interfaces/HposInterface'

const { getUsage, getTopHostedHapps, getHostEarnings } = useHposInterface()

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
      holofuel: { balance: '0', available: '0' },
      recentPayments: []
    },
    hostedHapps: []
  }),

  actions: {
    async getUsage() {
      this.usage = await getUsage()
    },

    async getTopHostedHapps() {
      this.hostedHapps = await getTopHostedHapps()
    },

    async getEarnings() {
      this.hostEarnings = await getHostEarnings()
    }
  }
})
