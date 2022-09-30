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
      this.paidInvoices = await HposInterface.getCompletedTransactions()
    },

    async getUnpaidInvoices() {
      const pendingTransactions = await HposInterface.getPendingTransactions()

      this.unpaidInvoices = pendingTransactions.invoice_pending
    }
  }
})
