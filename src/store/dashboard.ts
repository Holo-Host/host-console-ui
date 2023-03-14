import { defineStore } from 'pinia'
import { HApp, HostEarnings, UsageResponse, useHposInterface } from '@/interfaces/HposInterface'

const { getUsage, getTopHostedHapps, getHostEarnings } = useHposInterface()

interface State {
  usage: UsageResponse | { error: unknown }
  hostEarnings: HostEarnings | { error: unknown }
  hostedHapps: HApp[] | { error: unknown }
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): State => ({
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
    async getUsage(): Promise<void> {
      this.usage = await getUsage()
    },

    async getTopHostedHapps(): Promise<void> {
      this.hostedHapps = await getTopHostedHapps()
    },

    async getEarnings(): Promise<void> {
      this.hostEarnings = await getHostEarnings()
    }
  }
})
