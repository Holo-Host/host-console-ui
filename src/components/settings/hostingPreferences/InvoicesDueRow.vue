<script setup lang="ts">
import SettingsRow from '../SettingsRow.vue'
import TimeDropdownSelect from '@/components/TimeDropdownSelect.vue'
import { InvoicesData } from '@/types/types'

const props = defineProps<{
  data: InvoicesData
}>()

const emit = defineEmits(['update:due'])

function onDueChange(value: number | string): void {
  emit('update:due', {
    ...props.data.due,
    period: Number(value)
  })
}
</script>

<template>
  <SettingsRow
    :label="`${$t('hosting_preferences.invoices.due.label')}:`"
    grid-columns="190px auto"
    class="invoices-frequency-section"
  >
    <span>{{ $t('hosting_preferences.invoices.due.part_one') }}</span>

    <TimeDropdownSelect
      :value="props.data.due.period"
      :options="[7, 14, 28]"
      @update:selected-value="onDueChange"
    />

    <span>{{ $t('hosting_preferences.invoices.due.part_two') }}</span>
  </SettingsRow>
</template>
