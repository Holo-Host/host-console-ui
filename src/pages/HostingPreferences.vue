<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import HAppSelectionSection from '@/components/settings/hostingPreferences/HAppSelectionSection'
import InvoicesSection from '@/components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from '@/components/settings/hostingPreferences/PricesSection.vue'
import TogglePaidHostingSection from '@/components/settings/hostingPreferences/TogglePaidHostingSection.vue'
import { usePreferencesStore } from '@/store/preferences'

const preferencesStore = usePreferencesStore()

const isLoading = ref(false)
const isError = ref(false)

const pricesSettings = computed(() => preferencesStore.pricesSettings)
const invoicesSettings = computed(() => preferencesStore.invoicesSettings)

async function getHostPreferencesAndPricing(): Promise<void> {
  try {
    isError.value = false
    isLoading.value = true
    await preferencesStore.getHostPreferencesAndPricing()
    isLoading.value = false
  } catch (e) {
    isLoading.value = false
    isError.value = true
  }
}

onMounted(async (): Promise<void> => {
  if (!preferencesStore.isLoaded) {
    await getHostPreferencesAndPricing()
  }
})
</script>

<template>
  <PrimaryLayout
    :is-content-loading="isLoading"
    :is-content-error="isError"
    :title="$t('hosting_preferences.header')"
    data-test-hosting-preferences-layout
    @try-again-clicked="getHostPreferencesAndPricing"
  >
    <template v-if="!isLoading && !isError">
      <TogglePaidHostingSection />
      <PricesSection
        :data="pricesSettings"
        class="hosting-preferences__prices"
        data-test-hosting-preferences-prices-section
      />

      <InvoicesSection
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
