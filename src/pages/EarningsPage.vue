<script setup lang="ts">
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed, onMounted, ref } from 'vue'
import RedeemableHoloFuelCard from '@/components/earnings/RedeemableHoloFuelCard.vue'
import WeeklyEarningsCard from '@/components/earnings/WeeklyEarningsCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { useDashboardStore } from '@/store/dashboard'
import { isError as isErrorPredicate } from '@/types/predicates'

const dashboardStore = useDashboardStore()

const isLoading = ref(false)
const isError = computed(() => !!dashboardStore.hostEarnings.error)

const rawWeeklyEarnings = computed((): string | number =>
  !isErrorPredicate(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings.earnings?.last7days
    : 0
)

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
const weeklyEarnings = computed((): number => formatCurrency(Number(rawWeeklyEarnings.value)) || 0)

const redeemableHoloFuel = computed((): number =>
  !isErrorPredicate(dashboardStore.hostEarnings)
    ? Number(dashboardStore.hostEarnings.holofuel.redeemable || 0)
    : 0
)

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
      <WeeklyEarningsCard
        :data="weeklyEarnings"
        :is-loading="isLoading"
        :is-error="isError"
        data-test-earnings-weekly-earnings-card
        @try-again-clicked="getEarnings"
      />

      <RedeemableHoloFuelCard
        :data="redeemableHoloFuel"
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
