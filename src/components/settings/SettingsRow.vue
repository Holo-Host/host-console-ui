<template>
  <div class="settings-row">
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
  }
})
</script>

<style lang="scss" scoped>
.settings-row {
  min-height: 40px;
  display: grid;
  grid-template-columns: 280px auto;

  &__value {
    display: flex;
    align-items: start;
    color: var(--grey-dark-color);
  }
}
</style>
