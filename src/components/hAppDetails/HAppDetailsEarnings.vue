<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { HAppDetails } from '@/interfaces/HposInterface'
import { presentHolofuelAmount } from '@/utils'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()
</script>

<template>
  <div class="happ-details-earnings">
    <div class="happ-details-earnings__info-row large-text">
      {{ t('happ_details.earnings.total') }}:<span class="happ-details-earnings__info-row-value">&nbsp;{{ presentHolofuelAmount(props.hApp.earnings.total) }} HF</span>
    </div>
    <div class="happ-details-earnings__info-row earnings-margin">
      {{ t('happ_details.earnings.last_7_days') }}:<span class="happ-details-earnings__info-row-value">&nbsp;{{ presentHolofuelAmount(props.hApp.earnings.last7Days) }} HF</span>
    </div>
    <div class="happ-details-earnings__info-row earnings-margin">
      {{ t('happ_details.earnings.average_weekly') }}:<span class="happ-details-earnings__info-row-value">&nbsp;{{ presentHolofuelAmount(props.hApp.earnings.averageWeekly) }} HF</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.happ-details-earnings {
  &__info-row {
    display: flex;
    align-items: center;
    color: var(--grey-color);
    margin-left: 4px;
    margin-bottom: 16px;
    font-size: 14px;

    &-value {
      font-weight: 700;
      color: var(--grey-dark-color);
    }
  }

  .large-text {
    font-size: 16px;
  }
}

@media screen and (max-width: 1050px) {
  .happ-details-earnings {
    &__info-row {
      font-size: 14px;
    }

    .mobile-margin {
      margin-bottom: 40px;
    }
  }
}
</style>
