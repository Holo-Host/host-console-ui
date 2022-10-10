<template>
  <div class="sort-by-dropdown">
    <div
      class="sort-by-dropdown__label"
      :class="{ 'sort-by-dropdown--disabled': isDisabled }"
    >
      {{ $t('$.sort_by') }}:&nbsp;
    </div>
    <select
      :value="value"
      class="sort-by-dropdown__sort"
      :class="{ 'sort-by-dropdown--disabled': isDisabled }"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { kSortOptions } from '@/constants/ui'

defineProps({
  value: {
    type: String,
    required: true
  },

  isDisabled: {
    type: Boolean,
    default: false
  },

  options: {
    type: Array,
    default: Object.values(kSortOptions)
  }
})

const emit = defineEmits(['update:value'])

const onChange = (e) => {
  emit('update:value', e.target.value)
}
</script>

<style lang="scss">
.sort-by-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;

  &__label {
    color: var(--grey-color);
    font-size: 12px;
    margin-left: 30px;
    margin-right: 2px;
  }

  &__sort {
    appearance: none;
    border: none;
    background-color: transparent;
    font-size: 12px;
    font-weight: 600;
    color: var(--grey-dark-color);
    padding: 4px 16px 4px 4px;
    background-image: url(/images/chevron.svg);
    background-repeat: no-repeat;
    background-position: right;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
