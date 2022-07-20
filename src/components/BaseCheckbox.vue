<template>
  <div class="base-checkbox">
    <div class="base-checkbox__wrapper">
      <input
        :id="id"
        :checked="checked"
        :disabled="isDisabled"
        :aria-describedby="id"
        :name="id"
        type="checkbox"
        class="base-checkbox__input"
        :class="{
          'base-checkbox__input--disabled': isDisabled
        }"
        data-test-base-checkbox-input
        @input="(event) => $emit('update:checked', event.target.checked)"
      >
      <div class="ml-3 text-lg">
        <label
          :for="id"
          data-test-base-checkbox-label
        >
          {{ label }}
        </label>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },

  label: {
    type: String,
    default: ''
  },

  checked: {
    type: Boolean,
    required: true
  },

  id: {
    type: String,
    required: true
  }
})

defineEmits(['update:checked'])
</script>

<style lang="scss" scoped>
.base-checkbox {
  position: relative;
  display: flex;
  align-items: start;

  &__wrapper {
    display: flex;
    align-items: center;
    height: 20px;
  }

  &__input {
    height: 16px;
    width: 16px;
    color: var(--primary-color);
    accent-color: var(--primary-color);
    border: solid var(--grey-color);
    border-radius: 4px;

    &:checked:before {
      color: red;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px white, 0 0 0 4px var(--primary-color);
    }

    &.disabled {
      opacity: 0.4;
    }
  }
}
</style>
