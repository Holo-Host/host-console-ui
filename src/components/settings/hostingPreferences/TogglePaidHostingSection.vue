<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import ToggleSwitch from '@uicommon/components/ToggleSwitch.vue'
import { useUserStore } from '@/store/user'
import { EUserKycLevel } from '@/types/types'

const { t } = useI18n()
const userStore = useUserStore()
const paidHostingEnabled = ref(false)

const emit = defineEmits(['paid_hosting_toggled'])

const paidHostingToggled = (isToggledOn: boolean): void => {
    paidHostingEnabled.value = isToggledOn
    emit('paid_hosting_toggled', isToggledOn)
}

</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.toggle_paid_hosting.paid_hosting')"
    class="toggle-paid-hosting-section">
    <div class="toggle-container">
        <div v-if="userStore.kycLevel !== EUserKycLevel.two" class="kyc-needed-container">
            <span class="kyc-needed-text">{{ $t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_one') }}</span>
            <span class="kyc-needed-text__dark-text">{{ $t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_two') }}</span>
            <span class="kyc-needed-text">{{ $t('hosting_preferences.toggle_paid_hosting.kyc_needed_part_three') }}</span>
        </div>
        <ToggleSwitch
            :toggleOn="paidHostingEnabled"
            :labelToggledOn="$t('hosting_preferences.toggle_paid_hosting.enabled')"
            :labelToggledOff="$t('hosting_preferences.toggle_paid_hosting.disabled')"
            :isDisabled="userStore.kycLevel !== EUserKycLevel.two"
            @toggle="paidHostingToggled">
        </ToggleSwitch>
    </div>
    <div v-if="userStore.kycLevel !== EUserKycLevel.one" class="hosting-invoice-info">
        {{ paidHostingEnabled ?
            $t('hosting_preferences.toggle_paid_hosting.invoice_info_enabled') :
            $t('hosting_preferences.toggle_paid_hosting.invoice_info_disabled') }}
    </div>
</SettingsSection>
</template>

<style lang="scss" scoped>
.toggle-paid-hosting-section {
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
  }

  .kyc-needed-container {
    display: inline-flex;
    padding: 6px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #FDEBEB;
  }

  .kyc-needed-text {
    color: #ED3C3C;
    text-align: right;
    font-size: 12px;
    font-weight: 400;

    &__dark-text {
        color: #313C59;
        font-weight: 600;
    }
  }

  .hosting-invoice-info {
    display: inline-flex;
    padding: 10px 23px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #F5F5F4;
    color: #929CB7;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;    
    width: 100%;
    margin-top: 16px;
  }
}
</style>