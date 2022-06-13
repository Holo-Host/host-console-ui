<template>
	<BaseCard title="Recent Payments">
		<div class="body">
			<div v-if="data.length === 0">
				Currently no payments to display
			</div>

			<div
				v-for="payment in data"
				:key="payment.id"
				class="payment-row"
			>
				<div class="payment-amount">{{ payment.amount ? formatCurrency(payment.amount) : '--' }} HF</div>
				<div class="payment-details">
					<div class="">{{ payment.status ? capitalizeWord(payment.status) : '--' }}</div>
					<div class="payment-happ">{{ payment ? payment.happ : '--' }}</div>
				</div>
				<div class="payment-time">{{ payment ? dayjs(payment.updatedAt).format('DD MMM hh:mm') : '--' }}</div>
			</div>
		</div>
	</BaseCard>
</template>

<script setup>
import { defineProps } from 'vue'
import dayjs from 'dayjs'
import BaseCard from 'components/BaseCard.vue'
import { formatCurrency } from '../../utils/numbers'
import { capitalizeWord } from '../../utils/stringUtils'

const props = defineProps({
	data: {
		type: Array,
		default: () => []
	}
})
</script>

<style scoped>
.payment-row {
	display: flex;
	align-items: flex-start;
	font-size: 14px;
	line-height: 19px;
	margin-bottom: 16px;
	color: #606C8B;
}

.payment-amount {
	min-width: 128px;
	font-weight: bold;
}

.payment-details {
	min-width: 72px;
}

.payment-happ {
	font-style: italic;
	font-size: 12px;
	line-height: 16px;
}

.payment-time {
	font-size: 9px;
	line-height: 12px;
	margin-top: 4px;
}
</style>
