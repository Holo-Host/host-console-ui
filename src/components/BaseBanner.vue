<template>
	<Transition>
		<div
			class="banner"
			:class="[type]"
			@click.stop
		>
			<ExclamationTriangleIcon class="banner__icon" />
			<div class="banner__content">
				<span class="banner__content-title">{{ message }}</span>

				<div class="banner__slot-content">
					<slot />
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
	type: {
		type: String,
		default: 'error',
		validator(value) {
			return ['error', 'warning', 'success'].includes(value)
		}
	},
	message: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss" scoped>
.banner {
	width: 100%;
	display: flex;
	align-self: center;
	color: white;
	border-radius: 20px;

	&__icon {
		flex-shrink: 0;
		width: 19px;
		margin-left: 16px;
	}

	&.error {
		background-color: var(--red-light-color);
		color: var(--red-color);
	}

	&.warning {
		background-color: var(--yellow-light-color);
		color: var(--grey-dark-color);
	}

	&.success {
		background-color: var(--green-color);
	}

	&__content {
		display: flex;
		align-items: start;
		padding: 16px;
		flex-direction: column;
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 19px;
		text-align: left;

		&-title {
			font-weight: 800;
		}
	}

	&__slot-content {
		margin-top: 8px;
	}
}
</style>
