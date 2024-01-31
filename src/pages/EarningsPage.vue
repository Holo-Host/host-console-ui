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
  current: 0,
  previous: 0,
  daily: []
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
