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
import { usePreferencesStore } from '@/store/preferences'
import { reactive } from 'vue'

const preferencesStore = usePreferencesStore()

const invoicesSettings = reactive({
  frequency: {
    amount: 100,
    period: 7
  },
  due: {
    period: 7
  },
  ...rawInvoicesSettings
})

const pricesSettings = reactive({
  cpu: 100,
  storage: 100,
  bandwidth: 100,
  ...rawPricesSettings
})

const rawPricesSettings = computed(() => preferencesStore.pricesSettings)

const rawInvoicesSettings = computed(() => preferencesStore.invoicesSettings)

function updateFrequency(value) {
  invoicesSettings.frequency = value
}

function updateDue(value) {
  invoicesSettings.due = value
}

function updatePrice({ prop, value }) {
  pricesSettings[prop] = value
}

// NOTE: This can currently only be called only once - ensure all values are present before invoking
function setHostSettings () {
  if (isError.value) {
    isError.value = false
  }

  isLoading.value = true

  const isSuccess = await preferencesStore.updateHoloFuelProfile({ 
    invoicesSettings: this.pricesSettings,
    pricesSettings: this.pricesSettings
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
  if (!(invoicesSettings.value && pricesSettings) ) {
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
