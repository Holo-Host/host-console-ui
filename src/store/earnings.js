import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useEarningsStore = defineStore('earnings', {
  state: () => ({
    earnings: {}
  }),

  actions: {
    async getCompletedTransactions() {
      this.earnings = await HposInterface.getCompletedTransactions()
    }
  }
})
