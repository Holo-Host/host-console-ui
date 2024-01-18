<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import SettingsSection from '../SettingsSection.vue'
import BaseCombobox from '@/components/BaseCombobox.vue'
import BaseTooltip from '@/components/BaseTooltip.vue'
import CategoryChip from '@/components/CategoryChip.vue'
import CircledExIcon from '@/components/icons/CircledExIcon.vue'
import FilledCheckIcon from '@/components/icons/FilledCheckIcon.vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import { countries } from '@/constants/countries'

const isEditing = ref(false)

interface Option {
  id: number
  label: string
}

const initiallySelectedJurisdictions: string[] = []
const previouslySelectedJurisdictions = ref<Option[]>([])

const mappedCountries: Option[] = countries.map((country, index) => ({
  id: index + 1,
  label: country
}))

const selectedJurisdictions = ref<Option[]>(
  mappedCountries.filter((country) => initiallySelectedJurisdictions.includes(country.label))
)

const visibleJurisdictions = computed(() => {
  return [...selectedJurisdictions.value].splice(0, 2)
})

const remainingJurisdictions = computed(() => {
  return [...selectedJurisdictions.value].splice(2)
})

const remainingJurisdictionsCount = computed(() => {
  return remainingJurisdictions.value.length
})

const isMoreSelectedJurisdictionsTooltipVisible = ref(false)

function showMoreSelectedJurisdictions(): void {
  isMoreSelectedJurisdictionsTooltipVisible.value = true
}

function edit(): void {
  isEditing.value = true
  previouslySelectedJurisdictions.value = [...selectedJurisdictions.value]
}

function updateJurisdictions(selected: Option[]): void {
  selectedJurisdictions.value = selected
}

function removeJurisdiction(option: Option): void {
  isEditing.value = true
  selectedJurisdictions.value = selectedJurisdictions.value.filter(
    (jurisdiction) => jurisdiction.id !== option.id
  )
}

function save(): void {
  // Make an API call to save new selected jurisdictions
  isEditing.value = false
}

function cancel(): void {
  isEditing.value = false
  selectedJurisdictions.value = [...previouslySelectedJurisdictions.value]
}
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.happ_selection.header')"
    class="happ-selection-section"
  >
    <div class="card-content">
      <div class="happ-selection-section__jurisdiction-exclusions">
        <span class="happ-selection-section__selection-label">
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
              <XMarkIcon
                class="happ-selection-section__jurisdiction-exclusions-selected-item-delete-icon"
                @click="removeJurisdiction(option)"
              />
            </CategoryChip>
          </div>

          <CategoryChip
            v-if="selectedJurisdictions.length > 2"
            :with-dot="false"
            :label="`+${remainingJurisdictionsCount} more`"
            class="happ-selection-section__jurisdiction-exclusions-selected-item"
            @click="showMoreSelectedJurisdictions"
          >
            <BaseTooltip
              v-click-outside="() => isMoreSelectedJurisdictionsTooltipVisible = false"
              class="happ-selection-section__jurisdiction-exclusions-tooltip"
              :is-visible="isMoreSelectedJurisdictionsTooltipVisible"
            >
              <div
                v-for="remainingJurisdiction in remainingJurisdictions"
                :key="remainingJurisdiction.id"
                class="happ-selection-section__jurisdiction-exclusions-selected-item happ-selection-section__jurisdiction-exclusions-selected-item--remaining"
              >
                <span>{{ remainingJurisdiction.label }}</span>
                <XMarkIcon
                  class="happ-selection-section__jurisdiction-exclusions-selected-item-delete-icon"
                  @click="removeJurisdiction(remainingJurisdiction)"
                />
              </div>
            </BaseTooltip>
          </CategoryChip>
        </div>
        <span
          v-else
          class="happ-selection-section__jurisdiction-exclusions-selected"
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
        <span class="happ-selection-section__selection-label happ-selection-section__selection-label--main">
          {{ $t('hosting_preferences.happ_selection.category_tags') }}
        </span>
        <div class="happ-selection-section__category-tags-item selection-child-row">
          <span class="happ-selection-section__selection-label happ-selection-section__selection-label--child">
            {{ $t('hosting_preferences.happ_selection.exclude') }}
          </span>
          <span
            class="happ-selection-section__category-tags-selected"
          >
            None
          </span>
          <PencilIcon />
        </div>
        <div class="happ-selection-section__category-tags-item selection-child-row">
          <span class="happ-selection-section__selection-label happ-selection-section__selection-label--child happ-selection-section__selection-label--include">
            {{ $t('hosting_preferences.happ_selection.include') }}
          </span>
          <span
            class="happ-selection-section__category-tags-selected"
          >
            None
          </span>
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

.happ-selection-section {
  &__selection-label {
    display: flex;
    justify-content: end;
    white-space: nowrap;

    &--main {
      width: 140px;
    }

    &--child {
      margin-left: 50px;
    }

    &--include {
      padding-left: 3px;
    }
  }

  &__jurisdiction-exclusions {
    height: 28px;
    margin-top: 4px;
    display: flex;
    align-items: center;

    &-selected {
      display: flex;
      align-items: center;
      margin-left: 60px;
    }

    &-selected-item {
      margin-right: 8px;
      white-space: nowrap;
      cursor: pointer;
      position: relative;

      &--remaining {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 24px;
      }
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

    &-tooltip {
      top: 32px;
    }
  }

  &__category-tags {
    margin-top: 16px;

    &-selected {
      display: flex;
      align-items: center;
      margin-left: 60px;
    }
  }

  &__category-tags-item {
    margin-top: 12px;
    padding-left: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
