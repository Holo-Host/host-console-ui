<template>
  <PrimaryLayout title="Account Settings">
    <SettingsHoloportSection
      :settings="settings"
      @update:device-name="onDeviceNameUpdate"
    />

    <SettingsHolofuelSection
      :display-name="settings.displayName"
      :public-key="settings.publicKey"
      @update:device-name="onDeviceNameUpdate"
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
