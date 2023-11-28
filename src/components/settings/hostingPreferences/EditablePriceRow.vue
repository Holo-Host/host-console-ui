<script setup lang="ts">
import BaseInput from '@uicommon/components/BaseInput.vue'
import { EInputType } from '@uicommon/types/ui'
import { ref } from 'vue'
import CircledExIcon from '../../icons/CircledExIcon.vue'
import FilledCheckIcon from '../../icons/FilledCheckIcon.vue'
import PencilIcon from '../../icons/PencilIcon.vue'
import SettingsRow from '../SettingsRow.vue'
import type { EPricingOptions } from '@/types/types'

const props = withDefaults(
  defineProps<{
    label: string
    value: number | string
    unit: string
    prop: string
    isDisabled?: boolean
    pricingOption: EPricingOptions
    selected_pricing_option: EPricingOptions | null
  }>(),
  {
    isDisabled: false
  }
)

const emit = defineEmits(['update:value','cancel_update','begin_edit'])

const isEditing = ref(false)
const editedValue = ref('')

function edit(): void {
  editedValue.value = `${props.value}`
  isEditing.value = true
  emit('begin_edit', { pricingOption: props.pricingOption })
}

function save(): void {
  emit('update:value', { prop: props.prop, value: Number(editedValue.value) })
  isEditing.value = false
}

function cancel(): void {
  isEditing.value = false
  editedValue.value = ''
  emit('cancel_update')
}
</script>

<template>
  <SettingsRow
    :label="label"
    :value="props.value"
    grid-columns="110px auto"
  >
    <span class="editable-price-row__unit">{{ props.unit }}</span>
    <PencilIcon
      v-if="!isEditing || props.selected_pricing_option !== props.pricingOption"
      class="editable-price-row__editable-value-icon"
      :class="{ 'disabled': props.isDisabled }"
      @click="edit"
    />
    <CircledExIcon
        v-if="isEditing && props.selected_pricing_option === props.pricingOption"
        class="editable-price-row__button"
        data-testid="cancel-button"
        @click="cancel"
      />    
  </SettingsRow>
</template>

<style lang="scss" scoped>
.editable-price-row {
  color: var(--grey-dark-color);

  &__editable-value {
    display: flex;
    align-items: center;
  }

  &__editable-value-input {
    width: 60px;
    margin-top: -8px;
    margin-left: -15px;
    margin-right: 30px;
  }

  &__editable-value-icon {
    margin-left: 10px;
    opacity: 0.5;
    cursor: pointer;

    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &__button {
    margin-top: -2px;
    margin-left: 10px;
    cursor: pointer;
  }

  &__unit {
    margin-left: 30px;
    color: var(--grey-color);
    font-weight: 700;
  }
}
</style>
