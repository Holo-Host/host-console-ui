<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  id: string
  value: string
  label: string
  description: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
</script>

<template>
  <div class="base-radio-button__wrapper">
    <label
      class="base-radio-button__button"
      for="html"
      data-ripple-dark="true"
    >
      <input
        :id="props.id"
        v-model="localValue"
        name="type"
        type="radio"
        :value="props.value"
        class="base-radio-button__input"
        @change="emit('update:modelValue', props.value)"
      />
      <div class="base-radio-button__input-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <circle
            data-name="ellipse"
            cx="8"
            cy="8"
            r="8"
          ></circle>
        </svg>
      </div>
    </label>

    <div class="base-radio-button__labels">
      <label
        class="base-radio-button__label"
        :for="props.id"
      >
        {{ props.label }}
      </label>

      <label
        class="base-radio-button__description"
        :for="props.id"
      >
        {{ props.description }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-radio-button {
  &__wrapper {
    display: inline-flex;
    align-items: start;
  }

  &__button {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 9999px;
    padding: 0;
    margin-top: 2px;
  }

  &__input {
    position: relative;
    height: 15px;
    width: 15px;
    cursor: pointer;
    appearance: none;
    border-radius: 9999px;
    border: 1px solid var(--grey-dark-color);

    &:checked {
      border-color: var(--primary-color);
      background-color: rgba(0, 202, 217, 0.15);

      & + .base-radio-button__input-inner {
        opacity: 1;
      }
    }

    &-inner {
      position: absolute;
      pointer-events: none;
      left: 3px;
      top: -2px;
      color: var(--primary-color);
      opacity: 0;
      height: 9px;
      width: 9px;
    }
  }

  &__labels {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
  }

  &__label {
    font-weight: 800;
    cursor: pointer;
  }

  &__description {
    font-weight: 600;
    font-size: 12px;
    color: var(--grey-light-color);
    cursor: pointer;
  }
}
</style>
