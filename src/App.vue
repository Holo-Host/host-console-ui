<script setup lang="ts">
import TheBanner from '@uicommon/components/TheBanner.vue'
import TheOverlay from '@uicommon/components/TheOverlay.vue'
import TheErrorModal from '@/components/ErrorModal.vue'
</script>

<template>
  <TheBanner />
  <TheOverlay />
  <TheErrorModal />
  <router-view />
</template>
