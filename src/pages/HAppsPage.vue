<template>
  <PrimaryLayout
    title="hApps"
    class="happs"
    :is-content-loading="isLoading"
    :is-content-error="isError"
    @try-again-clicked="getData"
  >
    <div class="happs__controls">
      <BaseSearchInput
        :value="filterValue"
        :is-disabled="isLoading"
        label-translation-key="$.filter_by"
        @update="onFilterChange"
      />

      <SortByDropdown
        :value="sortBy"
        is-disabled
        class="happs__sort-by-dropdown"
        @update:value="onSortByChange"
      />
    </div>

    <div v-if="!isLoading && !isError">
      <div
        v-if="filteredHapps.length"
        class="happs__happ-list"
      >
        <HAppCard
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
        <HAppCard
          is-empty
          :empty-card-label="filterValue ? 'hosted_happs.no_filtered_happs' : 'hosted_happs.no_happs'"
          class="happs__happ-list-item"
        />
      </div>
    </div>
  </PrimaryLayout>
</template>

<script setup>
import BaseSearchInput from '@uicommon/components/BaseSearchInput.vue'
import HAppCard from '@uicommon/components/HAppCard.vue'
import SortByDropdown from 'components/hApps/SortByDropdown.vue'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HposInterface from '@/interfaces/HposInterface'
import { computed, onMounted, ref } from 'vue'
import { kSortOptions } from '@/constants/ui'

const isLoading = ref(false)
const isError = ref(false)

const filterValue = ref('')
const filterIsActive = ref(false)

function onFilterChange({ value, isActive }) {
  filterIsActive.value = isActive
  filterValue.value = value
}

const happs = ref([])
const sortBy = ref(kSortOptions.alphabetical.value)

const filteredHapps = computed(() => {
  const sortByLogic =
    sortBy.value === kSortOptions.earnings.value
      ? (a, b) => (a.sevenDayEarnings < b.sevenDayEarnings ? 1 : -1)
      : (a, b) => (a.name > b.name ? 1 : -1)

  if (filterIsActive.value && filterValue.value) {
    return happs.value
      .filter(({ name }) => name.toLowerCase().includes(filterValue.value.toLowerCase()))
      .sort(sortByLogic)
  }

  return [...happs.value].sort(sortByLogic)
})

function onSortByChange(value) {
  sortBy.value = value
}

async function getData() {
  isError.value = false
  isLoading.value = true

  happs.value = await HposInterface.getHostedHapps()

  if (happs.value.error) {
    isError.value = true
  }

  isLoading.value = false
}

onMounted(async () => {
  await getData()
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
    grid-template-columns: repeat(auto-fill, minmax(600px, 600px));
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
      grid-template-rows: repeat(auto-fill, 215px);
      height: calc(100vh - 215px);
    }

    &__happ-list-item {
      height: 215px;
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
