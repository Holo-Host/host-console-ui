import { defineStore } from 'pinia'
import { Earnings, Transactions, useHposInterface } from '@/interfaces/HposInterface'
import { isTransactionsArray } from '@/types/predicates'

const { getPaidInvoices, getUnpaidInvoices } = useHposInterface()

interface State {
  earnings: Earnings
  paidInvoices: Transactions[]
  unpaidInvoices: Transactions[]
}

export const useEarningsStore = defineStore('earnings', {
  state: (): State => ({
    earnings: {
      last7days: 0,
      last30days: 0,
      lastday: 0
    },
    paidInvoices: [],
    unpaidInvoices: []
  }),

  actions: {
    async getPaidInvoices(): Promise<Transactions[]> {
      const paidInvoices = await getPaidInvoices()

      if (isTransactionsArray(paidInvoices)) {
        this.paidInvoices = paidInvoices
        return paidInvoices
      }

      return []
    },

    async getUnpaidInvoices(): Promise<Transactions[]> {
      const unpaidInvoices = await getUnpaidInvoices()

      if (isTransactionsArray(unpaidInvoices)) {
        this.unpaidInvoices = unpaidInvoices
        return unpaidInvoices
      }

      return []
    }
  }
})
