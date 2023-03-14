<template>
  <SettingsSection :title="$t('$.holofuel')">
    <SettingsRow
      :label="$t('settings.account_display_name')"
      :value="props.nickname"
    />

    <SettingsRow
      :label="$t('settings.holofuel_address')"
    >
      <HoloFuelAddress
        v-if="props.agentAddress"
        :agent-address="props.agentAddress"
      />
    </SettingsRow>
  </SettingsSection>
</template>

<script setup lang="ts">
import HoloFuelAddress from './HoloFuelAddress.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'

const props = withDefaults(
  defineProps<{
    nickname: string
    agentAddress?: Uint8Array | null
  }>(),
  {
    agentAddress: null
  }
)
</script>
