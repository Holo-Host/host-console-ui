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

    <div
      v-if="filteredHapps.length"
      class="happs__happ-list"
    >
      <HappCard
        v-for="happ in filteredHapps"
        :key="happ.id"
        :happ="happ"
        class="happs__happ-list-item"
      />
    </div>

    <div
      v-else
      class="happs__happ-list"
    >
      <HappCard
        is-empty
        class="happs__happ-list-item"
      />
    </div>
  </PrimaryLayout>
</template>

<script setup>
import BaseFilterInput from '@uicommon/components/BaseFilterInput.vue'
import HappCard from 'components/hApps/HappCard.vue'
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

  &__happ-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(546px, 546px));
    grid-template-rows: repeat(auto-fill, 180px);
    grid-gap: 24px;
    margin-top: 12px;
    height: calc(100vh - 175px);
    overflow-y: scroll;
  }

  &__happ-list-item {
    height: 185px;
  }
}

@media screen and (max-width: 1050px) {
  .happs {
    &__happ-list {
      grid-template-columns: repeat(auto-fill, minmax(97%, 97%));
      grid-template-rows: repeat(auto-fill, 250px);
      height: calc(100vh - 250px);
    }

    &__happ-list-item {
      height: 250px;
    }

    &__controls {
      justify-content: flex-end;
    }

    &__sort-by-dropdown {
      display: none;
    }
  }
}
</style>
