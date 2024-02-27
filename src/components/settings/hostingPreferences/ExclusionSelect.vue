<script setup lang="ts">
import ExclusionSelect from '@/components/settings/hostingPreferences/BaseCombobox.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    options: string[]
    isBusy: boolean
    initiallySelected?: string[]
  }>(),
  {
    label: '',
    initiallySelected: () => []
  }
)

const emit = defineEmits(['save'])

function save(selectedOptions: string[]): void {
  emit('save', selectedOptions)
}
</script>

<template>
  <ExclusionSelect
    :label="props.label"
    :options="props.options"
    :is-saving="props.isBusy"
    :initially-selected="props.initiallySelected"
    @save="save"
  />
</template>
