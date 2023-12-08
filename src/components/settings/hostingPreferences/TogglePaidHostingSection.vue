<script setup lang="ts">
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import ToggleSwitch from '@uicommon/components/ToggleSwitch.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import { useGoToSpringboard } from '@/composables/useGoToSpringboard'
import { useUserStore } from '@/store/user'
import { EUserKycLevel } from '@/types/types'

const { t } = useI18n()
const userStore = useUserStore()
const { goToSpringboard } = useGoToSpringboard()

const props = defineProps<{
  isLoading: boolean
  paidHostingEnabled: boolean
}>()

const paidHostingEnabled = ref(props.paidHostingEnabled && userStore.kycLevel === EUserKycLevel.two)

const emit = defineEmits(['paid-hosting-toggled'])

const paidHostingToggled = (isToggledOn: boolean): void => {
  paidHostingEnabled.value = isToggledOn
  emit('paid-hosting-toggled', isToggledOn)
}
</script>

<template>
  <SettingsSection
    :title="t('hosting_preferences.toggle_paid_hosting.paid_hosting')"
    class="toggle-paid-hosting-section"
    :class="{ 'toggle-paid-hosting-section__is-loading': props.isLoading }"
  >
    <div class="toggle-container">
      <CircleSpinner
        v-if="props.isLoading"
        class="toggle-container__spinner"
      />
      <div
        v-if="userStore.kycLevel !== EUserKycLevel.two"
        class="kyc-needed-container"
      >
        <span class="kyc-needed-text">{{ t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_one') }}</span>
        <span
          class="kyc-needed-text__spingboard-link"
          @click="goToSpringboard"
        >{{ t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_two') }}</span>
        <span class="kyc-needed-text">{{ t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_three') }}</span>
      </div>
      <ToggleSwitch
        :toggle-on="paidHostingEnabled"
        :label-toggled-on="t('hosting_preferences.toggle_paid_hosting.enabled')"
        :label-toggled-off="t('hosting_preferences.toggle_paid_hosting.disabled')"
        :is-disabled="userStore.kycLevel !== EUserKycLevel.two"
        @toggle="paidHostingToggled"
      >
        data-test-toggle-paid-hosting
      </ToggleSwitch>
    </div>
    <div
      v-if="userStore.kycLevel !== EUserKycLevel.one"
      class="hosting-invoice-info"
    >
      {{ paidHostingEnabled ?
        t('hosting_preferences.toggle_paid_hosting.invoice_info_enabled') :
        t('hosting_preferences.toggle_paid_hosting.invoice_info_disabled') }}
    </div>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.toggle-paid-hosting-section {
  &__is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &__subtitle {
    color: var(--grey-dark-color);
    font-weight: 700;
  }

  &__prices {
    margin-top: 24px;
    margin-left: 40px;
  }

  &__price {
    margin-top: 6px;
  }

  .toggle-container {
    display: flex;
    flex-direction: row;
    padding: 10px 23px;
    justify-content: flex-end;
    gap: 16px;
    width: 100%;

    &__spinner {
      margin-left: 70px;
    }
  }

  .kyc-needed-container {
    display: inline-flex;
    padding: 6px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #fdebeb;
  }

  .kyc-needed-text {
    color: #ed3c3c;
    text-align: right;
    font-size: 12px;
    font-weight: 400;

    &__spingboard-link {
      color: #313c59;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  .hosting-invoice-info {
    display: inline-flex;
    padding: 10px 23px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #f5f5f4;
    color: #929cb7;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
