<script setup lang="ts">
import SettingsSection from '../SettingsSection.vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import CategoryExclusionSelect from '@/components/settings/hostingPreferences/CategoryExclusionSelect.vue'
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
        <div class="happ-selection-section__category-tags-item happ-selection-section__category-tags-item-exclude">
          <CategoryExclusionSelect
            label="hosting_preferences.happ_selection.exclude"
          />
        </div>
        <div class="happ-selection-section__category-tags-item happ-selection-section__category-tags-item-include">
          <CategoryExclusionSelect
            label="hosting_preferences.happ_selection.include"
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

    &-exclude {
      margin-left: 51px;
    }

    &-include {
      margin-left: 54px;
    }
  }
}
</style>
