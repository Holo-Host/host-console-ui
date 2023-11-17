import { defineStore } from 'pinia'
import { useHposInterface } from '@/interfaces/HposInterface'
import { isHostPreferencesResponse } from '@/types/predicates'
import type { InvoicesData, PricesData, HostPricing } from '@/types/types'
import { isError } from '@/types/predicates'

const { getHostPreferences, getHosts, getHapps } = useHposInterface()

interface State {
  isLoaded: boolean
  pricesSettings: PricesData
  invoicesSettings: InvoicesData
  holoportPricing: HostPricing[]
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
    },
    holoportPricing: []
  }),

  actions: {
    async getHostPreferencesAndPricing(): Promise<void> {
      await Promise.all([
        await this.getHostPreferences(),
        await this.getHostPricing()
      ])

      this.isLoaded = true
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
    },
    async getHostPricing(): Promise<void> {
        const CORE_APP_IDENTIFIER = 'core-app'

        // 1. Get a list of all hApps and find hApp where the special installed hApp id set
        const all_hApps = await getHapps()
        if( isError(all_hApps) ) {
          throw all_hApps
        }

        const hApp_with_special_installed_app_id = all_hApps.find(
          hApp => hApp.special_installed_app_id !== null &&
          hApp.special_installed_app_id?.indexOf('core-app') !== -1
        )

        if( !hApp_with_special_installed_app_id ) {
          this.holoportPricing = []
          throw new Error(`Could not fetch holoport pricing information: no core-app found`)
        }
        
        // 2. Get all hosts from HPOS using the hApp Id of the hApp w/ core-app special installed hApp id
        const all_hosts = await getHosts(hApp_with_special_installed_app_id.id)
        if( isError(all_hosts) ) {
          throw all_hosts
        }

        const holoportPricing = all_hosts.map(host => {
          return {
            host_pub_key: host.host_pub_key,
            price_compute: host.preferences.price_compute,
            price_storage: host.preferences.price_storage,
            price_bandwidth: host.preferences.price_bandwidth
          }
        })
        
        this.holoportPricing = holoportPricing        
    }
  }
})
