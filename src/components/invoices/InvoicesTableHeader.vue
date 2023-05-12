<script setup lang="ts">
import BaseTableHeader from '@uicommon/components/BaseTableHeader.vue'
import type { SortByProps, TableHeader } from '@/types/types'

const props = defineProps<{
  headers: TableHeader[]
  sortBy: string
}>()

const emit = defineEmits(['sortByChanged'])

function onSortByChanged(sortProps: SortByProps): void {
  emit('sortByChanged', sortProps)
}
</script>

<template>
  <BaseTableHeader
    :headers="props.headers"
    :sort-by="props.sortBy"
    @sort-by-changed="onSortByChanged"
  />
</template>
