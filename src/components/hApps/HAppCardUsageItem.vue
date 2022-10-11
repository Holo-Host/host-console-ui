<template>
  <div
    class="usage-item"
    :class="{ 'usage-item--disabled' : item.isDisabled }"
  >
    <span class="usage-item__value">
      {{ item.value }}
    </span>
    <span class="usage-item__unit">
      {{ item.unit }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.usage-item {
  display: flex;

  &__value {
    padding: 0 8px 4px;
    border-bottom: 2px solid var(--primary-color);
    font-size: 14px;
    font-weight: 700;
  }

  &--disabled {
    opacity: 0.2;
  }
}

@media screen and (max-width: 1050px) {
  .usage-item {
    margin-bottom: 8px;

    &__value {
      padding: 0 8px 2px;
    }
  }
}
</style>
