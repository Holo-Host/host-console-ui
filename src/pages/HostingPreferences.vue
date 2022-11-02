<template>
  <PrimaryLayout :title="$t('hosting_preferences.header')">
    <PricesSection
      :data="pricesSettings"
      @update:price="updatePrice"
    />

    <InvoicesSection
      :data="invoicesSettings"
      class="hosting-preferences__invoices"
      @update:frequency="updateFrequency"
      @update:due="updateDue"
    />

    <HAppSelectionSection class="hosting-preferences__happ-selection" />
  </PrimaryLayout>
</template>

<script setup>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HAppSelectionSection from 'components/settings/hostingPreferences/HAppSelectionSection'
import InvoicesSection from 'components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from 'components/settings/hostingPreferences/PricesSection.vue'
import { reactive, ref, computed, onMounted } from 'vue'
import { usePreferencesStore } from '@/store/preferences'

const preferencesStore = usePreferencesStore()

const isLoading = ref(false)
const isError = ref(false)

const localInvoicesSettings = reactive({
  frequency: {
    amount: 0,
    period: 0
  },
  due: {
    period: 0
  }
})

const localPricesSettings = reactive({
  cpu: 0,
  storage: 0,
  bandwidth: 0
})

function updateFrequency(value) {
  localInvoicesSettings.frequency = value
}

function updateDue(value) {
  localInvoicesSettings.due = value
}

function updatePrice({ prop, value }) {
  localPricesSettings[prop] = value
}

const pricesSettings = computed(() => ({
  ...localPricesSettings,
  ...preferencesStore.pricesSettings
}))

const invoicesSettings = computed(() => ({
  ...localInvoicesSettings,
  ...preferencesStore.invoicesSettings
}))

// NOTE: This can currently only be called only once - ensure all values are present before invoking
async function setHostSettings() {
  if (isError.value) {
    isError.value = false
  }

  isLoading.value = true

  const isSuccess = await preferencesStore.updateHoloFuelProfile({
    invoicesSettings,
    pricesSettings
  })

  isLoading.value = false

  if (!isSuccess) {
    isError.value = true
  }
}

async function getHostPreferences() {
  isLoading.value = true
  await preferencesStore.getHostPreferences()
  isLoading.value = false
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
