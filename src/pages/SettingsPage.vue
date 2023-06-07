<script setup lang="ts">
import { computed } from 'vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import SettingsHolofuelSection from '@/components/settings/SettingsHolofuelSection.vue'
import SettingsHoloportSection from '@/components/settings/SettingsHoloportSection.vue'
import SettingsKycSection from '@/components/settings/SettingsKycSection.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const user = computed(() => userStore)

async function onDeviceNameUpdate(deviceName: string): Promise<void> {
  await userStore.updateDeviceName(deviceName)
}
</script>

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

    <SettingsKycSection class="settings__kyc-section" />
  </PrimaryLayout>
</template>

<style lang="scss">
.settings__holofuel-section,
.settings__kyc-section {
  margin-top: 18px;
}
</style>
