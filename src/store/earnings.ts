import { defineStore } from 'pinia'
import { Earnings, Redemption, Transaction, useHposInterface } from '@/interfaces/HposInterface'
import { isRedemptionsArray, isTransactionsArray } from '@/types/predicates'

const { getPaidInvoices, getUnpaidInvoices, getRedemptionHistory } = useHposInterface()

interface State {
  earnings: Earnings
  paidInvoices: Transaction[]
  unpaidInvoices: Transaction[]
  redemptions: Redemption[]
}

export const useEarningsStore = defineStore('earnings', {
  state: (): State => ({
    earnings: {
      last7days: 0,
      last30days: 0,
      lastday: 0
    },
    paidInvoices: [],
    unpaidInvoices: [],
    redemptions: []
  }),

  actions: {
    async getPaidInvoices(): Promise<Transaction[]> {
      const paidInvoices = await getPaidInvoices()

      if (isTransactionsArray(paidInvoices)) {
        this.paidInvoices = paidInvoices
        return paidInvoices
      }

      return []
    },

    async getUnpaidInvoices(): Promise<Transaction[]> {
      const unpaidInvoices = await getUnpaidInvoices()

      if (isTransactionsArray(unpaidInvoices)) {
        this.unpaidInvoices = unpaidInvoices
        return unpaidInvoices
      }

      return []
    },

    async getRedemptionHistory(): Promise<Redemption[]> {
      const redemptions = await getRedemptionHistory()

      if (isRedemptionsArray(redemptions)) {
        this.redemptions = redemptions
        return redemptions
      }

      return []
    }
  }
})
