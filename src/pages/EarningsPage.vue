<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EarningsCard from '@/components/earnings/EarningsCard.vue'
import RedeemableHoloFuelCard from '@/components/earnings/RedeemableHoloFuelCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { useDashboardStore } from '@/store/dashboard'
import { useUserStore } from '@/store/user'
import { isError as isErrorPredicate } from '@/types/predicates'
import type { EarningsData } from '@/types/types'

const dashboardStore = useDashboardStore()
const userStore = useUserStore()

const isLoading = ref(false)
const isError = computed(() => !!dashboardStore.hostEarnings.error)

const rawWeeklyEarnings = computed((): string | number =>
  !isErrorPredicate(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings.earnings?.last7days
    : 0
)

/* eslint-disable @typescript-eslint/no-magic-numbers */
const earnings: EarningsData = {
  current: 170000,
  previous: 133000,
  daily: [
    { date: '2023-01-01', paid: 10000, unpaid: 9000 },
    { date: '2023-01-02', paid: 10000, unpaid: 3000 },
    { date: '2023-01-03', paid: 30000, unpaid: 10000 },
    { date: '2023-01-04', paid: 40000, unpaid: 4000 },
    { date: '2023-01-05', paid: 50000, unpaid: 5000 },
    { date: '2023-01-06', paid: 20000, unpaid: 2000 },
    { date: '2023-01-07', paid: 10000, unpaid: 7000 }
  ]
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

const redeemableHoloFuel = computed((): number =>
  !isErrorPredicate(dashboardStore.hostEarnings)
    ? Number(dashboardStore.hostEarnings.holofuel.redeemable || 0)
    : 0
)

const kycLevel = computed(() => userStore.kycLevel)

async function getEarnings(): Promise<void> {
  isLoading.value = true
  await dashboardStore.getEarnings()
  isLoading.value = false
}

onMounted(async (): Promise<void> => {
  if (!rawWeeklyEarnings.value || !Number(rawWeeklyEarnings.value)) {
    await getEarnings()
  }
})
</script>

<template>
  <PrimaryLayout
    :title="$t('$.earnings')"
    data-test-earnings-layout
  >
    <div>
      <EarningsCard
        :data="earnings"
        :is-loading="isLoading"
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
