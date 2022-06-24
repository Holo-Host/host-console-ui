<template>
  <div
    class="base-input"
    :class="{ 'disabled' : isDisabled }"
    data-test-base-input-wrapper
  >
    <div>
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="$attrs"
        :name="inputName"
        :value="modelValue"
        :disabled="isDisabled"
        :type="computedInputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="base-input__input"
        :class="{ 'disabled' : isDisabled, 'invalid' : !isValid }"
        data-test-base-input-input
        @input="onInput($event)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @keydown="$emit('keydown', $event)"
      />

      <div v-if="inputType === EInputType.password" class="eye-icon">
        <VisibleEyeIcon v-if="isPasswordVisible" @click="hidePassword" />
        <InvisibleEyeIcon v-else @click="showPassword" />
      </div>
    </div>

    <p
      v-if="hasErrors"
      class="base-input__error"
      data-test-base-input-errors
    >
      <!-- If there is no message, put a non-breaking space to prevent collapse -->
      {{ message || '&nbsp;' }}
    </p>
  </div>
</template>

<script setup>
import InvisibleEyeIcon from '@/components/icons/InvisibleEyeIcon.vue'
import VisibleEyeIcon from '@/components/icons/VisibleEyeIcon.vue'
import { useInput } from '@/composables/useInput'
import { EInputType } from '@/types/ui'

const props = defineProps({
  autocomplete: {
    type: String,
    default: ''
  },

  autofocus: {
    type: Boolean,
    default: false
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  isValid: {
    type: Boolean,
    default: true
  },

  inputType: {
    type: String,
    default: EInputType.text,
    validator(value) {
      return [
        EInputType.text,
        EInputType.password,
        EInputType.url,
        EInputType.tel,
        EInputType.email,
        EInputType.number
      ].includes(value)
    }
  },

  id: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  placeholder: {
    type: String,
    default: ''
  },

  modelValue: {
    type: String,
    default: ''
  },

  hasErrors: {
    type: Boolean,
    default: false
  },

  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'keydown'])

const {
  inputRef,
  isPasswordVisible,
  inputName,
  inputId,
  computedInputType,
  onInput,
  showPassword,
  hidePassword
} = useInput({ props, emit })
</script>

<style scoped lang="scss">
.base-input {
  position: relative;

  &.disabled {
    opacity: 0.6;
    pointer-events: hover;
    cursor: not-allowed;
  }

  &__input {
    display: block;
    width: 100%;
    margin-top: 0;
    border: 1px solid #606c8b;
    border-radius: 5px;
    padding: 9px 14px;
    font-size: 14px;
    font-weight: 600;

    &:focus {
      outline: none;
      border: 1px solid #00cad9;
    }

    &::placeholder {
      font-weight: 400;
      color: #acafbc;
    }

    &.disabled {
      opacity: 0.4;
      background-color: transparent;
      pointer-events: hover;
      cursor: not-allowed;
    }

    &.invalid {
      border-color: #ff5f5f;
    }
  }

  &__error {
    margin: 5px 0 4px 1px;
    font-size: 12px;
    color: #ff5f5f;
    font-weight: 600;
  }

  .eye-icon {
    position: absolute;
    right: 0;
    top: -8px;
    cursor: pointer;
  }
}
</style>
