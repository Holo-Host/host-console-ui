import { defineStore } from 'pinia'
import { Earnings, Redemption, Transaction, useHposInterface } from '@/interfaces/HposInterface'
import { isRedemptionsArray, isTransactionsArray } from '@/types/predicates'
import { parseRedemption } from '@/utils/redemptions'

const { getPaidInvoices, getUnpaidInvoices, getRedemptionHistory, getHistogramData } =
  useHposInterface()

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
      const redemptions = await getRedemptionHistory()

      if (isRedemptionsArray(redemptions)) {
        // Turn an object of arrays into a single array with proper status assigned
        const flattenedRedemptions = []

        Object.entries(redemptions.redemptions).forEach(([key, value]) =>
          // status is a key an array of redemptions with that status is the value
          value.forEach((redemption) => flattenedRedemptions.push({ ...redemption, status: key }))
        )

        const parsedRedemptions = flattenedRedemptions.map((redemption) =>
          parseRedemption(redemption)
        )

        this.redemptions = parsedRedemptions
        return true
      }

      return false
    },

    async getHistogramData(): Promise<boolean> {
      const data = await getHistogramData()
      console.log(data)

      // if (isRedemptionsArray(redemptions)) {
      //   // Turn an object of arrays into a single array with proper status assigned
      //   const flattenedRedemptions = []
      //
      //   Object.entries(redemptions.redemptions).forEach(([key, value]) =>
      //     // status is a key an array of redemptions with that status is the value
      //     value.forEach((redemption) => flattenedRedemptions.push({ ...redemption, status: key }))
      //   )
      //
      //   const parsedRedemptions = flattenedRedemptions.map((redemption) =>
      //     parseRedemption(redemption)
      //   )
      //
      //   this.redemptions = parsedRedemptions
      //   return true
      // }

      return false
    }
  }
})
