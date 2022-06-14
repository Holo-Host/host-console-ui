<template>
	<BaseCard title="Top Hosted hApps">
		<div class="body grayed-out">
			<div v-if="!data || data.length === 0">Currently no hApps to display</div>
			<div v-for="happ in data" class="top-happ-row" :key="happ.id">
				<div class='logo'><MissingLogoExIcon class='ex-icon' /></div>
				<div class='top-happ-details'>
					<div class="card-info-row grayed-out">{{ happ.name }}</div>
					<div class="card-info-row margin-bottom grayed-out">-- HF</div>
				</div>
			</div>
		</div>
	</BaseCard>
</template>

<script setup>
import BaseCard from 'components/BaseCard.vue'
import MissingLogoExIcon from 'components/icons/MissingLogoExIcon'

defineProps({
	data: {
		type: Object,
		required: true
	}
})
</script>

<style scoped>
.top-happ-row {
	display: flex;
	margin-bottom: 4px;
}

.right-arrow-icon {
	margin-top: 2px;
}

.margin-bottom {
	margin-bottom: 10px;
}

.grayed-out {
	color: rgba(96, 108, 139, 0.18);
}

.logo {
	border: 1px solid #E7E9ED;
	box-sizing: border-box;
	border-radius: 5px;
	width: 37px;
	height: 37px;
	margin: 0 16px;
}
</style>
