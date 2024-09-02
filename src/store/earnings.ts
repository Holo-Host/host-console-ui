import { defineStore } from 'pinia'
import { Earnings, Redemption, RedemptionHistory, Transaction, useHposInterface } from '@/interfaces/HposInterface'
import { isRedemptionsArray, isTransactionsArray } from '@/types/predicates'
import { parseRedemption } from '@/utils/redemptions'

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

    async getRedemptionHistory(): Promise<boolean> {
      const redemptions = await getRedemptionHistory() as RedemptionHistory;
      if (!isRedemptionsArray(redemptions.accepted))
        return false;
      if (!isRedemptionsArray(redemptions.completed))
        return false;
      if (!isRedemptionsArray(redemptions.declined))
        return false;
      if (!isRedemptionsArray(redemptions.pending))
        return false;

      this.redemptions = [
        ...redemptions.accepted,
        ...redemptions.completed,
        ...redemptions.declined,
        ...redemptions.pending
      ]
      return true;
    }
  }
})
