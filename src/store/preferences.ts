import { defineStore } from 'pinia'
import {
  DefaultPreferencesPayload,
  useHposInterface
} from '@/interfaces/HposInterface'
import { isHostPreferencesResponse } from '@/types/predicates'
import type { HostingJurisdictions, InvoicesData, PricesData } from '@/types/types'
import { ECriteriaType } from '@/types/types'

const {
  getHostPreferences,
  setDefaultHAppPreferences,
} = useHposInterface()

const kInitialPrice = 0.0001

interface State {
  isLoaded: boolean
  pricesSettings: PricesData
  invoicesSettings: InvoicesData
  hostingJurisdictions: HostingJurisdictions
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
        amount: 0,
        period: 7
      },
      due: {
        period: 7
      }
    },
    hostingJurisdictions: {
      value: [],
      criteriaType: ECriteriaType.exclude,
      timestamp: 0
    }
  }),

  actions: {
    async setDefaultPreferences(): Promise<void> {
      const maxTimeBeforeInvoice = Number(this.invoicesSettings.frequency.period) || 7
      const invoiceDuePeriod = Number(this.invoicesSettings.due.period) || 7

      const payload: DefaultPreferencesPayload = {
        max_fuel_before_invoice: `${this.invoicesSettings.frequency.amount}`,
        max_time_before_invoice: {
          secs: maxTimeBeforeInvoice * 24 * 60 * 60,
          nanos: 0
        },
        invoice_due_in_days: invoiceDuePeriod,
        price_compute: `${this.pricesSettings.cpu}`,
        price_storage: `${this.pricesSettings.storage}`,
        price_bandwidth: `${this.pricesSettings.bandwidth}`,
        jurisdictions: this.hostingJurisdictions.value,
        exclude_jurisdictions: this.hostingJurisdictions.criteriaType === ECriteriaType.exclude,
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

    updateHostingJurisdiction(jurisdiction: {
      criteria_type: ECriteriaType
      value: string[],
    }): void {
      this.hostingJurisdictions.value = jurisdiction.value;
      this.hostingJurisdictions.criteriaType = jurisdiction.criteria_type;
    },

    async getHostPreferences(): Promise<void> {
      const response = await getHostPreferences()

      if (
        !isHostPreferencesResponse(response)
      ) {
        // If the request failed, update the timestamp to trigger a re-render of the selects
        this.hostingJurisdictions.timestamp = Date.now()
        return
      }

      this.hostingJurisdictions = {
        value: response.jurisdictions,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        criteriaType: response.exclude_jurisdictions
          ? ECriteriaType.exclude
          : ECriteriaType.include,
        timestamp: response.timestamp
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

      this.invoicesSettings = {
        frequency: {
          amount: Number(invoiceHolofuelThreshold) || 0,
          period: Number(invoiceDurationThreshold.secs) / 24 / 60 / 60 || 7
        },
        due: {
          period: Number(invoiceDueDays) || 7
        }
      }

      this.isLoaded = true
    },

    updateInvoiceFrequency(invoiceFrequency: number, invoiceMaxHolofuel: number) {
      this.invoicesSettings.frequency = {
        amount: invoiceMaxHolofuel,
        period: invoiceFrequency
      }
    },

    updateInvoiceDue(invoiceDueInDays: number) {
      this.invoicesSettings.due = {
        period: invoiceDueInDays
      }
    },
  }
})
