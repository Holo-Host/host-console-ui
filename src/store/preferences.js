import { defineStore } from 'pinia'
import HposInterface from 'src/interfaces/HposInterface'

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    isLoaded: false,
    priceSettings: {
      cpu: 0,
      storage: 0,
      bandwidth: 0
    },
    invoiceSettings: {
      frequency: {
        amount: 0, // in fuel type
        period: 0 // in duration days
      },
      due: {
        period: 7 // in duration days
      }
    }
  }),

  actions: {
    async getHostPreferences() {
      const {
        max_fuel_before_invoice: amount,
        max_time_before_invoice: duration_threshold, // hos-holochain-api translates duration -> days
        // max_time_before_invoice_expiration: deadline, // TODO: Add this field in SL and HF
        price_compute: cpu,
        price_storage: storage,
        price_bandwidth: bandwidth
      } = await HposInterface.getHostPreferences()

      if (cpu && storage && bandwidth) {
        this.priceSettings = {
          cpu,
          storage,
          bandwidth
        }
      }

      if (amount && duration_threshold) {
        // NB: This value is not implemented in DNAs, return mock for now
        const deadline = this.invoiceSettings.due.period

        this.invoiceSettings = {
          frequency: {
            amount,
            period: duration_threshold
          },
          due: {
            period: deadline
          }
        }
      }

      this.isLoaded = true
    },

    // FYI: This can only be set once atm (future requests will error out)
    async setHostPreferences({
      happ_id,
      priceSettings = this.priceSettings,
      invoiceSettings = this.invoiceSettings
    }) {
      const result = await HposInterface.updateHostPreferences({
        happ_id,
        max_fuel_before_invoice: invoiceSettings.frequency.amount,
        price_compute: priceSettings.cpu,
        price_storage: priceSettings.storage,
        price_bandwidth: priceSettings.bandwidth,
        max_time_before_invoice: invoiceSettings.frequency.period
        // max_time_before_invoice_expiration: invoiceSettings.due.period, // TODO: Add this field in SL and HF
      })

      if (result) {
        const {
          max_fuel_before_invoice: amount,
          max_time_before_invoice: duration_threshold, // hos-holochain-api translates duration -> days
          // max_time_before_invoice_expiration: deadline, // TODO: Add this feild in SL and HF
          price_compute: cpu,
          price_storage: storage,
          price_bandwidth: bandwidth
        } = result

        this.priceSettings = {
          cpu,
          storage,
          bandwidth
        }

        // NB: This value is not implemented in DNAs, return mock for now
        const deadline = invoiceSettings.due.period

        this.invoiceSettings = {
          frequency: {
            amount,
            period: duration_threshold
          },
          due: {
            period: deadline
          }
        }
      }

      return !!result
    }
  }
})
