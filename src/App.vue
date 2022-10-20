<template>
  <TheBanner />
  <TheOverlay />
  <router-view />
</template>

<script setup>
import TheBanner from '@uicommon/components/TheBanner.vue'
import TheOverlay from '@uicommon/components/TheOverlay.vue'
</script>
