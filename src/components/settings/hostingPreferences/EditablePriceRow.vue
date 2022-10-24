<template>
  <SettingsRow
    :label="label"
    :value="!isEditing ? value : ''"
    grid-columns="110px auto"
  >
    <div
      v-if="isEditing"
      class="editable-price-row__editable-value"
    >
      <BaseInput
        v-model="editedValue"
        :input-type="EInputType.number"
        placeholder=""
        name="edited-value"
        class="editable-price-row__editable-value-input"
      />

      <FilledCheckIcon
        class="editable-price-row__button"
        data-testid="save-button"
        @click="save"
      />

      <CircledExIcon
        class="editable-price-row__button"
        data-testid="cancel-button"
        @click="cancel"
      />
    </div>
    <span class="editable-price-row__unit">{{ unit }}</span>
    <PencilIcon
      v-if="!isEditing"
      class="editable-price-row__editable-value-icon disabled"
      @click="edit"
    />
  </SettingsRow>
</template>

<script setup >
import BaseInput from '@uicommon/components/BaseInput.vue'
import { EInputType } from '@uicommon/types/ui'
import { ref } from 'vue'
import CircledExIcon from '../../icons/CircledExIcon.vue'
import FilledCheckIcon from '../../icons/FilledCheckIcon.vue'
import PencilIcon from '../../icons/PencilIcon.vue'
import SettingsRow from '../SettingsRow.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  unit: {
    type: String,
    required: true
  },

  prop: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:value'])

const isEditing = ref(false)
const editedValue = ref('')

function edit() {
  editedValue.value = `${props.value}`
  isEditing.value = true
}

function save() {
  emit('update:value', { prop: props.prop, value: Number(editedValue.value) })
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
  editedValue.value = ''
}
</script>

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
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }

  &__unit {
    margin-left: 30px;
    color: var(--grey-color);
    font-weight: 700;
  }
}
</style>
