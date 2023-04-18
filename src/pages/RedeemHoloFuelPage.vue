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

const redeemableHoloFuel = computed(() =>
  isError(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings
    : dashboardStore.hostEarnings.holofuel.redeemable
)

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
      :data="redeemableHoloFuel"
    />
  </primarylayout>
</template>
