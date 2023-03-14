<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="props.isError"
    class="redeemable-holofuel"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <CardHeader
      is-disabled
      :label="$t('earnings.redeemable_holofuel')"
      :amount="props.data"
      class="redeemable-holofuel__header"
    />

    <div class="redeemable-holofuel__links">
      <BaseLinkButton
        is-disabled
        to=""
        :icon="RedemptionHistoryIcon"
        :label="$t('earnings.redemption_history')"
        class="redeemable-holofuel__link"
      />

      <BaseLinkButton
        is-disabled
        to=""
        :icon="RightArrowIcon"
        :label="$t('earnings.redeem_holofuel')"
        class="redeemable-holofuel__link"
      />

      <BaseLinkButton
        to=""
        :icon="TransferIcon"
        :label="$t('earnings.transfer_holofuel')"
        class="redeemable-holofuel__link"
        @click="goToHoloFuel"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import BaseLinkButton from '@uicommon/components/BaseLinkButton.vue'
import CardHeader from '@/components/earnings/CardHeader.vue'
import RightArrowIcon from '@/components/icons/FatArrowIcon.vue'
import RedemptionHistoryIcon from '@/components/icons/RedemptionHistoryIcon.vue'
import TransferIcon from '@/components/icons/TransferIcon.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'

const emit = defineEmits(['try-again-clicked'])

const { goToHoloFuel } = useGoToHoloFuel()

const props = defineProps<{
  data: number
  isLoading: boolean
  isError: boolean
}>()
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

@media screen and (max-width: 1050px) {
  .redeemable-holofuel {
    padding: 0 0 40px;

    &__links {
      display: block;
      position: relative;
      padding-right: 0;
    }

    &__link {
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
