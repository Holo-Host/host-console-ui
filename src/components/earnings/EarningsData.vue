<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import EarningsChart from '@/components/earnings/EarningsChart.vue'
import TrendChip from '@/components/TrendChip.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'
import type { EarningsData } from '@/types/types'

const props = defineProps<{
  earnings: EarningsData
}>()

const { goToHoloFuel } = useGoToHoloFuel()
const { t } = useI18n()

const trendValue = computed(() => {
  const currentEarnings = Number(props.earnings.current)
  const previousEarnings = Number(props.earnings.previous)

  return ((currentEarnings - previousEarnings) / previousEarnings) * 100
})

const trendDirection = computed(() => {
  const currentEarnings = Number(props.earnings.current)
  const previousEarnings = Number(props.earnings.previous)

  return currentEarnings >= previousEarnings ? 'up' : 'down'
})
</script>

<template>
  <div class="weekly-earnings-data">
    <div class="weekly-earnings-data__header">
      <div class="weekly-earnings-data__header-label">
        <span class="weekly-earnings-data__header-label-top">
          {{ t('earnings.earnings_in_the_past', { numberOfDays: 7, trendDirection }) }}
        </span>
        <span class="weekly-earnings-data__header-label-bottom">
          {{ t('earnings.totalling', { amount: formatCurrency(props.earnings.current, 0) }) }}
          <TrendChip :value="trendValue" />
        </span>
      </div>

      <BaseButton
        class="weekly-earnings-data__holofuel-button"
        @click="goToHoloFuel"
      >
        {{ $t('holofuel.go_to_holofuel') }}
      </BaseButton>
    </div>

    <EarningsChart
      :data="props.earnings.daily"
      class="weekly-earnings-data__graph"
    />
  </div>
</template>

<style lang="scss" scoped>
.weekly-earnings-data {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 60px;

  &__header {
    display: flex;
    justify-content: space-between;

    &-label {
      display: flex;
      flex-direction: column;

      &-top {
        font-size: 12px;
        font-weight: 400;
        color: var(--grey-dark-color);
      }

      &-bottom {
        display: flex;
        position: relative;
        margin-top: 4px;
        font-size: 16px;
        font-weight: 800;
      }
    }
  }

  &__graph {
    margin-top: 10px;
  }

  &__holofuel-button {
    position: absolute;
    right: 40px;
    height: 40px;
    margin-left: 8px;
    margin-top: -8px;
    transform: scale(0.7);
  }
}

@media screen and (max-width: 1350px) {
  .weekly-earnings-data {
    padding: 0 10px;
  }
}

@media screen and (max-width: 1050px) {
  .weekly-earnings-data {
    padding: 0;

    &__header {
      flex-direction: column;
    }

    &__holofuel-button {
      position: relative;
      right: 0;
      margin-left: 0;
      margin-top: 40px;
      height: 50px;
      transform: scale(1);
    }
  }
}
</style>
