import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
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
    async getHostPreferences() {
      const {
        max_fuel_before_invoice: amount,
        max_time_before_invoice: durationThreshold,
        price_compute: cpu,
        price_storage: storage,
        price_bandwidth: bandwidth
      } = await HposInterface.getHostPreferences()

      if (cpu && storage && bandwidth) {
        this.pricesSettings = {
          cpu,
          storage,
          bandwidth: 1
        }
      }

      if (amount && durationThreshold) {
        // NB: This value is not implemented in DNAs, return mock for now
        const deadline = 'N/A'

        this.invoicesSettings = {
          frequency: {
            amount,
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
