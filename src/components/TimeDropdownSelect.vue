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
      {{ option }} {{ $t('$.days') }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  isDisabled: {
    type: Boolean,
    required: false
  }
})

defineEmits(['update:selected-value'])
</script>

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
