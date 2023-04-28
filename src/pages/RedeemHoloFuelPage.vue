<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import RedeemHoloFuelCard from '@/components/earnings/RedeemHoloFuelCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { useDashboardStore } from '@/store/dashboard'
import { isError } from '@/types/predicates'
import type { BreadCrumb } from '@/types/types'

const { t } = useI18n()

const isLoading = ref(false)

const dashboardStore = useDashboardStore()

const breadcrumbs = computed((): BreadCrumb[] => [
  {
    label: t('$.earnings'),
    path: '/earnings'
  },
  {
    label: t('earnings.redeem_holofuel')
  }
])

async function getRedeemableHoloFuel(): Promise<void> {
  isLoading.value = true
  await dashboardStore.getEarnings()
  isLoading.value = false
}

const redeemableHoloFuel = computed(() => {
  if (isError(dashboardStore.hostEarnings)) {
    return dashboardStore.hostEarnings
  }

  return dashboardStore.hostEarnings.holofuel.redeemable || '0'
})

onMounted(async (): Promise<void> => {
  await getRedeemableHoloFuel()
})
</script>

<template>
  <PrimaryLayout
    title="earnings.redemption_history"
    :breadcrumbs="breadcrumbs"
  >
    <RedeemHoloFuelCard
      :is-loading="isLoading"
      :redeemable-holo-fuel="redeemableHoloFuel"
    />
  </primarylayout>
</template>
