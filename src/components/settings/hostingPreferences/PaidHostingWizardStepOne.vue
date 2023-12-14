<script lang="ts" setup>
import { EInputType } from '@uicommon/types/ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import HostingPreferencesEditablePriceRow from '@/components/settings/hostingPreferences/EditablePriceRow.vue'
import type { PaidHostingWizardStep } from '@/constants/ui'
import type { UpdatePricePayload } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const emit = defineEmits(['update:value'])

const cpuPrice = ref(props.steps[0].props.cpu)
const dataTransferPrice = ref(props.steps[0].props.dataTransfer)

interface PriceItem {
  label: string
  value: string | number | null
  unit: string
  prop: string
  isDisabled: boolean
}

const prices = computed((): PriceItem[] => [
  {
    label: t('$.cpu'),
    value: cpuPrice.value,
    unit: t('hosting_preferences.prices.hfpermin'),
    prop: 'cpu',
    isDisabled: false
  },
  {
    label: t('$.data_transfer'),
    value: dataTransferPrice.value,
    unit: t('hosting_preferences.prices.hfpergb'),
    prop: 'dataTransfer',
    isDisabled: false
  }
])

function updatePrice({ prop, value }: UpdatePricePayload): void {
  emit('update:value', { prop, value })
}
</script>

<template>
  <div
    class="paid-hosting-modal-wizard-step"
    data-test-paid-hosting-wizard-step-one
  >
    <span
      class="paid-hosting-modal-wizard-step__title"
      data-test-paid-hosting-wizard-step-one-title
    >
      {{ props.steps[0].title }}
    </span>

    <p class="paid-hosting-modal-wizard-step__description">
      {{ props.steps[0].description }}
    </p>

    <div class="paid-hosting-modal-wizard-step-one__form">
      <div
        :title="$t('hosting_preferences.prices.header')"
        class="paid-hosting-modal-wizard-step-one__form-prices-section"
      >
        <span class="paid-hosting-modal-wizard-step-one__form-prices-section-title">
          {{ $t('hosting_preferences.toggle_paid_hosting_modal.step_one.title') }}
        </span>

        <span class="paid-hosting-modal-wizard-step-one__form-prices-section-subtitle">
          {{ $t('hosting_preferences.toggle_paid_hosting_modal.step_one.default_rates') }}
        </span>

        <div class="paid-hosting-modal-wizard-step-one__form-prices-section-inputs">
          <HostingPreferencesEditablePriceRow
            v-for="price in prices"
            :key="price.label"
            v-bind="price"
            :type="EInputType.number"
            label-align="left"
            class="prices-section__price"
            @update:value="updatePrice"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.paid-hosting-modal-wizard-step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    margin-top: 8px;
    font-size: 18px;
    justify-self: start;
    font-weight: 800;
  }

  &__description {
    margin-top: 8px;
  }
}

.paid-hosting-modal-wizard-step-one {
  &__form {
    width: 540px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: rgba(249, 250, 251, 1);
    border-radius: 12px;
    padding: 16px 20px 0;
    color: var(--grey-color);
    line-height: 19px;
    font-size: 12px;
    font-weight: 600;

    &-prices-section {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: start;

      &-title {
        color: var(--grey-dark-color);
        font-weight: 700;
      }

      &-subtitle {
        margin-top: 12px;
        color: var(--grey-dark-color);
        font-weight: 700;
        font-size: 10.5px;
      }

      &-inputs {
        margin-top: 8px;
        margin-left: 90px;
      }
    }
  }
}
</style>
