<script setup lang="ts">
defineProps<{
  options: []
  value: number | string
  isDisabled: boolean
}>()

defineEmits(['update:selected-value'])
</script>

<template>
  <select
    :value="value"
    class="dropdown-select"
    :class="{ 'dropdown-select--disabled': isDisabled }"
    @change="$emit('update:selected-value', $event.target.value)"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }} {{ option !== 'N/A' ? $t('$.days') : '' }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.dropdown-select {
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  border: 1px solid rgba(96, 108, 139, 0.18);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0 6px;
  margin: -2px 4px;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
