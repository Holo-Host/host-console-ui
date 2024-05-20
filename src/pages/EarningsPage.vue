<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EarningsCard from '@/components/earnings/EarningsCard.vue'
import RedeemableHoloFuelCard from '@/components/earnings/RedeemableHoloFuelCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { useDashboardStore } from '@/store/dashboard'
import { useUserStore } from '@/store/user'
import { isError as isErrorPredicate } from '@/types/predicates'

const dashboardStore = useDashboardStore()
const userStore = useUserStore()

const isLoading = ref(false)
const isLoadingStats = ref(false)

const isError = computed(() => !!dashboardStore.hostEarnings.error)

/* eslint-enable @typescript-eslint/no-magic-numbers */
const redeemableHoloFuel = computed((): number =>
  !isErrorPredicate(dashboardStore.hostEarnings)
    ? Number(dashboardStore.hostEarnings.holofuel.redeemable || 0)
    : 0
)

const kycLevel = computed(() => userStore.kycLevel)

async function getHoloFuelDailyStats(): Promise<void> {
  isLoadingStats.value = true
  await dashboardStore.getHoloFuelDailyStats()
  isLoadingStats.value = false
}

async function getEarnings(): Promise<void> {
  isLoading.value = true
  await dashboardStore.getEarnings()
  isLoading.value = false
}

onMounted(async (): Promise<void> => {
  await getEarnings()
  await getHoloFuelDailyStats()
})
</script>

<template>
  <PrimaryLayout
    :title="$t('$.earnings')"
    data-test-earnings-layout
  >
    <div>
      <EarningsCard
        :data="dashboardStore.earningsStats"
        :is-loading="isLoading"
        :is-loading-stats="isLoadingStats"
        :is-error="isError"
        data-test-earnings-weekly-earnings-card
        @try-again-clicked="getEarnings"
      />

      <RedeemableHoloFuelCard
        :redeemable-value="redeemableHoloFuel"
        :kyc-level="kycLevel"
        :is-loading="false"
        :is-error="false"
        data-test-earnings-redeemable-holo-fuel-card
        class="redeemable-holofuel-card"
        @try-again-clicked="getEarnings"
      />
    </div>
  </PrimaryLayout>
</template>

<style lang="scss" scoped>
.redeemable-holofuel-card {
  margin-top: 60px;
}

@media screen and (max-width: 1050px) {
  .redeemable-holofuel-card {
    margin-top: 0;
  }
}
</style>
