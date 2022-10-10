<template>
  <PrimaryLayout
    title="hApps"
    class="happs"
  >
    <div class="happs__controls">
      <BaseFilterInput
        :value="filterValue"
        @update:value="onFilterChange"
      />

      <SortByDropdown
        :value="sortBy"
        is-disabled
        class="happs__sort-by-dropdown"
        @update:value="onSortByChange"
      />
    </div>

    <div class="happs__happ-list">
      <HappCard
        v-for="happ in filteredHapps"
        :key="happ.id"
        :happ="happ"
        class="happs__happ-list-item"
      />
    </div>
  </PrimaryLayout>
</template>

<script setup>
import BaseFilterInput from '@uicommon/components/BaseFilterInput.vue'
import HappCard from 'components/HappCard.vue'
import SortByDropdown from 'components/hApps/SortByDropdown'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HposInterface from 'src/interfaces/HposInterface'
import { computed, onMounted, ref } from 'vue'
import { kSortOptions } from '@/constants/ui'

const filterValue = ref('')

function onFilterChange(value) {
  filterValue.value = value
}

const happs = ref([])
const sortBy = ref(kSortOptions.alphabetical.value)

const filteredHapps = computed(() => {
  const sortByLogic =
    sortBy.value === kSortOptions.earnings.value
      ? (a, b) => (a.sevenDayEarnings < b.sevenDayEarnings ? 1 : -1)
      : (a, b) => (a.name > b.name ? 1 : -1)

  return happs.value
    .filter(({ name }) => name.toLowerCase().includes(filterValue.value.toLowerCase()))
    .sort(sortByLogic)
})

function onSortByChange(value) {
  sortBy.value = value
}

onMounted(async () => {
  happs.value = await HposInterface.getHostedHapps()
})
</script>

<style lang="scss" scoped>
.happs {
  &__controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 9px 0;
  }

  &__happ-list-item {
    max-width: 546px;
  }
}

@media screen and (max-width: 1050px) {
  .happs {
    &__controls {
      justify-content: flex-end;
    }

    &__happ-list {
      flex-direction: column;
      margin-right: 0;
    }

    &__sort-by-dropdown {
      display: none;
    }
  }
}
</style>
