<template>
  <TheBanner ref="theBanner" />
  <TheOverlay />
  <router-view />
</template>

<script setup>
import TheBanner from '@uicommon/components/TheBanner.vue'
import TheOverlay from '@uicommon/components/TheOverlay.vue'
import { addObserver, ENotification, removeObserver } from '@uicommon/utils/notifications'
import { ref, onMounted, onUnmounted } from 'vue'

const theBanner = ref()

function showBanner(object) {
  theBanner.value?.show(object)
}

function hideBanner() {
  theBanner.value?.hide()
}

onMounted(() => {
  addObserver(ENotification.showBanner, showBanner)
  addObserver(ENotification.hideBanner, hideBanner)
})

onUnmounted(() => {
  removeObserver(ENotification.showBanner, showBanner)
  removeObserver(ENotification.hideBanner, hideBanner)
})
</script>
