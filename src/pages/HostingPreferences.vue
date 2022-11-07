<template>
  <PrimaryLayout
    :is-content-loading="isLoading"
    :is-content-error="isError"
    :title="$t('hosting_preferences.header')"
    @try-again-clicked="getHostPreferences"
  >
    <template v-if="!isLoading && !isError">
      <PricesSection :data="pricesSettings" />

      <InvoicesSection
        :data="invoicesSettings"
        class="hosting-preferences__invoices"
      />

      <HAppSelectionSection class="hosting-preferences__happ-selection" />
    </template>
  </PrimaryLayout>
</template>

<script setup>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HAppSelectionSection from 'components/settings/hostingPreferences/HAppSelectionSection'
import InvoicesSection from 'components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from 'components/settings/hostingPreferences/PricesSection.vue'
import { ref, computed, onMounted } from 'vue'
import { usePreferencesStore } from '@/store/preferences'

const preferencesStore = usePreferencesStore()

const isLoading = ref(false)
const isError = ref(false)

const pricesSettings = computed(() => preferencesStore.pricesSettings)
const invoicesSettings = computed(() => preferencesStore.invoicesSettings)

async function getHostPreferences() {
  try {
    isError.value = false
    isLoading.value = true
    await preferencesStore.getHostPreferences()
    isLoading.value = false
  } catch (e) {
    isLoading.value = false
    isError.value = true
  }
}

onMounted(async () => {
  if (!preferencesStore.isLoaded) {
    await getHostPreferences()
  }
})
</script>

<style lang="scss" scoped>
.hosting-preferences {
  &__invoices {
    margin-top: 18px;
  }

  &__happ-selection {
    margin-top: 18px;
  }
}
</style>
