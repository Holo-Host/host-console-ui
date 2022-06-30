<template>
  <TheOverlay ref="theOverlay" />
  <router-view />
</template>

<script setup>
import { addObserver, ENotification, removeObserver } from '@uicommon/utils/notifications'
import { ref, onMounted, onUnmounted } from 'vue'
import TheOverlay from './components/TheOverlay'

const theOverlay = ref()

function showBusyOverlay(object) {
  theOverlay.value?.show(object)
}

function hideBusyOverlay() {
  theOverlay.value?.hide()
}

onMounted(() => {
  addObserver(ENotification.showBusyState, showBusyOverlay)
  addObserver(ENotification.hideBusyState, hideBusyOverlay)
})

onUnmounted(() => {
  removeObserver(ENotification.showBusyState, showBusyOverlay)
  removeObserver(ENotification.hideBusyState, hideBusyOverlay)
})
</script>
