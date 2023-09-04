<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HoloFuelAddress from './HoloFuelAddress.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'
import LeaveSiteIcon from '@/components/icons/LeaveSiteIcon.vue'
import { useGoToSpringboard } from '@/composables/useGoToSpringboard'
import { EUserKycLevel } from '@/types/types'

const { goToSpringboard } = useGoToSpringboard()

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    nickname: string
    agentAddress?: Uint8Array | null
    kycLevel: number
  }>(),
  {
    agentAddress: null
  }
)

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const currentLevel = computed((): number => (props.kycLevel === EUserKycLevel.one ? 1 : 2))
</script>

<template>
  <SettingsSection :title="t('$.holofuel')">
    <SettingsRow
      :label="t('settings.account_display_name')"
      :value="props.nickname"
    />

    <SettingsRow
      :label="t('settings.holofuel_address')"
    >
      <HoloFuelAddress
        v-if="props.agentAddress"
        :agent-address="props.agentAddress"
      />
    </SettingsRow>

    <SettingsRow
      class="verification"
      :label="t('settings.verification.label')"
    >
      <div class="flex flex-col">
        <span>{{ t('settings.verification.current_level', { level: currentLevel }) }}</span>
        <p class="verification__description">
          {{ t('settings.verification.next_level_descriptions.two') }}
        </p>
        <p
          class="springboard-link"
          @click="goToSpringboard"
        >
          <LeaveSiteIcon />
          <span class="holofuel-address__link-label">
            {{ t('settings.verification.link', { level: currentLevel + 1 }) }}
          </span>
        </p>
      </div>
    </SettingsRow>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.verification {
  margin-top: 8px;
  margin-bottom: 28px;

  &__description {
    font-weight: 400;
    margin-top: 24px;
  }
}

.springboard-link {
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
}
</style>

