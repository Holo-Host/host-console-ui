<script setup lang="ts">
import BaseChip from '@uicommon/components/BaseChip.vue'
import BaseSearchInput from '@uicommon/components/BaseSearchInput.vue'
import HAppCard from '@uicommon/components/HAppCard.vue'
import { EChipType } from '@uicommon/types/ui'
import { computed, onMounted, ref } from 'vue'
import SortByDropdown from '@/components/hApps/SortByDropdown.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { kSortOptions } from '@/constants/ui'
import type { HApp } from '@/interfaces/HposInterface'
import { useDashboardStore } from '@/store/dashboard'
import { isError as isErrorPredicate } from '@/types/predicates'

const store = useDashboardStore()

const isLoading = ref(false)
const isError = ref(false)

const filterValue = ref('')
const filterIsActive = ref(false)

interface FilterChangeProps {
  value: string
  isActive: boolean
}

function onFilterChange({ value, isActive }: FilterChangeProps): void {
  filterIsActive.value = isActive
  filterValue.value = value
}

const sortBy = ref(kSortOptions.alphabetical.value)

const hostedHApps = computed((): HApp[] | { error: unknown } => store.hostedHApps)

const filteredHApps = computed((): HApp[] => {
  const sortByLogic: (a: HApp, b: HApp) => number =
    // Sorting by earnings is not available now as we don't have a property
    // like that in the HApp, we use 'sourceChains' for now
    sortBy.value === kSortOptions.earnings.value
      ? (a: HApp, b: HApp): number => (a.sourceChains < b.sourceChains ? 1 : -1)
      : (a: HApp, b: HApp): number => (a.name > b.name ? 1 : -1)

  if (isErrorPredicate(hostedHApps.value) && hostedHApps.value.error) {
    return []
  }

  if (!isErrorPredicate(hostedHApps.value) && filterIsActive.value && filterValue.value) {
    return hostedHApps.value
      .filter((hApp: HApp) => hApp.name.toLowerCase().includes(filterValue.value.toLowerCase()))
      .sort(sortByLogic)
  }

  if (!isErrorPredicate(hostedHApps.value)) {
    return [...hostedHApps.value].sort(sortByLogic)
  }

  return []
})

type SortOption = 'alphabetical' | 'earnings'

function onSortByChange(value: SortOption): void {
  sortBy.value = value
}

async function getData(): Promise<void> {
  isError.value = false
  isLoading.value = true

  await store.getHostedHApps()

  if (isErrorPredicate(hostedHApps.value) && hostedHApps.value.error) {
    isError.value = true
  }

  isLoading.value = false
}

onMounted(async () => {
  await getData()
})
</script>

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
        v-if="filteredHApps.length"
        class="happs__happ-list"
      >
        <HAppCard
          v-for="hApp in filteredHApps"
          :key="hApp.id"
          :happ="hApp"
          class="happs__happ-list-item"
        >
          <template #status-chip>
            <BaseChip
              v-if="hApp.isPaused"
              :label="$t('$.paused')"
              :type="EChipType.info"
            />
          </template>
        </HAppCard>
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
