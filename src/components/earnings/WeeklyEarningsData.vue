<template>
  <div class="weekly-earnings-data">
    <CardHeader
      :label="$t('earnings.weekly_earnings')"
      :amount="weeklyEarnings"
    >
      <BaseButton
        class="weekly-earnings-data__holofuel-button"
        @click="goToHoloFuel"
      >
        {{ $t('holofuel.go_to_holofuel') }}
      </BaseButton>
    </CardHeader>

    <TmpGraphIcon class="weekly-earnings-data__graph" />
  </div>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton'
import CardHeader from 'components/earnings/CardHeader'
import TmpGraphIcon from 'components/icons/TmpGraphIcon'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'

defineProps({
  weeklyEarnings: {
    type: Number,
    required: true
  }
})

const { goToHoloFuel } = useGoToHoloFuel()
</script>

<style lang="scss" scoped>
.weekly-earnings-data {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 60px;

  &__graph {
    margin-top: 40px;
  }

  &__holofuel-button {
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

    &__holofuel-button {
      margin-left: 0;
      margin-top: 40px;
      height: 50px;
      transform: scale(1);
    }

    &__graph {
      display: none;
    }
  }
}
</style>
