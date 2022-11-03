import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const useEarningsStore = defineStore('earnings', {
  state: () => ({
    earnings: {},
    paidInvoices: [],
    unpaidInvoices: []
  }),

  actions: {
    async getPaidInvoices() {
      const paidInvoices = await HposInterface.getPaidInvoices()
      this.paidInvoices = paidInvoices
      return paidInvoices
    },

    async getUnpaidInvoices() {
      const unpaidInvoices = await HposInterface.getUnpaidInvoices()
      this.unpaidInvoices = unpaidInvoices
      return unpaidInvoices
    }
  }
})
