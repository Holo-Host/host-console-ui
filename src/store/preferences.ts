import { defineStore } from 'pinia'
import { useHposInterface, DefaultPreferencesPayload } from '@/interfaces/HposInterface'
import { isHostPreferencesResponse } from '@/types/predicates'
import type { InvoicesData, PricesData } from '@/types/types'

const { getHostPreferences, setDefaultHAppPreferences } = useHposInterface()

interface State {
  isLoaded: boolean
  pricesSettings: PricesData
  invoicesSettings: InvoicesData
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): State => ({
    isLoaded: false,
    pricesSettings: {
      cpu: 0,
      storage: 0,
      bandwidth: 0
    },
    invoicesSettings: {
      frequency: {
        amount: 0, // in fuel type
        period: 'N/A' // in duration days
      },
      due: {
        period: 'N/A' // in duration days
      }
    }
  }),

  actions: {
    async setDefaultPreferences(): Promise<void> {
      const payload: DefaultPreferencesPayload = {
        max_fuel_before_invoice: `0`,
        max_time_before_invoice: [0,0],
        price_compute: `${this.pricesSettings.cpu}`,
        price_storage: `${this.pricesSettings.storage}`,
        price_bandwidth: `${this.pricesSettings.bandwidth}`
      }

      await setDefaultHAppPreferences(payload)
    },
    async getHostPreferences(): Promise<void> {
      const response = await getHostPreferences()

      if (!isHostPreferencesResponse(response)) {
        return
      }

      const {
        max_fuel_before_invoice: amount,
        max_time_before_invoice: durationThreshold,
        price_compute: cpu,
        price_storage: storage,
        price_bandwidth: bandwidth
      } = response

      if (cpu && storage && bandwidth) {
        this.pricesSettings = {
          cpu: Number(cpu),
          storage: Number(storage),
          bandwidth: Number(bandwidth)
        }
      }

      if (amount && durationThreshold) {
        // NB: This value is not implemented in DNAs, return mock for now
        const deadline = 'N/A'

        this.invoicesSettings = {
          frequency: {
            amount: Number(amount),
            period: 'N/A' // durationThreshold
          },
          due: {
            period: deadline
          }
        }
      }

      this.isLoaded = true
    }
  }
})
