<script setup lang="ts">
import BaseInput from '@uicommon/components/BaseInput.vue'
import { EInputType } from '@uicommon/types/ui'
import { formatCurrency } from '@uicommon/utils/numbers'
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  redeemableAmount: string
  amount: string
  hotAddress: string
}>()

const emit = defineEmits(['update', 'update:is-valid'])

const amount = ref(`${props.amount}` || '')
const hotAddress = ref(`${props.hotAddress}` || '')
const hotAddressValidationIsActive = ref(false)

const isAmountValid = computed(() => Number(amount.value) <= Number(props.redeemableAmount))
const isHotAddressValid = computed(() => /^0x[a-fA-F0-9]{40}$/.test(hotAddress.value))

const canSubmit = computed(
  () =>
    amount.value &&
    Number(amount.value) > 0 &&
    isAmountValid.value &&
    hotAddress.value &&
    isHotAddressValid.value
)

const formattedRedeemableHoloFuel = computed((): number =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  formatCurrency(Number(props.redeemableAmount) || 0)
)

watch(
  () => [canSubmit.value, amount.value, hotAddress.value],
  ([canSubmit, amount, hotAddress]) => {
    emit('update:is-valid', canSubmit)
    emit('update', { amount, hotAddress })
  },
  { immediate: true }
)

function activateHotAddressValidation(): void {
  hotAddress.value = hotAddress.value.trim()
  hotAddressValidationIsActive.value = true
}
</script>

<template>
  <div>
    <div class="form-step-one__header">
      <span>{{ $t('redeem_holofuel.you_have') }}</span>
      <span class="form-step-one__header-value">{{ formattedRedeemableHoloFuel }} HF</span>
      <span>{{ $t('redeem_holofuel.available_to_redeem') }}</span>
    </div>

    <div class="form-step-one__input-wrapper">
      <span class="form-step-one__badge">1</span>
      <div class="form-step-one__input">
        <BaseInput
          v-model="amount"
          autofocus
          :label="$t('redeem_holofuel.amount_input_label')"
          :placeholder="$t('redeem_holofuel.amount_input_placeholder')"
          :decimal-places="18"
          :is-valid="isAmountValid"
          has-errors
          :message="isAmountValid ? '' : $t('redeem_holofuel.amount_input_error')"
          :tip="$t('redeem_holofuel.amount_input_tip')"
          name="amount"
          :input-type="EInputType.number"
          unit="HF"
        />
      </div>
    </div>

    <div class="form-step-one__input-wrapper">
      <span class="form-step-one__badge">2</span>
      <div class="form-step-one__input">
        <BaseInput
          v-model="hotAddress"
          :is-valid="!hotAddressValidationIsActive || isHotAddressValid"
          has-errors
          :message="!hotAddressValidationIsActive || isHotAddressValid ? '' : $t('redeem_holofuel.recipient_address_input_error')"
          :label="$t('redeem_holofuel.recipient_address_input_label')"
          :placeholder="$t('redeem_holofuel.recipient_address_input_placeholder')"
          name="amount"
          @blur="activateHotAddressValidation"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-step-one {
  display: flex;

  &__header {
    margin-top: 30px;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 700;

    &-value {
      color: var(--grey-color);
      margin-left: 4px;
      margin-right: 4px;
    }
  }

  &__badge {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--primary-color);
    color: var(--white-color);
    font-size: 14px;
  }

  &__input-wrapper {
    display: flex;
    margin-top: 40px;
  }

  &__input {
    margin-top: 4px;
    margin-left: 12px;
    width: 520px;
  }
}

@media screen and (max-width: 1050px) {
  .form-step-one__input {
    width: calc(100vw - 180px);
  }
}
</style>
