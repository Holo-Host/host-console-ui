import { defineStore } from 'pinia'
import { useHposInterface } from '@/interfaces/HposInterface'

const { getPaidInvoices, getUnpaidInvoices } = useHposInterface()

export const useEarningsStore = defineStore('earnings', {
  state: () => ({
    earnings: {},
    paidInvoices: [],
    unpaidInvoices: []
  }),

  actions: {
    async getPaidInvoices() {
      const paidInvoices = await getPaidInvoices()
      this.paidInvoices = paidInvoices
      return paidInvoices
    },

    async getUnpaidInvoices() {
      const unpaidInvoices = await getUnpaidInvoices()
      this.unpaidInvoices = unpaidInvoices
      return unpaidInvoices
    }
  }
})
