<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import BaseLinkButton from '@uicommon/components/BaseLinkButton.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed, ref } from 'vue'
import BaseTooltip from '@/components/BaseTooltip.vue'
import CardHeader from '@/components/earnings/CardHeader.vue'
import RightArrowIcon from '@/components/icons/FatArrowIcon.vue'
import RedemptionHistoryIcon from '@/components/icons/RedemptionHistoryIcon.vue'
import TransferIcon from '@/components/icons/TransferIcon.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'
import { kRoutes } from '@/router'
import { EUserKycLevel } from '@/types/types'

const emit = defineEmits(['try-again-clicked'])

const { goToHoloFuel } = useGoToHoloFuel()

const props = defineProps<{
  redeemableValue: number
  kycLevel: EUserKycLevel
  isLoading: boolean
  isError: boolean
}>()

const isRedeemHoloFuelTooltipVisible = ref(false)

const redeemableHoloFuel = computed((): number =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  formatCurrency(Number(props.redeemableValue) || 0)
)

const isKycLevelOne = computed((): boolean => props.kycLevel === EUserKycLevel.one)

const canRedeem = computed((): boolean => !isKycLevelOne.value && Number(props.redeemableValue) > 0)
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="props.isError"
    class="redeemable-holofuel"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <CardHeader
      :label="$t('earnings.redeemable_holofuel')"
      :amount="redeemableHoloFuel"
      class="redeemable-holofuel__header"
    />

    <div class="redeemable-holofuel__links">
      <BaseLinkButton
        :to="kRoutes.redemptionHistory.path"
        :icon="RedemptionHistoryIcon"
        :label="$t('earnings.redemption_history')"
        class="redeemable-holofuel__link"
      />

      <div
        class="redeemable-holofuel__redeem-button"
        @mouseover="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = true : null"
        @mouseleave="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = false: null"
        @click="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = true: null"
      >
        <BaseLinkButton
          :is-disabled="!canRedeem"
          :to="kRoutes.redeemHoloFuel.path"
          :icon="RightArrowIcon"
          :label="$t('earnings.redeem_holofuel')"
          class="redeemable-holofuel__link"
        />

        <BaseTooltip
          class="redeemable-holofuel__redeem-button-tooltip"
          :is-visible="isRedeemHoloFuelTooltipVisible"
        >
          {{ $t('redemption.redeem_holofuel.kyc_level_one_notice') }}
        </BaseTooltip>
      </div>

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

  &__redeem-button {
    position: relative;

    &-tooltip {
      top: 48px;
      right: 80px;
      width: 260px;
    }
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
