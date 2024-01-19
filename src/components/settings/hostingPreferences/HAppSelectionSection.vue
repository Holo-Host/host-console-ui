<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import SettingsSection from '../SettingsSection.vue'
import BaseCombobox from '@/components/BaseCombobox.vue'
import BaseTooltip from '@/components/BaseTooltip.vue'
import CategoryChip from '@/components/CategoryChip.vue'
import CircledExIcon from '@/components/icons/CircledExIcon.vue'
import FilledCheckIcon from '@/components/icons/FilledCheckIcon.vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import JurisdictionExclusionSelect from '@/components/settings/hostingPreferences/JurisdictionExclusionSelect.vue'
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.happ_selection.header')"
    class="happ-selection-section"
  >
    <div class="card-content">
      <JurisdictionExclusionSelect />

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
