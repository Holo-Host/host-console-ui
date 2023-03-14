<template>
  <div class="weekly-earnings-data">
    <CardHeader
      :label="$t('earnings.last_7_days')"
      :amount="props.weeklyEarnings"
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

<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import CardHeader from './CardHeader.vue'
import TmpGraphIcon from '@/components/icons/TmpGraphIcon.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'

const props = defineProps<{
  weeklyEarnings: string | number
}>()

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
    opacity: 0.3;
    cursor: not-allowed;
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
