<template>
  <PrimaryLayout title="Dashboard">
    <div class="row">
      <UsageCard
        :is-loading="isLoadingUsage"
        :data="usage"
      />

      <HoloFuelCard
        :is-loading="isLoadingEarnings"
        :data="holoFuel"
      />
    </div>

    <div class="row">
      <HappsCard
        :data="topHostedHapps"
        :is-loading="isLoadingHostedHapps"
        with-more-button
        @more-clicked="() => {}"
      />

      <EarningsCard
        :data="earnings"
        :is-loading="isLoadingEarnings"
        with-more-button
        @more-clicked="() => {}"
      />

      <RecentPaymentsCard
        :data="recentPayments"
        :is-loading="isLoadingEarnings"
        with-more-button
        @more-clicked="() => {}"
      />
    </div>
  </PrimaryLayout>
</template>

<script setup>
import EarningsCard from 'components/dashboard/EarningsCard.vue'
import HappsCard from 'components/dashboard/HappsCard.vue'
import HoloFuelCard from 'components/dashboard/HoloFuelCard.vue'
import RecentPaymentsCard from 'components/dashboard/RecentPaymentsCard.vue'
import UsageCard from 'components/dashboard/UsageCard.vue'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import { useDashboardStore } from 'src/store/dashboard'
import { computed, onMounted, ref } from 'vue'

const kTopHappsToDisplay = 3

const dashboardStore = useDashboardStore()

const isLoadingEarnings = ref(false)
const isLoadingUsage = ref(false)
const isLoadingHostedHapps = ref(false)

const holoFuel = computed(() => dashboardStore.hostEarnings.holofuel)
const topHostedHapps = computed(() => dashboardStore.hostedHapps.slice(0, kTopHappsToDisplay))
const earnings = computed(() => dashboardStore.hostEarnings.earnings)
const recentPayments = computed(() => dashboardStore.hostEarnings.recentPayments)
const usage = computed(() => dashboardStore.usage)

onMounted(async () => {
  isLoadingEarnings.value = true
  isLoadingUsage.value = true
  isLoadingHostedHapps.value = true

  await dashboardStore.getEarnings()
  isLoadingEarnings.value = false

  await dashboardStore.getUsage()
  isLoadingUsage.value = false

  await dashboardStore.getHostedHapps()
  isLoadingHostedHapps.value = false
})
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
}

@media screen and (max-width: 1050px) {
  .row {
    flex-direction: column;
    margin: 0;
  }
}
</style>
