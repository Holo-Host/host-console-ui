<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EarningsCard from '@/components/dashboard/EarningsCard.vue'
import HappsCard from '@/components/dashboard/HappsCard.vue'
import HoloFuelCard from '@/components/dashboard/HoloFuelCard.vue'
import RecentPaymentsCard from '@/components/dashboard/RecentPaymentsCard.vue'
import UsageCard from '@/components/dashboard/UsageCard.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { kRoutes } from '@/router'
import { useDashboardStore } from '@/store/dashboard'
import { isError } from '@/types/predicates'

const kPaymentsToDisplay = 3

const router = useRouter()
const dashboardStore = useDashboardStore()

const isLoadingEarnings = ref(false)
const isLoadingUsage = ref(false)
const isLoadingHostedHapps = ref(false)

const holoFuel = computed(() =>
  isError(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings
    : dashboardStore.hostEarnings.holofuel
)

const topHostedHapps = computed(() => dashboardStore.hostedHapps)

const earnings = computed(() =>
  isError(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings
    : dashboardStore.hostEarnings.earnings
)

const recentPayments = computed(() =>
  isError(dashboardStore.hostEarnings)
    ? dashboardStore.hostEarnings
    : dashboardStore.hostEarnings.recentPayments.slice(0, kPaymentsToDisplay)
)

const usage = computed(() => dashboardStore.usage)

async function getTopHostedHapps(): Promise<void> {
  isLoadingHostedHapps.value = true
  await dashboardStore.getTopHostedHapps()
  isLoadingHostedHapps.value = false
}

async function getEarnings(): Promise<void> {
  isLoadingEarnings.value = true
  await dashboardStore.getEarnings()
  isLoadingEarnings.value = false
}

async function getUsage(): Promise<void> {
  isLoadingUsage.value = true
  await dashboardStore.getUsage()
  isLoadingUsage.value = false
}

onMounted(async (): Promise<void> => {
  isLoadingEarnings.value = true
  isLoadingUsage.value = true
  isLoadingHostedHapps.value = true

  await getEarnings()
  await getUsage()
  await getTopHostedHapps()
})
</script>

<template>
  <PrimaryLayout
    :title="$t('$.dashboard')"
    data-test-dashboard-layout
  >
    <div class="row">
      <UsageCard
        :is-loading="isLoadingUsage"
        :data="usage"
        data-test-dashboard-usage-card
        @try-again-clicked="getUsage"
      />

      <HoloFuelCard
        :is-loading="isLoadingEarnings"
        :data="holoFuel"
        class="holofuel-card"
        data-test-dashboard-holo-fuel-card
        @try-again-clicked="getEarnings"
      />
    </div>

    <div class="row">
      <HappsCard
        :data="topHostedHapps"
        :is-loading="isLoadingHostedHapps"
        with-more-button
        class="happs-card"
        data-test-dashboard-happs-card
        @more-clicked="() => router.push({ name: kRoutes.happs.name })"
        @try-again-clicked="getTopHostedHapps"
      />

      <EarningsCard
        :data="earnings"
        :is-loading="isLoadingEarnings"
        with-more-button
        class="earnings-card"
        data-test-dashboard-earnings-card
        @more-clicked="() => router.push({ name: kRoutes.earnings.name })"
        @try-again-clicked="getEarnings"
      />

      <RecentPaymentsCard
        :data="recentPayments"
        :is-loading="isLoadingEarnings"
        with-more-button
        class="payments-card"
        data-test-dashboard-payments-card
        @more-clicked="() => router.push({ name: kRoutes.paidInvoices.name })"
        @try-again-clicked="getEarnings"
      />
    </div>
  </PrimaryLayout>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
}

.earnings-card {
  min-width: 250px;
  margin-left: 30px;
}

.happs-card {
  min-width: 250px;
}

.payments-card {
  min-width: 320px;
  margin-left: 30px;
}

.holofuel-card {
  margin-left: 30px;
}

@media screen and (max-width: 1050px) {
  .row {
    flex-direction: column;
    margin: 0;
  }

  .earnings-card,
  .payments-card,
  .holofuel-card {
    margin-left: 0;
  }
}
</style>
