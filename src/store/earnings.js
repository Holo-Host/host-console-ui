import { defineStore } from 'pinia'
import { useHposInterface } from '@/interfaces/HposInterface'

const { getCompletedTransactions, getPendingTransactions } = useHposInterface()

export const useEarningsStore = defineStore('earnings', {
  state: () => ({
    earnings: {},
    paidInvoices: [],
    unpaidInvoices: []
  }),

  actions: {
    async getPaidInvoices() {
      const completedTransactions = await getCompletedTransactions()
      this.paidInvoices = completedTransactions
      return completedTransactions
    },

    async getUnpaidInvoices() {
      const pendingTransactions = await getPendingTransactions()
      this.unpaidInvoices = pendingTransactions.invoice_pending
      return pendingTransactions
    }
  }
})
