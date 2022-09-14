<template>
  <SettingsSection :title="$t('$.holofuel')">
    <SettingsRow
      :label="$t('settings.account_display_name')"
      :value="nickname"
    />

    <SettingsRow
      :label="$t('settings.holofuel_address')"
    >
      <HoloFuelAddress
        v-if="agentAddress"
        :agent-address="agentAddress"
      />
    </SettingsRow>
  </SettingsSection>
</template>

<script setup >
import HoloFuelAddress from './HoloFuelAddress.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'

defineProps({
  nickname: {
    type: String,
    required: true
  },

  agentAddress: {
    type: [Uint8Array, null],
    default: null
  }
})
</script>
