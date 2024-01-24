<script setup lang="ts">
import { ref } from 'vue'
import ExclusionSelect from '@/components/settings/hostingPreferences/BaseCombobox.vue'
import { categories } from '@/constants/categories'

const props = withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: ''
  }
)

const isSaving = ref(false)

function save(): void {
  isSaving.value = true
  // Make an API call to save new selected options

  setTimeout(() => {
    isSaving.value = false
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  }, 2000)
}
</script>

<template>
  <ExclusionSelect
    :label="props.label"
    :options="categories"
    :is-saving="isSaving"
    @save="save"
  />
</template>
