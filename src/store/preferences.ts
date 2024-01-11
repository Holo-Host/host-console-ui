import { defineStore } from 'pinia'
import { useHposInterface, DefaultPreferencesPayload } from '@/interfaces/HposInterface'
import { isHostPreferencesResponse } from '@/types/predicates'
import type { InvoicesData, PricesData } from '@/types/types'

const { getHostPreferences, setDefaultHAppPreferences } = useHposInterface()
const kInitialPrice = 0.0001

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

      let maxTimeBeforeInvoice = Number(this.invoicesSettings.frequency.period) || 0;
      let invoiceDuePeriod = Number(this.invoicesSettings.due.period) || 0;

      const payload: DefaultPreferencesPayload = {
        max_fuel_before_invoice: `${this.invoicesSettings.frequency.amount}`,
        max_time_before_invoice: {
          secs: maxTimeBeforeInvoice * 24 * 60 * 60,
          nanos: 0
        },
        invoice_due_in_days: invoiceDuePeriod,
        price_compute: `${this.pricesSettings.cpu}`,
        price_storage: `${this.pricesSettings.storage}`,
        price_bandwidth: `${this.pricesSettings.bandwidth}`
      }

      await setDefaultHAppPreferences(payload)
    },

    setInitialPricing(): void {
      this.pricesSettings = {
        cpu: kInitialPrice,
        storage: 0,
        bandwidth: kInitialPrice
      }
    },

    clearPricing(): void {
      this.pricesSettings = {
        cpu: 0,
        storage: 0,
        bandwidth: 0
      }
    },

    updatePrice(priceSetting: string, value: number): void {
      if (priceSetting === 'cpu') {
        this.pricesSettings.cpu = value > 0 ? value : 0
      } else if (priceSetting === 'storage') {
        this.pricesSettings.storage = value > 0 ? value : 0
      } else if (priceSetting === 'bandwidth') {
        this.pricesSettings.bandwidth = value > 0 ? value : 0
      }
    },

    async getHostPreferences(): Promise<void> {
      const response = await getHostPreferences()

      if (!isHostPreferencesResponse(response)) {
        return
      }

      const {
        max_fuel_before_invoice: invoiceHolofuelThreshold,
        max_time_before_invoice: invoiceDurationThreshold,
        invoice_due_in_days: invoiceDueDays,
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

      if (invoiceDueDays && invoiceHolofuelThreshold && invoiceDurationThreshold) {
        this.invoicesSettings = {
          frequency: {
            amount: Number(invoiceHolofuelThreshold),
            period: Number(invoiceDurationThreshold.secs) / 24 / 60 / 60
          },
          due: {
            period: Number(invoiceDueDays)
          }
        }
        if (this.invoicesSettings.frequency.period === 0) {
          this.invoicesSettings.frequency.period = 'N/A'
        }
        if (this.invoicesSettings.due.period === 0) {
          this.invoicesSettings.due.period = 'N/A'
        }
      }

      this.isLoaded = true
    },
    updateInvoiceFrequency(invoiceFrequency: number | string, invoiceMaxHolofuel: number) {
      this.invoicesSettings.frequency = {
        amount: Number(invoiceMaxHolofuel),
        period: invoiceFrequency
      }
    },
    updateInvoiceDue(invoiceDueInDays: number | string) {
      this.invoicesSettings.due = {
        period: invoiceDueInDays
      }
    }
  }
})
