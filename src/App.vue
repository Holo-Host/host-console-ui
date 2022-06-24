<template>
  <TheOverlay ref="theOverlay" />
  <router-view />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheOverlay from './components/TheOverlay'
import { addObserver, ENotification, removeObserver } from './utils/notifications'

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

<style>
html {
  overflow-y: scroll;
}

body,
html {
  height: 100%;
}

#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafcfe;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
