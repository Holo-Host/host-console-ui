<template>
  <PrimaryLayout title="Dashboard">
		<div v-if="!isLoading" class="row">
			<UsageCard :data="data.dashboardData.usage" />
			<HoloFuelCard :data="data.dashboardData.holofuel" />
    </div>

    <div v-if="!isLoading" class="row">
      <HappsCard
				:data="topHostedHapps"
				with-more-button
				@more-clicked="() => {}"
			/>

			<EarningsCard
				:data="data.dashboardData.earnings"
				with-more-button
				@more-clicked="() => {}"
			/>

			<RecentPaymentsCard
				:data="data.dashboardData.recentPayments"
				with-more-button
				@more-clicked="() => {}"
			/>
		</div>
  </PrimaryLayout>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HoloFuelCard from 'components/dashboard/HoloFuelCard.vue'
import UsageCard from 'components/dashboard/UsageCard.vue'
import HappsCard from 'components/dashboard/HappsCard.vue'
import EarningsCard from 'components/dashboard/EarningsCard.vue';
import RecentPaymentsCard from 'components/dashboard/RecentPaymentsCard.vue';
import HposInterface from 'src/interfaces/HposInterface'

const topHostedHapps = [
  {
    id: 1,
    name: "HoloFuel"
  },
  {
    id: 2,
    name: "HC-Wiki"
  },
  {
    id: 3,
    name: "SF GeoChat"
  }
]

const isLoading = ref(false)

const data = reactive({
	dashboardData: {
		usage: {},
		holofuel: {},
		earnings: {},
		recentPayments: []
	},
	topHostedHapps
})

onMounted(async() => {
	isLoading.value = true
	data.dashboardData = await HposInterface.dashboard()
	isLoading.value = false
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
