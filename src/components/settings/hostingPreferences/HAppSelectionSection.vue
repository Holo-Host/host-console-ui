<script setup lang="ts">
import { ref } from 'vue'
import SettingsSection from '../SettingsSection.vue'
import ExclusionSelect from '@/components/settings/hostingPreferences/ExclusionSelect.vue'
import { categories } from '@/constants/categories'
import { countries } from '@/constants/countries'
import { usePreferencesStore } from '@/store/preferences'
import type { HostingJurisdictions } from '@/types/types'
import { ECriteriaType } from '@/types/types'

const preferencesStore = usePreferencesStore()

const props = defineProps<{
  hostingJurisdictions: HostingJurisdictions
}>()

const isJurisdictionExclusionsBusy = ref(false)
const isHostingCategoriesExclusionsBusy = ref(false)

async function saveHostingJurisdictions(
  value: string[],
  criteriaType: ECriteriaType
): Promise<void> {
  isJurisdictionExclusionsBusy.value = true

  const payload = {
    criteria_type: criteriaType,
    value
  }

  // Make an API call to save new selected options
  try {
    await preferencesStore.setHostingJurisdictions(payload)
    isJurisdictionExclusionsBusy.value = false
  } catch (error) {
    isJurisdictionExclusionsBusy.value = false
  }
}

function saveHostingCategoriesExclusions(): void {
  isHostingCategoriesExclusionsBusy.value = true
  // Make an API call to save new selected options

  setTimeout(() => {
    isHostingCategoriesExclusionsBusy.value = false
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  }, 2000)
}
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.happ_selection.header')"
    class="happ-selection-section"
  >
    <div class="card-content">
      <div class="happ-selection-section__tags">
        <span class="happ-selection-section__selection-label happ-selection-section__selection-label--main">
          {{ $t('hosting_preferences.happ_selection.jurisdiction_exclusions') }}
        </span>
        <div class="happ-selection-section__tags-item happ-selection-section__tags-item-exclude">
          <ExclusionSelect
            :key="props.hostingJurisdictions.timestamp"
            label="hosting_preferences.happ_selection.exclude"
            :options="countries"
            :is-busy="isJurisdictionExclusionsBusy"
            :initially-selected="props.hostingJurisdictions.criteriaType === ECriteriaType.exclude ? props.hostingJurisdictions.value : []"
            @save="saveHostingJurisdictions($event, ECriteriaType.exclude)"
          />
        </div>
        <div class="happ-selection-section__tags-item happ-selection-section__tags-item-include">
          <ExclusionSelect
            :key="props.hostingJurisdictions.timestamp"
            label="hosting_preferences.happ_selection.include"
            :options="countries"
            :is-busy="isJurisdictionExclusionsBusy"
            :initially-selected="props.hostingJurisdictions.criteriaType === 'include' ? props.hostingJurisdictions.value : []"
            @save="saveHostingJurisdictions($event, ECriteriaType.include)"
          />
        </div>
      </div>

      <div class="happ-selection-section__tags happ-selection-section--category">
        <span class="happ-selection-section__selection-label happ-selection-section__selection-label--main">
          {{ $t('hosting_preferences.happ_selection.category_tags') }}
        </span>
        <div class="happ-selection-section__tags-item happ-selection-section__tags-item-exclude">
          <ExclusionSelect
            label="hosting_preferences.happ_selection.exclude"
            :options="categories"
            :is-busy="isHostingCategoriesExclusionsBusy"
            @save="saveHostingCategoriesExclusions"
          />
        </div>
        <div class="happ-selection-section__tags-item happ-selection-section__tags-item-include">
          <ExclusionSelect
            label="hosting_preferences.happ_selection.include"
            :options="categories"
            :is-busy="isHostingCategoriesExclusionsBusy"
            @save="saveHostingCategoriesExclusions"
          />
        </div>
      </div>
    </div>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.card-content {
  padding: 0 0 35px 0;
}

.happ-selection-section {
  &--category {
    opacity: 0.5;
    pointer-events: none;
  }

  &__tags {
    margin-top: 16px;

    &-selected {
      display: flex;
      align-items: center;
      margin-left: 60px;
    }
  }

  &__tags-item {
    margin-top: 12px;
    padding-left: 40px;
    display: flex;
    align-items: center;

    &-exclude {
      margin-left: 51px;
    }

    &-include {
      margin-left: 54px;
    }
  }
}
</style>
