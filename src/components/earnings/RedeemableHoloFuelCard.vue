<template>
  <BaseCard
    is-disabled
    :is-loading="isLoading"
    :is-error="isError"
    class="redeemable-holofuel"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <CardHeader
      :label="$t('earnings.redeemable_holofuel')"
      amount="0"
      class="redeemable-holofuel__header"
    />
    <div class="redeemable-holofuel__links">
      <BaseLinkButton
        to=""
        :icon="RedemptionHistoryIcon"
        :label="$t('earnings.redemption_history')"
        class="redeemable-holofuel__link"
      />

      <BaseLinkButton
        to=""
        :icon="UnpaidLateIcon"
        :label="$t('earnings.redeem_holofuel')"
        class="redeemable-holofuel__link"
      />

      <BaseLinkButton
        is-disabled
        to=""
        :icon="FilledExclamationIcon"
        :label="$t('earnings.transfer_holofuel')"
        class="redeemable-holofuel__link"
      />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import BaseLinkButton from '@uicommon/components/BaseLinkButton'
import CardHeader from 'components/earnings/CardHeader'
import FilledExclamationIcon from 'components/icons/FilledExclamationIcon'
import RedemptionHistoryIcon from 'components/icons/RedemptionHistoryIcon'
import UnpaidLateIcon from 'components/icons/UnpaidLateIcon'

const emit = defineEmits(['try-again-clicked'])

defineProps({
  data: {
    type: String,
    required: true
  },

  isLoading: {
    type: Boolean,
    required: true
  },

  isError: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.redeemable-holofuel {
  padding: 0 60px 40px;

  &__header {
    margin-top: 10px;
  }

  &__links {
    display: flex;
    align-items: center;
    margin-top: 35px;
  }

  &__link {
    margin-right: 30px;
    padding-right: 40px;
  }
}
</style>
