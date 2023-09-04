<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseTooltip from '@/components/BaseTooltip.vue'
import RightArrowIcon from '@/components/icons/FatArrowIcon.vue'
import router, { kRoutes } from '@/router'
import { isError as isErrorPredicate } from '@/types/predicates'
import type { DashboardCardItem, HoloFuelCardData, Error } from '@/types/types'
import { EUserKycLevel } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  data: HoloFuelCardData | Error
  isLoading: boolean
}>()

const isError = computed((): boolean => isErrorPredicate(props.data) && !!props.data.error)

const emit = defineEmits(['try-again-clicked'])

const isKycLevelOne = computed((): boolean => props.data.kycLevel === EUserKycLevel.one)

const canRedeem = computed(
  (): boolean => !isError.value && !isKycLevelOne.value && Number(props.data.redeemable) > 0
)

const isRedeemHoloFuelTooltipVisible = ref(false)

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */
const items = computed((): DashboardCardItem[] => [
  {
    label: t('holofuel.balance'),
    value:
      !isErrorPredicate(props.data) && Number(props.data.available)
        ? formatCurrency(Number(props.data.available))
        : 0
  },
  {
    label: t('holofuel.redeemable'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    value:
      !isErrorPredicate(props.data) && Number(props.data.redeemable)
        ? formatCurrency(Number(props.data.redeemable))
        : 0
  }
])
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="isError"
    :title="$t('holofuel.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div
      v-for="{ label, value } in items"
      :key="label"
      class="margin-bottom"
    >
      <span
        class="card-info-row"
      >
        {{ label }}
      </span>
      <span
        class="card-info-row bold"
      >
        {{ value }} HF
      </span>
    </div>

    <div
      class="redeem-button-wrapper"
      @mouseover="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = true : null"
      @mouseleave="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = false: null"
      @click="() => isKycLevelOne ? isRedeemHoloFuelTooltipVisible = true: null"
    >
      <button
        :disabled="!canRedeem"
        class="redeem-button"
        @click="router.push({ name: kRoutes.redeemHoloFuel.name })"
      >
        {{ $t('holofuel.redeem_holofuel') }}
      </button>

      <BaseTooltip
        class="redeem-button__tooltip"
        :is-visible="isRedeemHoloFuelTooltipVisible"
      >
        {{ $t('redemption.redeem_holofuel.kyc_level_one_notice') }}
      </BaseTooltip>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.redeem-button-wrapper {
  position: relative;
  align-self: center;
}

.redeem-button {
  margin-top: 10px;
  border: none;
  color: white;
  font-size: 12px;
  line-height: 16px;
  background: rgba(8, 112, 163);
  border-radius: 100px;
  height: 35px;
  padding: 0 25px;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__tooltip {
    top: 48px;
    right: 55px;
    width: 260px;
  }
}

.margin-bottom {
  margin-bottom: 10px;
}
</style>
