<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import HAppSelectionSection from '@/components/settings/hostingPreferences/HAppSelectionSection'
import InvoicesSection from '@/components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from '@/components/settings/hostingPreferences/PricesSection.vue'
import TogglePaidHostingSection from '@/components/settings/hostingPreferences/TogglePaidHostingSection.vue'
import { usePreferencesStore } from '@/store/preferences'
import { useHposInterface } from '@/interfaces/HposInterface'
import type { UpdatePricePayload } from '@/types/types'

const preferencesStore = usePreferencesStore()

const isLoading = ref(false)
const isError = ref(false)
const isPaidHostingEnabled = ref(false)

const pricesSettings = computed(() => preferencesStore.pricesSettings)
const invoicesSettings = computed(() => preferencesStore.invoicesSettings)

async function getHostPreferences(): Promise<void> {
  try {
    isError.value = false
    isLoading.value = true
    await preferencesStore.getHostPreferences()
    isLoading.value = false
    isPaidHostingEnabled.value = 
      preferencesStore.pricesSettings.bandwidth > 0 ||
      preferencesStore.pricesSettings.storage > 0 ||
      preferencesStore.pricesSettings.cpu > 0
  } catch (e) {
    isLoading.value = false
    isError.value = true
  }
}

async function setDefaultHostPreferences(): Promise<void> {
  try {
    isError.value = false
    isLoading.value = true
    await preferencesStore.setDefaultPreferences()
    await getHostPreferences()
    isLoading.value = false
  } catch (e) {
    isLoading.value = false
    isError.value = true
  }
}

onMounted(async (): Promise<void> => {
  if (!preferencesStore.isLoaded) {
    await getHostPreferences()
  }
})

async function updatePrice({ prop, value }: UpdatePricePayload): Promise<void> {
  await preferencesStore.updatePrice(prop, value)
  await preferencesStore.setDefaultPreferences()
  await getHostPreferences()
}

function onTogglePaidHosting(isToggledOn: boolean): void {
  isPaidHostingEnabled.value = isToggledOn
  if (isToggledOn) {
    preferencesStore.setInitialPricing()
  } else {
    preferencesStore.clearPricing()
  }

  setDefaultHostPreferences()
}

</script>

<template>
  <PrimaryLayout
    :is-content-loading="isLoading"
    :is-content-error="isError"
    :title="$t('hosting_preferences.header')"
    data-test-hosting-preferences-layout
    @try-again-clicked="getHostPreferences"
  >
    <template v-if="!isLoading && !isError">
      <TogglePaidHostingSection
        :paidHostingEnabled="isPaidHostingEnabled"
        @paid_hosting_toggled="onTogglePaidHosting"
        data-test-toggle-paid-hosting-section
      />    
      <PricesSection
        v-if="isPaidHostingEnabled"
        :data="pricesSettings"
        data-test-hosting-preferences-prices-section
        class="hosting-preferences__prices"
        @update:price="updatePrice"
      />

      <InvoicesSection
        v-if="isPaidHostingEnabled"
        :data="invoicesSettings"
        class="hosting-preferences__invoices"
        data-test-hosting-preferences-invoices-section
      />

      <HAppSelectionSection
        class="hosting-preferences__happ-selection"
        data-test-hosting-preferences-happ-selection-section
      />
    </template>
  </PrimaryLayout>
</template>

<style lang="scss" scoped>
.hosting-preferences {
  &__prices {
    margin-top: 18px;
  }

  &__invoices {
    margin-top: 18px;
  }

  &__happ-selection {
    margin-top: 18px;
  }
}
</style>
