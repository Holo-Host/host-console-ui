<script setup lang="ts">
import { useModals } from '@uicommon/composables/useModals'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import RedeemHoloFuelCard from '@/components/earnings/RedeemHoloFuelCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { EModal } from '@/constants/ui'
import type { RedemptionTransaction } from '@/interfaces/HposInterface'
import router, { kRoutes } from '@/router'
import { useDashboardStore } from '@/store/dashboard'
import type { BreadCrumb } from '@/types/types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

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

interface ExtendedRedemptionTransaction extends RedemptionTransaction {
  hotAddress: string
}

async function handleRedemptionSubmitted(
  transaction: ExtendedRedemptionTransaction
): Promise<void> {
  await router.push({ name: kRoutes.earnings.name })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  showModal(EModal.redemption_initiated, {
    date: transaction.created_date,
    hfAmount: transaction.amount,
    requestId: transaction.id,
    currency: 'HOT',
    hotAddress: transaction.hotAddress,
    redemptionAmount: transaction.amount
  })
}

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
      @submitted="handleRedemptionSubmitted"
    />
  </primarylayout>
</template>
