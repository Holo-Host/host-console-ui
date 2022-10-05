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
      const completedTransactions = await HposInterface.getCompletedTransactions()
      this.paidInvoices = completedTransactions
      return completedTransactions
    },

    async getUnpaidInvoices() {
      const pendingTransactions = await HposInterface.getPendingTransactions()
      this.unpaidInvoices = pendingTransactions.invoice_pending
      return pendingTransactions
    }
  }
})
