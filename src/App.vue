<template>
  <TheBanner ref="theBanner" />
  <TheOverlay ref="theOverlay" />
  <router-view />
</template>

<script setup>
import TheBanner from '@uicommon/components/TheBanner.vue'
import TheOverlay from '@uicommon/components/TheOverlay.vue'
import { addObserver, ENotification, removeObserver } from '@uicommon/utils/notifications'
import { ref, onMounted, onUnmounted } from 'vue'

const theOverlay = ref()
const theBanner = ref()

function showBusyOverlay(object) {
  theOverlay.value?.show(object)
}

function hideBusyOverlay() {
  theOverlay.value?.hide()
}

function showBanner(object) {
  theBanner.value?.show(object)
}

function hideBanner() {
  theBanner.value?.hide()
}

onMounted(async() => {
  addObserver(ENotification.showBusyState, showBusyOverlay)
  addObserver(ENotification.hideBusyState, hideBusyOverlay)

  addObserver(ENotification.showBanner, showBanner)
  addObserver(ENotification.hideBanner, hideBanner)
})

onUnmounted(() => {
  removeObserver(ENotification.showBusyState, showBusyOverlay)
  removeObserver(ENotification.hideBusyState, hideBusyOverlay)

  removeObserver(ENotification.showBanner, showBanner)
  removeObserver(ENotification.hideBanner, hideBanner)
})
</script>
