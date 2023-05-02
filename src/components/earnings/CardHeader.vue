<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    amount: string | number
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false
  }
)
</script>

<template>
  <div
    class="earnings-card-header"
    :class="{ 'disabled': props.isDisabled }"
  >
    <div class="earnings-card-header__label">
      <span>
        {{ props.label }}
      </span>

      <span class="earnings-card-header__amount">
        {{ props.amount }} HF
      </span>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.earnings-card-header {
  display: flex;
  font-weight: bold;

  &__label {
    display: flex;
    flex-direction: column;
  }

  &__amount {
    margin-top: 10px;
    font-size: 14px;
    color: var(--grey-color);
  }

  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

@media screen and (max-width: 1050px) {
  .earnings-card-header {
    flex-direction: column;
  }
}
</style>
