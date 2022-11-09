<template>
  <SettingsRow
    :label="`${$t('hosting_preferences.invoices.frequency.label')}:`"
    grid-columns="190px auto"
    class="invoices-frequency-section"
  >
    <span>{{ $t('hosting_preferences.invoices.frequency.part_one') }}</span>

    <TimeDropdownSelect
      is-disabled
      :value="data.frequency.period"
      :options="['N/A', 7, 30]"
      @update:selected-value="onFrequencyPeriodChange"
    />

    <span>{{ $t('hosting_preferences.invoices.frequency.part_two') }}</span>

    <BaseEditableInput
      is-disabled
      :value="formatCurrency(Number(data.frequency.amount), 0)"
      unit="HF"
      class="invoices-frequency-section__amount"
      @update:value="onFrequencyAmountChange"
    />
  </SettingsRow>
</template>

<script setup >
import { formatCurrency } from '@uicommon/utils/numbers'
import BaseEditableInput from 'components/BaseEditableInput.vue'
import TimeDropdownSelect from 'components/TimeDropdownSelect.vue'
import SettingsRow from '../SettingsRow.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:frequency'])

function onFrequencyPeriodChange(value) {
  emit('update:frequency', {
    ...props.data.frequency,
    period: Number(value)
  })
}

function onFrequencyAmountChange(value) {
  emit('update:frequency', {
    ...props.data.frequency,
    amount: value
  })
}
</script>

<style lang="scss" scoped>
.invoices-frequency-section {
  &__amount {
    margin-left: 4px;
    margin-top: -2px;
    text-decoration: underline;
    text-underline-offset: 2px;
    font-weight: 700;
  }
}
</style>
