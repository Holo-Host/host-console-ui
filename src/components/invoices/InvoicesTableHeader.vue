<template>
  <BaseTableHeader
    :headers="headers"
    :sort-by="sortBy"
    @sort-by-changed="onSortByChanged"
  />
</template>

<script setup>
import BaseTableHeader from '../../../../ui-common-library/src/components/BaseTableHeader'

defineProps({
  headers: {
    type: Array,
    required: true
  },

  sortBy: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['sortByChanged'])

function onSortByChanged(props) {
  emit('sortByChanged', props)
}
</script>
