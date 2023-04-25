<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="form-step-two-item">
    <span class="form-step-two-item__label">{{ props.label }}</span>
    <span class="form-step-two-item__value"><slot /></span>
  </div>
</template>

<style lang="scss" scoped>
.form-step-two-item {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  font-size: 14px;
  font-weight: 700;
  color: var(--grey-dark-color);

  &__value {
    margin-top: 8px;
    &--unit {
      color: var(--grey-color);
    }
  }
}
</style>
