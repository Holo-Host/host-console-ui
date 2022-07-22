<template>
  <SettingsSection :title="$t('$.holofuel')">
    <SettingsRow
      :label="$t('settings.account_display_name')"
      :value="displayName"
    />

    <SettingsRow
      :label="$t('settings.holofuel_address')"
    >
      <HoloFuelAddress :public-key="publicKey" />
    </SettingsRow>
  </SettingsSection>
</template>

<script setup >
import HoloFuelAddress from './HoloFuelAddress.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'

defineProps({
  displayName: {
    type: String,
    required: true
  },

  publicKey: {
    type: String,
    required: true
  }
})
</script>
