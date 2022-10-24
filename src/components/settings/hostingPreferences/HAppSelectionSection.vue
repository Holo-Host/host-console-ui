<template>
  <SettingsSection
    :title="$t('hosting_preferences.happ_selection.header')"
    is-disabled
    class="happ-selection-section"
  >
    <div class="card-content disabled">
      <div class="happ-selection-section__jurisdiction-exclusions">
        <span class="selection-label">
          {{ $t('hosting_preferences.happ_selection.jurisdiction_exclusions') }}
        </span>
        <span class="selection-choices">None</span>
        <PencilIcon class="pencil" />
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

<script setup >
import PencilIcon from 'components/icons/PencilIcon.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'

const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:price'])

const settings = computed(() => [
  {
    label: t('hosting_preferences.happ_selection.jurisdiction_exclusions'),
    value: props.data.jurisdictionExclusions,
    prop: 'jurisdictionExclusions'
  },
  {
    label: t('hosting_preferences.happ_selection.exclude'),
    value: props.data.exclude,
    prop: 'exclude'
  },
  {
    label: t('hosting_preferences.happ_selection.include'),
    value: props.data.include,
    prop: 'include'
  }
])
</script>

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
