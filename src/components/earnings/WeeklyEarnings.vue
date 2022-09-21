<template>
  <div class="weekly-earnings">
    <div class="weekly-earnings__header">
      <div class="weekly-earnings__header-label">
        <span>
          {{ $t('earnings.weekly_earnings') }}
        </span>

        <span class="weekly-earnings__header-amount">
          {{ weeklyEarnings }} HF
        </span>
      </div>

      <BaseButton
        class="weekly-earnings__holofuel-button"
        @click="showGoToHolofuelModal"
      >
        {{ $t('holofuel.go_to_holofuel') }}
      </BaseButton>
    </div>

    <TmpGraphIcon class="weekly-earnings__graph" />
  </div>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton'
import { EProjectNotification, postNotification } from '@uicommon/utils/notifications'
import TmpGraphIcon from 'components/icons/TmpGraphIcon'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from '@/constants'

defineProps({
  weeklyEarnings: {
    type: Number,
    required: true
  }
})

function showGoToHolofuelModal() {
  const isModalDisabled = localStorage.getItem(kDontShowGoToHoloFuelModalAgainLSKey) === 'true'

  if (isModalDisabled) {
    window.open(kHoloFuelUrl, '_blank').focus()
  } else {
    postNotification(EProjectNotification.showGoToHolofuelModal)
  }
}
</script>

<style lang="scss" scoped>
.weekly-earnings {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 60px;
  font-weight: bold;

  &__header {
    display: flex;
  }

  &__header-label {
    display: flex;
    flex-direction: column;
  }

  &__header-amount {
    margin-top: 10px;
    font-size: 14px;
    color: var(--grey-color);
  }

  &__graph {
    margin-top: 40px;
  }

  &__holofuel-button {
    margin-left: 8px;
    margin-top: -8px;
    transform: scale(0.7);
  }
}
</style>
