<template>
  <PrimaryLayout title="Account Settings">
    <SettingsHoloportSection
      :settings="settings"
    />
  </PrimaryLayout>
</template>

<script setup>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import SettingsHoloportSection from 'components/SettingsHoloportSection'
import { useUserStore } from 'src/store/user'
import { computed } from 'vue'

const userStore = useUserStore()

const settings = computed(() => userStore)
</script>
