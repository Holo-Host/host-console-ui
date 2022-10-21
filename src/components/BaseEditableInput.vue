<template>
  <div class="editable-input">
    <span v-if="!isEditing">
      {{ value }}
    </span>

    <div
      v-if="isEditing"
      class="editable-input__editable-value"
    >
      <BaseInput
        v-model="editedValue"
        placeholder=""
        name="edited-value"
        class="editable-input__editable-value-input"
      />

      <FilledCheckIcon
        class="editable-input__button"
        data-testid="save-button"
        @click="save"
      />

      <CircledExIcon
        class="editable-input__button"
        data-testid="cancel-button"
        @click="cancel"
      />
    </div>
    <span class="editable-input__unit">{{ unit }}</span>
    <PencilIcon
      v-if="!isEditing"
      class="editable-input__editable-value-icon"
      :class="{ 'disabled': isDisabled }"
      @click="edit"
    />
  </div>
</template>

<script setup>
import BaseInput from '@uicommon/components/BaseInput.vue'
import { ref } from 'vue'
import CircledExIcon from './icons/CircledExIcon.vue'
import FilledCheckIcon from './icons/FilledCheckIcon.vue'
import PencilIcon from './icons/PencilIcon.vue'

const isEditing = ref(false)
const editedValue = ref('')

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },

  unit: {
    type: String,
    default: ''
  },

  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value'])

function edit() {
  editedValue.value = props.value
  isEditing.value = true
}

function save() {
  emit('update:value', editedValue.value)
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
  editedValue.value = ''
}
</script>

<style lang="scss" scoped>
.editable-input {
  display: flex;
  align-items: center;
  color: var(--grey-dark-color);

  &__editable-value {
    display: flex;
    align-items: center;
  }

  &__editable-value-input {
    max-width: 80px;
    margin-top: -8px;
    margin-right: 30px;
    text-decoration: none;
  }

  &__editable-value-icon {
    margin-top: 1px;
    margin-left: 5px;
    cursor: pointer;
  }

  &__button {
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }

  &__unit {
    margin-left: 3px;
    color: var(--grey-color);
    font-weight: 700;
  }
}
</style>
