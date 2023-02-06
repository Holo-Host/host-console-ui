<template>
  <PrimaryLayout :title="$t('settings.header')">
    <SettingsHoloportSection
      :settings="user"
      @update:device-name="onDeviceNameUpdate"
    />

    <SettingsHolofuelSection
      :nickname="user.holoFuel.nickname"
      :agent-address="user.holoFuel.agentAddress"
      class="settings__holofuel-section"
    />
  </PrimaryLayout>
</template>

<script setup>
import { computed } from 'vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import SettingsHolofuelSection from '@/components/settings/SettingsHolofuelSection.vue'
import SettingsHoloportSection from '@/components/settings/SettingsHoloportSection.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const user = computed(() => userStore)

function onDeviceNameUpdate(deviceName) {
  userStore.updateDeviceName(deviceName)
}
</script>

<style lang="scss">
.settings__holofuel-section {
  margin-top: 18px;
}
</style>
