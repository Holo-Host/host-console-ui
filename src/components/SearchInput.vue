<script lang="ts" setup>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string
    placeholder?: string
    isDisabled?: boolean
    debounce?: number
    minLength?: number
  }>(),
  {
    placeholder: '',
    isDisabled: false,
    debounce: 500,
    minLength: 3
  }
)

const emit = defineEmits(['update'])

const debounceTimeout = ref(null)

const onInput = (event) => {
  if (event.target.value.length >= props.minLength) {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value)
    }

    debounceTimeout.value = setTimeout(() => {
      emit('update', { value: event.target.value, isActive: true })
      clearTimeout(debounceTimeout.value)
    }, props.debounce)
  } else {
    // Return isActive = false when the value length is less than the minimum length
    emit('update', { value: event.target.value, isActive: false })
  }
}

const clear = () => {
  emit('update', { value: '', isActive: true })
}
</script>

<template>
  <div class="search-input">
    <div
      class="search-input__wrapper"
      :class="{ 'search-input--disabled': isDisabled }"
    >
      <input
        :value="value"
        class="search-input__search-input"
        :placeholder="placeholder"
        @input="onInput"
      />

      <MagnifyingGlassIcon class="search-input__icon" />

      <XMarkIcon
        v-if="value"
        class="search-input__ex-icon"
        @click="clear"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &__wrapper {
    height: 44px;
    width: 100%;
    display: flex;
    position: relative;
    font-size: 14px;
  }

  &__search-input {
    border: 1px solid rgb(0 129 141);
    border-radius: 5px;
    padding: 3px 5px 3px 40px;
    width: 100%;
    position: relative;
    font-weight: 600;

    &:focus {
      outline-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--grey-light-color);
    }
  }

  &__icon {
    position: absolute;
    top: 11px;
    left: 12px;
    height: 22px;
    width: 22px;
    color: var(--grey-light-color);
  }

  &__ex-icon {
    position: absolute;
    top: 10px;
    right: 8px;
    height: 24px;
    width: 24px;
    cursor: pointer;
    color: var(--grey-light-color);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
