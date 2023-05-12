<script setup lang="ts">
import { kSortOptions } from '@/constants/ui'

interface Option {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    value: string
    isDisabled?: boolean
    options?: Option[]
  }>(),
  {
    isDisabled: false,
    options: Object.values(kSortOptions)
  }
)

const emit = defineEmits(['update:value'])

function onChange(event: { target: { value: string } }): void {
  emit('update:value', event.target.value)
}
</script>

<template>
  <div class="sort-by-dropdown">
    <div
      class="sort-by-dropdown__label"
      :class="{ 'sort-by-dropdown--disabled': props.isDisabled }"
    >
      {{ $t('$.sort_by') }}:&nbsp;
    </div>
    <select
      :value="props.value"
      class="sort-by-dropdown__sort"
      :class="{ 'sort-by-dropdown--disabled': props.isDisabled }"
      @change="onChange"
    >
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

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
    background-image: url('../../assets/images/chevron.svg');
    background-repeat: no-repeat;
    background-position: right;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
