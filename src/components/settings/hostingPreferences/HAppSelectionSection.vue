<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import SettingsSection from '../SettingsSection.vue'
import BaseCombobox from '@/components/BaseCombobox.vue'
import CategoryChip from '@/components/CategoryChip.vue'
import CircledExIcon from '@/components/icons/CircledExIcon.vue'
import FilledCheckIcon from '@/components/icons/FilledCheckIcon.vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import { countries } from '@/constants/countries'

const isEditing = ref(false)

const mappedCountries = countries.map((country, index) => ({
  id: index + 1,
  label: country
}))

const selectedJurisdictions = [
  {
    id: 1,
    label: 'Nigeria'
  },
  {
    id: 2,
    label: 'Poland'
  },
  {
    id: 3,
    label: 'United States'
  },
  {
    id: 4,
    label: 'United Kingdom'
  }
]

const visibleJurisdictions = computed(() => {
  return [...selectedJurisdictions].splice(0, 2)
})

const remainingJurisdictionsCount = computed(() => {
  return selectedJurisdictions.length - visibleJurisdictions.value.length
})

function edit(): void {
  isEditing.value = true
}

function updateJurisdictions(selected: any): void {
  console.log(selected)
}
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.happ_selection.header')"
    class="happ-selection-section"
  >
    <div class="card-content">
      <div class="happ-selection-section__jurisdiction-exclusions">
        <span class="selection-label">
          {{ $t('hosting_preferences.happ_selection.jurisdiction_exclusions') }}
        </span>
        <div
          v-if="selectedJurisdictions.length > 0"
          class="happ-selection-section__jurisdiction-exclusions-selected"
        >
          <div
            v-for="option in visibleJurisdictions"
            :key="option.id"
            class="happ-selection-section__jurisdiction-exclusions-selected-item"
          >
            <CategoryChip
              :with-dot="false"
              :label="option.label"
            >
              <XMarkIcon class="happ-selection-section__jurisdiction-exclusions-selected-item-delete-icon" />
            </CategoryChip>
          </div>

          <CategoryChip
            :with-dot="false"
            :label="`+${remainingJurisdictionsCount} more`"
						class="happ-selection-section__jurisdiction-exclusions-selected-item"
					>
          </CategoryChip>
        </div>
        <span
          v-else
          class="selection-choices"
        >
          None
        </span>
        <PencilIcon
          v-if="!isEditing"
          class="happ-selection-section__jurisdiction-exclusions-edit-icon"
          @click="edit"
        />

        <div
          v-if="isEditing"
          class="happ-selection-section__jurisdiction-exclusions-edit"
        >
          <FilledCheckIcon
            class="happ-selection-section__jurisdiction-exclusions-edit-button"
            data-testid="save-button"
            @click="save"
          />

          <CircledExIcon
            class="happ-selection-section__jurisdiction-exclusions-edit-button"
            data-testid="cancel-button"
            @click="cancel"
          />

          <BaseCombobox
            :options="mappedCountries"
            :selected="selectedJurisdictions"
            class="happ-selection-section__jurisdiction-exclusions-combobox"
            @update:selected="updateJurisdictions"
          />
        </div>
      </div>

      <div class="happ-selection-section__category-tags">
        <span class="selection-label">
          {{ $t('hosting_preferences.happ_selection.category_tags') }}
        </span>
        <div class="happ-selection-section__category-tags-item selection-child-row">
          <span class="selection-label">
            {{ $t('hosting_preferences.happ_selection.exclude') }}
          </span>
          <span class="selection-choices">None</span>
          <PencilIcon />
        </div>
        <div class="happ-selection-section__category-tags-item selection-child-row">
          <span class="selection-label">
            {{ $t('hosting_preferences.happ_selection.include') }}
          </span>
          <span class="selection-choices">None</span>
          <PencilIcon />
        </div>
      </div>
    </div>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.card-content {
  padding: 0 0 35px 0;
}

.selection-label {
  flex-basis: 184px;
}

.selection-choices {
  flex-basis: 44px;
}

.selection-child-row .selection-label {
  flex-basis: 144px;
}

.happ-selection-section {
  &__jurisdiction-exclusions {
    margin-top: 4px;
    display: flex;
    align-items: center;

    &-selected {
      display: flex;
      align-items: center;
    }

    &-selected-item {
      margin-right: 8px;
      white-space: nowrap;
    }

    &-selected-item-delete-icon {
      width: 14px;
      margin-left: 4px;
      cursor: pointer;
    }

    &-edit-icon {
      margin-left: 8px;
      margin-top: 4px;
      cursor: pointer;
    }

    &-combobox {
      margin-left: 8px;
    }

    &-edit {
      display: flex;
      align-items: center;

      &-button {
        margin-left: 8px;
        cursor: pointer;
      }
    }
  }

  &__category-tags {
    margin-top: 16px;
  }

  &__category-tags-item {
    margin-top: 12px;
    padding-left: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
