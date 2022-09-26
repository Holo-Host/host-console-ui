<template>
  <tr class="header-row">
    <BaseTableHeaderItem
      v-for="header in headers"
      :key="header.name"
      :header="header"
      :sort-by="{ name: sortBy, direction: sortDirection }"
      @click="onHeaderClicked(header.name)"
    />

    <BaseTableHeaderItem
      v-for="header in headers"
      :key="header.name"
      :header="header"
      is-mobile
      :sort-by="{ name: sortBy, direction: sortDirection }"
      @click="onHeaderClicked(header.name)"
    />
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import BaseTableHeaderItem from './BaseTableHeaderItem.vue'

const kSortDirections = {
  asc: 'asc',
  desc: 'desc'
}

const props = defineProps({
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

const sortDirection = ref(kSortDirections.asc)

function onHeaderClicked(name) {
  const { asc, desc } = kSortDirections

  if (name === props.sortBy) {
    sortDirection.value = sortDirection.value === asc ? desc : asc
  } else {
    sortDirection.value = asc
  }

  emit('sortByChanged', { name, direction: sortDirection.value })
}
</script>

<style lang="scss" scoped>
.header-row {
  position: relative;
  font-size: 16px;
  line-height: 22px;
  color: var(--grey-dark-color);
  border-bottom: 0.5px solid #bcbfc6;
}
</style>
