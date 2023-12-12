<script setup lang="ts">
import BaseInput from '@uicommon/components/BaseInput.vue'
import { EInputType } from '@uicommon/types/ui'
import { ref } from 'vue'
import CircledExIcon from '../../icons/CircledExIcon.vue'
import FilledCheckIcon from '../../icons/FilledCheckIcon.vue'
import PencilIcon from '../../icons/PencilIcon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: number | string | null
    unit: string
    prop: string
    isDisabled?: boolean
    labelAlign?: 'left' | 'center'
  }>(),
  {
    isDisabled: false,
    labelAlign: 'center'
  }
)

const emit = defineEmits(['update:value'])

const isEditing = ref(false)
const editedValue = ref(props.value)

function edit(): void {
  editedValue.value = props.value === null ? '' : `${props.value}`
  isEditing.value = true
}

function save(): void {
  emit('update:value', { prop: props.prop, value: Number(editedValue.value) })
  isEditing.value = false
}

function cancel(): void {
  editedValue.value = `${props.value}`
  isEditing.value = false
}
</script>

<template>
  <div class="editable-price-row__editable-value">
    <span
      class="editable-price-row__label"
      :class="{ 'editable-price-row__label--text-left': props.labelAlign === 'left' }"
    >
      {{ label }}
    </span>
    <span
      v-if="!isEditing"
      class="editable-price-row__readonly_value"
    >
      {{ editedValue }}
    </span>
    <BaseInput
      v-if="isEditing"
      v-model="editedValue"
      :input-type="EInputType.text"
      placeholder=""
      name="edited-value"
      class="editable-price-row__editable-value-input"
    />

    <FilledCheckIcon
      v-if="isEditing"
      class="editable-price-row__button"
      data-testid="save-button"
      role="button"
      @click="save"
    />

    <CircledExIcon
      v-if="isEditing"
      class="editable-price-row__button"
      data-testid="cancel-button"
      role="button"
      @click="cancel"
    />
    <span class="editable-price-row__unit">{{ props.unit }}</span>
    <PencilIcon
      v-if="!isEditing"
      role="button"
      class="editable-price-row__editable-value-icon"
      :class="{ 'disabled': props.isDisabled }"
      @click="edit"
    />
  </div>
</template>

<style lang="scss" scoped>
.editable-price-row {
  color: var(--grey-dark-color);

  &__editable-value {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    height: 32px;
  }

  &__editable-value-input {
    width: 75px;
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
    margin-left: 5px;
    cursor: pointer;
  }

  &__unit {
    margin-left: 30px;
    color: var(--grey-color);
    font-weight: 700;
  }

  &__label {
    width: 100px;
    margin-right: 16px;
    color: var(--grey-color);
    font-weight: 700;

    &--text-left {
      text-align: left;
    }
  }

  &__readonly_value {
    width: 75px;
  }
}
</style>
