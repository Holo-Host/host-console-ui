<template>
  <div
    class="settings-row"
    :style="{
      'grid-template-columns': props.gridColumns || '280px auto'
    }"
  >
    <div class="settings-row__label">
      {{ props.label }}
      <slot name="label" />
    </div>
    <div class="settings-row__value">
      {{ props.value }}
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    value?: string | number
    gridColumns?: string
  }>(),
  {
    label: '',
    value: '',
    gridColumns: ''
  }
)
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
