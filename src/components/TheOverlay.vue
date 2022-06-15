<template>
  <teleport to="body">
		<div
			v-if="isVisible"
			class="overlay-wrapper"
			:class="[
				{ 'light-theme': theme === EOverlayTheme.light },
				{ 'dark-theme': theme === EOverlayTheme.dark }
			]"
			aria-hidden="true"
			data-test-overlay-wrapper
		>
			<div
				class="overlay-content"
			>
				<CircleSpinner
					v-if="type === EOverlayType.loading"
					:theme="theme"
					:size="ESpinnerSize.xl"
				/>
				<img
					v-else
					:src="icon"
					alt="busy-overlay-icon"
					class="busy-overlay-icon"
				/>
				<p class="busy-overlay-message">
					{{ message }}
				</p>
			</div>
		</div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import CircleSpinner from './CircleSpinner.vue'
import { ESpinnerSize } from 'src/types/ui'
import { EOverlayTheme, EOverlayType } from 'src/utils/notifications'

const isVisible = ref(false)
const message = ref('')
const type = ref(EOverlayType.loading)
const icon = ref(null)
const theme = ref(EOverlayTheme.light)

// We use setTimeout to delay the showing of the overlay.
// When the overlay is hidden we must cancel the timeout.
let timeout = 0

const kMinShowTime = 750 // ms

/*
 We want the overlay to appear for at least kMinShowTime, even if it is hidden
 before then. It doesn't look good if it just flashes on screen. So we keep
 track of the time after which it can be hidden.
*/
let hideTime = 0

function show(object) {
  const delay = object?.delay ?? 0

  type.value = object?.type ?? EOverlayType.loading
  theme.value = object?.theme ?? EOverlayTheme.light
  message.value = object?.message ?? ''
  icon.value = object?.icon ?? null

  // We can hide the overlay kMinShowTime ms after it appears
  hideTime = Date.now() + delay + kMinShowTime
  timeout = window.setTimeout(() => {
    isVisible.value = true
  }, delay)
}

function hide() {
  clearTimeout(timeout)
  const timeLeft = hideTime - Date.now()

  if (timeLeft > 0) {
    setTimeout(() => {
      isVisible.value = false
    }, timeLeft)
  } else {
    isVisible.value = false
  }
}

defineExpose({
  show,
  hide
})
</script>

<style scoped>
.overlay-wrapper {
  height: 100vh;
	width: calc(100% - 270px);
	display: flex;
	justify-content: center;
	user-select: none;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	transition: opacity;
}

@media screen and (max-width: 1050px) {
	.overlay-wrapper {
		width: 100%;
		left: 0;
	}
}

.light-theme {
	background-color: rgba(255, 255, 255, 0.95);
}

.dark-theme {
	background-color: rgba(15, 23, 42, 0.3);
}

.overlay-content {
	position: absolute;
	top: 40%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px;
}

.busy-overlay-icon {
	height: 64px;
	width: 64px;
}

.busy-overlay-message {
	margin-top: 20px;
	color: #9ca3af;
	font-weight: 600;
	font-size: 1.5rem; /* 24px */
	line-height: 2rem; /* 32px */
	text-align: center;
}
</style>
