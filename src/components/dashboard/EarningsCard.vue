<template>
	<BaseCard title="Earnings">
		<div class="body">
			<div
				v-for="{ label, value } in items"
				:key="label"
				class="earnings-info-row"
			>
				<span class="earnings-label">{{ label }}</span>
				<span class="bold">{{ value || '--' }} HF</span>
			</div>
		</div>
	</BaseCard>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import BaseCard from 'components/BaseCard.vue'
import { formatCurrency } from "../../utils/numbers";

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

const items = computed(() => [
	{ label: 'Last 30 days', value: props.data.last30Days ? formatCurrency(props.data.last30Days) : '--' },
	{ label: 'Last 7 days', value: props.data.last7Days ? formatCurrency(props.data.last7Days) : '--' },
	{ label: 'Last day', value: props.data.lastDay ? formatCurrency(props.data.lastDay) : '--' }
])
</script>

<style scoped>
.earnings-info-row {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	line-height: 19px;
	color: #606C8B;
	margin-bottom: 20px;
	margin-right: 50px;
}
</style>
