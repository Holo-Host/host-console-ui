<script setup lang="ts">
import RedeemHoloFuelFormStepTwoItem from './RedeemHoloFuelFormStepTwoItem.vue'

const props = defineProps<{
  amount: string
  hotAddress: string
  partialRedemptionTermsAccepted: boolean
}>()

const emit = defineEmits(['update'])

function updatePartialRedemptionTermsAccepted(event: Event): void {
  emit('update', { partialRedemptionTermsAccepted: event.target?.checked })
}
</script>

<template>
  <div>
    <div class="form-step-two__header">
      <span>{{ $t('redemption.redeem_holofuel.review_and_confirm') }}</span>
    </div>

    <RedeemHoloFuelFormStepTwoItem :label="$t('redemption.redeem_holofuel.holo_fuel_amount')">
      {{ props.amount }} <span class="form-step-two__item-value--unit">HF</span>
    </RedeemHoloFuelFormStepTwoItem>

    <RedeemHoloFuelFormStepTwoItem :label="$t('redemption.redeem_holofuel.redemption_currency')">
      <span class="form-step-two__item-value--unit">HOT</span>
    </RedeemHoloFuelFormStepTwoItem>

    <RedeemHoloFuelFormStepTwoItem :label="$t('redemption.redeem_holofuel.redemption_amount')">
      {{ props.amount }} <span class="form-step-two__item-value--unit">HOT</span>
    </RedeemHoloFuelFormStepTwoItem>

    <RedeemHoloFuelFormStepTwoItem :label="$t('redemption.redeem_holofuel.redemption_amount')">
      1 <span class="form-step-two__item-value--unit">HF</span> = 1 <span class="form-step-two__item-value--unit">HOT</span>
    </RedeemHoloFuelFormStepTwoItem>

    <RedeemHoloFuelFormStepTwoItem :label="$t('redemption.redeem_holofuel.recipient_address_input_label')">
      <span class="form-step-two__item-value--address">{{ props.hotAddress }}</span>
    </RedeemHoloFuelFormStepTwoItem>

    <div class="form-step-two__terms">
      <input
        id="partialRedemptionTermsAccepted"
        :value="partialRedemptionTermsAccepted"
        type="checkbox"
        class="form-step-two__terms-checkbox"
        @change="updatePartialRedemptionTermsAccepted"
      />
      <label
        for="partialRedemptionTermsAccepted"
        class="form-step-two__terms-label"
      >
        {{ $t('redemption.redeem_holofuel.partial_redemption_terms') }}
      </label>
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

  &__item-value {
    &--unit {
      color: var(--grey-color);
    }

    &--address {
      color: var(--grey-color);
      font-weight: 400;
    }
  }

  &__terms {
    display: flex;
    align-items: start;
    margin-top: 30px;
    font-size: 14px;
    font-weight: 600;
    font-style: italic;
    max-width: 620px;
    color: var(--grey-dark-color);
    cursor: pointer;

    &-checkbox:checked {
      accent-color: var(--primary-light-color);
    }

    &-label {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
