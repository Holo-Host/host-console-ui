<script setup lang="ts">
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'
import LeaveSiteIcon from '@/components/icons/LeaveSiteIcon.vue'
import { useGoToSpringboard } from '@/composables/useGoToSpringboard'

const { goToSpringboard } = useGoToSpringboard()
</script>

<template>
  <SettingsSection :title="$t('kyc.title')">
    <SettingsRow
      :label="$t('kyc.description')"
    >
      <p
        class="springboard-link"
        @click="goToSpringboard"
      >
        <LeaveSiteIcon />
        <span class="holofuel-address__link-label">
          {{ $t('springboard.go_to_springboard') }}
        </span>
      </p>
    </SettingsRow>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.springboard-link {
  display: flex;
  align-items: center;
  margin-top: 6px;
  cursor: pointer;
}
</style>
