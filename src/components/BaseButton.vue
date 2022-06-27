<template>
  <button
    :disabled="isDisabled"
    class="base-button"
    :class="[{ 'disabled' : isDisabled }, kButtonTypeClass[type] ]"
    data-test-base-button-wrapper
    @click="onClick"
  >
    <!-- loading spinner -->
    <span
      v-if="spinnerSize !== ESpinnerSize.none"
      ref="spinner"
      class="base-button__spinner-wrapper"
      :class="[ isBusy ? 'visible' : 'hidden']"
      data-test-base-button-spinner-wrapper
    >
      <FlatSpinner
        :scale="0.5"
        :color="type === EButtonType.secondary && isDisabled ? 'secondary' : 'white'"
        class="-ml-4 mb-4"
        data-test-base-button-spinner
      />
    </span>

    <!-- button content -->
    <span
      ref="content"
      class="base-button__content"
      :class="[ spinnerSize !== ESpinnerSize.none && isBusy ? 'hidden' : 'visible']"
      data-test-base-button-content-wrapper
    >
      <slot>
        <span data-test-base-button-default-slot-content>
          {{ title }}
        </span>
      </slot>
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import FlatSpinner from '@/components/FlatSpinner.vue'
import { EButtonType, ESpinnerSize } from '@/types/ui'

const props = defineProps({
  type: {
    type: Number,
    default: EButtonType.primary,
    validator(value) {
      return [EButtonType.primary, EButtonType.secondary].includes(value)
    }
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  isBusy: {
    type: Boolean,
    default: false
  },

  spinnerSize: {
    type: Number,
    default: ESpinnerSize.small,
    validator(value) {
      return [ESpinnerSize.none, ESpinnerSize.small].includes(value)
    }
  },

  title: {
    type: String,
    default: ''
  }
})

const spinner = ref()
const content = ref()

const kButtonTypeClass = {
  [EButtonType.primary]: 'primary',
  [EButtonType.secondary]: 'secondary'
}

const emit = defineEmits(['click'])

function onClick() {
  if (!props.isDisabled && !props.isBusy) {
    emit('click')
  }
}
</script>

<style scoped lang="scss">
.base-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 32px;
  border-radius: 100px;
  overflow: hidden;
  line-height: 1;
  cursor: pointer;
  transition: transform 200ms;
  font-weight: 700;

  &.disabled {
    pointer-events: hover;
    cursor: not-allowed;
  }

  &.primary {
    color: #fff;
    border: solid 1px #00cad9;
    background-color: #00cad9;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #606c8b;
    }

    &.disabled {
      opacity: 0.4;
    }
  }

  &.secondary {
    color: #fff;
    border: solid 1px #606c8b;
    background-color: #606c8b;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #00cad9;
    }

    &.disabled {
      background-color: #fff;
      color: #606c8b;
      border: solid 1px #606c8b;
    }
  }

  &__spinner-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.125rem; /* 2px */
    right: 0.125rem; /* 2px */
    transition: transform 200ms;

    &.visible {
      transform: translateY(0.4rem);
    }

    &.hidden {
      transform: translateY(-2.25rem);
    }
  }

  &__content {
    transition: transform 200ms;

    &.visible {
      transform: translateY(0);
    }

    &.hidden {
      transform: translateY(2.25rem);
    }
  }
}
</style>
