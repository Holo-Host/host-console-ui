<template>
  <PrimaryLayout :title="$t('$.earnings')">
    <WeeklyEarningsCard
      :data="weeklyEarnings"
      :is-loading="isLoading"
      :is-error="isError"
      @try-again-clicked="getEarnings"
    />

    <RedeemableHoloFuelCard
      :data="redeemableHoloFuel"
      :is-loading="false"
      :is-error="false"
      class="redeemable-holofuel-card"
      @try-again-clicked="getEarnings"
    />
  </PrimaryLayout>
</template>

<script setup>
import { formatCurrency } from '@uicommon/utils/numbers'
import RedeemableHoloFuelCard from 'components/earnings/RedeemableHoloFuelCard'
import WeeklyEarningsCard from 'components/earnings/WeeklyEarningsCard'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import { computed, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/store/dashboard'

const dashboardStore = useDashboardStore()

const isLoading = ref(false)

const isError = computed(() => !!dashboardStore.hostEarnings.error)

const rawWeeklyEarnings = computed(() => dashboardStore.hostEarnings.earnings?.last7days)

const weeklyEarnings = computed(() =>
  rawWeeklyEarnings.value && Number(rawWeeklyEarnings.value)
    ? formatCurrency(Number(rawWeeklyEarnings.value))
    : 0
)

const redeemableHoloFuel = computed(() => 0)

async function getEarnings() {
  isLoading.value = true
  await dashboardStore.getEarnings()
  isLoading.value = false
}

onMounted(async () => {
  if (!weeklyEarnings.value) {
    await getEarnings()
  }
})
</script>

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
