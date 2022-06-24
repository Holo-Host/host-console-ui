<template>
  <div
    class="base-input"
    :class="{ 'disabled' : isDisabled }"
    data-test-base-input-wrapper
  >
    <slot
      v-if="label"
      name="label"
      :input-id="inputId"
    >
      <label
        :for="inputId"
        class="base-input__label"
        data-test-base-input-label
      >
        {{ label }}
      </label>
    </slot>

    <div class="base-input__content">
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

      <div
        v-if="inputType === EInputType.password"
        class="eye-icon"
      >
        <VisibleEyeIcon
          v-if="isPasswordVisible"
          @click="hidePassword"
        />
        <InvisibleEyeIcon
          v-else
          @click="showPassword"
        />
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
import InvisibleEyeIcon from './icons/InvisibleEyeIcon.vue'
import VisibleEyeIcon from './icons/VisibleEyeIcon.vue'
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

  label: {
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
  font-weight: 600;

  &.disabled {
    opacity: 0.4;
    pointer-events: hover;
    cursor: not-allowed;
  }

  &__label {
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: #606c8b;
    text-transform: uppercase;
  }

  &__content {
    position: relative;
    margin-top: 12px;
  }

  &__input {
    display: block;
    width: 100%;
    margin-top: 0;
    padding: 1px 1px 0;
    border: 0;
    border-bottom: solid 0.5px #000;
    font-size: 14px;
    font-weight: 600;

    &:focus {
      outline: none;
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
  }

  .eye-icon {
    position: absolute;
    right: 0;
    top: -8px;
    cursor: pointer;
  }
}
</style>
