<script setup lang="ts">
import TheBanner from '@uicommon/components/TheBanner.vue'
import TheOverlay from '@uicommon/components/TheOverlay.vue'
import TheErrorModal from '@/components/ErrorModal.vue'
import TheLoadingModal from '@/components/LoadingModal.vue'
</script>

<template>
  <TheBanner />
  <TheOverlay />
  <TheErrorModal />
  <TheLoadingModal />
  <router-view />
</template>
