<template>
  <SettingsRow
    :label="`${$t('hosting_preferences.invoices.due.label')}:`"
    grid-columns="190px auto"
    class="invoices-frequency-section"
  >
    <span>{{ $t('hosting_preferences.invoices.due.part_one') }}</span>

    <TimeDropdownSelect
      is-disabled
      :value="data.due.period"
      :options="['N/A', 7, 30]"
      @update:selected-value="onDueChange"
    />

    <span>{{ $t('hosting_preferences.invoices.due.part_two') }}</span>
  </SettingsRow>
</template>

<script setup >
import TimeDropdownSelect from 'components/TimeDropdownSelect.vue'
import SettingsRow from '../SettingsRow.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:due'])

function onDueChange(value) {
  emit('update:due', {
    ...props.data.due,
    period: Number(value)
  })
}
</script>
