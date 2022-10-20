<template>
  <div
    class="settings-row"
    :style="{
      'grid-template-columns': gridColumns || '280px auto'
    }"
  >
    <div class="settings-row__label">
      {{ label }}
      <slot name="label" />
    </div>
    <div class="settings-row__value">
      {{ value }}
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },

  value: {
    type: String,
    default: ''
  },

  gridColumns: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.settings-row {
  min-height: 40px;
  display: grid;

  &__value {
    display: flex;
    align-items: flex-start;
    color: var(--grey-dark-color);
  }
}
</style>
