<template>
  <PrimaryLayout :title="$t('settings.header')">
    <SettingsHoloportSection
      :settings="user"
      @update:device-name="onDeviceNameUpdate"
    />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import SettingsHoloportSection from '@/components/settings/SettingsHoloportSection.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const user = computed(() => userStore)

async function onDeviceNameUpdate(deviceName: string): Promise<void> {
  await userStore.updateDeviceName(deviceName)
}
</script>

<style lang="scss">
.settings__holofuel-section {
  margin-top: 18px;
}
</style>
