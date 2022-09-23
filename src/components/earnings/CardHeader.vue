<template>
  <div
    class="earnings-card-header"
    :class="{ 'disabled': isDisabled }"
  >
    <div class="earnings-card-header__label">
      <span>
        {{ label }}
      </span>

      <span class="earnings-card-header__amount">
        {{ amount }} HF
      </span>
    </div>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  isDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

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
