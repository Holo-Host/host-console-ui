<template>
  <PrimaryLayout title="Account Settings">
    <SettingsHoloportSection
      :settings="settings"
      @update:device-name="onDeviceNameUpdate"
    />

    <SettingsHolofuelSection
      :nickname="settings.holofuel?.nickname || ''"
      :agent-key="settings.holofuel?.agentAddress || null"
      class="settings__holofuel-section"
    />
  </PrimaryLayout>
</template>

<script setup>
import { computed } from 'vue'
import PrimaryLayout from '../components/PrimaryLayout.vue'
import SettingsHolofuelSection from '../components/settings/SettingsHolofuelSection.vue'
import SettingsHoloportSection from '../components/settings/SettingsHoloportSection.vue'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

const settings = computed(() => userStore)

function onDeviceNameUpdate(deviceName) {
  userStore.updateDeviceName(deviceName)
}
</script>

<style lang="scss">
.settings__holofuel-section {
  margin-top: 18px;
}
</style>
