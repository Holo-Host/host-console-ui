<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  amount: number
  hotAddress: string
}>()

const emit = defineEmits(['update'])

const partialRedemptionTermsAccepted = ref(false)

const canSubmit = computed(() => partialRedemptionTermsAccepted.value)

watch(
  () => canSubmit.value,
  () => {
    if (canSubmit.value) {
      emit('update', { partialRedemptionTermsAccepted: partialRedemptionTermsAccepted.value })
    }
  }
)
</script>

<template>
  <div>
    <div class="form-step-two__header">
      <span>{{ $t('redeem_holofuel.review_and_confirm') }}</span>
    </div>

    <div class="form-step-two__item">
      <span class="form-step-two__item-label">{{ $t('redeem_holofuel.holo_fuel_amount') }}</span>
      <span class="form-step-two__item-value">{{ props.amount }} <span class="form-step-two__item-value--unit">HF</span></span>
    </div>

    <div class="form-step-two__item">
      <span class="form-step-two__item-label">{{ $t('redeem_holofuel.redemption_currency') }}</span>
      <span class="form-step-two__item-value form-step-two__item-value--unit">HOT</span>
    </div>

    <div class="form-step-two__item">
      <span class="form-step-two__item-label">{{ $t('redeem_holofuel.redemption_amount') }}</span>
      <span class="form-step-two__item-value">{{ props.amount }} <span class="form-step-two__item-value--unit">HOT</span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-step-two {
  display: flex;
  flex-direction: column;

  &__header {
    margin-top: 30px;
    font-size: 16px;
    font-weight: 700;
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-size: 14px;
    font-weight: 700;
    color: var(--grey-dark-color);

    &-value {
      margin-top: 8px;
      &--unit {
        color: var(--grey-color);
      }
    }
  }
}
</style>
