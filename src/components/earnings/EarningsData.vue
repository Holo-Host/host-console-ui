<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CircleSpinner from '../../../ui-common-library/src/components/CircleSpinner.vue'
import { ESpinnerSize } from '../../../ui-common-library/src/types/ui'
import EarningsChart from '@/components/earnings/EarningsChart.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'
import type { EarningsData } from '@/types/types'

const props = defineProps<{
  earnings: EarningsData
  isLoading: boolean
}>()

const { goToHoloFuel } = useGoToHoloFuel()
const { t } = useI18n()

const totalEarnings = computed(() =>
  props.earnings.dailies.reduce((acc, curr) => acc + Number(curr.paid) + Number(curr.unpaid), 0)
)
</script>

<template>
  <div class="weekly-earnings-data">
    <div class="weekly-earnings-data__header">
      <div
        class="weekly-earnings-data__header-label"
        :class="{ 'weekly-earnings-data--loading': props.isLoading }"
      >
        <span class="weekly-earnings-data__header-label-top">
          {{ t('earnings.earnings_in_the_past_days', { numberOfDays: 7 }) }}
        </span>
        <span class="weekly-earnings-data__header-label-bottom">
          {{ formatCurrency(totalEarnings, 2) }} HF
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
      v-if="!props.isLoading && props.earnings.dailies.length > 0"
      :data="[...props.earnings.dailies].reverse()"
      class="weekly-earnings-data__graph"
    />

    <div
      v-else-if="props.earnings.dailies.length === 0"
      class="weekly-earnings-data__graph--no-data"
    >
      {{ t('earnings.no_data') }}
    </div>

    <div
      v-else
      class="weekly-earnings-data__graph--loading"
    >
      <CircleSpinner
        :scale="ESpinnerSize.small"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weekly-earnings-data {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 60px;

  &--loading {
    opacity: 0.5;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    &-label {
      display: flex;
      flex-direction: column;
      pointer-events: none;

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

    &--loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 255px;
    }

    &--no-data {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 255px;
    }
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
