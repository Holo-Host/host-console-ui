<script setup lang="ts">
import { ref } from 'vue'
import SettingsSection from '../SettingsSection.vue'
import ExclusionSelect from '@/components/settings/hostingPreferences/ExclusionSelect.vue'
import { categories } from '@/constants/categories'
import { countries } from '@/constants/countries'
import type { HostingJurisdictions } from '@/types/types'
import { ECriteriaType } from '@/types/types'

const props = defineProps<{
  hostingJurisdictions: HostingJurisdictions
  isJurisdictionLoading: boolean
}>()

const isHostingCategoriesExclusionsBusy = ref(false)

const emit = defineEmits(['update:jurisdiction'])

function updateJurisdiction(jurisdiction:  {
      criteria_type: ECriteriaType
      value: string[],
    }): void {
  emit('update:jurisdiction', jurisdiction)
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
            :is-busy="isJurisdictionLoading"
            :initially-selected="props.hostingJurisdictions.criteriaType === ECriteriaType.exclude ? props.hostingJurisdictions.value : []"
            @update:value="updateJurisdiction({value: $event, criteria_type: ECriteriaType.exclude})"
          />
        </div>
        <div class="happ-selection-section__tags-item happ-selection-section__tags-item-include">
          <ExclusionSelect
            :key="props.hostingJurisdictions.timestamp"
            label="hosting_preferences.happ_selection.include"
            :options="countries"
            :is-busy="isJurisdictionLoading"
            :initially-selected="props.hostingJurisdictions.criteriaType === 'include' ? props.hostingJurisdictions.value : []"
            @update:value="updateJurisdiction({value: $event, criteria_type: ECriteriaType.include})"
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
