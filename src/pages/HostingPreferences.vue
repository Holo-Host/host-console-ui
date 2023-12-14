<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import GlobalHostingPlanModal from '@/components/modals/GlobalHostingPlanModal.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import HAppSelectionSection from '@/components/settings/hostingPreferences/HAppSelectionSection'
import InvoicesSection from '@/components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from '@/components/settings/hostingPreferences/PricesSection.vue'
import TogglePaidHostingSection from '@/components/settings/hostingPreferences/TogglePaidHostingSection.vue'
import { usePreferencesStore } from '@/store/preferences'
import { useUserStore } from '@/store/user'
import type { UpdatePricePayload } from '@/types/types'
import { EHostingPlan, EUserKycLevel } from '@/types/types'

const preferencesStore = usePreferencesStore()
const userStore = useUserStore()

const isLoading = ref(false)
const isUpdating = ref(false)
const isError = ref(false)
const isPaidHostingEnabled = ref(userStore.kycLevel !== EUserKycLevel.two)

const pricesSettings = computed(() => preferencesStore.pricesSettings)
const invoicesSettings = computed(() => preferencesStore.invoicesSettings)

const isModalVisible = ref(false)

function openModal(): void {
  isModalVisible.value = true
}

function closeModal(): void {
  isModalVisible.value = false
}

function cancelWizard(): void {
  isPaidHostingEnabled.value = !isPaidHostingEnabled.value
  closeModal()
}

async function getHostPreferences(): Promise<void> {
  try {
    isError.value = false

    if (preferencesStore.isLoaded) {
      isUpdating.value = true
      await preferencesStore.getHostPreferences()
      isUpdating.value = false
      isPaidHostingEnabled.value =
        preferencesStore.pricesSettings.bandwidth > 0 ||
        preferencesStore.pricesSettings.storage > 0 ||
        preferencesStore.pricesSettings.cpu > 0
    } else {
      isLoading.value = true
      await preferencesStore.getHostPreferences()
      isLoading.value = false
      isPaidHostingEnabled.value =
        preferencesStore.pricesSettings.bandwidth > 0 ||
        preferencesStore.pricesSettings.storage > 0 ||
        preferencesStore.pricesSettings.cpu > 0
    }
  } catch (e) {
    isLoading.value = false
    isError.value = true
  }
}

async function setDefaultHostPreferences(): Promise<void> {
  try {
    isError.value = false
    isUpdating.value = true
    await preferencesStore.setDefaultPreferences()
    await getHostPreferences()
    isUpdating.value = false
  } catch (e) {
    isUpdating.value = false
    isError.value = true
  }
}

onMounted(async (): Promise<void> => {
  await getHostPreferences()
})

async function updatePrice({ prop, value }: UpdatePricePayload): Promise<void> {
  preferencesStore.updatePrice(prop, value)
  await setDefaultHostPreferences()
}

function onTogglePaidHosting(isToggledOn: boolean): void {
  isPaidHostingEnabled.value = isToggledOn

  openModal()

  // if (isToggledOn) {
  //   preferencesStore.setInitialPricing()
  // } else {
  //   preferencesStore.clearPricing()
  // }
  //
  // await setDefaultHostPreferences()
}

function updateHostingPlan(): void {
  closeModal()
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
        :is-loading="isUpdating"
        :paid-hosting-enabled="isPaidHostingEnabled"
        data-test-toggle-paid-hosting-section
        @paid-hosting-toggled="onTogglePaidHosting"
      />

      <PricesSection
        v-if="isPaidHostingEnabled"
        :is-loading="isUpdating"
        :data="pricesSettings"
        data-test-hosting-preferences-prices-section
        class="hosting-preferences__prices"
        @update:price="updatePrice"
      />

      <InvoicesSection
        v-if="isPaidHostingEnabled"
        :is-loading="isUpdating"
        :data="invoicesSettings"
        class="hosting-preferences__invoices"
        data-test-hosting-preferences-invoices-section
      />

      <HAppSelectionSection
        class="hosting-preferences__happ-selection"
        data-test-hosting-preferences-happ-selection-section
      />

      <GlobalHostingPlanModal
        :key="isPaidHostingEnabled"
        :plan-value="isPaidHostingEnabled ? EHostingPlan.paid : EHostingPlan.free"
        :is-visible="isModalVisible"
        @close="closeModal"
        @cancel="cancelWizard"
        @update:hosting-plan="updateHostingPlan"
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
