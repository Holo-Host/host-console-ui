<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CircleSpinner from '../../../../ui-common-library/src/components/CircleSpinner.vue'
import BaseCombobox from '@/components/BaseCombobox.vue'
import BaseTooltip from '@/components/BaseTooltip.vue'
import CategoryChip from '@/components/CategoryChip.vue'
import CircledExIcon from '@/components/icons/CircledExIcon.vue'
import FilledCheckIcon from '@/components/icons/FilledCheckIcon.vue'
import PencilIcon from '@/components/icons/PencilIcon.vue'

const { t } = useI18n()

const emit = defineEmits(['save'])

interface Option {
  id: number
  label: string
}

const props = withDefaults(
  defineProps<{
    options: string[]
    isLoading: boolean
    isSaving: boolean
  }>(),
  {
    options: () => [],
    isLoading: false,
    isSaving: false
  }
)

const isEditing = ref(false)

const initiallySelected: string[] = []
const previouslySelected = ref<Option[]>([])

const mappedValues: Option[] = props.options.map((country, index) => ({
  id: index + 1,
  label: country
}))

const selectedOptions = ref<Option[]>(
  mappedValues.filter((option) => initiallySelected.includes(option.label))
)

const visibleOptions = computed(() => {
  return [...selectedOptions.value].splice(0, 2)
})

const remainingOptions = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return [...selectedOptions.value].splice(2)
})

const remainingOptionsCount = computed(() => {
  return remainingOptions.value.length
})

const isMoreSelectedTooltipVisible = ref(false)

function showMoreSelectedOptions(): void {
  isMoreSelectedTooltipVisible.value = true
}

function edit(): void {
  isEditing.value = true
  previouslySelected.value = [...selectedOptions.value]
}

function updateOptions(selected: Option[]): void {
  selectedOptions.value = selected
}

function removeOption(optionToBeRemoved: Option): void {
  isEditing.value = true
  selectedOptions.value = selectedOptions.value.filter(
    (option) => option.id !== optionToBeRemoved.id
  )
}

function save(): void {
  emit('save', selectedOptions.value)
}

function cancel(): void {
  isEditing.value = false
  selectedOptions.value = [...previouslySelected.value]
}
</script>

<template>
  <div class="exclusion-select__exclusions">
    <span class="exclusion-select__selection-label">
      {{ t('hosting_preferences.happ_selection.jurisdiction_exclusions') }}
    </span>

    <div
      v-if="selectedOptions.length > 0"
      class="exclusion-select__exclusions-selected"
      :class="{ 'exclusion-select__exclusions-selected--disabled': props.isSaving }"
    >
      <div
        v-for="option in visibleOptions"
        :key="option.id"
        class="exclusion-select__exclusions-selected-item"
      >
        <CategoryChip
          :with-dot="false"
          :label="option.label"
        >
          <XMarkIcon
            class="exclusion-select__exclusions-selected-item-delete-icon"
            @click="removeOption(option)"
          />
        </CategoryChip>
      </div>

      <CategoryChip
        v-if="selectedOptions.length > 2"
        :with-dot="false"
        :label="`+${remainingOptionsCount} more`"
        class="exclusion-select__exclusions-selected-item"
        @click="showMoreSelectedOptions"
      >
        <BaseTooltip
          v-click-outside="() => isMoreSelectedTooltipVisible = false"
          class="exclusion-select__exclusions-tooltip"
          :is-visible="isMoreSelectedTooltipVisible"
        >
          <div
            v-for="remainingOption in remainingOptions"
            :key="remainingOption.id"
            class="exclusion-select__exclusions-selected-item exclusion-select__exclusions-selected-item--remaining"
          >
            <span>{{ remainingOption.label }}</span>
            <XMarkIcon
              class="exclusion-select__exclusions-selected-item-delete-icon"
              @click="removeOption(remainingOption)"
            />
          </div>
        </BaseTooltip>
      </CategoryChip>
    </div>
    <span
      v-else
      class="exclusion-select__exclusions-selected"
    >
      None
    </span>
    <PencilIcon
      v-if="!isEditing"
      class="exclusion-select__exclusions-edit-icon"
      @click="edit"
    />

    <div
      v-if="isEditing"
      class="exclusion-select__exclusions-edit"
      :class="{ 'exclusion-select__exclusions-edit--disabled': props.isSaving }"
    >
      <FilledCheckIcon
        class="exclusion-select__exclusions-edit-button"
        data-testid="save-button"
        @click="save"
      />

      <CircledExIcon
        class="exclusion-select__exclusions-edit-button"
        data-testid="cancel-button"
        @click="cancel"
      />

      <BaseCombobox
        :options="mappedValues"
        :selected="selectedOptions"
        class="exclusion-select__exclusions-combobox"
        @update:selected="updateOptions"
      />
    </div>

    <CircleSpinner
      :scale="0.5"
      class="exclusion-select__exclusions-edit-spinner"
    />
  </div>
</template>

<style lang="scss" scoped>
.exclusion-select {
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

  &__exclusions {
    height: 28px;
    margin-top: 4px;
    display: flex;
    align-items: center;

    &-selected {
      display: flex;
      align-items: center;
      margin-left: 60px;

      &--disabled {
        opacity: 0.15;
      }
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

      &-spinner {
      }

      &--disabled {
        opacity: 0.15;
      }
    }

    &-tooltip {
      top: 32px;
    }
  }
}
</style>
